/* Closing round — render and MEASURE the two proposals in Blink.

     node samples/closing-round-renders/build-proposals.mjs
     node samples/closing-round-renders/render-proposals.mjs

   Everything ruled this round is ruled off this file's output. Nothing is
   judged on a hypothesis: each candidate is rendered in the page's real
   tokens, at named viewports, and every number below names its engine and
   viewport in the report it lands in.

   Report → closing-round-report.json. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync, readFileSync, rmSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const A = "file://" + join(ROOT, "samples", "closing-round-a.html");
const B = "file://" + join(ROOT, "samples", "closing-round-b.html");
const SHIPPED = "file://" + join(ROOT, "index.html");

const report = { engine: "Blink (headless Chrome, CDP)", viewports: {} };

/* Line-splitting: bucket every rendered character by the top of its own client
   rect, so a "line" is what the engine actually laid out rather than what a
   character count predicts. */
const LINES_OF = `
function linesOf(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  const lines = [];
  let node;
  while ((node = walker.nextNode())) {
    const text = node.nodeValue;
    for (let i = 0; i < text.length; i++) {
      const r = document.createRange();
      r.setStart(node, i); r.setEnd(node, i + 1);
      const rect = r.getBoundingClientRect();
      if (!rect.width && !rect.height) continue;
      let line = lines.find(l => Math.abs(l.top - rect.top) < 3);
      if (!line) { line = { top: rect.top, chars: [] }; lines.push(line); }
      line.chars.push(text[i]);
    }
  }
  lines.sort((a, b) => a.top - b.top);
  return lines.map(l => l.chars.join("").trim());
}
`;

const { browser, close } = await launchChrome();

async function shot(page, name, clip) {
  const params = { format: "png" };
  if (clip) { params.clip = { ...clip, scale: 1 }; params.captureBeyondViewport = true; }
  const { data } = await page.call("Page.captureScreenshot", params);
  writeFileSync(join(OUT, name + ".png"), Buffer.from(data, "base64"));
}

async function clipOf(page, selector, pad = 16) {
  const box = await page.eval(`(() => {
    const el = document.querySelector(${JSON.stringify(selector)});
    if (!el) return null;
    const r = el.getBoundingClientRect();
    return { x: r.x + scrollX, y: r.y + scrollY, width: r.width, height: r.height };
  })()`);
  if (!box) return null;
  return {
    x: Math.max(0, box.x - pad),
    y: Math.max(0, box.y - pad),
    width: box.width + pad * 2,
    height: box.height + pad * 2
  };
}

