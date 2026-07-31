/* HO-039 — close crops of each candidate zone at 2x for judging.
   Scrolls each .sample-tag into view and shoots the viewport at deviceScaleFactor 2. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const PAGE = "file://" + join(ROOT, "samples", "re-gate-proposed.html");

const ZONES = [
  { match: "L1", name: "crop-r7-l1" },
  { match: "L2", name: "crop-r7-l2" },
  { match: "L3 —", name: "crop-r7-l3" },
  { match: "L4a", name: "crop-r7-l4a" },
  { match: "L4b", name: "crop-r7-l4b" },
  { match: "CONTINUOUS GAUGE, AT REST", name: "crop-r3-a-rest" },
  { match: "CONTINUOUS GAUGE, MID", name: "crop-r3-a-mid" },
  { match: "FOUR SEGMENTS, AT REST", name: "crop-r3-b-rest" },
  { match: "FOUR SEGMENTS, SHEET 2", name: "crop-r3-b-mid" },
  { match: "CURRENT — THREE", name: "crop-r5-current" },
  { match: "PROVENANCE IN THE FOUNDER", name: "crop-r5-a" },
  { match: "PROVENANCE BOLD AT BODY", name: "crop-r5-b" },
  { match: "PLAIN (SHIPPED)", name: "crop-r2-plain" },
  { match: "INK BOLD ON THE HOOK", name: "crop-r2-bold" },
  { match: "SEPARATOR + CANDIDATE A AT BODY", name: "crop-r9-a-body" },
  { match: "CANDIDATE A AT LEAD", name: "crop-r9-a-lead" },
];

const { browser, close } = await launchChrome();
try {
  const page = await browser.newPage();
  await page.init();
  await page.setViewport({ width: 1280, height: 420, deviceScaleFactor: 2 });
  await page.setMedia({ colorScheme: "dark" });
  await page.goto(PAGE);

  for (const z of ZONES) {
    await page.eval(`(() => {
      const tag = [...document.querySelectorAll('.sample-tag')]
        .find(t => t.textContent.includes(${JSON.stringify(z.match)}));
      if (!tag) throw new Error("no zone: " + ${JSON.stringify(z.match)});
      tag.scrollIntoView();
    })()`);
    await page.eval(`new Promise(r => setTimeout(r, 120))`);
    writeFileSync(join(OUT, z.name + ".png"), await page.screenshot());
  }

  // light-theme lockup crops (the theme-risk zone: L4a's cream glyph)
  await page.setMedia({ colorScheme: "light" });
  for (const z of ZONES.slice(0, 5)) {
    await page.eval(`(() => {
      const tag = [...document.querySelectorAll('.sample-tag')]
        .find(t => t.textContent.includes(${JSON.stringify(z.match)}));
      tag.scrollIntoView();
    })()`);
    await page.eval(`new Promise(r => setTimeout(r, 120))`);
    writeFileSync(join(OUT, z.name + "-light.png"), await page.screenshot());
  }
  console.log("crops done");
  await page.close();
} finally {
  await close();
}
