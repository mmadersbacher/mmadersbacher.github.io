#!/usr/bin/env sh
# Renders tools/personal-og.html to site/og.png (1200x630).
# Headless Chromium clips the bottom ~75px of a 630px-high window, so render
# taller and crop: the layout is fixed by html,body{height:630px} anyway.
set -eu
cd "$(dirname "$0")/.."
chromium --headless=new --no-sandbox --disable-gpu --hide-scrollbars --allow-file-access-from-files \
  --force-device-scale-factor=1 --window-size=1200,900 --virtual-time-budget=4000 \
  --screenshot=site/og.tmp.png tools/personal-og.html 2>/dev/null
python3 - <<'PY'
from PIL import Image
im = Image.open("site/og.tmp.png").crop((0, 0, 1200, 630))
im.save("site/og.png", optimize=True)
px = im.load(); bg = px[5, 5]
rows = [y for y in range(630) if any(px[x, y] != bg for x in range(0, 1200, 3))]
assert rows and rows[-1] > 540, "footer missing from og.png"
print("site/og.png written, last content row", rows[-1])
PY
rm -f site/og.tmp.png
