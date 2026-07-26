/* QA independent re-verification of the page shell.

   NOT a second product runner. `scripts/test.sh` remains the build's single
   suite; this file is QA's own evidence, derived from
   `design-specs/web/page-shell.md` rather than from what verify-shell.mjs
   happens to assert, so that a gap in one does not silently become a gap in
   both. Checks that duplicate the build harness are re-derived here rather
   than cited — a QA verdict names a command, not another agent's result.

   Deliberately outside `scripts/test.sh`: the build's suite proves the build,
   and this proves the build independently. Wiring them together would remove
   the independence that is the whole point.

   Usage:  node tests/qa-independent-audit.mjs [--json]  */

import { launchChrome } from "./lib/cdp.mjs";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTIFACTS = join(ROOT, "tests", "artifacts");
const PAGE_URL = "file://" + join(ROOT, "index.html");

const results = [];
const evidence = {};
const check = (name, passed, detail) => results.push({ name, passed: Boolean(passed), detail });

/* ---- contrast maths, re-derived from the seed's locked hex, not from CSS ---- */
const SEED = {
  dark:  { ground: "#13140D", surface: "#1B1D13", ink: "#E6E3D3", muted: "#8C9075", hair: "#2C2F22", accent: "#C05A32" },
  light: { ground: "#DBD8C6", surface: "#E7E4D4", ink: "#191B10", muted: "#55583F", hair: "#BDB9A3", accent: "#A0451F" }
};
const rgb = (hex) => { const n = parseInt(hex.slice(1), 16); return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255 }; };
const lum = ({ r, g, b }) => { const f = (v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
const cr = (a, b) => Math.round(((Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)) * 100) / 100;
const mix = (fg, bg, alpha) => ({ r: fg.r * alpha + bg.r * (1 - alpha), g: fg.g * alpha + bg.g * (1 - alpha), b: fg.b * alpha + bg.b * (1 - alpha) });

/* Spec §2.2 — every stated pair, both themes. The spec's own table is the
   expectation; this recomputes it so a wrong number in the spec cannot pass
   by being copied into the build. */
const SPEC_TABLE = [
  ["--ink on --ground", "ink", "ground", 14.37, 12.15],
  ["--ink on --surface", "ink", "surface", 13.23, 13.64],
  ["--muted on --ground", "muted", "ground", 5.61, 5.13],
  ["--muted on --surface", "muted", "surface", 5.16, 5.76],
  ["--accent on --ground", "accent", "ground", 4.19, 4.35],
  ["--accent on --surface", "accent", "surface", 3.86, 4.89],
  ["--ink on --accent", "ink", "accent", 3.43, 2.79],
  ["--hair on --ground", "hair", "ground", 1.36, 1.38]
];

const specContrast = SPEC_TABLE.map(([pair, fg, bg, expDark, expLight]) => ({
  pair,
  dark: cr(rgb(SEED.dark[fg]), rgb(SEED.dark[bg])), expDark,
  light: cr(rgb(SEED.light[fg]), rgb(SEED.light[bg])), expLight
}));
evidence.specContrast = specContrast;
check("spec §2.2 contrast table re-derives exactly (16 ratios, both themes)",
  specContrast.every((r) => r.dark === r.expDark && r.light === r.expLight),
  specContrast.filter((r) => r.dark !== r.expDark || r.light !== r.expLight)
    .map((r) => `${r.pair}: ${r.dark}/${r.light} vs stated ${r.expDark}/${r.expLight}`).join("; ") || "all 16 match");

/* Spec §5 — the vignette's light cap is a derived claim. Re-derive both the
   claim AND the counter-claim (that 16% on light would fail). */
const vig = ["dark", "light"].map((t) => {
  const alpha = t === "dark" ? 0.16 : 0.05;
  const floor = mix({ r: 0, g: 0, b: 0 }, rgb(SEED[t].ground), alpha);
  return { theme: t, alpha, muted: cr(rgb(SEED[t].muted), floor), ink: cr(rgb(SEED[t].ink), floor) };
});
const lightAt16 = cr(rgb(SEED.light.muted), mix({ r: 0, g: 0, b: 0 }, rgb(SEED.light.ground), 0.16));
evidence.vignette = { composited: vig, lightAt16 };
check("vignette floor keeps --muted >= 4.5:1 in both themes",
  vig.every((v) => v.muted >= 4.5), vig.map((v) => `${v.theme} ${v.muted}:1 at ${v.alpha * 100}%`).join(" · "));
check("spec §5's derived light cap is real (16% on light would fail)",
  lightAt16 < 4.5, `--muted at 16% black over light ground = ${lightAt16}:1 — the 5% cap is load-bearing`);

/* ::selection — spec §2.1 says text stays --ink over accent-at-30%. */
const sel = ["dark", "light"].map((t) => ({
  theme: t, ratio: cr(rgb(SEED[t].ink), mix(rgb(SEED[t].accent), rgb(SEED[t].ground), 0.30))
}));
evidence.selection = sel;
check("::selection keeps --ink readable over --accent-selection",
  sel.every((s) => s.ratio >= 4.5), sel.map((s) => `${s.theme} ${s.ratio}:1`).join(" · "));

/* --------------------------------------------------------------- in-page --- */

const AUDIT = `(() => {
  const cs = (el) => getComputedStyle(el);
  const parse = (v) => { const m = String(v).match(/rgba?\\(([^)]+)\\)/); if (!m) return null;
    const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number);
    return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
  const hex = (c) => "#" + [c.r, c.g, c.b].map((v) => Math.round(v).toString(16).padStart(2, "0")).join("").toUpperCase();

  const all = [...document.querySelectorAll("body *")];

  /* --- OVERFLOW, measured element-by-element. documentElement.scrollWidth is
     NOT trustworthy here: body carries overflow-x:hidden, which propagates to
     the viewport and clamps scrollWidth to clientWidth. A box that sticks out
     is still a box that sticks out. --- */
  const vw = document.documentElement.clientWidth;
  const overflowing = all.filter((el) => {
    if (cs(el).position === "fixed") return false;
    const r = el.getBoundingClientRect();
    return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5);
  }).map((el) => {
    const r = el.getBoundingClientRect();
    return (el.className || el.tagName) + " [" + Math.round(r.left) + "→" + Math.round(r.right) + "] vs vw " + vw;
  });

  /* Same measurement with the mask lifted, so the reflow claim is falsifiable. */
  const prior = document.body.style.overflowX;
  document.body.style.overflowX = "visible";
  void document.body.offsetWidth;
  const unmasked = { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth };
  document.body.style.overflowX = prior;

  /* --- FULL-INK RULE (§3, A-007): a paragraph meant to be read is --ink.
     --muted only on t-label / t-micro elements. --- */
  const inkHex = hex(parse(cs(document.body).color));
  const mutedTok = cs(document.documentElement).getPropertyValue("--muted").trim();
  const readingSelectors = "p, li, dd, blockquote";
  const mutedProse = [...document.querySelectorAll(readingSelectors)].filter((el) => {
    const isLabel = el.classList.contains("t-label") || el.classList.contains("t-micro") ||
                    el.classList.contains("status") || el.closest(".statusbar");
    return !isLabel && hex(parse(cs(el).color)) !== inkHex;
  }).map((el) => (el.className || el.tagName) + " -> " + cs(el).color);

  /* --- RUST NEVER SETS SMALL TEXT (§2.3.1/§2.3.2). Any element whose own text
     renders in --accent below the 24px floor is a defect unless it is a
     graphical mark (no text content of its own). --- */
  const accentHex = hex(parse(cs(document.documentElement).getPropertyValue("--accent").trim() ?
    (() => { const p = document.createElement("span"); p.style.color = "var(--accent)"; document.body.appendChild(p);
             const c = cs(p).color; p.remove(); return c; })() : "rgb(0,0,0)"));
  const smallRust = all.filter((el) => {
    const ownText = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
    if (!ownText) return false;
    const size = parseFloat(cs(el).fontSize);
    const weight = Number(cs(el).fontWeight) || 400;
    if (hex(parse(cs(el).color)) !== accentHex) return false;
    return !(size >= 24 || (size >= 19 && weight >= 700));
  }).map((el) => (el.className || el.tagName) + " @" + cs(el).fontSize + " '" + el.textContent.trim().slice(0, 30) + "'");

  /* --- headings, landmarks, names --- */
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .map((h) => ({ level: +h.tagName[1], text: h.textContent.trim().replace(/\\s+/g, " "), id: h.id }));
  const sections = [...document.querySelectorAll("main > section")].map((s) => {
    const id = s.getAttribute("aria-labelledby");
    const label = id && document.getElementById(id);
    return { id: s.id, labelledby: id, labelResolves: Boolean(label), labelText: label ? label.textContent.trim().replace(/\\s+/g, " ") : null,
             labelIsDescendant: Boolean(label && s.contains(label)) };
  });

  /* --- every link and its accessible name --- */
  const links = [...document.querySelectorAll("a[href]")].map((a) => ({
    href: a.getAttribute("href"), name: (a.getAttribute("aria-label") || a.textContent).trim(),
    resolvesInPage: a.getAttribute("href").startsWith("#") ? Boolean(document.querySelector(a.getAttribute("href"))) : null
  }));

  /* --- images / icons --- */
  const imgs = [...document.querySelectorAll("img")].map((i) => ({ src: i.getAttribute("src"), alt: i.getAttribute("alt") }));

  /* --- decorative constructions must be hidden from AT --- */
  const ruleParts = [...document.querySelectorAll(".rule__line, .rule__tick, .tag__mark, .regmark, .brand__mark, .pulse")]
    .map((el) => ({ cls: el.className, hidden: el.getAttribute("aria-hidden") === "true" }));

  /* --- spacing: one-sided. Any rendered bottom margin is a defect. --- */
  const bottomMargins = all.filter((el) => parseFloat(cs(el).marginBottom) > 0)
    .map((el) => (el.className || el.tagName) + " mb " + cs(el).marginBottom);

  /* --- surfaces --- */
  const glass = all.filter((el) => { const b = cs(el).backdropFilter || cs(el).webkitBackdropFilter; return b && b !== "none"; }).map((e) => e.className);
  const shadows = all.filter((el) => cs(el).boxShadow !== "none").map((e) => e.className + "::" + cs(e).boxShadow);
  const rounded = all.filter((el) => { const r = cs(el).borderRadius; return r && !/^0px( 0px)*$/.test(r); }).map((e) => e.className + "::" + cs(e).borderRadius);
  const bar = document.querySelector(".statusbar");
  const barBg = parse(cs(bar).backgroundColor);
  const gradients = all.filter((el) => /gradient/.test(cs(el).backgroundImage) && !el.classList.contains("texture__vignette"))
    .map((e) => e.className);

  /* --- resolved layout tokens at this viewport --- */
  const root = cs(document.documentElement);
  const tokens = {};
  ["--rhythm","--gap-hairline","--gap-flow","--gap-block","--gap-major","--gap-section",
   "--page-max","--read-max","--gutter","--bp-wide","--pulse-period","--cursor-period",
   "--countup-duration","--reveal","--vignette-alpha","--grain-alpha",
   "--ground","--surface","--ink","--muted","--hair","--accent"].forEach((t) => { tokens[t] = root.getPropertyValue(t).trim(); });
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;height:var(--gap-section);width:var(--gutter)";
  document.body.appendChild(probe);
  const resolved = { gapSection: cs(probe).height, gutter: cs(probe).width };
  probe.remove();

  /* --- text inventory: every rendered string, for reduced-motion parity --- */
  const textInventory = [...document.querySelectorAll("h1,h2,h3,p,code,span.status__word,.brand")]
    .map((el) => el.textContent.trim().replace(/\\s+/g, " ")).join("\\u0001");

  /* --- placeholders --- */
  const placeholders = [...document.querySelectorAll("[data-shell-placeholder]")]
    .map((el) => el.tagName.toLowerCase() + "." + (el.className || "-"));

  /* --- live animations --- */
  const anims = document.getAnimations().map((a) => a.animationName || "css");

  return { vw, overflowing, unmasked, mutedProse, smallRust, accentHex, inkHex, headings, sections,
           links, imgs, ruleParts, bottomMargins, glass, shadows, rounded, gradients,
           statusBar: { h: Math.round(bar.getBoundingClientRect().height * 100) / 100, pos: cs(bar).position,
                        opaque: barBg.a === 1, bg: hex(barBg), border: cs(bar).borderBottomWidth + " " + hex(parse(cs(bar).borderBottomColor)) },
           tokens, resolved, textInventory, placeholders, anims,
           lang: document.documentElement.lang, title: document.title,
           viewportMeta: (document.querySelector('meta[name=viewport]') || {}).content,
           mainTabindex: document.getElementById("main").getAttribute("tabindex") };
})()`;

const chrome = await launchChrome();
const page = await chrome.browser.newPage();
await page.init();
mkdirSync(ARTIFACTS, { recursive: true });

try {
  /* ---------- overflow across the real boundary matrix ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  const VIEWPORTS = [
    ["320x568", 320, 568, 1], ["360x640", 360, 640, 1], ["375x553", 375, 553, 1],
    ["414x896", 414, 896, 1], ["768x1024", 768, 1024, 1],
    ["959 (bp-1)", 959, 800, 1], ["960 (bp=60rem)", 960, 800, 1], ["961 (bp+1)", 961, 800, 1],
    ["1024x768", 1024, 768, 1], ["1152 (page-max)", 1152, 800, 1], ["1440x900", 1440, 900, 1],
    ["1920x1080", 1920, 1080, 1], ["200% zoom (720x450)", 720, 450, 2]
  ];
  /* The reading measure the spec actually cares about. `ch` is the advance of
     "0", which in a proportional sans is far wider than the average prose
     character — so a 64ch column does not render 64 characters of prose. This
     breaks the real line into words at the rendered width and counts. */
  const MEASURE = `(() => {
    const p = document.querySelector("#hero .instrument p");
    const st = getComputedStyle(p);
    const width = p.getBoundingClientRect().width;
    const text = p.textContent.replace(/\\s+/g, " ").trim();
    const span = document.createElement("span");
    span.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font:" + st.font;
    document.body.appendChild(span);
    const per = []; let cur = "";
    for (const w of text.split(" ")) {
      const trial = cur ? cur + " " + w : w;
      span.textContent = trial;
      if (span.getBoundingClientRect().width > width && cur) { per.push(cur.length); cur = w; }
      else cur = trial;
    }
    if (cur) per.push(cur.length);
    span.remove();
    const full = per.slice(0, -1);
    const inst = p.closest(".instrument");
    return { colWidth: Math.round(width * 10) / 10, lines: per.length,
             charsPerLine: per, typicalChars: full.length ? Math.round(full.reduce((a, b) => a + b, 0) / full.length) : per[0],
             instrumentPadding: getComputedStyle(inst).paddingLeft,
             instrumentOuter: Math.round(inst.getBoundingClientRect().width * 10) / 10 };
  })()`;

  const overflowReport = [];
  const measures = [];
  for (const [label, w, h, dsf] of VIEWPORTS) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: dsf, mobile: w < 500 });
    await page.goto(PAGE_URL);
    const a = await page.eval(AUDIT);
    const m = await page.eval(MEASURE);
    measures.push({ label, width: w, ...m });
    overflowReport.push({ label, overflowing: a.overflowing, unmasked: a.unmasked, gapSection: a.resolved.gapSection, gutter: a.resolved.gutter });
    if (label === "375x553") { evidence.at375 = a; writeFileSync(join(ARTIFACTS, "qa-blink-375.png"), await page.screenshot()); }
    if (label === "320x568") writeFileSync(join(ARTIFACTS, "qa-blink-320.png"), await page.screenshot());
  }
  evidence.overflow = overflowReport;
  evidence.readingMeasure = measures;

  /* Reported as measurements, not as pass/fail against a number nobody has set:
     the spec says "~64ch" and the build sets exactly 64ch. These two checks
     assert only the floors a reader needs — prose must not fall to an
     unreadably narrow column, and must not run past the upper readability band. */
  const widest = measures.find((m) => m.width === 1440);
  const narrowest = measures.find((m) => m.width === 320);
  check("reading column stays inside the 45–75 character readability band at desktop widths",
    widest.typicalChars >= 45 && widest.typicalChars <= 75,
    `${widest.typicalChars} characters per line in ${widest.colWidth}px at 1440px — the 64ch token resolves to ${widest.colWidth}px`);
  check("prose column does not collapse below 45 characters at the narrowest supported width",
    narrowest.typicalChars >= 45,
    `${narrowest.typicalChars} characters per line in ${narrowest.colWidth}px at 320px ` +
    `(.instrument padding ${narrowest.instrumentPadding} a side, ${narrowest.lines} lines for a ${199}-character paragraph)`);
  const boxOverflow = overflowReport.filter((r) => r.overflowing.length);
  const scrollOverflow = overflowReport.filter((r) => r.unmasked.scrollWidth > r.unmasked.clientWidth);
  check("no element box escapes the viewport at any of 13 widths",
    boxOverflow.length === 0,
    boxOverflow.map((r) => `${r.label}: ${r.overflowing.join(" | ")}`).join(" ;; ") || "13/13 clean, measured per element");
  check("layout reflows without the overflow-x mask (falsifiable re-test)",
    scrollOverflow.length === 0,
    scrollOverflow.map((r) => `${r.label}: scrollWidth ${r.unmasked.scrollWidth} > clientWidth ${r.unmasked.clientWidth}`).join(" ;; ") || "13/13 clean with body overflow-x set to visible");

  /* ---------- full page audit, dark, 1440 ---------- */
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(PAGE_URL);
  const dark = await page.eval(AUDIT);
  evidence.dark = dark;
  const darkRequests = page.requests.slice();
  evidence.darkRequests = darkRequests;

  const external = darkRequests.filter((r) => !/^(file:|data:)/.test(r.url));
  check("zero external network requests (dark, 1440)", external.length === 0,
    `${darkRequests.length} loads: ${darkRequests.map((r) => r.url.startsWith("data:") ? "data:(grain/icon)" : r.url.split("/").pop()).join(", ")}`);
  check("no runtime errors (dark)", page.consoleErrors.length === 0, page.consoleErrors.join("; ") || "none");
  check("full-ink rule: no muted prose", dark.mutedProse.length === 0, dark.mutedProse.join(" | ") || "every p/li is --ink");
  check("no rust text below the 24px / 19px-bold floor", dark.smallRust.length === 0, dark.smallRust.join(" | ") || `none (accent resolves ${dark.accentHex})`);
  check("decorative rule/mark constructions are aria-hidden",
    dark.ruleParts.every((p) => p.hidden), dark.ruleParts.filter((p) => !p.hidden).map((p) => p.cls).join(", ") || `${dark.ruleParts.length}/${dark.ruleParts.length} hidden`);
  check("no rendered bottom margin anywhere (one-sided spacing)", dark.bottomMargins.length === 0, dark.bottomMargins.join(" | ") || "none");
  check("no glass, no shadow, no decorative gradient",
    dark.glass.length === 0 && dark.shadows.length === 0 && dark.gradients.length === 0,
    `glass ${dark.glass.length}, shadows ${dark.shadows.length}, gradients ${dark.gradients.length}`);
  check("sharp corners everywhere except the status lamp",
    dark.rounded.every((r) => /^pulse/.test(r)), dark.rounded.join(" | ") || "none");
  check("status bar: sticky, opaque --ground, 48px, 1px --hair rule",
    dark.statusBar.pos === "sticky" && dark.statusBar.opaque && dark.statusBar.h === 48 &&
    dark.statusBar.bg === SEED.dark.ground.toUpperCase() && dark.statusBar.border === "1px " + SEED.dark.hair.toUpperCase(),
    JSON.stringify(dark.statusBar));
  check("every section labelled by a heading it contains",
    dark.sections.length === 6 && dark.sections.every((s) => s.labelResolves && s.labelIsDescendant),
    dark.sections.map((s) => `${s.id}→${s.labelledby}${s.labelIsDescendant ? "✓" : "✗"}`).join(" "));
  check("one h1, no skipped levels",
    dark.headings.filter((h) => h.level === 1).length === 1 &&
    dark.headings.every((h, i) => i === 0 || h.level <= dark.headings[i - 1].level + 1),
    dark.headings.map((h) => "h" + h.level).join(" "));
  check("every in-page link resolves and has a name",
    dark.links.every((l) => l.name && (l.resolvesInPage === null || l.resolvesInPage)),
    dark.links.map((l) => `${l.href} "${l.name}"`).join(" · "));
  check("no <img> without alt (and none ships)", dark.imgs.every((i) => i.alt !== null), `${dark.imgs.length} images`);
  check("viewport meta does not disable zoom",
    !/user-scalable\s*=\s*no|maximum-scale\s*=\s*1(\b|\.0)/.test(dark.viewportMeta || ""), dark.viewportMeta);
  check("lang declared", dark.lang === "en", dark.lang);
  check("motion tokens match the spec exactly",
    dark.tokens["--pulse-period"] === "2.2s" && dark.tokens["--cursor-period"] === "1.15s" &&
    dark.tokens["--countup-duration"] === "1.2s" && dark.tokens["--reveal"] === "350ms ease-out",
    JSON.stringify({ p: dark.tokens["--pulse-period"], c: dark.tokens["--cursor-period"], u: dark.tokens["--countup-duration"], r: dark.tokens["--reveal"] }));
  check("--gap-section resolves inside the 96px–168px band",
    parseFloat(dark.resolved.gapSection) >= 96 && parseFloat(dark.resolved.gapSection) <= 168,
    `${dark.resolved.gapSection} at 900px tall (14vh = 126px)`);
  /* Three CSS animations, all belonging to ONE motion element (the pulse: two
     rings + the core). Elements 1 and 3 are not instantiated in the shell, so
     this asserts "nothing ambient runs that the pulse does not own" — it is not
     evidence that the three-element budget is filled. */
  check("only the pulse animates: 3 CSS animations, all its own, nothing else ambient",
    dark.anims.length === 3 && dark.anims.filter((n) => /^pulse/.test(n)).length === 3, dark.anims.join(", "));

  /* live contrast of every text-bearing element, both themes */
  const LIVE = `(() => {
    const cs = (el) => getComputedStyle(el);
    const parse = (v) => { const m = String(v).match(/rgba?\\(([^)]+)\\)/); const p = m[1].split(/[ ,\\/]+/).filter(Boolean).map(Number);
      return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; };
    const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
    const lum = (c) => { const f = (v) => (v /= 255) <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
      return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b); };
    const ratio = (a, b) => Math.round(((Math.max(lum(a), lum(b)) + 0.05) / (Math.min(lum(a), lum(b)) + 0.05)) * 100) / 100;
    const backdrop = (el) => { let n = el, stack = [];
      while (n) { const c = parse(cs(n).backgroundColor); if (c.a > 0) stack.push(c); if (c.a === 1) break; n = n.parentElement; }
      if (!stack.length) return { r: 255, g: 255, b: 255, a: 1 };
      let acc = stack[stack.length - 1];
      for (let i = stack.length - 2; i >= 0; i--) acc = over(stack[i], acc);
      return acc; };
    return [...document.querySelectorAll("body *")].filter((el) =>
      [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())
    ).map((el) => { const bg = backdrop(el); const fg = parse(cs(el).color);
      const size = parseFloat(cs(el).fontSize), weight = Number(cs(el).fontWeight) || 400;
      return { el: (el.className || el.tagName).toString().split(" ")[0], size, weight,
               ratio: ratio(fg.a === 1 ? fg : over(fg, bg), bg),
               large: size >= 24 || (size >= 18.66 && weight >= 700),
               text: el.textContent.trim().slice(0, 24) }; });
  })()`;

  const liveDark = await page.eval(LIVE);
  await page.setMedia({ colorScheme: "light", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const light = await page.eval(AUDIT);
  const liveLight = await page.eval(LIVE);
  evidence.live = { dark: liveDark, light: liveLight };
  evidence.light = light;
  writeFileSync(join(ARTIFACTS, "qa-blink-light-1440.png"), await page.screenshot());

  for (const [theme, live] of [["dark", liveDark], ["light", liveLight]]) {
    const fails = live.filter((r) => r.ratio < (r.large ? 3 : 4.5));
    check(`every rendered text run meets its WCAG floor (${theme})`, fails.length === 0,
      fails.map((f) => `${f.el} ${f.ratio}:1 @${f.size}px`).join(" | ") ||
      `${live.length} text runs, worst ${Math.min(...live.map((r) => r.ratio))}:1`);
  }
  check("light palette resolves to the seed's locked values",
    ["ground", "surface", "ink", "muted", "hair", "accent"].every((k) => light.tokens["--" + k].toUpperCase() === SEED.light[k]),
    JSON.stringify(["ground", "surface", "ink", "muted", "hair", "accent"].map((k) => light.tokens["--" + k])));
  check("light theme also passes the full-ink and small-rust rules",
    light.mutedProse.length === 0 && light.smallRust.length === 0,
    `mutedProse ${light.mutedProse.length}, smallRust ${light.smallRust.length}`);

  /* ---------- keyboard: real Tab, real :focus-visible ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const tab = async () => {
    for (const type of ["rawKeyDown", "keyUp"])
      await page.call("Input.dispatchKeyEvent", { type, key: "Tab", code: "Tab", windowsVirtualKeyCode: 9, nativeVirtualKeyCode: 9 });
  };
  await tab();
  const firstStop = await page.eval(`(() => { const el = document.activeElement; const s = getComputedStyle(el);
    return { cls: el.className, tag: el.tagName, text: el.textContent.trim(),
             outline: s.outlineWidth + " " + s.outlineStyle + " " + s.outlineColor, offset: s.outlineOffset,
             top: el.getBoundingClientRect().top, matchesFocusVisible: el.matches(":focus-visible") }; })()`);
  evidence.keyboard = { firstStop };
  check("first Tab lands on the skip link, revealed and ring-styled",
    firstStop.cls === "skip-link" && firstStop.matchesFocusVisible && firstStop.top >= 0 &&
    /^2px solid/.test(firstStop.outline) && firstStop.offset === "3px",
    JSON.stringify(firstStop));

  const activated = await page.eval(`(() => { document.querySelector(".skip-link").click();
    return { active: document.activeElement.id || document.activeElement.tagName, hash: location.hash }; })()`);
  check("skip link actually moves focus to <main>", activated.active === "main", JSON.stringify(activated));
  check("<main> is focusable for WebKit's benefit", dark.mainTabindex === "-1", `tabindex=${dark.mainTabindex}`);

  const tabOrder = await page.eval(`(() => [...document.querySelectorAll('a[href],button,input,select,textarea,[tabindex]:not([tabindex="-1"])')]
    .map((el) => (el.className || el.tagName) + ":" + (el.getAttribute("tabindex") ?? "0")))()`);
  evidence.tabOrder = tabOrder;
  check("no keyboard trap: focus order is the DOM order and is one stop long",
    tabOrder.length === 1 && tabOrder[0].startsWith("skip-link"), tabOrder.join(" → "));

  /* ---------- reduced motion: complete content, string-for-string ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const still = await page.eval(AUDIT);
  evidence.reduced = { anims: still.anims, placeholders: still.placeholders.length };
  writeFileSync(join(ARTIFACTS, "qa-blink-reduced.png"), await page.screenshot());
  check("reduced motion: nothing animates", still.anims.length === 0, still.anims.join(", ") || "0 running animations");
  check("reduced motion: every rendered string is identical to the motion path",
    still.textInventory === dark.textInventory,
    still.textInventory === dark.textInventory
      ? `${dark.textInventory.split(String.fromCharCode(1)).length} strings identical`
      : "TEXT DIVERGES between motion and reduced-motion paths");
  check("reduced motion: the lamp stays lit and labelled",
    still.tokens["--accent"] === dark.tokens["--accent"] && /OPERATIONAL/.test(still.textInventory), "core solid + word present");

  /* ---------- offline: no network stack at all ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.call("Network.emulateNetworkConditions", { offline: true, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  await page.goto(PAGE_URL);
  const offline = await page.eval(AUDIT);
  const offlineShot = await page.screenshot();
  writeFileSync(join(ARTIFACTS, "qa-blink-offline.png"), offlineShot);
  await page.call("Network.emulateNetworkConditions", { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
  evidence.offline = { requests: page.requests.map((r) => r.url.slice(0, 40)), errors: page.consoleErrors };
  check("page renders complete with the network switched off",
    offline.textInventory === dark.textInventory && offline.placeholders.length === dark.placeholders.length && page.consoleErrors.length === 0,
    `${offline.placeholders.length} slots, identical text, ${page.consoleErrors.length} errors, ${offlineShot.length} byte render`);

  /* ---------- coarse pointer ---------- */
  await page.setViewport({ width: 375, height: 553, mobile: true });
  await page.goto(PAGE_URL);
  const coarse = await page.eval(`(() => [...document.querySelectorAll('a[href],button')].map((el) => {
    const r = el.getBoundingClientRect(); el.focus(); const f = el.getBoundingClientRect();
    return { cls: el.className, w: Math.round(f.width), h: Math.round(f.height) }; }))()`);
  evidence.coarse = coarse;
  check("interactive targets meet 44px on a coarse pointer (or are keyboard-only)",
    coarse.every((t) => (t.w >= 44 && t.h >= 44) || t.cls === "skip-link"),
    coarse.map((t) => `${t.cls} ${t.w}x${t.h}`).join(" · ") + " — skip-link is keyboard-only by construction");
} finally {
  await page.close();
  await chrome.close();
}

const failed = results.filter((r) => !r.passed);
const w = Math.max(...results.map((r) => r.name.length));
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, evidence }, null, 2));
} else {
  for (const r of results) console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(w)}  ${r.detail ?? ""}`);
  console.log(`\n${results.length - failed.length}/${results.length} QA checks passed.`);
}
writeFileSync(join(ARTIFACTS, "qa-independent-report.json"), JSON.stringify({ results, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
