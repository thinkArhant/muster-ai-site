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

  function revealLine(i, at) {
    const line = lines[i];
    if (line.hasAttribute("data-revealed")) return;
    line.setAttribute("data-revealed", "");
    marks.push({ line: i + 1, at: Math.round(at) });
    /* The window follows the newest revealed line, not the end of the DOM —
       all twelve lines occupy their space from load, so scrolling to the bottom
       would park the window over lines that have not been revealed yet. It
       advances by whole line boxes, instantly: never an animated scroll. */
    const pad = parseFloat(getComputedStyle(log).paddingBottom);
    const overshoot = line.getBoundingClientRect().bottom - (log.getBoundingClientRect().bottom - pad);
    if (overshoot > 0) log.scrollTop += overshoot;
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
         flex remainder, quantised down to whole line boxes so a half line never
         sits at the fold. --- */
  function quantiseWindow() {
    log.style.removeProperty("block-size");
    log.style.removeProperty("flex");
    if (wide.matches) return;
    const style = getComputedStyle(log);
    const box = parseFloat(style.lineHeight); /* one --text-terminal line box */
    const pad = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    const fit = Math.max(3, Math.min(12, Math.floor((log.clientHeight - pad) / box)));
    log.style.flex = "none";
    log.style.blockSize = fit * box + pad + "px";
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
