/* HO-039 — render the SHIPPED page before ruling anything.
   Crops: header (both themes), §3, §4 track + its scrollbar zone, §5, footer,
   at 1280×700 and 375×553, dark primary. Measurements land in shipped-report.json. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const PAGE = "file://" + join(ROOT, "index.html");

const { browser, close } = await launchChrome();
const report = {};

async function shot(page, name) {
  writeFileSync(join(OUT, name + ".png"), await page.screenshot());
}

try {
  const page = await browser.newPage();
  await page.init();

  // --- 1280×700 dark ---
  await page.setViewport({ width: 1280, height: 700 });
  await page.setMedia({ colorScheme: "dark" });
  await page.goto(PAGE);
  await shot(page, "shipped-hero-d1280");

  report.header = await page.eval(`(() => {
    const bar = document.querySelector(".statusbar");
    const brand = document.querySelector(".brand");
    const mark = document.querySelector(".brand__mark");
    const word = document.querySelector(".brand__word");
    const rule = document.querySelector(".brand__rule");
    const b = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
    return {
      barH: bar.getBoundingClientRect().height,
      brand: b(brand), mark: b(mark), word: b(word), rule: b(rule),
      wordFontSize: getComputedStyle(word).fontSize
    };
  })()`);

  // §3 crop
  await page.eval(`document.querySelector('#the-insight').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "shipped-s03-d1280");

  // §4 at rest
  await page.eval(`document.querySelector('#the-decisions').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 300))`);
  await shot(page, "shipped-s04-rest-d1280");
  report.track = await page.eval(`(() => {
    const t = document.querySelector('.sheets');
    const c = document.querySelector('#the-decisions .container');
    const cs = getComputedStyle(c);
    const rail = c.getBoundingClientRect().x + parseFloat(cs.paddingInlineStart || cs.paddingLeft);
    const railEnd = c.getBoundingClientRect().right - parseFloat(cs.paddingInlineEnd || cs.paddingRight);
    const r = t.getBoundingClientRect();
    return {
      trackBox: { x: r.x, w: r.width }, rail, railEnd,
      scrollWidth: t.scrollWidth, clientWidth: t.clientWidth,
      visibleShare: t.clientWidth / t.scrollWidth,
      scrollbarColor: getComputedStyle(t).scrollbarColor,
      scrollbarWidth: getComputedStyle(t).scrollbarWidth
    };
  })()`);

  // §4 mid-scroll
  await page.eval(`(() => { const t = document.querySelector('.sheets'); t.scrollLeft = (t.scrollWidth - t.clientWidth) / 2; })()`);
  await page.eval(`new Promise(r => setTimeout(r, 400))`);
  await shot(page, "shipped-s04-mid-d1280");

  // §5
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 300))`);
  await shot(page, "shipped-s05-d1280");
  report.s05 = await page.eval(`(() => {
    const lines = [...document.querySelectorAll('.shipped__line')].map(l => {
      const cs = getComputedStyle(l);
      return { fontSize: cs.fontSize, fontWeight: cs.fontWeight, text: l.textContent.slice(0, 30) };
    });
    return lines;
  })()`);

  // footer
  await page.eval(`document.querySelector('.pagefoot').scrollIntoView({ block: 'end' })`);
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "shipped-footer-d1280");

  // --- light header ---
  await page.setMedia({ colorScheme: "light" });
  await page.eval(`scrollTo(0, 0)`);
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "shipped-hero-l1280");
  await page.setMedia({ colorScheme: "dark" });

  // --- 375×553 dark ---
  await page.setViewport({ width: 375, height: 553, mobile: true });
  await page.goto(PAGE);
  await shot(page, "shipped-hero-p375");
  await page.eval(`document.querySelector('#shipped-with-muster').scrollIntoView()`);
  await page.eval(`new Promise(r => setTimeout(r, 300))`);
  await shot(page, "shipped-s05-p375");
  await page.eval(`document.querySelector('.pagefoot').scrollIntoView({ block: 'end' })`);
  await page.eval(`new Promise(r => setTimeout(r, 200))`);
  await shot(page, "shipped-footer-p375");

  writeFileSync(join(OUT, "shipped-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
  await page.close();
} finally {
  await close();
}
