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
import { decodePng, findGroundPatch, hexLuminance } from "./lib/png.mjs";
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTIFACTS = join(ROOT, "tests", "artifacts");
const PAGE_URL = "file://" + join(ROOT, "index.html");

const results = [];
const evidence = {};
const check = (name, passed, detail) => results.push({ name, passed: Boolean(passed), detail });

/* Measurements the founder and PM need on the record but which nothing asserts
   against a threshold — a character count folds in font metrics and line-break
   raggedness, and a beat interval is a pacing judgment, not a pass/fail. These
   print alongside the checks and never affect the exit code. */
const reports = [];
const report = (name, detail) => reports.push({ name, detail });

/* ---- §2 sources, read from the authorities rather than restated here ----
   The corpus is the only permitted source for terminal lines; the narration
   file is authoritative for every §2 string (DEC-022). Both are parsed at test
   time so a drift between spec and build cannot pass by being copied into a
   fixture. */
const CORPUS_PATH = join(ROOT, "knowledge-base", "bodh-sprint4-corpus.md");
const NARRATION_PATH = join(ROOT, "knowledge-base", "design-specs", "web", "section-02-narration.md");
const corpusText = readFileSync(CORPUS_PATH, "utf8");
const narrationText = readFileSync(NARRATION_PATH, "utf8");

