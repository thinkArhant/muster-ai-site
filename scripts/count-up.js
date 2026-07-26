/* ==========================================================================
   Scroll-triggered count-up — motion element 3.

   Progressive enhancement: the element's authored text IS the exact final
   value. With JS off, with motion reduced, or with no IntersectionObserver,
   that authored text is simply what stays on screen. The animation only ever
   replaces a value it can restore character for character.

   Usage:  <span class="readout__value" data-countup>9.3</span>
           <span class="readout__value" data-countup>$147</span>
           <span class="readout__value readout__value--unmeasured">—</span>

   Rules this file enforces:
     - Decimals roll as decimals; 9.3 animates 0.0 -> 9.3, never 0 -> 9.
     - The final frame renders the authored string exactly, not a recomputation.
     - A value with no digits (an unmeasured em-dash) never animates.
     - The cell is sized by its final value before the first frame, so the
       count-up causes zero layout shift.
     - Fires once per page load, at >=55% cell visibility.
   ========================================================================== */

(function (global) {
  "use strict";

  var SELECTOR = "[data-countup]";
  var VISIBILITY_THRESHOLD = 0.55;
  var FALLBACK_DURATION = 1200;

  /* ---- helpers ---------------------------------------------------------- */

  function reducedMotion() {
    return (
      typeof global.matchMedia === "function" &&
      global.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function durationMs(doc) {
    var raw = "";
    try {
      raw = global
        .getComputedStyle(doc.documentElement)
        .getPropertyValue("--countup-duration");
    } catch (e) {
      raw = "";
    }
    raw = String(raw).trim();
    if (/^[\d.]+ms$/.test(raw)) return parseFloat(raw);
    if (/^[\d.]+s$/.test(raw)) return parseFloat(raw) * 1000;
    return FALLBACK_DURATION;
  }

  /* Splits "$1,147.5 k" into its animatable number and the text around it. */
  function parse(source) {
    var text = String(source);
    var match = text.match(/-?\d[\d,]*(\.\d+)?/);
    if (!match) return null;

    var numeric = match[0];
    var plain = numeric.replace(/,/g, "");
    var dot = plain.indexOf(".");

    return {
      source: text,
      prefix: text.slice(0, match.index),
      suffix: text.slice(match.index + numeric.length),
      value: parseFloat(plain),
      decimals: dot === -1 ? 0 : plain.length - dot - 1,
      grouped: numeric.indexOf(",") !== -1
    };
  }

  function group(intPart) {
    return intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function format(value, spec) {
    var fixed = Math.abs(value).toFixed(spec.decimals);
    var parts = fixed.split(".");
    if (spec.grouped) parts[0] = group(parts[0]);
    var body = parts.join(".");
    if (value < 0) body = "-" + body;
    return spec.prefix + body + spec.suffix;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /* Freeze the cell at its final width before the first frame. */
  function lockWidth(el) {
    var width = el.getBoundingClientRect().width;
    if (!width) return;
    if (global.getComputedStyle(el).display === "inline") {
      el.style.display = "inline-block";
    }
    el.style.minInlineSize = width + "px";
  }

  function unlockWidth(el) {
    el.style.minInlineSize = "";
  }

  /* ---- animation -------------------------------------------------------- */

  function run(el, spec, duration) {
    return new Promise(function (resolve) {
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var t = duration > 0 ? Math.min((now - start) / duration, 1) : 1;
        if (t < 1) {
          el.textContent = format(spec.value * easeOutCubic(t), spec);
          global.requestAnimationFrame(frame);
          return;
        }
        settle(el, spec);
        resolve(el);
      }

      el.setAttribute("data-countup-state", "running");
      el.textContent = format(0, spec);
      global.requestAnimationFrame(frame);
    });
  }

  /* The exact authored string is what lands — never a recomputed one. */
  function settle(el, spec) {
    el.textContent = spec.source;
    el.setAttribute("data-countup-state", "done");
    unlockWidth(el);
  }

  /* ---- wiring ----------------------------------------------------------- */

  function refresh(doc) {
    doc = doc || global.document;
    var targets = Array.prototype.slice.call(doc.querySelectorAll(SELECTOR));
    if (!targets.length) return [];

    var duration = durationMs(doc);
    var still = reducedMotion();
    var observable =
      typeof global.IntersectionObserver === "function" &&
      typeof global.requestAnimationFrame === "function";
    var pending = [];

    targets.forEach(function (el) {
      if (el.getAttribute("data-countup-state")) return;

      var spec = parse(el.textContent);
      if (!spec) {
        /* No digits: an unmeasured metric. Dashes never animate. */
        el.setAttribute("data-countup-state", "static");
        return;
      }

      el._musterCountUp = spec;

      if (still || !observable) {
        el.setAttribute("data-countup-state", "static");
        return;
      }

      lockWidth(el);
      el.setAttribute("data-countup-state", "pending");
      pending.push(el);
    });

    if (!pending.length) return targets;

    var observer = new global.IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.intersectionRatio < VISIBILITY_THRESHOLD) return;
          observer.unobserve(entry.target);
          run(entry.target, entry.target._musterCountUp, duration);
        });
      },
      { threshold: [VISIBILITY_THRESHOLD] }
    );

    pending.forEach(function (el) {
      observer.observe(el);
    });

    /* If the reader turns motion off mid-visit, land every pending value. */
    if (typeof global.matchMedia === "function") {
      var query = global.matchMedia("(prefers-reduced-motion: reduce)");
      var onChange = function () {
        if (!query.matches) return;
        pending.forEach(function (el) {
          if (el.getAttribute("data-countup-state") === "done") return;
          observer.unobserve(el);
          settle(el, el._musterCountUp);
        });
      };
      if (typeof query.addEventListener === "function") {
        query.addEventListener("change", onChange);
      }
    }

    return targets;
  }

  global.MusterCountUp = {
    parse: parse,
    format: format,
    easeOutCubic: easeOutCubic,
    run: run,
    refresh: refresh
  };

  if (global.document) {
    if (global.document.readyState === "loading") {
      global.document.addEventListener("DOMContentLoaded", function () {
        refresh(global.document);
      });
    } else {
      refresh(global.document);
    }
  }
})(typeof window !== "undefined" ? window : globalThis);
