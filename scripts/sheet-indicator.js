/* ==========================================================================
   §4's position indicator — state display, never a control.

   The track pages horizontally; this reports which sheet is at rest. It is
   the paged counterpart of the SHEET n OF 4 ordinal: the ordinal says it in
   text, the indicator says it at a glance, and the text form always rides
   with it, so colour is never the sole channel.

   WHAT THIS FILE IS NOT ALLOWED TO DO:

     - It never reads a scroll position and never writes one. Rest is read
       from element geometry — where each sheet sits against the track's box
       and against the track's own snap line — so the shell's "no script
       touches the page's scroll" assertion holds exactly as written, and it
       holds because the only thing this file ever does to the DOM is toggle a
       class on a decorative span.
     - It never animates and never transitions. State is a repaint; the
       page's motion budget is two elements and this is not a third.
     - It never scrolls the track for the reader. There are no buttons, no
       click targets, no keyboard handlers — the track's own tab stop and
       the reader's own gesture are the only ways it moves.

   Progressive enhancement, honestly: the authored markup ships segment 1
   active, which is TRUE at the track's load rest. With JS off, with no
   IntersectionObserver, or below --bp-wide where no indicator renders, the
   page is complete and the ordinals carry position from there.

   Segment count is read from the DOM, never assumed: n segments map to the
   first n sheets in document order. A fifth sheet without a fifth segment
   degrades to reporting the first four rather than throwing — and the
   harness asserts the counts are equal, so the mismatch is caught at build
   rather than lived with in the browser.

   WHY REST IS NOT "THE MOST VISIBLE SHEET" ALONE. A wide window holds two
   whole sheets at once, so visibility ties, and a tie broken by document
   order pins the report to the earlier of the two — and at the track's end,
   where the last two sheets are both whole, that reports the second-to-last
   sheet, so the last segment can never light however far the reader scrolls.

   The track's own alignment resolves it everywhere but one place.
   `scroll-snap-align: start` means the sheet at rest is the one whose start
   edge is on the snap line, and of two equally visible sheets that is always
   the earlier — so "most visible, earliest on a tie" is exactly right while
   the track can reach a snap point. The last sheet's snap point lies PAST the
   maximum scroll: nothing aligns there, and what the reader has arrived at is
   simply the end. So the end of the track is its own case, read from the
   boxes — the last sheet whole in view while the first is not — and there the
   sheet at rest is the last one.

   WHY AN OBSERVER IS NOT ENOUGH ON ITS OWN. Between the moment the last sheet
   becomes wholly visible and the end of the track, no sheet's intersection
   ratio changes at all — the observer has nothing to fire on across that
   whole run, which is exactly the run the reader is in when they reach the
   end. So the track's own scroll event drives the same resolution, coalesced
   to a frame. Neither path reads or writes a scroll position.
   ========================================================================== */

(function (global) {
  "use strict";

  var TRACK = ".sheets";
  var INDICATOR = "[data-sheet-indicator]";
  var SEGMENT = ".sheets-indicator__seg";
  var SHEET = ".sheet";
  var ACTIVE = "is-active";

  /* Ties in visibility are real — two whole sheets share a wide window — so
     the comparison carries a tolerance rather than an exact equality on
     floats that already carry sub-pixel layout noise. EDGE is the same
     tolerance applied to a box edge. */
  var TIE = 0.01;
  var EDGE = 0.5;

  function mark(segments, index) {
    segments.forEach(function (seg, i) {
      if (i === index) seg.classList.add(ACTIVE);
      else seg.classList.remove(ACTIVE);
    });
  }

  /* The sheet that owns the track's rest, from element geometry alone.

     The end of the track is its own case, and it is recognised by its boxes:
     the track's content has run out when the last sheet's end edge plus the
     scrollport's end padding sits at the scrollport's own end edge — while
     the first sheet is no longer whole, which is what says the track
     overflows and has been scrolled at all. There the reader has arrived at
     the last sheet, and no snap point applies because the last sheet's lies
     past the maximum scroll.

     Everywhere else the most visible sheet holds the track, earliest on a
     tie — of two equally visible sheets the earlier is the one whose start
     edge is on the snap line, which is what `scroll-snap-align: start` rests
     against. */
  function resting(track, sheets) {
    var box = track.getBoundingClientRect();
    var padEnd = parseFloat(getComputedStyle(track).paddingRight) || 0;
    var rows = sheets.map(function (sheet) {
      var b = sheet.getBoundingClientRect();
      var shown = Math.max(0, Math.min(b.right, box.right) - Math.max(b.left, box.left));
      return {
        share: b.width ? shown / b.width : 0,
        whole: b.left >= box.left - EDGE && b.right <= box.right + EDGE,
        endGap: box.right - b.right
      };
    });
    var last = rows.length - 1;
    if (!rows[0].whole && rows[last].endGap >= padEnd - EDGE) return last;

    var best = 0;
    rows.forEach(function (r, i) {
      if (r.share > rows[best].share + TIE) best = i;
    });
    return best;
  }

  function wire(doc) {
    doc = doc || global.document;

    var track = doc.querySelector(TRACK);
    var indicator = doc.querySelector(INDICATOR);
    if (!track || !indicator) return null;

    var segments = Array.prototype.slice.call(indicator.querySelectorAll(SEGMENT));
    var sheets = Array.prototype.slice.call(track.querySelectorAll(SHEET));
    if (!segments.length || !sheets.length) return null;

    if (typeof global.IntersectionObserver !== "function") return null;

    /* One resolution, one place. Both triggers below call it; neither carries
       state of its own, so the two can never disagree. */
    var pending = null;
    function update() {
      var best = resting(track, sheets);
      if (best < segments.length) mark(segments, best);
    }
    function schedule() {
      if (pending !== null) return;
      pending = global.requestAnimationFrame(function () {
        pending = null;
        update();
      });
    }

    var observer = new global.IntersectionObserver(
      function () {
        update();
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sheets.forEach(function (sheet) {
      observer.observe(sheet);
    });

    /* Passive: this listener reports, it never intervenes in the gesture. */
    track.addEventListener("scroll", schedule, { passive: true });

    return {
      track: track, indicator: indicator, segments: segments, sheets: sheets,
      observer: observer, update: update, resting: function () { return resting(track, sheets); }
    };
  }

  global.MusterSheetIndicator = { wire: wire, mark: mark, resting: resting };

  if (global.document) {
    if (global.document.readyState === "loading") {
      global.document.addEventListener("DOMContentLoaded", function () {
        wire(global.document);
      });
    } else {
      wire(global.document);
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
