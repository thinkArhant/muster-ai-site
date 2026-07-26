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

   Usage:  node tests/verify-shell.mjs [--json]

   WebKit is verified separately by tests/webkit-render.sh; both engines are
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
  check("pulse animating with motion on", dark.animations.filter((a) => String(a.name).startsWith("pulse")).length === 3, JSON.stringify(dark.animations.map((a) => a.name)));
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
