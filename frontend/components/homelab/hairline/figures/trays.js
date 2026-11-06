/**
 * Trays: what runs here, as a stack of four trays. The chassis at the bottom
 * stands on feet (the VPS); on it a tray of three boxes (k3s and its nodes);
 * then a tray with a wheel of dots (Argo CD, keeping things in sync); and on
 * top a lid of tiles (the apps). The pointer's height picks a tray, and the
 * trays above it lift away to open it, staggered outwards. The slider is the
 * lift.
 */
const {
  Cam, circ, clamp, facing, fit, poly, prism, proj, ringAt, rings, rrect,
  tween, tset, tval, tdone, flatDot, mk, place, pointer, put, register, disposer, solid,
} = HL;

const W = 116, D = 84, TH = [12, 9, 9, 8], NAMES = ["vps", "k3s", "argo cd", "apps"];
// the gap under each tray at rest: room for what the tray below holds
const GAPS = [0, 3, 10, 5];
// at rest the stack sits slightly opened, so what each tray holds peeks out
const REST = [0, 4, 9, 8];
const N = 4;

/** A ring moved to (x, y). */
const at = (ring, x, y) => ring.map((q) => ({ ...q, u: q.u + x, v: q.v + y }));

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  let lift = value;
  const base = [];
  let z = 0;
  for (let i = 0; i < N; i++) { z += GAPS[i]; base.push(z); z += TH[i]; }
  const TOP = z;

  const C = Cam(45, 0.5, 1.62);
  fit(C, [[0, 0, -5], [W, D, -5], [W, 0, -5], [0, D, -5], [0, 0, TOP + 46 + 12], [W, D, TOP + 46 + 12]], 200, 166);
  const P = proj(C), front = facing(C);
  const g = mk("g", {}, svg);

  // feet under the chassis
  for (const [x, y] of [[10, 10], [W - 10, 10], [10, D - 10], [W - 10, D - 10]]) put(solid(g), prism(P, front, at(circ(4, 12), x, y), at(circ(3, 12), x, y), -5, 0));

  const trays = [];
  for (let i = 0; i < N; i++) {
    const grp = mk("g", {}, g), body = solid(grp), parts = [];
    const [ring, inner] = rings(0, 0, W, D, 6, 1.8);
    if (i === 1) for (let k = 0; k < 3; k++) {
      const x = 18 + k * 30, [r, n] = rings(x, 30, x + 22, 54, 2.4, 1);
      parts.push({ kind: "box", r, n, h: 8, el: solid(grp) });
    }
    if (i === 2) {
      parts.push({ kind: "disc", r: at(circ(9, 20), W / 2, D / 2), n: at(circ(7.8, 20), W / 2, D / 2), h: 3, el: solid(grp) });
      for (let k = 0; k < 8; k++) parts.push({ kind: "dot", a: (k / 8) * Math.PI * 2, el: flatDot(grp, C, 1.4, "dot m") });
    }
    if (i === 3) for (let k = 0; k < 6; k++) {
      const x = 16 + (k % 3) * 30, y = 18 + Math.floor(k / 3) * 26;
      parts.push({ kind: "tile", ring: rrect(x, y, x + 24, y + 20, 3, 5), el: mk("path", { class: "nf lo" }, grp) });
    }
    if (i === 0) parts.push({ kind: "tile", ring: rrect(12, 12, W - 12, D - 12, 4, 5), el: mk("path", { class: "nf lo" }, grp) });
    trays.push({ i, grp, body, ring, inner, parts, tw: tween(REST[i]), drawn: NaN });
  }

  function draw(t, dz) {
    if (dz === t.drawn) return;
    t.drawn = dz;
    const z0 = base[t.i] + dz, z1 = z0 + TH[t.i];
    put(t.body, prism(P, front, t.ring, t.inner, z0, z1));
    for (const p of t.parts) {
      if (p.kind === "box") put(p.el, prism(P, front, p.r, p.n, z1, z1 + p.h));
      if (p.kind === "disc") put(p.el, prism(P, front, p.r, p.n, z1, z1 + p.h));
      if (p.kind === "dot") place(p.el, P(W / 2 + 20 * Math.cos(p.a), D / 2 + 20 * Math.sin(p.a), z1));
      if (p.kind === "tile") p.el.setAttribute("d", poly(ringAt(P, p.ring, z1)));
    }
  }

  // Each tray rides on the one under it: its offset adds up from below.
  const B = register(stage, (_dt, now) => {
    let moving = false, acc = 0;
    for (const t of trays) { acc += tval(t.tw, now); draw(t, acc); if (!tdone(t.tw, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  // Hit test against the rest pose: the screen height of each tray's top, at its middle.
  let up = 0;
  const rowY = trays.map((t) => P(W / 2, D / 2, base[t.i] + (up += REST[t.i]) + TH[t.i])[1]);
  const xs = [P(0, D, 0)[0], P(W, 0, 0)[0]];
  function hit([x, y]) {
    if (x < xs[0] - 10 || x > xs[1] + 10) return -1;
    let best = -1, d = Infinity;
    rowY.forEach((ry, i) => { const e = Math.abs(ry - y); if (e < d) { d = e; best = i; } });
    return d < 40 ? best : -1;
  }

  let act = -2;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    // tray a+1 opens the gap; the ones above it follow a little apart
    trays.forEach((t, i) => {
      const gap = a < 0 ? REST[i] : i === a + 1 ? lift : i > a + 1 ? 4 : i === a && a === N - 1 ? 8 : 0;
      tset(t.tw, clamp(gap, 0, 60), now, Math.abs(i - from) * 45);
      t.body.sil.classList.toggle("hi", a < 0 ? i === 2 : i === a);
    });
    read.textContent = a < 0 ? "rest" : NAMES[a];
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { lift = v; const a = act; act = -2; setActive(a); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "trays",
  means: "What runs here, as a stack of trays: the pointer's height picks one, and the trays above lift away to show it.",
  rules: [1, 2, 3, 5],
  range: [22, 34, 46],
  tour: [[200, 210], [200, 180], [200, 150], null],
  mount,
});
