/* WebKit half of the cross-engine gate.

   Inline-SVG/WebKit divergence is this project's known failure class, so
   "renders in Chrome" is not a pass. QuickLook renders HTML with WebKit; this
   script drives it over both themes and measures the same thing the Blink
   harness measures — the pixel spread of a patch of bare page ground, which is
   non-zero only if the generated grain actually rasterised.

   Usage:  node tests/verify-webkit.mjs [--json]  */

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { decodePng, findGroundPatch, hexLuminance } from "./lib/png.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTIFACTS = join(ROOT, "tests", "artifacts");
const RENDER_WIDTH = 1400;

/* The seed's locked ground values. Kept here rather than parsed out of CSS on
   purpose: the render is checked against the spec, not against itself. */
const GROUND = { dark: "#13140D", light: "#DBD8C6" };

const results = [];
const evidence = {};
const temps = [];

function check(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail });
}

function renderWithQuickLook(sourcePath, label) {
  const outDir = join(ARTIFACTS, "webkit-" + label);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  execFileSync("qlmanage", ["-t", "-s", String(RENDER_WIDTH), "-o", outDir, sourcePath], {
    stdio: "pipe"
  });
  const name = sourcePath.split("/").pop() + ".png";
  const rendered = join(outDir, name);
  if (!existsSync(rendered)) throw new Error(`QuickLook produced no render for ${sourcePath}`);
  const buffer = readFileSync(rendered);
  writeFileSync(join(ARTIFACTS, `webkit-${label}.png`), buffer);
  rmSync(outDir, { recursive: true, force: true });
  return buffer;
}

/* A copy of the page with the theme forced, so the render does not depend on
   the machine's appearance setting. Same directory, so relative assets resolve. */
function themedCopy(theme) {
  const html = readFileSync(join(ROOT, "index.html"), "utf8").replace(
    '<html lang="en">',
    `<html lang="en" data-theme="${theme}">`
  );
  const path = join(ROOT, `.webkit-${theme}.html`);
  writeFileSync(path, html);
  temps.push(path);
  return path;
}

try {
  mkdirSync(ARTIFACTS, { recursive: true });

  for (const theme of ["dark", "light"]) {
    const source = themedCopy(theme);
    const png = renderWithQuickLook(source, theme);
    const image = decodePng(png);
    const target = hexLuminance(GROUND[theme]);
    const patch = findGroundPatch(image, target);

    evidence[theme] = { render: `${image.width}x${image.height}`, targetLuminance: target, patch };

    check(
      `WebKit renders the page (${theme})`,
      image.width > 0 && image.height > 0,
      `${image.width}x${image.height}px`
    );
    check(
      `WebKit ground matches the locked value (${theme})`,
      patch !== null,
      patch
        ? `patch at ${patch.x},${patch.y} mean ${patch.mean} vs expected ${target}`
        : `no patch within tolerance of ${target} — ground colour or layout is off`
    );
    check(
      `grain renders in WebKit (${theme})`,
      patch !== null && patch.stdDev > 0.2,
      patch ? `stdDev ${patch.stdDev}, range ${patch.min}-${patch.max}` : "no ground patch found"
    );
  }

  /* Side-by-side with Blink, when that report is present. */
  const blinkReport = join(ARTIFACTS, "blink-report.json");
  if (existsSync(blinkReport)) {
    const blink = JSON.parse(readFileSync(blinkReport, "utf8"));
    const blinkPatch = blink.evidence?.blinkGrainPatch;
    if (blinkPatch) {
      evidence.parity = { blink: blinkPatch, webkit: evidence.dark.patch };
      const wk = evidence.dark.patch;
      check(
        "cross-engine parity: both engines paint grain on the same ground",
        Boolean(wk) &&
          Math.abs(wk.mean - blinkPatch.mean) <= 2.5 &&
          wk.stdDev > 0.2 &&
          blinkPatch.stdDev > 0.2,
        `Blink mean ${blinkPatch.mean} / stdDev ${blinkPatch.stdDev} · WebKit mean ${wk?.mean} / stdDev ${wk?.stdDev}`
      );
    }
  } else {
    check(
      "cross-engine parity",
      false,
      "run node tests/verify-shell.mjs first — no Blink report to compare against"
    );
  }
} finally {
  temps.forEach((path) => rmSync(path, { force: true }));
}

const failed = results.filter((r) => !r.passed);
const width = Math.max(...results.map((r) => r.name.length));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, evidence }, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}  ${r.detail ?? ""}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  console.log("Renders: tests/artifacts/webkit-dark.png, tests/artifacts/webkit-light.png");
}

writeFileSync(join(ARTIFACTS, "webkit-report.json"), JSON.stringify({ results, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