try {
  const page = await browser.newPage();
  await page.init();
  await page.setMedia({ colorScheme: "dark" });

  /* ============================================================ DESKTOP 1280 */
  await page.setViewport({ width: 1280, height: 700 });

  /* --- §1 in situ, both options, headline and formation above the strip --- */
  for (const [label, url] of [["a", A], ["b", B]]) {
    await page.goto(url);
    await shot(page, `s01-${label}-d1280`);
    /* The whole hero, past the 700 fold: the strip is judged in situ, under the
       headline and the formation, with the curl that closes the section. */
    await shot(page, `s01-${label}-full-d1280`, await clipOf(page, "#hero", 0));
    report.viewports[`s01-${label}-1280x700`] = await page.eval(`(() => {
      const box = (el) => { if (!el) return null; const r = el.getBoundingClientRect();
        return { x: +r.x.toFixed(2), y: +r.y.toFixed(2), w: +r.width.toFixed(2), h: +r.height.toFixed(2), bottom: +r.bottom.toFixed(2) }; };
      const c = document.querySelector('#hero .container');
      const cs = getComputedStyle(c);
      const rail = c.getBoundingClientRect().x + parseFloat(cs.paddingInlineStart || cs.paddingLeft);
      const rem = document.querySelector('.remnant');
      const vals = [...document.querySelectorAll('.remnant__value')].map(v => ({
        text: v.textContent.trim(),
        color: getComputedStyle(v).color,
        fontSize: getComputedStyle(v).fontSize,
        animation: getComputedStyle(v).animationName,
        transition: getComputedStyle(v).transitionDuration
      }));
      return {
        rail: +rail.toFixed(2),
        heroHeight: +document.querySelector('#hero').getBoundingClientRect().height.toFixed(2),
        headline: box(document.querySelector('#hero h1')),
        caption: box(document.querySelector('.formation__caption')),
        remnant: box(rem),
        remnantInlineStart: +rem.getBoundingClientRect().x.toFixed(2),
        chip: box(document.querySelector('.remnant .chip')),
        curl: box(document.querySelector('#hero .curl')),
        values: vals,
        foldClear: +(700 - document.querySelector('.formation__caption').getBoundingClientRect().bottom).toFixed(2)
      };
    })()`);
  }

  /* ------------------------------------------------- §5, the rebuilt cards */
  await page.goto(A);
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 1700))`); /* past --countup-duration */
  await shot(page, "s05-d1280", await clipOf(page, "#shipped-with-muster .section__body", 24));

  report.s05_1280x700 = await page.eval(`(() => {
    ${LINES_OF}
    const cards = [...document.querySelectorAll('.shipped__card')];
    const cardData = cards.map(card => {
      const r = card.getBoundingClientRect();
      const cells = [...card.querySelectorAll('.shipped__cell')].map(cell => {
        const key = cell.querySelector('.readout__key');
        const val = cell.querySelector('.readout__value');
        const sub = cell.querySelector('.readout__sub');
        const cs = getComputedStyle(val);
        return {
          key: key.textContent.trim(),
          value: val.textContent.trim(),
          valueColor: cs.color,
          valueFontSize: cs.fontSize,
          valueFontFamily: cs.fontFamily.split(',')[0],
          valueVariantNumeric: cs.fontVariantNumeric,
          valueAnimation: cs.animationName,
          valueTransition: cs.transitionDuration,
          countup: !!val.querySelector('[data-countup]'),
          sub: sub ? sub.textContent.trim() : null,
          subTop: sub ? +sub.getBoundingClientRect().top.toFixed(2) : null,
          cellTop: +cell.getBoundingClientRect().top.toFixed(2),
          cellHeight: +cell.getBoundingClientRect().height.toFixed(2),
          valueTop: +val.getBoundingClientRect().top.toFixed(2)
        };
      });
      return {
        scope: card.querySelector('.shipped__scope').textContent.trim(),
        height: +r.height.toFixed(2),
        width: +r.width.toFixed(2),
        top: +r.y.toFixed(2),
        cardCaptions: card.querySelectorAll('.shipped__caption').length,
        cells
      };
    });
    const lines = [...document.querySelectorAll('.shipped__line')].map(l => {
      const r = l.getBoundingClientRect();
      const cs = getComputedStyle(l);
      return {
        text: l.textContent.trim().slice(0, 44),
        fontSize: cs.fontSize, fontWeight: cs.fontWeight, color: cs.color,
        inlineStart: +r.x.toFixed(2), width: +r.width.toFixed(2),
        rendered: linesOf(l).length,
        boldRuns: [...l.querySelectorAll('b')].map(b => getComputedStyle(b).fontWeight)
      };
    });
    const proseAccent = [...document.querySelectorAll('#shipped-with-muster .shipped__line, #shipped-with-muster .shipped__line *')]
      .filter(el => getComputedStyle(el).color === getComputedStyle(document.documentElement).getPropertyValue('--accent').trim()).length;
    const accentTok = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
    const inkTok = getComputedStyle(document.documentElement).getPropertyValue('--ink').trim();
    return {
      accentToken: accentTok, inkToken: inkTok,
      sectionHeight: +document.querySelector('#shipped-with-muster').getBoundingClientRect().height.toFixed(2),
      cardBlockHeight: +document.querySelector('.shipped').getBoundingClientRect().height.toFixed(2),
      cards: cardData,
      lines,
      proseAccentCount: proseAccent
    };
  })()`);

  /* Light theme: rust on the light surface measures 4.89 and passes even small
     text, so the readout-size value is the easy half — what needs looking at is
     whether the answered/unanswered pairing still reads on the olive canvas. */
  await page.setMedia({ colorScheme: "light" });
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "s05-l1280", await clipOf(page, "#shipped-with-muster .section__body", 24));
  await page.setMedia({ colorScheme: "dark" });
  await page.eval(`new Promise(r => setTimeout(r, 200))`);

  /* ---- the alternative composition: two cells side by side inside a card --- */
  await page.eval(`(() => {
    const s = document.createElement('style');
    s.id = 'alt-c2';
    s.textContent = '@media (min-width: 60rem){.shipped__cells{display:grid;grid-template-columns:repeat(2,1fr);gap:var(--gap-flow)}.shipped__cell+.shipped__cell{margin-block-start:0;border-block-start:0;padding-block-start:0}.shipped{grid-template-columns:1fr}}';
    document.head.appendChild(s);
  })()`);
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "s05-alt-stacked-d1280", await clipOf(page, "#shipped-with-muster .section__body", 24));
  report.s05_alt_c2 = await page.eval(`(() => {
    const cards = [...document.querySelectorAll('.shipped__card')];
    return cards.map(c => ({ scope: c.querySelector('.shipped__scope').textContent.trim(),
      h: +c.getBoundingClientRect().height.toFixed(2), w: +c.getBoundingClientRect().width.toFixed(2) }));
  })()`);
  await page.eval(`document.getElementById('alt-c2').remove()`);

  /* --------------------------------------------------------- reduced motion */
  await page.setMedia({ colorScheme: "dark", reducedMotion: "reduce" });
  await page.goto(A);
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 1700))`); /* past --countup-duration */
  await shot(page, "s05-reduced-d1280", await clipOf(page, "#shipped-with-muster .section__body", 24));
  report.s05_reduced = await page.eval(`(() => {
    return [...document.querySelectorAll('.readout__value')].map(v => ({
      text: v.textContent.trim(), color: getComputedStyle(v).color,
      animation: getComputedStyle(v).animationName, transition: getComputedStyle(v).transitionDuration }));
  })()`);
  await page.setMedia({ colorScheme: "dark" });

  /* --------------------------------------------------------------- no script */
  /* The scripts are stripped from a copy rather than execution disabled: the
     CDP client's own load settle is a promise, so a page with script off
     cannot be driven. Stripping gives the reader's real no-JS document. */
  const nojsPath = join(ROOT, "samples", "closing-round-renders", ".nojs.html");
  writeFileSync(
    nojsPath,
    readFileSync(join(ROOT, "samples", "closing-round-a.html"), "utf8")
      .replace(/<script[^>]*><\/script>\s*/g, "")
      .replaceAll('href="../styles/', 'href="../../styles/')
  );
  await page.goto("file://" + nojsPath);
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 250))`);
  await shot(page, "s05-nojs-d1280", await clipOf(page, "#shipped-with-muster .section__body", 24));
  report.s05_nojs = await page.eval(`(() => [...document.querySelectorAll('.readout__value')].map(v => ({
    text: v.textContent.trim(), color: getComputedStyle(v).color })))()`);
  rmSync(nojsPath, { force: true });

  /* ---------------------------------------------------------------- footer */
  await page.goto(A);
  await page.eval(`document.querySelector('.pagefoot').scrollIntoView({ block: 'end' })`);
  await page.eval(`new Promise(r => setTimeout(r, 250))`);
  await shot(page, "footer-d1280", await clipOf(page, ".pagefoot", 8));
  const footerAt = async (w, h) => {
    await page.setViewport({ width: w, height: h });
    await page.goto(A);
    await page.eval(`document.querySelector('.pagefoot').scrollIntoView({ block: 'end' })`);
    await page.eval(`new Promise(r => setTimeout(r, 250))`);
    return page.eval(`(() => {
      ${LINES_OF}
      const p = document.querySelector('.pagefoot__line');
      const cs = getComputedStyle(p);
      const words = p.textContent.trim().split(/\\s+/).filter(t => /[A-Za-z0-9]/.test(t)).length;
      return {
        fontSize: cs.fontSize, lineHeight: cs.lineHeight, fontWeight: cs.fontWeight,
        width: +p.getBoundingClientRect().width.toFixed(2),
        height: +p.getBoundingClientRect().height.toFixed(2),
        words,
        renderedLines: linesOf(p)
      };
    })()`);
  };
  report.footer_1280x700 = await footerAt(1280, 700);

  /* ============================================================== PHONE 375 */
  await page.setViewport({ width: 375, height: 553, mobile: true });
  for (const [label, url] of [["a", A], ["b", B]]) {
    await page.goto(url);
    await shot(page, `s01-${label}-p375`);
    await shot(page, `s01-${label}-full-p375`, await clipOf(page, "#hero", 0));
    await page.eval(`document.querySelector('.remnant').scrollIntoView({block:'center'})`);
    await page.eval(`new Promise(r => setTimeout(r, 250))`);
    await shot(page, `s01-${label}-remnant-p375`, await clipOf(page, ".remnant", 12));
    report.viewports[`s01-${label}-375x553`] = await page.eval(`(() => {
      const rem = document.querySelector('.remnant');
      const r = rem.getBoundingClientRect();
      return {
        remnantHeight: +r.height.toFixed(2),
        heroHeight: +document.querySelector('#hero').getBoundingClientRect().height.toFixed(2),
        headWraps: document.querySelector('.remnant__head').getBoundingClientRect().height > 30,
        values: [...document.querySelectorAll('.remnant__value')].map(v => ({
          text: v.textContent.trim(), color: getComputedStyle(v).color, fontSize: getComputedStyle(v).fontSize }))
      };
    })()`);
  }

  await page.goto(A);
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 1700))`); /* past --countup-duration */
  await shot(page, "s05-p375", await clipOf(page, "#shipped-with-muster .section__body", 12));
  report.s05_375x553 = await page.eval(`(() => {
    const cards = [...document.querySelectorAll('.shipped__card')].map(c => ({
      scope: c.querySelector('.shipped__scope').textContent.trim(),
      h: +c.getBoundingClientRect().height.toFixed(2) }));
    return { cards, cardBlockHeight: +document.querySelector('.shipped').getBoundingClientRect().height.toFixed(2),
      sectionHeight: +document.querySelector('#shipped-with-muster').getBoundingClientRect().height.toFixed(2) };
  })()`);

  report.footer_375x553 = await footerAt(375, 553);
  await page.setViewport({ width: 375, height: 553, mobile: true });
  await page.goto(A);
  await page.eval(`document.querySelector('.pagefoot').scrollIntoView({ block: 'end' })`);
  await page.eval(`new Promise(r => setTimeout(r, 250))`);
  await shot(page, "footer-p375", await clipOf(page, ".pagefoot", 8));

  report.footer_320x568 = await footerAt(320, 568);

  /* --------------------------------- the shipped baseline, same instruments */
  await page.setViewport({ width: 1280, height: 700 });
  await page.goto(SHIPPED);
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 1700))`); /* past --countup-duration */
  await shot(page, "shipped-s05-d1280", await clipOf(page, "#shipped-with-muster .section__body", 24));
  report.shipped_baseline_1280 = await page.eval(`(() => {
    const cards = [...document.querySelectorAll('.shipped__card')].map(c => ({
      scope: c.querySelector('.shipped__scope').textContent.trim(),
      h: +c.getBoundingClientRect().height.toFixed(2), cells: c.querySelectorAll('.shipped__cell').length }));
    return { cards,
      cardBlockHeight: +document.querySelector('.shipped').getBoundingClientRect().height.toFixed(2),
      sectionHeight: +document.querySelector('#shipped-with-muster').getBoundingClientRect().height.toFixed(2),
      heroHeight: 0 };
  })()`);
  await page.goto(SHIPPED);
  await shot(page, "shipped-s01-d1280");
  report.shipped_baseline_s01 = await page.eval(`(() => {
    const rem = document.querySelector('.remnant');
    return { remnantHeight: +rem.getBoundingClientRect().height.toFixed(2),
      heroHeight: +document.querySelector('#hero').getBoundingClientRect().height.toFixed(2) };
  })()`);

  writeFileSync(join(OUT, "closing-round-report.json"), JSON.stringify(report, null, 2));
  console.log("report written");
  await page.close();
} finally {
  await close();
}
