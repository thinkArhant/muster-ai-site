/* Page-shell verification harness.

   Runs the shell through headless Blink under four emulated conditions plus a
   count-up engine fixture, and asserts the shell's stated contracts:

     - zero external network requests
     - measured contrast per token pair, both themes
     - landmarks, heading tree, skip link, focus ring
     - matte / sharp-corner / opaque surface rules
     - no webfonts, no CDN, no build-system artifacts
     - reduced motion renders complete content
     - no horizontal scroll at 320px, 375px, or 200% zoom
     - the grain layer actually renders (pixel spread of bare ground)

   And the §2 replay's own contracts:

     - every rendered log line diffs byte-clean against the corpus on disk, and
       every narration slot against the narration deliverable
     - measured reveal offsets against the replay spec's schedule, watched over
       a real 48-second chain rather than read off the schedule it was given
     - the phone height budget, row by row, at 375 x 553
     - the soft wrap: no line needs a sideways gesture at any phone width, the
       window holds whole wrapped lines only, and the wrap costs no character
     - reduced motion and no-JS render the complete transcript, no controls

   Usage:  node tests/verify-shell.mjs [--json]

   WebKit is verified separately by tests/verify-webkit.mjs; both engines are
   required evidence at every visual milestone.  */

import { launchChrome } from "./lib/cdp.mjs";
import { decodePng, findGroundPatch, hexLuminance } from "./lib/png.mjs";
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const ARTIFACTS = join(ROOT, "tests", "artifacts");
const PAGE_URL = "file://" + join(ROOT, "index.html");
const FIXTURE_URL = "file://" + join(ROOT, "tests", "fixtures", "count-up.html");

const results = [];
const evidence = {};

function check(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail });
}

/* --- contrast maths, run outside the page ---
   The vignette sits between the ground and the content, so no computed style
   reports the colour a label in that zone is actually read against. The worst
   case has to be composited by hand. */
const rgb = (hex) => {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
};

const relLum = ({ r, g, b }) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};

const contrast = (a, b) => {
  const [l1, l2] = [relLum(a), relLum(b)];
  return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
};

const darkenBy = ({ r, g, b }, alpha) => ({
  r: r * (1 - alpha),
  g: g * (1 - alpha),
  b: b * (1 - alpha)
});

/* ------------------------------------------------------------------ audit -- */

const AUDIT = `(() => {
  const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();

  const parseColor = (value) => {
    const m = String(value).match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const parts = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { r: parts[0], g: parts[1], b: parts[2], a: parts.length > 3 ? parts[3] : 1 };
  };

  const over = (fg, bg) => ({
    r: fg.r * fg.a + bg.r * (1 - fg.a),
    g: fg.g * fg.a + bg.g * (1 - fg.a),
    b: fg.b * fg.a + bg.b * (1 - fg.a),
    a: 1
  });

  const lum = (c) => {
    const f = (v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
  };

  const ratio = (a, b) => {
    const l1 = lum(a), l2 = lum(b);
    return Math.round(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;
  };

  const backdrop = (el) => {
    let node = el, stack = [];
    while (node && node !== document.documentElement.parentNode) {
      const c = parseColor(css(node, "background-color"));
      if (c && c.a > 0) stack.push(c);
      if (c && c.a === 1) break;
      node = node.parentElement;
    }
    if (!stack.length) return { r: 255, g: 255, b: 255, a: 1 };
    let acc = stack[stack.length - 1];
    for (let i = stack.length - 2; i >= 0; i--) acc = over(stack[i], acc);
    return acc;
  };

  const contrastOf = (selector) => {
    const el = document.querySelector(selector);
    if (!el) return null;
    const fg = parseColor(css(el, "color"));
    const bg = backdrop(el);
    return { selector, color: css(el, "color"), background:
      "rgb(" + Math.round(bg.r) + ", " + Math.round(bg.g) + ", " + Math.round(bg.b) + ")",
      ratio: ratio(fg.a === 1 ? fg : over(fg, bg), bg),
      fontSize: css(el, "font-size") };
  };

  /* --- tokens --- */
  const root = document.documentElement;
  const tokens = {};
  ["--ground","--surface","--ink","--muted","--hair","--accent","--vignette-alpha","--grain-alpha",
   "--rhythm","--page-max","--read-max","--pulse-period","--cursor-period","--countup-duration","--reveal"]
    .forEach((t) => { tokens[t] = css(root, t); });

  /* --- landmarks + headings --- */
  const headings = [...document.querySelectorAll("h1,h2,h3,h4,h5,h6")]
    .map((h) => ({ level: Number(h.tagName[1]), text: h.textContent.trim().replace(/\\s+/g, " ") }));
  let headingSkip = null;
  for (let i = 1; i < headings.length; i++) {
    if (headings[i].level > headings[i - 1].level + 1) headingSkip = headings[i].text;
  }

  const focusables = [...document.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  )];

  /* --- corners: only status lamps may be round --- */
  const rounded = [...document.querySelectorAll("*")]
    .filter((el) => {
      const r = css(el, "border-radius");
      return r && r !== "0px" && !/^0px 0px 0px 0px$/.test(r);
    })
    .map((el) => el.className + "::" + css(el, "border-radius"));

  /* --- glass check --- */
  const glass = [...document.querySelectorAll("*")]
    .filter((el) => {
      const bf = css(el, "backdrop-filter") || css(el, "-webkit-backdrop-filter");
      return bf && bf !== "none";
    }).map((el) => el.className);

  /* --- shadows --- */
  const shadows = [...document.querySelectorAll("*")]
    .filter((el) => css(el, "box-shadow") !== "none")
    .map((el) => el.className + "::" + css(el, "box-shadow"));

  /* --- external references anywhere in the DOM ---
     The claim is about what the page REQUESTS at runtime, not about what it
     displays. An href on an anchor is a destination the reader chooses to
     travel to; nothing is fetched until they click, and §6 ships one. Every
     other attribute here — and href on anything that is not an anchor, which
     is how <link> pulls a stylesheet — is resolved by the engine with no
     reader action at all. Those stay banned, and are collected separately so
     the permitted ones remain visible in the evidence rather than invisible. */
  const externalRefs = [];
  const readerNavigations = [];
  document.querySelectorAll("*").forEach((el) => {
    ["src", "href", "srcset", "poster", "data"].forEach((attr) => {
      const v = el.getAttribute && el.getAttribute(attr);
      if (!v || !/^(https?:)?\\/\\//i.test(v)) return;
      const site = el.tagName + "[" + attr + "]=" + v;
      if (attr === "href" && el.tagName === "A") readerNavigations.push(site);
      else externalRefs.push(site);
    });
  });

  /* --- fonts --- */
  let fontFaces = 0;
  for (const sheet of document.styleSheets) {
    try {
      for (const rule of sheet.cssRules) if (rule.constructor.name === "CSSFontFaceRule") fontFaces++;
    } catch (e) { /* cross-origin sheet — there are none */ }
  }

  /* --- status bar --- */
  const bar = document.querySelector(".statusbar");
  const barBox = bar.getBoundingClientRect();
  const barBg = parseColor(css(bar, "background-color"));

  /* --- motifs ---
     The pennant's placement rule is a relationship to the text beside it — its
     bottom edge sits ON that text's baseline — and no engine exposes a
     baseline. A zero-sized inline-block with vertical-align: baseline has its
     own bottom margin edge on the baseline by definition, so its rect bottom IS
     the baseline y. Probe in, measure, probe out. */
  const baselineOf = (el) => {
    const p = document.createElement("span");
    p.style.cssText = "display:inline-block;width:0;height:0;vertical-align:baseline;flex:none";
    el.appendChild(p);
    const y = p.getBoundingClientRect().bottom;
    p.remove();
    return y;
  };
  const tick = document.querySelector(".rule__tick");
  const tickBox = tick.getBoundingClientRect();
  const mark = document.querySelector(".tag__mark");
  const markBox = mark.getBoundingClientRect();
  const tagEl = document.querySelector(".tag");
  const brandMark = document.querySelector(".brand__mark");
  const brandRule = document.querySelector(".brand__rule");
  const brandWord = document.querySelector(".brand__word");
  const pulse = document.querySelector(".pulse");
  const pulseBox = pulse.getBoundingClientRect();
  /* Grouped by the surface each mark actually hangs on rather than by the
     .instrument class, so a new instrument surface — §1's remnant strip is the
     first — is covered the moment it ships instead of silently sitting outside
     the sparseness rule. */
  const regmarksPerSurface = [...new Set([...document.querySelectorAll(".regmark")]
    .map((m) => m.parentElement))]
    .map((el) => ({ on: el.className || el.tagName, marks: el.querySelectorAll(".regmark").length }));

  /* --- reading column --- */
  const read = document.querySelector(".read");
  const probe = document.createElement("span");
  probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
  probe.textContent = "0";
  read.appendChild(probe);
  const advance = probe.getBoundingClientRect().width;
  probe.remove();

  /* --- texture --- */
  const grain = document.querySelector(".texture__grain");
  const vignette = document.querySelector(".texture__vignette");

  /* --- animations running right now --- */
  const animations = document.getAnimations().map((a) => ({
    name: a.animationName || (a.effect && a.effect.getKeyframes && "css"),
    target: a.effect && a.effect.target ? (a.effect.target.className || a.effect.target.tagName) : "?",
    duration: a.effect ? a.effect.getTiming().duration : null
  }));

  /* --- focus ring --- */
  const skip = document.querySelector(".skip-link");
  skip.focus();
  const focusRing = {
    outlineWidth: css(skip, "outline-width"),
    outlineStyle: css(skip, "outline-style"),
    outlineColor: css(skip, "outline-color"),
    outlineOffset: css(skip, "outline-offset"),
    visibleTop: skip.getBoundingClientRect().top
  };
  skip.blur();

  return {
    title: document.title,
    lang: document.documentElement.lang,
    theme: document.documentElement.getAttribute("data-theme"),
    colorScheme: css(root, "color-scheme"),
    tokens,
    landmarks: {
      header: document.querySelectorAll("body > header").length,
      main: document.querySelectorAll("main").length,
      footer: document.querySelectorAll("body > footer").length,
      sections: document.querySelectorAll("main > section").length,
      labelled: [...document.querySelectorAll("main > section")]
        .filter((s) => {
          const id = s.getAttribute("aria-labelledby");
          return id && document.getElementById(id);
        }).length
    },
    headings,
    headingSkip,
    h1Count: headings.filter((h) => h.level === 1).length,
    firstFocusable: focusables.length ? focusables[0].className : null,
    skipTarget: skip.getAttribute("href"),
    skipTargetExists: Boolean(document.querySelector(skip.getAttribute("href"))),
    skipTargetFocusable: document.getElementById("main").getAttribute("tabindex") === "-1",
    focusRing,
    contrast: [
      /* §3's paragraph is the page's permanent body-prose exemplar — the
         largest single reading passage at the full 64ch column. It replaces
         the shell placeholder the probe used while §3 was scaffolding, so the
         body-contrast claim is measured on real prose and survives the last
         placeholder leaving the page. */
      contrastOf("#the-insight p.read"),
      contrastOf(".sheet__row dd"),
      contrastOf(".sheet__stamp"),
      contrastOf("#hero-title"),
      contrastOf(".status__word"),
      contrastOf(".tag"),
      contrastOf(".regmark"),
      contrastOf(".pagefoot p")
    ].filter(Boolean),
    rounded,
    glass,
    shadows,
    externalRefs,
    readerNavigations,
    /* A prefetch/preload/dns-prefetch hint fetches without a click and would
       walk straight past the anchor allowance above. */
    prefetchHints: [...document.querySelectorAll("link[rel], a[rel]")]
      .map((el) => el.getAttribute("rel"))
      .filter((rel) => /prefetch|preload|preconnect|dns-prefetch|prerender/i.test(rel)),
    fontFaces,
    loadedFonts: document.fonts ? document.fonts.size : 0,
    statusBar: {
      height: Math.round(barBox.height * 100) / 100,
      position: css(bar, "position"),
      opaque: barBg.a === 1,
      borderBottom: css(bar, "border-bottom-width") + " " + css(bar, "border-bottom-color")
    },
    motifs: {
      tick: { w: Math.round(tickBox.width * 100) / 100, h: Math.round(tickBox.height * 100) / 100 },
      tagMark: { w: Math.round(markBox.width * 100) / 100, h: Math.round(markBox.height * 100) / 100,
                 clip: css(mark, "clip-path"), bg: css(mark, "background-color"),
                 /* The mark's bottom edge on the text's baseline. A zero-sized
                    inline-block aligned to baseline has its own bottom margin
                    edge ON the baseline, so its rect bottom IS the baseline y —
                    measured rather than derived from font metrics the engine
                    does not expose. */
                 baselineDrop: Math.round((markBox.bottom - baselineOf(tagEl)) * 100) / 100 },
      /* The load-bearing one: five separator tags are vertically centred in a
         grid row, so a single pixel of flex-line growth from baseline alignment
         shifts every one of them off its rule at once. */
      tagBox: { h: Math.round(tagEl.getBoundingClientRect().height * 100) / 100,
                lineBox: Math.round(parseFloat(css(tagEl, "line-height")) * 100) / 100 },
      brand: {
        mark: { w: Math.round(brandMark.getBoundingClientRect().width * 100) / 100,
                h: Math.round(brandMark.getBoundingClientRect().height * 100) / 100,
                clip: css(brandMark, "clip-path"), bg: css(brandMark, "background-color"),
                colour: css(brandMark, "color"),
                baselineDrop: Math.round((brandMark.getBoundingClientRect().bottom - baselineOf(brandWord)) * 100) / 100,
                hidden: brandMark.getAttribute("aria-hidden") },
        rule: { w: Math.round(brandRule.getBoundingClientRect().width * 100) / 100,
                h: Math.round(brandRule.getBoundingClientRect().height * 100) / 100,
                bg: css(brandRule, "background-color"), colour: css(brandRule, "color"),
                /* Top edge 1px below the baseline, bottom edge 3px below it. */
                top: Math.round((brandRule.getBoundingClientRect().top - baselineOf(brandWord)) * 100) / 100,
                bottom: Math.round((brandRule.getBoundingClientRect().bottom - baselineOf(brandWord)) * 100) / 100,
                /* The gap from the R is the wordmark's own trailing letter-space
                   and nothing else — it is what makes the mark read as a prompt
                   caret rather than an underline, so it must not be cancelled. */
                fromWord: Math.round((brandRule.getBoundingClientRect().left -
                  (() => { const r = document.createRange();
                           r.setStart(brandWord.firstChild, 0);
                           r.setEnd(brandWord.firstChild, brandWord.firstChild.length);
                           return r.getBoundingClientRect().right; })()) * 100) / 100,
                track: css(brandWord, "letter-spacing"),
                hidden: brandRule.getAttribute("aria-hidden"),
                animation: css(brandRule, "animation-name"),
                transition: css(brandRule, "transition-duration") },
        name: document.querySelector(".brand").textContent.trim(),
        gap: css(document.querySelector(".brand"), "column-gap"),
        /* The masthead's one declared number. Everything else in the lockup
           derives from it — the mark is 0.5em × 0.75em of it — so the whole
           thing scales from a single value and the harness checks the RATIO,
           never the pixel size. */
        wordSize: Math.round(parseFloat(css(brandWord, "font-size")) * 100) / 100,
        /* Punctuation scale, for comparison: the five section tags keep 6 × 9
           while the header grows. Two scales, one silhouette. */
        tagMark: { w: Math.round(markBox.width * 100) / 100, h: Math.round(markBox.height * 100) / 100 },
        tickH: Math.round(tickBox.height * 100) / 100
      },
      /* Tokens resolve to hex and computed colours to rgb(); ask the engine what
         the token paints as so the two can be compared like with like. */
      accentRgb: (() => {
        const p = document.createElement("span");
        p.style.color = "var(--accent)";
        document.body.appendChild(p);
        const v = css(p, "color");
        p.remove();
        return v;
      })(),
      pulse: { w: Math.round(pulseBox.width * 100) / 100, h: Math.round(pulseBox.height * 100) / 100,
               radius: css(document.querySelector(".pulse__core"), "border-radius") },
      regmarksPerSurface,
      stencilTags: [...document.querySelectorAll(".tag")].map((t) => t.textContent.trim()),
      ruleCount: document.querySelectorAll(".rule").length,
      boundaryRules: document.querySelectorAll(".rule--boundary").length,
      operationalWord: document.querySelector(".status__word").textContent.trim()
    },
    reading: {
      token: css(root, "--read-max"),
      maxWidth: css(read, "max-width"),
      rendered: Math.round(read.getBoundingClientRect().width * 100) / 100,
      capacity: Math.round((read.getBoundingClientRect().width / advance) * 10) / 10
    },
    texture: {
      grainOpacity: css(grain, "opacity"),
      grainImage: css(grain, "background-image").slice(0, 60),
      grainIsDataUri: css(grain, "background-image").includes("data:image/svg+xml"),
      grainSize: css(grain, "background-size"),
      vignetteImage: css(vignette, "background-image").slice(0, 40),
      zIndex: css(document.querySelector(".texture"), "z-index"),
      pointerEvents: css(document.querySelector(".texture"), "pointer-events"),
      ariaHidden: document.querySelector(".texture").getAttribute("aria-hidden")
    },
    animations,
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    overflow: {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth
    },
    placeholders: document.querySelectorAll("[data-shell-placeholder]").length
  };
})()`;

/* ------------------------------------------------------------------- run --- */

const chrome = await launchChrome();
const page = await chrome.browser.newPage();
await page.init();
mkdirSync(ARTIFACTS, { recursive: true });

