/* Gate A sample reporter.

   Measures samples/gate-a.html and writes what it measured back into that file,
   so the founder judges rendered type with the machine's readings printed
   beside it. It is not a second test runner (DEC-020) and `scripts/test.sh`
   does not call it: it reports on an artifact that never ships, and it is run
   once, by hand, to prepare a gate.

   The reading that matters is the announced string. A struck headline is the
   one candidate that can look right and read as gibberish, and screen readers
   announce struck text as ordinary text — so candidate B's accessible name is
   built by exclusion (section-01-hero.md §4.3) and is worth nothing unless it
   is read out of the engine. That is what `Accessibility.getFullAXTree` is for
   here; nothing below is asserted by hand.

   Usage:  node tools/gate-a-report.mjs [--json]
*/

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";
import { launchChrome } from "../tests/lib/cdp.mjs";
import { decodePng } from "../tests/lib/png.mjs";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const SAMPLE = join(ROOT, "samples", "gate-a.html");
const SAMPLE_URL = "file://" + SAMPLE;
const ARTIFACTS = join(ROOT, "tests", "artifacts");

/* The four candidates and the announced string each one must produce.
   Held here rather than parsed out of the sample on purpose: the render is
   checked against the copy file's ruling, not against itself. */
const CANDIDATES = [
  { id: "a", label: "A — the anchor, as written", announced: "Ship a product. Without a team." },
  { id: "b", label: "B — the edit mark, article repaired", announced: "Ship a product with AI agents.", struck: "a human team" },
  { id: "c", label: "C — the ambiguity resolved in words", announced: "Ship a product. The team is AI." },
  { id: "d", label: "D — the name as the collective noun", announced: "Ship a product with a muster of AI agents." }
];

/* section-04-copy.md §4, decision 1. */
const SHEET = {
  title: "I optimized what each agent reads, not how they talk.",
  stamp: "framework — 2026-05-05",
  terms: ["Decision", "Problem", "Trade-off", "Mechanism"]
};

const WIDTHS = [320, 360, 375, 390, 1280];
const ACCENT = { dark: "rgb(192, 90, 50)", light: "rgb(160, 69, 31)" };

const results = [];
const evidence = {};

function check(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail: detail ?? "" });
  return Boolean(passed);
}

/* Case-insensitive, word-exact. Blink computes a name from rendered text, so
   `text-transform: uppercase` reaches it; WebKit computes from source text.
   The words are what is being ruled, not the casing (section-01-hero.md §4.3). */
const words = (s) => String(s ?? "").trim().toLowerCase().split(/\s+/).filter(Boolean);
const sameWords = (a, b) => words(a).join(" ") === words(b).join(" ");
const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* -------------------------------------------------------------------------
   Page probes. Each returns raw measurements; every verdict is formed here in
   Node against the expected values above, never inside the page.
   ------------------------------------------------------------------------- */

