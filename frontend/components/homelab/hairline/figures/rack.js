/**
 * Rack: a short home rack with one blade per node, the control plane on top.
 * The pointer's height picks a blade; it slides out of the front, and its
 * neighbours slide out less, staggered from it. Each blade carries a handle
 * and three status dots on its face; a node that is down has its dots dark and
 * rests half out, bright, so the eye goes to it first. The slider is the reach,
 * in blades.
 *
 * Nodes come from the stage's data-nodes, "c1,w1,w0": c for the control plane,
 * w for a worker, 1 ready and 0 down. Without it, three ready nodes.
 */
const {
  Cam, clamp, facing, fit, poly, prism, proj, rings, rrect, tween, tset, tval, tdone,
  mk, place, pointer, put, register, disposer, solid,
} = HL;

const W = 104, D = 64, BH = 17, GAP = 4, SIDE = 3, LID = 4, OUT = 34, REST_OUT = [9, 0, 4, 2, 6, 1];

/** The share of full travel for a blade `u` reaches away from the one picked. */
const falloff = (u) => (u <= 0 ? 1 : u < 1 ? 0.55 * (1 - u) + 0.12 : 0.06);

function nodesOf(stage) {
  const raw = (stage.dataset && stage.dataset.nodes) || "c1,w1,w1";
  const list = raw.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6)
    .map((s) => ({ cp: s[0] === "c", up: s[1] !== "0" }));
  let w = 0;
  list.forEach((n) => { n.name = n.cp ? "server" : "worker " + ++w; });
  // the control plane sits on top: blade 0 is the lowest
  return list.sort((a, b) => Number(a.cp) - Number(b.cp));
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const nodes = nodesOf(stage), N = nodes.length;
  const TOP = N * (BH + GAP) + GAP;
  let reach = value;

  const C = Cam(45, 0.5, N > 4 ? 1.5 : 1.78);
  fit(C, [[-4, -4, -7], [W + 4, D + 4, -7], [W + 4, -4, -7], [-4, D + OUT + 4, 0], [0, 0, TOP + LID], [W, D + OUT, TOP]], 200, 166);
  const P = proj(C), front = facing(C);

  const g = mk("g", {}, svg);
  const [pr, pi] = rings(-4, -4, W + 4, D + 4, 5, 1.8);
  put(solid(g), prism(P, front, pr, pi, -7, 0));

  // Blades bottom to top: the viewer is above, so a higher blade covers a lower one.
  const blades = nodes.map((n, i) => {
    const z0 = GAP + i * (BH + GAP), grp = mk("g", {}, g);
    const body = solid(grp);
    const handle = mk("path", { class: "nf" }, grp), grip = mk("path", { class: "nf lo" }, grp);
    const vents = mk("path", { class: "nf lo" }, grp);
    const leds = [0, 1, 2].map(() => mk("circle", { r: 1.25, class: "dot " + (n.up ? "m" : "off") }, grp));
    const rest = n.up ? REST_OUT[i % REST_OUT.length] : OUT * 0.5;
    return { ...n, z0, body, handle, grip, vents, leds, rest, tw: tween(rest), drawn: NaN };
  });

  // The cabinet's near side and lid, painted after the blades so they hide what is inside.
  const [sr, si] = rings(W - SIDE, 0, W, D, 1.2, 0.6);
  put(solid(g), prism(P, front, sr, si, 0, TOP));
  const [lr, li] = rings(-2, -2, W + 2, D + 2, 4, 1.6);
  put(solid(g), prism(P, front, lr, li, TOP, TOP + LID));

  const face = (y) => (ring) => ring.map((q) => P(q.u, y, q.v));
  function draw(b, s) {
    if (s === b.drawn) return;
    b.drawn = s;
    const y1 = D + s, [ring, inner] = rings(SIDE, 0, W - SIDE, y1, 2.4, 1);
    put(b.body, prism(P, front, ring, inner, b.z0, b.z0 + BH));
    const on = face(y1), zm = b.z0 + BH / 2;
    b.handle.setAttribute("d", poly(on(rrect(12, zm - 4.5, 34, zm + 4.5, 3, 5))));
    b.grip.setAttribute("d", poly(on(rrect(15.5, zm - 2, 30.5, zm + 2, 1.6, 5))));
    let v = "";
    for (let k = 0; k < 5; k++) v += poly(on(rrect(46 + k * 7, zm - 4, 49 + k * 7, zm + 4, 1.4, 3)));
    b.vents.setAttribute("d", v);
    b.leds.forEach((el, k) => place(el, P(W - SIDE - 12 - k * 6, y1, zm)));
  }

  const B = register(stage, (_dt, now) => {
    let moving = false;
    for (const b of blades) { draw(b, tval(b.tw, now)); if (!tdone(b.tw, now)) moving = true; }
    return moving;
  });
  bag.add(B.unregister);

  // Hit test against the rest pose: the screen height of each blade's face, closed.
  const rowY = blades.map((b) => P(W / 2, D, b.z0 + BH / 2)[1]);
  const pitch = Math.abs(rowY[0] - (rowY[1] ?? rowY[0] - 30));
  const xs = [P(SIDE, D + OUT, 0)[0], P(W, 0, 0)[0]];
  function hit([x, y]) {
    if (x < Math.min(...xs) - 6 || x > Math.max(...xs) + 6) return -1;
    let best = -1, d = Infinity;
    rowY.forEach((ry, i) => { const e = Math.abs(ry - y); if (e < d) { d = e; best = i; } });
    return d <= pitch * 1.1 ? best : -1;
  }

  // At rest one mark: the first blade that is down, or the control plane's first dot.
  const down = blades.find((b) => !b.up), lead = blades[N - 1];
  function accent(a) {
    blades.forEach((b, i) => {
      const on = a < 0 ? b === down : i === a;
      b.body.sil.classList.toggle("hi", on);
      b.handle.classList.toggle("hi", on);
    });
    if (!down) lead.leds[0].setAttribute("class", "dot" + (a < 0 ? "" : " m"));
  }

  let act = -2;
  function setActive(a) {
    if (a === act) return;
    const now = performance.now(), from = a >= 0 ? a : Math.max(act, 0);
    act = a;
    blades.forEach((b, i) => {
      const t = a < 0 ? b.rest : OUT * falloff(Math.abs(i - a) / reach);
      tset(b.tw, clamp(t, 0, OUT), now, Math.abs(i - from) * 45);
    });
    accent(a);
    read.textContent = a < 0 ? "rest" : blades[a].name + (blades[a].up ? "" : " · down");
    B.wake();
  }
  setActive(-1);

  bag.add(pointer(stage, { move: (p) => setActive(hit(p)), leave: () => setActive(-1) }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { reach = v; const a = act; act = -2; setActive(a); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "rack",
  means: "A rack with one blade per node: the pointer's height pulls a blade out, and a node that is down rests half out.",
  rules: [1, 2, 4, 5],
  range: [0.6, 1.4, 2.4],
  tour: [[200, 120], [200, 175], [200, 215], null],
  mount,
});
