/* Closing round — WebKit renders of every surface this round touches.

     node samples/closing-round-renders/render-webkit.mjs

   Instrument limits, stated rather than worked around:

   - `qlmanage` is the only WebKit on this machine. It executes no JavaScript,
     so what it shows is the no-JS document — which for §5 is the same frame the
     default path settles on, since every value's authored text IS its final
     value and the count-up only replaces a string it can restore.
   - It renders a whole document scaled to a fixed size regardless of the width
     asked for, so each surface is isolated by hiding its neighbours rather than
     cropped out of a full page. Every measurement stays the engine's own.
   - It cannot be given a viewport, so **no WebKit evidence exists at phone
     widths**. Every phone number in this round is Blink's, and says so.

   Output lands in this directory beside the Blink renders. */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = process.cwd();
const OUT = join(ROOT, "samples", "closing-round-renders");

const HIDE = {
  hero: `#watch-it-ship,#the-insight,#the-decisions,#shipped-with-muster,#get-started,body>footer{display:none!important}`,
  s05: `#hero,#watch-it-ship,#the-insight,#the-decisions,#get-started,body>footer{display:none!important}`,
  foot: `#hero,#watch-it-ship,#the-insight,#the-decisions,#shipped-with-muster,#get-started{display:none!important}`
};

const shots = [
  ["a-hero", "closing-round-a.html", HIDE.hero, "dark"],
  ["b-hero", "closing-round-b.html", HIDE.hero, "dark"],
  ["a-s05", "closing-round-a.html", HIDE.s05, "dark"],
  ["a-s05-light", "closing-round-a.html", HIDE.s05, "light"],
  ["a-foot", "closing-round-a.html", HIDE.foot, "dark"],
  ["shipped-s05", "index.html", HIDE.s05, "dark"]
];

for (const [label, file, css, scheme] of shots) {
  const base = file === "index.html" ? ROOT : join(ROOT, "samples");
  const html = readFileSync(join(base, file), "utf8");
  /* The temp file sits beside its source so every relative asset path holds. */
  const src = join(base, `.wk-${label}.html`);
  writeFileSync(
    src,
    html.replace("</head>", `<style>:root{color-scheme:${scheme}}${css}</style></head>`)
  );
  const dir = join(OUT, `.wk-${label}`);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  try {
    execFileSync("qlmanage", ["-t", "-s", "1280", "-o", dir, src], {
      stdio: "pipe",
      timeout: 60000,
      killSignal: "SIGKILL"
    });
  } catch (err) {
    console.log(label, "RENDER FAILED:", err.message.slice(0, 120));
  }
  const png = join(dir, `.wk-${label}.html.png`);
  if (!existsSync(png)) {
    console.log(label, "NO RENDER");
  } else {
    writeFileSync(join(OUT, `webkit-${label}.png`), readFileSync(png));
    console.log(label, "ok");
  }
  rmSync(dir, { recursive: true, force: true });
  rmSync(src, { force: true });
}
