/**
 * Spindle: a desk receipt spike holding the latest changes as slips, newest on
 * top. The pointer's height picks a slip; it swings round the spike to face
 * you, and its neighbours swing less, staggered from it. Each slip is ruled
 * like a receipt and punched where the spike goes through. The newest slip is
 * bright at rest. The slider is the reach, in slips.
 *
 * Dates come from the stage's data-dates, "nov 5,nov 3,…", newest first.
 * Without it, eight slips with made-up dates.
 */
const {
  Cam, circ, clamp, facing, fit, hull, open, poly, prism, proj, rad, ringAt, rings, rrect, run,
  tween, tset, tval, tdone, mk, pointer, put, register, disposer, solid,
} = HL;

const L = 62, HW = 14, BACK = 20, GAP = 4.6, Z0 = 8, ROD = 1.6, SWING = 118;
const DEFAULT = "nov 5,nov 4,nov 4,nov 2,oct 30,oct 29,oct 27,oct 24";

/** The share of the full swing for a slip `u` reaches from the one picked. */
const falloff = (u) => (u <= 0 ? 1 : u < 1 ? 0.6 * (1 - u) + 0.1 : 0.04);

/** A ring turned by `deg` round the spike, at the origin; normals turn with it. */
function turn(ring, deg) {
  const c = Math.cos(rad(deg)), s = Math.sin(rad(deg));
  return ring.map((q) => ({ u: q.u * c - q.v * s, v: q.u * s + q.v * c, nu: q.nu * c - q.nv * s, nv: q.nu * s + q.nv * c }));
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const dates = ((stage.dataset && stage.dataset.dates) || DEFAULT).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 8);
  const N = dates.length, TOP = Z0 + N * GAP;
  let reach = value;

  const C = Cam(45, 0.5, 2.75);
  fit(C, [[-L + BACK, -L + BACK, 0], [L, L, 0], [L, -L, 0], [-L, L, 0], [0, 0, TOP + 22]], 200, 170);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  // The base: a heavy round puck with a lip.
  const base = circ(32, 28), baseIn = circ(30, 28);
  put(solid(g), prism(P, front, base, baseIn, 0, 5));
  put(solid(g), prism(P, front, circ(9, 16), circ(7.6, 16), 5, 8));

  const slip = rrect(-BACK, -HW, L - BACK, HW, 2.2, 4), slipIn = rrect(-BACK + 1, -HW + 1, L - BACK - 1, HW - 1, 1.4, 4);
  const rod = circ(ROD, 10);
  // From the back, a fan of slips: newest (index 0) on top.
  const restAt = (i) => 190 + ((i * 53) % 110) - 55;
  const slips = [];
  let zPrev = 8;
  for (let k = N - 1; k >= 0; k--) {
    const z = Z0 + (N - 1 - k) * GAP;
    put(solid(g), prism(P, front, rod, rod, zPrev, z));
    zPrev = z + 0.9;
    const grp = mk("g", {}, g), body = solid(grp);
    const rules = mk("path", { class: "nf lo" }, grp), tear = mk("path", { class: "nf lo" }, grp);
    const hole = mk("path", { class: "nf" }, grp);
    slips[k] = { k, z, grp, body, rules, tear, hole, rest: restAt(k), tw: tween(restAt(k)), drawn: NaN };
  }
  // The spike above the top slip, tapering to a point.
  const tip = mk("path", { class: "sil" }, g);
  const tipRing = ringAt(P, rod, zPrev), apex = P(0, 0, TOP + 20);
  tip.setAttribute("d", poly(hull(tipRing.concat([apex]))));

  function draw(s, deg) {
    if (deg === s.drawn) return;
    s.drawn = deg;
    const ring = turn(slip, deg), inner = turn(slipIn, deg);
    put(s.body, prism(P, front, ring, inner, s.z, s.z + 0.9));
    const c = Math.cos(rad(deg)), sn = Math.sin(rad(deg)), z = s.z + 0.9;
    const at = (u, v) => P(u * c - v * sn, u * sn + v * c, z);
    let d = "";
    for (const [u0, u1, v] of [[-15, 22, -8], [-15, 32, -4], [6, 26, 0], [-15, 30, 4], [16, 32, 9]]) d += open([at(u0, v), at(u1, v)]);
    s.rules.setAttribute("d", d);
    const teeth = [];
    for (let j = 0; j <= 10; j++) teeth.push(at(L - BACK - 3 - (j % 2) * 2, -HW + 3 + j * ((2 * HW - 6) / 10)));
    s.tear.setAttribute("d", open(teeth));
    s.hole.setAttribute("d", poly(ringAt(P, circ(ROD + 1.2, 10), z)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const s of slips) { draw(s, tval(s.tw, now)); if (!tdone(s.tw, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  // Hit test against the rest pose: the screen height of each slip on the spike.
  const rowY = slips.map((s) => P(0, 0, s.z)[1]);
  const cx = P(0, 0, 0)[0];
  function hit([x, y]) {
    if (Math.abs(x - cx) > 120 || y < rowY[0] - 34 || y > rowY[N - 1] + 30) return -1;
    let best = 0, d = Infinity;
    rowY.forEach((ry, i) => { const e = Math.abs(ry - y); if (e < d) { d = e; best = i; } });
    return best;
  }

  let act = -2;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    slips.forEach((s, i) => {
      const t = a < 0 ? s.rest : s.rest - SWING * falloff(Math.abs(i - a) / reach);
      tset(s.tw, t, now, Math.abs(i - from) * 40);
      s.body.sil.classList.toggle("hi", a < 0 ? i === 0 : i === a);
    });
    read.textContent = a < 0 ? "rest" : dates[a];
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = clamp(v, 0.3, 4); const a = act; act = -2; setActive(a); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "spindle",
  means: "Recent changes as slips on a receipt spike: the pointer's height picks one, and it swings round to face you.",
  rules: [1, 2, 5, 10],
  range: [0.6, 1.6, 3],
  tour: [[200, 96], [200, 128], [200, 150], null],
  mount,
});
