/* HO-039 — render the candidate treatments (samples/re-gate-proposed.html)
   in Blink, both themes, 1280 and 375. WebKit comes from qlmanage separately. */

import { launchChrome } from "../../tests/lib/cdp.mjs";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const ROOT = fileURLToPath(new URL("../..", import.meta.url));
const OUT = fileURLToPath(new URL(".", import.meta.url));
const PAGE = "file://" + join(ROOT, "samples", "re-gate-proposed.html");

const { browser, close } = await launchChrome();

async function fullshot(page, name) {
  writeFileSync(join(OUT, name + ".png"), await page.screenshot({ fullPage: true }));
}

try {
  const page = await browser.newPage();
  await page.init();

  await page.setViewport({ width: 1280, height: 900 });
  await page.setMedia({ colorScheme: "dark" });
  await page.goto(PAGE);
  const h = await page.eval(`document.documentElement.scrollHeight`);
  await page.setViewport({ width: 1280, height: Math.min(h, 4000) });
  await fullshot(page, "cand-d1280");

  const report = await page.eval(`(() => {
    const out = {};
    const bars = [...document.querySelectorAll('.statusbar')];
    out.lockups = bars.map((bar) => {
      const mark = bar.querySelector('.brand__mark, .brand__img, .brand__tile');
      const word = bar.querySelector('.brand__word');
      const rule = bar.querySelector('.brand__rule');
      const mb = mark.getBoundingClientRect(), wb = word.getBoundingClientRect();
      return {
        barH: bar.getBoundingClientRect().height,
        mark: { w: mb.width, h: mb.height, bottom: mb.bottom },
        word: { fontSize: getComputedStyle(word).fontSize, w: wb.width, bottom: wb.bottom },
        markBottomMinusWordBottom: mb.bottom - wb.bottom,
        ruleH: rule ? rule.getBoundingClientRect().height : null
      };
    });
    const gauge = document.querySelector('.gauge');
    const thumb = document.querySelector('.gauge__thumb');
    out.gauge = {
      railW: gauge.getBoundingClientRect().width,
      railX: gauge.getBoundingClientRect().x,
      thumbW: thumb.getBoundingClientRect().width,
      thumbH: thumb.getBoundingClientRect().height
    };
    return out;
  })()`);
  writeFileSync(join(OUT, "cand-report.json"), JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));

  await page.setMedia({ colorScheme: "light" });
  await page.eval(`new Promise(r => setTimeout(r, 100))`);
  await fullshot(page, "cand-l1280");

  await page.setMedia({ colorScheme: "dark" });
  await page.setViewport({ width: 375, height: 3600, mobile: true });
  await page.eval(`new Promise(r => setTimeout(r, 100))`);
  await fullshot(page, "cand-p375");

  await page.close();
} finally {
  await close();
}