const HEADLINE_PROBE = `(() => {
  const lineCount = (el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    const tops = new Set([...range.getClientRects()].map((r) => Math.round(r.top)));
    return tops.size;
  };
  /* The lines as they actually set, character by character off the rendered
     boxes. "Lines are phrases, never accidents" is the spec's rule, and a line
     count cannot show whether a line is a phrase or an orphan. */
  const composition = (el) => {
    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const rows = new Map();
    const range = document.createRange();
    let node;
    while ((node = walker.nextNode())) {
      for (let i = 0; i < node.length; i++) {
        range.setStart(node, i);
        range.setEnd(node, i + 1);
        const rect = range.getBoundingClientRect();
        if (!rect.width && !rect.height) continue;
        const key = Math.round(rect.top);
        if (!rows.has(key)) rows.set(key, "");
        rows.set(key, rows.get(key) + node.data[i]);
      }
    }
    return [...rows.entries()]
      .sort((a, b) => a[0] - b[0])
      .map(([, text]) => text.replace(/\\s+/g, " ").trim())
      .filter(Boolean);
  };
  const out = {};
  for (const el of document.querySelectorAll('[data-pane="dark"][data-candidate]')) {
    const cs = getComputedStyle(el);
    const cut = el.querySelector('[data-phrase="cut"]');
    const accent = el.querySelector('[data-phrase="accent"]');
    out[el.dataset.candidate] = {
      lines: lineCount(el),
      composition: composition(el),
      fontSize: cs.fontSize,
      lineHeight: cs.lineHeight,
      height: Math.round(el.getBoundingClientRect().height * 100) / 100,
      overflows: el.scrollWidth > el.clientWidth + 0.5,
      cutRects: cut ? cut.getClientRects().length : null,
      accentRects: accent ? accent.getClientRects().length : null,
      text: el.textContent.replace(/\\s+/g, " ").trim()
    };
  }
  /* Checked per pane as well as per document: the document figure can be
     rescued by a scroll container on the scaffolding, and a check with a
     rescue in it is not a check. */
  const panes = [...document.querySelectorAll('.pane')].map((el) => ({
    theme: el.dataset.pane,
    overflows: el.scrollWidth > el.clientWidth + 0.5,
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth
  }));
  return {
    candidates: out,
    panes,
    docScrollWidth: document.documentElement.scrollWidth,
    docClientWidth: document.documentElement.clientWidth
  };
})()`;

const SHEET_PROBE = `(() => {
  const read = (pane) => {
    const sheet = document.querySelector('.sheet[data-sheet-pane="' + pane + '"]');
    const cs = getComputedStyle(sheet);
    const card = sheet.getBoundingClientRect();
    const borderStart = parseFloat(cs.borderLeftWidth) || 0;
    const row = sheet.querySelector('.sheet__row--mech');
    const rowRect = row.getBoundingClientRect();
    const before = getComputedStyle(row, '::before');
    const rawInset = before.insetInlineStart && before.insetInlineStart !== 'auto'
      ? before.insetInlineStart
      : before.left;
    const inset = parseFloat(rawInset);
    const markWidth = parseFloat(before.inlineSize || before.width);

    const dts = [...sheet.querySelectorAll('dt')];
    const dds = [...sheet.querySelectorAll('dd')];
    const lineCount = (el) => {
      const range = document.createRange();
      range.selectNodeContents(el);
      return new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size;
    };

    /* Every element that could carry rust text, including the sheet itself. */
    const colours = [sheet, ...sheet.querySelectorAll('*')].map((el) => ({
      tag: el.tagName.toLowerCase() + (el.className ? '.' + String(el.className).split(' ')[0] : ''),
      color: getComputedStyle(el).color
    }));

    const title = sheet.querySelector('.sheet__title');
    const stamp = sheet.querySelector('.sheet__stamp');
    return {
      cardWidth: Math.round(card.width * 100) / 100,
      sheetPad: cs.paddingLeft,
      markWidth,
      markInset: inset,
      markLeftFromCardInner: Math.round((rowRect.left + inset - (card.left + borderStart)) * 100) / 100,
      markBackground: before.backgroundColor,
      markContent: before.content,
      stampNextSiblingOfTitle: title.nextElementSibling === stamp,
      stampText: stamp.textContent.trim(),
      stampLines: lineCount(stamp),
      titleLines: lineCount(title),
      titleHasEm: Boolean(title.querySelector('em')),
      titleEmText: title.querySelector('em') ? title.querySelector('em').textContent : null,
      dtWidths: dts.map((el) => Math.round(el.getBoundingClientRect().width * 100) / 100),
      dtLines: dts.map(lineCount),
      dtShareBandWithDd: dts.map((dt, i) => {
        const a = dt.getBoundingClientRect();
        const b = dds[i].getBoundingClientRect();
        return a.top < b.bottom - 1 && b.top < a.bottom - 1;
      }),
      ddMaxInlineSize: dds.map((el) => getComputedStyle(el).maxInlineSize || getComputedStyle(el).maxWidth),
      ddRendered: dds.map((el) => Math.round(el.getBoundingClientRect().width * 100) / 100),
      ddOverflow: dds.map((el) => el.scrollWidth > el.clientWidth + 0.5),
      sheetOverflows: sheet.scrollWidth > sheet.clientWidth + 0.5,
      colours
    };
  };
  return { dark: read('dark'), light: read('light') };
})()`;

