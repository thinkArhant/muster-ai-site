/* §2 replay playback.

   The transcript is already in the DOM and already complete. This file adds one
   thing: a clock that reveals it on the schedule in
   `design-specs/web/section-02-replay.md` §5.1. Nothing here is content — no
   string, timestamp or number rendered by the page originates in this file, and
   every offset below is a playback parameter, never a displayed value.

   Design notes worth keeping:
   - Reveal is idempotent and driven by elapsed time, not by a chain of timers.
     Applying an elapsed value twice changes nothing, which is what makes pause,
     resume and skip the same code path.
   - Reduced motion and no-JS take the same path: this file does nothing at all,
     and the CSS default is the complete transcript.
   - Playback runs once per page load. The replay control is the only thing that
     starts it a second time, because the reader asked. */

(() => {
  "use strict";

  const replay = document.querySelector(".replay");
  if (!replay) return;

  const stillness = matchMedia("(prefers-reduced-motion: reduce)");
  if (stillness.matches) return;

  /* --- the schedule (replay spec §5.1), in milliseconds of chain time --- */
  const CHAIN = 48000;
  const LINE_AT = [0, 350, 6400, 13600, 23200, 26400, 29600, 32800, 39400, 39750, 43200, 48000];
  const SLOT_AT = {
    sp1: 350,
    sp2: 6400,
    sp3: 13600,
    sp4a: 23200,
    sp4b: 26400,
    sp4c: 29600,
    sp5: 32800,
    sp6: 39750,
    sp7: 43200,
    sp8: 48000
  };
  const BEAT_AT = [0, 6400, 13600, 23200, 32800, 39750];

  const core = replay.querySelector(".replay__core");
  const terminal = replay.querySelector(".terminal");
  const log = replay.querySelector(".log");
  const lines = [...replay.querySelectorAll(".log__line")];
  const entries = [...replay.querySelectorAll(".narration__entry")];
  const indicator = replay.querySelector("[data-beat-indicator]");
  const controls = replay.querySelector("[data-replay-controls]");
  if (lines.length !== LINE_AT.length) return;

  const wide = matchMedia("(min-width: 60rem)");

  /* Beat display names are Content's, and they live in the markup. Reading them
     back out keeps this file free of copy. */
  const beatName = (n) => {
    const owner = entries.find((el) => el.dataset.beat === String(n));
    const tag = owner && owner.querySelector(".narration__tag");
    return tag ? tag.textContent : "";
  };

  const pad = (n) => (n < 10 ? "0" + n : String(n));

  /* --- state --- */
  let elapsed = 0;
  let lastFrame = null;
  let frame = null;
  let running = false;
  let played = false;
  let visible = false;
  const marks = [];

  function setState(state) {
    replay.dataset.state = state;
  }

  /* The window follows the newest revealed line, not the end of the DOM — all
     twelve lines occupy their space from load, so scrolling to the bottom would
     park the window over lines that have not been revealed yet.

     It aligns its TOP to a line boundary rather than parking the newest line's
     bottom on the fold. Those are the same rule only while every line is one
     row: once a line wraps to two or three, bottom-alignment leaves the topmost
     line clipped part-way through its rows, which §7.1 rule 2 forbids. So the
     window walks back from the newest line while whole lines still fit, and
     lands on the first one that does. Instant position change, never an
     animated scroll.

     Positions come from offsetTop, which the reveal's 4px transform does not
     move; every line shares an offsetParent, so the differences are exact. */
  function follow(i) {
    const style = getComputedStyle(log);
    const view = log.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom);
    const origin = lines[0].offsetTop;
    const foot = lines[i].offsetTop + lines[i].offsetHeight - origin;
    let top = i;
    while (top > 0 && foot - (lines[top - 1].offsetTop - origin) <= view + 0.5) top--;
    const at = lines[top].offsetTop - origin;
    log.scrollTop = Math.max(0, Math.min(at, log.scrollHeight - log.clientHeight));
  }

  function revealLine(i, at) {
    const line = lines[i];
    if (line.hasAttribute("data-revealed")) return;
    line.setAttribute("data-revealed", "");
    marks.push({ line: i + 1, at: Math.round(at) });
    follow(i);
  }

  /* `ms` is chain time. A negative value is the pre-roll: nothing is revealed,
     the indicator sits on the first beat. */
  function apply(ms) {
    for (let i = 0; i < lines.length; i++) {
      if (LINE_AT[i] <= ms) revealLine(i, ms);
    }

    let active = null;
    for (const entry of entries) {
      const at = SLOT_AT[entry.dataset.slot];
      if (at === undefined) continue;
      if (at <= ms) {
        entry.setAttribute("data-revealed", "");
        active = entry;
      }
    }
    for (const entry of entries) {
      if (entry === active) entry.setAttribute("data-active", "");
      else entry.removeAttribute("data-active");
    }
    if (active && wide.matches) {
      const railTop = active.offsetTop + active.offsetHeight - active.parentElement.clientHeight;
      if (railTop > active.parentElement.scrollTop) active.parentElement.scrollTop = railTop;
    }

    let beat = 1;
    BEAT_AT.forEach((at, i) => {
      if (at <= ms) beat = i + 1;
    });
    indicator.textContent = "BEAT " + pad(beat) + " / " + pad(BEAT_AT.length) + " · " + beatName(beat);
  }

  function tick(now) {
    if (!running) return;
    if (lastFrame !== null) elapsed += now - lastFrame;
    lastFrame = now;
    if (elapsed >= CHAIN) {
      apply(elapsed); /* record L12 against the real clock, not the schedule */
      finish();
      return;
    }
    apply(elapsed);
    frame = requestAnimationFrame(tick);
  }

  function play() {
    if (running || played) return;
    running = true;
    lastFrame = null;
    setState("playing");
    frame = requestAnimationFrame(tick);
  }

  function pause() {
    if (!running) return;
    running = false;
    lastFrame = null;
    if (frame !== null) cancelAnimationFrame(frame);
    frame = null;
  }

  function finish() {
    pause();
    played = true;
    elapsed = CHAIN;
    apply(CHAIN);
    setState("end");
    renderControls();
  }

  function restart() {
    pause();
    played = false;
    elapsed = 0;
    marks.length = 0;
    lines.forEach((line) => line.removeAttribute("data-revealed"));
    entries.forEach((entry) => {
      entry.removeAttribute("data-revealed");
      entry.removeAttribute("data-active");
    });
    log.scrollTop = 0;
    setState("idle");
    apply(-1);
    renderControls();
    play();
  }

  /* --- controls: real buttons, keyboard-operable, built only when playback is
         on the table (with JS off or motion reduced there is nothing to control) --- */

  function button(label, onClick) {
    const el = document.createElement("button");
    el.type = "button";
    el.className = "control";
    el.textContent = label;
    el.addEventListener("click", onClick);
    return el;
  }

  function renderControls() {
    controls.textContent = "";
    controls.appendChild(
      played ? button("⟲ REPLAY", restart) : button("⏭ SHOW FULL LOG", finish)
    );
  }

  /* --- the mobile core is sized by construction: the terminal window is the
         flex remainder, quantised down to whole WRAPPED lines so a half line
         never sits at the fold.

         The unit is measured, not §7.1's 49.4px constant. That figure is a
         budget: exact at 375px and wider, where every corpus line costs two
         rows, and a ceiling below it — at 320px the region is 34 columns and
         the two longest lines cost three rows. Taking the constant literally
         there would place a third line the window then clips, so the count has
         to fall out of the real row heights instead.

         The terminal-state line is excluded from the unit: it is the one line
         not set at --text-terminal, it is revealed outside the chain, and
         §7.1 derives the window from the eleven chain lines. --- */
  function quantiseWindow() {
    log.style.removeProperty("block-size");
    log.style.removeProperty("flex");
    if (wide.matches) return;
    const style = getComputedStyle(log);
    const pad = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    let unit = 0;
    for (let i = 0; i < lines.length - 1; i++) {
      unit = Math.max(unit, lines[i].getBoundingClientRect().height);
    }
    if (!unit) return;
    /* Clamped to [2, 12] per §7.1. The floor is two, not three: below 478.2px
       of visual viewport the core cannot hold three whole wrapped lines, and a
       clipped third line is worse than a shorter window. */
    const fit = Math.max(2, Math.min(12, Math.floor((log.clientHeight - pad) / unit)));
    log.style.flex = "none";
    log.style.blockSize = fit * unit + pad + "px";
  }

  /* --- autoplay gate: the section starts when it is properly on screen and
         stops when it is not, so no motion runs unwatched. On a phone the bar is
         higher, because the core is sized to fit and "both layers visible" is a
         guarantee there rather than a hope. --- */

  function gate() {
    const target = wide.matches ? terminal : core;
    const startAt = wide.matches ? 0.5 : 0.95;
    const stopAt = wide.matches ? 0.5 : 0.9;

    const observer = new IntersectionObserver(
      (records) => {
        const ratio = records[records.length - 1].intersectionRatio;
        visible = ratio >= (running ? stopAt : startAt);
        if (visible && !document.hidden) play();
        else pause();
      },
      /* The status bar is sticky and opaque, so the band it occupies is not
         viewing space. Insetting the observer's root by its height means
         "95% visible" counts only what the reader can actually see — without
         it, a core tucked under the bar would still read as fully on screen. */
      { threshold: [0, 0.25, 0.5, 0.75, 0.9, 0.95, 1], rootMargin: "-48px 0px 0px 0px" }
    );
    observer.observe(target);
    return observer;
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) pause();
    else if (visible) play();
  });

  setState("idle");
  quantiseWindow();
  apply(-1);
  renderControls();
  let observer = gate();

  let resizeFrame = null;
  addEventListener("resize", () => {
    if (resizeFrame !== null) cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(() => {
      resizeFrame = null;
      quantiseWindow();
      observer.disconnect();
      observer = gate();
    });
  });

  /* Test surface: the harness asserts measured reveal offsets against §5.1
     rather than trusting the schedule it was given. */
  window.MusterReplay = {
    CHAIN,
    LINE_AT,
    SLOT_AT,
    marks,
    play,
    pause,
    finish,
    restart,
    state: () => replay.dataset.state,
    elapsed: () => Math.round(elapsed)
  };
})();
