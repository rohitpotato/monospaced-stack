/**
 * Route: a little railway that carries a page to you. Four stations stand
 * along one track: a booth with a mast (DNS), a gate the track runs through
 * (the gateway), a long shed (the service) and a round silo (the pod). A cart
 * rides the track; the pointer sets where it goes, on a spring, and the
 * station it is heading for takes the bright edge. At rest the cart waits
 * at your end of the track. The slider is the spring's stiffness.
 */
const {
  Cam, circ, clamp, facing, fit, open, poly, prism, proj, rings, unproj, spring, stepS,
  mk, place, pointer, put, register, disposer, solid,
} = HL;

const LEN = 230, Y0 = -44, Y1 = 26, PARK = 16;
/** A ring moved to (x, y). */
const at = (ring, x, y) => ring.map((q) => ({ ...q, u: q.u + x, v: q.v + y }));
const ST = [
  { x: 40, name: "dns" },
  { x: 92, name: "gateway" },
  { x: 150, name: "service" },
  { x: 206, name: "pod" },
];

/** A solid of a rounded footprint, standing from z0 to z1. */
function box(P, front, parent, x0, y0, x1, y1, z0, z1, r = 2.4, b = 1) {
  const [ring, inner] = rings(x0, y0, x1, y1, r, b);
  const s = solid(parent);
  put(s, prism(P, front, ring, inner, z0, z1));
  return s;
}

function mount({ stage, svg, read }, value) {
  const bag = disposer();
  const C = Cam(45, 0.5, 1.22);
  fit(C, [[-12, Y0, -5], [LEN + 12, Y1, -5], [LEN + 12, Y0, -5], [-12, Y1, -5], [40, -22, 44], [92, 0, 37]], 200, 170);
  const P = proj(C), front = facing(C);
  let k = value;

  const g = mk("g", {}, svg);
  box(P, front, g, -12, Y0, LEN + 12, Y1, -5, 0, 7, 2);
  // sleepers, on the ground under the track
  let sl = "";
  for (let x = 4; x < LEN; x += 9) sl += open([P(x, -3, 0), P(x, 9, 0)]);
  mk("path", { d: sl, class: "nf lo" }, g);

  // Stations behind the track, far to near; each keeps the solid that lights.
  const lit = [];
  // DNS: a booth with a mast and a small dish on top
  const dns = ST[0].x;
  lit.push(box(P, front, g, dns - 11, -32, dns + 11, -12, 0, 24));
  put(solid(g), prism(P, front, at(circ(1.4, 10), dns, -22), at(circ(1, 10), dns, -22), 24, 42));
  put(solid(g), prism(P, front, at(circ(6, 16), dns, -22), at(circ(5, 16), dns, -22), 42, 44));
  // Gateway, back post
  const gw = ST[1].x;
  box(P, front, g, gw - 3.5, -16, gw + 3.5, -9, 0, 32, 1.6, 0.6);
  // Service: a long shed with a row of vents on its face
  const sv = ST[2].x;
  lit.push(box(P, front, g, sv - 17, -36, sv + 17, -10, 0, 18));
  let vents = "";
  for (let i = 0; i < 6; i++) vents += open([P(sv - 12 + i * 5, -10, 5), P(sv - 12 + i * 5, -10, 13)]);
  mk("path", { d: vents, class: "nf lo" }, g);
  // Pod: a round silo with a lid
  const pd = ST[3].x;
  const silo = solid(g);
  put(silo, prism(P, front, at(circ(12, 24), pd, -22), at(circ(11, 24), pd, -22), 0, 26));
  lit.push(silo);
  put(solid(g), prism(P, front, at(circ(13.5, 24), pd, -22), at(circ(12.4, 24), pd, -22), 26, 29));

  // The track, then the cart, then what stands in front of and over it.
  box(P, front, g, -4, 1, LEN + 4, 5, 0, 3, 1.6, 0.6);
  box(P, front, g, -8, -2, 0, 8, 0, 9, 1.6, 0.8);
  const cart = { body: solid(g), wheels: mk("path", { class: "nf" }, g), code: [0, 1, 2].map(() => mk("circle", { r: 1.2, class: "dot m" }, g)) };
  box(P, front, g, gw - 3.5, 11, gw + 3.5, 18, 0, 32, 1.6, 0.6);
  const lintel = box(P, front, g, gw - 6, -18, gw + 6, 20, 32, 37, 2, 0.9);
  lit.splice(1, 0, lintel);

  const sp = { s: spring(PARK, { k }) };
  let drawn = NaN;
  function drawCart(x) {
    if (x === drawn) return;
    drawn = x;
    const [ring, inner] = rings(x - 13, -4, x + 13, 9, 2.8, 1.1);
    put(cart.body, prism(P, front, ring, inner, 5, 22));
    let w = "";
    for (const dx of [-6, 6]) {
      const pts = [];
      for (let a = 0; a < 16; a++) pts.push(P(x + dx + 3.6 * Math.cos((a / 16) * 2 * Math.PI), 9, 5 + 3.6 * Math.sin((a / 16) * 2 * Math.PI)));
      w += poly(pts);
    }
    cart.wheels.setAttribute("d", w);
    cart.code.forEach((el, i) => place(el, P(x - 5 + i * 5, 2.5, 22)));
  }

  const B = register(stage, (dt) => {
    const m = stepS(sp.s, dt);
    drawCart(sp.s.x);
    return m;
  });
  bag.add(B.unregister);

  /** The station nearest a point on the track, or -1 before the first one. */
  const near = (x) => (x < ST[0].x - 24 ? -1 : ST.reduce((b, s, i) => (Math.abs(s.x - x) < Math.abs(ST[b].x - x) ? i : b), 0));
  function aim(x) {
    sp.s.t = x == null ? PARK : clamp(x, 10, LEN - 10);
    const i = x == null ? -2 : near(sp.s.t);
    lit.forEach((s, j) => s.sil.classList.toggle("hi", j === i));
    cart.body.sil.classList.toggle("hi", i === -2);
    read.textContent = i === -2 ? "rest" : i === -1 ? "you" : ST[i].name;
    B.wake();
  }
  aim(null);

  bag.add(pointer(stage, {
    move: (p) => {
      const w = unproj(C, p[0], p[1], 0);
      aim(w[0] > -20 && w[0] < LEN + 20 && w[1] > Y0 - 30 && w[1] < Y1 + 30 ? w[0] : null);
    },
    leave: () => aim(null),
  }));
  bag.add(() => svg.replaceChildren());

  return {
    set: (v) => { k = v; const t = sp.s.t; sp.s = spring(sp.s.x, { k }); sp.s.t = t; B.wake(); },
    destroy: bag.dispose,
  };
}

hairline({
  name: "route",
  means: "A railway that carries a page to you: the pointer sends the cart down the track, past DNS, the gateway and the service, to the pod.",
  rules: [1, 3, 4, 8],
  range: [40, 100, 220],
  tour: [[150, 150], [215, 175], [290, 205], null],
  mount,
});