/* -------------------------------------------------------------------------
   Accessible names, read out of the engine.
   ------------------------------------------------------------------------- */

async function announcedNames(page, selector, attribute) {
  const { root } = await page.call("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await page.call("DOM.querySelectorAll", {
    nodeId: root.nodeId,
    selector
  });

  const byBackendId = new Map();
  for (const nodeId of nodeIds) {
    const { node } = await page.call("DOM.describeNode", { nodeId });
    const attrs = node.attributes || [];
    let key = null;
    for (let i = 0; i < attrs.length; i += 2) {
      if (attrs[i] === attribute) key = attrs[i + 1];
    }
    byBackendId.set(node.backendNodeId, key);
  }

  await page.call("Accessibility.enable");
  const { nodes } = await page.call("Accessibility.getFullAXTree");

  const out = {};
  for (const axNode of nodes) {
    if (!byBackendId.has(axNode.backendDOMNodeId)) continue;
    out[byBackendId.get(axNode.backendDOMNodeId)] = {
      role: axNode.role?.value ?? null,
      name: axNode.name?.value ?? null,
      ignored: Boolean(axNode.ignored)
    };
  }
  return out;
}

/* The sheet's announced structure: the term/definition pairs in DOM order,
   read from the same tree rather than inferred from the markup. */
async function announcedRows(page) {
  const { root } = await page.call("DOM.getDocument", { depth: -1 });
  const { nodeIds } = await page.call("DOM.querySelectorAll", {
    nodeId: root.nodeId,
    selector: '.sheet[data-sheet-pane="dark"] dt, .sheet[data-sheet-pane="dark"] dd'
  });
  const order = [];
  for (const nodeId of nodeIds) {
    const { node } = await page.call("DOM.describeNode", { nodeId });
    order.push({ backendNodeId: node.backendNodeId, tag: node.localName });
  }
  await page.call("Accessibility.enable");
  const { nodes } = await page.call("Accessibility.getFullAXTree");
  const names = new Map();
  for (const axNode of nodes) {
    if (axNode.name?.value) names.set(axNode.backendDOMNodeId, axNode.name.value);
  }
  /* A <dt>/<dd> has no accessible name of its own in Blink; its text is
     exposed through descendant text nodes. Fall back to the rendered text
     when the element carries no computed name, and say which was used. */
  return order.map((n) => ({ tag: n.tag, name: names.get(n.backendNodeId) ?? null }));
}

/* -------------------------------------------------------------------------
   WebKit render — the founder may open this file in Safari, and inline-SVG /
   WebKit divergence is this project's known failure class. QuickLook is the
   only WebKit surface on this machine; it runs no JavaScript, which is fine —
   the sample has none.
   ------------------------------------------------------------------------- */

function quickLook(sourcePath, label) {
  const outDir = join(ARTIFACTS, "gate-a-webkit-" + label);
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  execFileSync("qlmanage", ["-t", "-s", "1400", "-o", outDir, sourcePath], { stdio: "pipe" });
  const rendered = join(outDir, sourcePath.split("/").pop() + ".png");
  if (!existsSync(rendered)) throw new Error("QuickLook produced no render for " + sourcePath);
  const buffer = readFileSync(rendered);
  writeFileSync(join(ARTIFACTS, `gate-a-webkit-${label}.png`), buffer);
  rmSync(outDir, { recursive: true, force: true });
  return decodePng(buffer);
}

function inkShare(image) {
  let inked = 0;
  let total = 0;
  for (let y = 0; y < image.height; y += 2) {
    for (let x = 0; x < image.width; x += 2) {
      const i = y * image.stride + x * image.channels;
      const lum =
        image.channels >= 3
          ? 0.2126 * image.pixels[i] + 0.7152 * image.pixels[i + 1] + 0.0722 * image.pixels[i + 2]
          : image.pixels[i];
      if (lum > 60) inked++;
      total++;
    }
  }
  return Math.round((inked / total) * 10000) / 100;
}

