/* ==========================================================================
   §4's position indicator — state display, never a control.

   The track pages horizontally; this reports which sheet is at rest. It is
   the paged counterpart of the SHEET n OF 4 ordinal: the ordinal says it in
   text, the indicator says it at a glance, and the text form always rides
   with it, so colour is never the sole channel.

   WHAT THIS FILE IS NOT ALLOWED TO DO, and why the mechanism is an observer:

     - It never reads a scroll position and never writes one. The shell's
       "no script touches the page's scroll" assertion holds exactly as
       written, and it holds because the only thing this file ever does to
       the DOM is toggle a class on a decorative span.
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
   ========================================================================== */

(function (global) {
  "use strict";

  var TRACK = ".sheets";
  var INDICATOR = "[data-sheet-indicator]";
  var SEGMENT = ".sheets-indicator__seg";
  var SHEET = ".sheet";
  var ACTIVE = "is-active";

  /* The sheet that owns the track's rest. Threshold, not centre: sheets are
     wider than half a viewport at common widths, so "most visible" is the
     honest read and it agrees with the snap's own resting choice. */
  function mark(segments, index) {
    segments.forEach(function (seg, i) {
      if (i === index) seg.classList.add(ACTIVE);
      else seg.classList.remove(ACTIVE);
    });
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

    /* Visibility per sheet, kept as a ratio table rather than a "last one
       seen" latch: a two-sheet view has to resolve to the one actually at
       rest, and only the ratios can say which that is. */
    var ratios = sheets.map(function () {
      return 0;
    });

    var observer = new global.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var i = sheets.indexOf(entry.target);
          if (i !== -1) ratios[i] = entry.intersectionRatio;
        });

        var best = 0;
        for (var i = 1; i < ratios.length; i += 1) {
          if (ratios[i] > ratios[best]) best = i;
        }
        if (best < segments.length) mark(segments, best);
      },
      { root: track, threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sheets.forEach(function (sheet) {
      observer.observe(sheet);
    });

    return { track: track, indicator: indicator, segments: segments, sheets: sheets, observer: observer };
  }

  global.MusterSheetIndicator = { wire: wire, mark: mark };

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