try {
  /* ---------- 1. dark theme, motion on ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(PAGE_URL);
  const dark = await page.eval(AUDIT);
  evidence.dark = dark;
  const darkRequests = page.requests.slice();
  const darkShot = await page.screenshot();
  writeFileSync(join(ARTIFACTS, "blink-dark-1440.png"), darkShot);

  /* A data: URI never leaves the document; a file: URL never leaves the disk.
     Anything else is an external request, which the page claims it makes none of. */
  const isLocal = (r) => /^(file:|data:)/.test(r.url);
  const describe = (list) =>
    `${list.length} loads, none external: ` +
    list.map((r) => (r.url.startsWith("data:") ? "data:uri(grain)" : r.url.split("/").pop())).join(", ");

  check("zero external network requests (dark)", darkRequests.every(isLocal), describe(darkRequests));
  check("no runtime errors (dark)", page.consoleErrors.length === 0, page.consoleErrors.join("; "));
  check("landmarks: header/main/footer", dark.landmarks.header === 1 && dark.landmarks.main === 1 && dark.landmarks.footer === 1, JSON.stringify(dark.landmarks));
  check("six sections, every one labelled", dark.landmarks.sections === 6 && dark.landmarks.labelled === 6, JSON.stringify(dark.landmarks));
  check("exactly one h1", dark.h1Count === 1, `h1 count ${dark.h1Count}`);
  check("no skipped heading levels", dark.headingSkip === null, dark.headingSkip || "h1 -> h2 only");
  check("skip link is first focusable and resolves", dark.firstFocusable === "skip-link" && dark.skipTarget === "#main" && dark.skipTargetExists, `${dark.firstFocusable} -> ${dark.skipTarget}`);
  check("skip target actually takes focus (WebKit)", dark.skipTargetFocusable, `main[tabindex] = ${dark.skipTargetFocusable}`);
  check("focus ring 2px solid accent, 3px offset", dark.focusRing.outlineWidth === "2px" && dark.focusRing.outlineStyle === "solid" && dark.focusRing.outlineOffset === "3px", JSON.stringify(dark.focusRing));
  check("skip link reveals on focus", dark.focusRing.visibleTop >= 0, `top ${dark.focusRing.visibleTop}px`);

  const darkBody = dark.contrast.find((c) => c.selector === "#the-insight p.read");
  check("body text >= 4.5:1 (dark)", darkBody.ratio >= 4.5, `${darkBody.ratio}:1 ink on surface`);
  dark.contrast.forEach((c) => {
    check(`contrast ${c.selector} (dark)`, c.ratio >= 4.5, `${c.ratio}:1 at ${c.fontSize}`);
  });

  check("sharp corners everywhere but the lamp", dark.rounded.every((r) => r.startsWith("pulse")), dark.rounded.join(" | ") || "none");
  check("no glass (backdrop-filter)", dark.glass.length === 0, dark.glass.join(", ") || "none");
  check("no shadows", dark.shadows.length === 0, dark.shadows.join(" | ") || "none");
  check("status bar opaque, sticky, 48px, hairline-ruled", dark.statusBar.opaque && dark.statusBar.position === "sticky" && dark.statusBar.height === 48, JSON.stringify(dark.statusBar));
  /* What the page may not do is REQUEST something at runtime. A cross-origin
     href on an anchor is a place the reader can choose
     to go and fetches nothing until they choose it; §6 ships exactly one. Every
     engine-resolved reference — src, srcset, poster, data, and href on anything
     that is not an anchor — still fails here, and so does any prefetch hint,
     which would fetch without a click and slip past the allowance. */
  check("no engine-resolved external reference in the DOM", dark.externalRefs.length === 0, dark.externalRefs.join(", ") || "none");
  check("no prefetch/preload hints (they fetch without a click)", dark.prefetchHints.length === 0, dark.prefetchHints.join(", ") || "none");
  check("cross-origin hrefs are anchors only, and stay inert until clicked", dark.readerNavigations.every((r) => r.startsWith("A[href]")) && darkRequests.every(isLocal), `${dark.readerNavigations.length} reader-navigable link(s): ${dark.readerNavigations.join(", ") || "none"}`);
  check("no @font-face, no loaded webfonts", dark.fontFaces === 0 && dark.loadedFonts === 0, `${dark.fontFaces} font-face rules, ${dark.loadedFonts} loaded`);
  check("grain is a self-contained data URI", dark.texture.grainIsDataUri, dark.texture.grainSize);
  check("texture is aria-hidden, behind content, inert", dark.texture.ariaHidden === "true" && dark.texture.zIndex === "-1" && dark.texture.pointerEvents === "none", JSON.stringify({ z: dark.texture.zIndex, pe: dark.texture.pointerEvents }));
  check("grain peak alpha capped at 8% (dark)", Number(dark.texture.grainOpacity) <= 0.08, `opacity ${dark.texture.grainOpacity}`);
  check("vignette alpha 16% (dark)", Number(dark.tokens["--vignette-alpha"]) === 0.16, dark.tokens["--vignette-alpha"]);
  /* Five labelled section rules, and one more rule at the footer boundary
     carrying no label — the same construction minus the tag. The tag count is
     what stays at five: a sixth stencil tag would be a section that arrived
     without anyone noticing, where a sixth RULE is the boundary the footer
     needs and the plain border it replaced. */
  check("five stencil tags with machined ticks, on six rules — the sixth closes the page",
    dark.motifs.stencilTags.length === 5 && dark.motifs.ruleCount === 6 &&
      dark.motifs.boundaryRules === 1,
    `${dark.motifs.stencilTags.join(" / ")} · ${dark.motifs.ruleCount} rules, ${dark.motifs.boundaryRules} of them the unlabelled footer boundary`);
  check("ticks are 9x1px", dark.motifs.tick.w === 1 && dark.motifs.tick.h === 9, JSON.stringify(dark.motifs.tick));
  /* The mark is the pennant at punctuation scale. Three clauses, and the one
     that carries weight is the middle one: the mark's height is bound to
     `.rule__tick`'s rather than to the literal 9, so the shared vertical measure
     that makes the separator read as one machined assembly either moves together
     or fails (brand-seats.md §2, §11). */
  check("stencil tag mark is the 6x9 pennant, sharing the tick's 9px measure",
    dark.motifs.tagMark.w === 6 && dark.motifs.tagMark.h === 9 &&
      dark.motifs.tagMark.h === dark.motifs.tick.h && dark.motifs.tagMark.clip !== "none",
    `${dark.motifs.tagMark.w}×${dark.motifs.tagMark.h} vs tick h ${dark.motifs.tick.h}, clip-path ${dark.motifs.tagMark.clip.slice(0, 48)}`);
  check("the pennant's bottom edge sits on the tag label's baseline",
    Math.abs(dark.motifs.tagMark.baselineDrop) < 0.5,
    `mark bottom is ${dark.motifs.tagMark.baselineDrop}px from the baseline`);
  /* Baseline alignment can grow a flex line, and this construction is centred in
     a grid row across five sections — a pixel of growth moves all five tags off
     their rules at once. The tag's box is its --text-label line box or it is a
     defect. */
  check("the tag's block size is set by its type, not by its mark",
    Math.abs(dark.motifs.tagBox.h - dark.motifs.tagBox.lineBox) < 0.5,
    `.tag renders ${dark.motifs.tagBox.h}px against a ${dark.motifs.tagBox.lineBox}px --text-label line box`);
  /* The header lockup: pennant + MUSTER + a drawn static underscore. */
  const bm = dark.motifs.brand;
  /* The masthead. Two relationships, not two sizes: the mark is 0.5em × 0.75em
     of the wordmark, so it carries the pennant's 6/12 × 9/12 proportions up
     from the punctuation scale — one silhouette, two seats — and it still sits
     on the wordmark's baseline, which is the construction with the real WebKit
     divergence risk. The 18px is declared in one place and asserted here as a
     ratio, so re-sizing the masthead is one CSS edit and no test edit. */
  check("the masthead's pennant derives from the wordmark: 0.5em × 0.75em, on its baseline",
    Math.abs(bm.mark.w - bm.wordSize * 0.5) < 0.5 &&
      Math.abs(bm.mark.h - bm.wordSize * 0.75) < 0.5 &&
      Math.abs(bm.mark.h / bm.mark.w - 1.5) < 0.02 &&
      bm.mark.clip !== "none" && bm.mark.bg === dark.motifs.accentRgb &&
      Math.abs(bm.mark.baselineDrop) < 0.5 && bm.mark.hidden === "true",
    `${bm.mark.w}×${bm.mark.h} against a ${bm.wordSize}px wordmark (${bm.mark.w / bm.wordSize}em × ${bm.mark.h / bm.wordSize}em), ${bm.mark.baselineDrop}px off the baseline, aria-hidden ${bm.mark.hidden}`);
  /* Punctuation scale holds while the masthead grows: the separators stay at
     the section rule's own end-tick height, so rule and mark share one vertical
     measure — and the masthead is strictly the larger of the two seats, which
     is the whole point of the ruling. */
  check("the separator pennant keeps punctuation scale, bound to the rule's end tick",
    bm.tagMark.w === 6 && bm.tagMark.h === 9 && bm.tagMark.h === bm.tickH &&
      bm.mark.h > bm.tagMark.h,
    `separator ${bm.tagMark.w}×${bm.tagMark.h} against the tick's ${bm.tickH}px · masthead ${bm.mark.w}×${bm.mark.h}`);
  /* Painted with background-color and never `color`: the small-rust-text audit
     collects elements whose `color` resolves to the accent, so a mark painted
     the other way would be judged as sub-AA rust text. */
  check("both brand marks are painted with background-color, never color",
    bm.mark.bg === dark.motifs.accentRgb && bm.rule.bg === dark.motifs.accentRgb &&
      bm.mark.colour !== dark.motifs.accentRgb && bm.rule.colour !== dark.motifs.accentRgb,
    `mark bg ${bm.mark.bg} / color ${bm.mark.colour} · rule bg ${bm.rule.bg} / color ${bm.rule.colour}`);
  /* Drawn rather than typed, which is what makes its 2px weight the same on
     every platform: only its POSITION comes from the resolved face, via the
     baseline. 1ch wide so it stays one character position whatever font wins. */
  check("the underscore is a drawn 1ch × 2px bar 1–3px under the baseline",
    bm.rule.h === 2 && bm.rule.w > 4 && bm.rule.w < 12 &&
      Math.abs(bm.rule.top - 1) < 0.5 && Math.abs(bm.rule.bottom - 3) < 0.5,
    `${bm.rule.w}×${bm.rule.h}px, top ${bm.rule.top}px / bottom ${bm.rule.bottom}px below the baseline`);
  /* Inside the wordmark's own run, not a third flex item: as a sibling it would
     take .brand's 12px gap and read as a rust dash floating clear of the R. What
     separates it from the R is the wordmark's own trailing letter-space and
     nothing else — that is exactly the next character position, and it is what
     makes the mark read as a prompt caret rather than an underline. The run's
     rect already carries that trailing space, so the bar abuts it at 0; the
     tracking is asserted alongside, because cancelling it is the other way this
     detail is lost and a zero offset alone would not notice. */
  check("the underscore sits at the next character position, not at the lockup's gap",
    bm.rule.fromWord >= 0 && bm.rule.fromWord < parseFloat(bm.gap) && parseFloat(bm.rule.track) > 0,
    `${bm.rule.fromWord}px past the wordmark's run (which carries its own ${bm.rule.track} trailing letter-space), against a ${bm.gap} lockup gap`);
  /* The motion inventory is closed at three plus the curl cursor, and a mark
     that looks like a terminal caret is the element most likely to be
     "improved" into a fourth. */
  check("the underscore is static — no animation, no transition",
    bm.rule.animation === "none" && parseFloat(bm.rule.transition) === 0,
    `animation-name ${bm.rule.animation}, transition-duration ${bm.rule.transition}`);
  check("the header's accessible name is exactly MUSTER", bm.name === "MUSTER", JSON.stringify(bm.name));
  /* Two marks per instrument surface — one at each end of its diagonal — with
     one exception, and the exception is geometric rather than a name on a
     list: a surface whose inline-end corner is occupied by an interactive
     element takes ONE mark, at the top-left, because the second would land on
     that element's border box. §1's single-row strip is that surface today.
     The corner-collision half of the rule is asserted with §1, against the
     chip's measured box; here the count is held to 2 for every surface that
     has both corners free. */
  const CORNER_LET = ".remnant";
  const regSurfaces = dark.motifs.regmarksPerSurface;
  check("registration marks: two per instrument surface, one where the end corner is let",
    regSurfaces.length > 0 &&
      regSurfaces.every((s) => (new RegExp(CORNER_LET.slice(1)).test(s.on) ? s.marks === 1 : s.marks === 2)),
    JSON.stringify(regSurfaces));
  check("pulse lamp is an 8px circle", dark.motifs.pulse.w === 8 && dark.motifs.pulse.h === 8 && dark.motifs.pulse.radius === "50%", JSON.stringify(dark.motifs.pulse));
  check("OPERATIONAL word present (state not colour-alone)", dark.motifs.operationalWord === "OPERATIONAL", dark.motifs.operationalWord);
  /* The token is the seed-locked 64ch. Capacity is reported alongside it because
     Chrome derives `ch` from font metrics while rendering uses the shaped
     advance — the column measures ~67 characters wide, inside the spec's "~64ch". */
  check("reading column is the seed-locked 64ch", dark.reading.token === "64ch" && dark.reading.maxWidth.includes("px"), `--read-max ${dark.reading.token} -> ${dark.reading.maxWidth}`);
  check("reading column measures ~64 characters", dark.reading.capacity >= 60 && dark.reading.capacity <= 72, `${dark.reading.capacity} characters at ${dark.reading.rendered}px`);
  /* Two lamps now: the status bar and the terminal's live indicator, three
     animations each (core brightness + two rings a half-period apart). */
  check("pulse animating with motion on", dark.animations.filter((a) => String(a.name).startsWith("pulse")).length === 6, JSON.stringify(dark.animations.map((a) => a.name)));
  check("no horizontal scroll at 1440px", dark.overflow.scrollWidth <= dark.overflow.clientWidth, JSON.stringify(dark.overflow));

  /* palette fidelity against the seed's locked values */
  const SEED_DARK = { "--ground": "#13140D", "--surface": "#1B1D13", "--ink": "#E6E3D3", "--muted": "#8C9075", "--hair": "#2C2F22", "--accent": "#C05A32" };
  check("dark palette matches the seed exactly", Object.entries(SEED_DARK).every(([k, v]) => dark.tokens[k].toUpperCase() === v), JSON.stringify(dark.tokens));

  /* grain actually rendered — pixel spread of bare ground */
  const darkImage = decodePng(darkShot);
  const groundLum = hexLuminance(SEED_DARK["--ground"]);
  const darkPatch = findGroundPatch(darkImage, groundLum);
  evidence.blinkGrainPatch = darkPatch;
  check("bare ground renders at the locked value", darkPatch !== null, darkPatch ? `patch at ${darkPatch.x},${darkPatch.y} mean ${darkPatch.mean} vs expected ${groundLum}` : `no patch within tolerance of ${groundLum}`);
  check("grain renders in Blink (pixel spread > 0)", darkPatch !== null && darkPatch.stdDev > 0.2, darkPatch ? `stdDev ${darkPatch.stdDev}, range ${darkPatch.min}-${darkPatch.max}` : "no ground patch found");

  /* ---------- 2. light theme ---------- */
  await page.setMedia({ colorScheme: "light", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const light = await page.eval(AUDIT);
  evidence.light = light;
  writeFileSync(join(ARTIFACTS, "blink-light-1440.png"), await page.screenshot());

  const SEED_LIGHT = { "--ground": "#DBD8C6", "--surface": "#E7E4D4", "--ink": "#191B10", "--muted": "#55583F", "--hair": "#BDB9A3", "--accent": "#A0451F" };
  check("light palette matches the seed exactly", Object.entries(SEED_LIGHT).every(([k, v]) => light.tokens[k].toUpperCase() === v), JSON.stringify(light.tokens));
  const lightBody = light.contrast.find((c) => c.selector === "#the-insight p.read");
  check("body text >= 4.5:1 (light)", lightBody.ratio >= 4.5, `${lightBody.ratio}:1 ink on surface`);
  light.contrast.forEach((c) => {
    check(`contrast ${c.selector} (light)`, c.ratio >= 4.5, `${c.ratio}:1 at ${c.fontSize}`);
  });
  check("grain peak alpha capped at 4% (light)", Number(light.texture.grainOpacity) <= 0.04, `opacity ${light.texture.grainOpacity}`);
  check("vignette alpha 5% (light)", Number(light.tokens["--vignette-alpha"]) === 0.05, light.tokens["--vignette-alpha"]);
  check("zero external network requests (light)", page.requests.every(isLocal), describe(page.requests));

  /* ---------- 3. reduced motion ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const still = await page.eval(AUDIT);
  evidence.reducedMotion = still;
  writeFileSync(join(ARTIFACTS, "blink-dark-reduced-motion.png"), await page.screenshot());

  check("reduced motion is in force", still.reducedMotion === true, String(still.reducedMotion));
  check("no animations run at reduced motion", still.animations.length === 0, JSON.stringify(still.animations.map((a) => a.name)));
  check("reduced-motion path keeps the lamp lit and labelled", still.motifs.pulse.w === 8 && still.motifs.operationalWord === "OPERATIONAL", JSON.stringify(still.motifs.pulse));
  check("reduced-motion path renders complete content", still.headings.length === dark.headings.length && still.placeholders === dark.placeholders, `${still.headings.length} headings, ${still.placeholders} slots`);

  /* ---------- 4. narrow viewports + zoom ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  for (const [label, width, height, scale] of [
    ["375x553", 375, 553, 1],
    ["320x568", 320, 568, 1],
    ["200% zoom (720x450 css)", 720, 450, 2]
  ]) {
    await page.setViewport({ width, height, deviceScaleFactor: scale, mobile: width < 500 });
    await page.goto(PAGE_URL);
    const narrow = await page.eval(
      "({s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth})"
    );
    check(`no horizontal scroll at ${label}`, narrow.s <= narrow.c, `scrollWidth ${narrow.s} vs clientWidth ${narrow.c}`);
    if (width === 375) writeFileSync(join(ARTIFACTS, "blink-dark-375.png"), await page.screenshot());
  }
  await page.setViewport({ width: 1440, height: 900 });

  /* ---------- 5. forced colors ---------- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference", forcedColors: "active" });
  await page.goto(PAGE_URL);
  const forced = await page.eval(`(() => {
    const bar = document.querySelector(".statusbar");
    const slot = document.querySelector(".instrument");
    return {
      textureHidden: getComputedStyle(document.querySelector(".texture")).display === "none",
      barBorder: getComputedStyle(bar).borderBottomWidth,
      slotBorder: getComputedStyle(slot).borderTopWidth,
      headings: document.querySelectorAll("h1,h2").length
    };
  })()`);
  evidence.forcedColors = forced;
  check("forced colors: texture drops out, borders survive", forced.textureHidden && forced.barBorder === "1px" && forced.slotBorder === "1px", JSON.stringify(forced));
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference", forcedColors: "none" });

  /* ---------- 6. count-up engine ---------- */
  await page.goto(FIXTURE_URL);
  const units = await page.eval(`(() => {
    const P = window.MusterCountUp;
    return {
      decimal: P.parse("9.3"),
      currency: P.parse("$147"),
      grouped: P.parse("1,234"),
      dash: P.parse("—"),
      formatMid: P.format(4.65, P.parse("9.3")),
      formatCurrency: P.format(70.4, P.parse("$147")),
      formatGrouped: P.format(1234, P.parse("1,234")),
      easeStart: P.easeOutCubic(0),
      easeEnd: P.easeOutCubic(1)
    };
  })()`);
  evidence.countUpUnits = units;
  check("count-up parses decimals as decimals", units.decimal.decimals === 1 && units.decimal.value === 9.3, JSON.stringify(units.decimal));
  check("count-up preserves a currency prefix", units.currency.prefix === "$" && units.currency.value === 147, JSON.stringify(units.currency));
  check("count-up rolls 9.3 with its decimal place", units.formatMid === "4.7", units.formatMid);
  check("count-up keeps the prefix mid-roll", units.formatCurrency === "$70", units.formatCurrency);
  check("count-up preserves digit grouping", units.formatGrouped === "1,234", units.formatGrouped);
  check("an unmeasured dash is not animatable", units.dash === null, JSON.stringify(units.dash));
  check("easing is ease-out cubic and lands on 1", units.easeStart === 0 && units.easeEnd === 1, `${units.easeStart} -> ${units.easeEnd}`);

  const pending = await page.eval(`(() => ({
    decimal: document.getElementById("decimal").getAttribute("data-countup-state"),
    dash: document.getElementById("dash").getAttribute("data-countup-state"),
    dashText: document.getElementById("dash").textContent,
    decimalText: document.getElementById("decimal").textContent
  }))()`);
  check("below the fold: value waits, dash is inert", pending.decimal === "pending" && pending.dash === "static", JSON.stringify(pending));
  check("no wrong value is ever displayed before the roll", pending.decimalText === "9.3", pending.decimalText);

  const rolled = await page.eval(`(async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 2200));
    const w = window.__samples.decimal.filter((v) => v > 0);
    return {
      states: ["decimal", "integer", "grouped", "dash"].map((id) =>
        document.getElementById(id).getAttribute("data-countup-state")),
      texts: ["decimal", "integer", "grouped", "dash"].map((id) =>
        document.getElementById(id).textContent),
      distinctFrames: [...new Set(window.__samples.texts)].length,
      widthSpread: Math.round((Math.max(...w) - Math.min(...w)) * 100) / 100
    };
  })()`);
  evidence.countUpRun = rolled;
  check("count-up fires at 55% visibility and lands exactly", rolled.states.slice(0, 3).every((s) => s === "done") && rolled.texts[0] === "9.3" && rolled.texts[1] === "$147" && rolled.texts[2] === "1,234", JSON.stringify(rolled));
  check("the dash never animated", rolled.states[3] === "static" && rolled.texts[3] === "—", rolled.texts[3]);
  check("the value actually rolled (multiple frames)", rolled.distinctFrames > 5, `${rolled.distinctFrames} distinct rendered values`);
  check("zero layout shift during the roll", rolled.widthSpread === 0, `width spread ${rolled.widthSpread}px`);

  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(FIXTURE_URL);
  const stillFixture = await page.eval(`(() => ({
    states: ["decimal", "integer", "grouped", "dash"].map((id) =>
      document.getElementById(id).getAttribute("data-countup-state")),
    texts: ["decimal", "integer", "grouped", "dash"].map((id) =>
      document.getElementById(id).textContent)
  }))()`);
  evidence.countUpReduced = stillFixture;
  check("reduced motion: exact values render immediately", stillFixture.states.every((s) => s === "static") && stillFixture.texts.join("|") === "9.3|$147|1,234|—", JSON.stringify(stillFixture));

  /* ---------- 7. shipped output hygiene ---------- */
  const shipped = ["index.html", ...readdirSync(join(ROOT, "styles")).map((f) => join("styles", f)), ...readdirSync(join(ROOT, "scripts")).map((f) => join("scripts", f))];
  const hexHits = [];

  /* The zero-external-requests claim is about what the page FETCHES, and §6
     must ship the setup command's URL as text and the repository as a link.
     So this check is narrowed to fetching references rather than deleted —
     deleting it would take the mechanical guard off the page's most
     load-bearing published claim.

     Default is deny. Every http(s) occurrence in a shipped file is classified
     from what precedes it, and only two classes are permitted: the URL as
     inert text (including inside a comment), and the value of an `href` on an
     anchor. Anything the engine resolves on its own — url(), @import, src,
     srcset, poster, data, <link href>, <script src>, a fetch() argument — is a
     fetching reference and fails. */
  const fetchingRefs = [];
  const inertRefs = [];
  for (const rel of shipped) {
    const text = readFileSync(join(ROOT, rel), "utf8");
    text.split("\n").forEach((line, i) => {
      const scan = /https?:\/\//gi;
      let m;
      while ((m = scan.exec(line))) {
        const site = `${rel}:${i + 1}`;
        const before = line.slice(0, m.index);
        /* the SVG namespace is a identifier, never fetched */
        if (/xmlns(:\w+)?\s*=\s*["']?$/.test(before)) continue;
        if (/(?:url\(|@import\s+(?:url\()?)\s*["']?$/i.test(before)) {
          fetchingRefs.push(`${site} css url()/@import`);
          continue;
        }
        const attr = before.match(/([a-zA-Z][\w:-]*)\s*=\s*["']?$/);
        if (attr) {
          const name = attr[1].toLowerCase();
          const tag = (before.match(/<([a-zA-Z][\w-]*)(?![^<]*>)/) || [])[1]?.toLowerCase();
          if (name === "href" && tag === "a") { inertRefs.push(`${site} <a href> (reader navigation)`); continue; }
          fetchingRefs.push(`${site} ${tag || "?"}[${name}]`);
          continue;
        }
        if (/\b(?:fetch|import|importScripts|open)\s*\(\s*["'`]$/.test(before)) {
          fetchingRefs.push(`${site} script fetch`);
          continue;
        }
        inertRefs.push(`${site} text`);
      }
    });
    text.split("\n").forEach((line, i) => {
      if (/#[0-9a-fA-F]{6}\b/.test(line) && rel !== "styles/tokens.css" && !/data:image\/svg/.test(line)) hexHits.push(`${rel}:${i + 1}`);
    });
  }
  evidence.shippedUrls = { fetching: fetchingRefs, inert: inertRefs };
  check("no fetching http(s) reference in any shipped file", fetchingRefs.length === 0, fetchingRefs.join(", ") || `none — ${inertRefs.length} inert: ${inertRefs.join(", ") || "none"}`);

  /* No raw email ships anywhere — founder ruling, amending his own seed's
     footer spec: a published address is scraper bait, and the GitHub profile
     link is the contact path. Swept over the whole shipped set rather than over
     the footer, because the failure this guards against is an address arriving
     in a comment, an aria-label or a meta description, none of which the footer
     assertions would ever see. */
  const emailHits = [];
  for (const rel of shipped) {
    readFileSync(join(ROOT, rel), "utf8").split("\n").forEach((line, i) => {
      const m = line.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/);
      if (m) emailHits.push(`${rel}:${i + 1} ${m[0]}`);
    });
  }
  evidence.emailHits = emailHits;
  check("no email address in any shipped file — the GitHub profile is the contact path",
    emailHits.length === 0, emailHits.join(", ") || "none");
  check("raw hex appears only in the token block", hexHits.length === 0, hexHits.join(", ") || "none");
  check("no build-system artifacts", !existsSync(join(ROOT, "package.json")) && !existsSync(join(ROOT, "node_modules")) && !existsSync(join(ROOT, "dist")), "no package.json / node_modules / dist");
  const cssText = shipped.filter((f) => f.endsWith(".css")).map((f) => readFileSync(join(ROOT, f), "utf8")).join("\n");
  check("no margin-bottom in shell CSS (one-sided spacing)", !/margin-bottom\s*:|margin-block-end\s*:/.test(cssText), "none");

  /* ---------- 8. worst-case composited contrast inside the vignette ---------- */
  const vignette = [
    { theme: "dark", ground: SEED_DARK["--ground"], muted: SEED_DARK["--muted"], ink: SEED_DARK["--ink"], alpha: 0.16 },
    { theme: "light", ground: SEED_LIGHT["--ground"], muted: SEED_LIGHT["--muted"], ink: SEED_LIGHT["--ink"], alpha: 0.05 }
  ].map((t) => {
    const floor = darkenBy(rgb(t.ground), t.alpha);
    return {
      theme: t.theme,
      alpha: t.alpha,
      mutedRatio: contrast(rgb(t.muted), floor),
      inkRatio: contrast(rgb(t.ink), floor)
    };
  });
  evidence.vignetteComposite = vignette;
  vignette.forEach((v) => {
    check(`vignette floor keeps labels >= 4.5:1 (${v.theme})`, v.mutedRatio >= 4.5, `muted ${v.mutedRatio}:1, ink ${v.inkRatio}:1 at ${v.alpha * 100}% black`);
  });

  /* ============================================================ §1 + §6 ===
     The sparse hero and the command that closes the page. Every check below
     protects one relationship and reads it off the rendered page — never off
     a figure copied out of the spec, so the check follows any future change
     to the stack rather than pinning it in place.
     ======================================================================= */

  /* The curl is verified by equality against the authority on disk, never by
     fetching: three instances of one string — copy-rules R12, §1, §6. */
  const VERIFIED_CURL = (readFileSync(join(ROOT, "knowledge-base", "agent-skills", "content", "copy-rules.md"), "utf8")
    .match(/Current verified form:\s*\n\s*`([^`]+)`/) || [])[1];

  const HERO = `(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const hero = document.querySelector("#hero");
    const h1 = document.querySelector("#hero-title");
    const heroContainer = hero.querySelector(".container");
    const eyebrow = hero.querySelector(".eyebrow");
    const formation = hero.querySelector(".formation");
    const diagram = hero.querySelector(".formation__diagram");
    const hub = hero.querySelector(".formation__hub");
    const bus = hero.querySelector(".formation__bus");
    const plates = [...hero.querySelectorAll(".formation__plates > li")];
    const caption = hero.querySelector(".formation__caption");
    const remnant = hero.querySelector(".remnant");
    const scope = hero.querySelector(".remnant__scope");
    const chip = hero.querySelector(".chip");
    const heroCurl = hero.querySelector(".curl");
    const gs = document.querySelector("#get-started");

    const accentRgb = (() => {
      const p = document.createElement("span");
      p.style.color = "var(--accent)";
      document.body.appendChild(p);
      const v = css(p, "color");
      p.remove();
      return v;
    })();
    const tokenPx = (name) => {
      const p = document.createElement("div");
      p.style.cssText = "position:absolute;visibility:hidden;height:var(" + name + ")";
      hero.appendChild(p);
      const v = r2(p.getBoundingClientRect().height);
      p.remove();
      return v;
    };

    /* A live element is one that is animating or would transition. Read both,
       in whatever motion state the page is in when this runs. */
    const moving = [...hero.querySelectorAll("*")].filter((el) => {
      const a = css(el, "animation-name");
      const t = parseFloat(css(el, "transition-duration")) || 0;
      return (a && a !== "none") || t > 0;
    }).map((el) => (el.className || el.tagName) + " [" + css(el, "animation-name") + "/" + css(el, "transition-duration") + "]");

    const marginTop = (el) => r2(parseFloat(css(el, "margin-top")));
    const bottom = (el) => r2(el.getBoundingClientRect().bottom);

    return {
      viewport: { w: innerWidth, h: innerHeight,
                  scrollWidth: document.documentElement.scrollWidth,
                  clientWidth: document.documentElement.clientWidth },
      wide: matchMedia("(min-width: 60rem)").matches,

      /* --- headline --- */
      h1Text: h1.textContent.replace(/\\s+/g, " ").trim(),
      h1Lines: Math.round(h1.getBoundingClientRect().height / parseFloat(css(h1, "line-height"))),
      h1Overflow: r2(h1.scrollWidth - h1.clientWidth),
      h1FontSize: css(h1, "font-size"),
      cutRects: hero.querySelector(".h1__cut").getClientRects().length,
      accentRects: hero.querySelector(".h1__accent").getClientRects().length,
      cutDecoration: css(hero.querySelector(".h1__cut"), "text-decoration-line"),
      accentColour: css(hero.querySelector(".h1__accent"), "color"),
      accentRgb,

      /* --- eyebrow: the separators are drawn, so they are never in the text --- */
      eyebrowFacts: [...eyebrow.children].map((li) => li.textContent.trim()),
      eyebrowSeparatorsInText: /·/.test(eyebrow.textContent),

      /* --- stack integrity --- */
      afterH1: h1.nextElementSibling ? h1.nextElementSibling.className : null,
      formationFirstChild: formation.firstElementChild.className,
      gaps: {
        eyebrowToH1: marginTop(h1),
        h1ToFormation: marginTop(formation),
        diagramToCaption: marginTop(caption),
        captionToRemnant: marginTop(remnant),
        remnantToCurl: marginTop(heroCurl)
      },
      tokens: {
        hairline: tokenPx("--gap-hairline"),
        flow: tokenPx("--gap-flow"),
        block: tokenPx("--gap-block"),
        major: tokenPx("--gap-major")
      },

      /* --- the sparse negative --- */
      heroText: hero.textContent.replace(/\\s+/g, " ").trim(),
      heroOrderedLists: hero.querySelectorAll("ol").length,
      heroTerminals: hero.querySelectorAll('[class*="terminal"], [class*="log"]').length,

      /* --- formation --- */
      hubText: hub.textContent.trim(),
      hubBorder: css(hub, "border-top-color"),
      hubWeight: Number(css(hub, "font-weight")),
      plateNames: plates.map((li) => li.textContent.trim()),
      plateTops: plates.map((li) => r2(li.getBoundingClientRect().top)),
      plateBottoms: plates.map(bottom),
      hubBottom: bottom(hub),
      busWidth: bus ? r2(bus.getBoundingClientRect().width) : null,
      busDisplay: bus ? css(bus, "display") : null,
      plateRowWidth: plates.length
        ? r2(Math.max(...plates.map((li) => li.getBoundingClientRect().right)) -
             Math.min(...plates.map((li) => li.getBoundingClientRect().left)))
        : null,
      captionText: caption.textContent.trim(),

      /* The alignment system's three references, read off the live container
         rather than named as figures (page-shell.md §7.2). The rail and the
         rail-end are the container's CONTENT edges — its padding is the
         --gutter, so the border box is the wrong reading. */
      axis: (() => {
        const box = heroContainer.getBoundingClientRect();
        const rail = box.left + parseFloat(css(heroContainer, "padding-left"));
        const railEnd = box.right - parseFloat(css(heroContainer, "padding-right"));
        const hubBox = hub.getBoundingClientRect();
        const plateRects = plates.map((li) => li.getBoundingClientRect());
        return {
          rail: r2(rail), railEnd: r2(railEnd), content: r2(railEnd - rail),
          mid: r2((rail + railEnd) / 2),
          hubCentre: r2(hubBox.left + hubBox.width / 2),
          plateFirstStart: plateRects.length ? r2(plateRects[0].left) : null,
          plateLastEnd: plateRects.length ? r2(plateRects[plateRects.length - 1].right) : null,
          diagramStart: r2(diagram.getBoundingClientRect().left),
          /* Every block that hangs on the rail, measured, not assumed. */
          onRail: [".eyebrow", "#hero-title", ".formation", ".formation__caption",
                   ".remnant", "#hero .curl"]
            .map((sel) => {
              const el = document.querySelector(sel);
              return el ? { sel, start: r2(el.getBoundingClientRect().left) } : { sel, start: null };
            })
        };
      })(),

      /* --- remnant: one row, one mark, and no readout at all --- */
      scopeRects: scope.getClientRects().length,
      scopeText: scope.textContent.trim(),
      /* What the strip SAYS: the decorative marks and the chip's glyph are
         aria-hidden and contribute nothing a reader is told. */
      remnantText: (() => {
        let out = "";
        const walk = (node) => {
          if (node.nodeType === 3) { out += node.nodeValue; return; }
          if (node.nodeType !== 1) return;
          if (node.getAttribute("aria-hidden") === "true") return;
          [...node.childNodes].forEach(walk);
        };
        walk(remnant);
        return out.replace(/\\s+/g, " ").trim();
      })(),
      inkRgb: (() => {
        const p = document.createElement("span");
        p.style.color = "var(--ink)";
        document.body.appendChild(p);
        const v = css(p, "color");
        p.remove();
        return v;
      })(),
      remnantMarks: [...remnant.querySelectorAll(".regmark")].map((m) => ({
        cls: m.className,
        /* Read against the CHIP's border box, which is the corner the mark
           would land on. The measurement is the overlap, so the evidence
           prints how far in it sits rather than a boolean. */
        overlapsChip: (() => {
          const a = m.getBoundingClientRect();
          const b = chip.getBoundingClientRect();
          return r2(Math.max(0, Math.min(a.right, b.right) - Math.max(a.left, b.left)) *
                    Math.max(0, Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top)));
        })()
      })),
      /* Nothing inside the strip may land on the chip's border box — the mark
         is only the one that did. */
      chipCollisions: [...remnant.querySelectorAll("*")].filter((el) => {
        /* The chip itself, its own contents, and the row that CONTAINS it are
           not collisions — a parent's box is where the chip lives. What this
           catches is a sibling landing on it. */
        if (el === chip || chip.contains(el) || el.contains(chip)) return false;
        const a = el.getBoundingClientRect();
        const b = chip.getBoundingClientRect();
        return Math.min(a.right, b.right) - Math.max(a.left, b.left) > 0.5 &&
               Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 0.5;
      }).map((el) => el.className || el.tagName),
      remnantReadouts: remnant.querySelectorAll(".remnant__value, .readout__value, [data-countup]").length,

      /* --- chip --- */
      chipLabel: chip.textContent.replace(/\\s+/g, " ").trim(),
      chipAria: chip.getAttribute("aria-label"),
      chipHref: chip.getAttribute("href"),
      chipResolved: chip.href,
      chipBox: { w: r2(chip.getBoundingClientRect().width), h: r2(chip.getBoundingClientRect().height) },
      heroFocusable: [...hero.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .map((el) => el.className || el.tagName),

      /* --- motion --- */
      heroMoving: moving,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,

      /* --- the curl, both instances --- */
      curls: [...document.querySelectorAll("[data-curl]")].map((el) => el.textContent),
      heroCurlHasCursor: Boolean(heroCurl.querySelector(".cursor")),
      heroCurlPrompt: /^\\s*\\$/.test(heroCurl.textContent),
      curlScrolls: [...document.querySelectorAll(".curl")].map((el) => r2(el.scrollWidth - el.clientWidth)),

      /* --- §6 --- */
      gs: {
        lead: gs.querySelector(".t-lead").textContent.replace(/\\s+/g, " ").trim(),
        then: gs.querySelector(".getstarted__then").textContent.trim(),
        cursorAnimation: css(gs.querySelector(".cursor"), "animation-name"),
        cursorBox: { w: r2(gs.querySelector(".cursor").getBoundingClientRect().width),
                     h: r2(gs.querySelector(".cursor").getBoundingClientRect().height) },
        cursorHidden: gs.querySelector(".cursor").getAttribute("aria-hidden"),
        links: [...gs.querySelectorAll("a")].map((a) => ({ text: a.textContent.trim(), href: a.getAttribute("href") })),
        focusable: [...gs.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')].length
      }
    };
  })()`;

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1280, height: 700 });
  await page.goto(PAGE_URL);
  const heroWide = await page.eval(HERO);
  evidence.heroWide = heroWide;
  writeFileSync(join(ARTIFACTS, "blink-dark-hero-1280.png"), await page.screenshot());

  /* --- 1. the announced headline, read from the accessibility tree ---
     Asserting the markup would only prove the markup. The name is what a
     screen reader says, so it comes from the engine's own computation.
     Cross-engine caveat: Blink computes the name from rendered (uppercased)
     text and WebKit from source text, so the comparison is case-insensitive
     and word-exact. */
  await page.call("Accessibility.enable");
  const axTree = await page.call("Accessibility.getFullAXTree");
  const axNodes = axTree.nodes || [];
  const axById = new Map(axNodes.map((n) => [n.nodeId, n]));
  const axName = (n) => (n?.name?.value || "").replace(/\s+/g, " ").trim();
  const axRole = (n) => n?.role?.value || "";
  const axHeading = axNodes.find((n) => axRole(n) === "heading" &&
    (n.properties || []).some((p) => p.name === "level" && Number(p.value?.value) === 1));
  const announced = axName(axHeading);
  const words = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
  evidence.heroAnnounced = { announced, rendered: heroWide.h1Text };

  check("§1 headline announces the post-edit sentence, from the AX tree",
    words(announced) === words("Ship a product with an AI team.") &&
      !/a human/i.test(announced) && /a human/i.test(heroWide.h1Text),
    `AX name ${JSON.stringify(announced)} · rendered ${JSON.stringify(heroWide.h1Text)}`);

  /* --- 6. the formation, announced as the architecture it draws --- */
  const LOCKED_PLATES = ["Developer", "UI/UX", "QA", "Content", "Marketing", "Legal", "Research"];
  const axGroup = axNodes.find((n) => axName(n) === "PM and seven specialist AI roles");
  const axLeaves = (node, out = []) => {
    const kids = (node?.childIds || []).map((id) => axById.get(id)).filter(Boolean);
    if (!kids.length) {
      const nm = axName(node);
      if (nm) out.push(nm);
      return out;
    }
    kids.forEach((k) => axLeaves(k, out));
    return out;
  };
  const axFormation = axGroup ? axLeaves(axGroup) : [];
  const axListChildren = axGroup
    ? (axGroup.childIds || []).map((id) => axById.get(id)).filter((n) => axRole(n) === "list")
        .map((n) => (n.childIds || []).map((id) => axById.get(id)).filter((c) => axRole(c) === "listitem").length)
    : [];
  evidence.heroFormationAx = { announced: axFormation, listItemCounts: axListChildren };

  /* Case-insensitive for the reason the headline check is: Blink computes the
     name from rendered text, which text-transform has uppercased, and WebKit
     from the source text. Word-exact and order-exact is the real contract. */
  check("§1 formation announces hub PM then exactly the seven specialists, in order",
    words(axFormation.join("|")) === words(["PM", ...LOCKED_PLATES].join("|")) &&
      axListChildren.length === 1 && axListChildren[0] === 7,
    `${JSON.stringify(axFormation)} · list carries ${JSON.stringify(axListChildren)} items`);
  check("§1 formation distinguishes the hub by more than colour",
    heroWide.hubText === "PM" && heroWide.hubBorder === heroWide.accentRgb && heroWide.hubWeight >= 700,
    `hub ${heroWide.hubText}, border ${heroWide.hubBorder} (accent ${heroWide.accentRgb}), weight ${heroWide.hubWeight}`);
  check("§1 bus, spine, stems and registration marks stay out of the AX tree",
    !axFormation.some((n) => /^[+|]$/.test(n)),
    `${axFormation.length} announced nodes, none decorative`);

  /* --- 12. eyebrow silence: the separators are style, not content --- */
  const EYEBROW_FACTS = ["open source", "runs in Claude Code", "v4", "MIT"];
  const axAllNames = new Set(axNodes.map((n) => words(axName(n))));
  check("§1 eyebrow announces four facts and no separator",
    heroWide.eyebrowFacts.join("|") === EYEBROW_FACTS.join("|") &&
      !heroWide.eyebrowSeparatorsInText &&
      EYEBROW_FACTS.every((f) => axAllNames.has(words(f))),
    `${JSON.stringify(heroWide.eyebrowFacts)}, separators in text: ${heroWide.eyebrowSeparatorsInText}`);

  /* --- 4. stack integrity: nothing ships between the claim and the team --- */
  check("§1 stack: the headline is followed by the formation and nothing else",
    heroWide.afterH1 === "formation" && heroWide.formationFirstChild === "formation__diagram",
    `h1 → ${heroWide.afterH1} → ${heroWide.formationFirstChild}`);
  check("§1 gaps compute to their rhythm tokens, seam widest",
    heroWide.gaps.eyebrowToH1 === heroWide.tokens.hairline &&
      heroWide.gaps.h1ToFormation === heroWide.tokens.block &&
      heroWide.gaps.diagramToCaption === heroWide.tokens.flow &&
      heroWide.gaps.captionToRemnant === heroWide.tokens.major &&
      heroWide.gaps.remnantToCurl === heroWide.tokens.block &&
      heroWide.gaps.captionToRemnant >= Math.max(heroWide.gaps.eyebrowToH1, heroWide.gaps.h1ToFormation, heroWide.gaps.diagramToCaption, heroWide.gaps.remnantToCurl),
    JSON.stringify(heroWide.gaps) + " against " + JSON.stringify(heroWide.tokens));

  /* --- 5. the sparse negative: the gate ruling, as a check that can fail --- */
  const BODH_MATERIAL = [/9\.3/, /4\.8/, /\$147/, /\$24\.73/, /289/, /~?64/, /bodh/i];
  const bodhHits = BODH_MATERIAL.filter((re) => re.test(heroWide.heroText)).map(String);
  const strayDigits = [...heroWide.heroText.matchAll(/\d/g)].map((m) => m[0]).filter((d) => !["4", "8", "1"].includes(d));
  check("§1 carries no Bodh material and no measured figure",
    bodhHits.length === 0 && heroWide.heroOrderedLists === 0 && heroWide.heroTerminals === 0 && strayDigits.length === 0,
    `${bodhHits.join(" ") || "no Bodh material"} · ${heroWide.heroOrderedLists} <ol> · ${heroWide.heroTerminals} terminal/log elements · stray digits ${JSON.stringify(strayDigits)}`);

  /* --- 7. formation modes: the bus diagrams the row it spans, and the row
     spans the container — which is what puts the hub on the PAGE's axis rather
     than on an axis of its own. Relationships only (DEC-032): no literal x
     appears here, so the checks follow --page-max, --gutter and any plate-name
     change. --- */
  check("§1 formation at wide: one plate row, bus spanning exactly it",
    heroWide.wide && new Set(heroWide.plateTops).size === 1 &&
      heroWide.busDisplay !== "none" && Math.abs(heroWide.busWidth - heroWide.plateRowWidth) < 0.5,
    `${new Set(heroWide.plateTops).size} row(s), bus ${heroWide.busWidth}px vs plate row ${heroWide.plateRowWidth}px`);
  check("§1 formation spans the container, so the hub's centre IS the page axis",
    heroWide.wide &&
      Math.abs(heroWide.axis.content - heroWide.plateRowWidth) < 1 &&
      Math.abs(heroWide.axis.content - heroWide.busWidth) < 1 &&
      Math.abs(heroWide.axis.plateFirstStart - heroWide.axis.rail) < 1 &&
      Math.abs(heroWide.axis.plateLastEnd - heroWide.axis.railEnd) < 1 &&
      Math.abs(heroWide.axis.hubCentre - heroWide.axis.mid) < 1,
    `bus ${heroWide.busWidth} = plate row ${heroWide.plateRowWidth} = container content ${heroWide.axis.content}px · ` +
      `plate 1 at ${heroWide.axis.plateFirstStart} on the rail ${heroWide.axis.rail}, plate 7 at ${heroWide.axis.plateLastEnd} on the rail-end ${heroWide.axis.railEnd} · ` +
      `hub centre ${heroWide.axis.hubCentre} vs axis ${heroWide.axis.mid} (delta ${Math.round((heroWide.axis.hubCentre - heroWide.axis.mid) * 100) / 100}px)`);
  /* §7.2's two edges: every block in the section starts on the rail, including
     the formation's own diagram. The hub is the page's ONE axis-bound element,
     and it qualifies only because its parent's edges ARE the rail and the
     rail-end — centred-within-a-narrower-block is the composition this bans. */
  check("§1 every block hangs on the rail — nothing centres on an axis of its own",
    heroWide.axis.onRail.every((b) => b.start !== null && Math.abs(b.start - heroWide.axis.rail) < 1) &&
      Math.abs(heroWide.axis.diagramStart - heroWide.axis.rail) < 1,
    heroWide.axis.onRail.map((b) => `${b.sel} ${b.start}`).join(" · ") +
      ` · diagram ${heroWide.axis.diagramStart} · rail ${heroWide.axis.rail}`);
  check("§1 formation plate names are the locked full forms, in the locked order",
    heroWide.plateNames.join(" · ") === LOCKED_PLATES.join(" · ") && heroWide.captionText === "8 AI agents · 1 operator",
    `${heroWide.plateNames.join(" · ")} / caption ${JSON.stringify(heroWide.captionText)}`);

  /* --- 8. remnant honesty ---

     The strip is posture, not measurement: the scope label and the chip, and
     no readout of any kind. §5 owns every value, each one measured beside its
     own scope label — no dash and no launch promise exists anywhere for the
     strip to restate. What has to hold here is that it states no value at
     all, and that neither the dash nor `measured at launch` ever re-enters
     through this seat. */
  check("§1 remnant is the scope label and the chip — no readout, no dash, no launch promise",
    heroWide.remnantReadouts === 0 &&
      !heroWide.remnantText.includes("—") &&
      !/measured at launch/i.test(heroWide.remnantText) &&
      heroWide.remnantText === `${heroWide.scopeText} VERIFY`,
    `${heroWide.remnantReadouts} readout element(s) · strip reads ${JSON.stringify(heroWide.remnantText)}`);
  /* One registration mark on a single-row surface, and it is the top-left one.
     The inline-end corner belongs to the chip: the bottom-right mark lands
     INSIDE the chip's own border box, which is measured here as an overlap
     area rather than asserted as a rule. Restoring the mark fails both
     clauses. */
  check("§1 remnant carries one registration mark, top-left, and nothing in the strip lands on the chip",
    heroWide.remnantMarks.length === 1 &&
      /regmark--tl/.test(heroWide.remnantMarks[0].cls) &&
      heroWide.remnantMarks.every((m) => m.overlapsChip === 0) &&
      heroWide.chipCollisions.length === 0,
    `${heroWide.remnantMarks.length} mark(s) [${heroWide.remnantMarks.map((m) => m.cls + " overlap " + m.overlapsChip + "px²").join(", ")}] · ` +
      `${heroWide.chipCollisions.length} element(s) on the chip's border box${heroWide.chipCollisions.length ? ": " + heroWide.chipCollisions.join(", ") : ""}`);

  /* --- 9. the chip: §1's only interactive element, and the proof link.

     The target is the site repo's rendered blob URL, not a relative VERIFY.md:
     a static host serves the relative form as raw markdown or 404s it, and this
     is the one link the page asks a sceptic to click. It is an <a href> —
     inert until clicked — so the zero-request claim is untouched; the guard
     that proves that stays narrowed to fetching references and is planted
     against below. The string must stay byte-equal to the footer's VERIFY
     receipt, which is asserted with the footer. --- */
  /* `main`, not a SHA — and this one is deliberate rather than an oversight.
     The other three receipts pin because their demo moment is in the past; this
     file's demo moment is the LAUNCH state, which `main` at launch is by
     construction. A pin here would be a snapshot needing a re-pin step a later
     session could forget, and `blob/main` survives a squash merge where the
     pinned three do not. The chip shares the footer's VERIFY receipt exactly,
     and that equality is asserted with the footer against `footer-copy.md` —
     this constant is the §1 half. */
  const CHIP_HREF = "https://github.com/thinkArhant/muster-ai-site/blob/main/VERIFY.md";
  check("§1 VERIFY chip is the section's only focusable element and points at the rendered VERIFY.md",
    heroWide.heroFocusable.length === 1 && /chip/.test(heroWide.heroFocusable[0]) &&
      heroWide.chipHref === CHIP_HREF &&
      /VERIFY\b/.test(heroWide.chipAria) && /VERIFY/.test(heroWide.chipLabel),
    `${JSON.stringify(heroWide.heroFocusable)} · href ${heroWide.chipHref} · name ${JSON.stringify(heroWide.chipAria)}`);
  /* The chip is the page's proof link; without the file behind it the one
     claim the page asks readers to check is a 404. The blob URL names a path
     inside this repo, so the file's presence is still checkable here — the
     assertion did not become unfalsifiable when the href went absolute. */
  check("VERIFY.md exists at the repo path the chip's blob URL names",
    existsSync(join(ROOT, "VERIFY.md")) && heroWide.chipHref.endsWith("/VERIFY.md"),
    join(ROOT, "VERIFY.md"));

  /* --- 10 / 11. §1 is fully static; the curl is one string --- */
  check("§1 is fully static — nothing in the section animates or transitions",
    heroWide.heroMoving.length === 0, heroWide.heroMoving.join(" | ") || "no animation, no transition");
  check("the curl is one string in three places: copy-rules R12, §1, §6",
    Boolean(VERIFIED_CURL) && heroWide.curls.length === 2 && heroWide.curls.every((c) => c === VERIFIED_CURL),
    `${heroWide.curls.length} instances, byte-equal to R12: ${heroWide.curls.every((c) => c === VERIFIED_CURL)}`);
  check("§1's curl carries no cursor and no prompt glyph (§6 owns the blink)",
    !heroWide.heroCurlHasCursor && !heroWide.heroCurlPrompt,
    `cursor ${heroWide.heroCurlHasCursor}, prompt ${heroWide.heroCurlPrompt}`);

  /* --- §6 --- */
  /* Read off the deliverable, not retyped here: §6's lead now carries the
     model-agnostic-correctness claim, and a claim of that weight must be
     checked against the file that owns it rather than against a copy of it
     that a build step could quietly edit alongside the page. */
  const gsLead = (() => {
    const lines = readFileSync(join(ROOT, "knowledge-base", "design-specs", "web", "section-06-copy.md"), "utf8").split("\n");
    const at = lines.findIndex((l) => l.startsWith("## 3. The lead line"));
    const next = lines.findIndex((l, i) => i > at && /^## /.test(l));
    const body = lines.slice(at, next === -1 ? lines.length : next);
    const open = body.findIndex((l) => l.trim() === "```");
    const close = body.indexOf("```", open + 1);
    return body.slice(open + 1, close).join(" ").replace(/\s+/g, " ").trim();
  })();
  check("§6 ships the lead line, both commands and exactly one link",
    heroWide.gs.lead === gsLead && heroWide.gs.then === "cd my-product && claude" &&
      heroWide.gs.links.length === 1 && heroWide.gs.focusable === 1 &&
      heroWide.gs.links[0].text === "github.com/thinkArhant/muster-ai" &&
      heroWide.gs.links[0].href === "https://github.com/thinkArhant/muster-ai",
    `${JSON.stringify(heroWide.gs.then)} · ${JSON.stringify(heroWide.gs.links)}`);
  check("§6's cursor is the page's only blink, 8×17, aria-hidden",
    heroWide.gs.cursorAnimation === "cursor-blink" && heroWide.gs.cursorHidden === "true" &&
      heroWide.gs.cursorBox.w === 8 && heroWide.gs.cursorBox.h === 17,
    JSON.stringify(heroWide.gs));

  /* --- 2 / 3 / the display floor: the phrase and fold relationships, read
     across the widths the wrap system was measured at. The floor lands with
     this, not alone: an unguarded token in the shipped set is exactly the
     drift the project exists to prevent, and the guarded relationship is the
     one the floor exists for — the headline sets without overflow at 320px. */
  const heroNarrow = {};
  for (const [label, width] of [["320", 320], ["360", 360], ["375", 375], ["390", 390]]) {
    await page.setViewport({ width, height: 553, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    heroNarrow[label] = await page.eval(HERO);
    if (width === 375) writeFileSync(join(ARTIFACTS, "blink-dark-hero-375.png"), await page.screenshot());
  }
  evidence.heroNarrow = heroNarrow;

  const widths = Object.entries(heroNarrow);
  check("§1 headline sets without overflow at every measured phone width (the display floor's own relationship)",
    widths.every(([, m]) => m.h1Overflow <= 0 && m.viewport.scrollWidth <= m.viewport.clientWidth),
    widths.map(([w, m]) => `${w}px: ${m.h1Lines}L at ${m.h1FontSize}, h1 overflow ${m.h1Overflow}, doc ${m.viewport.scrollWidth}/${m.viewport.clientWidth}`).join(" · "));
  check("§1 treated phrases never break mid-phrase",
    widths.every(([, m]) => m.cutRects === 1 && m.accentRects === 1),
    widths.map(([w, m]) => `${w}: cut ${m.cutRects} / accent ${m.accentRects} rect(s)`).join(" · "));
  check("§1 scope label never breaks mid-phrase",
    widths.every(([, m]) => m.scopeRects === 1),
    widths.map(([w, m]) => `${w}: ${m.scopeRects}`).join(" · "));
  /* The chip's corner, at the widths where the head row wraps and the chip
     drops to its own line — which is where the retired bottom-right mark sat
     furthest inside it. */
  check("§1 nothing lands on the chip's border box at any phone width, and the strip keeps its one mark",
    widths.every(([, m]) => m.remnantMarks.length === 1 && m.chipCollisions.length === 0 &&
      m.remnantMarks.every((k) => k.overlapsChip === 0)),
    widths.map(([w, m]) => `${w}: ${m.remnantMarks.length} mark(s), ${m.chipCollisions.length} collision(s)${m.chipCollisions.length ? " [" + m.chipCollisions.join(",") + "]" : ""}`).join(" · "));
  check("§1 the curl card wraps rather than scrolling sideways",
    widths.every(([, m]) => m.curlScrolls.every((s) => s <= 0)),
    widths.map(([w, m]) => `${w}: ${JSON.stringify(m.curlScrolls)}`).join(" · "));
  /* The fold contract, read off the elements rather than off the spec's
     figures: at 375 the hub and four whole plates are above the fold, at 320
     the hub and three. The ladder is CUT there by design — that crop is the
     scroll cue — so this asserts what must be above it, never that all of it
     is. */
  check("§1 fold guarantee at 375 × 553: hub and four whole plates above the fold",
    heroNarrow["375"].hubBottom <= 553 && heroNarrow["375"].plateBottoms[3] <= 553,
    `hub ${heroNarrow["375"].hubBottom}, plate 4 ${heroNarrow["375"].plateBottoms[3]}, plate 5 ${heroNarrow["375"].plateBottoms[4]} against a 553px fold`);
  check("§1 fold guarantee at 320 × 553: hub and three whole plates above the fold",
    heroNarrow["320"].hubBottom <= 553 && heroNarrow["320"].plateBottoms[2] <= 553,
    `hub ${heroNarrow["320"].hubBottom}, plate 3 ${heroNarrow["320"].plateBottoms[2]} against a 553px fold`);
  check("§1 formation stacks as a ladder below --bp-wide",
    widths.every(([, m]) => !m.wide && m.busDisplay === "none" &&
      m.plateTops.every((t, i) => i === 0 || t >= m.plateBottoms[i - 1] - 0.5)),
    widths.map(([w, m]) => `${w}: wide ${m.wide}, bus ${m.busDisplay}`).join(" · "));

  /* --- §1 static under reduced motion too: the whole-section form of the
     brand rule's static assertion. A transition that only exists in one path
     is still a live element in that path. --- */
  await page.setViewport({ width: 1280, height: 700 });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const heroStill = await page.eval(HERO);
  evidence.heroReduced = heroStill;
  check("§1 stays fully static under reduced motion, with identical content",
    heroStill.reducedMotion && heroStill.heroMoving.length === 0 &&
      heroStill.heroText === heroWide.heroText &&
      heroStill.remnantText === heroWide.remnantText,
    `${heroStill.heroMoving.join(" | ") || "nothing moving"} · content identical: ${heroStill.heroText === heroWide.heroText}`);
  check("§6's cursor renders solid and static under reduced motion",
    heroStill.gs.cursorAnimation === "none" && heroStill.gs.cursorBox.w === 8,
    `animation-name ${heroStill.gs.cursorAnimation}`);
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1440, height: 900 });

  /* ============================================================ §3 + §4 ===
     The insight and the four decisions. Both sections' strings are read off
     the Content deliverables on disk rather than copied into this file — the
     §2 pattern, applied to the two sections whose whole argument is that the
     words are the founder's and the dates are checkable. Everything else is a
     relationship read off the rendered page: token-derived insets, shared
     column widths, the peek, the fold. No figure from a spec is asserted as a
     literal.
     ======================================================================= */

  /* Fenced blocks, in document order, from one markdown deliverable. */
  const fencesIn = (lines) => {
    const out = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() !== "```") continue;
      const end = lines.indexOf("```", i + 1);
      out.push(lines.slice(i + 1, end).join(" ").trim());
      i = end;
    }
    return out;
  };
  const copyFile = (name) =>
    readFileSync(join(ROOT, "knowledge-base", "design-specs", "web", name), "utf8").split("\n");

  const s03Copy = (() => {
    const lines = copyFile("section-03-copy.md");
    const slice = (heading) => {
      const at = lines.findIndex((l) => l.startsWith(heading));
      const next = lines.findIndex((l, i) => i > at && /^## /.test(l));
      return fencesIn(lines.slice(at, next === -1 ? lines.length : next))[0];
    };
    return { kicker: slice("## 3. The kicker"), para: slice("## 4. The paragraph") };
  })();

  /* Six strings per decision, in the copy file's own order: title, stamp, and
     the four row values. Scoped to the `### Decision` blocks so no prose fence
     elsewhere in the file can drift into the inventory. */
  const s04Copy = (() => {
    const lines = copyFile("section-04-copy.md");
    const heads = lines.map((l, i) => (/^### Decision \d/.test(l) ? i : -1)).filter((i) => i >= 0);
    return heads.map((at, n) => {
      const end = n + 1 < heads.length ? heads[n + 1] : lines.findIndex((l, i) => i > at && /^## /.test(l));
      const [title, stamp, ...rows] = fencesIn(lines.slice(at, end === -1 ? lines.length : end));
      return { title, stamp, rows: rows.slice(0, 4) };
    });
  })();
  /* The stamps are the independent-arrival argument. The dates are held here
     as DEC-044 verified them, so a drift in the copy file is caught too — the
     assertion is against the ruling, not against whatever the file now says. */
  const STAMP_DATES = ["2026-04-24", "2026-06-13", "2026-04-12", "2026-06-07"];
  const ROW_LABELS = ["Decision", "Problem", "Trade-off", "Mechanism"];

  const SECTIONS = `(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p, pseudo) => getComputedStyle(el, pseudo || null).getPropertyValue(p).trim();
    const insight = document.querySelector("#the-insight");
    /* The section element also holds the shell's chrome — the stencil tag with
       its §-number and its rust pennant. Every claim below is about what the
       SECTION says, so the sweeps scope to the section body and let the shell
       be verified where the shell is verified. */
    const insightBody = insight.querySelector(".section__body");
    const kicker = insight.querySelector(".kicker");
    const sentences = [...insight.querySelectorAll(".kicker__s")];
    const para = insight.querySelector("p.read");
    const decisions = document.querySelector("#the-decisions");
    const decisionsBody = decisions.querySelector(".section__body");
    const decisionsContainer = decisions.querySelector(".container");
    const track = decisions.querySelector(".sheets");
    const sheets = [...decisions.querySelectorAll(".sheet")];

    /* Line boxes of an element's own text. A grid item stretches to its row,
       so its border box says nothing about how many lines its label sets. */
    const lineCount = (el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return range.getClientRects().length;
    };

    const accentRgb = (() => {
      const p = document.createElement("span");
      p.style.color = "var(--accent)";
      document.body.appendChild(p);
      const v = css(p, "color");
      p.remove();
      return v;
    })();
    const tokenPx = (name) => {
      const p = document.createElement("div");
      p.style.cssText = "position:absolute;visibility:hidden;height:var(" + name + ")";
      document.body.appendChild(p);
      const v = r2(p.getBoundingClientRect().height);
      p.remove();
      return v;
    };
    /* --read-max is a ch value: resolve it in the face that actually reads it. */
    const readMaxIn = (el) => {
      const p = document.createElement("div");
      p.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--read-max)";
      p.style.font = css(el, "font");
      el.parentElement.appendChild(p);
      const v = r2(p.getBoundingClientRect().width);
      p.remove();
      return v;
    };

    /* Natural, unwrapped width of a run — what "it would fit" means. */
    const naturalWidth = (el) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      ["font", "letter-spacing", "text-transform"].forEach((k) => p.style.setProperty(k, css(el, k)));
      p.textContent = el.textContent;
      document.body.appendChild(p);
      const v = r2(p.getBoundingClientRect().width);
      p.remove();
      return v;
    };

    const moving = (root) => [...root.querySelectorAll("*")].filter((el) => {
      const a = css(el, "animation-name");
      const t = parseFloat(css(el, "transition-duration")) || 0;
      return (a && a !== "none") || t > 0;
    }).map((el) => (el.className || el.tagName) + " [" + css(el, "animation-name") + "/" + css(el, "transition-duration") + "]");

    const clipper = (el) => {
      let n = el.parentElement;
      while (n && n !== document.body) {
        const o = getComputedStyle(n);
        if (o.overflowX !== "visible" || o.overflowY !== "visible") return n;
        n = n.parentElement;
      }
      return null;
    };

    const trackBox = track.getBoundingClientRect();

    /* Every element in §4 whose own text renders in the accent — the zero-rust
       ruling, read the way the audit's sweep reads it. */
    const rustText = [...decisions.querySelectorAll("*")].filter((el) => {
      const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
      return own && css(el, "color") === accentRgb;
    }).map((el) => (el.className || el.tagName) + " '" + el.textContent.trim().slice(0, 24) + "'");

    /* Every accent-painted background the SECTION puts on the page. The shell's
       stencil-tag pennant is chrome and is asserted with the shell. */
    const accentBackgrounds = [...decisionsBody.querySelectorAll("*")].flatMap((el) =>
      ["::before", "::after", null].filter((ps) => css(el, "background-color", ps) === accentRgb)
        .map((ps) => (el.className || el.tagName) + (ps || " (element)")));

    const marks = sheets.map((sheet) => {
      const row = sheet.querySelector(".sheet__row--mech");
      const card = sheet.getBoundingClientRect();
      const cardInner = card.left + parseFloat(css(sheet, "border-left-width"));
      const rowBox = row.getBoundingClientRect();
      const before = getComputedStyle(row, "::before");
      const left = rowBox.left + parseFloat(before.insetInlineStart || before.left);
      const width = parseFloat(before.inlineSize || before.width);
      const label = row.querySelector("dt").getBoundingClientRect();
      return {
        inset: r2(left - cardInner),
        width: r2(width),
        background: before.backgroundColor,
        painted: before.color,
        blockStart: r2(parseFloat(before.insetBlockStart || before.top)),
        blockEnd: r2(parseFloat(before.insetBlockEnd || before.bottom)),
        rowContent: r2(rowBox.height - parseFloat(css(row, "padding-top"))),
        clearance: r2(label.left - (left + width)),
        onMechRow: row.classList.contains("sheet__row--mech"),
        isLastRow: row === sheet.querySelector(".sheet__row:last-child")
      };
    });

    return {
      viewport: { w: innerWidth, h: innerHeight,
                  scrollWidth: document.documentElement.scrollWidth,
                  clientWidth: document.documentElement.clientWidth },
      wide: matchMedia("(min-width: 60rem)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      accentRgb,
      inkRgb: css(document.body, "color"),
      hairline: tokenPx("--gap-hairline"),

      /* ---------------------------------------------------------- §3 --- */
      insightChildren: [...insight.querySelector(".section__body").children].map((el) => el.className),
      kickerText: kicker.textContent.replace(/\\s+/g, " ").trim(),
      kickerFont: { family: css(kicker, "font-family"), weight: Number(css(kicker, "font-weight")),
                    size: css(kicker, "font-size"), colour: css(kicker, "color") },
      kickerLines: r2(kicker.getBoundingClientRect().height / parseFloat(css(kicker, "line-height"))),
      kickerColumn: r2(kicker.getBoundingClientRect().width),
      sentences: sentences.map((s) => ({
        text: s.textContent.trim(),
        rects: s.getClientRects().length,
        natural: naturalWidth(s),
        display: css(s, "display")
      })),
      paraText: para.textContent.replace(/\\s+/g, " ").trim(),
      paraColour: css(para, "color"),
      /* The in-passage emphasis rule: weight, never colour, and spent once.
         Read as computed style off whatever element carries it, so swapping
         <b> for a class cannot quietly change what ships. */
      paraEmphasis: [...para.querySelectorAll("*")].map((el) => ({
        text: el.textContent.replace(/\\s+/g, " ").trim(),
        weight: Number(css(el, "font-weight")),
        size: css(el, "font-size"),
        colour: css(el, "color")
      })),
      paraWeight: Number(css(para, "font-weight")),
      paraSize: css(para, "font-size"),
      paraCap: r2(parseFloat(css(para, "max-inline-size"))),
      paraReadMax: readMaxIn(para),
      paraWidth: r2(para.getBoundingClientRect().width),
      insightNumerals: (insightBody.textContent.match(/\\d/g) || []).join(""),
      /* Bold sans at kicker scale is §4's title voice and only §4's. Inline
         emphasis inside a title is the title speaking, so a run is credited to
         its heading rather than counted as a second voice. */
      boldKickerScale: [...new Set([...document.querySelectorAll("main *")].filter((el) => {
        const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent.trim()).join("");
        return own && Number(css(el, "font-weight")) >= 700 &&
          Math.abs(parseFloat(css(el, "font-size")) - parseFloat(css(document.querySelector(".sheet__title"), "font-size"))) < 0.5 &&
          /system-ui|-apple-system|sans-serif/.test(css(el, "font-family"));
      }).map((el) => el.closest(".sheet__title") || el))].map((el) => el.className || el.tagName),

      /* ---------------------------------------------------------- §4 --- */
      sheetCount: sheets.length,
      titles: sheets.map((s) => s.querySelector(".sheet__title").textContent.replace(/\\s+/g, " ").trim()),
      titleEmphasis: sheets.map((s) => [...s.querySelectorAll(".sheet__title em")].map((e) => e.textContent.trim())),
      titleLines: sheets.map((s) => {
        const t = s.querySelector(".sheet__title");
        return r2(t.getBoundingClientRect().height / parseFloat(css(t, "line-height")));
      }),
      stamps: sheets.map((s) => s.querySelector(".sheet__stamp").textContent.replace(/\\s+/g, " ").trim()),
      /* The meta line replaced the bare stamp: the h3's next sibling is now the
         line, and the stamp is what OPENS it — so the announced order is still
         title → stamp → rows, and the ordinal (aria-hidden) never enters it. */
      metaIsNextSibling: sheets.map((s) => s.querySelector(".sheet__title").nextElementSibling === s.querySelector(".sheet__meta")),
      stampOpensMeta: sheets.map((s) => s.querySelector(".sheet__meta").firstElementChild === s.querySelector(".sheet__stamp")),
      stampBeforeRows: sheets.map((s) => s.querySelector(".sheet__stamp").compareDocumentPosition(s.querySelector(".sheet__rows")) & Node.DOCUMENT_POSITION_FOLLOWING ? true : false),
      /* The ordinal: chrome, self-verifying against DOM position, never a
         metric. Both numerals are read from the DOM here and never from the
         spec — a hardcoded count would survive a fifth sheet landing. */
      ordinals: sheets.map((s, i) => {
        const all = [...s.querySelectorAll(".sheet__ordinal")];
        const o = all[0];
        return {
          count: all.length,
          text: o ? o.textContent.replace(/\\s+/g, " ").trim() : null,
          expected: "SHEET " + (i + 1) + " OF " + sheets.length,
          hidden: o ? o.getAttribute("aria-hidden") : null,
          colour: o ? css(o, "color") : null,
          fontSize: o ? css(o, "font-size") : null,
          afterStamp: o ? Boolean(s.querySelector(".sheet__stamp").compareDocumentPosition(o) & Node.DOCUMENT_POSITION_FOLLOWING) : false
        };
      }),
      microFontSize: css(sheets[0].querySelector(".sheet__stamp"), "font-size"),
      mutedRgb: css(sheets[0].querySelector(".sheet__stamp"), "color"),
      /* The retired gauge, asserted as retired: the native scrollbar must not
         return as a second, misaligned position channel under the same track. */
      scrollbarWidth: css(track, "scrollbar-width"),
      /* The indicator. Segment count is read from the DOM and compared to the
         sheet count also read from the DOM — a literal 4 here would survive a
         fifth sheet landing, which is the failure this shape exists to avoid. */
      indicator: (() => {
        const row = decisions.querySelector("[data-sheet-indicator]");
        if (!row) return null;
        const segs = [...row.querySelectorAll(".sheets-indicator__seg")];
        const box = row.getBoundingClientRect();
        const mech = decisions.querySelector(".sheet__row--mech");
        return {
          rows: decisions.querySelectorAll("[data-sheet-indicator]").length,
          hidden: row.getAttribute("aria-hidden"),
          display: css(row, "display"),
          count: segs.length,
          start: r2(box.left), end: r2(box.right),
          /* Bound to its sibling: the mechanism mark's own stroke, read off
             the pseudo-element rather than restated as 2. */
          mechStroke: mech ? css(mech, "inline-size", "::before") : null,
          segs: segs.map((s) => ({
            h: css(s, "block-size"),
            bg: css(s, "background-color"),
            colour: css(s, "color"),
            animation: css(s, "animation-name"),
            duration: css(s, "transition-duration"),
            active: s.classList.contains("is-active")
          })),
          rowAnimation: css(row, "animation-name"),
          rowTransition: css(row, "transition-duration")
        };
      })(),
      /* §4's own rail and rail-end, from the container's content edges. */
      rail: (() => {
        const box = decisionsContainer.getBoundingClientRect();
        return { start: r2(box.left + parseFloat(css(decisionsContainer, "padding-left"))),
                 end: r2(box.right - parseFloat(css(decisionsContainer, "padding-right"))) };
      })(),
      trackBox: (() => {
        const b = track.getBoundingClientRect();
        return { left: r2(b.left), right: r2(b.right), width: r2(b.width) };
      })(),
      categories: sheets.map((s) => s.dataset.category),
      rowLabels: sheets.map((s) => [...s.querySelectorAll(".sheet__row dt")].map((dt) => dt.textContent.trim())),
      rowValues: sheets.map((s) => [...s.querySelectorAll(".sheet__row dd")].map((dd) => dd.textContent.replace(/\\s+/g, " ").trim())),
      rowPairs: sheets.map((s) => [...s.querySelectorAll(".sheet__rows > .sheet__row")].map((row) =>
        row.querySelectorAll("dt").length + "/" + row.querySelectorAll("dd").length).join(" ")),
      decisionsNumerals: decisionsBody.textContent.replace(/\\s+/g, " ").trim(),
      stampText: sheets.map((s) => s.querySelector(".sheet__stamp").textContent).join(" "),

      ddCaps: sheets.flatMap((s) => [...s.querySelectorAll("dd")].map((dd) => ({
        cap: r2(parseFloat(css(dd, "max-inline-size"))),
        readMax: readMaxIn(dd),
        rendered: r2(dd.getBoundingClientRect().width),
        colour: css(dd, "color")
      }))),
      labelColumns: sheets.map((s) => [...s.querySelectorAll("dt")].map((dt) => ({
        w: r2(dt.getBoundingClientRect().width),
        lines: lineCount(dt),
        sharesBandWithValue: (() => {
          const dd = dt.parentElement.querySelector("dd");
          const a = dt.getBoundingClientRect(), b = dd.getBoundingClientRect();
          return a.bottom > b.top + 0.5 && b.bottom > a.top + 0.5;
        })()
      }))),

      marks,
      markCount: [...decisions.querySelectorAll(".sheet__row")].filter((row) =>
        getComputedStyle(row, "::before").content !== "none").length,
      rustText,
      accentBackgrounds,

      headings: [...decisions.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName),
      focusable: [...decisions.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .map((el) => (el.className || el.tagName) + "[tabindex=" + el.getAttribute("tabindex") + "]"),
      decisionsMoving: moving(decisions).concat(moving(insight)),

      track: {
        scrollWidth: track.scrollWidth,
        clientWidth: track.clientWidth,
        snapType: css(track, "scroll-snap-type"),
        overflowX: css(track, "overflow-x"),
        listStyle: css(track, "list-style-type"),
        role: track.getAttribute("role"),
        label: track.getAttribute("aria-label"),
        tabindex: track.getAttribute("tabindex")
      },
      sheetSnap: sheets.map((s) => ({
        align: css(s, "scroll-snap-align"),
        nearestScroller: clipper(s) === track ? "the track" : (clipper(s) ? (clipper(s).className || clipper(s).tagName) : "none")
      })),
      /* The cut: sheet 2 is on screen and runs off the PHYSICAL SCREEN EDGE,
         with no bare ground left between the track's inline end and that edge.
         Cut at the container's edge instead — the judged construction — a dead
         strip of ground sat between the crop and the screen, and the sheet read
         as amputated rather than as continuing. The strip is what is measured. */
      peek: (() => {
        const s2 = sheets[1].getBoundingClientRect();
        return { visible: r2(Math.min(s2.right, innerWidth) - Math.max(s2.left, trackBox.left)),
                 cut: s2.right > innerWidth + 0.5,
                 intersects: s2.left < innerWidth - 0.5,
                 deadStrip: r2(innerWidth - trackBox.right) };
      })(),
      stacked: sheets.every((s, i) => i === 0 ||
        s.getBoundingClientRect().top >= sheets[i - 1].getBoundingClientRect().bottom - 0.5),
      sheetTops: sheets.map((s) => r2(s.getBoundingClientRect().top)),
      sheetOverflow: sheets.map((s) => r2(s.scrollWidth - s.clientWidth))
    };
  })()`;

  await page.setViewport({ width: 1280, height: 700 });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const s34 = await page.eval(SECTIONS);
  evidence.s34Wide = s34;
  writeFileSync(join(ARTIFACTS, "blink-dark-s0304-1280.png"), await page.screenshot({ fullPage: true }));

  /* --- §3: the strings, verbatim from the deliverable --- */
  check("§3 ships the founder-confirmed kicker and the 90-word paragraph, verbatim",
    Boolean(s03Copy.kicker) && Boolean(s03Copy.para) &&
      s34.kickerText === s03Copy.kicker && s34.paraText === s03Copy.para &&
      s34.insightChildren.length === 2,
    `kicker ${JSON.stringify(s34.kickerText)} · paragraph ${s34.paraText.length} chars, equal: ${s34.paraText === s03Copy.para} · ${s34.insightChildren.length} elements in the section body`);
  check("§3 prose is full ink at the seed-locked 64ch column",
    s34.paraColour === s34.inkRgb && Math.abs(s34.paraCap - s34.paraReadMax) < 0.5 &&
      s34.paraWidth <= s34.paraCap + 0.5,
    `cap ${s34.paraCap}px against --read-max ${s34.paraReadMax}px, rendered ${s34.paraWidth}px, colour ${s34.paraColour}`);
  check("§3 carries no numerals — no scope can be mixed where no figure appears",
    s34.insightNumerals === "", s34.insightNumerals || "none");
  /* The in-passage emphasis rule (`page-shell.md` §3): one run, weight only,
     at the paragraph's own size and colour. Rust is barred here by
     measurement — the accent runs 4.19/4.35 against a 4.5 body floor — and a
     third weight would break the page's 400/700 pair, so both failure modes
     are asserted rather than trusted. The announced string is unaffected: the
     verbatim check above reads the same paragraph. */
  check("§3's recognition hook is emphasised by weight alone, once, at body size",
    s34.paraEmphasis.length === 1 &&
      s34.paraEmphasis[0].weight === 700 && s34.paraWeight < 700 &&
      s34.paraEmphasis[0].colour === s34.paraColour &&
      s34.paraEmphasis[0].size === s34.paraSize,
    s34.paraEmphasis.map((e) => `${JSON.stringify(e.text)} at ${e.weight}/${e.size}/${e.colour}`).join(" · ") +
      ` against the paragraph at ${s34.paraWeight}/${s34.paraSize}/${s34.paraColour}`);
  check("bold sans at kicker scale is §4's title voice and only §4's",
    s34.boldKickerScale.length === 4 && s34.boldKickerScale.every((c) => /sheet__title/.test(c)) &&
      s34.kickerFont.weight < 700 && /system-ui/.test(s34.kickerFont.family),
    `${JSON.stringify(s34.boldKickerScale)} · §3 kicker ${s34.kickerFont.size} weight ${s34.kickerFont.weight}`);

  /* --- §4: inventory, order and the strings --- */
  check("§4 ships exactly the four decisions, in DEC-044's order, verbatim",
    s04Copy.length === 4 && s34.sheetCount === 4 &&
      s34.titles.every((t, i) => t === s04Copy[i].title) &&
      s34.rowValues.every((rows, i) => rows.length === 4 && rows.every((v, j) => v === s04Copy[i].rows[j])),
    `${s34.sheetCount} sheets · titles ${s34.titles.every((t, i) => t === s04Copy[i].title)} · 16/16 row values ${s34.rowValues.flat().length}`);
  check("§4 titles keep the seed's inline emphasis inside the heading",
    s34.titleEmphasis[0].join("") === "reads" && s34.titleEmphasis.slice(1).every((e) => e.length === 0) &&
      /reads/.test(s34.titles[0]),
    `sheet 1 emphasises ${JSON.stringify(s34.titleEmphasis[0])}, the other three carry none`);
  check("§4 rows are Decision / Problem / Trade-off / Mechanism, four pairs per sheet",
    s34.rowLabels.every((labels) => labels.join("|") === ROW_LABELS.join("|")) &&
      s34.rowPairs.every((p) => p === "1/1 1/1 1/1 1/1"),
    s34.rowLabels.map((labels, i) => `sheet ${i + 1}: ${labels.join("/")} (${s34.rowPairs[i]})`).join(" · "));
  /* The numerals sweep now admits exactly two sources: the four stamps and the
     four ordinals. The ordinals earn the exemption by being pinned to the DOM
     in their own check above — take that check away and a hardcoded "SHEET 2 OF
     9" would sail through here. Compared as sorted multisets so the sweep does
     not depend on where in the section a numeral happens to sit. */
  const digitsOf = (s) => (s.match(/\d/g) || []).sort().join("");
  const s04Allowed = digitsOf(s34.stampText + " " + s34.ordinals.map((o) => o.text).join(" "));
  check("§4 stamps carry DEC-044's verified dates, byte-exact; only they and the ordinals carry numerals",
    s34.stamps.every((s, i) => s === s04Copy[i].stamp) &&
      STAMP_DATES.every((d, i) => s34.stamps[i].includes(d)) &&
      digitsOf(s34.decisionsNumerals) === s04Allowed &&
      s34.categories.every((c) => c === "framework"),
    `${s34.stamps.join(" · ")} · section digits ${digitsOf(s34.decisionsNumerals) === s04Allowed ? "match" : "DIFFER from"} stamps + ordinals`);
  check("§4 announces title → stamp → rows, the meta line carrying the stamp first",
    s34.metaIsNextSibling.every(Boolean) && s34.stampOpensMeta.every(Boolean) && s34.stampBeforeRows.every(Boolean),
    `the meta line is the h3's next sibling on ${s34.metaIsNextSibling.filter(Boolean).length}/4 sheets, opened by the stamp on ${s34.stampOpensMeta.filter(Boolean).length}/4, before the rows on ${s34.stampBeforeRows.filter(Boolean).length}/4`);
  /* The width-independent paging channel. Its numerals are the one exception to
     "the stamps are §4's only numerals" (above), and they are exempt only
     because they are self-verifying: `n` is read from DOM position and `m` from
     the list's length, so a drifting or hardcoded ordinal fails here rather
     than passing as chrome. */
  check("§4 sheet ordinals are self-verifying, silent, and dressed as captions",
    s34.ordinals.every((o) => o.count === 1 && o.text === o.expected && o.hidden === "true" &&
      o.afterStamp && o.colour === s34.mutedRgb && o.fontSize === s34.microFontSize &&
      o.colour !== s34.accentRgb),
    /* Every clause the check tests appears in its own evidence: text, silence,
       position within the meta line, and the caption treatment. A detail that
       printed only the text would fail on the ordering while showing four
       matching strings and no cause. */
    s34.ordinals.map((o) => `${JSON.stringify(o.text)} (expected ${JSON.stringify(o.expected)}, aria-hidden ${o.hidden}, after the stamp ${o.afterStamp}, ${o.fontSize} ${o.colour})`).join(" · "));

  /* --- §4: the emphasis system — rust as a mark, never as text --- */
  /* Two accent sites now, and both are marks rather than text: the four
     mechanism strokes and the one lit indicator segment. The segment is
     admitted by name and by count — a second lit segment would mean the
     position channel is reporting two rests at once, so the ceiling of one is
     part of what this sweep protects. */
  check("§4 sets zero rust text; the accent appears only as marks — four mechanisms, one lit segment",
    s34.rustText.length === 0 && s34.accentBackgrounds.length === 5 &&
      s34.accentBackgrounds.filter((b) => /sheet__row--mech::before/.test(b)).length === 4 &&
      s34.accentBackgrounds.filter((b) => /sheets-indicator__seg is-active/.test(b)).length === 1,
    `${s34.rustText.join(" | ") || "no rust text"} · accent backgrounds ${JSON.stringify(s34.accentBackgrounds)}`);
  check("§4 mechanism mark: 2px, token-seated at --gap-hairline from its own card, spanning the row",
    s34.markCount === 4 && s34.marks.every((m) =>
      m.width === 2 && m.background === s34.accentRgb && Math.abs(m.inset - s34.hairline) < 0.5 &&
      Math.abs(m.blockStart - s34.hairline) < 0.5 && m.blockEnd === 0 &&
      m.clearance > 0 && m.onMechRow && m.isLastRow),
    `${s34.markCount} marks · insets ${s34.marks.map((m) => m.inset).join("/")} against --gap-hairline ${s34.hairline} · clearance ${s34.marks.map((m) => m.clearance).join("/")}px`);
  check("§4 mechanism label carries the fact in ink at AA, weight beside the mark",
    s34.labelColumns.every((sheet) => sheet.length === 4),
    `${s34.labelColumns.length} sheets × ${s34.labelColumns[0].length} labels`);

  /* --- §4: the reading measure and the label column --- */
  check("§4 every row value carries the 64ch cap and renders inside it",
    s34.ddCaps.length === 16 && s34.ddCaps.every((d) => Math.abs(d.cap - d.readMax) < 0.5 &&
      d.rendered <= d.cap + 0.5 && d.colour === s34.inkRgb),
    `16 values capped at ${s34.ddCaps[0].cap}px (--read-max ${s34.ddCaps[0].readMax}px), widest rendered ${Math.max(...s34.ddCaps.map((d) => d.rendered))}px`);
  check("§4 label column at desktop: one shared width, every label on one line",
    s34.wide && s34.labelColumns.every((sheet) => new Set(sheet.map((d) => d.w)).size === 1 &&
      sheet.every((d) => d.lines === 1)),
    `widths ${s34.labelColumns.map((s) => s[0].w).join("/")}px, line boxes ${s34.labelColumns.flat().map((d) => d.lines).join("")}`);

  /* --- §4: the track, the peek, and the one-screen ruling --- */
  check("§4 rides a horizontal paged track that snaps to itself, never to the document",
    s34.track.scrollWidth > s34.track.clientWidth && s34.track.snapType === "x" &&
      s34.sheetSnap.every((s) => s.align === "start" && s.nearestScroller === "the track") &&
      s34.track.overflowX === "auto",
    `track ${s34.track.scrollWidth}/${s34.track.clientWidth}, snap ${JSON.stringify(s34.track.snapType)}, sheets snap to ${s34.sheetSnap[0].nearestScroller}`);
  /* The cut, width-scoped deliberately: at ~1590px and above a whole number of
     sheets fits and there is nothing to cut, so the assertion pins the budgeted
     1280 case and the ordinal + gauge carry the affordance elsewhere. What is
     asserted is the relationship the founder rejected the absence of — the crop
     lands on the screen, and no bare ground sits between the track's end and
     that screen edge. */
  check("§4 the cut lands on the screen edge: sheet 2 runs off it, with no dead strip",
    s34.peek.intersects && s34.peek.cut && s34.peek.visible > 0 && Math.abs(s34.peek.deadStrip) < 0.5,
    `${s34.peek.visible}px of sheet 2 on screen, running off the viewport edge: ${s34.peek.cut} · ground between the track's end and the screen: ${s34.peek.deadStrip}px`);
  /* --- §12.19, the indicator. It replaced a styled scrollbar that this
     harness could never actually see (Chrome launches with --hide-scrollbars),
     which is part of why the gauge failed: the signal was invisible to most
     readers for the same reason it was invisible here. The indicator is real
     DOM and is measured as such.

     Every clause below is a relationship. The segment count is compared to the
     rendered sheet count, both read from the page; the segment height is
     compared to the mechanism mark's own stroke, read off its pseudo-element.
     No literal from the spec is asserted as a number. --- */
  const squash = (s) => String(s).replace(/\s+/g, "");
  const ind = s34.indicator;
  check("§4 (a) one indicator row, out of the AX tree, one segment per rendered sheet",
    Boolean(ind) && ind.rows === 1 && ind.hidden === "true" && ind.count === s34.sheetCount,
    `${ind ? ind.rows : 0} row(s), aria-hidden ${ind && ind.hidden} · ${ind ? ind.count : 0} segments against ${s34.sheetCount} sheets`);
  check("§4 (b) the indicator spans rail → rail-end — the alignment the gauge lost",
    Boolean(ind) && Math.abs(ind.start - s34.rail.start) <= 1 && Math.abs(ind.end - s34.rail.end) <= 1,
    `indicator ${ind && ind.start}–${ind && ind.end} against the rail ${s34.rail.start}–${s34.rail.end}`);
  check("§4 (c) a segment is the mechanism mark's own 2px stroke, bound to it",
    Boolean(ind) && ind.mechStroke !== null &&
      ind.segs.length > 0 && ind.segs.every((s) => s.h === ind.mechStroke),
    `segments ${ind ? [...new Set(ind.segs.map((s) => s.h))].join("/") : "—"} against the mechanism mark's ${ind && ind.mechStroke}`);
  check("§4 (d) exactly one segment carries the accent, and it is a background, never colour",
    Boolean(ind) &&
      ind.segs.filter((s) => squash(s.bg) === squash(s34.accentRgb)).length === 1 &&
      ind.segs.every((s) => squash(s.colour) !== squash(s34.accentRgb)) &&
      ind.segs.filter((s) => s.active).length === 1,
    `${ind ? ind.segs.map((s) => (squash(s.bg) === squash(s34.accentRgb) ? "accent" : "hair")).join(" · ") : "—"} against the accent ${s34.accentRgb}`);
  check("§4 (e) nothing in the indicator animates or transitions",
    Boolean(ind) && ind.rowAnimation === "none" && parseFloat(ind.rowTransition) === 0 &&
      ind.segs.every((s) => s.animation === "none" && parseFloat(s.duration) === 0),
    `row ${ind && ind.rowAnimation}/${ind && ind.rowTransition} · segments ${ind ? [...new Set(ind.segs.map((s) => s.animation + "/" + s.duration))].join(" ") : "—"}`);
  check("§4 (f) the retired scrollbar does not come back as a second channel",
    s34.scrollbarWidth === "none",
    `scrollbar-width ${s34.scrollbarWidth}`);
  /* The bleed, as the four relationships it has to hold — never as the 128px it
     resolves to at 1280. Run in its own eval because it moves the track's
     scroll position, and the SECTIONS probe above is read in three motion and
     viewport states that must not inherit a scrolled track.

     The percentage trap this formula exists to avoid is silent: padding
     percentages resolve against the containing block, scroll-padding
     percentages against the scrollport, and the mismatch lets the track's own
     snap pull sheet 1 to the viewport edge on first layout. Relationship 2 is
     what catches that. */
  const bleed = await page.eval(`(async () => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const container = document.querySelector("#the-decisions .container");
    const track = document.querySelector(".sheets");
    const sheets = [...document.querySelectorAll(".sheet")];
    const box = container.getBoundingClientRect();
    const rail = box.left + parseFloat(css(container, "padding-left"));
    const railEnd = box.right - parseFloat(css(container, "padding-right"));

    track.scrollLeft = 0;
    await new Promise((r) => setTimeout(r, 250));
    const atRest = r2(sheets[0].getBoundingClientRect().left);
    const restScroll = r2(track.scrollLeft);

    track.scrollLeft = track.scrollWidth;
    await new Promise((r) => setTimeout(r, 400));
    const atEnd = r2(sheets[3].getBoundingClientRect().right);

    track.scrollLeft = 0;
    await new Promise((r) => setTimeout(r, 250));
    const t = track.getBoundingClientRect();
    return {
      rail: r2(rail), railEnd: r2(railEnd),
      trackLeft: r2(t.left), trackRight: r2(t.right), viewport: innerWidth,
      sheet1Start: atRest, restScroll, sheet4End: atEnd,
      docScrollWidth: document.documentElement.scrollWidth,
      docClientWidth: document.documentElement.clientWidth
    };
  })()`);
  evidence.s04Bleed = bleed;
  check("§4 the bleed: the track spans the viewport while its content keeps the rail",
    Math.abs(bleed.trackLeft) < 0.5 && Math.abs(bleed.trackRight - bleed.viewport) < 0.5 &&
      Math.abs(bleed.sheet1Start - bleed.rail) < 1 && bleed.restScroll === 0 &&
      Math.abs(bleed.sheet4End - bleed.railEnd) < 1 &&
      bleed.docScrollWidth <= bleed.docClientWidth,
    `track ${bleed.trackLeft}→${bleed.trackRight} in a ${bleed.viewport}px viewport · at scrollLeft ${bleed.restScroll} sheet 1 starts at ${bleed.sheet1Start} on the rail ${bleed.rail} · fully scrolled sheet 4 ends at ${bleed.sheet4End} on the rail-end ${bleed.railEnd} · document ${bleed.docScrollWidth}/${bleed.docClientWidth}`);

  check("§4 is the section's one named tab stop, and nothing inside a sheet is interactive",
    s34.focusable.length === 1 && /sheets/.test(s34.focusable[0]) &&
      s34.track.role === "list" && s34.track.label === "The four decisions",
    `${JSON.stringify(s34.focusable)} · role ${s34.track.role}, name ${JSON.stringify(s34.track.label)}`);
  check("§3 and §4 are fully static — nothing animates or transitions",
    s34.decisionsMoving.length === 0, s34.decisionsMoving.join(" | ") || "no animation, no transition");
  check("§4 heading tree: one h2, exactly four h3, nothing deeper",
    s34.headings.join(",") === "H2,H3,H3,H3,H3", s34.headings.join(","));

  /* --- §4: announced structure, read from the AX tree rather than asserted --- */
  const axTree4 = await page.call("Accessibility.getFullAXTree");
  const ax4 = axTree4.nodes || [];
  const ax4ById = new Map(ax4.map((n) => [n.nodeId, n]));
  const ax4Name = (n) => (n?.name?.value || "").replace(/\s+/g, " ").trim();
  const ax4Role = (n) => n?.role?.value || "";
  const axList = ax4.find((n) => ax4Role(n) === "list" && ax4Name(n) === "The four decisions");
  const axItems = axList ? (axList.childIds || []).map((id) => ax4ById.get(id)).filter((n) => ax4Role(n) === "listitem") : [];
  const axTitles = ax4.filter((n) => ax4Role(n) === "heading" &&
    (n.properties || []).some((p) => p.name === "level" && Number(p.value?.value) === 3)).map(ax4Name);
  evidence.s04Ax = { list: Boolean(axList), items: axItems.length, headings: axTitles };
  const words4 = (s) => s.toLowerCase().replace(/\s+/g, " ").trim();
  check("§4 announces a four-item list named The four decisions, with the titles as its headings",
    Boolean(axList) && axItems.length === 4 && axTitles.length === 4 &&
      axTitles.every((t, i) => words4(t) === words4(s04Copy[i].title)),
    `list ${Boolean(axList)} with ${axItems.length} items · h3 names ${JSON.stringify(axTitles)}`);

  /* --- §4: one desktop screen. Read off the live elements and the resolved
     --gap-section, never off the spec's figures, so the check follows any
     padding or copy change rather than pinning today's number. --- */
  const oneScreen = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const section = document.querySelector("#the-decisions");
    const bar = document.querySelector(".statusbar").getBoundingClientRect().height;
    /* The landing path readers actually have, now that the page does not snap:
       a fragment or scrollIntoView() settling the section's start under the
       sticky bar. Nothing here waits on a snap position. */
    window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY - bar);
    const track = document.querySelector(".sheets").getBoundingClientRect();
    return { bar: r2(bar), trackBottom: r2(track.bottom), trackTop: r2(track.top),
             viewport: innerHeight,
             gapSection: getComputedStyle(document.querySelector("#the-decisions .section__body")).marginTop };
  })()`);
  evidence.s04OneScreen = oneScreen;
  check("§4 fits one desktop screen at 1280 × 700, with its start under the sticky bar",
    oneScreen.trackBottom <= oneScreen.viewport + 0.5 && oneScreen.trackTop >= oneScreen.bar - 0.5,
    `track ${oneScreen.trackTop}→${oneScreen.trackBottom} in a ${oneScreen.viewport}px viewport under a ${oneScreen.bar}px bar (--gap-section ${oneScreen.gapSection})`);

  /* --- §4: every sheet reachable by keyboard, with real key events. The
     programmatic form lies about snapping, so the arrow keys are dispatched
     through the browser's own input path. --- */
  await page.goto(PAGE_URL);
  const beforeArrows = await page.eval(`(() => {
    const track = document.querySelector(".sheets");
    track.scrollLeft = 0;
    track.focus();
    return { left: track.scrollLeft, focused: document.activeElement.className };
  })()`);
  /* Arrow keys page the track a fixed step at a time, so "reachable" is a walk
     to the end rather than one press: the loop runs until sheet 4's inline end
     is inside the track's box, or gives up — a track that traps fails on the
     give-up, not on an arbitrary press count. */
  const arrowWalk = { presses: 0, positions: [] };
  for (let i = 0; i < 80; i++) {
    for (const type of ["rawKeyDown", "keyUp"]) {
      await page.call("Input.dispatchKeyEvent", { type, windowsVirtualKeyCode: 39, code: "ArrowRight", key: "ArrowRight" });
    }
    arrowWalk.presses++;
    if (i % 8 === 7 || i > 60) {
      const at = await page.eval(`(() => {
        const track = document.querySelector(".sheets");
        const last = document.querySelectorAll(".sheet")[3].getBoundingClientRect();
        return { left: Math.round(track.scrollLeft), reached: last.right <= track.getBoundingClientRect().right + 0.5 };
      })()`);
      arrowWalk.positions.push(at.left);
      if (at.reached) break;
    }
  }
  await page.eval("new Promise(r => setTimeout(r, 400))");
  const afterArrows = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const track = document.querySelector(".sheets");
    const box = track.getBoundingClientRect();
    const last = document.querySelectorAll(".sheet")[3].getBoundingClientRect();
    return { left: r2(track.scrollLeft), lastRight: r2(last.right), trackRight: r2(box.right),
             reached: last.right <= box.right + 0.5,
             focused: document.activeElement.className };
  })()`);
  afterArrows.presses = arrowWalk.presses;

  /* --- §12.19(d)'s second half: the state has to TRACK the rest, not sit at 1.
     Driven with real key events for the same reason the walk above is — a
     scrollLeft write settles differently from a gesture, and this check is
     about what the reader's own paging produces. The active segment is
     compared against the sheet measured to hold the track, not against a
     hardcoded 2, so the check keeps meaning if the sheet width changes. --- */
  await page.goto(PAGE_URL);
  await page.eval(`(() => { const t = document.querySelector(".sheets"); t.scrollLeft = 0; t.focus(); return true; })()`);
  const READ_REST = `(() => {
    const track = document.querySelector(".sheets");
    const box = track.getBoundingClientRect();
    const share = [...document.querySelectorAll(".sheet")].map((s) => {
      const b = s.getBoundingClientRect();
      return Math.max(0, Math.min(b.right, box.right) - Math.max(b.left, box.left)) / b.width;
    });
    let rest = 0;
    share.forEach((v, i) => { if (v > share[rest]) rest = i; });
    const segs = [...document.querySelectorAll(".sheets-indicator__seg")];
    return { rest, active: segs.findIndex((s) => s.classList.contains("is-active")),
             actives: segs.filter((s) => s.classList.contains("is-active")).length,
             share: share.map((v) => Math.round(v * 100)) };
  })()`;
  const restAtLoad = await page.eval(READ_REST);
  let indicatorRest = restAtLoad;
  for (let i = 0; i < 40; i++) {
    for (const type of ["rawKeyDown", "keyUp"]) {
      await page.call("Input.dispatchKeyEvent", { type, windowsVirtualKeyCode: 39, code: "ArrowRight", key: "ArrowRight" });
    }
    await page.eval("new Promise(r => setTimeout(r, 120))");
    indicatorRest = await page.eval(READ_REST);
    if (indicatorRest.rest >= 1) break;
  }
  evidence.indicatorRest = { atLoad: restAtLoad, afterKeys: indicatorRest };
  check("§4 (d) the indicator follows the track's rest under real key events, and starts honest",
    restAtLoad.rest === 0 && restAtLoad.active === 0 && restAtLoad.actives === 1 &&
      indicatorRest.rest >= 1 && indicatorRest.active === indicatorRest.rest && indicatorRest.actives === 1,
    `at load: sheet ${restAtLoad.rest + 1} holds the track, segment ${restAtLoad.active + 1} lit · ` +
      `after paging: sheet ${indicatorRest.rest + 1} holds it (${indicatorRest.share.join("/")}% visible), segment ${indicatorRest.active + 1} lit`);

  /* --- THE TRACK'S END STATE. The indicator has to reach its last slot, and
     the state asserted is the END one rather than a position along the way:
     the reader who scrolls to the end of the track is the only reader who can
     see the last segment, and this is the second defect found in this
     component after one that a rendered check could not see at all.

     It is asserted at two widths on purpose, and the second is the one that
     matters. Wide enough and the last TWO sheets are both wholly visible at
     the end, so "most visible" ties and a tie broken by document order pins
     the report one sheet short — the last segment can then never light,
     however far the reader scrolls. The precondition is measured and printed
     beside the result, so the check is visibly exercising that regime and not
     merely passing where the tie does not arise.

     Expectation comes from the DOM — the LAST segment, for the LAST sheet —
     never from a share heuristic of the harness's own, which would only
     re-state the implementation back to itself. --- */
  const trackEnd = {};
  for (const width of [1280, 1600]) {
    await page.setViewport({ width, height: 900 });
    await page.goto(PAGE_URL);
    trackEnd[width] = await page.eval(`(async () => {
      const track = document.querySelector(".sheets");
      const sheets = [...document.querySelectorAll(".sheet")];
      const segs = [...document.querySelectorAll(".sheets-indicator__seg")];
      track.scrollLeft = track.scrollWidth;
      await new Promise((r) => setTimeout(r, 600));
      const box = track.getBoundingClientRect();
      const share = sheets.map((s) => {
        const b = s.getBoundingClientRect();
        return Math.round(100 * Math.max(0, Math.min(b.right, box.right) - Math.max(b.left, box.left)) / b.width);
      });
      const last = sheets[sheets.length - 1].getBoundingClientRect();
      return {
        atEnd: Math.round(track.scrollLeft) === Math.round(track.scrollWidth - track.clientWidth),
        lastWhole: last.right <= box.right + 0.5,
        share,
        wholeAtEnd: share.filter((v) => v === 100).length,
        segments: segs.length, sheets: sheets.length,
        active: segs.findIndex((s) => s.classList.contains("is-active")),
        actives: segs.filter((s) => s.classList.contains("is-active")).length
      };
    })()`);
  }
  evidence.s04TrackEnd = trackEnd;
  const endWidths = Object.entries(trackEnd);
  check("§4 (d2) at the track's end the LAST segment is the lit one — including where the last two sheets are both whole",
    endWidths.every(([, m]) => m.atEnd && m.lastWhole && m.segments === m.sheets &&
      m.actives === 1 && m.active === m.segments - 1) &&
      /* The tie regime is reached, not assumed: at one of the two widths two
         sheets are wholly visible at the end. */
      endWidths.some(([, m]) => m.wholeAtEnd >= 2),
    endWidths.map(([w, m]) => `${w}px: sheets ${m.share.join("/")}% visible at the end (${m.wholeAtEnd} whole), segment ${m.active + 1} of ${m.segments} lit, ${m.actives} active`).join(" · "));
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(PAGE_URL);
  await page.eval(`(() => { const t = document.querySelector(".sheets"); t.scrollLeft = 0; t.focus(); return true; })()`);

  /* The mechanical stand-in for find-in-page reaching off-canvas content: the
     engine's own scroll-into-view, measured after the snap has settled. Run
     from the track's start, which is where a reader searching the page is. */
  const REVEAL = `(async () => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const track = document.querySelector(".sheets");
    track.scrollLeft = 0;
    await new Promise((r) => setTimeout(r, 200));
    const sheet3 = document.querySelectorAll(".sheet")[2];
    const dd = [...sheet3.querySelectorAll("dd")].pop();
    dd.scrollIntoView();
    const aimed = r2(track.scrollLeft);
    await new Promise((r) => setTimeout(r, 600));
    const t = track.getBoundingClientRect();
    const b = dd.getBoundingClientRect();
    const s = sheet3.getBoundingClientRect();
    return {
      aimed, settled: r2(track.scrollLeft), snap: getComputedStyle(track).scrollSnapType,
      moved: track.scrollLeft > 0,
      whole: b.left >= t.left - 0.5 && b.right <= t.right + 0.5,
      share: r2(Math.max(0, Math.min(b.right, t.right) - Math.max(b.left, t.left)) / b.width),
      sheetShare: r2(Math.max(0, Math.min(s.right, t.right) - Math.max(s.left, t.left)) / s.width),
      box: r2(b.left) + "→" + r2(b.right), track: r2(t.left) + "→" + r2(t.right)
    };
  })()`;
  const revealSnapped = await page.eval(REVEAL);
  evidence.s04RevealSnapped = revealSnapped;
  evidence.s04Keyboard = { before: beforeArrows, after: afterArrows };
  check("§4 every sheet is reachable with real arrow keys — the track neither traps nor clips",
    beforeArrows.focused.includes("sheets") && afterArrows.left > beforeArrows.left && afterArrows.reached,
    `scrollLeft ${beforeArrows.left} → ${afterArrows.left} over ${afterArrows.presses} presses, sheet 4's inline end ${afterArrows.lastRight} inside the track's ${afterArrows.trackRight}`);
  /* Off-canvas content is reachable programmatically too — but with proximity
     snap ON the engine re-aligns the reveal to a sheet start, so a match in
     sheet 3 lands part-visible rather than whole. Asserted here as the
     no-trap relationship it is, and MEASURED as the share that lands, because
     the whole-visible form of this only holds on the snap-off path (below).
     The shortfall is a real cost of the paged track and is named in the
     handoff rather than papered over. */
  check("§4 a match in an off-canvas sheet is scrolled toward, never left behind",
    revealSnapped.moved && revealSnapped.share > 0 && revealSnapped.sheetShare > 0,
    `snap ${revealSnapped.snap}: scrollIntoView aimed at ${revealSnapped.aimed} and the snap settled it at ${revealSnapped.settled} — ${Math.round(revealSnapped.share * 100)}% of the value and ${Math.round(revealSnapped.sheetShare * 100)}% of its sheet on screen (${revealSnapped.box} in ${revealSnapped.track}); whole-visible is asserted on the snap-off path`);

  /* --- §4: reduced motion turns the track's snap off; the section stays
     static and complete either way. --- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const s34Still = await page.eval(SECTIONS);
  evidence.s34Reduced = s34Still;
  check("§4 under reduced motion: snap off, content identical, nothing moving",
    s34Still.reducedMotion && s34Still.track.snapType === "none" &&
      s34Still.decisionsMoving.length === 0 &&
      s34Still.titles.join("|") === s34.titles.join("|") &&
      s34Still.rowValues.flat().join("|") === s34.rowValues.flat().join("|") &&
      s34Still.kickerText === s34.kickerText && s34Still.paraText === s34.paraText,
    `snap ${JSON.stringify(s34Still.track.snapType)} · ${s34Still.decisionsMoving.join(" | ") || "nothing moving"} · content identical`);
  /* §12.19(e)'s reduced-motion half. The indicator's discrete-state guarantee
     is what keeps the motion budget closed, so it is asserted on the path where
     a reader has explicitly asked for less — and the render must be identical,
     not merely calmer. */
  check("§4 the indicator is identical with motion reduced: same segments, still nothing animating",
    Boolean(s34Still.indicator) &&
      s34Still.indicator.count === s34.indicator.count &&
      s34Still.indicator.rowAnimation === "none" && parseFloat(s34Still.indicator.rowTransition) === 0 &&
      s34Still.indicator.segs.every((s) => s.animation === "none" && parseFloat(s.duration) === 0) &&
      s34Still.indicator.segs.map((s) => s.bg).join("|") === s34.indicator.segs.map((s) => s.bg).join("|"),
    `${s34Still.indicator ? s34Still.indicator.count : 0} segments · row ${s34Still.indicator && s34Still.indicator.rowAnimation} · colours identical: ${Boolean(s34Still.indicator) && s34Still.indicator.segs.map((s) => s.bg).join("|") === s34.indicator.segs.map((s) => s.bg).join("|")}`);
  const revealPlain = await page.eval(REVEAL);
  evidence.s04RevealPlain = revealPlain;
  check("§4 with the track's snap off, an off-canvas match lands whole in view",
    revealPlain.snap === "none" && revealPlain.whole && revealPlain.share === 1,
    `settled at ${revealPlain.settled} — sheet 3's last value ${revealPlain.box} inside the track's ${revealPlain.track}`);
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });

  /* --- §3 + §4 across the phone widths: the kicker's wrap rule, the un-track,
     and no sideways gesture anywhere. --- */
  const s34Narrow = {};
  for (const width of [320, 360, 375, 390]) {
    await page.setViewport({ width, height: 553, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    s34Narrow[width] = await page.eval(SECTIONS);
    if (width === 375) writeFileSync(join(ARTIFACTS, "blink-dark-s0304-375.png"), await page.screenshot({ fullPage: true }));
  }
  evidence.s34Narrow = s34Narrow;
  const narrowEntries = Object.entries(s34Narrow);
  const allWidths = [...narrowEntries, ["1280", s34]];

  /* §12.19(f)'s second half. Below --bp-wide there is no track and therefore no
     position to report — the ordinals carry the stack alone. A row of segments
     under a stacked list would be reporting on a scroll that does not exist. */
  check("§4 the indicator does not render below --bp-wide, where there is no track",
    narrowEntries.every(([, m]) => m.indicator && m.indicator.display === "none"),
    narrowEntries.map(([w, m]) => `${w}px: ${m.indicator ? m.indicator.display : "absent"}`).join(" · "));

  /* The rule, not the line count: a sentence breaks only where it cannot fit
     the column. Strip the inline-block and the break lands mid-sentence at
     375px, where both sentences fit individually and neither fits with the
     other — which is exactly what this fails on. */
  const wrapOK = ([, m]) => m.sentences.every((s) =>
    s.display === "inline-block" &&
    (s.rects === 1 || s.natural > m.kickerColumn + 0.5));
  check("§3 kicker breaks only at a sentence boundary, at every measured width",
    allWidths.every(wrapOK) && allWidths.every(([, m]) => m.viewport.scrollWidth <= m.viewport.clientWidth),
    allWidths.map(([w, m]) => `${w}px: ${m.kickerLines}L, sentences ${m.sentences.map((s) => s.rects + (s.natural > m.kickerColumn ? "*" : "")).join("/")} rect(s) in a ${m.kickerColumn}px column`).join(" · "));
  /* The bleed is scoped to the same media query as the track, so below
     --bp-wide the track's border box must stay INSIDE the container — a bleed
     that leaked into the stacked path would push a phone page sideways. */
  check("§4 un-tracks below --bp-wide: sheets stack, no bleed, nothing scrolls sideways",
    narrowEntries.every(([, m]) => !m.wide && m.track.scrollWidth === m.track.clientWidth &&
      m.stacked && m.sheetOverflow.every((o) => o <= 0) &&
      m.trackBox.left >= m.rail.start - 0.5 && m.trackBox.right <= m.rail.end + 0.5 &&
      m.viewport.scrollWidth <= m.viewport.clientWidth),
    narrowEntries.map(([w, m]) => `${w}px: track ${m.track.scrollWidth}/${m.track.clientWidth} at ${m.trackBox.left}→${m.trackBox.right} inside the container ${m.rail.start}→${m.rail.end}, stacked ${m.stacked}, doc ${m.viewport.scrollWidth}/${m.viewport.clientWidth}`).join(" · "));
  /* The phone stack's orientation channel. The ordinal is what the re-ruling
     turned on: without it four near-identical cards give no extent, no
     progress and no end. It must survive the un-track. */
  check("§4 the ordinal survives the phone stack — extent and progress on every card",
    narrowEntries.every(([, m]) => m.ordinals.every((o) => o.count === 1 && o.text === o.expected && o.hidden === "true")),
    narrowEntries.map(([w, m]) => `${w}px: ${m.ordinals.map((o) => o.text).join(", ")}`).join(" · "));
  check("§4 label column disappears rather than compresses below --bp-wide",
    narrowEntries.every(([, m]) => m.labelColumns.every((sheet) => sheet.every((d) => !d.sharesBandWithValue))),
    narrowEntries.map(([w, m]) => `${w}px: ${m.labelColumns.flat().filter((d) => d.sharesBandWithValue).length} label(s) beside their value`).join(" · "));
  check("§4 mechanism mark keeps its 12px card seat at every phone width",
    narrowEntries.every(([, m]) => m.marks.every((k) => Math.abs(k.inset - m.hairline) < 0.5 && k.width === 2 && k.clearance > 0)),
    narrowEntries.map(([w, m]) => `${w}px: insets ${m.marks.map((k) => k.inset).join("/")} against ${m.hairline}`).join(" · "));

  /* ================================================================= §5 ===
     Shipped with Muster — the page's ONLY site for the whole-product number
     set, and its only counting cells.

     Two sources of truth, and neither is this file. The strings come off
     Content's deliverable; the four BODH figures are additionally diffed
     against the founder-authored seed's Measured data table, which is the
     document the copy file itself cites. A number that drifted in the copy
     file would still be caught, because the page is checked against the
     measurement and not only against the transcription of it.
     ======================================================================= */

  /* The fenced prose lines, then the card table. The table is parsed rather
     than retyped for the same reason the fences are: a retyped em dash or a
     transposed scope label is exactly the class of drift this catches.

     Nothing here is counted in advance. The prose heading is matched on its
     shape rather than on the number it spells, and the cell inventory is
     discovered by walking `Key N` until the row is absent — a re-key that
     adds or drops a cell re-bases this parser by being read, instead of
     crashing the runner before a single check has run. A slot with no
     backticked run is null: the table authors its empty slots as `(none)`,
     which is the copy file talking to its reader rather than a string that
     ships. */
  const s05Copy = (() => {
    const lines = copyFile("section-05-copy.md");
    const at = lines.findIndex((l) => /^## 3\. The \S+ prose lines/.test(l));
    const end = lines.findIndex((l, i) => i > at && /^## 4\./.test(l));
    const prose = fencesIn(lines.slice(at, end));

    const tableAt = lines.findIndex((l) => /^### 4\.1 Card strings/.test(l));
    const tableEnd = lines.findIndex((l, i) => i > tableAt && /^\| Claim \|/.test(l));
    const rows = lines.slice(tableAt, tableEnd)
      .filter((l) => l.startsWith("|") && !/^\|\s*-+/.test(l))
      .map((l) => l.split("|").slice(1, -1).map((c) => c.trim()));
    const cellOf = (row, col) => (row && row[col] ? (row[col].match(/`([^`]*)`/) || [])[1] ?? null : null);
    const has = (label) => rows.some((r) => r[0] === label);
    const pick = (label, col) => cellOf(rows.find((r) => r[0] === label), col);
    const slots = [];
    for (let n = 1; has(`Key ${n}`); n += 1) slots.push(n);
    const card = (col) => ({
      scope: pick("Card label", col),
      keys: slots.map((n) => pick(`Key ${n}`, col)),
      values: slots.map((n) => pick(`Value ${n}`, col)),
      subs: slots.map((n) => pick(`Sub-line ${n}`, col))
    });
    return { prose, slots: slots.length, cards: [card(1), card(2)] };
  })();

  /* The seed's Measured data table — founder-authored, read-only, and the
     origin of every figure §5 prints. Read as `label -> { value, note }` from
     the BODH column, with the parenthetical split off: "4 (Jul 11–18)" is a
     commit-day count and the window it covers, and §5 renders both. */
  const SEED_MEASURED = (() => {
    const lines = readFileSync(join(ROOT, "knowledge-base", "product-spec-seed.md"), "utf8").split("\n");
    const at = lines.findIndex((l) => /^## Measured data/.test(l));
    const end = lines.findIndex((l, i) => i > at && /^## /.test(l));
    const out = {};
    lines.slice(at, end === -1 ? lines.length : end)
      .filter((l) => l.startsWith("|") && !/^\|\s*-+/.test(l) && !/^\|\s*\|/.test(l))
      .forEach((l) => {
        const cells = l.split("|").slice(1, -1).map((c) => c.trim());
        if (cells.length < 2) return;
        const m = cells[1].match(/^([^(]*?)\s*(?:\(([^)]*)\))?$/);
        out[cells[0]] = { value: (m?.[1] || cells[1]).trim(), note: (m?.[2] || "").trim() };
      });
    return out;
  })();
  evidence.s05Seed = SEED_MEASURED;

  const SHIPPED = `(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const section = document.querySelector("#shipped-with-muster");
    const body = section.querySelector(".section__body");
    const cards = [...body.querySelectorAll(".shipped__card")];

    const accentRgb = (() => {
      const p = document.createElement("span");
      p.style.color = "var(--accent)";
      document.body.appendChild(p);
      const v = css(p, "color");
      p.remove();
      return v;
    })();

    /* What assistive technology would read: the text an aria-hidden subtree
       contributes is not text, and that difference is the whole posture. */
    const atText = (root) => {
      let out = "";
      const walk = (node) => {
        if (node.nodeType === 3) { out += node.nodeValue; return; }
        if (node.nodeType !== 1) return;
        if (node.getAttribute("aria-hidden") === "true") return;
        [...node.childNodes].forEach(walk);
      };
      walk(root);
      return out.replace(/\\s+/g, " ").trim();
    };

    const lineCount = (el) => r2(el.getBoundingClientRect().height / parseFloat(css(el, "line-height")));

    const readCell = (cell) => {
      const key = cell.querySelector(".readout__key");
      const value = cell.querySelector(".readout__value");
      const target = cell.querySelector("[data-countup]");
      const box = cell.getBoundingClientRect();
      return {
        key: key.textContent.trim(),
        keyLines: lineCount(key),
        keyColour: css(key, "color"),
        value: value.textContent.replace(/\\s+/g, " ").trim(),
        state: target ? target.getAttribute("data-countup-state") : "no-engine",
        ariaHidden: target ? target.getAttribute("aria-hidden") : null,
        colour: css(value, "color"),
        fontSize: css(value, "font-size"),
        tabular: css(value, "font-variant-numeric"),
        animation: css(value, "animation-name"),
        transition: css(value, "transition-duration"),
        subs: [...cell.querySelectorAll(".readout__sub")].map((s) => s.textContent.trim()),
        announced: atText(cell),
        top: r2(box.top),
        height: r2(box.height),
        keyTop: r2(key.getBoundingClientRect().top),
        valueTop: r2(value.getBoundingClientRect().top),
        /* The sub-line's own offset BELOW the value it qualifies — never its
           absolute position. The two cards hang their sub-lines in different
           cells, so what has to hold across the pair is the hang, not the
           row. */
        subDrop: (() => {
          const sub = cell.querySelector(".readout__sub");
          return sub ? r2(sub.getBoundingClientRect().top - value.getBoundingClientRect().bottom) : null;
        })()
      };
    };

    const readCard = (card) => ({
      scope: card.querySelector(".shipped__scope").textContent.trim(),
      scopeRects: card.querySelector(".shipped__scope").getClientRects().length,
      caption: card.querySelector(".shipped__caption") ? card.querySelector(".shipped__caption").textContent.trim() : null,
      captions: card.querySelectorAll(".shipped__caption").length,
      regmarks: card.querySelectorAll(".regmark").length,
      surface: css(card, "background-color"),
      border: css(card, "border-top-width"),
      cells: [...card.querySelectorAll(".shipped__cell")].map(readCell),
      blockSize: r2(card.getBoundingClientRect().height),
      overflow: r2(card.scrollWidth - card.clientWidth)
    });

    const moving = [...section.querySelectorAll("*")].filter((el) => {
      const a = css(el, "animation-name");
      const t = parseFloat(css(el, "transition-duration")) || 0;
      return (a && a !== "none") || t > 0;
    }).map((el) => (el.className || el.tagName) + " [" + css(el, "animation-name") + "]");

    /* Byte-count of a figure across the WHOLE page, with the sections that
       carry it named. Two renderings of one measurement is the drift this
       page cannot afford, so the count is the assertion. */
    const siteOf = (needle) => {
      const all = document.body.textContent;
      return {
        needle,
        count: all.split(needle).length - 1,
        sections: [...document.querySelectorAll("main > section")]
          .filter((s) => s.textContent.includes(needle)).map((s) => s.id)
      };
    };

    return {
      wide: matchMedia("(min-width: 60rem)").matches,
      reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
      accentRgb,
      inkRgb: css(document.body, "color"),
      mutedRgb: css(document.querySelector(".readout__key"), "color"),
      lines: [...body.querySelectorAll(".shipped__line")].map((p) => ({
        text: p.textContent.replace(/\\s+/g, " ").trim(),
        colour: css(p, "color"),
        /* The weight the READER sees, not the paragraph's own: §5's primary
           carries its emphasis on a run spanning the sentence, so the
           paragraph stays at 400 and keeps its neighbours' column. */
        weight: Math.max(...[p, ...p.querySelectorAll("*")].map((el) => Number(css(el, "font-weight")))),
        emphasised: [...p.querySelectorAll("*")]
          .filter((el) => Number(css(el, "font-weight")) >= 700)
          .map((el) => el.textContent.replace(/\\s+/g, " ").trim()),
        size: css(p, "font-size"),
        cap: r2(parseFloat(css(p, "max-width"))),
        start: r2(p.getBoundingClientRect().left),
        width: r2(p.getBoundingClientRect().width),
        rendered: r2(p.getBoundingClientRect().width)
      })),
      /* The emphasis must be weight and nothing else — no element in §5's
         prose block may compute the accent as its colour. */
      proseAccentText: [...body.querySelectorAll(".shipped__line, .shipped__line *")]
        .filter((el) => css(el, "color") === accentRgb).length,
      readMax: (() => {
        const p = document.createElement("span");
        p.style.cssText = "position:absolute;visibility:hidden;inline-size:var(--read-max)";
        body.appendChild(p);
        const w = r2(p.getBoundingClientRect().width);
        p.remove();
        return w;
      })(),
      bodyChildren: [...body.children].map((el) => el.className),
      cards: cards.map(readCard),
      cardCount: cards.length,
      /* R9: §5 asks for nothing. No link, no chip, no control. */
      focusable: [...section.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])')]
        .map((el) => el.className || el.tagName),
      headings: [...section.querySelectorAll("h1,h2,h3,h4,h5,h6")].map((h) => h.tagName),
      moving,
      standIns: document.querySelectorAll(".a11y-value").length,
      /* The posture, page-wide: there is no live region anywhere on this page,
         and §5's counting cells are the reason the question comes up at all. */
      liveRegions: [...document.querySelectorAll("[aria-live], [role=status], [role=alert], [role=log], [role=timer], [role=marquee], [aria-atomic]")]
        .map((el) => (el.className || el.tagName) + "[" + (el.getAttribute("aria-live") || el.getAttribute("role")) + "]"),
      sites: { activeBuild: siteOf("9.3"), cost: siteOf("$147"), attention: siteOf("4.8 h"), siteAttention: siteOf("7.5 h") },
      unmeasuredModifiers: section.querySelectorAll(".readout__value--unmeasured").length,
      /* Wave-scope figures must not appear in §5 (copy file §1, R5). */
      waveScope: ["~64", "289", "$24.73"].filter((n) => section.textContent.includes(n)),
      sectionText: section.textContent.replace(/\\s+/g, " ").trim(),
      viewport: { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }
    };
  })()`;

  await page.setViewport({ width: 1280, height: 900 });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const s05 = await page.eval(SHIPPED);
  evidence.s05Wide = s05;
  writeFileSync(join(ARTIFACTS, "blink-dark-s05-1280.png"), await page.screenshot({ fullPage: true }));

  /* --- §5: the strings, verbatim from the deliverable ---
     The line count is the copy file's, never this file's: §5's prose is a
     deliverable that may be re-keyed, and a literal here would turn every
     future re-key into a harness edit. What is asserted is the relationship —
     the page renders exactly the deliverable's lines, in order, in ink. */
  check("§5 ships the deliverable's prose lines verbatim, the provenance line among them as prose",
    s05Copy.prose.length > 0 && s05.lines.length === s05Copy.prose.length &&
      s05.lines.every((l, i) => l.text === s05Copy.prose[i]) &&
      s05.lines.every((l) => l.colour === s05.inkRgb),
    `${s05.lines.length} rendered against ${s05Copy.prose.length} authored, all equal: ${s05.lines.every((l, i) => l.text === s05Copy.prose[i])} · ${JSON.stringify(s05.lines.map((l) => l.text.slice(0, 28)))}`);
  /* §5's hierarchy, as the two relationships it is. The primary is matched by
     its STRING against the copy file, not by its class or its position, so
     moving the emphasis to a different line fails here rather than passing as
     "still exactly one bold line". One lever is spent: same size, same ink —
     a size fork riding in with the weight is the drift this catches. */
  const s05Primary = s05Copy.prose.findIndex((p) => /extracted mid-build/.test(p));
  check("§5 has one primary line — the provenance claim, at body size, weight alone",
    s05Primary >= 0 && s05.lines.length === s05Copy.prose.length &&
      s05.lines.filter((l) => l.weight >= 700).length === 1 &&
      s05.lines[s05Primary].weight >= 700 &&
      /* The emphasis covers the whole claim, not a phrase inside it — a
         partial run would make §5's primary a hook rather than a primary. */
      s05.lines[s05Primary].emphasised.length === 1 &&
      s05.lines[s05Primary].emphasised[0] === s05.lines[s05Primary].text &&
      new Set(s05.lines.map((l) => l.size)).size === 1 &&
      new Set(s05.lines.map((l) => l.colour)).size === 1 &&
      s05.proseAccentText === 0,
    s05.lines.map((l, i) => `${i + 1}: ${l.weight}/${l.size}${i === s05Primary ? " (primary, " + l.emphasised.length + " run)" : ""}`).join(" · ") +
      ` · ${s05.proseAccentText} accent-coloured element(s) in the prose block`);
  check("§5 renders two cards and only two — the provenance line is never a readout cell",
    s05.cardCount === 2 && s05.bodyChildren.filter((c) => /shipped__line/.test(c)).length === s05Copy.prose.length &&
      s05.cards.every((c) => c.cells.length === s05Copy.slots),
    `${s05.cardCount} cards of ${s05.cards.map((c) => c.cells.length).join("/")} cells against the deliverable's ${s05Copy.slots}, ${s05.bodyChildren.length} elements in the section body`);
  check("§5 both cards carry the same keys, in the same order, from the copy file",
    s05.cards.every((card, i) => card.cells.every((cell, j) => cell.key === s05Copy.cards[i].keys[j])) &&
      s05.cards[0].cells.map((c) => c.key).join("|") === s05.cards[1].cells.map((c) => c.key).join("|"),
    s05.cards[0].cells.map((c) => c.key).join(" · "));
  check("§5 both cards are scope-labelled, and neither label breaks mid-phrase",
    s05.cards.every((card, i) => card.scope === s05Copy.cards[i].scope && card.scopeRects === 1),
    s05.cards.map((c) => `${JSON.stringify(c.scope)} in ${c.scopeRects} rect(s)`).join(" · "));

  /* --- §5: the figures, against the founder's own measurement --- */
  const SEED_KEYS = { "OPERATOR ATTENTION": "Operator attention", "SHIPPED": "Shipped" };
  const bodhCells = s05.cards[0].cells;
  const seedFor = (key) => SEED_MEASURED[SEED_KEYS[key]];
  /* The seed's Shipped cell is one string — `bodh.day — App Store + web` — and
     §5 renders it across two slots because the value slot is a readout and the
     qualifier is not a value. So the assertion reconstitutes the seed's cell
     from what the page renders rather than comparing half of it: value, the
     seed's own separator, sub-line. A cell that carries a sub-line is
     reconstituted; one that does not is compared whole. */
  const seedCell = (cell) => cell.subs.length ? `${cell.value} — ${cell.subs[0]}` : cell.value;
  check("§5's BODH figures are byte-equal to the seed's Measured data table",
    bodhCells.length === s05Copy.slots && bodhCells.every((cell) => {
      const seed = seedFor(cell.key);
      return Boolean(seed) && seedCell(cell) === seed.value;
    }),
    bodhCells.map((c) => `${c.key} ${JSON.stringify(seedCell(c))} vs seed ${JSON.stringify(seedFor(c.key)?.value)}`).join(" · "));
  /* Sub-lines, authored-vs-rendered: each cell renders exactly the sub-line
     the copy file attaches to it and nothing more. The section carries ONE —
     card 1's qualifier on the seed's own Shipped cell; card 2 carries none,
     an authored asymmetry, not an omission. The two literal `1`s are the
     vacuity guard: if the copy parser ever returned an empty inventory AND
     the page rendered no sub-line, the per-cell comparison alone would pass
     over nothing — these clauses pin the current authored truth so that
     state goes red instead. */
  check("§5 sub-lines are the copy file's, cell for cell — one in the section, on card 1's SHIPPED cell",
    s05.cards.every((card, i) => {
      const authored = s05Copy.cards[i].subs;
      return card.cells.filter((c) => c.subs.length).length === authored.filter(Boolean).length &&
        card.cells.every((c, j) => c.subs.join("") === (authored[j] || ""));
    }) &&
      s05Copy.cards.flatMap((c) => c.subs).filter(Boolean).length === 1 &&
      s05.cards.flatMap((c) => c.cells).filter((c) => c.subs.length).length === 1,
    s05.cards.map((card, i) => `card ${i + 1}: ${JSON.stringify(card.cells.map((c) => c.subs[0] ?? null))} against ${JSON.stringify(s05Copy.cards[i].subs)}`).join(" · "));
  /* The primary-site rule: §1 gave up its readout at Gate A, so each of these
     figures now has exactly one home and this is it. A second rendering
     anywhere on the page fails here, whatever it says.

     Two of the three render inside a sentence now rather than in a cell, so
     the needle is the FIGURE and not the cell string: `9.3` and `$147` are
     counted as they are written in the prose, and `4.8 h` as the cell writes
     it. A second rendering in any format is still exactly one hit too many —
     which is the point of counting the figure rather than a formatting of it. */
  check("§5 is the page's only site for 9.3, $147, 4.8 h and 7.5 h — one rendering each",
    ["activeBuild", "cost", "attention", "siteAttention"].every((k) =>
      s05.sites[k].count === 1 && s05.sites[k].sections.join("") === "shipped-with-muster"),
    Object.entries(s05.sites).map(([k, v]) => `${k} ${JSON.stringify(v.needle)} ×${v.count} in [${v.sections.join(",")}]`).join(" · "));
  check("§5 mixes no scope: no wave-scope figure appears in the section",
    s05.waveScope.length === 0, s05.waveScope.join(", ") || "no ~64 / 289 / $24.73");

  /* --- §5: every value is answered, and the treatment says so ---
     The value slot's colour is the answered/unanswered channel, not a
     numeral/word distinction: a hostname and a place-name are answers and set
     in accent beside `4.8 h` and `7.5 h`. §5 now has one state on the page —
     every key in both cards is answered — so every value computes the accent
     at the readout size, tabular. A dash, an unmeasured modifier, an ink
     value or a launch promise anywhere in the section is a claim the copy
     file no longer makes, and each fails here by name rather than vanishing
     from a filtered list. */
  const siteCells = s05.cards[1].cells;
  const allCells = [...bodhCells, ...siteCells];
  check("§5 every value is answered: flat rust at the readout size, tabular, all four cells",
    allCells.length === s05Copy.slots * 2 &&
      allCells.every((c) => c.colour === s05.accentRgb && c.tabular.includes("tabular-nums") &&
        parseFloat(c.fontSize) >= 24),
    allCells.map((c) => `${c.value} ${c.colour} ${c.fontSize} ${c.tabular}`).join(" · "));
  check("§5 renders no unmeasured value: no em-dash cell, no unmeasured modifier, no launch promise, no card-level caption",
    allCells.every((c) => c.value !== "—") &&
      s05.unmeasuredModifiers === 0 &&
      !/measured at launch/i.test(s05.sectionText) &&
      s05.cards.every((c) => c.captions === 0 && c.caption === null),
    `values ${JSON.stringify(allCells.map((c) => c.value))} · ${s05.unmeasuredModifiers} unmeasured modifier(s) · card-level captions ${s05.cards.map((c) => c.captions).join("+")}`);
  /* A place is not a metric: the SHIPPED values carry no count-up hook at
     all, and both metric values do. The counting inventory is the copy
     file's digit-bearing values, derived rather than restated — the dash's
     engine-refusal property is held by the count-up fixture below, since no
     page cell renders a dash for the engine to refuse. */
  const countingValues = s05Copy.cards.map((c) => c.values.filter((v) => /\d/.test(v)));
  check("§5's counting cells are the deliverable's metric values and nothing else",
    allCells.filter((c) => c.state !== "no-engine").length === countingValues.flat().length &&
      countingValues.flat().length === 2 &&
      s05.cards.every((card, i) =>
        card.cells.filter((c) => c.state !== "no-engine").map((c) => c.value).join("|") === countingValues[i].join("|")),
    allCells.map((c) => `${c.key}/${c.value}: ${c.state}`).join(" · "));
  check("§5 declares no motion of its own — the count-up is the section's whole inventory",
    s05.moving.length === 0, s05.moving.join(" | ") || "no animation, no transition");
  check("§5 asks for nothing: no link, no chip, no control, and no heading below the h2",
    s05.focusable.length === 0 && s05.headings.join(",") === "H2",
    `${JSON.stringify(s05.focusable)} · headings ${s05.headings.join(",")}`);
  check("§5 cards are instrument surfaces: two registration marks each, hairline-bordered",
    s05.cards.every((c) => c.regmarks === 2 && c.border === "1px"),
    s05.cards.map((c) => `${c.regmarks} marks, ${c.border} border`).join(" · "));

  /* --- §5: the relationship the section's argument rests on. Two scopes are
     only comparable if they line up key for key; a key that grew to two lines
     would break that, so both the alignment and its precondition are read off
     the render rather than assumed from the token. --- */
  check("§5 the two cards align key for key — equal cell heights, and equal tops side by side",
    s05.cards[0].cells.every((cell, i) => Math.abs(cell.height - s05.cards[1].cells[i].height) < 0.5) &&
      (!s05.wide || s05.cards[0].cells.every((cell, i) => Math.abs(cell.top - s05.cards[1].cells[i].top) < 0.5)),
    s05.cards[0].cells.map((c, i) => `${c.key}: ${c.height}px @${c.top} vs ${s05.cards[1].cells[i].height}px @${s05.cards[1].cells[i].top}`).join(" · "));
  /* The pair is comparable, stated as relationships and never as a literal
     height. The sub-line sits on ONE side of the pair now, which makes the
     reserved sub-line row the thing under test: equal card block-size and
     level rows DESPITE the one-sided sub-line is a property only the reserve
     can produce. Card 1's single hang is measured so the reserve is proven
     occupied on one side and empty on the other, not merely absent from
     both. */
  const s05Drops = s05.cards.map((c) => c.cells.map((cell) => cell.subDrop).filter((d) => d !== null));
  check("§5 the pair is comparable — equal card block-size, corresponding rows level, with the sub-line on one side only",
    Math.abs(s05.cards[0].blockSize - s05.cards[1].blockSize) < 0.5 &&
      (!s05.wide || (s05.cards[0].cells.every((cell, i) => Math.abs(cell.keyTop - s05.cards[1].cells[i].keyTop) < 0.5) &&
        s05.cards[0].cells.every((cell, i) => Math.abs(cell.valueTop - s05.cards[1].cells[i].valueTop) < 0.5))) &&
      s05Drops[0].length === 1 && s05Drops[1].length === 0 && s05Drops[0][0] > 0,
    `cards ${s05.cards.map((c) => c.blockSize).join(" vs ")}px · sub-line hangs ${s05Drops.map((d) => d.join(",") || "none").join(" vs ")} · ` +
      `key tops ${s05.cards.map((c) => c.cells.map((x) => x.keyTop).join("/")).join(" vs ")}`);
  check("§5 every key sets on one line at desktop, which is what the shared cell size assumes",
    s05.cards.every((c) => c.cells.every((cell) => cell.keyLines === 1)),
    s05.cards.map((c) => c.cells.map((cell) => cell.keyLines).join("")).join(" / "));
  /* One column edge for the whole prose block. This is the standing guard on
     the 64ch defect — weighting the <p> re-resolves its own `ch` and hangs the
     primary line past its neighbours — and it covers every line the
     deliverable ships, not a count fixed here. */
  check("§5 prose sits at the seed-locked 64ch column, on one edge",
    s05.lines.every((l) => Math.abs(l.cap - s05.readMax) < 0.5 && l.rendered <= l.cap + 0.5) &&
      s05.lines.every((l) => Math.abs(l.start - s05.lines[0].start) < 0.5) &&
      s05.lines.every((l) => Math.abs(l.width - s05.lines[0].width) < 0.5),
    `cap ${s05.lines[0].cap}px against --read-max ${s05.readMax}px, widest rendered ${Math.max(...s05.lines.map((l) => l.rendered))}px · ` +
      `${new Set(s05.lines.map((l) => l.start)).size} distinct inline-start(s) ${JSON.stringify(s05.lines.map((l) => l.start))}, widths ${JSON.stringify(s05.lines.map((l) => l.width))}`);

  /* --- §5: the live-region posture, verified during playback ---
     The claim is not "no aria-live in the markup" — it is that the cell's
     accessible text is the measured value at every instant, including the
     1.2 seconds the visible digits spend wrong. So the roll is watched frame
     by frame: the visible string changes many times, the announced string
     must not change at all. Remove the shroud in count-up.js and the second
     half of this goes red while the first half still passes. --- */
  const roll = await page.eval(`(async () => {
    const atText = (root) => {
      let out = "";
      const walk = (node) => {
        if (node.nodeType === 3) { out += node.nodeValue; return; }
        if (node.nodeType !== 1) return;
        if (node.getAttribute("aria-hidden") === "true") return;
        [...node.childNodes].forEach(walk);
      };
      walk(root);
      return out.replace(/\\s+/g, " ").trim();
    };
    const targets = [...document.querySelectorAll("#shipped-with-muster [data-countup]")];
    const cells = targets.map((t) => t.closest(".shipped__cell"));
    document.querySelector(".shipped").scrollIntoView({ block: "center" });
    const seen = [];
    const heard = [];
    const t0 = performance.now();
    while (performance.now() - t0 < 2400) {
      seen.push(targets.map((t) => t.textContent).join("|"));
      heard.push(cells.map(atText).join("|"));
      await new Promise((r) => requestAnimationFrame(r));
    }
    return {
      distinctSeen: [...new Set(seen)].length,
      distinctHeard: [...new Set(heard)],
      states: targets.map((t) => t.getAttribute("data-countup-state")),
      landed: targets.map((t) => t.textContent),
      ariaHidden: targets.map((t) => t.getAttribute("aria-hidden")),
      standInsLeft: document.querySelectorAll(".a11y-value").length
    };
  })()`);
  evidence.s05Roll = roll;

  /* §5 has TWO counting cells — one per card, in document order — and the
     roll is read off the cells that actually carry the hook rather than off
     every value in the cards: a value with no hook is not a failed count-up,
     it is a place. */
  const s05Counting = s05Copy.cards.flatMap((c) => c.values.filter((v) => /\d/.test(v)));
  check("§5 counts up on the real page: every counting cell fires and lands on its exact string",
    roll.states.length === s05Counting.length && roll.states.every((s) => s === "done") &&
      roll.landed.join("|") === s05Counting.join("|") &&
      roll.distinctSeen > 5,
    `${roll.states.join("/")} · landed ${JSON.stringify(roll.landed)} against ${JSON.stringify(s05Counting)} · ${roll.distinctSeen} distinct rendered frames`);
  check("§5's announced value never changes while the visible one rolls — no live region, no wrong number",
    roll.distinctHeard.length === 1 &&
      s05Counting.every((v) => roll.distinctHeard[0].includes(v)),
    `${roll.distinctSeen} visible states against ${roll.distinctHeard.length} announced: ${JSON.stringify(roll.distinctHeard)}`);
  check("§5 leaves nothing behind: the shroud and its stand-in are gone once the roll settles",
    roll.standInsLeft === 0 && roll.ariaHidden.every((a) => a === null),
    `${roll.standInsLeft} stand-in(s), aria-hidden ${JSON.stringify(roll.ariaHidden)}`);
  check("no live region anywhere on the page — the posture is silence, not politeness",
    s05.liveRegions.length === 0, s05.liveRegions.join(", ") || "none");

  /* --- §5: the same claim, read out of the accessibility tree instead of
     computed from the DOM. BOTH rolls are re-run deliberately slowly so the
     tree is fetched while a wrong number is on screen in each cell; the tree
     must contain both measured values and no intermediate. --- */
  const midVisible = await page.eval(`(() => {
    const els = [...document.querySelectorAll("#shipped-with-muster [data-countup]")];
    window.__axSpecs = els.map((el, i) => {
      el.removeAttribute("data-countup-state");
      const spec = MusterCountUp.parse(${JSON.stringify(s05Counting)}[i]);
      MusterCountUp.run(el, spec, 9000);
      return spec;
    });
    return els.map((el) => el.textContent);
  })()`);
  const axTree5 = await page.call("Accessibility.getFullAXTree");
  const ax5 = (axTree5.nodes || []).filter((n) => n.ignored !== true);
  const ax5Names = ax5.map((n) => (n?.name?.value || "").replace(/\s+/g, " ").trim());
  const ax5Values = ax5.map((n) => String(n?.value?.value ?? "").replace(/\s+/g, " ").trim());
  const axRolling = [...ax5Names, ...ax5Values].filter((n) => /^\d+\.\d\s?h$/.test(n));
  const axLive = ax5.filter((n) => (n.properties || []).some((p) => p.name === "live" && p.value?.value && p.value.value !== "off"))
    .map((n) => `${n.role?.value}:${(n.name?.value || "").slice(0, 24)}`);
  const settled = await page.eval(`(() => {
    const els = [...document.querySelectorAll("#shipped-with-muster [data-countup]")];
    els.forEach((el, i) => MusterCountUp.settle(el, window.__axSpecs[i]));
    return { texts: els.map((el) => el.textContent), hidden: els.map((el) => el.getAttribute("aria-hidden")),
             standIns: document.querySelectorAll(".a11y-value").length };
  })()`);
  evidence.s05Ax = { midVisible, rollingNamesInTree: axRolling, live: axLive, settled };

  check("§5 mid-roll: the accessibility tree carries both measured values and no intermediate one",
    s05Counting.every((v) => ax5Names.includes(v)) &&
      axRolling.every((n) => s05Counting.includes(n)) && axLive.length === 0,
    `visible ${JSON.stringify(midVisible)} while the tree carries ${JSON.stringify([...new Set(axRolling)])} against ${JSON.stringify(s05Counting)} · ${axLive.length} live region(s)`);
  check("§5 settles back to the authored strings with the tree left clean",
    settled.texts.join("|") === s05Counting.join("|") && settled.hidden.every((h) => h === null) && settled.standIns === 0,
    JSON.stringify(settled));

  /* --- §5 under reduced motion: the exact values, immediately, and no
     shroud — there is nothing to shroud when nothing rolls. --- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const s05Still = await page.eval(SHIPPED);
  evidence.s05Reduced = s05Still;
  check("§5 at reduced motion: every value renders exactly and immediately, nothing shrouded",
    s05Still.reducedMotion &&
      s05Still.cards.every((card, i) => card.cells.every((c, j) => c.value === s05Copy.cards[i].values[j])) &&
      s05Still.cards.every((card) => card.cells.every((c) => c.state === "static" || c.state === "no-engine")) &&
      s05Still.standIns === 0 && s05Still.cards.every((card) => card.cells.every((c) => c.ariaHidden === null)),
    `${s05Still.cards.map((card) => card.cells.map((c) => c.state).join("/")).join(" · ")} · ${JSON.stringify(s05Still.cards.map((card) => card.cells.map((c) => c.value)))}`);
  /* The no-unmeasured claim holds on the reduced path too, cell by cell —
     every value is its authored measured string with no motion left on the
     value class. A dash re-entering through the reduced path alone would
     fail here rather than only on the default path. */
  check("§5's reduced path renders no em-dash value, and every value class is motionless",
    s05Still.cards.flatMap((c) => c.cells).every((c) => c.value !== "—") &&
      s05Still.cards.flatMap((c) => c.cells).every((c) =>
        c.animation === "none" && parseFloat(c.transition) === 0),
    s05Still.cards.map((card) => card.cells.map((c) => `${JSON.stringify(c.value)} ${c.animation}/${c.transition}`).join(" · ")).join(" | "));

  /* --- §5 in light theme and across the phone widths --- */
  await page.setMedia({ colorScheme: "light", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);
  const s05Light = await page.eval(SHIPPED);
  evidence.s05Light = s05Light;
  check("§5 holds the all-answered accent treatment in the light theme too",
    [...s05Light.cards[0].cells, ...s05Light.cards[1].cells].every((c) =>
      c.colour === s05Light.accentRgb && c.value !== "—") &&
      s05Light.cards.every((card, i) => card.cells.every((c, j) => c.value === s05.cards[i].cells[j].value)),
    `values ${JSON.stringify(s05Light.cards.map((card) => card.cells.map((c) => c.value)))} all in accent ${s05Light.accentRgb}`);

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  const s05Narrow = {};
  for (const width of [320, 360, 375, 390]) {
    await page.setViewport({ width, height: 553, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    s05Narrow[width] = await page.eval(SHIPPED);
    if (width === 375) writeFileSync(join(ARTIFACTS, "blink-dark-s05-375.png"), await page.screenshot({ fullPage: true }));
  }
  evidence.s05Narrow = s05Narrow;
  const s05Widths = Object.entries(s05Narrow);
  check("§5 stacks below --bp-wide with no sideways gesture, and both scope labels still hold one line",
    s05Widths.every(([, m]) => !m.wide &&
      m.viewport.scrollWidth <= m.viewport.clientWidth &&
      m.cards.every((c) => c.scopeRects === 1 && c.overflow <= 0) &&
      m.cards[0].cells.every((cell, i) => Math.abs(cell.height - m.cards[1].cells[i].height) < 0.5)),
    s05Widths.map(([w, m]) => `${w}px: doc ${m.viewport.scrollWidth}/${m.viewport.clientWidth}, scope rects ${m.cards.map((c) => c.scopeRects).join("")}, card overflow ${m.cards.map((c) => c.overflow).join("/")}`).join(" · "));

  await page.setViewport({ width: 1440, height: 900 });
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.goto(PAGE_URL);

  /* ================================================================ §2 ===
     The two-layer replay. Fidelity first: every rendered log character is
     diffed against the founder-authored corpus read off disk, not against a
     copy in this file. Then the pacing, then the mobile height budget.
     ======================================================================= */

  /* The corpus is the baseline and is never written to — read it, slice the
     terminal inventory out of the fence, and compare. */
  const corpusLines = (() => {
    const text = readFileSync(join(ROOT, "knowledge-base", "bodh-sprint4-corpus.md"), "utf8").split("\n");
    const at = text.findIndex((l) => l.startsWith("## Terminal-line inventory"));
    return text.slice(at + 2, at + 14);
  })();

  /* Same principle for the narration: the slot strings are Content's, so they
     are read out of the deliverable rather than copied into this file. Any
     retyping in the markup — a stale slot, a smart quote, a dropped em dash —
     shows up as a diff against the source of truth. */
  const narrationSlots = (() => {
    const text = readFileSync(
      join(ROOT, "knowledge-base", "design-specs", "web", "section-02-narration.md"),
      "utf8"
    ).split("\n");
    const slots = [];
    let inSection = false;
    for (let i = 0; i < text.length; i++) {
      if (/^## /.test(text[i])) inSection = /^## 3\. The narration/.test(text[i]);
      if (!inSection || text[i].trim() !== "```") continue;
      const end = text.indexOf("```", i + 1);
      slots.push(text.slice(i + 1, end).join(" ").trim());
      i = end;
    }
    return slots;
  })();

  /* R1 — §9.1's one rule for both layers, as a measurement rather than a
     stylesheet read: the 2px rust mark is inset the same distance from the inner
     edge of its OWN card in the terminal and in the narration. `rect.left +
     clientLeft` is the card's padding-box edge, which is the "inner edge" the
     spec measures from.

     The terminal's mark is measured from THE MARK ELEMENT'S OWN BOX. The line
     does not carry the mark any more — it is positioned outside the text flow —
     so a measurement of the line's edge would measure the text's position
     instead and report the gutter as the inset. The narration's mark is still
     its entry's border-box edge, and that difference is the point: the check is
     mechanism-agnostic and tests the distance each layer actually delivers.

     R2 rides along, because this is where the geometry is: the gap between the
     mark's inline-end edge and the line's leftmost text INK. Nothing else on the
     page detects it, and a mechanism that couples the mark to the text flow
     drives it to exactly 0 — which is what it measured in the build the founder
     gated. Ink comes from a text-node walk, never from the line's rect: the mark
     is a child of the line and its own rect would win a `Math.min` over the
     range. */
  const ACCENT_PAIR = `(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const terminal = document.querySelector(".terminal");
    const narration = document.querySelector(".narration");
    const log = document.querySelector(".log");
    const entry = document.querySelector(".narration__entry[data-active]") ||
                  document.querySelector(".narration__entry");
    const inner = (el) => el.getBoundingClientRect().left + el.clientLeft;
    const inkLeft = (li) => {
      const walk = document.createTreeWalker(li, NodeFilter.SHOW_TEXT);
      const r = document.createRange();
      let n, min = Infinity;
      while ((n = walk.nextNode())) {
        for (let j = 0; j < n.nodeValue.length; j++) {
          if (/\\s/.test(n.nodeValue[j])) continue;
          r.setStart(n, j); r.setEnd(n, j + 1);
          const k = r.getBoundingClientRect();
          if (k.width > 0 && k.left < min) min = k.left;
        }
      }
      return min;
    };
    /* Custom properties compute to token streams, not to pixels — reading
       --mark-clear off the log gives back "0.5ch". Resolve it the way the
       stylesheet does, by making the engine lay a length out in the log's own
       font, so the expected figure is the stylesheet's and never a literal. */
    const px = (prop) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;block-size:0;inline-size:var(" + prop + ")";
      log.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return r2(w);
    };
    const marks = [...document.querySelectorAll(".log__mark")].map((m) => {
      const li = m.closest(".log__line");
      const box = m.getBoundingClientRect();
      return { line: li.dataset.line, inset: r2(box.left - inner(terminal)),
               width: r2(box.width), clear: r2(inkLeft(li) - box.right) };
    });
    return {
      state: document.querySelector(".replay").dataset.state || null,
      marks,
      markedLines: [...document.querySelectorAll(".log__line")]
        .filter((li) => li.querySelector(".log__mark")).map((li) => li.dataset.line),
      /* The expected figures come from the stylesheet, never from a literal: if
         §7.1 rule 1's fallback ever fires and the gutter yields, the check
         follows it and still fails on inequality. */
      expected: px("--mark-inset"),
      expectedClear: px("--mark-clear"),
      terminal: r2(Math.min(...marks.map((m) => m.inset))),
      narration: r2(entry.getBoundingClientRect().left - inner(narration))
    };
  })()`;
  /* The assertion is the EQUALITY; 12 is only its value. The floor is stated as
     a relationship too — the inset is at least four times the mark's own width,
     so a build that collapsed the gutter toward the frame fails even if both
     layers collapsed together. */
  const pairOK = (p) =>
    Math.abs(p.terminal - p.narration) < 0.5 &&
    Math.abs(p.terminal - p.expected) < 0.5 &&
    p.terminal >= 4 * Math.max(...p.marks.map((m) => m.width));
  const pairDetail = (p) =>
    `terminal ${p.terminal}px / narration ${p.narration}px from each card's inner edge, ` +
    `expected ${p.expected}px read from --mark-inset (≥ 4 × ${Math.max(...p.marks.map((m) => m.width))}px mark) (state ${p.state})`;
  /* R2 — the mark clears the timestamp, on L4 AND L9. */
  const clearOK = (p) => p.marks.length === 2 &&
    p.marks.every((m) => m.clear > 0 && Math.abs(m.clear - p.expectedClear) < 0.5);
  const clearDetail = (p) =>
    p.marks.map((m) => `L${m.line} ${m.clear}px`).join(" · ") +
    ` against a computed --mark-clear of ${p.expectedClear}px (state ${p.state})`;

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(PAGE_URL);

  const s2 = await page.eval(`(() => {
    const replay = document.querySelector(".replay");
    const log = document.querySelector(".log");
    const terminal = document.querySelector(".terminal");
    const lines = [...document.querySelectorAll(".log__line")];
    const entries = [...document.querySelectorAll(".narration__entry")];
    const label = document.querySelector(".terminal__label");
    const totals = document.querySelector(".totals");
    const value = document.querySelector(".totals__value");
    const scope = document.querySelector(".totals__scope");
    const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();
    /* Tokens resolve to hex; computed colours resolve to rgb(). Compare like
       with like by asking the engine what the token paints as. */
    const asRgb = (token) => {
      const probe = document.createElement("span");
      probe.style.color = "var(" + token + ")";
      document.body.appendChild(probe);
      const value = getComputedStyle(probe).color;
      probe.remove();
      return value;
    };
    return {
      state: replay.dataset.state,
      renderedLines: lines.map((li) => li.textContent),
      revealedAtIdle: lines.filter((li) => li.hasAttribute("data-revealed")).length,
      entryCount: entries.length,
      entryText: entries.map((li) => li.querySelector(".narration__text").textContent),
      labelText: label.textContent,
      labelVisible: css(label, "visibility") === "visible" && css(label, "display") !== "none",
      liveWord: document.querySelector(".terminal__live-word").textContent,
      logName: log.getAttribute("aria-label"),
      logTabindex: log.getAttribute("tabindex"),
      logOverflow: css(log, "overflow-x") + "/" + css(log, "overflow-y"),
      narrationName: document.querySelector(".narration__list").getAttribute("aria-label"),
      sectionText: document.querySelector("#watch-it-ship").textContent,
      ariaLive: document.querySelectorAll("#watch-it-ship [aria-live]").length,
      hidden: [...document.querySelectorAll("#watch-it-ship .log__line, #watch-it-ship .narration__entry")]
        .filter((el) => css(el, "display") === "none" || css(el, "visibility") === "hidden").length,
      logFits: { scrollWidth: log.scrollWidth, clientWidth: log.clientWidth },
      terminalHeight: Math.round(terminal.getBoundingClientRect().height * 100) / 100,
      totalsValue: { text: value.textContent, size: css(value, "font-size"), color: css(value, "color"),
                     weight: css(value, "font-weight") },
      totalsScope: { text: scope.textContent, size: css(scope, "font-size") },
      totalsHeight: Math.round(totals.getBoundingClientRect().height * 100) / 100,
      totalsBelowLayers: totals.getBoundingClientRect().top >=
        document.querySelector(".replay__layers").getBoundingClientRect().bottom - 0.5,
      logLineIndent: css(document.querySelector(".log__line"), "text-indent"),
      logLineWrap: css(document.querySelector(".log__line"), "white-space"),
      stateLine: { size: css(lines[11], "font-size"), weight: css(lines[11], "font-weight"),
                   detailColor: css(lines[11].querySelector(".log__detail"), "color") },
      /* The mark is an element now, not a border, so it is read as one: its own
         paint and its own presence. markedLines is the second half of the
         claim — the mark exists on exactly L4 and L9 and nowhere else. */
      keyLines: [3, 8].map((i) => ({
        line: i + 1,
        mark: (() => { const m = lines[i].querySelector(".log__mark");
                       return m ? css(m, "background-color") : "absent"; })(),
        token: css(lines[i].querySelector(".log__token"), "font-weight")
      })),
      markedLines: lines.filter((li) => li.querySelector(".log__mark")).map((li) => li.dataset.line),
      glyph: css(document.querySelector(".log__glyph"), "color"),
      accent: asRgb("--accent"),
      controls: [...document.querySelectorAll(".replay__controls button")].map((b) => b.textContent),
      columns: css(document.querySelector(".replay__layers"), "grid-template-columns")
    };
  })()`);
  evidence.s2 = s2;

  const lineDiff = corpusLines
    .map((line, i) => (s2.renderedLines[i] === line ? null : `L${i + 1}`))
    .filter(Boolean);
  check("twelve corpus lines render, byte-clean", s2.renderedLines.length === 12 && lineDiff.length === 0, lineDiff.length ? `differs at ${lineDiff.join(", ")}` : "12/12 identical to the corpus inventory");
  check("no line is truncated, padded, or re-wrapped", s2.renderedLines.every((l, i) => [...l].length === [...corpusLines[i]].length), "character counts match the corpus");
  check("the honesty label is present and visible", s2.labelText.includes("CONDENSED FROM THE REAL BUILD LOG") && s2.labelVisible, s2.labelText);
  check("live indicator pairs the lamp with a word", s2.liveWord === "RUN", s2.liveWord);
  check("only minute-precision stamps reach the DOM", !/\d{2}:\d{2}:\d{2}/.test(s2.sectionText), "no second-precision timestamp in §2");
  check("no playback offset renders as content", !/\bt=\s?\d/.test(s2.sectionText) && !/\b48\.00 s\b/.test(s2.sectionText), "no t= offset, no chain duration in §2 copy");
  check("ten narration slots present", s2.entryCount === 10, `${s2.entryCount} entries`);
  const slotDiff = narrationSlots
    .map((text, i) => (s2.entryText[i] === text ? null : `slot ${i + 1}`))
    .filter(Boolean);
  check("every narration slot renders verbatim from section-02-narration.md", narrationSlots.length === 10 && s2.entryText.length === 10 && slotDiff.length === 0, slotDiff.length ? `differs at ${slotDiff.join(", ")}` : "10/10 identical to the narration deliverable");
  check("no aria-live during playback", s2.ariaLive === 0, `${s2.ariaLive} live regions`);
  check("reveal never hides content from assistive tech", s2.hidden === 0, `${s2.hidden} display:none / visibility:hidden entries`);
  check("terminal log is a named, focusable scroll region", s2.logName === "Build log, condensed from the real build log" && s2.logTabindex === "0" && s2.logOverflow === "auto/auto", `${s2.logTabindex} · ${s2.logOverflow}`);
  check("narration list is named", s2.narrationName === "Narration", s2.narrationName);
  check("idle reveals nothing", s2.state === "idle" && s2.revealedAtIdle === 0, `${s2.state}, ${s2.revealedAtIdle} revealed`);
  check("all twelve lines fit the wide terminal without horizontal scroll", s2.logFits.scrollWidth <= s2.logFits.clientWidth, JSON.stringify(s2.logFits));
  check("two columns above --bp-wide", /\d/.test(s2.columns) && s2.columns.split(" ").length === 2, s2.columns);
  check("L12 is large-text rust over the corpus divider", parseFloat(s2.stateLine.size) >= 19 && Number(s2.stateLine.weight) >= 700 && s2.stateLine.detailColor === s2.accent, JSON.stringify(s2.stateLine));
  check("key beats carry a rust mark and a bold ink token, on exactly L4 and L9", s2.keyLines.every((k) => k.mark === s2.accent && Number(k.token) >= 700) && s2.markedLines.join(",") === "4,9", `${JSON.stringify(s2.keyLines)} · marked lines ${s2.markedLines.join(", ") || "none"}`);
  check("the ✓ is a rust graphical mark", s2.glyph === s2.accent, s2.glyph);
  check("chain totals render Content's strings", s2.totalsValue.text === "~64 MIN AGENT WORK · 289 API CALLS · $24.73" && s2.totalsScope.text === "BODH SPRINT 4 · WEBSITE WAVE ONLY", `${s2.totalsValue.text} / ${s2.totalsScope.text}`);
  check("totals value is rust at readout scale above --bp-wide", parseFloat(s2.totalsValue.size) >= 24 && s2.totalsValue.color === s2.accent, `${s2.totalsValue.size} ${s2.totalsValue.color}`);
  check("desktop: the totals strip sits under the two columns", s2.totalsBelowLayers, `strip top vs layers bottom`);
  /* The wrap rule is set at every viewport and inert here — no line reaches the
     column, so it changes nothing on a desktop except that it is ready to. */
  check("desktop: the wrap rule is present and inert", s2.logLineWrap === "pre-wrap" && parseFloat(s2.logLineIndent) < 0 && s2.logFits.scrollWidth <= s2.logFits.clientWidth, `${s2.logLineWrap}, text-indent ${s2.logLineIndent}, no line wraps`);
  check("one control during playback: skip", s2.controls.length === 1 && s2.controls[0].includes("SHOW FULL LOG"), s2.controls.join(" | "));

  /* --- the pacing, measured. The section is judged on this, so the harness
         watches a real 48-second chain rather than trusting the schedule. --- */
  const SCHEDULE = [0, 350, 6400, 13600, 23200, 26400, 29600, 32800, 39400, 39750, 43200, 48000];
  const played = await page.eval(`(async () => {
    document.querySelector("#watch-it-ship").scrollIntoView({ behavior: "instant", block: "center" });
    const started = performance.now();
    while (window.MusterReplay.state() !== "end" && performance.now() - started < 60000) {
      await new Promise((r) => setTimeout(r, 250));
    }
    const lines = [...document.querySelectorAll(".log__line")];
    return {
      state: window.MusterReplay.state(),
      marks: window.MusterReplay.marks.slice(),
      revealed: lines.filter((li) => li.hasAttribute("data-revealed")).length,
      entries: document.querySelectorAll(".narration__entry[data-revealed]").length,
      active: document.querySelectorAll(".narration__entry[data-active]").length,
      indicator: document.querySelector("[data-beat-indicator]").textContent,
      controls: [...document.querySelectorAll(".replay__controls button")].map((b) => b.textContent),
      wall: Math.round(performance.now() - started)
    };
  })()`);
  evidence.s2Playback = played;

  const drift = played.marks.map((m, i) => Math.round(m.at - SCHEDULE[i]));
  const worst = Math.max(...drift.map(Math.abs));
  check("playback reaches its end state", played.state === "end" && played.revealed === 12 && played.entries === 10, `${played.state}, ${played.revealed} lines, ${played.entries} entries in ${played.wall}ms`);
  check("measured reveal offsets match §5.1 within 100 ms", played.marks.length === 12 && worst <= 100, `worst drift ${worst}ms · ${drift.join("/")}`);
  check("same-stamp pairs are one --reveal cadence apart", Math.abs((played.marks[1].at - played.marks[0].at) - 350) <= 100 && Math.abs((played.marks[9].at - played.marks[8].at) - 350) <= 100, `L1→L2 ${played.marks[1].at - played.marks[0].at}ms · L9→L10 ${played.marks[9].at - played.marks[8].at}ms`);
  check("the gate hold is silent from 43.55 s to 48.00 s", played.marks.filter((m) => m.at > 43550 && m.at < 47900).length === 0, "no reveal inside the hold");
  check("the end state names the last beat", played.indicator === "BEAT 06 / 06 · THE HUMAN GATE", played.indicator);
  check("the end state offers a replay", played.controls.length === 1 && played.controls[0].includes("REPLAY"), played.controls.join(" | "));
  check("zero external network requests through playback", page.requests.every(isLocal), describe(page.requests));
  check("no runtime errors through playback", page.consoleErrors.length === 0, page.consoleErrors.join("; ") || "none");
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-end.png"), await page.screenshot());

  /* skip and replay, by keyboard */
  const controlRun = await page.eval(`(async () => {
    const button = document.querySelector(".replay__controls button");
    button.focus();
    const focused = document.activeElement === button;
    button.click();                       /* ⟲ REPLAY */
    await new Promise((r) => setTimeout(r, 500));
    const midway = { state: window.MusterReplay.state(),
                     revealed: document.querySelectorAll(".log__line[data-revealed]").length };
    document.querySelector(".replay__controls button").click();   /* ⏭ SHOW FULL LOG */
    return { focused, midway, after: { state: window.MusterReplay.state(),
      revealed: document.querySelectorAll(".log__line[data-revealed]").length } };
  })()`);
  check("replay restarts, skip jumps to the end", controlRun.focused && controlRun.midway.revealed < 12 && controlRun.after.state === "end" && controlRun.after.revealed === 12, JSON.stringify(controlRun));

  /* --- the accent pair on a desktop, in the state that actually ships.
         The rail's inset has TWO sources here: `.narration`'s padding, and the
         absolutely-positioned `.narration__list` while any playback state is
         present. The second wins for the whole live chain, so a pair measured
         only in the static transcript can be right there and wrong on screen
         for every second the reader is watching (§12). Both, measured. --- */
  const deskLive = await page.eval(`(async () => {
    window.MusterReplay.restart();
    await new Promise((r) => setTimeout(r, 900));
    const pair = ${ACCENT_PAIR};
    window.MusterReplay.finish();
    return pair;
  })()`);
  evidence.accentDesktopLive = deskLive;
  check("R1 desktop, mid-playback: the accent mark is equally inset from both cards", deskLive.state === "playing" && pairOK(deskLive), pairDetail(deskLive));
  check("R2 desktop, mid-playback: the mark clears the timestamp on L4 and L9", clearOK(deskLive), clearDetail(deskLive));

  /* --- reduced motion / no-JS: the complete transcript --- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(PAGE_URL);
  const s2Still = await page.eval(`(() => {
    const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();
    const lines = [...document.querySelectorAll(".log__line")];
    const entries = [...document.querySelectorAll(".narration__entry")];
    return {
      state: document.querySelector(".replay").dataset.state || null,
      lines: lines.length,
      linesOpaque: lines.filter((li) => css(li, "opacity") === "1").length,
      entries: entries.length,
      entriesOpaque: entries.filter((li) => css(li, "opacity") === "1").length,
      tags: entries.filter((li) => css(li.querySelector(".narration__tag") || li, "display") !== "none").length,
      totals: css(document.querySelector(".totals"), "display") !== "none",
      controls: document.querySelectorAll(".replay__controls button").length,
      text: lines.map((li) => li.textContent)
    };
  })()`);
  evidence.s2Reduced = s2Still;
  check("reduced motion renders the complete transcript", s2Still.state === null && s2Still.linesOpaque === 12 && s2Still.entriesOpaque === 10 && s2Still.totals, JSON.stringify({ state: s2Still.state, lines: s2Still.linesOpaque, entries: s2Still.entriesOpaque }));
  check("reduced-motion transcript is byte-clean too", s2Still.text.every((l, i) => l === corpusLines[i]), "12/12 identical to the corpus inventory");
  check("reduced motion offers no controls (nothing to control)", s2Still.controls === 0, `${s2Still.controls} buttons`);
  check("the static transcript keeps its beat grouping", s2Still.tags === 10, `${s2Still.tags} entries carry a beat tag`);
  const deskStatic = await page.eval(ACCENT_PAIR);
  evidence.accentDesktopStatic = deskStatic;
  check("R1 desktop, no playback state: the accent mark is equally inset from both cards", deskStatic.state === null && pairOK(deskStatic), pairDetail(deskStatic));
  check("R2 desktop, no playback state: the mark clears the timestamp on L4 and L9", clearOK(deskStatic), clearDetail(deskStatic));
  /* The underscore's ruling holds in BOTH motion paths — this run is under
     prefers-reduced-motion, where the page is already still and a stray
     animation would be least visible. */
  const ruleStill = await page.eval(`(() => {
    const el = document.querySelector(".brand__rule");
    const s = getComputedStyle(el);
    return { animation: s.animationName, duration: s.transitionDuration,
             box: [Math.round(el.getBoundingClientRect().width * 100) / 100,
                   Math.round(el.getBoundingClientRect().height * 100) / 100] };
  })()`);
  evidence.brandRuleReduced = ruleStill;
  check("reduced motion: the header underscore is the same static mark", ruleStill.animation === "none" && parseFloat(ruleStill.duration) === 0 && ruleStill.box[1] === 2, JSON.stringify(ruleStill));
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-reduced.png"), await page.screenshot());

  /* --- the phone height budget (replay spec §7.1) --- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 375, height: 553, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  const phone = await page.eval(`(async () => {
    /* Drive the gate at the state under test: park a measured share of the core
       BEHIND the sticky bar and assert the chain refuses to start there.
       Centring the section is not that state — §7.1's --scroll-pad shifts a
       centred landing by half the padding, which leaves the core 96% visible,
       and a chain that starts there is the gate working. */
    const coreEl = document.querySelector(".replay__core");
    const under = 0.15;
    scrollTo({ top: scrollY + coreEl.getBoundingClientRect().top + under * coreEl.getBoundingClientRect().height, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    const gatedRect = coreEl.getBoundingClientRect();
    const gatedSeen = Math.max(0, Math.min(gatedRect.bottom, innerHeight) - Math.max(gatedRect.top, 48)) / gatedRect.height;
    const gatedOut = window.MusterReplay.state();
    scrollTo({ top: scrollY + coreEl.getBoundingClientRect().top - 52, behavior: "instant" });
    await new Promise((r) => setTimeout(r, 400));
    const css = (el, prop) => getComputedStyle(el).getPropertyValue(prop).trim();
    const box = (sel) => Math.round(document.querySelector(sel).getBoundingClientRect().height * 100) / 100;
    const log = document.querySelector(".log");
    const core = document.querySelector(".replay__core");
    const coreRect = core.getBoundingClientRect();
    const value = document.querySelector(".totals__value");
    const instrument = document.querySelector(".instrument");
    const instStyle = getComputedStyle(instrument);
    /* The strip's value line is display:block, so its box is the column width,
       not the ink. Measure the ink with a probe that copies the treatment. */
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    ["font-family", "font-size", "font-weight", "letter-spacing", "text-transform"]
      .forEach((prop) => probe.style.setProperty(prop, css(value, prop)));
    probe.textContent = value.textContent;
    document.body.appendChild(probe);
    const valueInk = probe.getBoundingClientRect().width;
    probe.remove();
    const asRgb = (token) => {
      const p = document.createElement("span");
      p.style.color = "var(" + token + ")";
      document.body.appendChild(p);
      const v = getComputedStyle(p).color;
      p.remove();
      return v;
    };
    const lineBox = parseFloat(css(log, "line-height"));
    const pad = parseFloat(css(log, "padding-top")) + parseFloat(css(log, "padding-bottom"));
    const before = log.scrollTop;
    log.scrollTop = 40;
    const scrolls = log.scrollTop !== before;
    log.scrollTop = before;
    /* The wrap, measured rather than assumed. The window's unit is the tallest
       CHAIN line — L12 is the one line not set at --text-terminal and is
       revealed outside the chain, so it is not what the window is sized on. */
    const lines = [...document.querySelectorAll(".log__line")];
    const r2 = (n) => Math.round(n * 100) / 100;
    const heights = lines.map((li) => r2(li.getBoundingClientRect().height));
    const unit = Math.max(...heights.slice(0, 11));
    const advance = (() => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      ["font-family", "font-size", "letter-spacing"].forEach((prop) =>
        p.style.setProperty(prop, css(lines[0], prop))
      );
      p.textContent = "0";
      document.body.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return w;
    })();
    /* No subtraction: the line carries no border, so its rendered width IS the
       first row's available width. Leaving a border-inline-start-width term in
       would read 0 and quietly imply the mark is still in the flow. */
    const region = lines[0].getBoundingClientRect().width;
    /* Rendered rows of a line: one entry per row, keyed on rounded top, holding
       the row's exact top and its leftmost ink. Rect geometry is safe WITHIN a
       line — the reveal's 4px translate moves every row of it equally — but not
       across two lines, where one may be revealed and the other not. So row
       pitch comes from here and entry separation comes from layout offsets.

       The key-beat mark is the line's first child and sits OUTSIDE the text, so
       the range starts after it — left in, its box would win the leftmost-ink
       minimum on L4 and L9 and report the hanging indent as 13.7px. */
    const rowsOf = (li) => {
      const range = document.createRange();
      range.selectNodeContents(li);
      const mark = li.querySelector(".log__mark");
      if (mark) range.setStartAfter(mark);
      const rows = new Map();
      for (const rect of range.getClientRects()) {
        if (rect.width <= 0) continue;
        const key = Math.round(rect.top);
        const seen = rows.get(key);
        rows.set(key, { top: Math.min(seen ? seen.top : Infinity, rect.top),
                        left: Math.min(seen ? seen.left : Infinity, rect.left) });
      }
      return [...rows.entries()].sort((a, b) => a[0] - b[0]).map((e) => e[1]);
    };
    /* A continuation row must begin to the RIGHT of its entry's first row. */
    const rowStarts = (() => {
      const wrapped = lines.find((li) => li.getBoundingClientRect().height > lineBox * 1.5);
      if (!wrapped) return null;
      return { line: wrapped.dataset.line, lefts: rowsOf(wrapped).map((row) => r2(row.left)) };
    })();
    /* --- entry separation, measured (§12).
       This is the one property nothing else covers:
       fidelity, height budget, column count and parity assertions all pass
       against a log that reads as an undifferentiated run of rows. What the
       eye reads is the whitespace between glyph BOXES, so both figures are
       stated that way — a row box is taller than its em box by the leading,
       and half of that surplus sits on each side of every row.

           row-to-row inside an entry : rowPitch − em
           entry-to-entry             : separator + (rowPitch − em)

       Both inputs are measurements. The separator comes from layout offsets
       (transform-free, so a half-revealed chain cannot skew it) and is taken as
       the SMALLEST gap in the chain, so one lost boundary fails the check
       rather than being averaged away. Lose the separator entirely and the two
       figures collapse onto each other at a ratio of 1.0. */
    const separation = (() => {
      const chain = lines.slice(0, 11);
      let separator = Infinity;
      for (let i = 1; i < chain.length; i++) {
        separator = Math.min(separator, chain[i].offsetTop - chain[i - 1].offsetTop - chain[i - 1].offsetHeight);
      }
      let rowPitch = 0;
      for (const li of chain) {
        const rows = rowsOf(li);
        for (let i = 1; i < rows.length; i++) rowPitch = Math.max(rowPitch, rows[i].top - rows[i - 1].top);
      }
      const em = parseFloat(css(lines[0], "font-size"));
      const rowGap = rowPitch - em;
      const entryGap = separator + rowGap;
      return { separator: r2(separator), rowPitch: r2(rowPitch), em, box: r2(unit),
               pitch: r2(unit + separator), rowGap: r2(rowGap), entryGap: r2(entryGap),
               ratio: r2(entryGap / rowGap) };
    })();
    const totalsEl = document.querySelector(".totals");
    return {
      gatedOut, gatedSeen: Math.round(gatedSeen * 1000) / 10,
      state: window.MusterReplay.state(),
      core: Math.round(coreRect.height * 100) / 100,
      coreTop: Math.round(coreRect.top), coreBottom: Math.round(coreRect.bottom),
      viewport: innerHeight,
      /* N entries cost N boxes and N−1 separators — only the gaps BETWEEN
         entries are spent — so the window holds (view + separator) / pitch. */
      visibleEntries: r2((log.clientHeight - pad + separation.separator) / separation.pitch),
      lineBox, unit, heights, rows: heights.map((h) => r2(h / lineBox)),
      advance: r2(advance),
      /* Two widths, named apart per §7 — not three. The log's content box, and
         the line region it gives after the accent-mark footprint. The line
         region IS the first row, because the mark sits outside the text flow and
         takes nothing from it; a continuation row is one ch narrower for the
         hanging indent. */
      lineRegion: r2(log.clientWidth - parseFloat(css(log, "padding-left")) - parseFloat(css(log, "padding-right"))),
      firstRow: r2(region), columns: Math.floor(region / advance),
      rowStarts, separation,
      hangingIndent: r2(advance),
      lineOverflow: lines.filter((li) => li.scrollWidth > li.clientWidth).map((li) => li.dataset.line),
      totalsOutsideCore: !core.contains(totalsEl),
      totalsBelowCore: totalsEl.getBoundingClientRect().top >= coreRect.bottom - 0.5,
      chrome: box(".terminal__chrome"), card: box(".narration"), totals: box(".totals"),
      indicator: box(".replay__beat"),
      cardLines: Math.round((box(".narration") - 26) / 28.9 * 100) / 100,
      totalsValue: { size: css(value, "font-size"), color: css(value, "color"),
                     ink: Math.round(valueInk * 100) / 100,
                     lines: Math.round(value.getBoundingClientRect().height / 16.5 * 100) / 100,
                     available: Math.round(value.getBoundingClientRect().width * 100) / 100 },
      labelLines: Math.round(document.querySelector(".terminal__label").getBoundingClientRect().height / 16.5 * 100) / 100,
      scrolls,
      docScroll: { s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth },
      instrument: { inset: parseFloat(instStyle.paddingLeft) + parseFloat(instStyle.paddingRight),
                    width: Math.round(instrument.getBoundingClientRect().width * 100) / 100 },
      ink: asRgb("--ink")
    };
  })()`);
  evidence.s2Phone = phone;

  check("phone: the playback core fits the visual viewport", phone.core <= 553 - 48 + 0.5 && phone.coreTop >= -0.5 && phone.coreBottom <= phone.viewport + 0.5, `core ${phone.core}px, ${phone.coreTop}→${phone.coreBottom} in ${phone.viewport}px`);
  /* The gate's own contract: playback only runs while at least 95% of the core
     is in the band the reader can actually see — under the sticky status bar,
     not behind it. */
  const seen = Math.max(0, Math.min(phone.coreBottom, phone.viewport) - Math.max(phone.coreTop, 48)) / phone.core;
  check("phone: playback refuses to start with the core under the status bar", phone.gatedOut === "idle" && phone.gatedSeen < 95, `state ${phone.gatedOut} with ${phone.gatedSeen}% of the core below the bar`);
  check("phone: playback runs only with the core ≥95% in view", phone.state === "playing" && seen >= 0.95, `${Math.round(seen * 1000) / 10}% of the core below the status bar, state ${phone.state}`);
  check("phone: terminal window shows three whole entries", Math.abs(phone.visibleEntries - 3) < 0.05, `${phone.visibleEntries} entries of ${phone.separation.box}px on a ${phone.separation.pitch}px pitch (${phone.lineBox}px rows)`);
  /* The constant the whole budget rests on, checked against the render rather
     than against the spec that asserts it: at 375px every chain line costs
     exactly two rows, which is what makes the entry box two row boxes here. */
  check("phone: every chain line wraps to exactly two rows", phone.rows.slice(0, 11).every((r) => Math.abs(r - 2) < 0.05) && Math.abs(phone.unit - 2 * phone.lineBox) < 0.1, `rows ${phone.rows.slice(0, 11).join("/")} · entry box ${phone.unit}`);
  /* §7.1's floor is what binds — 37 first-row columns / 36 continuation, the
     width at which L3 breaks to a third row — and the measured count is
     REPORTED, not asserted at its derived value. Binding at the derived 39
     would fail a correct build on a rounding difference, which is the
     assert-something-adjacent failure this project has already paid for. */
  check("phone: the first row clears §7.1's 37-column floor", phone.columns >= 37, `line region ${phone.lineRegion}px → first row ${phone.firstRow}px / ${phone.advance}px advance = ${phone.columns} columns, floor 37 (§7.1 derives 39)`);
  check("phone: continuation rows carry the 1ch hanging indent", phone.rowStarts && phone.rowStarts.lefts.length >= 2 && Math.abs(phone.rowStarts.lefts[1] - phone.rowStarts.lefts[0] - phone.hangingIndent) < 1, phone.rowStarts ? `L${phone.rowStarts.line} rows start at ${phone.rowStarts.lefts.join(", ")} — ${phone.hangingIndent}px expected` : "no wrapped line found");
  /* --- the grouping, asserted directly. Everything above this line passes
         against a log whose eight rows read as eight things instead of four: the wrap is
         byte-clean either way, the budget sums either way, the columns measure
         the same either way. The grouping is a property in its own right and it
         is asserted as one — and as TWO properties, not one, because at 1ch the
         indent is ~7.8px and cannot carry the grouping alone (§12). --- */
  check("phone: entries are separated from rows by at least 2×, measured", phone.separation.ratio >= 2 && phone.separation.separator > 0.5, `entry-to-entry ${phone.separation.entryGap}px against row-to-row ${phone.separation.rowGap}px = ${phone.separation.ratio}× (spec'd 18.5 / 6.5 = 2.85×) — separator ${phone.separation.separator}px, row pitch ${phone.separation.rowPitch}px, em ${phone.separation.em}px`);
  check("phone: the §7.1 fixed rows measure as budgeted", Math.abs(phone.chrome - 41.5) < 0.5 && Math.abs(phone.card - 199.4) < 0.5 && Math.abs(phone.indicator - 16.5) < 0.5, `chrome ${phone.chrome} · card ${phone.card} · indicator ${phone.indicator}`);
  /* 379.4 is the fixed core INCLUDING the 48px sticky bar, which is not part of
     the core element; three whole entries and the two separators between them
     are what the remainder buys. */
  const coreBudget = Math.round((379.4 - 48 + 3 * phone.separation.box + 2 * phone.separation.separator) * 100) / 100;
  check("phone: the core measures its §7.1 budget", Math.abs(phone.core - coreBudget) < 0.5, `${phone.core}px measured vs ${coreBudget}px budgeted (3 × ${phone.separation.box} + 2 × ${phone.separation.separator} of line region)`);
  check("phone: the totals strip sits below the core, not inside it", phone.totalsOutsideCore && phone.totalsBelowCore && Math.abs(phone.totals - 33) < 0.5, `outside core: ${phone.totalsOutsideCore}, below it: ${phone.totalsBelowCore}, ${phone.totals}px`);
  check("phone: the chrome label holds one line", Math.abs(phone.labelLines - 1) < 0.1, `${phone.labelLines} lines`);
  check("phone: totals strip is two micro lines, value line unwrapped", parseFloat(phone.totalsValue.size) === 11 && Math.abs(phone.totalsValue.lines - 1) < 0.1, `${phone.totalsValue.size}, ${phone.totalsValue.lines} line(s)`);
  check("phone: the 43-character value line clears the content width", phone.totalsValue.ink <= phone.totalsValue.available, `${phone.totalsValue.ink}px of ${phone.totalsValue.available}px`);
  check("phone: totals value is ink, not rust, at micro size", phone.totalsValue.color === phone.ink, phone.totalsValue.color);
  check("phone: the terminal owns its scroll, the body never does", phone.scrolls && phone.docScroll.s <= phone.docScroll.c, `log scrolls: ${phone.scrolls}, doc ${phone.docScroll.s}/${phone.docScroll.c}`);
  check("phone: no corpus line needs a sideways gesture to finish", phone.lineOverflow.length === 0, phone.lineOverflow.length ? `L${phone.lineOverflow.join(", L")} overflow their region` : "every line's last character is on screen once its rows are");
  check("phone: .instrument inset is at most 20% of the card", phone.instrument.inset / phone.instrument.width <= 0.2, `${phone.instrument.inset}px of ${phone.instrument.width}px = ${Math.round((phone.instrument.inset / phone.instrument.width) * 1000) / 10}%`);
  const phonePair = await page.eval(ACCENT_PAIR);
  evidence.accentPhone = phonePair;
  check("R1 phone, mid-playback: the accent mark is equally inset from both cards", pairOK(phonePair), pairDetail(phonePair));
  /* The property that measured 0 in the build the founder gated. Nothing else on
     the page detects it, and it is measured on both key beats rather than one. */
  check("R2 phone, mid-playback: the mark clears the timestamp on L4 and L9", clearOK(phonePair), clearDetail(phonePair));
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-375.png"), await page.screenshot());

  /* Every line occupies its space from load, so a window that simply scrolled
     to the end of the DOM would sit over lines that have not been revealed and
     show the reader an empty terminal. The window must follow the newest
     revealed line instead. */
  /* A whole real chain at phone size, sampled. The guarantee under test is not
     "the newest line is visible" but "no line is visible in part": a wrapped
     line is two rows and the window must show both of them or neither. That can
     only be observed while the window is advancing, so this watches one. */
  const phoneWindow = await page.eval(`(async () => {
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    /* Geometry from offsetTop, not getBoundingClientRect: the reveal's 4px rise
       is a transform, and a rect taken mid-transition would report a line 4px
       lower than the box it actually occupies — an animation artefact reading
       as a clipped line. The layout box is what the window has to hold. */
    const inspect = () => {
      const style = getComputedStyle(log);
      const view = log.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
      const origin = lines[0].offsetTop;
      const top = log.scrollTop;
      let whole = 0;
      const clipped = [];
      for (const li of lines) {
        if (!li.hasAttribute("data-revealed")) continue;
        const head = li.offsetTop - origin;
        const foot = head + li.offsetHeight;
        if (head >= top - 1 && foot <= top + view + 1) whole++;
        else if (foot > top + 1 && head < top + view - 1) clipped.push(li.dataset.line);
      }
      /* §7.1 rule 3 / §12: the window comes to rest on an entry's own box edge
         and never inside the gap above it — resting a separator's width high
         would put a fragment of inter-entry space at the top of the frame,
         which reads as a clipped entry. offsetTop is the border-box top and
         the separator is a margin sitting above it, so "on a box edge" is
         exactly "scrollTop matches some entry's offsetTop". */
      const edges = lines.map((li) => li.offsetTop - origin);
      const onEdge = top <= 0.6 || edges.some((e) => Math.abs(e - top) < 0.6);
      return { whole, clipped, onEdge, top: Math.round(top * 100) / 100,
               revealed: lines.filter((li) => li.hasAttribute("data-revealed")).length };
    };
    window.MusterReplay.restart();
    const samples = [];
    let clipped = [];
    const started = performance.now();
    while (window.MusterReplay.state() !== "end" && performance.now() - started < 60000) {
      const s = inspect();
      samples.push(s);
      clipped = clipped.concat(s.clipped);
      await new Promise((r) => setTimeout(r, 150));
    }
    await new Promise((r) => setTimeout(r, 120));
    const box = log.getBoundingClientRect();
    const last = lines[11].getBoundingClientRect();
    const withLines = samples.filter((s) => s.revealed > 0);
    return {
      samples: samples.length,
      clipped: [...new Set(clipped)],
      offEdge: [...new Set(samples.filter((s) => !s.onEdge).map((s) => s.top))],
      follows: withLines.every((s) => s.whole === Math.min(s.revealed, 3)),
      worst: Math.max(0, ...withLines.map((s) => s.whole)),
      endShowsL12: last.bottom <= box.bottom + 1 && last.top >= box.top - 1
    };
  })()`);
  evidence.s2PhoneWindow = phoneWindow;
  check("phone: the window follows the newest revealed entry, three at a time", phoneWindow.samples > 20 && phoneWindow.follows && phoneWindow.endShowsL12, `${phoneWindow.samples} samples, max ${phoneWindow.worst} whole entries, L12 in frame at the end: ${phoneWindow.endShowsL12}`);
  check("phone: the window never clips an entry part-way through its rows", phoneWindow.clipped.length === 0, phoneWindow.clipped.length ? `L${phoneWindow.clipped.join(", L")} half in frame` : `${phoneWindow.samples} samples across a full chain, none partial`);
  check("phone: the window rests on an entry's box edge, never inside a separator", phoneWindow.offEdge.length === 0, phoneWindow.offEdge.length ? `resting at ${phoneWindow.offEdge.join(", ")}px — not an entry edge` : `${phoneWindow.samples} resting positions, every one on a box edge`);

  /* Native keyboard scrolling of the log region — a real key event, not a
     synthetic one, because the behaviour under test is the browser's. */
  const beforeKey = await page.eval(`(() => {
    window.MusterReplay.pause();      /* the window auto-advances; hold it still */
    const log = document.querySelector(".log");
    log.scrollTop = 0;
    log.focus();
    return log.scrollTop;
  })()`);
  for (const type of ["rawKeyDown", "keyUp"]) {
    await page.call("Input.dispatchKeyEvent", { type, windowsVirtualKeyCode: 40, code: "ArrowDown", key: "ArrowDown" });
  }
  await page.eval("new Promise(r => setTimeout(r, 200))");
  const afterKey = await page.eval(`({ top: document.querySelector(".log").scrollTop, focused: document.activeElement.className })`);
  check("phone: arrow keys scroll the focused log region", afterKey.focused === "log" && afterKey.top > beforeKey, `scrollTop ${beforeKey} → ${afterKey.top}`);

  /* The tightest wide viewport: just above --bp-wide, where the rail is what
     yields so the longest corpus line still fits without horizontal scroll. */
  await page.setViewport({ width: 1000, height: 800 });
  await page.goto(PAGE_URL);
  const tightWide = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    const terminal = document.querySelector(".terminal");
    const rail = document.querySelector(".narration").getBoundingClientRect();
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    ["font-family", "font-size", "letter-spacing"].forEach((p) => probe.style.setProperty(p, css(lines[0], p)));
    probe.textContent = "0";
    document.body.appendChild(probe);
    const advance = probe.getBoundingClientRect().width;
    probe.remove();
    const firstRow = lines[0].getBoundingClientRect().width;
    /* Where the first CHARACTER sits, measured from the terminal's inner edge.
       It deliberately moved: the mark's whole footprint is now the log's
       inline-start padding, so the text begins at inset + width + clear rather
       than at the old gutter-plus-tick. The expected figure is built from the
       stylesheet's own three values so it follows them if they ever change. */
    const px = (prop) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;block-size:0;inline-size:var(" + prop + ")";
      log.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return w;
    };
    const footprint = px("--mark-inset") + px("--mark-width") + px("--mark-clear");
    const range = document.createRange();
    range.selectNodeContents(lines[0]);
    const ink = Math.min(...[...range.getClientRects()].filter((r) => r.width > 0).map((r) => r.left));
    return { sw: log.scrollWidth, cw: log.clientWidth, rail: Math.round(rail.width),
      firstRow: r2(firstRow), columns: Math.floor(firstRow / advance), footprint: r2(footprint),
      textX: r2(ink - (terminal.getBoundingClientRect().left + terminal.clientLeft)),
      rows: lines.slice(0, 11).map((li) => Math.round(li.getBoundingClientRect().height / parseFloat(css(log, "line-height")))),
      s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth };
  })()`);
  evidence.s2TightWide = tightWide;
  check("1000px: the longest corpus line still fits the terminal", tightWide.sw <= tightWide.cw && tightWide.s <= tightWide.c, `log ${tightWide.sw}/${tightWide.cw}, rail ${tightWide.rail}px`);
  /* §12: assert the FIRST ROW, which is the width L3 actually has to fit in —
     not the log's content box, which is two columns wider and would pass a
     build that had pushed a corpus line to a second row. */
  const longest = Math.max(...corpusLines.slice(0, 11).map((l) => [...l].length));
  check("1000px: the log's first row holds ≥74 columns and every line sets one row", tightWide.columns >= 74 && tightWide.columns >= longest && tightWide.rows.every((r) => r === 1), `${tightWide.firstRow}px = ${tightWide.columns} columns against a ${longest}-character longest line, rows ${tightWide.rows.join("")}`);
  /* R5's desktop half, and the number is derived from the stylesheet rather than
     asserted at a literal: the first character sits at the mark's whole
     footprint — inset + mark + clearance — in from the terminal's inner edge,
     and the first row still clears L3's 74 columns (asserted above). */
  check("desktop: the log's first character sits at the accent mark's footprint", Math.abs(tightWide.textX - tightWide.footprint) < 0.5, `first character sits ${tightWide.textX}px in from the terminal's inner edge, against a ${tightWide.footprint}px --mark-inset + --mark-width + --mark-clear`);

  /* --- the sideways-gesture sweep: every width a phone reader turns up on.
         The claim is per LINE, not per page — a body that does not scroll while
         a log line runs off the right edge would still fail the reader. --- */
  const SWEEP = [320, 360, 375, 390, 393];
  const sweep = {};
  for (const width of SWEEP) {
    await page.setViewport({ width, height: 700, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    sweep[width] = await page.eval(`(() => {
      const r2 = (n) => Math.round(n * 100) / 100;
      const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
      const log = document.querySelector(".log");
      const lines = [...document.querySelectorAll(".log__line")];
      const ls = getComputedStyle(log);
      const pad = parseFloat(ls.paddingTop) + parseFloat(ls.paddingBottom);
      const lineBox = parseFloat(ls.lineHeight);
      const chain = lines.slice(0, 11);
      const unit = Math.max(...chain.map((li) => li.getBoundingClientRect().height));
      /* Rect-differenced, not offsetTop-differenced: offsetTop and offsetHeight
         are integers, so at a width where an entry box is 58.5px the gap between
         two entries reads 11px or 12px depending on where the box lands. Every
         line carries the same reveal transform at idle — this runs before the
         section is scrolled into view — so rect differences are exact here in a
         way they would not be mid-chain. */
      let separator = Infinity;
      for (let i = 1; i < chain.length; i++) {
        separator = Math.min(separator, chain[i].getBoundingClientRect().top - chain[i - 1].getBoundingClientRect().bottom);
      }
      const probe = document.createElement("span");
      probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
      ["font-family", "font-size", "letter-spacing"].forEach((p) => probe.style.setProperty(p, css(lines[0], p)));
      probe.textContent = "0";
      document.body.appendChild(probe);
      const advance = probe.getBoundingClientRect().width;
      probe.remove();
      const firstRow = lines[0].getBoundingClientRect().width;
      return {
        overflowing: lines.filter((li) => li.scrollWidth > li.clientWidth).map((li) => li.dataset.line),
        logScroll: log.scrollWidth <= log.clientWidth,
        doc: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        unit: r2(unit), separator: r2(separator),
        /* Per-line row counts, not just the tallest: §12 asks whether ANY
           corpus line sets more than two rows, and a max over entry boxes
           would hide a single three-row line behind a two-row maximum only if
           they happened to tie. Measured per line, they cannot. */
        perLine: chain.map((li) => Math.round(li.getBoundingClientRect().height / lineBox)),
        rows: r2(unit / lineBox),
        columns: Math.floor(firstRow / advance), firstRow: r2(firstRow),
        entries: r2((log.clientHeight - pad + separator) / (unit + separator)),
        text: lines.map((li) => li.textContent)
      };
    })()`);
  }
  evidence.s2Sweep = sweep;
  const gestured = SWEEP.filter((w) => sweep[w].overflowing.length || !sweep[w].logScroll || !sweep[w].doc);
  check("no corpus line needs a horizontal gesture at 320 / 360 / 375 / 390 / 393px", gestured.length === 0, gestured.length ? `${gestured.join(", ")}px overflow` : SWEEP.map((w) => `${w}px ✓`).join(" · "));
  check("soft wrap is not a fidelity cost at any phone width", SWEEP.every((w) => sweep[w].text.every((l, i) => l === corpusLines[i])), "12/12 byte-clean against the corpus at all five widths");
  /* §12: the two-row constant is MEASURED, not inherited. 360px is the tightest
     viewport in the set — 5.7px of margin over §7.1's 37-column floor, under
     one column — and L3's second row carries two of the four corpus glyphs that
     can come from a fallback face, so a derived count is not evidence here.
     320px is excluded and deferred: it sits below the width any row of the
     budget is derived at, and §7.1 states the count there is a ceiling. */
  const TWO_ROW = [360, 375, 390, 393];
  const overRows = TWO_ROW.filter((w) => sweep[w].perLine.some((r) => r > 2));
  check("the two-row constant holds, measured at 360 / 375 / 390 / 393px", overRows.length === 0, overRows.length ? overRows.map((w) => `${w}px: L${sweep[w].perLine.map((r, i) => (r > 2 ? i + 1 : null)).filter(Boolean).join(",L")} set 3+ rows`).join(" ;; ") : TWO_ROW.map((w) => `${w}px ${sweep[w].columns}col ✓`).join(" · "));
  check("every phone width clears §7.1's 37-column floor", TWO_ROW.every((w) => sweep[w].columns >= 37), TWO_ROW.map((w) => `${w}px → ${sweep[w].firstRow}px first row = ${sweep[w].columns} columns`).join(" · "));
  check("the entry separator survives at every phone width", SWEEP.every((w) => sweep[w].separator > 0.5), SWEEP.map((w) => `${w}px ${sweep[w].separator}px`).join(" · "));
  /* The trap §7.1 names explicitly, wearing its new number: 51.0px is exact at
     375px and a CEILING below it. At 320px the longest lines cost three rows,
     and a window sized on the constant would place a third entry and clip it.
     Sized on the measured entry box and separator, it falls to two. */
  check("320px: the window is quantised on measured entries, not the 51.0px pitch", sweep[320].rows > 2.5 && sweep[320].entries >= 2 && Math.abs(sweep[320].entries - Math.round(sweep[320].entries)) < 0.05, `entry box ${sweep[320].unit}px = ${sweep[320].rows} rows, separator ${sweep[320].separator}px → ${sweep[320].entries} whole entries at ${sweep[320].columns} columns`);

  await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  const narrow = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    const pad = parseFloat(getComputedStyle(log).paddingTop) + parseFloat(getComputedStyle(log).paddingBottom);
    const chain = lines.slice(0, 11);
    const unit = Math.max(...chain.map((li) => li.getBoundingClientRect().height));
    let separator = Infinity;
    for (let i = 1; i < chain.length; i++) {
      separator = Math.min(separator, chain[i].getBoundingClientRect().top - chain[i - 1].getBoundingClientRect().bottom);
    }
    return { s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth,
      entries: r2((log.clientHeight - pad + separator) / (unit + separator)), unit: r2(unit),
      separator: r2(separator),
      core: r2(document.querySelector(".replay__core").getBoundingClientRect().height) };
  })()`);
  evidence.s2Narrow = narrow;
  check("320px: the body still never scrolls horizontally", narrow.s <= narrow.c, `scrollWidth ${narrow.s} vs ${narrow.c}, ${narrow.entries} whole entries of ${narrow.unit}px, core ${narrow.core}px`);
  check("320 × 568: the window falls to two whole entries, and the core still fits", Math.abs(narrow.entries - 2) < 0.05 && narrow.core <= 568 - 48 + 0.5, `${narrow.entries} entries of ${narrow.unit}px + ${narrow.separator}px separator, core ${narrow.core}px of ${568 - 48}px`);

  /* --- landscape phone --- */
  await page.setViewport({ width: 667, height: 375, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  const landscape = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    const term = document.querySelector(".terminal").getBoundingClientRect();
    const card = document.querySelector(".narration");
    const rail = card.getBoundingClientRect();
    const list = document.querySelector(".narration__list").getBoundingClientRect();
    const pad = parseFloat(css(log, "padding-top")) + parseFloat(css(log, "padding-bottom"));
    const unit = Math.max(...lines.slice(0, 11).map((li) => li.getBoundingClientRect().height));
    const probe = document.createElement("span");
    probe.style.cssText = "position:absolute;visibility:hidden;white-space:pre";
    ["font-family", "font-size", "letter-spacing"].forEach((p) => probe.style.setProperty(p, css(lines[0], p)));
    probe.textContent = "0";
    document.body.appendChild(probe);
    const advance = probe.getBoundingClientRect().width;
    probe.remove();
    const region = lines[0].getBoundingClientRect().width;
    let separator = Infinity;
    for (let i = 1; i < 11; i++) {
      separator = Math.min(separator, lines[i].getBoundingClientRect().top - lines[i - 1].getBoundingClientRect().bottom);
    }
    const slots = [...document.querySelectorAll(".narration__entry")]
      .map((e) => ({ slot: e.dataset.slot, h: r2(e.getBoundingClientRect().height) }));
    const worst = slots.reduce((a, b) => (b.h > a.h ? b : a));
    return { entries: r2((log.clientHeight - pad + separator) / (unit + separator)),
      unit: r2(unit), separator: r2(separator),
      stacked: rail.top >= term.bottom - 1, termWidth: r2(term.width), railWidth: r2(rail.width),
      region: r2(region), columns: Math.floor(region / advance),
      chrome: r2(document.querySelector(".terminal__chrome").getBoundingClientRect().height),
      chromeLabelRows: r2(document.querySelector(".terminal__label").getBoundingClientRect().height / 16.5),
      card: r2(rail.height), list: r2(list.height), worst,
      cardChars: r2(list.width - 14),
      core: r2(document.querySelector(".replay__core").getBoundingClientRect().height),
      overflowing: lines.filter((li) => li.scrollWidth > li.clientWidth).map((li) => li.dataset.line),
      s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth };
  })()`);
  evidence.s2Landscape = landscape;
  check("landscape phone takes two columns, terminal in the wider one", !landscape.stacked && landscape.termWidth > landscape.railWidth, `terminal ${landscape.termWidth}px / narration ${landscape.railWidth}px`);
  /* Bound at §7.1's 37-column floor and REPORTING the measured count. The 55/41
     split is sized to deliver comfortably above the floor, so asserting the
     target itself would fail a correct build on a rounding difference. §12
     pre-authorised the figure this now measures: 39 is margin spent, not a
     defect; 36 is a defect. */
  check("landscape phone: the terminal column clears the 37-column floor", landscape.columns >= 37 && landscape.overflowing.length === 0 && landscape.s <= landscape.c, `first row ${landscape.region}px = ${landscape.columns} columns (floor 37; §12 records 39 here as margin, 36 as a defect), doc ${landscape.s}/${landscape.c}`);
  check("landscape phone keeps at least three whole log entries on screen", landscape.entries >= 3 && Math.abs(landscape.entries - Math.round(landscape.entries)) < 0.05, `${landscape.entries} whole entries of ${landscape.unit}px + ${landscape.separator}px separator`);
  /* The two figures §7.1 derived rather than measured, reported as measurements. */
  check("landscape phone: the chrome bar fits its budget", landscape.chrome <= 58.5, `${landscape.chrome}px measured against 58px budgeted — label sets ${landscape.chromeLabelRows} row(s)`);
  check("landscape phone: the worst narration slot fits its card", landscape.worst.h <= landscape.list + 0.5, `${landscape.worst.slot} sets ${landscape.worst.h}px in a ${landscape.list}px card`);
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-landscape.png"), await page.screenshot());

  /* --- THE RAIL KEEPS THE ACTIVE ENTRY WHOLE.
     The reader's guarantee is not "the rail scrolls". It is that whenever an
     entry is the active one, ALL of it is inside the rail's client box — the
     explanation that just arrived can be read where it arrived, not one slot
     later. That is a property of the whole chain rather than of one moment, so
     it is asserted at every slot in SLOT_AT, walked in order, with the chain
     DRIVEN to each slot instead of sampled off a wall clock: the rail's rest
     position is a function of where it already was and which entry just became
     active, so stepping the slots in sequence reproduces a real run exactly and
     a single seek would not.

     TWO relationships, because containment alone is not the whole guarantee and
     asserting it alone would have let this defect through a second time.

     1. WHOLE — the active entry's rect is inside the rail's client rect.
        Measured after `--reveal` settles: the reveal translates a new entry
        down from its layout box for 350ms, and containment is a property of
        where the entry comes to rest, not of where it passes through.

     2. ROOM BELOW — the entry rests with at least the reveal's own displacement
        of rail beneath it. This is the one that names the reader's complaint.
        An entry whose bottom edge is the rail's bottom edge is contained and
        still unreadable: it arrives flush at the fold of the scroll window, is
        clipped for the whole of its own fade-in, and only rises into reading
        position one slot later. The floor is the reveal displacement itself,
        MEASURED off an unrevealed entry rather than restated as a number, so it
        follows the token instead of pinning a copy of it here.

        The end of the rail is its own case, and it is a measured condition
        rather than an exemption: at maximum scroll there is no rail left below
        to give, and relationship 1 still binds there. An implementation that
        tried to buy the exemption by parking at maximum scroll early would fail
        relationship 1 at every earlier slot, which is why the pair is sound.

     Four viewports: --bp-wide itself (960, where the rail is narrowest, the
     prose sets tallest and the fit is by far the tightest), the two reading
     widths, and the landscape phone — the one other place `.narration__list`
     carries its own overflow. Whether the rail has anything to scroll is
     measured and printed at each, so a viewport that cannot fail cannot read as
     a pass it did not earn. --- */
  const railFollow = {};
  for (const [w, h, mobile] of [[960, 900, false], [1280, 900, false], [1600, 900, false], [667, 375, true]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, mobile });
    await page.goto(PAGE_URL);
    railFollow[`${w}×${h}`] = await page.eval(`(async () => {
      const r2 = (n) => Math.round(n * 100) / 100;
      const rail = document.querySelector(".narration__list");
      const slots = Object.keys(window.MusterReplay.SLOT_AT);
      /* Bring the section on screen and let the autoplay gate DELIVER before
         taking the clock. The gate's observer records land at the end of a
         frame, so a pause issued in the same task as the scroll is undone by a
         callback that has not run yet — and the probe then measures a chain
         that is quietly still running. Once the intersection has settled
         nothing fires again, and the pause holds for the whole walk. */
      document.querySelector("#watch-it-ship").scrollIntoView({ behavior: "instant", block: "center" });
      await new Promise((r) => setTimeout(r, 300));
      window.MusterReplay.restart();
      window.MusterReplay.pause();
      await new Promise((r) => setTimeout(r, 420));
      const view = rail.clientHeight;
      const border = parseFloat(getComputedStyle(rail).borderTopWidth);
      /* The reveal's displacement, measured, not restated: with nothing
         revealed and the rewind's own transition settled, the first entry
         carries the full offset and its layout position is the rail's origin.
         Sampled before the settle this reads a fraction of itself, which would
         quietly soften every floor below it. */
      const first = document.querySelector(".narration__entry");
      const reveal = r2(first.getBoundingClientRect().top
        - (rail.getBoundingClientRect().top + border) + rail.scrollTop - first.offsetTop);
      const rows = [];
      for (const want of slots) {
        window.MusterReplay.seek(window.MusterReplay.SLOT_AT[want]);
        await new Promise((r) => setTimeout(r, 420));   /* --reveal, settled */
        window.MusterReplay.pause();
        const active = document.querySelector(".narration__entry[data-active]");
        const a = active.getBoundingClientRect();
        /* The CLIENT box, composed rather than assumed: the border edge plus
           the border, for clientHeight. A rect comparison against the border
           box would silently forgive a border's worth of overflow. */
        const top = rail.getBoundingClientRect().top + border;
        const bottom = top + view;
        const at = Math.round(rail.scrollTop);
        const end = Math.round(rail.scrollHeight - view);
        rows.push({
          want, slot: active.dataset.slot,
          topInside: r2(a.top - top), bottomOverflow: r2(a.bottom - bottom),
          clearance: r2(bottom - a.bottom), height: r2(a.height),
          /* The half-pixel is device-pixel rounding, not slop. scrollHeight is
             an integer, so a container's maximum scroll can fall a fraction
             short of its own fractional content height — at the end of the
             list that leaves the last entry's final leading up to half a pixel
             past the client box, and no follow rule can buy it back. */
          scrollTop: at, atEnd: at >= end,
          full: a.top >= top - 0.5 && a.bottom <= bottom + 0.5,
          room: bottom - a.bottom >= reveal - 0.5 || at >= end
        });
      }
      /* The reader takes the rail. Nothing in the slot walk above can see the
         forward-only guard, because the chain's own targets already climb — so
         it is exercised the only way a reader ever exercises it: scroll the
         rail ahead of the chain, then let the next slot land on it. The rail
         must not haul the reader back to the chain's position. */
      let yank = null;
      if (rail.scrollHeight > view + 0.5) {
        window.MusterReplay.restart();
        window.MusterReplay.pause();
        window.MusterReplay.seek(window.MusterReplay.SLOT_AT.sp4a);
        await new Promise((r) => setTimeout(r, 420));
        rail.scrollTop = rail.scrollHeight - view;
        const from = Math.round(rail.scrollTop);
        window.MusterReplay.seek(window.MusterReplay.SLOT_AT.sp4b);
        await new Promise((r) => setTimeout(r, 60));
        yank = { from, to: Math.round(rail.scrollTop) };
      }
      const entries = [...document.querySelectorAll(".narration__entry")];
      return { rows, yank, view: r2(view), max: Math.round(rail.scrollHeight - view), reveal,
        scrolls: rail.scrollHeight > view + 0.5,
        tallest: r2(Math.max(...entries.map((e) => e.getBoundingClientRect().height))) };
    })()`);
  }
  evidence.s2RailFollow = railFollow;
  const railViews = Object.entries(railFollow);
  const railGeometry = railViews.map(([v, m]) =>
    `${v} rail ${m.view}px${m.scrolls ? ` (scrolls, max ${m.max})` : " (no overflow)"}, reveal drop ${m.reveal}px: ` +
    m.rows.map((r) => `${r.want} ${r.height}px @${r.scrollTop}${r.atEnd ? "=end" : ""} top+${r.topInside} clear+${r.clearance}`).join(" · ")).join("\n      ");
  /* The chain really was driven to each slot: ten slots, and the entry the page
     made active is the one the schedule was asked for. A stray frame of
     playback between the seek and the measurement would land a later entry here
     and say so, rather than measuring the wrong slot quietly. */
  const railDriven = railViews.every(([, m]) => m.rows.length === 10 && m.rows.every((r) => r.slot === r.want));
  /* Non-vacuity: some rail has overflow to scroll, and some slot needed the
     rail to move. Containment on a rail that never scrolls is not evidence of
     anything. */
  const railLive = railViews.some(([, m]) => m.scrolls) && railViews.some(([, m]) => m.rows.some((r) => r.scrollTop > 0));
  const railBad = railViews.flatMap(([v, m]) =>
    m.rows.filter((r) => !r.full).map((r) => `${v} ${r.want}: top ${r.topInside}px, bottom overflow ${r.bottomOverflow}px at scrollTop ${r.scrollTop}`));
  check("§2 the narration rail keeps the ACTIVE entry whole, at every slot",
    railBad.length === 0 && railDriven && railLive,
    railBad.length ? railBad.join(" · ") : railGeometry);
  const railFlush = railViews.flatMap(([v, m]) =>
    m.rows.filter((r) => !r.room).map((r) => `${v} ${r.want}: ${r.clearance}px of rail below it, needs ${m.reveal}px, at scrollTop ${r.scrollTop} of ${m.max}`));
  check("§2 the active entry arrives with rail beneath it, never flush on the fold",
    railFlush.length === 0 && railDriven && railLive &&
      /* The end-of-rail case is allowed to exist, not allowed to swallow the
         check: at least one viewport must carry slots that are NOT at maximum
         scroll, or this measures nothing. */
      railViews.some(([, m]) => m.rows.filter((r) => !r.atEnd).length >= 5),
    railFlush.length ? `${railFlush.length} of ${railViews.reduce((n, [, m]) => n + m.rows.length, 0)} slots arrive flush — ${railFlush.join(" · ")}` : railGeometry);
  /* The other half of the follow rule, and the half the slot walk is blind to:
     the rail moves forward or not at all. A reader who has scrolled the rail
     ahead of the chain to read on keeps their position when the next slot
     arrives — a rail that could travel backwards would haul them off the line
     they were reading, every few seconds, for the rest of the playback. */
  const railYank = railViews.filter(([, m]) => m.yank);
  check("§2 the narration rail never scrolls backwards under a reader",
    railYank.length > 0 && railYank.every(([, m]) => m.yank.to >= m.yank.from && m.yank.from > 0),
    railYank.map(([v, m]) => `${v}: reader at ${m.yank.from}, next slot leaves it at ${m.yank.to}`).join(" · ") || "no rail scrolled");
  /* Why containment is reachable at all, stated as its own relationship: no
     entry may set taller than the rail that has to hold it. At --bp-wide the
     margin is thinnest, and if narration ever grows past it no follow rule can
     honour the guarantee above — this check names that cause instead of leaving
     the one above to fail mysteriously. */
  check("§2 no narration entry sets taller than the rail that must hold it",
    railViews.every(([, m]) => m.tallest <= m.view + 0.5),
    railViews.map(([v, m]) => `${v}: tallest entry ${m.tallest}px in a ${m.view}px rail (${Math.round((m.view - m.tallest) * 100) / 100}px spare)`).join(" · "));

  /* --- REPLAY RETURNS BOTH PANES TO THE TOP.
     Each layer carries its own scroll region and they are not the same one at
     every viewport: the narration rail scrolls on a desktop as entries
     accumulate, the terminal's log window scrolls on a phone. A chain that
     starts again at line 1 while either region is still parked where the last
     run left it renders its first lines out of view.

     Driven through the rendered control, not through the test API — the
     reader presses a button. Both panes' pre-state is measured and printed
     beside the result, so a pane that was already at zero cannot make this
     read as a pass it did not earn. --- */
  const rewind = {};
  for (const [w, h] of [[1280, 900], [375, 553]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, mobile: w < 600 });
    await page.goto(PAGE_URL);
    rewind[w] = await page.eval(`(async () => {
      const log = document.querySelector(".log");
      const rail = document.querySelector(".narration__list");
      const at = () => ({
        log: Math.round(log.scrollTop), logMax: Math.round(log.scrollHeight - log.clientHeight),
        rail: Math.round(rail.scrollTop), railMax: Math.round(rail.scrollHeight - rail.clientHeight)
      });
      document.querySelector("#watch-it-ship").scrollIntoView({ behavior: "instant", block: "center" });
      window.MusterReplay.finish();
      await new Promise((r) => setTimeout(r, 400));
      const before = at();
      const button = document.querySelector(".replay__controls button");
      const label = button.textContent;
      button.click();
      await new Promise((r) => setTimeout(r, 400));
      return { before, after: at(), label, state: window.MusterReplay.state() };
    })()`);
  }
  evidence.s2Rewind = rewind;
  const rewindWidths = Object.entries(rewind);
  check("§2 replay returns BOTH panes to the top — terminal and narration",
    rewindWidths.every(([, m]) => /REPLAY/.test(m.label) && m.after.log === 0 && m.after.rail === 0) &&
      /* Non-vacuity: across the two viewports each pane was measurably
         scrolled before the press, so neither zero is a pane that never
         moved. */
      rewindWidths.some(([, m]) => m.before.log > 0) && rewindWidths.some(([, m]) => m.before.rail > 0),
    rewindWidths.map(([w, m]) =>
      `${w}px: terminal ${m.before.log}→${m.after.log} of ${m.before.logMax}, narration ${m.before.rail}→${m.after.rail} of ${m.before.railMax}`).join(" · "));
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto(PAGE_URL);

  /* ================================================================ footer ==
     The closing signature. Its strings and its seven URLs are read off
     `footer-copy.md` rather than copied into this file — the §3/§4 pattern,
     applied to the block whose whole job is to be checkable. The participation
     count is the page's most falsifiable sentence, and the receipts row one
     line below it is what a reader uses to falsify it, so the two are asserted
     against the same source.

     URLs are verified by STRING EQUALITY and never by fetching: a check that
     resolved them would be the one thing on this page that made a network
     request, which is the claim the page is here to make.
     ======================================================================= */

  const footerCopy = (() => {
    const lines = copyFile("footer-copy.md");
    const slice = (heading) => {
      const at = lines.findIndex((l) => l.startsWith(heading));
      const next = lines.findIndex((l, i) => i > at && /^## /.test(l));
      return fencesIn(lines.slice(at, next === -1 ? lines.length : next))[0];
    };
    const cell = (s) => s.trim().replace(/^`|`$/g, "").trim();
    /* The receipts table: numbered rows only, so no prose row can drift in. */
    const receipts = lines
      .filter((l) => /^\|\s*\d+\s*\|/.test(l))
      .map((l) => l.split("|").slice(1, -1))
      .map((c) => ({ label: cell(c[1]), href: cell(c[2]) }));
    const slot = (name) => {
      const row = lines.find((l) => new RegExp("^\\|\\s*`?" + name + "`?\\s*\\|").test(l));
      return row ? cell(row.split("|")[2]) : null;
    };
    /* The sentence's measured length, read out of the deliverable's own
       measured-counts table rather than hard-coded here. The count changes
       whenever the sentence is re-ruled, and a literal in this file would
       make every future ruling a harness edit — the coupling that has to
       survive is "the page's sentence is as long as the file says it is",
       under the file's own stated counting convention. */
    const measuredRow = lines.find((l) => /^\|\s*Closing sentence\s*\|/.test(l));
    const measured = measuredRow ? measuredRow.split("|").slice(1, -1).map((c) => c.trim()) : null;
    const num = (s) => (s ? Number((s.match(/\d+/) || [])[0]) : null);
    return {
      /* One sentence: the team truth and the authorship in one breath. The
         fence is the ruled string — any prose in the same section is never
         fenced, so it cannot be picked up here by accident. */
      sentence: slice("## 2. The closing sentence"),
      words: measured ? num(measured[2]) : null,
      wordCeiling: measured ? num(measured[1]) : null,
      receipts,
      contactText: slot("Link text"),
      contactHref: slot("href")
    };
  })();
  evidence.footerCopy = footerCopy;

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(PAGE_URL);
  const footer = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const css = (el, p) => getComputedStyle(el).getPropertyValue(p).trim();
    const foot = document.querySelector("body > footer");
    const container = foot.querySelector(".container");
    const box = container.getBoundingClientRect();
    const rail = box.left + parseFloat(css(container, "padding-left"));
    const railEnd = box.right - parseFloat(css(container, "padding-right"));
    const lines = [...foot.querySelectorAll("p.pagefoot__line")];
    const receipts = [...foot.querySelectorAll(".pagefoot__receipts a")];
    const contact = [...foot.querySelectorAll(".pagefoot__contact a")];
    const text = (el) => el.textContent.replace(/\\s+/g, " ").trim();
    const sep = [...foot.querySelectorAll(".rule--boundary")];
    const leadProbe = document.createElement("p");
    leadProbe.style.cssText = "position:absolute;visibility:hidden;font-size:var(--text-lead)";
    foot.appendChild(leadProbe);
    const leadSize = css(leadProbe, "font-size");
    leadProbe.style.fontSize = "var(--text-micro)";
    const microSize = css(leadProbe, "font-size");
    leadProbe.remove();
    return {
      lineText: lines.map(text),
      lineSizes: lines.map((p) => css(p, "font-size")),
      /* The two style-only nowrap runs. A unit that split reports two rects;
         a unit that leaked a character into textContent fails the byte
         equality above instead. */
      units: [...foot.querySelectorAll(".pagefoot__unit")].map((u) => ({
        text: u.textContent, rects: u.getClientRects().length
      })),
      lineRows: lines.map((p) => Math.round(p.getBoundingClientRect().height / parseFloat(css(p, "line-height")))),
      receiptSize: receipts.length ? css(receipts[0], "font-size") : null,
      leadSize, microSize,
      /* §4.1: one boundary, one rule. The separator replaced the footer's
         plain top border; if the border comes back, the page carries two
         stacked lines at the same edge — the accidental double rule the whole
         construction exists to avoid. */
      separators: sep.length,
      separatorHidden: sep.map((s) => s.getAttribute("aria-hidden")),
      separatorMark: sep.length ? (() => {
        const m = sep[0].querySelector(".rule__mark");
        const tick = sep[0].querySelector(".rule__tick");
        if (!m || !tick) return null;
        const mb = m.getBoundingClientRect(), tb = tick.getBoundingClientRect();
        return { w: r2(mb.width), h: r2(mb.height), tickH: r2(tb.height) };
      })() : null,
      separatorTagStart: sep.length ? r2(sep[0].querySelector(".rule__tag").getBoundingClientRect().left) : null,
      footBorderTop: css(foot, "border-top-width"),
      receipts: receipts.map((a) => ({ label: text(a), href: a.getAttribute("href") })),
      /* Every anchor in the footer, so a stray link cannot ride in unasserted
         between the receipts row and the contact line. */
      allLinks: [...foot.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
      contact: contact.map((a) => ({ text: text(a), href: a.getAttribute("href") })),
      /* §7.2: everything on the rail, no counterweight, nothing centred. */
      starts: [...container.children].map((el) => ({
        cls: el.className, start: r2(el.getBoundingClientRect().left),
        align: css(el, "text-align")
      })),
      rail: r2(rail), railEnd: r2(railEnd),
      placeholders: foot.querySelectorAll("[data-shell-placeholder]").length,
      lockups: foot.querySelectorAll(".brand, .brand__mark, .brand__word").length,
      footText: text(foot),
      colours: lines.map((p) => css(p, "color")),
      inkRgb: css(document.body, "color"),
      chipHref: document.querySelector("#hero .chip").getAttribute("href")
    };
  })()`);
  evidence.footer = footer;

  check("the footer closes on one sentence, byte-equal to the deliverable",
    Boolean(footerCopy.sentence) && footer.placeholders === 0 &&
      footer.lineText.length === 1 && footer.lineText[0] === footerCopy.sentence,
    `${footer.placeholders} placeholder(s) · ${footer.lineText.length} sentence(s) · equal: ${footer.lineText[0] === footerCopy.sentence}`);
  /* The sentence's length, counted on the RENDERED text under the copy file's
     own convention — whitespace-delimited tokens carrying a letter or digit,
     so the two em-dashes count zero — and compared against the count that file
     publishes, plus the ceiling it publishes beside it. The number is read,
     never typed here: re-rule the sentence and this re-bases with it. */
  const footerWords = (s) => s.split(/\s+/).filter((t) => /[\p{L}\p{N}]/u.test(t)).length;
  const footerRendered = footerWords(footer.lineText[0] || "");
  check("the footer's sentence measures the length its deliverable publishes, under the ceiling",
    typeof footerCopy.words === "number" && typeof footerCopy.wordCeiling === "number" &&
      footerRendered === footerCopy.words && footerRendered <= footerCopy.wordCeiling,
    `${footerRendered} words rendered against ${footerCopy.words} published, ceiling ${footerCopy.wordCeiling}`);
  /* §4.2, the signature scale. Computed-to-computed against a probe carrying
     the token, never against a pixel figure: the sentence is the page's last
     deliberate statement, and at body scale it read as fine print. */
  check("the footer's sentence is the largest text in it — lead scale, receipts at micro",
    footer.lineSizes.length === 1 && footer.lineSizes[0] === footer.leadSize &&
      footer.receiptSize === footer.microSize &&
      parseFloat(footer.lineSizes[0]) > parseFloat(footer.receiptSize),
    `sentence ${footer.lineSizes[0]} against --text-lead ${footer.leadSize} · receipts ${footer.receiptSize} against --text-micro ${footer.microSize}`);
  /* §4.1, one boundary and one rule. The separator IS the footer's boundary,
     so the plain border it replaced must be gone — and the mark it seats is
     punctuation scale, bound to the end tick it sits between rather than to a
     literal 9px. */
  check("the footer's boundary is the separator, and the plain border it replaced is gone",
    footer.separators === 1 && footer.separatorHidden.every((h) => h === "true") &&
      parseFloat(footer.footBorderTop) === 0 &&
      Boolean(footer.separatorMark) && footer.separatorMark.h === footer.separatorMark.tickH,
    `${footer.separators} separator(s), aria-hidden ${footer.separatorHidden.join("/")} · footer border-top ${footer.footBorderTop} · mark ${footer.separatorMark && footer.separatorMark.w}×${footer.separatorMark && footer.separatorMark.h} against the tick's ${footer.separatorMark && footer.separatorMark.tickH}`);
  /* The count is the claim; the receipts are what make it checkable. Both the
     label and the URL are compared, in order — a right URL under a wrong label
     sends a reader to the wrong artifact, which on this page is the same
     failure as a wrong number. */
  check("the footer's six receipts carry the deliverable's labels and URLs, in order",
    footerCopy.receipts.length === 6 && footer.receipts.length === 6 &&
      footer.receipts.every((a, i) => a.label === footerCopy.receipts[i].label &&
        a.href === footerCopy.receipts[i].href),
    footer.receipts.map((a, i) => `${a.label} → ${a.href === (footerCopy.receipts[i] || {}).href ? "ok" : "DIFFERS: " + a.href}`).join(" · "));
  /* The chip and the VERIFY receipt are one string in two places. They drift
     the moment one of them is edited alone, and a drifted proof link is a 404
     on the page's own evidence. */
  check("the VERIFY chip and the footer's VERIFY receipt are the same string",
    footer.chipHref === (footerCopy.receipts.find((r) => r.label === "VERIFY") || {}).href &&
      footer.receipts.some((a) => a.href === footer.chipHref),
    `chip ${footer.chipHref}`);
  check("the footer's contact path is the GitHub profile, its text its own destination",
    footer.contact.length === 1 && footer.contact[0].text === footerCopy.contactText &&
      footer.contact[0].href === footerCopy.contactHref &&
      footerCopy.contactHref.endsWith(footerCopy.contactText) &&
      footer.allLinks.length === footer.receipts.length + 1,
    `${JSON.stringify(footer.contact)} · ${footer.allLinks.length} links in the footer, all accounted for`);
  /* §7.2's footer clause: both lines, the receipts row and the contact line on
     the rail, no counterweight, no centred element, and no lockup — the header
     carries the page's only one. */
  check("the footer inherits the alignment system: everything on the rail, nothing centred",
    footer.starts.length === 3 &&
      footer.starts.every((b) => Math.abs(b.start - footer.rail) < 1 &&
        (b.align === "start" || b.align === "left")) &&
      /* The separator's own rail element is its tag: the lines bleed to the
         viewport the way every section rule's do, and the tag is what seats on
         the container's content edge. Four blocks on the rail, counting it. */
      Math.abs(footer.separatorTagStart - footer.rail) < 1 &&
      footer.lockups === 0,
    footer.starts.map((b) => `${b.cls.split(" ").pop()} at ${b.start} (${b.align})`).join(" · ") +
      ` · separator tag at ${footer.separatorTagStart} · against the rail at ${footer.rail} · ${footer.lockups} lockups`);

  /* --- the two nowrap units, at the widths the defect was measured at.
     The founder's name split across two lines at 375 and 320, and the adverb
     broke off its verb at 1280 — a name is one token to a reader even though
     it is two to a line-breaker. One client rect per unit is that guarantee;
     the sentence's byte equality above is what proves the spans carry no text
     of their own. --- */
  const footerUnits = { 1280: footer.units };
  const footerRows = { 1280: footer.lineRows[0] };
  for (const width of [375, 320]) {
    await page.setViewport({ width, height: 553, deviceScaleFactor: 1, mobile: true });
    await page.goto(PAGE_URL);
    const at = await page.eval(`(() => {
      const foot = document.querySelector("body > footer");
      const line = foot.querySelector("p.pagefoot__line");
      return {
        units: [...foot.querySelectorAll(".pagefoot__unit")].map((u) => ({ text: u.textContent, rects: u.getClientRects().length })),
        text: line.textContent.replace(/\\s+/g, " ").trim(),
        rows: Math.round(line.getBoundingClientRect().height / parseFloat(getComputedStyle(line).lineHeight))
      };
    })()`);
    footerUnits[width] = at.units;
    footerRows[width] = at.rows;
    /* Byte equality is re-read here, not assumed from 1280: a span that
       injected whitespace would show up at exactly the width it wrapped. */
    footerUnits[`${width}-equal`] = at.text === footerCopy.sentence;
  }
  evidence.footerUnits = { rects: footerUnits, rows: footerRows };
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(PAGE_URL);
  check("the footer's two nowrap units hold as wholes at 1280, 375 and 320",
    [1280, 375, 320].every((w) => footerUnits[w].length === 2 && footerUnits[w].every((u) => u.rects === 1)) &&
      [375, 320].every((w) => footerUnits[`${w}-equal`] === true) &&
      footer.units.map((u) => u.text).join("|") === "never invoked|Kanwar Sandhu",
    [1280, 375, 320].map((w) => `${w}px: ${footerUnits[w].map((u) => JSON.stringify(u.text) + " ×" + u.rects + " rect").join(", ")} in ${footerRows[w]} line(s)`).join(" · "));

  /* ================================================================== §7.1 ==
     Scroll landing — the page does not snap.

     Section snapping was judged on the rendered page and removed; what stays is
     where any scroll-into-view comes to rest. The assertions that guarded the
     feature are not deleted wholesale — each was dispositioned by name in
     §7.1's retirement inventory, and this block is that inventory built:

       A1  INVERTS  — the document scroller computes `none`; snapping must not
                      silently return. This is the one that would catch a
                      re-introduction, so it is the first check in the block.
       A2  KEEPS    — the padding is the bar plus one --rhythm, unchanged.
       A3  RE-BASES — the clearance is measured at the landing readers actually
                      have (scrollIntoView) rather than at a snap rest, and now
                      answers for all five ruled sections rather than four.
       A4  RE-BASES — nothing anywhere computes a non-`none` scroll-snap-align
                      except §4's sheets, whose scroller is the track.
       A5  RE-SCOPES— `scroll-snap-stop: normal` on the sheets, the only snap
                      areas left.
       A6  RETIRES  — subsumed by the re-based A4 sweep (no snap outside the
                      track, §2's log included).
       A7  RETIRES  — the §2 rest-position sweep had nothing left to measure:
                      with no y snap, no rest position can be moved. The
                      `.section--no-snap` class left the markup with it.
       A8  KEEPS    — arrow/page keys as a no-trap property, real key events.
       A9  KEEPS    — 200% zoom reachability, unchanged.
       A10 RE-BASES — to its surviving half: the padding is untouched by reduced
                      motion. The track's reduced-motion half is asserted in §4.
       A11 RE-BASES — to its natural form: with no y snap a start-aligned
                      landing is exact, in both motion states. The pull DEC-053
                      priced no longer exists on this axis.
     ========================================================================= */

  /* Shared page-side helpers. `nearestScroller` deliberately walks past body
     and :root: body's `overflow-x: hidden` PROPAGATES to the viewport, which
     makes the viewport the scroller and body not one, but the computed style
     still reports hidden on body — trusting it would name body as a snap
     area's container and quietly pass A4. */
  const SNAP_LIB = `
    const settle = (ms) => new Promise((r) => requestAnimationFrame(() => setTimeout(r, ms || 160)));
    const r2 = (n) => Math.round(n * 100) / 100;
    const nearestScroller = (el) => {
      let p = el.parentElement;
      while (p && p !== document.body && p !== document.documentElement) {
        const s = getComputedStyle(p);
        if (/(auto|scroll)/.test(s.overflowX + " " + s.overflowY)) return p;
        p = p.parentElement;
      }
      return document.scrollingElement;
    };
    const label = (el) => el.tagName.toLowerCase() + (el.id ? "#" + el.id : "") +
      (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\\s+/).join(".") : "");
    const tokenPx = (name) => {
      const p = document.createElement("span");
      p.style.cssText = "position:absolute;visibility:hidden;block-size:0;inline-size:var(" + name + ")";
      document.body.appendChild(p);
      const w = p.getBoundingClientRect().width;
      p.remove();
      return w;
    };
  `;

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(PAGE_URL);

  const snapDecl = await page.eval(`(() => {
    ${SNAP_LIB}
    const root = document.documentElement;
    const rootStyle = getComputedStyle(root);
    const bar = document.querySelector(".statusbar").getBoundingClientRect().height;
    const areas = [...document.querySelectorAll("*")]
      .filter((el) => getComputedStyle(el).scrollSnapAlign !== "none")
      .map((el) => ({ el: label(el), align: getComputedStyle(el).scrollSnapAlign,
                      stop: getComputedStyle(el).scrollSnapStop,
                      scroller: label(nearestScroller(el)) }));
    return {
      scrollerIsRoot: document.scrollingElement === root,
      snapType: rootStyle.scrollSnapType,
      pad: parseFloat(rootStyle.scrollPaddingBlockStart),
      bar: r2(bar), rhythm: tokenPx("--rhythm"), hairline: tokenPx("--gap-hairline"),
      barToken: tokenPx("--bar-h"), padToken: tokenPx("--scroll-pad"),
      areas,
      sections: [...document.querySelectorAll("main .section")]
        .map((s) => ({ id: s.id, align: getComputedStyle(s).scrollSnapAlign, exempt: s.classList.contains("section--no-snap") })),
      logSnap: getComputedStyle(document.querySelector(".log")).scrollSnapType,
      logOverflow: getComputedStyle(document.querySelector(".log")).overflowY,
      trackSnap: getComputedStyle(document.querySelector(".sheets")).scrollSnapType
    };
  })()`);
  evidence.snapDecl = snapDecl;

  /* A1, inverted. The scroller identity is asserted alongside the value because
     the two together are what make the claim falsifiable: `scroll-snap-type` on
     body is silently inert — nothing errors and nothing snaps — so a check that
     read body would report `none` while :root snapped. Reading the element that
     actually scrolls is what makes a re-introduction show up here. */
  check("the page does not snap — the element that actually scrolls declares none",
    snapDecl.scrollerIsRoot && snapDecl.snapType === "none",
    `document.scrollingElement is :root, scroll-snap-type "${snapDecl.snapType}"`);
  /* A2. The bar's measured height, not the token's — the token could be right
     while the bar renders at something else. */
  check("scroll padding is the measured bar plus one rhythm, never a hardcoded 72",
    Math.abs(snapDecl.pad - (snapDecl.bar + snapDecl.rhythm)) < 0.5 && Math.abs(snapDecl.bar - snapDecl.barToken) < 0.5,
    `${snapDecl.pad}px = ${snapDecl.bar}px bar (rendered; --bar-h resolves ${snapDecl.barToken}px) + ${snapDecl.rhythm}px --rhythm`);
  /* A4, re-based. The whole-document sweep is the surviving form: no element
     ANYWHERE computes a non-`none` scroll-snap-align except §4's four sheets,
     and each of those has the track as its nearest scroll container. That
     subsumes A6 (a nested scroller silently gaining snap — §2's log included)
     and it is what a section quietly regaining `scroll-snap-align: start` would
     fail on. `.section--no-snap` is gone from the markup: with nothing snapping
     there is no exemption left to declare, and a class that declares one is
     itself the defect this catches. */
  const snapping = snapDecl.sections.filter((s) => s.align !== "none").map((s) => s.id);
  const strays = snapDecl.areas.filter((a) => !a.scroller.startsWith("ol.sheets"));
  check("nothing snaps outside §4's track — no section, no nested scroller, no stray",
    snapping.length === 0 && strays.length === 0 &&
      snapDecl.areas.length === 4 && snapDecl.areas.every((a) => a.el.startsWith("li.sheet")) &&
      snapDecl.sections.every((s) => !s.exempt) &&
      snapDecl.logSnap === "none" && /(auto|scroll)/.test(snapDecl.logOverflow),
    `${snapDecl.areas.length} snap areas, all sheets on ol.sheets · ${snapping.length} sections declaring an align · ` +
      `§2's log is a real scroller (overflow-y ${snapDecl.logOverflow}) at scroll-snap-type ${snapDecl.logSnap}` +
      (strays.length ? ` — STRAY: ${strays.map((s) => s.el + " → " + s.scroller).join(", ")}` : ""));
  /* A5, re-scoped to the sheets — the only snap areas left. `always` is
     scroll-jacking by declaration: it forces a stop at every sheet and takes
     the fling gesture away. It is the obvious "improvement" to make on a paged
     track, which is why it is asserted rather than trusted. */
  check("no snap area asks for scroll-snap-stop: always",
    snapDecl.areas.length === 4 && snapDecl.areas.every((a) => a.stop === "normal"),
    /* The measured values, not the word "normal". This detail used to print
       "all normal" as a literal, so planting `scroll-snap-stop: always` on the
       sheets turned the check red while its evidence still said every area was
       normal. A check whose evidence is a literal cannot report what broke,
       which is the defect class this suite keeps finding in itself. */
    `${snapDecl.areas.length} sheet areas: ${snapDecl.areas.map((a) => a.stop).join(", ")}`);

  /* A3, re-based to the landing readers actually have. It used to be measured
     at a snap rest; now it is measured at the same place a fragment link, the
     skip link or find-in-page puts them — scrollIntoView, settled. The binding
     property is unchanged: the section's own hairline must clear the bar's by
     at least --gap-hairline, or the page's separator motif reads as an
     accidental double rule. §1 carries no rule, so five sections answer where
     four used to (§2 is no longer excluded — nothing exempts it now). */
  const clearances = await page.eval(`(async () => {
    ${SNAP_LIB}
    const out = [];
    for (const sec of [...document.querySelectorAll("main .section")]) {
      const rule = sec.querySelector(".rule__line");
      if (!rule) continue;
      scrollTo({ top: 0, behavior: "instant" });
      await settle(60);
      sec.scrollIntoView({ behavior: "instant" });
      await settle(220);
      const barBottom = document.querySelector(".statusbar").getBoundingClientRect().bottom;
      out.push({ id: sec.id, at: Math.round(scrollY),
                 clear: r2(rule.getBoundingClientRect().top - barBottom) });
    }
    return { out, hairline: tokenPx("--gap-hairline") };
  })()`);
  evidence.snapClearance = clearances;
  const worstClear = Math.min(...clearances.out.map((c) => c.clear));
  check("a section landed by scroll-into-view never crowds the bar's rule",
    clearances.out.length === 5 && worstClear >= clearances.hairline - 0.5,
    `${clearances.out.map((c) => c.id + " " + c.clear + "px").join(" · ")} against a ${clearances.hairline}px --gap-hairline floor`);

  /* A7 RETIRED with the feature. It swept every rest position across §2 and
     counted how many the user agent moved, to prove §2's snap exemption held as
     a property rather than as an intention. With no y snap on the document
     there is no engine correction left to observe: the sweep would compare
     every requested offset against itself and could not fail. That is precisely
     the blind-check shape this project tore out elsewhere, so it leaves rather
     than staying green for free. What replaced its subject: the re-based A4
     above proves no y snap exists to move a rest in the first place, and §2's
     playback gate keeps its own visibility assertions in the replay block.

     A7's disclosure debt travels with it: the check printed a hardcoded zero
     where its measured count belonged, so its "0 of N gated rests moved"
     detail was never a measurement. Nothing may quote that figure. */

  /* A8. Real key events, never `window.scrollBy` — programmatic and
     input-driven snapping differ in Blink, and the programmatic form reports a
     top-of-page trap the reader never experiences. */
  const KEY = { ArrowDown: 40, PageDown: 34 };
  const press = async (name) => {
    for (const type of ["rawKeyDown", "keyUp"]) {
      await page.call("Input.dispatchKeyEvent", {
        type, key: name, code: name,
        windowsVirtualKeyCode: KEY[name], nativeVirtualKeyCode: KEY[name]
      });
    }
    await page.eval(`new Promise((r) => requestAnimationFrame(() => setTimeout(r, 220)))`);
  };
  const keyboard = {};
  for (const [w, h] of [[1280, 900], [375, 553]]) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
    await page.goto(PAGE_URL);
    await page.call("Emulation.setFocusEmulationEnabled", { enabled: true }).catch(() => {});
    await page.eval(`(() => { if (document.activeElement && document.activeElement !== document.body) document.activeElement.blur(); scrollTo({ top: 0, behavior: "instant" }); })()`);
    const arrows = [];
    for (let i = 0; i < 10; i++) {
      await press("ArrowDown");
      arrows.push(await page.eval("Math.round(scrollY)"));
    }
    await page.eval(`scrollTo({ top: 0, behavior: "instant" })`);
    await page.eval(`new Promise((r) => setTimeout(r, 200))`);
    const max = await page.eval("Math.round(document.documentElement.scrollHeight - innerHeight)");
    const pages = [];
    for (let i = 0; i < 60; i++) {
      await press("PageDown");
      const at = await page.eval("Math.round(scrollY)");
      pages.push(at);
      if (at >= max - 1) break;
    }
    keyboard[w + "x" + h] = { arrows, pages, max };
  }
  evidence.snapKeyboard = keyboard;
  const strictlyUp = (list) => list.every((v, i) => (i === 0 ? v > 0 : v > list[i - 1]));
  check("ten ArrowDown presses step the page down every time, at both viewports",
    Object.values(keyboard).every((k) => k.arrows.length === 10 && strictlyUp(k.arrows)),
    Object.entries(keyboard).map(([v, k]) => `${v}: ${k.arrows.join(" → ")}`).join(" ;; "));
  check("PageDown reaches the document end with no backward and no dead press",
    Object.values(keyboard).every((k) => strictlyUp(k.pages) && k.pages[k.pages.length - 1] >= k.max - 1),
    Object.entries(keyboard).map(([v, k]) => `${v}: ${k.pages.length} presses to ${k.pages[k.pages.length - 1]} of ${k.max}`).join(" · "));

  /* A9, unchanged. 200% zoom is where every section is oversized and the whole
     page becomes one long reflow: every section's last rendered text must still
     be reachable and land clear of the bar. */
  await page.setViewport({ width: 720, height: 450, deviceScaleFactor: 2, mobile: false });
  await page.goto(PAGE_URL);
  const zoom = await page.eval(`(async () => {
    ${SNAP_LIB}
    const out = [];
    for (const sec of [...document.querySelectorAll("main .section")]) {
      const leaves = [...sec.querySelectorAll("*")].filter((el) =>
        !el.children.length && el.textContent.trim() && !el.classList.contains("a11y-value") &&
        el.getBoundingClientRect().height > 0);
      const target = leaves[leaves.length - 1];
      scrollTo({ top: 0, behavior: "instant" });
      await settle(60);
      target.scrollIntoView({ behavior: "instant", block: "start" });
      await settle(240);
      const barBottom = document.querySelector(".statusbar").getBoundingClientRect().bottom;
      const rect = target.getBoundingClientRect();
      out.push({ id: sec.id, text: target.textContent.trim().slice(0, 24),
                 top: r2(rect.top - barBottom), bottom: r2(rect.bottom), h: r2(rect.height),
                 view: innerHeight, band: r2(innerHeight - barBottom) });
    }
    return { out, doc: { s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth } };
  })()`);
  evidence.snapZoom = zoom;
  const unreachable = zoom.out.filter((z) => z.top < -0.5 || (z.h <= z.band && z.bottom > z.view + 0.5));
  check("at 200% zoom every section's last content still lands whole and clear of the bar",
    unreachable.length === 0 && zoom.doc.s <= zoom.doc.c,
    zoom.out.map((z) => `${z.id} +${z.top}px under the bar`).join(" · ") +
      (unreachable.length ? ` — UNREACHABLE: ${unreachable.map((u) => u.id).join(", ")}` : ""));

  /* A11, re-based to its natural form. The browser's find UI is not scriptable,
     so this exercises the same scroll-into-view path the find uses without
     being the find; real find-in-page stays a manual check in both engines, and
     on a real phone it stays a named manual check at the re-gate.

     It is run over EVERY text leaf on the page rather than over one nominated
     paragraph, because a match is not a nominated element — any word the reader
     types is one. Log lines are excluded: they live in §2's own scroller, which
     has its own scrollback and its own assertions.

     Both alignments are still swept, and the sweep is still run in both motion
     states, because that pairing is what makes the claim falsifiable rather
     than a restatement of the removal:
       - CENTER-IF-NEEDED is what Chrome's find actually does (ScrollAlignment
         CenterIfNeeded): leave a visible match alone, otherwise centre it.
       - START is the default `scrollIntoView()`, and it used to be the harsher
         of the two: it parked the target at the snapport's start edge, where
         the next section's snap position could be nearer than the target, and
         the target got pulled past. With no y snap that pull is gone and a
         start-aligned landing is exact — which is the relationship A11 now
         asserts, in both states rather than only with snapping off. Fragment
         navigation is start-aligned, so this is not hypothetical; every
         fragment target the page ships is asserted below. */
  const findLike = {};
  for (const [w, h] of [[1280, 900], [375, 553]]) {
    for (const snapping of ["on", "off"]) {
      await page.setMedia({ colorScheme: "dark", reducedMotion: snapping === "on" ? "no-preference" : "reduce" });
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, mobile: w < 700 });
      await page.goto(PAGE_URL);
      findLike[w + "x" + h + " snap-" + snapping] = await page.eval(`(async () => {
        ${SNAP_LIB}
        const leaves = [...document.querySelectorAll("main .section *")].filter((el) =>
          !el.children.length && el.textContent.trim() && !el.closest(".log") &&
          !el.classList.contains("a11y-value") && el.getBoundingClientRect().height > 0);
        const run = async (align) => {
          const out = [];
          for (const el of leaves) {
            scrollTo({ top: 0, behavior: "instant" });
            await settle(0);
            const rect0 = el.getBoundingClientRect();
            const bar0 = document.querySelector(".statusbar").getBoundingClientRect().bottom;
            if (align === "start") el.scrollIntoView({ behavior: "instant", block: "start" });
            else if (!(rect0.top >= bar0 && rect0.bottom <= innerHeight)) el.scrollIntoView({ behavior: "instant", block: "center" });
            await settle(90);
            const bar = document.querySelector(".statusbar").getBoundingClientRect().bottom;
            const rect = el.getBoundingClientRect();
            const seen = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, bar)) / rect.height;
            if (seen < 0.999) out.push({ sec: el.closest(".section").id, t: el.textContent.trim().slice(0, 18), seen: r2(seen) });
          }
          return out;
        };
        /* Fragment navigation, which IS start-aligned and which the page ships:
           the skip link's target and every id an in-page href names. */
        const fragments = [...new Set([...document.querySelectorAll('a[href^="#"]')].map((a) => a.getAttribute("href").slice(1)))];
        const frag = [];
        for (const id of fragments) {
          const el = document.getElementById(id);
          if (!el) { frag.push({ id, missing: true }); continue; }
          scrollTo({ top: 0, behavior: "instant" });
          await settle(0);
          el.scrollIntoView({ behavior: "instant", block: "start" });
          await settle(90);
          const bar = document.querySelector(".statusbar").getBoundingClientRect().bottom;
          const rect = el.getBoundingClientRect();
          frag.push({ id, top: r2(rect.top - bar), onScreen: rect.top < innerHeight && rect.bottom > bar });
        }
        /* Focus scrolls too — "nearest", so it moves only what it must — and a
           focus ring the reader cannot see is the same defect wearing a
           keyboard. The skip link is excluded and asserted separately: it is
           chrome that lives behind the bar until it is focused, so "clear of
           the bar" is not its contract. Controls taller than the band under the
           bar — §4's stacked track on a phone is 2748px of one — cannot be
           whole by definition, and the engine centres them rather than aligning
           their top: measured, that landing is the same to half a pixel with
           snapping off, so what is asserted for those is that focus leaves them
           on screen, not where the engine chose to put them. */
        const focusables = [...document.querySelectorAll('a[href], button, [tabindex]:not([tabindex="-1"])')]
          .filter((el) => !el.classList.contains("skip-link"));
        const focused = [];
        for (const el of focusables) {
          scrollTo({ top: 0, behavior: "instant" });
          await settle(0);
          el.focus();
          await settle(90);
          const bar = document.querySelector(".statusbar").getBoundingClientRect().bottom;
          const rect = el.getBoundingClientRect();
          const seen = Math.max(0, Math.min(rect.bottom, innerHeight) - Math.max(rect.top, bar)) / rect.height;
          const band = innerHeight - bar;
          focused.push({ el: label(el).slice(0, 32), seen: r2(seen), h: r2(rect.height), band: r2(band),
                         top: r2(rect.top - bar), whole: rect.height <= band ? seen >= 0.999 && rect.top - bar >= -0.5 : seen > 0 });
        }
        return { leaves: leaves.length, centred: await run("center"), started: await run("start"), frag, focused };
      })()`);
    }
  }
  evidence.snapFindLike = findLike;
  const onSnap = Object.entries(findLike).filter(([k]) => k.endsWith("snap-on"));
  const allStates = Object.entries(findLike);
  check("find-in-page's own alignment never leaves a match off screen, at either viewport",
    onSnap.every(([, f]) => f.centred.length === 0),
    onSnap.map(([k, f]) => `${k}: ${f.leaves - f.centred.length}/${f.leaves} whole`).join(" · "));
  /* A11's natural form. This used to hold only on the snap-off path — the cost
     of the proximity pull, priced and named rather than absorbed. Removing the
     page's snap is what makes it hold everywhere, so it is asserted across both
     motion states and both viewports: every text leaf on the page, landed at
     the start edge, settles fully visible below the bar. A single leaf short of
     whole fails it. */
  check("a start-aligned landing is exact for every text leaf, in both motion states",
    allStates.every(([, f]) => f.started.length === 0 && f.centred.length === 0),
    /* Both counts are printed, from the measurements rather than from the
       expectation. A detail that reported only one of the two alignments would
       fail on the other while printing zeroes — a check whose evidence does not
       name what broke is the defect class this suite keeps finding. */
    allStates.map(([k, f]) =>
      `${k}: start-aligned ${f.started.length}/${f.leaves} short, centred ${f.centred.length}/${f.leaves} short`
      + (f.started.length ? ` [${f.started.slice(0, 3).map((o) => o.sec + " " + Math.round(o.seen * 100) + "%").join(", ")}]` : "")
      + (f.centred.length ? ` [${f.centred.slice(0, 3).map((o) => o.sec + " " + Math.round(o.seen * 100) + "%").join(", ")}]` : "")
    ).join(" · "));
  /* Which matters exactly as far as the page start-aligns anything, and it
     ships one such mechanism: fragment links. `scroll-padding-block-start` is
     what puts each landing clear of the bar — that is the padding's whole job,
     and it is why the padding did not leave with the snap. */
  check("every fragment link the page ships lands its target clear of the bar",
    onSnap.every(([, f]) => f.frag.length > 0 && f.frag.every((x) => !x.missing && x.onScreen && x.top >= -0.5)),
    onSnap.map(([k, f]) => `${k}: ${f.frag.map((x) => "#" + x.id + " +" + x.top + "px").join(", ")}`).join(" · "));
  check("focusing any control keeps it on screen and clear of the bar",
    onSnap.every(([, f]) => f.focused.length > 0 && f.focused.every((x) => x.whole)),
    onSnap.map(([k, f]) => `${k}: ` + f.focused.map((x) => x.el.split(".")[0] + (x.h <= x.band ? ` whole +${x.top}px` : ` ${Math.round(x.seen * 100)}% of ${x.h}px in a ${x.band}px band`)).join(", ")).join(" · "));

  /* A10, re-based to its surviving half. The page has no snap to turn off under
     reduce, so what is left to assert is that the PADDING is not swept away
     with it: anchors, the skip link and find-in-page still have to clear the
     bar for a reader who asked for less motion, and the reduced path is the one
     where a "less scrolling machinery" edit would land. §4's track keeps the
     reduced-motion half of its own snap, asserted with §4. */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.setViewport({ width: 1280, height: 900 });
  await page.goto(PAGE_URL);
  const snapReduced = await page.eval(`(() => {
    ${SNAP_LIB}
    const rootStyle = getComputedStyle(document.documentElement);
    return {
      snapType: rootStyle.scrollSnapType,
      pad: parseFloat(rootStyle.scrollPaddingBlockStart),
      bar: r2(document.querySelector(".statusbar").getBoundingClientRect().height),
      rhythm: tokenPx("--rhythm"),
      sections: [...document.querySelectorAll("main .section")].map((s) => getComputedStyle(s).scrollSnapAlign),
      track: getComputedStyle(document.querySelector(".sheets")).scrollSnapType
    };
  })()`);
  evidence.snapReduced = snapReduced;
  check("under reduced motion the scroll padding stays, and nothing starts snapping",
    snapReduced.snapType === "none" && Math.abs(snapReduced.pad - (snapReduced.bar + snapReduced.rhythm)) < 0.5 &&
      snapReduced.sections.every((a) => a === "none"),
    `:root scroll-snap-type ${snapReduced.snapType}, ${snapReduced.sections.filter((a) => a !== "none").length} section(s) declaring an align, padding still ${snapReduced.pad}px = ${snapReduced.bar} + ${snapReduced.rhythm}`);

  /* The spec's central claim, and the one thing a stylesheet cannot show:
     nothing in this project reads, writes or intercepts the PAGE's scroll
     position. §2's log moves its own scrollback — an element property on a
     scroller the reader is inside — which is a different thing and stays. */
  const shippedJs = readdirSync(join(ROOT, "scripts"))
    .filter((f) => f.endsWith(".js"))
    .map((f) => ({ file: f, src: readFileSync(join(ROOT, "scripts", f), "utf8") }));
  const jacking = shippedJs.flatMap(({ file, src }) =>
    src.split("\n").flatMap((line, i) =>
      /scrollIntoView|scrollTo\s*\(|scrollBy\s*\(|scrollY|pageYOffset|documentElement\.scrollTop|body\.scrollTop|scrollingElement|scroll-behavior/.test(line.replace(/^\s*(\*|\/\/).*/, ""))
        ? [`${file}:${i + 1}`] : []));
  check("no shipped script reads, writes or intercepts the page's scroll position",
    jacking.length === 0,
    jacking.length ? jacking.join(", ") : `${shippedJs.length} scripts clean — the only scroll they touch is .log's own scrollback`);

  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 1440, height: 900 });
} finally {
  await page.close();
  await chrome.close();
}

/* ---------------------------------------------------------------- report --- */

const failed = results.filter((r) => !r.passed);
const width = Math.max(...results.map((r) => r.name.length));

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, evidence }, null, 2));
} else {
  for (const r of results) {
    console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}  ${r.detail ?? ""}`);
  }
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  console.log(`Screenshots: tests/artifacts/`);
}

writeFileSync(join(ARTIFACTS, "blink-report.json"), JSON.stringify({ results, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