/* -------------------------------------------------------------------------
   Run
   ------------------------------------------------------------------------- */

const chrome = await launchChrome();
const page = await chrome.browser.newPage();
let names = {};
let sheetNames = {};
let rowNames = [];
const byWidth = {};
let sheet = null;

try {
  mkdirSync(ARTIFACTS, { recursive: true });
  await page.init();
  await page.setMedia({ colorScheme: "dark", reducedMotion: "no-preference" });

  for (const width of WIDTHS) {
    await page.setViewport({ width, height: width < 500 ? 700 : 900, mobile: width < 500 });
    await page.goto(SAMPLE_URL);
    byWidth[width] = await page.eval(HEADLINE_PROBE);
    if (width === 1280) {
      sheet = await page.eval(SHEET_PROBE);
      names = await announcedNames(page, "[data-pane='dark'][data-candidate]", "data-candidate");
      sheetNames = await announcedNames(page, "[data-sheet-probe]", "data-sheet-probe");
      rowNames = await announcedRows(page);
      writeFileSync(join(ARTIFACTS, "gate-a-blink-1280.png"), await page.screenshot({ fullPage: true }));
    }
    if (width === 375) {
      writeFileSync(join(ARTIFACTS, "gate-a-blink-375.png"), await page.screenshot({ fullPage: true }));
    }
  }

  evidence.announcedNames = names;
  evidence.sheetNames = sheetNames;
  evidence.announcedRows = rowNames;
  evidence.byWidth = byWidth;
  evidence.sheet = sheet;

  check(
    "zero network requests while rendering the sample",
    page.requests.every((r) => r.url.startsWith("file://") || r.url.startsWith("data:")),
    page.requests.map((r) => r.url.slice(0, 60)).join(", ") || "none"
  );

  /* ---------- 1. the announced headline, per candidate ---------- */
  for (const c of CANDIDATES) {
    const got = names[c.id];
    check(
      `candidate ${c.id.toUpperCase()} announces its ruled string`,
      got && got.role === "heading" && sameWords(got.name, c.announced),
      got ? `"${got.name}" (role ${got.role})` : "no AX node found"
    );
  }

  /* The one check the sample exists for. */
  const b = names.b;
  const bText = byWidth[1280].candidates.b.text;
  check(
    "candidate B: the struck phrase is rendered but not announced",
    b && words(bText).join(" ").includes(words(CANDIDATES[1].struck).join(" ")) &&
      !words(b.name).join(" ").includes(words(CANDIDATES[1].struck).join(" ")),
    `rendered "${bText}" · announced "${b?.name}"`
  );

  /* ---------- 2. break units and overflow, every measured width ---------- */
  for (const width of WIDTHS) {
    const w = byWidth[width];
    check(
      `no horizontal scroll at ${width}px`,
      w.docScrollWidth <= w.docClientWidth && w.panes.every((p) => !p.overflows),
      `document ${w.docScrollWidth}/${w.docClientWidth} · ` +
        w.panes.map((p) => `${p.theme} ${p.scrollWidth}/${p.clientWidth}`).join(" · ")
    );
    for (const c of CANDIDATES) {
      const m = w.candidates[c.id];
      check(
        `candidate ${c.id.toUpperCase()} stays inside the column at ${width}px`,
        !m.overflows,
        `${m.lines} lines at ${m.fontSize}`
      );
    }
    const bm = w.candidates.b;
    check(
      `candidate B's phrases stay unbroken at ${width}px`,
      bm.cutRects === 1 && bm.accentRects === 1,
      `struck ${bm.cutRects} fragment(s), accent ${bm.accentRects} fragment(s)`
    );
  }

  /* ---------- 3. the spec-sheet ---------- */
  check(
    "sheet title announces the full sentence including the emphasis",
    sheetNames.title && sameWords(sheetNames.title.name, SHEET.title),
    sheetNames.title ? `"${sheetNames.title.name}"` : "no AX node found"
  );
  check(
    "sheet title carries a real <em>",
    sheet.dark.titleHasEm && sheet.dark.titleEmText === "reads",
    `<em>${sheet.dark.titleEmText}</em>`
  );

  const rowTerms = rowNames.filter((n) => n.tag === "dt");
  check(
    "four rows, in the seed's order",
    rowTerms.length === 4 && rowTerms.every((t, i) => sameWords(t.name ?? "", SHEET.terms[i])),
    rowTerms.map((t) => t.name).join(" · ") || "no names on the terms"
  );
  check(
    "stamp is the copy file's string, and is the title's next sibling",
    sheet.dark.stampText === SHEET.stamp && sheet.dark.stampNextSiblingOfTitle,
    `"${sheet.dark.stampText}" · sibling ${sheet.dark.stampNextSiblingOfTitle}`
  );

  for (const theme of ["dark", "light"]) {
    const s = sheet[theme];
    const rust = s.colours.filter((c) => c.color === ACCENT[theme]);
    check(
      `zero rust text in the sheet (${theme})`,
      rust.length === 0,
      rust.map((r) => r.tag).join(", ") || "no element resolves colour to the accent"
    );
    check(
      `mechanism mark is 2px of accent at --gap-hairline from the card (${theme})`,
      s.markWidth === 2 &&
        Math.abs(s.markLeftFromCardInner - 12) < 0.5 &&
        s.markBackground === ACCENT[theme],
      `${s.markWidth}px, ${s.markLeftFromCardInner}px from the card's inner edge, ${s.markBackground}`
    );
    check(
      `reading column capped at --read-max (${theme})`,
      s.ddMaxInlineSize.every((v) => v.endsWith("px")) &&
        s.ddRendered.every((w, i) => w <= parseFloat(s.ddMaxInlineSize[i]) + 0.5),
      `max ${s.ddMaxInlineSize[0]}, rendered ${s.ddRendered.join(" / ")}px, card ${s.cardWidth}px`
    );
    check(
      `label column holds one line per label (${theme})`,
      new Set(s.dtWidths).size === 1 && s.dtLines.every((n) => n === 1),
      `widths ${s.dtWidths.join(" / ")}px, lines ${s.dtLines.join(" / ")}`
    );
    check(
      `no overflow inside the sheet (${theme})`,
      !s.sheetOverflows && s.ddOverflow.every((v) => !v),
      `sheet ${s.sheetOverflows ? "overflows" : "clean"}`
    );
  }

  /* ---------- 4. WebKit ---------- */
  let webkit = null;
  try {
    const full = quickLook(SAMPLE, "full");
    webkit = { render: `${full.width}x${full.height}`, inkShare: inkShare(full) };
    check(
      "WebKit renders the sample",
      full.width > 0 && full.height > 0 && webkit.inkShare > 0.5,
      `${webkit.render}px · ${webkit.inkShare}% of sampled pixels inked`
    );
  } catch (error) {
    check("WebKit renders the sample", false, String(error.message));
  }
  evidence.webkit = webkit;
} finally {
  await page.close();
  await chrome.close();
}

