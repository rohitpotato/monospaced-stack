/**
 * Potato: the battery this whole lab jokingly runs on. A lumpy potato on a
 * board, two probes stuck in its top, wired to a little clock. The nearer the
 * pointer comes to the potato, the more charge it gives, on a spring; the
 * clock's hand sweeps round with it, sprouts grow from its eyes, and at full charge the clock's rim takes
 * the bright edge too. At rest the hand is the one bright mark. The slider is
 * how far the potato reaches.
 */
const {
  Cam, circ, clamp, facing, fit, hull, open, poly, prism, proj, ringAt, rings, run, seg, unproj,
  spring, stepS, flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const RX = 31, RY = 21, CX = 60, CY = -42, CZ = 21, CR = 14;
// the potato's profile: [height, scale of the outline]
const PROFILE = [[0, 0.6], [5, 0.88], [13, 1], [21, 0.9], [27, 0.62], [30, 0.3]];

/** A lumpy outline as a ring of samples, with outward normals. */
function blob(s) {
  const n = 36, pts = [];
  for (let k = 0; k < n; k++) {
    const t = (k / n) * Math.PI * 2, r = 1 + 0.07 * Math.sin(3 * t + 0.6) + 0.045 * Math.cos(5 * t + 1.1);
    pts.push([RX * s * r * Math.cos(t), RY * s * r * Math.sin(t)]);
  }
  return pts.map(([u, v], k) => {
    const a = pts[(k + n - 1) % n], b = pts[(k + 1) % n], du = b[0] - a[0], dv = b[1] - a[1], l = Math.hypot(du, dv) || 1;
    return { u, v, nu: dv / l, nv: -du / l };
  });
}

/** A ring moved to (x, y). */
const at = (ring, x, y) => ring.map((q) => ({ ...q, u: q.u + x, v: q.v + y }));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let reach = value;
  const C = Cam(45, 0.5, 1.75);
  fit(C, [[-52, -64, -4], [86, 36, -4], [86, -64, -4], [-52, 36, -4], [CX, CY, 54], [0, 0, 56]], 200, 168);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // the board
  const [br, bi] = rings(-52, -64, 86, 36, 8, 2);
  put(solid(g), prism(P, front, br, bi, -4, 0));

  // the clock, farthest back: a block with a round face on its near side
  const [cr, ci] = rings(CX - 20, CY - 14, CX + 20, CY + 10, 3.4, 1.3);
  put(solid(g), prism(P, front, cr, ci, 0, 42));
  const onFace = (u, w) => P(CX + u, CY + 10, w);
  const ringPts = (r) => { const p = []; for (let k = 0; k < 28; k++) { const t = (k / 28) * Math.PI * 2; p.push(onFace(r * Math.cos(t), CZ + r * Math.sin(t))); } return p; };
  const rim = mk("path", { d: poly(ringPts(CR + 2.4)), class: "nf" }, g);
  mk("path", { d: poly(ringPts(CR)), class: "nf lo" }, g);
  for (let k = 0; k < 4; k++) { const t = (k / 4) * Math.PI * 2; place(mk("circle", { r: 0.9, class: "dot m" }, g), onFace((CR - 2.5) * Math.cos(t), CZ + (CR - 2.5) * Math.sin(t))); }
  const hand = mk("path", { class: "nf hi" }, g);
  // two terminals on the clock's top
  for (const dx of [-8, 8]) put(solid(g), prism(P, front, at(circ(1.8, 10), CX + dx, CY - 2), at(circ(1.2, 10), CX + dx, CY - 2), 42, 45));

  // the potato: the hull of its profile rings, one crease near the top, and its eyes
  const pts = [];
  for (const [z, s] of PROFILE) pts.push(...ringAt(P, blob(s), z));
  mk("path", { d: poly(hull(pts)), class: "sil" }, g);
  mk("path", { d: open(ringAt(P, run(blob(0.84), front), 22)), class: "nf lo" }, g);
  const EYES = [[-17, 6, 22, -1, 0.4], [3, 11, 24, 0.3, 1], [15, -3, 26, 1, -0.2], [-6, -8, 28, -0.4, -1]];
  for (const [u, v, z] of EYES) place(flatDot(g, C, 1.1, "dot off"), P(u, v, z));
  // sprouts that grow from the eyes as the charge rises
  const sprouts = EYES.map(() => mk("path", { class: "nf" }, g));

  // the probes, stuck in its top, and the wires to the clock
  const probes = [[-11, -3], [11, 3]];
  for (const [x, y] of probes) {
    put(solid(g), prism(P, front, at(circ(1.6, 10), x, y), at(circ(1.1, 10), x, y), 27, 44));
    put(solid(g), prism(P, front, at(circ(2.8, 12), x, y), at(circ(2, 12), x, y), 44, 47));
  }
  const wire = (a, b) => {
    const p = [];
    for (let k = 0; k <= 16; k++) { const t = k / 16; p.push(P(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t + 9 * Math.sin(Math.PI * t))); }
    return open(p);
  };
  mk("path", { d: wire([-11, -3, 47], [CX - 8, CY - 2, 45]) + wire([11, 3, 47], [CX + 8, CY - 2, 45]), class: "nf" }, g);

  const charge = spring(0.18, { eps: 0.002 });
  let drawn = NaN;
  function draw(c) {
    const v = Math.round(c * 400) / 400;
    if (v === drawn) return;
    drawn = v;
    const a = Math.PI / 2 - v * Math.PI * 1.7, r = CR - 1.6;
    hand.setAttribute("d", seg(onFace(0, CZ), onFace(r * Math.cos(a), CZ + r * Math.sin(a))));
    rim.classList.toggle("hi", v > 0.85);
    const L = 14 * clamp((v - 0.2) / 0.8, 0, 1);
    sprouts.forEach((el, i) => {
      const [u, w, z, du, dv] = EYES[i], p = [];
      for (let k = 0; k <= 6; k++) { const t = k / 6; p.push(P(u + du * L * 0.5 * t * t, w + dv * L * 0.5 * t * t, z + L * t)); }
      el.setAttribute("d", L < 0.6 ? "" : open(p));
    });
  }
  draw(charge.x);

  const B = register(stage, (dt) => { const m = stepS(charge, dt); draw(clamp(charge.x, 0, 1)); return m; });
  bag.add(B.unregister);

  let over = null;
  function retarget() {
    if (!over) { charge.t = 0.18; read.textContent = "rest"; B.wake(); return; }
    const d = Math.hypot(over[0] / RX, over[1] / RY) * RX;
    const c = clamp(1 - Math.max(0, d - RX * 0.6) / reach, 0.05, 1);
    charge.t = c;
    read.textContent = "charge " + Math.round(c * 100);
    B.wake();
  }

  bag.add(pointer(stage, {
    move: (p) => { over = unproj(C, p[0], p[1], 14); retarget(); },
    leave: () => { over = null; retarget(); },
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v; retarget(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "potato",
  means: "A potato battery wired to a clock: bring the pointer near the potato and the hand sweeps round with the charge.",
  rules: [3, 4, 5, 8],
  range: [40, 70, 110],
  tour: [[300, 250], [230, 190], [200, 170], null],
  mount,
});
