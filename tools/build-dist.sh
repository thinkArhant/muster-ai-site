#!/usr/bin/env bash
# Build the deployable site into dist/.
#
# The deployed site is the site: index.html, its stylesheets and its three page
# scripts. Nothing else. The repo is public by design, so nothing leaks by being
# left out — but a deploy that publishes knowledge-base/, tests/ and muster/
# alongside the page is noise on an exhibit whose argument is restraint.
#
# `scripts/` is the reason this script exists rather than an exclusion list:
# it holds both the three shipped page scripts AND test.sh, so it can be
# neither included nor excluded wholesale.
#
# VERIFY.md is deliberately NOT copied. The §1 chip and the footer receipt both
# point at the file's GitHub blob URL, not a relative path — a static host
# serves relative markdown as raw text or 404s it. The page needs no local copy.
#
# Usage: bash tools/build-dist.sh

set -euo pipefail
cd "$(dirname "$0")/.."

OUT="dist"
rm -rf "$OUT"
mkdir -p "$OUT/styles" "$OUT/scripts"

cp index.html "$OUT/"
cp styles/*.css "$OUT/styles/"
for f in count-up replay sheet-indicator; do
  cp "scripts/$f.js" "$OUT/scripts/"
done

# Every local reference in the page must exist in the output. This is the check
# that matters: a stylesheet added to index.html and not to this script would
# otherwise deploy as a silently unstyled page.
missing=0
while read -r ref; do
  [ -f "$OUT/$ref" ] || { echo "MISSING in dist: $ref"; missing=1; }
done < <(grep -oE '(href|src)="[^"]*"' index.html \
         | sed -E 's/^(href|src)="//; s/"$//' \
         | grep -vE '^(https?:|data:|#|mailto:)')

# Nothing that is not the site may reach the output.
for stray in test.sh VERIFY.md knowledge-base tests muster tools samples telemetry; do
  [ -e "$OUT/$stray" ] && { echo "STRAY in dist: $stray"; missing=1; }
done

if [ "$missing" -ne 0 ]; then
  echo "build-dist: FAILED"
  exit 1
fi

echo "build-dist: OK — $(find "$OUT" -type f | wc -l | tr -d ' ') files, $(du -sh "$OUT" | cut -f1)"
find "$OUT" -type f | sort | sed 's|^|  |'