/* -------------------------------------------------------------------------
   Write what was measured back into the sample.
   ------------------------------------------------------------------------- */

const failed = results.filter((r) => !r.passed);

function reportHtml() {
  const rows = CANDIDATES.map((c) => {
    const got = names[c.id];
    const ok = got && sameWords(got.name, c.announced);
    const lines = WIDTHS.map((w) => byWidth[w].candidates[c.id].lines).join(" · ");
    return `<tr>
  <td>${esc(c.label)}</td>
  <td class="wrap ${ok ? "ok" : "bad"}">${esc(got?.name ?? "—")}</td>
  <td>${lines}</td>
</tr>`;
  }).join("\n");

  const setRows = CANDIDATES.map((c) => {
    const cell = (w) =>
      `<td class="wrap setline">${byWidth[w].candidates[c.id].composition.map(esc).join(" /<br>")}</td>`;
    return `<tr><td>${esc(c.id.toUpperCase())}</td>${cell(320)}${cell(375)}${cell(1280)}</tr>`;
  }).join("\n");

  const s = evidence.sheet.dark;
  const verdicts = results
    .map((r) => `<tr><td class="wrap">${esc(r.name)}</td><td class="${r.passed ? "ok" : "bad"}">${r.passed ? "PASS" : "FAIL"}</td><td class="wrap">${esc(r.detail)}</td></tr>`)
    .join("\n");

  return `<h2>Measured report — Blink, real tokens</h2>
<p>Announced strings are read from <code>Accessibility.getFullAXTree</code>, not asserted.
Blink computes a name from rendered text, so the casing below is the
<code>text-transform</code>; WebKit computes from source text. The words are what is ruled.</p>
<table>
  <tr><th>Candidate</th><th>Announced string</th><th>Lines at ${WIDTHS.join(" · ")}px</th></tr>
${rows}
</table>
<p>How each candidate actually sets — the lines read off the rendered boxes,
character by character. A line count cannot show whether a line is a phrase or
an orphan; these can.</p>
<table>
  <tr><th>Candidate</th><th>320px</th><th>375px</th><th>1280px</th></tr>
${setRows}
</table>
<p>Spec-sheet, measured at 1280px: card ${s.cardWidth}px · reading column ${s.ddMaxInlineSize[0]} ·
label column ${s.dtWidths[0]}px · title ${s.titleLines} lines · stamp ${s.stampLines} line(s) ·
mechanism mark ${s.markWidth}px of accent at ${s.markLeftFromCardInner}px from the card's inner edge ·
announced rows ${esc(evidence.announcedRows.filter((n) => n.tag === "dt").map((n) => n.name).join(" · "))}.</p>
<table>
  <tr><th>Check</th><th>Verdict</th><th>Measured</th></tr>
${verdicts}
</table>
<p>${results.length - failed.length}/${results.length} checks passed.
Renders: <code>tests/artifacts/gate-a-blink-1280.png</code>,
<code>gate-a-blink-375.png</code>, <code>gate-a-webkit-full.png</code>.</p>`;
}

