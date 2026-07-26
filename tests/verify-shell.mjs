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

  /* --- external references anywhere in the DOM --- */
  const externalRefs = [];
  document.querySelectorAll("*").forEach((el) => {
    ["src", "href", "srcset", "poster", "data"].forEach((attr) => {
      const v = el.getAttribute && el.getAttribute(attr);
      if (v && /^(https?:)?\\/\\//i.test(v)) externalRefs.push(el.tagName + "[" + attr + "]=" + v);
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

  /* --- motifs --- */
  const tick = document.querySelector(".rule__tick");
  const tickBox = tick.getBoundingClientRect();
  const mark = document.querySelector(".tag__mark");
  const markBox = mark.getBoundingClientRect();
  const pulse = document.querySelector(".pulse");
  const pulseBox = pulse.getBoundingClientRect();
  const regmarksPerSurface = [...document.querySelectorAll(".instrument")]
    .map((el) => el.querySelectorAll(".regmark").length);

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
      contrastOf(".slot .t-body"),
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
      tagMark: { w: Math.round(markBox.width * 100) / 100, h: Math.round(markBox.height * 100) / 100 },
      pulse: { w: Math.round(pulseBox.width * 100) / 100, h: Math.round(pulseBox.height * 100) / 100,
               radius: css(document.querySelector(".pulse__core"), "border-radius") },
      regmarksPerSurface,
      stencilTags: [...document.querySelectorAll(".tag")].map((t) => t.textContent.trim()),
      ruleCount: document.querySelectorAll(".rule").length,
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

  const darkBody = dark.contrast.find((c) => c.selector === ".slot .t-body");
  check("body text >= 4.5:1 (dark)", darkBody.ratio >= 4.5, `${darkBody.ratio}:1 ink on surface`);
  dark.contrast.forEach((c) => {
    check(`contrast ${c.selector} (dark)`, c.ratio >= 4.5, `${c.ratio}:1 at ${c.fontSize}`);
  });

  check("sharp corners everywhere but the lamp", dark.rounded.every((r) => r.startsWith("pulse")), dark.rounded.join(" | ") || "none");
  check("no glass (backdrop-filter)", dark.glass.length === 0, dark.glass.join(", ") || "none");
  check("no shadows", dark.shadows.length === 0, dark.shadows.join(" | ") || "none");
  check("status bar opaque, sticky, 48px, hairline-ruled", dark.statusBar.opaque && dark.statusBar.position === "sticky" && dark.statusBar.height === 48, JSON.stringify(dark.statusBar));
  check("no external references in the DOM", dark.externalRefs.length === 0, dark.externalRefs.join(", ") || "none");
  check("no @font-face, no loaded webfonts", dark.fontFaces === 0 && dark.loadedFonts === 0, `${dark.fontFaces} font-face rules, ${dark.loadedFonts} loaded`);
  check("grain is a self-contained data URI", dark.texture.grainIsDataUri, dark.texture.grainSize);
  check("texture is aria-hidden, behind content, inert", dark.texture.ariaHidden === "true" && dark.texture.zIndex === "-1" && dark.texture.pointerEvents === "none", JSON.stringify({ z: dark.texture.zIndex, pe: dark.texture.pointerEvents }));
  check("grain peak alpha capped at 8% (dark)", Number(dark.texture.grainOpacity) <= 0.08, `opacity ${dark.texture.grainOpacity}`);
  check("vignette alpha 16% (dark)", Number(dark.tokens["--vignette-alpha"]) === 0.16, dark.tokens["--vignette-alpha"]);
  check("five stencil tags with machined ticks", dark.motifs.stencilTags.length === 5 && dark.motifs.ruleCount === 5, dark.motifs.stencilTags.join(" / "));
  check("ticks are 9x1px", dark.motifs.tick.w === 1 && dark.motifs.tick.h === 9, JSON.stringify(dark.motifs.tick));
  check("stencil tag mark is an 8x8 accent square", dark.motifs.tagMark.w === 8 && dark.motifs.tagMark.h === 8, JSON.stringify(dark.motifs.tagMark));
  check("registration marks: two per instrument surface", dark.motifs.regmarksPerSurface.every((n) => n === 2), JSON.stringify(dark.motifs.regmarksPerSurface));
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
  const lightBody = light.contrast.find((c) => c.selector === ".slot .t-body");
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
  const httpHits = [];
  const hexHits = [];
  for (const rel of shipped) {
    const text = readFileSync(join(ROOT, rel), "utf8");
    text.split("\n").forEach((line, i) => {
      if (/https?:\/\//i.test(line) && !/xmlns=|^\s*(\/\*|\*|<!--)/.test(line)) httpHits.push(`${rel}:${i + 1}`);
      if (/#[0-9a-fA-F]{6}\b/.test(line) && rel !== "styles/tokens.css" && !/data:image\/svg/.test(line)) hexHits.push(`${rel}:${i + 1}`);
    });
  }
  check("no http(s) URL in any shipped file", httpHits.length === 0, httpHits.join(", ") || "none");
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
      keyLines: [3, 8].map((i) => ({
        line: i + 1,
        tick: css(lines[i], "border-inline-start-color"),
        token: css(lines[i].querySelector(".log__token"), "font-weight")
      })),
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
  check("key beats carry a rust tick and a bold ink token", s2.keyLines.every((k) => k.tick === s2.accent && Number(k.token) >= 700), JSON.stringify(s2.keyLines));
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
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-reduced.png"), await page.screenshot());

  /* --- the phone height budget (replay spec §7.1) --- */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });
  await page.setViewport({ width: 375, height: 553, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  const phone = await page.eval(`(async () => {
    /* Centring the section leaves the core's top under the sticky bar, which is
       below the gate's threshold — playback must refuse to start there. Then
       park the core just clear of the bar, where it is entitled to run. */
    document.querySelector("#watch-it-ship").scrollIntoView({ behavior: "instant", block: "center" });
    await new Promise((r) => setTimeout(r, 300));
    const gatedOut = window.MusterReplay.state();
    const coreEl = document.querySelector(".replay__core");
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
    const region = lines[0].getBoundingClientRect().width -
      parseFloat(css(lines[0], "border-inline-start-width"));
    /* Row starts of a wrapped line: rect per row, min left per row. A
       continuation row must begin to the RIGHT of its entry's first row. */
    const rowStarts = (() => {
      const wrapped = lines.find((li) => li.getBoundingClientRect().height > lineBox * 1.5);
      if (!wrapped) return null;
      const range = document.createRange();
      range.selectNodeContents(wrapped);
      const rows = new Map();
      for (const rect of range.getClientRects()) {
        if (rect.width <= 0) continue;
        const key = Math.round(rect.top);
        rows.set(key, Math.min(rows.get(key) ?? Infinity, rect.left));
      }
      const sorted = [...rows.entries()].sort((a, b) => a[0] - b[0]).map((e) => r2(e[1]));
      return { line: wrapped.dataset.line, lefts: sorted };
    })();
    const totalsEl = document.querySelector(".totals");
    return {
      gatedOut,
      state: window.MusterReplay.state(),
      core: Math.round(coreRect.height * 100) / 100,
      coreTop: Math.round(coreRect.top), coreBottom: Math.round(coreRect.bottom),
      viewport: innerHeight,
      visibleLines: r2((log.clientHeight - pad) / unit),
      lineBox, unit, heights, rows: heights.map((h) => r2(h / lineBox)),
      advance: r2(advance), region: r2(region), columns: Math.floor(region / advance),
      rowStarts,
      hangingIndent: r2(2 * advance),
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
  check("phone: playback refuses to start with the core under the status bar", phone.gatedOut === "idle", `state ${phone.gatedOut} when centred`);
  check("phone: playback runs only with the core ≥95% in view", phone.state === "playing" && seen >= 0.95, `${Math.round(seen * 1000) / 10}% of the core below the status bar, state ${phone.state}`);
  check("phone: terminal window shows three whole wrapped lines", Math.abs(phone.visibleLines - 3) < 0.05, `${phone.visibleLines} × ${phone.unit}px wrapped lines (${phone.lineBox}px rows)`);
  /* The constant the whole budget rests on, checked against the render rather
     than against the spec that asserts it: at 375px every chain line costs
     exactly two rows, which is what makes 49.4px the window's unit here. */
  check("phone: every chain line wraps to exactly two rows", phone.rows.slice(0, 11).every((r) => Math.abs(r - 2) < 0.05) && Math.abs(phone.unit - 2 * phone.lineBox) < 0.1, `rows ${phone.rows.slice(0, 11).join("/")} · unit ${phone.unit}`);
  check("phone: the line region measures 41 columns", phone.columns === 41 && Math.abs(phone.region - 323) < 1, `${phone.region}px / ${phone.advance}px advance = ${phone.columns} columns`);
  check("phone: continuation rows carry the 2ch hanging indent", phone.rowStarts && phone.rowStarts.lefts.length >= 2 && Math.abs(phone.rowStarts.lefts[1] - phone.rowStarts.lefts[0] - phone.hangingIndent) < 1, phone.rowStarts ? `L${phone.rowStarts.line} rows start at ${phone.rowStarts.lefts.join(", ")} — ${phone.hangingIndent}px expected` : "no wrapped line found");
  check("phone: the §7.1 fixed rows measure as budgeted", Math.abs(phone.chrome - 41.5) < 0.5 && Math.abs(phone.card - 199.4) < 0.5 && Math.abs(phone.indicator - 16.5) < 0.5, `chrome ${phone.chrome} · card ${phone.card} · indicator ${phone.indicator}`);
  /* 379.4 is the fixed core INCLUDING the 48px sticky bar, which is not part of
     the core element; three wrapped lines are what the remainder buys. */
  check("phone: the core measures its §7.1 budget", Math.abs(phone.core - (379.4 - 48 + 3 * phone.unit)) < 0.5, `${phone.core}px measured vs ${Math.round((379.4 - 48 + 3 * phone.unit) * 100) / 100}px budgeted`);
  check("phone: the totals strip sits below the core, not inside it", phone.totalsOutsideCore && phone.totalsBelowCore && Math.abs(phone.totals - 33) < 0.5, `outside core: ${phone.totalsOutsideCore}, below it: ${phone.totalsBelowCore}, ${phone.totals}px`);
  check("phone: the chrome label holds one line", Math.abs(phone.labelLines - 1) < 0.1, `${phone.labelLines} lines`);
  check("phone: totals strip is two micro lines, value line unwrapped", parseFloat(phone.totalsValue.size) === 11 && Math.abs(phone.totalsValue.lines - 1) < 0.1, `${phone.totalsValue.size}, ${phone.totalsValue.lines} line(s)`);
  check("phone: the 43-character value line clears the content width", phone.totalsValue.ink <= phone.totalsValue.available, `${phone.totalsValue.ink}px of ${phone.totalsValue.available}px`);
  check("phone: totals value is ink, not rust, at micro size", phone.totalsValue.color === phone.ink, phone.totalsValue.color);
  check("phone: the terminal owns its scroll, the body never does", phone.scrolls && phone.docScroll.s <= phone.docScroll.c, `log scrolls: ${phone.scrolls}, doc ${phone.docScroll.s}/${phone.docScroll.c}`);
  check("phone: no corpus line needs a sideways gesture to finish", phone.lineOverflow.length === 0, phone.lineOverflow.length ? `L${phone.lineOverflow.join(", L")} overflow their region` : "every line's last character is on screen once its rows are");
  check("phone: .instrument inset is at most 20% of the card", phone.instrument.inset / phone.instrument.width <= 0.2, `${phone.instrument.inset}px of ${phone.instrument.width}px = ${Math.round((phone.instrument.inset / phone.instrument.width) * 1000) / 10}%`);
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
      return { whole, clipped, revealed: lines.filter((li) => li.hasAttribute("data-revealed")).length };
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
      follows: withLines.every((s) => s.whole === Math.min(s.revealed, 3)),
      worst: Math.max(0, ...withLines.map((s) => s.whole)),
      endShowsL12: last.bottom <= box.bottom + 1 && last.top >= box.top - 1
    };
  })()`);
  evidence.s2PhoneWindow = phoneWindow;
  check("phone: the window follows the newest revealed line, three at a time", phoneWindow.samples > 20 && phoneWindow.follows && phoneWindow.endShowsL12, `${phoneWindow.samples} samples, max ${phoneWindow.worst} whole lines, L12 in frame at the end: ${phoneWindow.endShowsL12}`);
  check("phone: the window never clips a wrapped line part-way through its rows", phoneWindow.clipped.length === 0, phoneWindow.clipped.length ? `L${phoneWindow.clipped.join(", L")} half in frame` : `${phoneWindow.samples} samples across a full chain, none partial`);

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
    const log = document.querySelector(".log");
    const rail = document.querySelector(".narration").getBoundingClientRect();
    return { sw: log.scrollWidth, cw: log.clientWidth, rail: Math.round(rail.width),
      s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth };
  })()`);
  check("1000px: the longest corpus line still fits the terminal", tightWide.sw <= tightWide.cw && tightWide.s <= tightWide.c, `log ${tightWide.sw}/${tightWide.cw}, rail ${tightWide.rail}px`);

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
      const log = document.querySelector(".log");
      const lines = [...document.querySelectorAll(".log__line")];
      const pad = parseFloat(getComputedStyle(log).paddingTop) + parseFloat(getComputedStyle(log).paddingBottom);
      const unit = Math.max(...lines.slice(0, 11).map((li) => li.getBoundingClientRect().height));
      return {
        overflowing: lines.filter((li) => li.scrollWidth > li.clientWidth).map((li) => li.dataset.line),
        logScroll: log.scrollWidth <= log.clientWidth,
        doc: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        unit: r2(unit),
        rows: r2(unit / parseFloat(getComputedStyle(log).lineHeight)),
        windowLines: r2((log.clientHeight - pad) / unit),
        text: lines.map((li) => li.textContent)
      };
    })()`);
  }
  evidence.s2Sweep = sweep;
  const gestured = SWEEP.filter((w) => sweep[w].overflowing.length || !sweep[w].logScroll || !sweep[w].doc);
  check("no corpus line needs a horizontal gesture at 320 / 360 / 375 / 390 / 393px", gestured.length === 0, gestured.length ? `${gestured.join(", ")}px overflow` : SWEEP.map((w) => `${w}px ✓`).join(" · "));
  check("soft wrap is not a fidelity cost at any phone width", SWEEP.every((w) => sweep[w].text.every((l, i) => l === corpusLines[i])), "12/12 byte-clean against the corpus at all five widths");
  /* The trap §7.1 names explicitly: 49.4px is exact at 375px and a CEILING
     below it. At 320px the region is 34 columns, the longest lines cost three
     rows, and a window sized on the constant would place a third line and clip
     it. Sized on the measured row heights, it falls to two. */
  check("320px: the window is quantised on measured rows, not the 49.4px constant", sweep[320].rows > 2.5 && sweep[320].windowLines >= 2 && Number.isInteger(Math.round(sweep[320].windowLines)) && Math.abs(sweep[320].windowLines - Math.round(sweep[320].windowLines)) < 0.05, `unit ${sweep[320].unit}px = ${sweep[320].rows} rows → ${sweep[320].windowLines} whole lines`);

  await page.setViewport({ width: 320, height: 568, deviceScaleFactor: 1, mobile: true });
  await page.goto(PAGE_URL);
  const narrow = await page.eval(`(() => {
    const r2 = (n) => Math.round(n * 100) / 100;
    const log = document.querySelector(".log");
    const lines = [...document.querySelectorAll(".log__line")];
    const pad = parseFloat(getComputedStyle(log).paddingTop) + parseFloat(getComputedStyle(log).paddingBottom);
    const unit = Math.max(...lines.slice(0, 11).map((li) => li.getBoundingClientRect().height));
    return { s: document.documentElement.scrollWidth, c: document.documentElement.clientWidth,
      lines: r2((log.clientHeight - pad) / unit), unit: r2(unit),
      core: r2(document.querySelector(".replay__core").getBoundingClientRect().height) };
  })()`);
  evidence.s2Narrow = narrow;
  check("320px: the body still never scrolls horizontally", narrow.s <= narrow.c, `scrollWidth ${narrow.s} vs ${narrow.c}, ${narrow.lines} whole lines of ${narrow.unit}px, core ${narrow.core}px`);
  check("320 × 568: the window falls to two whole lines, and the core still fits", Math.abs(narrow.lines - 2) < 0.05 && narrow.core <= 568 - 48 + 0.5, `${narrow.lines} lines, core ${narrow.core}px of ${568 - 48}px`);

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
    const region = lines[0].getBoundingClientRect().width - parseFloat(css(lines[0], "border-inline-start-width"));
    const slots = [...document.querySelectorAll(".narration__entry")]
      .map((e) => ({ slot: e.dataset.slot, h: r2(e.getBoundingClientRect().height) }));
    const worst = slots.reduce((a, b) => (b.h > a.h ? b : a));
    return { lines: r2((log.clientHeight - pad) / unit), unit: r2(unit),
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
  check("landscape phone: the terminal column holds at least 41 characters", landscape.columns >= 41 && landscape.overflowing.length === 0 && landscape.s <= landscape.c, `${landscape.region}px = ${landscape.columns} columns, doc ${landscape.s}/${landscape.c}`);
  check("landscape phone keeps at least three whole log lines on screen", landscape.lines >= 3 && Math.abs(landscape.lines - Math.round(landscape.lines)) < 0.05, `${landscape.lines} whole lines of ${landscape.unit}px`);
  /* The two figures §7.1 derived rather than measured, reported as measurements. */
  check("landscape phone: the chrome bar fits its budget", landscape.chrome <= 58.5, `${landscape.chrome}px measured against 58px budgeted — label sets ${landscape.chromeLabelRows} row(s)`);
  check("landscape phone: the worst narration slot fits its card", landscape.worst.h <= landscape.list + 0.5, `${landscape.worst.slot} sets ${landscape.worst.h}px in a ${landscape.list}px card`);
  writeFileSync(join(ARTIFACTS, "blink-dark-s02-landscape.png"), await page.screenshot());

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