const CORPUS_LINES = (corpusText.match(/## Terminal-line inventory[^\n]*\n```\n([\s\S]*?)```/) || [])[1]
  .replace(/\n$/, "").split("\n");

const narrSection = (from, to) =>
  narrationText.slice(narrationText.indexOf(from), narrationText.indexOf(to));
const NARRATION_SLOTS = [...narrSection("## 3. The narration", "## 4. Beat display").matchAll(/```\n([\s\S]*?)\n```/g)]
  .map((m) => m[1]);
const BEAT_NAMES = [...narrSection("## 4. Beat display", "## 5. Section chrome").matchAll(/\|\s*B(\d)\s*\|\s*`([^`]+)`\s*\|/g)]
  .map((m) => m[2]);
const chromeString = (re) => (narrSection("## 5. Section chrome", "## 6. End-state") .match(re) || [])[1];
const CHROME = {
  heading: chromeString(/`(§02 · WATCH IT SHIP)`/),
  labelWide: chromeString(/`(BODH · SPRINT 4 — CONDENSED FROM THE REAL BUILD LOG)`/),
  labelNarrow: chromeString(/`(CONDENSED FROM THE REAL BUILD LOG)`\n/),
  live: chromeString(/\*\*Live indicator word\*\*: `([^`]+)`/),
  totalsValue: chromeString(/`(~64 MIN AGENT WORK[^`]*)`/),
  totalsScope: chromeString(/`(BODH SPRINT 4 · WEBSITE WAVE ONLY)`/),
  skip: chromeString(/`(⏭ SHOW FULL LOG)`/),
  replay: chromeString(/`(⟲ REPLAY)`/)
};

/* Replay spec §5.1, offsets in ms of chain time. Transcribed from the spec
   table, not read out of scripts/replay.js — the build is checked against the
   design, never against itself. */
const SPEC_LINE_AT = [0, 350, 6400, 13600, 23200, 26400, 29600, 32800, 39400, 39750, 43200, 48000];
const SPEC_SLOT_AT = { sp1: 350, sp2: 6400, sp3: 13600, sp4a: 23200, sp4b: 26400, sp4c: 29600, sp5: 32800, sp6: 39750, sp7: 43200, sp8: 48000 };

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

/* ---- source integrity (A-001): founder-authored files are read-only to every
   agent. Proven from git, not from a promise: every commit that has ever
   touched them, and a clean working tree. ---- */
const gitLines = (args) => execFileSync("git", args, { cwd: ROOT, encoding: "utf8" }).trim();
const READ_ONLY = [
  "knowledge-base/bodh-sprint4-corpus.md",
  "knowledge-base/product-spec-seed.md",
  "knowledge-base/design-specs/direction-reference.html"
];
const sourceHistory = READ_ONLY.map((path) => ({
  path,
  commits: gitLines(["log", "--format=%h %s", "--", path]).split("\n").filter(Boolean),
  dirty: gitLines(["status", "--porcelain", "--", path]).length > 0
}));
evidence.sourceHistory = sourceHistory;
const touchedByAgent = sourceHistory.flatMap((f) =>
  f.commits.filter((c) => !/^\w+ founder:/.test(c)).map((c) => `${f.path} ← ${c}`));
check("founder source material carries only founder commits and no working-tree edits",
  touchedByAgent.length === 0 && sourceHistory.every((f) => !f.dirty),
  touchedByAgent.join(" | ") ||
    sourceHistory.map((f) => `${f.path.split("/").pop()} ${f.commits.length} commit(s), clean`).join(" · "));
check("the corpus is unmodified since the founder's v1.1 commit 025842c",
  gitLines(["log", "-1", "--format=%h", "--", "knowledge-base/bodh-sprint4-corpus.md"]) === "025842c" &&
    gitLines(["diff", "HEAD", "--stat", "--", "knowledge-base/bodh-sprint4-corpus.md"]) === "",
  `HEAD blob ${gitLines(["hash-object", CORPUS_PATH])} · last commit ${gitLines(["log", "-1", "--format=%h %s", "--", "knowledge-base/bodh-sprint4-corpus.md"])}`);

check("the corpus terminal inventory parses to twelve lines",
  CORPUS_LINES.length === 12, `${CORPUS_LINES.length} lines, ${CORPUS_LINES.join("").length} characters of source`);
check("the narration file parses to ten slot strings and six beat names",
  NARRATION_SLOTS.length === 10 && BEAT_NAMES.length === 6,
  `${NARRATION_SLOTS.length} slots · ${BEAT_NAMES.join(", ")}`);
check("every §2 chrome string is present in the narration file's §5",
  Object.values(CHROME).every(Boolean),
  Object.entries(CHROME).filter(([, v]) => !v).map(([k]) => k).join(", ") || "8/8 parsed from the authority");

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
  /* An element inside a container that clips its own overflow cannot escape
     the viewport, however wide its box is — §2's log is exactly that, and its
     horizontal scroll is a scoped WCAG 1.4.10 exception the spec makes on
     purpose. The clipping ancestor is itself in this sweep, so nothing is
     excused: a container that escapes is still reported. */
  const clipper = (el) => { let n = el.parentElement;
    while (n && n !== document.body) { const o = cs(n);
      if (o.overflowX !== "visible" || o.overflowY !== "visible") return n; n = n.parentElement; }
    return null; };
  const overflowing = all.filter((el) => {
    if (cs(el).position === "fixed") return false;
    if (clipper(el)) return false;
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
  /* A label's type is set on the element that owns the type token, and a list
     of labels sets it on the list — §1's eyebrow is four <li> facts inside a
     .t-label <ul>, and each fact inherits the muted colour from it. Closest,
     not classList: a muted READING paragraph still fails, which is the rule,
     while an item inside a label container is correctly not one. */
  const mutedProse = [...document.querySelectorAll(readingSelectors)].filter((el) => {
    const isLabel = el.closest(".t-label, .t-micro, .status, .statusbar, .readout__value");
    return !isLabel && hex(parse(cs(el).color)) !== inkHex;
  }).map((el) => (el.className || el.tagName) + " -> " + cs(el).color);

  /* An instrument readout VALUE is not prose, and it is the one thing on this
     page that is deliberately neither ink nor muted: page-shell.md §8 sets it
     in --accent at --text-readout, flat and tabular, with an --ink em-dash
     when the metric is unmeasured. It leaves the full-ink rule above for a
     STRICTER one rather than for nothing — every value is collected here and
     asserted against §8 and against §2.3's 24px floor for accent text, so the
     exclusion cannot hide a rust label or a tinted number. */
  const readoutValues = [...document.querySelectorAll(".readout__value")].map((el) => ({
    what: el.className,
    colour: hex(parse(cs(el).color)),
    size: parseFloat(cs(el).fontSize),
    tabular: cs(el).fontVariantNumeric,
    /* Derived from the CONTENT, never from the class: the em-dash IS the
       unanswered glyph, and a value slot holding anything else is an answer.
       Keyed on the class instead, this check would wave through a dash
       painted rust the moment someone dropped the modifier — and a rust dash
       reads as a metric that happens to be zero.

       Not keyed on digits: the value slot's colour is the answered/unanswered
       channel, not a numeral/word distinction. A hostname is a place a reader
       can open, and THIS PAGE is the one cell that cannot be unmeasured —
       both are answers, and both take the accent beside the numeral. */
    unmeasured: el.textContent.trim() === "—",
    modifier: el.classList.contains("readout__value--unmeasured"),
    text: el.textContent.trim()
  }));

  /* --- RUST NEVER SETS SMALL TEXT (§2.3.1/§2.3.2). Any element whose own text
     renders in --accent below the 24px floor is a defect unless it is a
     graphical mark (no text content of its own). --- */
  const accentHex = hex(parse(cs(document.documentElement).getPropertyValue("--accent").trim() ?
    (() => { const p = document.createElement("span"); p.style.color = "var(--accent)"; document.body.appendChild(p);
             const c = cs(p).color; p.remove(); return c; })() : "rgb(0,0,0)"));
  const rustRuns = all.filter((el) => {
    const ownText = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
    if (!ownText) return false;
    const size = parseFloat(cs(el).fontSize);
    const weight = Number(cs(el).fontWeight) || 400;
    if (hex(parse(cs(el).color)) !== accentHex) return false;
    return !(size >= 24 || (size >= 19 && weight >= 700));
  });
  /* Two glyphs are named exceptions, each held to the 3:1 non-text floor
     rather than 4.5:1, and each separated here rather than waved through —
     what makes them safe is asserted, not assumed:
       - the corpus's ✓ (replay spec §9), redundant with the line's 2px accent
         mark and its bold ink token;
       - the VERIFY chip's ⎘ (page-shell §8's chip motif — accent border, INK
         text, rust glyph), which is aria-hidden and sits beside the ink word
         that carries the meaning.
     A rust run that is neither remains a defect. */
  const GLYPH_CLASSES = ["log__glyph", "chip__glyph"];
  const isGlyph = (el) => GLYPH_CLASSES.some((c) => el.classList.contains(c));
  const graphicalRust = rustRuns.filter(isGlyph).map((el) => {
    const redundant = el.classList.contains("log__glyph")
      ? (el.closest(".log__line--key") ? "a key-beat line that also carries a mark and a bold token" : "AN UNMARKED LINE")
      : (el.getAttribute("aria-hidden") === "true" && /VERIFY/.test(el.parentElement.textContent)
          ? "an aria-hidden mark beside the ink word VERIFY" : "AN UNMARKED CHIP");
    return (el.className || el.tagName) + " @" + cs(el).fontSize + " '" + el.textContent.trim() + "' in " + redundant;
  });
  const smallRust = rustRuns.filter((el) => !isGlyph(el))
    .map((el) => (el.className || el.tagName) + " @" + cs(el).fontSize + " '" + el.textContent.trim().slice(0, 30) + "'");

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
  /* .log__mark and .brand__rule belong in this sweep for opposite reasons: the
     first is a new element in the middle of a log line, the second is the one
     mark on the page whose accessible name is a real question rather than an
     obvious one — the ruling is that the header announces exactly MUSTER, and a
     typed underscore that reached the AT layer would be announced as "underscore",
     as "line", or as nothing, differently per reader. */
  const ruleParts = [...document.querySelectorAll(".rule__line, .rule__tick, .tag__mark, .regmark, .brand__mark, .brand__rule, .log__mark, .pulse")]
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
  /* Playback state is not content: the beat indicator is aria-hidden and reads
     the position of a chain that a reduced-motion reader never runs, and the
     controls exist only where there is playback to control (spec §8). Both are
     excluded so this compares what a reader is told, not what state says. */
  const textInventory = [...document.querySelectorAll("h1,h2,h3,p,code,span.status__word,.brand")]
    .filter((el) => !el.hasAttribute("data-beat-indicator") && !el.closest(".replay__controls"))
    .map((el) => el.textContent.trim().replace(/\\s+/g, " ")).join("\\u0001");

  /* --- placeholders --- */
  const placeholders = [...document.querySelectorAll("[data-shell-placeholder]")]
    .map((el) => el.tagName.toLowerCase() + "." + (el.className || "-"));

  /* --- live animations --- */
  /* getAnimations() returns transitions too, and they are not the same claim:
     the motion budget counts ambient animation, while §2's reveal is content
     playback (DEC-015). Both are reported, separately. */
  const running = document.getAnimations();
  const anims = running.filter((a) => a.animationName).map((a) => a.animationName);
  const transitions = running.filter((a) => !a.animationName)
    .map((a) => (a.effect?.target?.className || "?") + ":" + (a.transitionProperty || "?"));

  return { vw, overflowing, unmasked, mutedProse, readoutValues, smallRust, accentHex, inkHex, headings, sections,
           graphicalRust, links, imgs, ruleParts, bottomMargins, glass, shadows, rounded, gradients,
           statusBar: { h: Math.round(bar.getBoundingClientRect().height * 100) / 100, pos: cs(bar).position,
                        opaque: barBg.a === 1, bg: hex(barBg), border: cs(bar).borderBottomWidth + " " + hex(parse(cs(bar).borderBottomColor)) },
           tokens, resolved, textInventory, placeholders, anims, transitions,
           lamps: document.querySelectorAll(".pulse").length,
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
    /* The reading measure is taken from a rendered body paragraph at the full
       64ch column — §3's is the permanent target; while shell placeholders
       remain they carry the same column and stand in for it. The
       instrument-inset probe below measures .instrument directly rather than
       this paragraph's ancestor, so the two can move apart without either
       going blind. */
    const p = document.querySelector("#the-insight p.read") ||
              document.querySelector(".instrument p.read") ||
              document.querySelector("main p.read");
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
    const inst = document.querySelector(".instrument");
    return { colWidth: Math.round(width * 10) / 10, lines: per.length,
             probe: p.closest("section") ? p.closest("section").id : "?",
             charsPerLine: per, typicalChars: full.length ? Math.round(full.reduce((a, b) => a + b, 0) / full.length) : per[0],
             instrumentPadding: inst ? getComputedStyle(inst).paddingLeft : null,
             instrumentOuter: inst ? Math.round(inst.getBoundingClientRect().width * 10) / 10 : null };
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

  /* DEC-023 — the founder ruled the reading column ships at `64ch`, comparing
     the shipped width against 65- and 70-character alternatives set in the
     page's own tokens. The 45–75-character band is therefore a standard this
     product has deliberately declined, and a check asserting it would exit
     non-zero on every clean build for as long as the page exists. It is
     retired as an assertion and kept as a measurement, so the number stays on
     the record without the false signal. Same disposition as the 45-character
     floor below: replace a wrong threshold, never loosen a right one. */
  const widest = measures.find((m) => m.width === 1440);
  report("reading column, measured at desktop widths (DEC-023 — reported, not asserted)",
    `${widest.typicalChars} prose characters per line in ${widest.colWidth}px at 1440px — the 64ch token resolves ` +
    `to ${widest.colWidth}px, which is the shipped value the founder chose; the common band is 45–75 characters`);
  /* DEC-021.1–2 — this replaces a 45-character floor at 320px that no build
     could ever satisfy: 45 × 7.615px of average prose advance is 342.7px,
     wider than the viewport itself, so the check was failing on arithmetic
     rather than on the page. What a card can actually be held to is how much
     of itself it spends on padding, which is deterministic. The measured
     character count is reported instead of asserted, for the same reason the
     narration card's line count is: it folds in font metrics and line-break
     raggedness that no threshold can own. The build was fixed in this wave
     too, so this is not red going green on a threshold alone. */
  const phones = measures.filter((m) => m.width <= 375);
  const insetShare = phones.filter((m) => m.instrumentPadding !== null).map((m) => ({
    label: m.label,
    inset: Math.round(parseFloat(m.instrumentPadding) * 2 * 10) / 10,
    card: m.instrumentOuter,
    share: Math.round((parseFloat(m.instrumentPadding) * 2 / m.instrumentOuter) * 1000) / 10
  }));
  evidence.instrumentInset = insetShare;
  /* The length guard is the point of a check that can fail: when the last
     .instrument surface leaves the page the assertion has no subject, and an
     empty `every` would report a pass on nothing measured. */
  check(".instrument spends no more than 20% of its width on horizontal inset at <= 375px",
    insetShare.length > 0 && insetShare.every((p) => p.share <= 20),
    insetShare.length
      ? insetShare.map((p) => `${p.label}: ${p.inset}/${p.card} = ${p.share}%`).join(" · ")
      : "no .instrument surface on the page — re-target this probe");
  report("prose characters per line on a phone (reported, not asserted)",
    phones.map((p) => {
      const m = measures.find((x) => x.label === p.label);
      return `${m.label}: ${m.typicalChars} chars in ${m.colWidth}px over ${m.lines} lines`;
    }).join(" · ") + " — ceiling at 320px is ~36 characters even with a zero-inset card");
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
  /* The other side of that exclusion: readout values are held to §8 and to
     §2.3's 24px accent floor, which is a harder rule than the one they left. */
  /* And the page carries NO unanswered value: every readout key on the page
     is answered, so a dash anywhere — or a cell wearing the unmeasured
     modifier, whatever its content — is a claim the page no longer makes and
     fails here by name. Both the content (an em-dash) and the class (the
     modifier) are swept, so the two cannot disagree silently either. */
  check("every readout value is flat accent at or above the 24px accent floor, tabular, and none is unmeasured",
    dark.readoutValues.length > 0 &&
      dark.readoutValues.filter((v) => v.unmeasured || v.modifier).length === 0 &&
      dark.readoutValues.every((v) => v.size >= 24 && /tabular-nums/.test(v.tabular) &&
        v.colour === dark.accentHex),
    dark.readoutValues.map((v) => `${JSON.stringify(v.text)} ${v.colour} @${v.size}px`).join(" · ") +
      ` — ${dark.readoutValues.filter((v) => v.unmeasured || v.modifier).length} unanswered of ${dark.readoutValues.length}, zero expected` || "no readout values on the page");
  check("no rust sets small text except the two glyphs the specs exempt as graphical marks",
    dark.smallRust.length === 0 && dark.graphicalRust.length === 2 &&
      !dark.graphicalRust.some((g) => /UNMARKED/.test(g)),
    dark.smallRust.length ? dark.smallRust.join(" | ")
      : `0 informational rust runs; ${dark.graphicalRust.length} graphical: ${dark.graphicalRust.join(" | ")} (accent resolves ${dark.accentHex})`);
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
  /* The budget counts motion ELEMENTS, not animation instances. The pulse is
     one element (two rings + a core = three animations) and §2's terminal live
     indicator is the same element instantiated a second time — replay spec §7
     annotation 3 names it "the shell's pulse dot — motion element 2's terminal
     instance". So the assertion is that every running animation belongs to the
     pulse and that the lamps are the two the specs name, not that the instance
     count is three. Elements 1 and 3 are still not instantiated, so this is
     evidence that nothing ambient runs which the pulse does not own — not that
     the three-element budget is filled. */
  /* The budget is two live elements plus the curl cursor, the named permitted
     extra (page-shell §10.3). So every running animation must be either the
     pulse or that single cursor, and there must be exactly one cursor — a
     further ambient element fails, which is the relationship this exists
     for. */
  check("only the pulse and the one curl cursor animate, across the two lamps the specs name",
    dark.lamps === 2 && dark.anims.filter((n) => /^pulse-(ring|core)$/.test(n)).length === 6 &&
      dark.anims.filter((n) => n === "pulse-core").length === 2 &&
      dark.anims.filter((n) => n === "cursor-blink").length === 1 &&
      dark.anims.every((n) => /^(pulse-(ring|core)|cursor-blink)$/.test(n)),
    `${dark.lamps} .pulse lamps (status bar + §2 terminal live indicator) × 2 rings + 1 core, plus §6's cursor = ${dark.anims.length}: ${dark.anims.join(", ")}`);
  check("§2's reveal is a transition on the transcript, not a fourth ambient motion element (DEC-015)",
    dark.transitions.every((t) => /log__line|narration__entry/.test(t)),
    `${dark.transitions.length} transitions, all on log lines and narration entries — opacity and transform only`);

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

  const GLYPHS = ["log__glyph", "chip__glyph"];
  for (const [theme, live] of [["dark", liveDark], ["light", liveLight]]) {
    const prose = live.filter((r) => !GLYPHS.includes(r.el));
    const fails = prose.filter((r) => r.ratio < (r.large ? 3 : 4.5));
    check(`every rendered text run meets its WCAG floor (${theme})`, fails.length === 0,
      fails.map((f) => `${f.el} ${f.ratio}:1 @${f.size}px`).join(" | ") ||
      `${prose.length} text runs, worst ${Math.min(...prose.map((r) => r.ratio))}:1`);
    const glyphs = live.filter((r) => GLYPHS.includes(r.el));
    check(`both graphical rust glyphs clear the 3:1 non-text floor (${theme})`,
      glyphs.length === 2 && glyphs.every((g) => g.ratio >= 3),
      glyphs.map((g) => `${g.el} ${g.ratio}:1 @${g.size}px`).join(" · ") +
        " — below the 4.5:1 text floor by design, each redundant with ink text beside it");
  }
  check("light palette resolves to the seed's locked values",
    ["ground", "surface", "ink", "muted", "hair", "accent"].every((k) => light.tokens["--" + k].toUpperCase() === SEED.light[k]),
    JSON.stringify(["ground", "surface", "ink", "muted", "hair", "accent"].map((k) => light.tokens["--" + k])));
  check("light theme also passes the full-ink, small-rust and readout-value rules",
    light.mutedProse.length === 0 && light.smallRust.length === 0 && light.graphicalRust.length === 2 &&
      light.readoutValues.length === dark.readoutValues.length &&
      light.readoutValues.filter((v) => v.unmeasured || v.modifier).length === 0 &&
      light.readoutValues.every((v) => v.size >= 24 && v.colour === light.accentHex),
    `mutedProse ${light.mutedProse.length}, informational smallRust ${light.smallRust.length}, graphical ${light.graphicalRust.length}, readout values ${light.readoutValues.length} (${light.readoutValues.filter((v) => v.unmeasured || v.modifier).length} unmeasured, zero expected)`);

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
  /* The stop list grows as sections ship, so a fixed expected list would fail
     a correct build every time one arrives. The relationship that holds
     whatever ships is asserted instead: real Tab keys visit every focusable
     exactly once, in document order. A trap repeats a stop; a tabindex that
     reorders the page diverges from document order; both fail. */
  /* A fresh load, so the sequential-navigation starting point is the document
     and not wherever the skip-link test left focus. */
  await page.goto(PAGE_URL);
  /* Each stop is compared with the one before it by compareDocumentPosition,
     not by its index in a queried list. Two things defeat a list: §2's
     narration list is a scroll container, which Chrome makes keyboard-
     focusable with no tabindex attribute at all (WCAG 2.1.1, and correct), so
     no attribute selector can enumerate it; and it is a scroll container only
     in some states and breakpoints, so the set is not constant during a
     traversal. Document order is the relationship that must hold regardless:
     focus advances, and never returns to something it already visited. */
  await page.eval(`(() => { window.__qaPrev = null; window.__qaSeen = []; })()`);
  const walked = [];
  for (let i = 0; i < tabOrder.length + 2; i++) {
    await tab();
    walked.push(await page.eval(`(() => {
      const el = document.activeElement;
      if (!el || el === document.body || el === document.documentElement) return { at: "(document)", follows: null, repeat: false };
      const prev = window.__qaPrev;
      const follows = prev ? Boolean(prev.compareDocumentPosition(el) & Node.DOCUMENT_POSITION_FOLLOWING) : true;
      const repeat = window.__qaSeen.includes(el);
      window.__qaSeen.push(el);
      window.__qaPrev = el;
      return { at: (el.className || el.tagName) + ":" + (el.getAttribute("tabindex") ?? "implicit"), follows, repeat };
    })()`));
  }
  const stops = walked.filter((w) => w.at !== "(document)");
  evidence.tabWalked = { domOrderAtStart: tabOrder, walked };
  check("no keyboard trap: real Tab visits every focusable once, in DOM order",
    stops.length > 0 && stops[0].at.startsWith("skip-link") &&
      stops.every((s) => s.follows === true) && !stops.some((s) => s.repeat),
    `DOM-enumerable at start: ${tabOrder.join(" → ")}  |  tabbed: ${walked.map((w) => w.at).join(" → ")}` +
      ` (each stop follows the last in document order: ${stops.every((s) => s.follows)})`);

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

  /* ---------- coarse pointer ----------
     A mobile viewport is not a coarse pointer: setDeviceMetricsOverride
     changes the size, not the pointer, so `@media (pointer: coarse)` never
     matched here and the rule that grows every hit area to 44px was never
     actually exercised — the check reported the fine-pointer visual instead
     and would have passed a page with no hit-area rule at all.

     Measured three ways before choosing: a mobile viewport alone reports
     pointer: coarse false, `Emulation.setEmulatedMedia` does not carry
     `pointer` as a feature (also false), and touch emulation reports true.
     So touch emulation is what puts the page in the state this check
     names. */
  await page.setViewport({ width: 375, height: 553, mobile: true });
  await page.call("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 5 });
  await page.goto(PAGE_URL);
  const pointerState = await page.eval(`matchMedia("(pointer: coarse)").matches`);
  check("the coarse-pointer probe actually runs on a coarse pointer",
    pointerState === true, `matchMedia("(pointer: coarse)") reports ${pointerState}`);
  const coarse = await page.eval(`(() => [...document.querySelectorAll('a[href],button')].map((el) => {
    const r = el.getBoundingClientRect(); el.focus(); const f = el.getBoundingClientRect();
    return { cls: el.className, w: Math.round(f.width), h: Math.round(f.height) }; }))()`);
  evidence.coarse = coarse;
  check("interactive targets meet 44px on a coarse pointer (or are keyboard-only)",
    coarse.length > 0 && coarse.every((t) => (t.w >= 44 && t.h >= 44) || t.cls === "skip-link"),
    coarse.map((t) => `${t.cls} ${t.w}x${t.h}`).join(" · ") + " — skip-link is keyboard-only by construction");
  await page.call("Emulation.setTouchEmulationEnabled", { enabled: false });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });

  /* ======================================================================
     §2 — the two-layer replay.

     Scope derived from design-specs/web/section-02-replay.md and
     section-02-narration.md directly, per the QA context file, so a gap in the
     developer's charter does not become a gap here too. Everything below is
     BLINK evidence unless the WebKit block at the foot says otherwise.
     ====================================================================== */

  const S02_STATIC = `(() => {
    const cs = (el) => getComputedStyle(el);
    const boxes = (el) => { const r = document.createRange(); r.selectNodeContents(el); return r.getClientRects().length; };
    const rect = (el) => { const r = el.getBoundingClientRect();
      return { top: +r.top.toFixed(2), bottom: +r.bottom.toFixed(2), left: +r.left.toFixed(2),
               right: +r.right.toFixed(2), width: +r.width.toFixed(2), height: +r.height.toFixed(2) }; };
    /* What a sighted reader actually sees: hidden children contribute to
       textContent but not to the page. The chrome label drops its run prefix
       below --bp-wide, so this distinction is the check. */
    const visibleText = (el) => [...el.childNodes]
      .filter((n) => n.nodeType === 3 || cs(n).display !== "none")
      .map((n) => n.textContent).join("");

    const section = document.querySelector("#watch-it-ship");
    const replay = document.querySelector(".replay");
    const core = document.querySelector(".replay__core");
    const terminal = document.querySelector(".terminal");
    const log = document.querySelector(".log");
    const narration = document.querySelector(".narration");
    const list = document.querySelector(".narration__list");
    const totals = document.querySelector(".totals");
    const value = document.querySelector(".totals__value");
    const scope = document.querySelector(".totals__scope");
    const label = document.querySelector(".terminal__label");
    const lines = [...document.querySelectorAll(".log__line")];
    const entries = [...document.querySelectorAll(".narration__entry")];

    const ls = cs(log);
    const lineBox = parseFloat(ls.lineHeight);
    const padT = parseFloat(ls.paddingTop), padB = parseFloat(ls.paddingBottom);
    const lr = log.getBoundingClientRect();
    /* Measured off layout offsets, not client rects: an unrevealed line carries
       the reveal's 4px translate, which would make a line that fits the window
       read as one that does not. The transform is the animation, not the box. */
    const contentH = lr.height - padT - padB;
    const base = lines[0].offsetTop;
    const wholeLinesVisible = lines.filter((li) => {
      const top = li.offsetTop - base - log.scrollTop;
      return li.offsetHeight > 0 && top >= -0.6 && top + li.offsetHeight <= contentH + 0.6;
    }).length;
    /* A line that intersects the window without fitting inside it is a line
       sliced through its rows — what §7.1 rule 2 forbids. Counted at the
       window's resting position, where the quantisation either holds or does
       not; the sampler covers the moving case. */
    const partialLinesVisible = lines.filter((li) => {
      const top = li.offsetTop - base - log.scrollTop, bottom = top + li.offsetHeight;
      return li.offsetHeight > 0 && bottom > 0.6 && top < contentH - 0.6 &&
             !(top >= -0.6 && bottom <= contentH + 0.6);
    }).length;

    const sp3 = entries.find((e) => e.dataset.slot === "sp3");
    const sp3Text = sp3.querySelector(".narration__text");

    return {
      vw: document.documentElement.clientWidth,
      vh: document.documentElement.clientHeight,
      /* Tokens resolve to hex, computed paints to rgb() — ask the engine what
         the accent paints as so the mark's colour can be compared like with
         like, instead of being read back out of the thing under test. */
      accentRgb: (() => { const p = document.createElement("span");
        p.style.color = "var(--accent)"; document.body.appendChild(p);
        const v = cs(p).color; p.remove(); return v; })(),
      state: replay.dataset.state ?? null,
      heading: document.querySelector("#s02-title").textContent.trim().replace(/\\s+/g, " "),
      labelVisible: visibleText(label).trim(),
      labelFull: label.textContent.trim(),
      liveWord: document.querySelector(".terminal__live-word").textContent.trim(),
      logAria: log.getAttribute("aria-label"),
      logTabindex: log.getAttribute("tabindex"),
      narrationAria: list.getAttribute("aria-label"),
      sectionLabelledby: section.getAttribute("aria-labelledby"),
      beatIndicator: { text: document.querySelector("[data-beat-indicator]").textContent.trim(),
                       hidden: document.querySelector("[data-beat-indicator]").getAttribute("aria-hidden") },
      lineText: lines.map((li) => li.textContent),
      lineTags: lines.map((li) => li.tagName + "/" + li.parentElement.tagName),
      narrationText: entries.map((e) => e.querySelector(".narration__text").textContent),
      narrationSlots: entries.map((e) => e.dataset.slot),
      narrationTags: entries.map((e) => { const t = e.querySelector(".narration__tag"); return t ? t.textContent : null; }),
      totalsValue: value.textContent, totalsScope: scope.textContent,
      totalsValueLines: boxes(value), totalsScopeLines: boxes(scope),
      totalsValueSize: cs(value).fontSize, totalsScopeSize: cs(scope).fontSize,
      totalsValueWidth: +[...(() => { const r = document.createRange(); r.selectNodeContents(value); return r.getClientRects(); })()]
        .reduce((a, b) => Math.max(a, b.width), 0).toFixed(2),
      totalsHeight: +totals.getBoundingClientRect().height.toFixed(2),
      contentWidth: +core.getBoundingClientRect().width.toFixed(2),
      cardLines: boxes(sp3Text),
      cardTextWidth: +sp3Text.getBoundingClientRect().width.toFixed(2),
      cardHeight: +narration.getBoundingClientRect().height.toFixed(2),
      listHeight: +list.getBoundingClientRect().height.toFixed(2),
      rects: { core: rect(core), terminal: rect(terminal), narration: rect(narration), log: rect(log), totals: rect(totals) },
      chromeHeight: +document.querySelector(".terminal__chrome").getBoundingClientRect().height.toFixed(2),
      indicatorHeight: +document.querySelector(".replay__beat").getBoundingClientRect().height.toFixed(2),
      lineBox, logPad: padT + padB, wholeLinesVisible, partialLinesVisible, contentH: +contentH.toFixed(2),
      /* The line region and its column count, measured rather than assumed:
         the horizontal inset changes across --bp-wide, so deriving columns
         from the terminal's outer box would encode a padding guess. The
         advance is measured in the line's own font, not taken as \`ch\`. */
      logRegion: (() => {
        const w = log.clientWidth - parseFloat(ls.paddingLeft) - parseFloat(ls.paddingRight);
        const probe = document.createElement("span");
        probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre;font:" + cs(lines[0]).font;
        probe.textContent = "0".repeat(100);
        log.appendChild(probe);
        const adv = probe.getBoundingClientRect().width / 100;
        probe.remove();
        return { width: +w.toFixed(2), advance: +adv.toFixed(3), columns: Math.floor(w / adv) };
      })(),
      logScroll: { scrollHeight: log.scrollHeight, clientHeight: log.clientHeight,
                   scrollWidth: log.scrollWidth, clientWidth: log.clientWidth, overflow: cs(log).overflow },
      lineWhiteSpace: cs(lines[0]).whiteSpace,
      /* The mark is an element outside the text flow, so it is measured as one:
         its own rendered width and its own paint. Reading a border off the line
         would report 0px on a correct build. */
      key: [4, 9].map((n) => { const li = lines[n - 1]; const m = li.querySelector(".log__mark");
        return { line: n,
                 mark: m ? +m.getBoundingClientRect().width.toFixed(2) + "px " + cs(m).backgroundColor : "absent",
                 markWidth: m ? +m.getBoundingClientRect().width.toFixed(2) : null,
                 markColour: m ? cs(m).backgroundColor : null,
                 bold: [...li.querySelectorAll(".log__token")].map((b) => b.textContent + "@" + cs(b).fontWeight + "/" + cs(b).color),
                 glyph: [...li.querySelectorAll(".log__glyph")].map((g) => g.textContent + "@" + cs(g).color) }; }),
      markedLines: lines.filter((li) => li.querySelector(".log__mark")).map((li) => +li.dataset.line),
      l12: (() => { const li = lines[11]; const d = li.querySelector(".log__detail");
        return { size: cs(li).fontSize, weight: cs(li).fontWeight, colour: cs(d).color,
                 stamp: li.querySelector(".log__stamp").textContent }; })(),
      controls: [...document.querySelectorAll(".replay__controls button")].map((b) => b.textContent),
      sectionText: section.textContent.replace(/\\s+/g, " ").trim(),
      opacities: { lines: lines.map((li) => cs(li).opacity), entries: entries.map((e) => cs(e).opacity) }
    };
  })()`;

  /* ---------- static transcript at desktop ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(PAGE_URL);
  const s02 = await page.eval(S02_STATIC);
  evidence.s02Desktop = s02;

  /* --- fidelity: the twelve lines, character for character --- */
  const lineDiff = CORPUS_LINES.map((src, i) => ({ i: i + 1, src, got: s02.lineText[i] }))
    .filter((d) => d.src !== d.got);
  check("all twelve rendered log lines diff byte-clean against the corpus inventory",
    s02.lineText.length === 12 && lineDiff.length === 0,
    lineDiff.map((d) => `L${d.i}: rendered ${JSON.stringify(d.got)} vs corpus ${JSON.stringify(d.src)}`).join(" | ") ||
      `12/12 identical, ${CORPUS_LINES.reduce((a, l) => a + l.length, 0)} characters, no truncation or re-wrap ` +
      `(codepoints match: ${CORPUS_LINES.every((l, i) => [...l].length === [...s02.lineText[i]].length)})`);
  check("the log is an ordered list, one <li> per corpus line (spec §7 annotation 4)",
    s02.lineTags.length === 12 && s02.lineTags.every((t) => t === "LI/OL"), [...new Set(s02.lineTags)].join(", "));

  /* --- fidelity: the ten narration strings, verbatim from the authority --- */
  const narrDiff = NARRATION_SLOTS.map((src, i) => ({ i, src, got: s02.narrationText[i] }))
    .filter((d) => d.src !== d.got);
  check("all ten narration slots render verbatim from section-02-narration.md §3",
    s02.narrationText.length === 10 && narrDiff.length === 0,
    narrDiff.map((d) => `slot ${s02.narrationSlots[d.i]}: rendered ${JSON.stringify(d.got)} vs authored ${JSON.stringify(d.src)}`).join(" | ") ||
      `10/10 identical, ${NARRATION_SLOTS.reduce((a, s) => a + s.length, 0)} characters`);

  /* --- every §2 chrome string against the authority (DEC-022) --- */
  const chromeDiff = [
    ["section heading", s02.heading, CHROME.heading],
    ["terminal label >= --bp-wide", s02.labelVisible, CHROME.labelWide],
    ["live indicator word", s02.liveWord, CHROME.live],
    ["totals line 1", s02.totalsValue, CHROME.totalsValue],
    ["totals line 2 (scope)", s02.totalsScope, CHROME.totalsScope]
  ].filter(([, got, want]) => got !== want);
  check("every §2 chrome string matches section-02-narration.md §5 exactly (desktop)",
    chromeDiff.length === 0,
    chromeDiff.map(([n, got, want]) => `${n}: ${JSON.stringify(got)} vs ${JSON.stringify(want)}`).join(" | ") ||
      `heading, chrome label, RUN, both totals lines — 5/5 verbatim`);
  check("the beat tags are Content's six display names (narration §4)",
    BEAT_NAMES.every((n) => s02.narrationTags.includes(n)),
    BEAT_NAMES.filter((n) => !s02.narrationTags.includes(n)).join(", ") || BEAT_NAMES.join(" · "));

  /* --- the honesty label, and only minute-precision time on the page --- */
  check('the "condensed from the real build log" label is present and visible',
    /CONDENSED FROM THE REAL BUILD LOG/.test(s02.labelVisible), JSON.stringify(s02.labelVisible));
  const timeLeaks = [
    [/\d{2}:\d{2}:\d{2}/, "second-precision timestamp"],
    [/\bt\s*=\s*\d/, "playback offset"],
    [/\b3858\b|\b3852\b|64 m 18 s/, "derived chain duration"],
    [/\b\d{3,4}\s?s\b/, "derived second-count duration"],
    [/exactly 64|\b64 minutes exactly/, "precision the corpus does not state"]
  ].filter(([re]) => re.test(s02.sectionText)).map(([, why]) => why);
  check("only minute-precision timestamps reach the DOM; no offsets, no derived durations",
    timeLeaks.length === 0,
    timeLeaks.join(", ") || `${(s02.sectionText.match(/\b\d{2}:\d{2}\b/g) || []).length} HH:MM stamps, nothing finer`);

  /* --- copy rules, run as a matrix over §2's rendered text --- */
  const copyFails = [
    [/\bSafari\b/i, "R§2 boundary: the Safari catch belongs to a founder-directed polish pass"],
    [/\bproven\b|\bguaranteed\b|\bvalidated\b(?! )/i, "R6: measured, never proven"],
    [/9\.3|\$147|4\.8\s?h\b/, "R5/scope: whole-product aggregates in a wave-scoped claim"],
    [/!/, "no exclamation marks"],
    [/\b(we|our|ours|us)\b/i, "R7: first person outside §4/§5"],
    [/built in \d/i, "R2: wall-clock framing"],
    [/muster\.build/i, "R12: fictional host"],
    [/\$25\b|~\$150|\babout \$/i, "R1: rounded cost"],
    [/blazing|revolutionary|seamless|effortless/i, "R1: adjective-as-argument"]
  ].filter(([re]) => re.test(s02.sectionText)).map(([, why]) => why);
  check("§2 copy passes the copy-rules review checklist as a text matrix",
    copyFails.length === 0,
    copyFails.join(" | ") ||
      "scope labelled, no Safari catch, no aggregates, no first person, no wall-clock framing, no rounding");
  check("the wave's scope label rides with the values and both are always in the DOM",
    /BODH SPRINT 4 · WEBSITE WAVE ONLY/.test(s02.sectionText) && /~64 MIN AGENT WORK/.test(s02.sectionText),
    `${JSON.stringify(s02.totalsValue)} + ${JSON.stringify(s02.totalsScope)}`);

  /* --- emphasis system (§9) ---
     The mark's width and colour are measured off the element, and its presence
     is asserted as an inventory: exactly L4 and L9 carry one. A build that
     dropped the mark from one key beat, or grew one on a third line, fails here
     rather than being read as "2px accent" from a stylesheet that no longer
     draws anything. */
  check("key beats L4/L9: a 2px accent mark, verdict tokens bold ink, glyph in accent (§9)",
    s02.markedLines.join(",") === "4,9" &&
      s02.key.every((k) => k.markWidth === 2 && k.markColour === s02.accentRgb &&
                           k.bold.length > 0 && k.bold.every((b) => /@700\//.test(b))) &&
      s02.key[0].glyph.length === 1,
    s02.key.map((k) => `L${k.line} mark ${k.mark} · ${k.bold.join(", ")}${k.glyph.length ? " · glyph " + k.glyph[0] : ""}`).join(" ;; ") +
      ` ;; marked lines ${s02.markedLines.join(", ") || "none"} against the accent ${s02.accentRgb}`);
  check("L12 renders large-and-bold so the shipped artifact can set in accent at AA-large",
    parseFloat(s02.l12.size) >= 20 && Number(s02.l12.weight) >= 700 && s02.l12.stamp === "─────",
    `${s02.l12.size} / ${s02.l12.weight} / detail ${s02.l12.colour} / stamp ${JSON.stringify(s02.l12.stamp)} (no timestamp — the corpus divider)`);

  /* --- accessibility names (§11) --- */
  check("terminal and narration lists carry the accessible names the spec names",
    /Build log, condensed from the real build log/.test(s02.logAria || "") && s02.narrationAria === "Narration" &&
      s02.beatIndicator.hidden === "true" && s02.sectionLabelledby === "s02-title",
    `log "${s02.logAria}" · narration "${s02.narrationAria}" · indicator aria-hidden=${s02.beatIndicator.hidden}`);

  /* ---------- a real 48-second chain, timed by QA's own clock ----------
     The offsets below are measured by a MutationObserver installed before
     playback starts, against a t0 taken when the section enters the playing
     state. Nothing is read out of window.MusterReplay: a build that reports
     its own schedule back is not evidence about the build. */
  const INSTRUMENT = `(() => {
    window.__qa = { t0: null, lines: [], slots: [], beats: [], samples: [] };
    const replay = document.querySelector(".replay");
    new MutationObserver(() => {
      if (replay.dataset.state === "playing" && window.__qa.t0 === null) window.__qa.t0 = performance.now();
    }).observe(replay, { attributes: true, attributeFilter: ["data-state"] });
    const seen = new WeakSet();
    const obs = new MutationObserver((records) => {
      const now = performance.now();
      for (const r of records) {
        const el = r.target;
        if (!el.hasAttribute("data-revealed") || seen.has(el)) continue;
        seen.add(el);
        if (el.classList.contains("log__line")) window.__qa.lines.push({ line: +el.dataset.line, at: now });
        else window.__qa.slots.push({ slot: el.dataset.slot, at: now });
      }
    });
    document.querySelectorAll(".log__line, .narration__entry")
      .forEach((el) => obs.observe(el, { attributes: true, attributeFilter: ["data-revealed"] }));
    const indicator = document.querySelector("[data-beat-indicator]");
    new MutationObserver(() => {
      const text = indicator.textContent.trim();
      const last = window.__qa.beats[window.__qa.beats.length - 1];
      if (!last || last.text !== text) window.__qa.beats.push({ text, at: performance.now() });
    }).observe(indicator, { childList: true, characterData: true, subtree: true });
    return true;
  })()`;

  const SAMPLER = `(() => {
    const terminal = document.querySelector(".terminal");
    const narration = document.querySelector(".narration");
    const core = document.querySelector(".replay__core");
    const BAR = 48; /* the sticky status bar is opaque; the band it covers is not viewing space */
    const covered = (el) => { const r = el.getBoundingClientRect();
      const vis = Math.max(0, Math.min(r.bottom, innerHeight) - Math.max(r.top, BAR));
      return r.height ? +(vis / r.height).toFixed(4) : 0; };
    /* §7.1 rule 2 — a wrapped line is shown whole or not at all. That is a
       claim about every instant of the playback, not about its end state, so
       it is sampled rather than snapshotted. Positions come from offsetTop,
       which the reveal's 4px transform does not move. */
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    const windowState = () => {
      const s = getComputedStyle(log);
      const view = log.getBoundingClientRect().height - parseFloat(s.paddingTop) - parseFloat(s.paddingBottom);
      const origin = lines[0].offsetTop;
      let whole = 0, partial = 0;
      for (const li of lines) {
        if (!li.hasAttribute("data-revealed")) continue;
        const top = li.offsetTop - origin - log.scrollTop, bottom = top + li.offsetHeight;
        if (bottom <= 0.6 || top >= view - 0.6) continue;      /* out of the window entirely */
        if (top >= -0.6 && bottom <= view + 0.6) whole++; else partial++;
      }
      return { whole, partial };
    };
    window.__qaSample = setInterval(() => {
      window.__qa.samples.push({ at: +performance.now().toFixed(0), state: document.querySelector(".replay").dataset.state,
        terminal: covered(terminal), narration: covered(narration), core: covered(core),
        coreH: +core.getBoundingClientRect().height.toFixed(2), ...windowState() });
    }, 250);
    return true;
  })()`;

  /* Waits happen on this side of the protocol. A single long in-page promise
     gets garbage-collected by CDP mid-await ("Promise was collected"), which
     is a harness failure that looks like a build failure. */
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const runChain = async (capMs = 60000) => {
    const started = Date.now();
    let state = null;
    while (Date.now() - started < capMs) {
      await sleep(250);
      state = await page.eval(`document.querySelector(".replay").dataset.state ?? null`);
      if (state === "end") {
        /* The state flips when the last line is REVEALED; the reveal itself is
           a 350 ms --reveal transition, so a snapshot taken on the flip catches
           L12 mid-fade and reads as an incomplete end state. One --reveal plus
           a frame's headroom, waited out here rather than tolerated downstream:
           the opacity assertions stay at 1.0. */
        await sleep(600);
        return { state, waited: Date.now() - started };
      }
    }
    return { state, waited: Date.now() - started };
  };

  const readChain = (label, marks) => {
    const t0 = marks.t0;
    const at = marks.lines.map((m) => ({ line: m.line, measured: +(m.at - t0).toFixed(1), spec: SPEC_LINE_AT[m.line - 1] }))
      .sort((a, b) => a.line - b.line);
    const drift = at.map((a) => ({ ...a, drift: +(a.measured - a.spec).toFixed(1) }));
    const slots = marks.slots.map((s) => ({ slot: s.slot, measured: +(s.at - t0).toFixed(1), spec: SPEC_SLOT_AT[s.slot] }))
      .map((s) => ({ ...s, drift: +(s.measured - s.spec).toFixed(1) }));
    return { label, drift, slots, worst: Math.max(...drift.map((d) => Math.abs(d.drift))),
             worstSlot: Math.max(...slots.map((s) => Math.abs(s.drift))) };
  };

  await page.goto(PAGE_URL);
  await page.eval(INSTRUMENT);
  await page.eval(SAMPLER);
  await page.eval(`document.querySelector("#watch-it-ship").scrollIntoView({ block: "center", behavior: "instant" })`);
  const desktopRun = await runChain();
  const desktopChain = await page.eval("({ ...window.__qa })");
  const desktopAfter = await page.eval(S02_STATIC);
  const desktopRequests = page.requests.slice();
  evidence.desktopChain = desktopChain;
  const chain = readChain("1440x900", desktopChain);
  evidence.chainTiming = chain;

  check("a real 48-second chain reveals all twelve lines within +/-100 ms of spec §5.1",
    chain.drift.length === 12 && chain.worst <= 100,
    `worst drift ${chain.worst} ms · ` + chain.drift.map((d) => `L${d.line} ${d.measured}`).join(" ") );
  check("all ten narration slots fire at their anchors within +/-100 ms",
    chain.slots.length === 10 && chain.worstSlot <= 100,
    `worst slot drift ${chain.worstSlot} ms · ` + chain.slots.map((s) => `${s.slot} ${s.measured}`).join(" "));
  const pairs = [[1, 2], [9, 10]].map(([a, b]) => {
    const ma = chain.drift.find((d) => d.line === a).measured, mb = chain.drift.find((d) => d.line === b).measured;
    return { pair: `L${a}/L${b}`, gap: +(mb - ma).toFixed(1) };
  });
  check("the same-stamp pairs are separated by exactly one --reveal cadence (350 ms)",
    pairs.every((p) => Math.abs(p.gap - 350) <= 100),
    pairs.map((p) => `${p.pair} ${p.gap} ms`).join(" · ") + " — identical stamps rendered on both lines of each pair");
  const inHold = chain.drift.filter((d) => d.measured > 43550 && d.measured < 47900)
    .concat(chain.slots.filter((s) => s.measured > 43550 && s.measured < 47900).map((s) => ({ line: s.slot, measured: s.measured })));
  check("the gate hold is silent: no reveal fires between t=43.55 s and t=48.00 s",
    inHold.length === 0,
    inHold.map((d) => `${d.line} at ${d.measured}`).join(", ") ||
      `4.80 s with nothing in it — last event L11 at ${chain.drift.find((d) => d.line === 11).measured} ms, next L12 at ${chain.drift.find((d) => d.line === 12).measured} ms`);
  check("the beat indicator walks all six beats and ends on Content's sixth name",
    desktopChain.beats.length >= 6 && /THE HUMAN GATE$/.test(desktopChain.beats[desktopChain.beats.length - 1].text),
    desktopChain.beats.map((b) => b.text.replace(/^BEAT /, "")).join(" → "));
  check("playback ends in the end state with the replay control offered, and does not re-play",
    desktopAfter.state === "end" && desktopAfter.controls.length === 1 && desktopAfter.controls[0] === CHROME.replay,
    `state=${desktopAfter.state} controls=${JSON.stringify(desktopAfter.controls)}`);
  check("zero network requests during and after a full playback",
    desktopRequests.filter((r) => !/^(file:|data:)/.test(r.url)).length === 0,
    `${desktopRequests.length} loads across the whole chain, all file:/data:`);
  const opaque = (snap) => snap.opacities.lines.every((o) => parseFloat(o) >= 0.999) &&
                           snap.opacities.entries.every((o) => parseFloat(o) >= 0.999);
  check("every line and every narration entry is fully opaque in the end state",
    opaque(desktopAfter),
    `${desktopAfter.opacities.lines.length} lines + ${desktopAfter.opacities.entries.length} entries, ` +
    `worst opacity ${Math.min(...[...desktopAfter.opacities.lines, ...desktopAfter.opacities.entries].map(parseFloat))}`);
  check("desktop: all twelve lines fit the terminal with no scrollback (§5.1 persistence)",
    desktopAfter.logScroll.scrollHeight <= desktopAfter.logScroll.clientHeight + 1 &&
      desktopAfter.logScroll.scrollWidth <= desktopAfter.logScroll.clientWidth + 1,
    `log ${desktopAfter.logScroll.scrollHeight}/${desktopAfter.logScroll.clientHeight} vertical, ` +
    `${desktopAfter.logScroll.scrollWidth}/${desktopAfter.logScroll.clientWidth} horizontal at 1440px`);
  /* The wrap is meant to be inert above --bp-wide (§7 annotation 4): the same
     `pre-wrap` rule applies, and no line reaches the column, so desktop is
     unchanged. That is a measurement, not an inspection of the CSS. */
  const desktopLongest = Math.max(...CORPUS_LINES.slice(0, 11).map((l) => l.length));
  check("desktop is unchanged by the wrap: the line region measures ≥74 columns and no line reaches it",
    desktopAfter.logRegion.columns >= 74 && desktopAfter.logRegion.columns >= desktopLongest,
    `${desktopAfter.logRegion.columns} columns in ${desktopAfter.logRegion.width}px at a ` +
    `${desktopAfter.logRegion.advance}px advance, against a longest chain line of ${desktopLongest} characters`);
  report("measured beat intervals, for the founder's pacing judgment",
    chain.drift.map((d, i) => i === 0 ? null : `L${d.line}−L${d.line - 1} ${((d.measured - chain.drift[i - 1].measured) / 1000).toFixed(2)}s`)
      .filter(Boolean).join(" · ") + ` — gate hold ${((chain.drift[11].measured - chain.drift[10].measured) / 1000).toFixed(2)}s`);

  /* --- §11: playback pauses when the page is not being watched ----
     Headless has no real tab-switch, so `document.visibilityState` is
     overridden and the event dispatched. That is a test of the page's handler,
     which is the part that can be wrong — not of the browser's event, which
     cannot. The stall is measured against the CHAIN's own anchors rather than
     against a label: the page is hidden at ~1.5 s and held for 6.5 s, so a
     clock that kept running would be at ~8.0 s and would have revealed L3 at
     6.4 s. It must not have. `pause()` deliberately leaves `data-state` on
     "playing" — nothing reads it but tests, and asserting on it would be
     asserting on the build's own bookkeeping instead of on the motion. */
  await page.goto(PAGE_URL);
  await page.eval(INSTRUMENT);
  await page.eval(`document.querySelector("#watch-it-ship").scrollIntoView({ block: "center", behavior: "instant" })`);
  await sleep(1500);
  const hidden = await page.eval(`(() => {
    Object.defineProperty(document, "visibilityState", { configurable: true, get: () => "hidden" });
    Object.defineProperty(document, "hidden", { configurable: true, get: () => true });
    document.dispatchEvent(new Event("visibilitychange"));
    return { state: document.querySelector(".replay").dataset.state, revealed: window.__qa.lines.length };
  })()`);
  await sleep(6500);
  const stillHidden = await page.eval(`({ state: document.querySelector(".replay").dataset.state, revealed: window.__qa.lines.length })`);
  await page.eval(`(() => {
    delete document.visibilityState; delete document.hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  })()`);
  await sleep(5500);
  const afterResume = await page.eval(`({ state: document.querySelector(".replay").dataset.state, revealed: window.__qa.lines.length })`);
  evidence.visibility = { hidden, stillHidden, afterResume };
  check("playback stops when the page is not being watched, and picks up where it left off (§11)",
    hidden.revealed === 2 && stillHidden.revealed === 2 && afterResume.revealed >= 3,
    `${hidden.revealed} lines revealed at ~1.5 s · still ${stillHidden.revealed} after 6.5 s hidden, when a ` +
    `running clock would have passed L3's 6.4 s anchor · ${afterResume.revealed} lines 5.5 s after the page ` +
    `came back, so the chain resumed from where it stopped rather than skipping to wall-clock`);

  /* --- keyboard: skip and replay --- */
  await page.goto(PAGE_URL);
  await page.eval(`document.querySelector("#watch-it-ship").scrollIntoView({ block: "center", behavior: "instant" })`);
  await sleep(600);
  const enter = async () => {
    for (const type of ["rawKeyDown", "char", "keyUp"])
      await page.call("Input.dispatchKeyEvent", { type, key: "Enter", code: "Enter", text: "\r",
        windowsVirtualKeyCode: 13, nativeVirtualKeyCode: 13 });
  };
  /* Measured before it is pressed: activating the skip control replaces the
     control, and a detached button measures 0 by any ruler.

     The Tab first, deliberately: `:focus-visible` on a programmatically
     focused element depends on the engine's current input modality, so
     whether this check saw the page's 2px keyboard ring or the user-agent
     default depended on whatever ran before it — which is how a real focus
     regression could hide behind an unrelated reordering. One real key press
     puts the engine in keyboard modality, which is the state this check is
     about. */
  await tab();
  const before = await page.eval(`(() => { const btn = document.querySelector(".replay__controls button");
    btn.focus();
    return { hit: document.activeElement === btn, skipLabel: btn.textContent,
             ring: getComputedStyle(btn).outlineWidth, focusVisible: btn.matches(":focus-visible"),
             minHeight: Math.round(btn.getBoundingClientRect().height) }; })()`);
  await enter();
  await sleep(300);
  const afterSkip = await page.eval(`(() => ({ state: document.querySelector(".replay").dataset.state,
    label: document.querySelector(".replay__controls button").textContent,
    focused: document.activeElement.className }))()`);
  await page.eval(`document.querySelector(".replay__controls button").focus()`);
  await enter();
  await sleep(300);
  const afterReplay = await page.eval(`(() => ({ state: document.querySelector(".replay").dataset.state,
    revealed: document.querySelectorAll(".log__line[data-revealed]").length }))()`);
  const keyControl = { ...before, ...afterSkip, afterReplay };
  evidence.keyControl = keyControl;
  check("skip jumps to the end state and replay restarts, both driven by a real Enter key",
    keyControl.hit && keyControl.skipLabel === CHROME.skip && keyControl.state === "end" &&
      keyControl.label === CHROME.replay && keyControl.afterReplay.state === "playing" &&
      keyControl.afterReplay.revealed < 12 && keyControl.minHeight >= 44 && /^2px/.test(keyControl.ring),
    JSON.stringify(keyControl));

  /* ---------- mobile, 375 x 553 — the budget case ---------- */
  await page.setViewport({ width: 375, height: 553, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  await page.eval(INSTRUMENT);
  await page.eval(SAMPLER);
  /* Park the core just under the sticky bar, which is where a reader scrolling
     to the section lands it — not centred, which would leave part of it behind
     the bar and mask the very gate this checks. */
  await page.eval(`(() => { const c = document.querySelector(".replay__core");
    scrollTo({ top: scrollY + c.getBoundingClientRect().top - 50, behavior: "instant" }); })()`);
  await sleep(1200);
  const mobileMid = await page.eval(S02_STATIC);
  evidence.mobileDuringPlayback = mobileMid;
  writeFileSync(join(ARTIFACTS, "qa-s02-mobile-375.png"), await page.screenshot());
  const mobileRun = await runChain();
  await page.eval("clearInterval(window.__qaSample)");
  const mobileChain = await page.eval("({ ...window.__qa })");
  const mobileEnd = await page.eval(S02_STATIC);
  evidence.mobileChain = { t0: mobileChain.t0, beats: mobileChain.beats, samples: mobileChain.samples.length };
  const mChain = readChain("375x553", mobileChain);
  evidence.mobileTiming = mChain;

  /* DEC-029 — three, and now three whole ENTRIES rather than three wrapped
     lines. Every line but L12 sets two rows at 39 columns, and below --bp-wide
     the log's leading splits: rows take --lead-micro (19.5px), so an entry box
     is 39.0px and the entry pitch — box plus the --gap-hairline separator — is
     51.0px. Only the gaps BETWEEN entries are spent, so the window solves
     floor((553 − 379.4 + 12.0) / 51.0) = 3. The 49.4px uniform line box is
     superseded, as five was before it. */
  check("mobile 375x553: the terminal window shows exactly three whole wrapped lines (DEC-026)",
    mobileMid.wholeLinesVisible === 3 && mobileMid.partialLinesVisible === 0,
    `${mobileMid.wholeLinesVisible} whole wrapped lines and ${mobileMid.partialLinesVisible} sliced in ` +
    `${mobileMid.contentH}px of log content box, one row ${mobileMid.lineBox}px ` +
    `(§7.1 derives floor((553 − 379.4 + 12.0) / 51.0) = 3)`);
  check("mobile 375x553: the measured playback core fits the visual viewport",
    mobileMid.rects.core.height <= 553,
    `core ${mobileMid.rects.core.height}px against a 553px visual viewport — indicator ${mobileMid.indicatorHeight} / ` +
    `chrome ${mobileMid.chromeHeight} / card ${mobileMid.cardHeight} / totals ${mobileMid.totalsHeight}`);
  const played = mobileChain.samples.filter((s) => s.state === "playing");
  const worstVis = played.reduce((a, s) => Math.min(a, s.terminal, s.narration), 1);
  check("mobile: both layers stay fully on screen for the whole playback",
    played.length > 100 && worstVis >= 0.999,
    `${played.length} samples across the chain, worst coverage ${(worstVis * 100).toFixed(1)}% ` +
    `(measured under the 48px sticky bar, not against the raw viewport)`);
  check("mobile: the chain still holds spec §5.1 timing on the windowed terminal",
    mChain.drift.length === 12 && mChain.worst <= 100, `worst drift ${mChain.worst} ms`);
  /* §7.1 rule 2, sampled across the whole chain rather than at its end: the
     window shows whole wrapped lines only. Bottom-aligning the newest line
     would satisfy an end-state snapshot and still slice the topmost line
     through its rows for most of the playback, so the end state cannot stand
     in for this. */
  const windowed = mobileChain.samples.filter((s) => s.state === "playing" && s.whole + s.partial > 0);
  const sliced = windowed.filter((s) => s.partial > 0);
  const overfull = windowed.filter((s) => s.whole > 3);
  check("mobile: the window never clips a wrapped line part-way through its rows (§7.1 rule 2)",
    windowed.length > 100 && sliced.length === 0 && overfull.length === 0,
    `${windowed.length} samples across the chain, ${sliced.length} with a partial line, at most ` +
    `${Math.max(...windowed.map((s) => s.whole))} whole lines in frame`);
  /* DEC-026 inverts this one. The old check asserted `white-space: pre` and a
     log that scrolled its own overflow; the founder ruled that a phone reader
     never makes a sideways gesture, so the lines must wrap and the log must
     not scroll horizontally at all. Wrapping is the payer precisely because it
     costs no fidelity — the byte-clean diff below is what proves that. */
  check("mobile: lines soft-wrap and the log never scrolls sideways (DEC-026)",
    mobileMid.lineWhiteSpace === "pre-wrap" && mobileMid.logScroll.scrollWidth <= mobileMid.logScroll.clientWidth,
    `white-space: ${mobileMid.lineWhiteSpace}, log content ${mobileMid.logScroll.scrollWidth}px in ` +
    `${mobileMid.logScroll.clientWidth}px of box — nothing to reach sideways for`);
  check("mobile: the totals strip renders as exactly two --text-micro lines",
    mobileMid.totalsValueLines === 1 && mobileMid.totalsScopeLines === 1 &&
      mobileMid.totalsValueSize === "11px" && mobileMid.totalsScopeSize === "11px" &&
      Math.abs(mobileMid.totalsHeight - 33) <= 0.6,
    `value ${mobileMid.totalsValueLines} line @${mobileMid.totalsValueSize} · scope ${mobileMid.totalsScopeLines} line ` +
    `@${mobileMid.totalsScopeSize} · strip ${mobileMid.totalsHeight}px against the 33.0px budget (DEC-022.3)`);
  report("totals value-line width against the content width at 375px (DEC-022.4)",
    `${mobileMid.totalsValueWidth}px of ${mobileMid.contentWidth}px — ` +
    `${(mobileMid.contentWidth - mobileMid.totalsValueWidth).toFixed(2)}px of margin before it wraps to a third line`);
  report("narration card, measured against SP3's real copy (§7.1 budgets a 6-line worst case)",
    `${mobileMid.cardLines} lines in ${mobileMid.cardTextWidth}px at 375px; card ${mobileMid.cardHeight}px ` +
    `against 199.4px budgeted. SP3 is ${NARRATION_SLOTS[2].length} characters, the longest slot`);
  check("mobile: the narration card holds the budgeted height and does not exceed six lines",
    mobileMid.cardLines <= 6 && Math.abs(mobileMid.cardHeight - 199.4) <= 1,
    `${mobileMid.cardLines}/6 lines, card ${mobileMid.cardHeight}px vs 199.4px budgeted`);
  check("mobile: the end state is the complete transcript, not a windowed subset",
    opaque(mobileEnd) && mobileEnd.lineText.join("\n") === CORPUS_LINES.join("\n"),
    `${mobileEnd.lineText.length} lines + ${mobileEnd.opacities.entries.length} entries, worst opacity ` +
    `${Math.min(...[...mobileEnd.opacities.lines, ...mobileEnd.opacities.entries].map(parseFloat))}, ` +
    `${mobileEnd.lineText.join("\n") === CORPUS_LINES.join("\n") ? "text identical to the corpus" : "TEXT DIVERGES FROM THE CORPUS"}, ` +
    `all reachable in the log's own scroll (${mobileEnd.logScroll.scrollHeight}px of content)`);
  const mobileChrome = mobileMid.labelVisible === CHROME.labelNarrow;
  check("mobile: the chrome label drops the run name and keeps the required sentence whole",
    mobileChrome, `rendered ${JSON.stringify(mobileMid.labelVisible)} vs authored ${JSON.stringify(CHROME.labelNarrow)}`);

  /* --- the log's scroll container, from the keyboard (WCAG 2.1.1) --- */
  const arrow = async (key, code) => {
    for (const type of ["rawKeyDown", "keyUp"])
      await page.call("Input.dispatchKeyEvent", { type, key, code, windowsVirtualKeyCode: code === "ArrowDown" ? 40 : 39, nativeVirtualKeyCode: code === "ArrowDown" ? 40 : 39 });
  };
  await page.goto(PAGE_URL);
  await page.eval(`(() => { const log = document.querySelector(".log"); log.focus();
    window.__before = { top: log.scrollTop, left: log.scrollLeft, active: document.activeElement.className,
                        ring: getComputedStyle(log).outlineWidth, focusVisible: log.matches(":focus-visible") }; })()`);
  await arrow("ArrowDown", "ArrowDown");
  await arrow("ArrowDown", "ArrowDown");
  await arrow("ArrowRight", "ArrowRight");
  await arrow("ArrowRight", "ArrowRight");
  await sleep(400);
  const keyScroll = await page.eval(`(() => { const log = document.querySelector(".log");
    return { ...window.__before, after: { top: Math.round(log.scrollTop), left: Math.round(log.scrollLeft) },
             tabindex: log.getAttribute("tabindex"), name: log.getAttribute("aria-label") }; })()`);
  evidence.keyScroll = keyScroll;
  check("the terminal scroll container is focusable and arrow-key operable, with a name",
    keyScroll.tabindex === "0" && Boolean(keyScroll.name) && keyScroll.active === "log" &&
      (keyScroll.after.top > keyScroll.top || keyScroll.after.left > keyScroll.left),
    `focus lands on .log (ring ${keyScroll.ring}); arrows move it ${keyScroll.top}→${keyScroll.after.top} vertical, ` +
    `${keyScroll.left}→${keyScroll.after.left} horizontal`);

  /* --- horizontal containment at the two narrow widths and at 200% zoom --- */
  const CONTAIN = `(() => {
    const vw = document.documentElement.clientWidth;
    /* The log's own scroll region is a deliberate, scoped WCAG 1.4.10 exception
       (§10): an aligned-column log is two-dimensional content, and wrapping it
       would destroy the alignment that makes it readable. What must not escape
       is anything the page cannot clip — so a clipping ancestor excuses its
       descendants and is itself measured here. */
    const clipper = (el) => { let n = el.parentElement;
      while (n && n !== document.body) { const o = getComputedStyle(n);
        if (o.overflowX !== "visible" || o.overflowY !== "visible") return n; n = n.parentElement; }
      return null; };
    const escapes = [...document.querySelectorAll("#watch-it-ship *")].filter((el) => {
      if (getComputedStyle(el).position === "fixed") return false;
      if (clipper(el)) return false;
      const r = el.getBoundingClientRect();
      return r.width > 0 && (r.right > vw + 0.5 || r.left < -0.5);
    }).map((el) => (el.className || el.tagName) + " [" + Math.round(el.getBoundingClientRect().right) + " > " + vw + "]");
    const prior = document.body.style.overflowX;
    document.body.style.overflowX = "visible";
    void document.body.offsetWidth;
    const unmasked = document.documentElement.scrollWidth - document.documentElement.clientWidth;
    document.body.style.overflowX = prior;
    const log = document.querySelector(".log");
    return { vw, escapes, unmasked, logScrolls: log.scrollWidth > log.clientWidth };
  })()`;
  const containment = [];
  let s02At320 = null;
  for (const [label, w, h, dsf] of [["375", 375, 553, 1], ["320", 320, 568, 1], ["200% zoom", 720, 450, 2]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: dsf, mobile: w < 500 });
    await page.goto(PAGE_URL);
    containment.push({ label, ...(await page.eval(CONTAIN)) });
    if (label === "320") s02At320 = await page.eval(S02_STATIC);
  }
  evidence.s02At320 = s02At320;
  /* Reported, not asserted: the §7.1 budget is stated for 375 × 553, and 320px
     is below the width any row of it is derived at. What this replaces is an
     arithmetic estimate with a measurement, so the disposition has a number. */
  report("the totals strip at 320px, where the budget is not stated (the producer estimated a third line)",
    `value ${s02At320.totalsValueLines} line(s) @${s02At320.totalsValueSize} · scope ${s02At320.totalsScopeLines} · ` +
    `strip ${s02At320.totalsHeight}px · value line ${s02At320.totalsValueWidth}px of ${s02At320.contentWidth}px of content width`);
  evidence.containment = containment;
  /* DEC-026 — §2 no longer claims the scoped WCAG 1.4.10 exception the log's
     horizontal scroll used to need, so `logScrolls` inverts: nothing scrolls
     horizontally anywhere, the body and the log alike. */
  check("nothing scrolls horizontally at 375px, 320px or 200% zoom — not the body, not the log (DEC-026)",
    containment.every((c) => c.escapes.length === 0 && c.unmasked <= 0 && !c.logScrolls),
    containment.map((c) => `${c.label}: ${c.escapes.length ? c.escapes.join("/") : "contained"}, unmasked +${c.unmasked}px, log scrolls ${c.logScrolls}`).join(" · "));

  /* --- 320px: the width the budget is a ceiling at (DEC-027.4, DEC-030.2) ---
     §7.1's 51.0px entry pitch is exact at ≥375px and a CEILING below it, where
     the longest lines cost three rows — the same trap the 49.4px line constant
     was, wearing a new number. A build implementing the formula literally would
     place a third entry here and slice it through its rows. The idle state cannot answer this — the window only quantises when
     a line is revealed — so this is a second chain, sampled like the first. */
  await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  await page.eval(INSTRUMENT);
  await page.eval(SAMPLER);
  await page.eval(`(() => { const c = document.querySelector(".replay__core");
    scrollTo({ top: scrollY + c.getBoundingClientRect().top - 50, behavior: "instant" }); })()`);
  await sleep(1200);
  /* Taken mid-playback, not at the end: the narration card holds a fixed
     six-line height only while the chain runs — in the end state it becomes
     the full ten-entry list, whose height says nothing about the budget. */
  const at320Mid = await page.eval(S02_STATIC);
  await runChain();
  await page.eval("clearInterval(window.__qaSample)");
  const chain320 = await page.eval("({ ...window.__qa })");
  const at320End = await page.eval(S02_STATIC);
  const windowed320 = chain320.samples.filter((s) => s.state === "playing" && s.whole + s.partial > 0);
  const sliced320 = windowed320.filter((s) => s.partial > 0);
  evidence.chain320 = { samples: chain320.samples.length, windowed: windowed320.length, sliced: sliced320.length };
  check("320px: the window quantises on measured entries, never on the 51.0px pitch (DEC-030.2)",
    windowed320.length > 100 && sliced320.length === 0 && windowed320.every((s) => s.whole >= 1),
    `${windowed320.length} samples across a full chain at 320 × 568, ${sliced320.length} with a line sliced through ` +
    `its rows; window ${at320End.contentH}px over a ${at320End.logRegion.columns}-column region`);
  /* DEC-027.1 — deferred to Sprint 2, reported here so the disposition keeps a
     number against it. Pre-existing and width-driven: SP3 sets six lines with
     zero margin at the budgeted 375px, so the seventh is bought by the
     narrower column, not by the wrap change. */
  report("320px: SP3 against the six-line narration card (DEC-027.1 — deferred, reported not asserted)",
    `${at320Mid.cardLines} lines of SP3 in ${at320Mid.cardTextWidth}px of text column, mid-playback; card ` +
    `${at320Mid.cardHeight}px against the 199.4px six-line budget — ` +
    `${at320Mid.cardLines > 6 ? "the overflow reproduces" : "no overflow at this width"}`);
  check("320px: the end state still carries all twelve lines byte-clean, in the log's own vertical scroll",
    at320End.lineText.join("\n") === CORPUS_LINES.join("\n") &&
      at320End.logScroll.scrollWidth <= at320End.logScroll.clientWidth,
    `${at320End.lineText.length} lines, text ${at320End.lineText.join("\n") === CORPUS_LINES.join("\n") ? "identical to the corpus" : "DIVERGENT"}, ` +
    `${at320End.logScroll.scrollHeight}px of content in ${at320End.logScroll.clientHeight}px vertically, ` +
    `${at320End.logScroll.scrollWidth}/${at320End.logScroll.clientWidth} horizontally`);

  /* --- landscape phone (§10) --- */
  await page.setViewport({ width: 667, height: 375, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  await page.eval(`(() => { const c = document.querySelector(".replay__core");
    scrollTo({ top: scrollY + c.getBoundingClientRect().top - 50, behavior: "instant" }); })()`);
  await sleep(700);
  const landscape = await page.eval(S02_STATIC);
  evidence.landscape = landscape;
  writeFileSync(join(ARTIFACTS, "qa-s02-landscape-667.png"), await page.screenshot());
  /* DEC-026 consequence 2 — landscape inverts its split. The terminal takes
     the wider column now, sized by the wrap rule rather than by a share,
     because width is the only thing that decides whether a log line reads
     without a gesture; narration set narrower simply runs taller, and height is
     what landscape has to spare. Narration-first survives as a priority, not as
     a column width.

     Bound at §7.1's 37-column floor, not at the split's 40-column target: the
     target derives to 40.04, under a tenth of a column of headroom, so a build
     that measures 39 has spent margin rather than broken anything (DEC-030).
     The measured count is in the detail either way. 36 is a defect. */
  check("landscape phone 667x375: two columns with the terminal in the wider one, clearing the 37-column floor (DEC-030)",
    landscape.rects.terminal.width > landscape.rects.narration.width &&
      landscape.rects.terminal.right <= landscape.rects.narration.left + 1 &&
      landscape.logRegion.columns >= 37,
    `terminal ${landscape.rects.terminal.width}px, line region ${landscape.logRegion.width}px = ` +
    `${landscape.logRegion.columns} columns at a ${landscape.logRegion.advance}px advance | narration ` +
    `${landscape.rects.narration.width}px, side by side`);
  /* --- the founder-set constraint, measured at the five phone widths ---
     "A phone reader never makes a sideways gesture to finish a log line"
     (§13, founder-set) is the constraint the whole mobile window is sized
     around, so it is measured per width rather than inferred from the 375px
     case. Rows are recovered by clustering the range's client rects, because a
     row is several inline spans and a wrapped line is several rows. */
  const LINE_FIT = `(() => {
    const log = document.querySelector(".log");
    const s = getComputedStyle(log);
    const box = log.getBoundingClientRect();
    const left = box.left + parseFloat(s.borderLeftWidth) + parseFloat(s.paddingLeft);
    const right = box.right - parseFloat(s.borderRightWidth) - parseFloat(s.paddingRight);
    /* The key-beat mark is the line's first child and sits outside the text
       flow, so the range starts after it — left in, its 2px box would drag row
       0's left edge into the gutter and report the hanging indent as wider than
       it is. */
    const rowsOf = (li) => {
      const r = document.createRange(); r.selectNodeContents(li);
      const m = li.querySelector(".log__mark");
      if (m) r.setStartAfter(m);
      const rects = [...r.getClientRects()].filter((k) => k.width > 0).sort((a, b) => a.top - b.top);
      const rows = [];
      for (const k of rects) {
        const last = rows[rows.length - 1];
        if (last && Math.abs(k.top - last.top) < 8) {
          last.left = Math.min(last.left, k.left); last.right = Math.max(last.right, k.right);
        } else rows.push({ top: k.top, left: k.left, right: k.right });
      }
      return rows;
    };
    /* Measured character by character, and only on the characters a reader has
       to reach. Under pre-wrap the space a line breaks at is preserved and
       hangs past the content edge — up to ~6px here — so a range's own client
       rects report an overflow that contains no ink and that no reader can be
       asked to scroll for. The claim is about the last CHARACTER, so the
       measurement is too. */
    const inkBounds = (li) => {
      const walk = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
      const r = document.createRange();
      let n, maxRight = -Infinity, minLeft = Infinity;
      while ((n = walk.nextNode())) {
        const t = n.nodeValue;
        for (let j = 0; j < t.length; j++) {
          if (/\\s/.test(t[j])) continue;
          r.setStart(n, j); r.setEnd(n, j + 1);
          const k = r.getBoundingClientRect();
          if (k.width <= 0 && k.height <= 0) continue;
          if (k.right > maxRight) maxRight = k.right;
          if (k.left < minLeft) minLeft = k.left;
        }
      }
      return { maxRight, minLeft };
    };
    const lines = [...document.querySelectorAll(".log__line")];
    const per = lines.map((li, i) => {
      const rows = rowsOf(li);
      const ink = inkBounds(li);
      return { line: i + 1, rows: rows.length,
               escapes: ink.maxRight > right + 0.5 || ink.minLeft < left - 0.5,
               spare: +(right - ink.maxRight).toFixed(2),
               indent: rows.length > 1 ? +(rows[1].left - rows[0].left).toFixed(2) : null,
               flushRows: rows.slice(1).filter((r) => r.left <= rows[0].left + 0.5).length };
    });
    return { region: +(right - left).toFixed(2), per, text: lines.map((li) => li.textContent),
             logScrolls: log.scrollWidth > log.clientWidth,
             docScrolls: document.documentElement.scrollWidth > document.documentElement.clientWidth };
  })()`;
  const fits = [];
  for (const [w, h] of [[320, 568], [360, 640], [375, 553], [390, 664], [393, 659]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    const f = await page.eval(LINE_FIT);
    fits.push({ label: `${w}px`, ...f });
  }
  evidence.phoneLineFit = fits.map((f) => ({ label: f.label, region: f.region,
    rows: f.per.map((p) => p.rows), escapes: f.per.filter((p) => p.escapes).map((p) => p.line) }));
  const gestured = fits.filter((f) => f.per.some((p) => p.escapes) || f.logScrolls || f.docScrolls);
  check("no corpus line needs a sideways gesture to finish, at 320 / 360 / 375 / 390 / 393px (§13, founder-set)",
    gestured.length === 0,
    gestured.map((f) => `${f.label}: lines ${f.per.filter((p) => p.escapes).map((p) => p.line).join(",") || "none"} escape` +
      `${f.logScrolls ? ", log scrolls" : ""}${f.docScrolls ? ", document scrolls" : ""}`).join(" ;; ") ||
      fits.map((f) => `${f.label} ✓ ${f.region}px region, rows ${f.per.map((p) => p.rows).join("")}, tightest line ` +
        `${Math.min(...f.per.map((p) => p.spare)).toFixed(2)}px clear`).join(" · "));
  const fidelityDrift = fits.flatMap((f) => f.text.map((t, i) => t === CORPUS_LINES[i] ? null : `${f.label} L${i + 1}`).filter(Boolean));
  check("soft wrap costs no fidelity: all twelve lines stay byte-clean at all five phone widths",
    fidelityDrift.length === 0,
    fidelityDrift.join(", ") || `12/12 identical to the corpus at each of the five widths — a soft break inserts no character`);
  const indentBad = fits.filter((f) => f.per.some((p) => p.rows > 1 && (!(p.indent > 1) || p.flushRows > 0)));
  check("continuation rows carry the hanging indent; no row but an entry's first starts at the left edge",
    indentBad.length === 0,
    indentBad.map((f) => `${f.label}: ${f.per.filter((p) => p.rows > 1 && (!(p.indent > 1) || p.flushRows > 0)).map((p) => `L${p.line} indent ${p.indent}`).join("/")}`).join(" ;; ") ||
      fits.map((f) => `${f.label} +${[...new Set(f.per.map((p) => p.indent).filter(Boolean))].join("/")}px`).join(" · "));
  report("landscape phone: visible terminal lines (§10 derives 3 from a 331px Safari viewport)",
    `${landscape.wholeLinesVisible} whole lines at an emulated 667x375 — headless Chrome gives the full 375px of ` +
    `height where Safari's landscape toolbars leave ~331px, so this is the upper bound of that derivation, not a re-measure of it`);

  /* ---------- reduced motion and no-JS: the complete transcript ---------- */
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const reduced = await page.eval(S02_STATIC);
  evidence.s02Reduced = reduced;
  writeFileSync(join(ARTIFACTS, "qa-s02-reduced.png"), await page.screenshot());
  check("reduced motion: the complete annotated transcript, and no controls to work",
    reduced.state === null && reduced.controls.length === 0 &&
      reduced.lineText.join("\n") === CORPUS_LINES.join("\n") &&
      reduced.narrationText.join("\n") === NARRATION_SLOTS.join("\n") &&
      reduced.opacities.lines.every((o) => o === "1") && reduced.opacities.entries.every((o) => o === "1") &&
      /~64 MIN AGENT WORK/.test(reduced.sectionText),
    `no data-state, ${reduced.controls.length} controls, 12 lines + 10 entries + totals all rendered at opacity 1`);
  /* Compared against the motion path's END state, which is the state the
     complete transcript IS (spec §8). Controls are excluded because their
     absence is the spec's instruction, not a dropped subset, and the beat
     indicator is aria-hidden playback position rather than content. */
  const contentOf = (snap) => [snap.heading, snap.labelVisible, snap.liveWord, ...snap.lineText,
    ...snap.narrationText, snap.totalsValue, snap.totalsScope].join("\u0001");
  check("reduced motion carries the same content as the motion path's end state",
    contentOf(reduced) === contentOf(desktopAfter),
    contentOf(reduced) === contentOf(desktopAfter)
      ? `${contentOf(reduced).split("\u0001").length} strings identical — 12 lines, 10 narration slots, both totals lines, chrome`
      : "CONTENT DIVERGES between the motion end state and the reduced-motion path");
  report("what the reduced-motion path does not carry, and why",
    `the ${desktopAfter.controls.length} playback control (spec §8: absent, nothing to control) and the beat ` +
    `indicator's live position — authored as "${reduced.beatIndicator.text}", the end state, and aria-hidden either way`);

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.call("Emulation.setScriptExecutionDisabled", { value: true });
  /* Navigated by hand: page.goto settles on an in-page rAF promise, and with
     script execution disabled that callback never runs, so the promise is
     collected and the harness dies looking like the build did. */
  await page.call("Page.navigate", { url: PAGE_URL });
  await sleep(1500);
  const nojs = await page.eval(S02_STATIC).catch(() => null);
  await page.call("Emulation.setScriptExecutionDisabled", { value: false });
  /* Runtime.evaluate still runs with page script disabled, so the DOM is
     readable; what is suppressed is the page's own scripts/replay.js. */
  evidence.s02NoJs = nojs;
  check("no JS: the DOM is the transcript and it is identical to the reduced-motion path",
    nojs && nojs.state === null && nojs.controls.length === 0 && contentOf(nojs) === contentOf(reduced),
    nojs ? `no data-state, ${nojs.controls.length} controls, ${nojs.lineText.length} lines, text identical to reduced motion`
         : "could not read the page with script execution disabled");

  /* ---------- both themes, with §2 present ---------- */
  await page.setMedia({ colorScheme: "light", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const lightS02 = await page.eval(S02_STATIC);
  const liveLightS02 = await page.eval(LIVE);
  evidence.s02Light = { l12: lightS02.l12, key: lightS02.key };
  writeFileSync(join(ARTIFACTS, "qa-s02-light-1440.png"), await page.screenshot());
  for (const [theme, live] of [["dark", await (async () => { await page.setMedia({ colorScheme: "dark" }); await page.goto(PAGE_URL); return page.eval(LIVE); })()], ["light", liveLightS02]]) {
    /* Same partition as the first contrast sweep: the corpus tick and the
       VERIFY chip's glyph are graphical marks held to the 3:1 non-text floor,
       and both are asserted separately rather than waved through in either
       place. */
    const prose = live.filter((r) => !GLYPHS.includes(r.el));
    const fails = prose.filter((r) => r.ratio < (r.large ? 3 : 4.5));
    check(`with §2 rendered, every text run still meets its WCAG floor (${theme})`, fails.length === 0,
      fails.map((f) => `${f.el} ${f.ratio}:1 @${f.size}px "${f.text}"`).join(" | ") ||
        `${prose.length} text runs, worst ${Math.min(...prose.map((r) => r.ratio))}:1 ` +
        `(the two graphical glyphs are measured against their own 3:1 floor above)`);
  }
  check("§2 renders in both themes with the same twelve lines and the same L12 treatment",
    lightS02.lineText.join("\n") === CORPUS_LINES.join("\n") && lightS02.l12.size === s02.l12.size,
    `light: L12 ${lightS02.l12.size}/${lightS02.l12.weight} ${lightS02.l12.colour} · dark: ${s02.l12.size}/${s02.l12.weight} ${s02.l12.colour}`);
} catch (err) {
  /* A harness that dies mid-run must not be able to exit green on the checks
     it happened to reach before it died. */
  check("the audit ran to completion", false, `aborted: ${err && err.message}`);
} finally {
  await page.close();
  await chrome.close();
}

/* ==========================================================================
   WebKit — scoped to what this tooling can actually prove (DEC-021.4).

   QuickLook renders HTML with WebKit and runs no JavaScript, so what it puts
   on screen IS the no-JS complete transcript. That is the load-bearing view,
   not a consolation: DEC-017.4 makes the no-JS DOM identical to the complete
   transcript, and inline-SVG/WebKit divergence is this project's known
   failure class.

   The measurement is structural and differential rather than a bare ink
   count: one rule hides one thing, and the two renders are diffed against
   EACH OTHER row by row. That says how many log rows WebKit actually laid
   out, how tall the L12 row is against the others, and whether accent ink
   reaches the terminal — each falsifiable, because the control render is the
   same page with that one thing hidden. Character-level fidelity is not
   claimable from pixels here and is not claimed; it is Blink evidence above,
   over the same DOM.
   ========================================================================== */

const webkitTemps = [];
function webkitCopy(theme, css, label) {
  let html = readFileSync(join(ROOT, "index.html"), "utf8")
    .replace('<html lang="en">', `<html lang="en" data-theme="${theme}">`)
    .replace("</head>", `<style>#hero{display:none}${css}</style></head>`);
  const path = join(ROOT, `.qa-webkit-${label}.html`);
  writeFileSync(path, html);
  webkitTemps.push(path);
  return path;
}
/* Every WebKit render is taken under a deadline. `qlmanage` is a client of a
   system daemon, not a self-contained renderer: when quicklookd is wedged or
   saturated the command never returns, and an unbounded `execFileSync` turns
   that into a process that runs forever. It reads as "still going" rather than
   as a failure, because this file prints its whole report at the end — one
   stalled render and the run produces no output at all, for as long as anyone
   is willing to wait. A hang is a failure and should say so, with the render
   that stalled named. The ceiling sits far above a legitimate render (these
   take single-digit seconds) — it bounds a wedged daemon, not a slow page. */
const QUICKLOOK_TIMEOUT_MS = 60000;

function quickLook(sourcePath, label) {
  const outDir = join(ARTIFACTS, "qa-webkit-" + label);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const startedAt = Date.now();
  try {
    execFileSync("qlmanage", ["-t", "-s", "1400", "-o", outDir, sourcePath], {
      stdio: "pipe",
      timeout: QUICKLOOK_TIMEOUT_MS,
      killSignal: "SIGKILL"
    });
  } catch (err) {
    if (err.code === "ETIMEDOUT" || err.signal === "SIGKILL") {
      throw new Error(
        `QuickLook timeout: qlmanage did not return for ${label} within ` +
          `${QUICKLOOK_TIMEOUT_MS} ms (waited ${Date.now() - startedAt} ms, source ${sourcePath}). ` +
          `The WebKit renders run against the system QuickLook daemon; a wedged daemon stalls here.`
      );
    }
    throw err;
  }
  const rendered = join(outDir, sourcePath.split("/").pop() + ".png");
  if (!existsSync(rendered)) throw new Error(`QuickLook produced no render for ${label}`);
  const buffer = readFileSync(rendered);
  writeFileSync(join(ARTIFACTS, `qa-webkit-${label}.png`), buffer);
  rmSync(outDir, { recursive: true, force: true });
  return decodePng(buffer);
}
const lumAt = (image, i) => image.channels >= 3
  ? 0.2126 * image.pixels[i] + 0.7152 * image.pixels[i + 1] + 0.0722 * image.pixels[i + 2]
  : image.pixels[i];
/* Per-row count of pixels that CHANGED between two renders of the same page.
   A ground-relative ink count cannot see this: log text sits on --surface, and
   a pixel of text and a pixel of bare panel are both "not ground", so hiding
   every line leaves the ground-relative profile bit-identical (measured: 815375
   inked pixels either way). Comparing the two renders to each other instead
   isolates exactly what the one hidden rule removed. `visibility: hidden` keeps
   the layout, so the rows still line up. */
function changedRows(a, b, threshold = 8) {
  const rows = new Array(a.height).fill(0);
  for (let y = 0; y < a.height; y++) {
    let n = 0;
    for (let x = 0; x < a.width; x++) {
      const i = y * a.stride + x * a.channels;
      if (Math.abs(lumAt(a, i) - lumAt(b, i)) > threshold) n++;
    }
    rows[y] = n;
  }
  return rows;
}
/* Contiguous bands of rows that changed when one rule hid one thing. */
function bandsOf(rows, floor) {
  const bands = [];
  let start = null;
  for (let y = 0; y < rows.length; y++) {
    if (rows[y] > floor) { if (start === null) start = y; }
    else if (start !== null) { bands.push({ top: start, height: y - start }); start = null; }
  }
  if (start !== null) bands.push({ top: start, height: rows.length - start });
  return bands;
}
function accentPixels(image, hex, tolerance) {
  const want = { r: parseInt(hex.slice(1, 3), 16), g: parseInt(hex.slice(3, 5), 16), b: parseInt(hex.slice(5, 7), 16) };
  let n = 0;
  for (let y = 0; y < image.height; y++) {
    for (let x = 0; x < image.width; x++) {
      const i = y * image.stride + x * image.channels;
      if (image.channels < 3) continue;
      if (Math.abs(image.pixels[i] - want.r) <= tolerance &&
          Math.abs(image.pixels[i + 1] - want.g) <= tolerance &&
          Math.abs(image.pixels[i + 2] - want.b) <= tolerance) n++;
    }
  }
  return n;
}

const GROUND = { dark: "#13140D", light: "#DBD8C6" };
const ACCENT = { dark: "#C05A32", light: "#A0451F" };
try {
  for (const theme of ["dark", "light"]) {
    const ground = hexLuminance(GROUND[theme]);
    const full = quickLook(webkitCopy(theme, "", `${theme}-s02`), `${theme}-s02`);
    const noLines = quickLook(webkitCopy(theme, ".log__line{visibility:hidden}", `${theme}-nolines`), `${theme}-nolines`);
    const noL12 = quickLook(webkitCopy(theme, ".log__line--state{visibility:hidden}", `${theme}-nol12`), `${theme}-nol12`);
    const noChrome = quickLook(webkitCopy(theme, ".terminal__chrome{visibility:hidden}", `${theme}-nochrome`), `${theme}-nochrome`);
    const noVignette = quickLook(webkitCopy(theme, ".texture__vignette{display:none}", `${theme}-novignette`), `${theme}-novignette`);

    const bands = bandsOf(changedRows(full, noLines), 0);
    const l12Band = bandsOf(changedRows(full, noL12), 0);
    const others = bands.filter((b) => !l12Band.some((l) => Math.abs(l.top - b.top) < 6));
    const medianOther = others.map((b) => b.height).sort((a, b) => a - b)[Math.floor(others.length / 2)];
    const chromeBands = bandsOf(changedRows(full, noChrome), 0);
    /* The vignette is a top-anchored darkening wash, so hiding it changes a
       band that starts at the very top of the render and does not reach the
       bottom. Rows are counted rather than banded — a wash has no edges. */
    const vignetteRows = changedRows(full, noVignette, 1).map((n, y) => ({ y, n })).filter((r) => r.n > 0);
    const vignetteTop = vignetteRows.length ? vignetteRows[0].y : null;
    const vignetteBottom = vignetteRows.length ? vignetteRows[vignetteRows.length - 1].y : null;
    const accentFull = accentPixels(full, ACCENT[theme], 26);
    const accentNoLines = accentPixels(noLines, ACCENT[theme], 26);
    const patch = findGroundPatch(full, ground);

    evidence[`webkit_${theme}`] = { render: `${full.width}x${full.height}`, bands: bands.length,
      bandHeights: bands.map((b) => b.height), l12Band, medianOther, accentFull, accentNoLines, patch,
      chromeBands, vignette: { rows: vignetteRows.length, top: vignetteTop, bottom: vignetteBottom } };

    check(`WebKit lays out twelve distinct log rows in the no-JS transcript (${theme})`,
      bands.length === 12,
      `${bands.length} row bands recovered by hiding .log__line and diffing the two renders against each ` +
      `other (render ${full.width}x${full.height}, tops ${bands.map((b) => b.top).join("/")}, ` +
      `heights ${bands.map((b) => b.height).join("/")})`);
    check(`WebKit gives L12 the large treatment the other eleven lines do not get (${theme})`,
      l12Band.length === 1 && medianOther > 0 && l12Band[0].height > medianOther,
      l12Band.length === 1 ? `L12 row ${l12Band[0].height}px at y=${l12Band[0].top} against a median ${medianOther}px ` +
        `for the other eleven — the same row the full-transcript diff puts last`
        : `${l12Band.length} bands changed when only .log__line--state was hidden`);
    /* The second construction `brand-seats.md` §11 names as WebKit-divergence
       risk lands here: the key-beat mark is absolutely positioned with
       `inset-block: 0` against a line box the reveal also transforms. QuickLook
       runs no JavaScript, so what it renders is the untransformed transcript —
       which is the case where the mark either paints or does not. */
    check(`WebKit paints accent ink inside §2 — L12, the ✓ glyph and the key-beat marks (${theme})`,
      accentFull - accentNoLines > 200,
      `${accentFull} accent pixels with the lines shown vs ${accentNoLines} with them hidden ` +
      `(+${accentFull - accentNoLines}) — the emphasis system is rendering, not silently dropping`);
    /* Two bands, not one: the chrome bar is a label row and, below a band of
       padding that carries no ink either way, its bottom hairline. Both are
       part of the element and both vanish with it, so the assertion is that
       everything the bar owns sits above the first log row. */
    check(`WebKit renders the terminal chrome bar above the first log row (${theme})`,
      chromeBands.length > 0 && bands.length > 0 && chromeBands.every((c) => c.top + c.height <= bands[0].top),
      chromeBands.length
        ? chromeBands.map((c) => `y=${c.top} (${c.height}px)`).join(" + ") +
          ` — label row and hairline, both above the first log row at y=${bands[0].top}`
        : "hiding .terminal__chrome changed nothing — the bar is not painting");
    /* A top-anchored wash, not an edge-bounded box: it starts under the opaque
       status bar (which paints over it) and fades to nothing well above the
       midline. Both ends are reported so the shape is on the record. */
    check(`the top vignette paints in WebKit and stays a top-anchored wash (${theme})`,
      vignetteTop !== null && vignetteTop < full.height * 0.1 && vignetteBottom < full.height * 0.5,
      vignetteTop === null ? "hiding .texture__vignette changed nothing — the wash is not painting"
        : `${vignetteRows.length} rows change when it is hidden, y=${vignetteTop}→${vignetteBottom} of ${full.height} ` +
          `(${Math.round((vignetteTop / full.height) * 1000) / 10}%→${Math.round((vignetteBottom / full.height) * 1000) / 10}%) — ` +
          `it begins below the opaque status bar, which paints over it, and fades out above the midline`);
    check(`grain and ground survive under §2 in WebKit (${theme})`,
      patch !== null && patch.stdDev > 0.2,
      patch ? `patch at ${patch.x},${patch.y} mean ${patch.mean} vs expected ${ground}, stdDev ${patch.stdDev}`
            : "no ground patch within tolerance");
  }
} finally {
  webkitTemps.forEach((p) => rmSync(p, { force: true }));
}

const failed = results.filter((r) => !r.passed);
const w = Math.max(...results.map((r) => r.name.length));
if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, reports, evidence }, null, 2));
} else {
  for (const r of results) console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(w)}  ${r.detail ?? ""}`);
  for (const r of reports) console.log(`RPRT  ${r.name.padEnd(w)}  ${r.detail ?? ""}`);
  console.log(`\n${results.length - failed.length}/${results.length} QA checks passed. ${reports.length} measurements reported, not asserted.`);
}
writeFileSync(join(ARTIFACTS, "qa-independent-report.json"), JSON.stringify({ results, reports, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