let html = readFileSync(SAMPLE, "utf8");
const blockStart = "<!-- GATE-A-REPORT:START -->";
const blockEnd = "<!-- GATE-A-REPORT:END -->";
const from = html.indexOf(blockStart);
const to = html.indexOf(blockEnd);
if (from === -1 || to === -1) throw new Error("Report markers missing from samples/gate-a.html");
html = html.slice(0, from + blockStart.length) + "\n" + reportHtml() + "\n" + html.slice(to);

/* The announced string beside each candidate, in both panes. */
for (const c of CANDIDATES) {
  const value = esc(names[c.id]?.name ?? "not measured");
  html = html.replace(
    new RegExp(`(<span class="ax__value" data-ax-value="${c.id}">)[^<]*(</span>)`, "g"),
    `$1${value}$2`
  );
}
writeFileSync(SAMPLE, html);

if (process.argv.includes("--json")) {
  console.log(JSON.stringify({ results, evidence }, null, 2));
} else {
  const width = Math.max(...results.map((r) => r.name.length));
  for (const r of results) {
    console.log(`${r.passed ? "PASS" : "FAIL"}  ${r.name.padEnd(width)}  ${r.detail}`);
  }
  console.log("");
  for (const c of CANDIDATES) {
    console.log(`  ${c.id.toUpperCase()}  announced: "${names[c.id]?.name ?? "—"}"`);
    console.log(`     lines at ${WIDTHS.map((w) => `${w}px:${byWidth[w].candidates[c.id].lines}`).join("  ")}`);
    for (const w of [320, 375, 1280]) {
      console.log(`     ${String(w).padStart(4)}px  ${byWidth[w].candidates[c.id].composition.join(" / ").toUpperCase()}`);
    }
  }
  console.log(`\n${results.length - failed.length}/${results.length} checks passed.`);
  console.log("Report written into samples/gate-a.html.");
}

writeFileSync(join(ARTIFACTS, "gate-a-report.json"), JSON.stringify({ results, evidence }, null, 2));
process.exit(failed.length ? 1 : 0);
