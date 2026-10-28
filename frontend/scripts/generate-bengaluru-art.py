"""Writes the layered Bengaluru window art used on the home page.

    python3 scripts/generate-bengaluru-art.py

Layers (all 380x440, transparent where empty):
  public/bengaluru/city.svg    skyline, landmarks, street (static)
  public/bengaluru/train.svg   the Namma Metro train (animated separately)
  public/bengaluru/lights.svg  windows, lamps and headlights shown at night
The sky and sun are drawn in React so they can follow Bengaluru time.
"""
import os

W, H = 380, 440
OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'bengaluru')
layers = {'city': [], 'train': [], 'lights': []}


def add(layer, s):
    layers[layer].append(s)


def rect(layer, x, y, w, h, c, extra=''):
    add(layer, f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}" {extra}/>')


def path(layer, d, c, extra=''):
    add(layer, f'<path d="{d}" fill="{c}" {extra}/>')


# clouds lit from below, and birds
for cx, cy, rx in [(70, 70, 54), (110, 62, 30), (290, 112, 60), (250, 104, 26), (160, 150, 40)]:
    add('city', f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{max(5, rx // 7)}" fill="#f6b89a" opacity=".6"/>')
    add('city', f'<ellipse cx="{cx}" cy="{cy + 3}" rx="{rx * .8}" ry="2.5" fill="#fbd2a6" opacity=".7"/>')
for bx, by, s in [(60, 116, 1), (78, 108, .8), (94, 120, .7), (318, 60, .9), (300, 70, .7)]:
    add('city', f'<path d="M{bx - 6 * s} {by - 3 * s} q{3 * s} {3 * s} {6 * s} 0 q{3 * s} {-3 * s} {6 * s} 0" stroke="#3b2a44" stroke-width="1.6" fill="none" stroke-linecap="round"/>')

# ground under the skyline
rect('city', 0, 300, W, 60, '#5b4560')

# far skyline
far = '#83557a'
for x, y, w in [(18, 196, 30), (52, 214, 22), (96, 222, 26), (338, 200, 30)]:
    rect('city', x, y, w, 306 - y, far)
# World Trade Center Bengaluru
path('city', 'M234 300 V104 L244 86 L254 104 V300Z', '#8f5f86')
add('city', '<g stroke="#b9829f" stroke-width="1">' + ''.join(f'<line x1="236" y1="{yy}" x2="252" y2="{yy}"/>' for yy in range(112, 300, 9)) + '</g>')
# UB City towers
for ux, top, w in [(286, 124, 22), (312, 146, 20)]:
    rect('city', ux, top, w, 306 - top, far)
    path('city', f'M{ux} {top} L{ux + w / 2} {top - 26} L{ux + w} {top}Z', '#c9b6c4')
tower_windows = [(24, 208), (34, 226), (24, 246), (40, 262), (58, 230), (64, 252), (102, 236), (112, 258),
                 (292, 150), (298, 176), (292, 204), (316, 170), (322, 196), (344, 214), (356, 236), (348, 262)]
add('city', '<g fill="#fde7b0" opacity=".55">' + ''.join(f'<rect x="{x}" y="{y}" width="3" height="4"/>' for x, y in tower_windows[::2]) + '</g>')
add('lights', '<g fill="#fde7b0">' + ''.join(f'<rect x="{x}" y="{y}" width="3" height="4"/>' for x, y in tower_windows) + '</g>')

# Bangalore Palace
stone_p, shade_p = '#d9b496', '#b98f74'
rect('city', 10, 262, 96, 44, stone_p)
for tx, th in [(12, 46), (38, 60), (62, 60), (88, 46)]:
    rect('city', tx, 306 - th, 16, th, shade_p if tx in (38, 62) else stone_p)
    add('city', f'<g fill="{shade_p}">' + ''.join(f'<rect x="{tx + k * 5}" y="{306 - th - 4}" width="3" height="4"/>' for k in range(3)) + '</g>')
    path('city', f'M{tx + 2} {306 - th - 4} L{tx + 8} {306 - th - 20} L{tx + 14} {306 - th - 4}Z', '#7d5a6a')
arches = ''.join(f'<path d="M{x} 290 v-10 a3 3 0 0 1 6 0 v10z"/>' for x in (20, 30, 50, 72, 92))
add('city', f'<g fill="#7d5a6a">{arches}</g>')
add('lights', f'<g fill="#f6d28b" opacity=".85">{arches}</g>')

# Vidhana Soudha
stone, shade, dome = '#f1e4ca', '#d7c3a0', '#ead8b5'
bx, by = 114, 268
rect('city', bx, by, 146, 38, stone)
rect('city', bx, by, 146, 5, shade)
add('city', '<g fill="#cbb48e">' + ''.join(f'<rect x="{bx + 5 + i * 10}" y="{by + 10}" width="3.5" height="24"/>' for i in range(14)) + '</g>')
rect('city', bx + 50, by - 22, 46, 24, stone)
add('city', '<g fill="#cbb48e">' + ''.join(f'<rect x="{bx + 54 + i * 9}" y="{by - 16}" width="3" height="16"/>' for i in range(5)) + '</g>')
path('city', f'M{bx + 53} {by - 22} A20 24 0 0 1 {bx + 93} {by - 22}Z', dome)
add('city', f'<path d="M{bx + 58} {by - 30} H{bx + 88}" stroke="{shade}" stroke-width="1.5"/>')
rect('city', bx + 71.5, by - 56, 3, 10, shade)
add('city', f'<circle cx="{bx + 73}" cy="{by - 58}" r="2.6" fill="{shade}"/>')
for sx in (bx + 10, bx + 124):
    rect('city', sx, by - 9, 12, 9, stone)
    path('city', f'M{sx} {by - 9} A6 7 0 0 1 {sx + 12} {by - 9}Z', dome)
# Vidhana Soudha is lit up at night
add('lights', f'<rect x="{bx}" y="{by}" width="146" height="38" fill="#fde7b0" opacity=".18"/>'
              f'<path d="M{bx + 53} {by - 22} A20 24 0 0 1 {bx + 93} {by - 22}Z" fill="#fde7b0" opacity=".35"/>')

# temple gopuram
gx, base, ochre, line = 266, 306, '#d9975f', '#b5774a'
yy = base
for off, w, h in [(0, 60, 14), (6, 48, 12), (11, 38, 11), (15, 30, 10), (19, 22, 9)]:
    path('city', f'M{gx + off} {yy} L{gx + off + 3} {yy - h} H{gx + off + w - 3} L{gx + off + w} {yy}Z', ochre)
    add('city', f'<line x1="{gx + off + 2}" y1="{yy - h + 2}" x2="{gx + off + w - 2}" y2="{yy - h + 2}" stroke="{line}"/>')
    yy -= h
rect('city', gx + 19, yy - 8, 22, 8, ochre, 'rx="4"')
add('city', '<g fill="#f2c14e">' + ''.join(f'<circle cx="{gx + k}" cy="{yy - 11}" r="2.2"/>' for k in (23, 30, 37)) + '</g>')
path('city', f'M{gx + 24} {base} v-10 a6 6 0 0 1 12 0 v10z', '#7a4a3a')

# Namma Metro deck and pillars (the train is its own layer)
path('city', 'M150 340 Q230 326 380 326 V334 Q230 334 150 348Z', '#6d5878')
add('city', '<g fill="#5b4866">' + ''.join(f'<rect x="{px}" y="{py}" width="7" height="{360 - py}"/>' for px, py in [(196, 340), (282, 333), (356, 333)]) + '</g>')
path('train', 'M178 332 Q240 314 380 314 V326 Q240 326 178 340Z', '#8a5fbf')
add('train', '<path d="M180 336 Q240 321 380 321" stroke="#f2c14e" stroke-width="2" fill="none"/>')
train_windows = ''.join(f'<rect x="{x}" y="{317 + (0 if x > 240 else (240 - x) * .2)}" width="10" height="5" rx="1"/>' for x in range(190, 372, 18))
add('train', f'<g fill="#fde7b0">{train_windows}</g>')
add('lights', f'<g fill="#fff4cc">{train_windows}</g>')

# lawn and road
rect('city', 0, 330, 150, 30, '#5f7d4e')
rect('city', 0, 360, W, 80, '#3e3446')
add('city', '<line x1="0" y1="396" x2="380" y2="396" stroke="#8a7a8e" stroke-width="2" stroke-dasharray="10 9"/>')

# Lalbagh glass house
gh = 22
path('city', f'M{gh} 358 V336 Q{gh + 52} 300 {gh + 104} 336 V358Z', '#bcd6d8', 'opacity=".85"')
path('city', f'M{gh + 34} 324 Q{gh + 52} 304 {gh + 70} 324Z', '#d9ecec')
add('city', '<g stroke="#f4f1ea" stroke-width="1.4" fill="none">'
            f'<path d="M{gh} 336 Q{gh + 52} 300 {gh + 104} 336"/>'
            + ''.join(f'<line x1="{gh + k * 13}" y1="358" x2="{gh + k * 13}" y2="{322 + abs(k - 4) * 3.5}"/>' for k in range(1, 8))
            + f'<line x1="{gh}" y1="346" x2="{gh + 104}" y2="346"/></g>')
add('lights', f'<path d="M{gh} 358 V336 Q{gh + 52} 300 {gh + 104} 336 V358Z" fill="#fde7b0" opacity=".3"/>')

# kaapi cart
cx, cy = 132, 368
add('city', f'<rect x="{cx}" y="{cy}" width="34" height="18" rx="2" fill="#a0522d"/><rect x="{cx - 2}" y="{cy - 14}" width="38" height="5" fill="#e94f37"/>'
            f'<line x1="{cx + 2}" y1="{cy - 9}" x2="{cx + 2}" y2="{cy}" stroke="#6e533d" stroke-width="2"/><line x1="{cx + 32}" y1="{cy - 9}" x2="{cx + 32}" y2="{cy}" stroke="#6e533d" stroke-width="2"/>'
            f'<rect x="{cx + 12}" y="{cy - 6}" width="6" height="6" rx="1" fill="#efe2c8"/>'
            f'<path d="M{cx + 15} {cy - 8} q-3 -5 0 -9 q3 -4 0 -8" stroke="#f4f1ea" stroke-width="1.2" fill="none" opacity=".7"/>'
            f'<circle cx="{cx + 7}" cy="{cy + 20}" r="3" fill="#1d1a22"/><circle cx="{cx + 27}" cy="{cy + 20}" r="3" fill="#1d1a22"/>'
            f'<text x="{cx + 17}" y="{cy + 12}" text-anchor="middle" font-family="ui-monospace,monospace" font-size="6" fill="#f2e3b3">KAAPI</text>')
add('lights', f'<rect x="{cx - 2}" y="{cy - 14}" width="38" height="5" fill="#ff8a6a"/>')

# streetlights
for lx in (186, 344):
    add('city', f'<line x1="{lx}" y1="392" x2="{lx}" y2="344" stroke="#2f2a36" stroke-width="2.5"/><path d="M{lx} 344 h8" stroke="#2f2a36" stroke-width="2.5"/>'
                f'<circle cx="{lx + 9}" cy="346" r="2.8" fill="#d9c9a0"/>')
    add('lights', f'<circle cx="{lx + 9}" cy="346" r="16" fill="#fde0a0" opacity=".28"/><circle cx="{lx + 9}" cy="346" r="3" fill="#fff4cc"/>'
                  f'<path d="M{lx + 9} 349 L{lx - 6} 392 H{lx + 24}Z" fill="#fde0a0" opacity=".12"/>')

# auto-rickshaw
add('city', '<g transform="translate(214 412)">'
            '<path d="M0 0 Q0 -22 18 -24 H34 Q44 -24 44 -12 V0Z" fill="#f2c14e"/><path d="M4 0 V-14 Q6 -20 16 -20 H22 V0Z" fill="#2f2a36"/>'
            '<rect x="-2" y="-2" width="48" height="8" rx="3" fill="#3f8a5a"/><circle cx="6" cy="8" r="5" fill="#1d1a22"/><circle cx="38" cy="8" r="5" fill="#1d1a22"/><circle cx="45" cy="-4" r="2" fill="#fde7b0"/></g>')
add('lights', '<circle cx="259" cy="408" r="8" fill="#fde7b0" opacity=".35"/>')

# delivery scooter with a purple box
add('city', '<g transform="translate(300 384)">'
            '<rect x="10" y="-20" width="16" height="14" rx="2" fill="#8a5fbf"/><path d="M-10 0 H14 L22 -10" stroke="#e8e5df" stroke-width="2.5" fill="none"/>'
            '<path d="M-10 0 L-14 -14 H-6" stroke="#e8e5df" stroke-width="2.5" fill="none"/><circle cx="-10" cy="2" r="4.5" fill="none" stroke="#1d1a22" stroke-width="3"/><circle cx="18" cy="2" r="4.5" fill="none" stroke="#1d1a22" stroke-width="3"/>'
            '<circle cx="4" cy="-22" r="5" fill="#c4935e"/><path d="M-1 -24 q5 -6 10 0" fill="#8a5fbf"/></g>')


# jacarandas framing the view
def jacaranda(cx, cy, r):
    return (f'<rect x="{cx - 3}" y="{cy}" width="6" height="{r + 40}" fill="#4f3646"/>'
            f'<g fill="#9b6fd0"><circle cx="{cx}" cy="{cy}" r="{r}"/><circle cx="{cx - r * .85}" cy="{cy + 8}" r="{r * .7}"/><circle cx="{cx + r * .85}" cy="{cy + 6}" r="{r * .72}"/></g>'
            f'<g fill="#c49bd6"><circle cx="{cx - 6}" cy="{cy - 8}" r="{r * .45}"/><circle cx="{cx + r * .7}" cy="{cy - 2}" r="{r * .3}"/><circle cx="{cx - r * .6}" cy="{cy + 4}" r="{r * .28}"/></g>')


add('city', jacaranda(4, 352, 30))
add('city', jacaranda(372, 340, 32))
add('city', '<g fill="#b48ade" opacity=".85">' + ''.join(f'<circle cx="{x}" cy="{y}" r="1.7"/>' for x, y in [(30, 418), (52, 426), (80, 414), (300, 420), (330, 430), (350, 412), (120, 432)]) + '</g>')

os.makedirs(OUT, exist_ok=True)
for name, parts in layers.items():
    with open(os.path.join(OUT, f'{name}.svg'), 'w') as f:
        f.write(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}">\n' + '\n'.join(parts) + '\n</svg>\n')
print('wrote', ', '.join(f'{n}.svg' for n in layers))
