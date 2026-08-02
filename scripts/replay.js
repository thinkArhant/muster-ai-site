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
  const rail = replay.querySelector(".narration__list");
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

     It aligns its TOP to an entry's own box edge rather than parking the newest
     entry's bottom on the fold. Those are the same rule only while every entry
     is one row: once an entry wraps to two or three, bottom-alignment leaves
     the topmost entry clipped part-way through its rows, which §7.1 rule 3
     forbids. So the window walks back from the newest entry while whole entries
     still fit, and lands on the first one that does. Instant position change,
     never an animated scroll.

     Resting on `offsetTop` is what keeps it out of an inter-entry gap: the
     separator is a margin, so it sits ABOVE the border box offsetTop reports.
     Scrolling to that value scrolls the separator away entirely and puts the
     window's top edge on the entry's own box — never inside the gap, which
     would show a fragment of separation and read as a clipped entry.

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

  /* The rail pages forward. Entries accumulate in it, so the reader's
     guarantee is not that the rail moves — it is that whenever an entry is the
     active one, the whole of it is inside the rail, with rail beneath it. So
     the rail holds still while the newest entry is already whole inside it,
     and when the newest entry would fall outside it moves ONCE, landing that
     entry's top on the rail's top. The entry then has the rail's full height
     below it to set in.

     Landing the top rather than the bottom is the whole difference. Bringing an
     entry's BOTTOM to the rail's bottom also contains it, arithmetically, and
     is what an implementation reaches for first — but it delivers every new
     explanation flush against the fold of the scroll window, clipped for the
     length of its own reveal and only rising into reading position one slot
     later. Landing the top also means the room the reader is given is the room
     the entry is about to need, which is the reason a reader scrolls at all.

     Positions come from offsetTop and offsetHeight, which the reveal's 4px rise
     does not move: a decision taken from the rendered rect would page forward
     early, on a transform that is about to disappear, and stay one entry ahead
     for the rest of the chain.

     Forward only, and deliberately. `Math.max` is what makes the rail monotonic
     for a whole run: a rail that could move backwards would yank a reader who
     had scrolled ahead of the chain to read on, every few seconds, for the rest
     of the playback. The cost is stated rather than hidden — a reader who
     scrolls the rail forward past the chain keeps their position, and the
     guarantee above is a guarantee about playback, not about a rail the reader
     is driving themselves.

     The end of the rail is its own case and needs no branch: clamping the
     target to the rail's own maximum means the last entries, whose tops lie
     past anything the rail can scroll to, come to rest whole against the end of
     the list instead of demanding a position that does not exist.

     Instant position change, never an animated scroll (§5.1). */
  function followRail(active) {
    const view = rail.clientHeight;
    const top = active.offsetTop;
    if (top >= rail.scrollTop && top + active.offsetHeight <= rail.scrollTop + view) return;
    rail.scrollTop = Math.max(rail.scrollTop, Math.min(top, rail.scrollHeight - view));
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
    if (active && wide.matches) followRail(active);

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

  /* Both panes return to their own top when the chain restarts. Each layer
     carries its own scroll region — the terminal's log window, and the
     narration rail that walks down as entries accumulate — and a chain that
     starts again at line 1 while either region is still parked at the end of
     the last run renders its first lines out of view. The two are reset
     together because "the reader asked to watch it again" is one guarantee,
     not one per layer: whichever of them happens to be the scrolling one at a
     given viewport, it starts at the top. */
  function rewindPanes() {
    log.scrollTop = 0;
    if (rail) rail.scrollTop = 0;
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
    setState("idle");
    apply(-1);
    /* After the state attribute, not before: the idle state re-lays both
       regions out, and a rewind written against the end-state layout would be
       re-clamped against the new one. */
    rewindPanes();
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
         flex remainder, quantised down to whole ENTRIES so a half entry never
         sits at the fold. One corpus line is one entry however many rows it
         wraps to.

         Both figures are measured, never taken from §7.1's table. The 51.0px
         entry pitch there is a CEILING, not a constant: it is exact at 375px
         and wider, where every chain line costs two rows, and wrong below — at
         320px the region is 31 continuation columns and the longest lines cost
         three rows. Taking the number literally there would place a third entry
         the window then clips. So the box comes from the tallest
         chain line's rendered height and the separator from the resolved
         margin that draws it, and the count falls out of both. Neither is a
         literal: change --gap-hairline or the leading and this follows.

         The separator is read from the resolved style rather than differenced
         out of offsetTop/offsetHeight because those two are integers — at a
         width where an entry box is 58.5px they round, and the gap between two
         entries reads 11px or 12px depending on where the box happens to land.
         A ±1px wobble in the input to a floor() is not something to leave in.

         Only the gaps BETWEEN entries are spent, which is why the fit solves
         N × box + (N − 1) × separator ≤ view rather than N × pitch ≤ view — a
         window sized on the pitch would leave a separator's worth of empty
         gutter below the last entry.

         The terminal-state line is excluded from both: it is the one line not
         set at --text-terminal, it is revealed outside the chain, and §7.1
         derives the window from the eleven chain lines. --- */
  function quantiseWindow() {
    log.style.removeProperty("block-size");
    log.style.removeProperty("flex");
    if (wide.matches) return;
    const style = getComputedStyle(log);
    const pad = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
    let box = 0;
    let separator = 0;
    for (let i = 0; i < lines.length - 1; i++) {
      box = Math.max(box, lines[i].getBoundingClientRect().height);
      if (i > 0) separator = Math.max(separator, parseFloat(getComputedStyle(lines[i]).marginTop) || 0);
    }
    if (!box) return;
    const view = log.clientHeight - pad;
    /* Clamped to [2, 12] per §7.1. The floor is two, not three: below 469.4px
       of visual viewport the core cannot hold three whole entries, and a
       clipped third entry is worse than a shorter window. */
    const fit = Math.max(2, Math.min(12, Math.floor((view + separator) / (box + separator))));
    log.style.flex = "none";
    log.style.blockSize = fit * box + (fit - 1) * separator + pad + "px";
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

  /* Chain time, set directly, with the clock held. Reveal is already driven by
     elapsed time rather than by a chain of timers, so positioning the chain is
     the same code path playback uses — and a harness that needs the state at a
     named slot can have exactly that state instead of racing a wall clock to
     catch it. Stepping slot by slot reproduces a real run, because everything
     the rail does is a function of the previous position and the new active
     entry. */
  function seek(ms) {
    pause();
    elapsed = Math.max(0, Math.min(ms, CHAIN));
    apply(elapsed);
  }

  /* Test surface: the harness asserts measured reveal offsets against §5.1
     rather than trusting the schedule it was given. */
  window.MusterReplay = {
    CHAIN,
    LINE_AT,
    SLOT_AT,
    marks,
    play,
    pause,
    seek,
    finish,
    restart,
    state: () => replay.dataset.state,
    elapsed: () => Math.round(elapsed)
  };
})();
