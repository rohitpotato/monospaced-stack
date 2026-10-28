// Isometric projection for the neighbourhood and homelab scenes.
// u runs down-right, v runs down-left, h is height above the ground plane.

const COS = 0.866
const SIN = 0.5

export interface IsoOrigin {
  x: number
  y: number
}

export type Point = [number, number]

export function iso(origin: IsoOrigin, u: number, v: number, h = 0): Point {
  return [origin.x + COS * (u - v), origin.y + SIN * (u + v) - h]
}

export function toPoints(points: Point[]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ')
}

export interface BoxFaces {
  top: string
  /** Face at u + w, facing down-right */
  right: string
  /** Face at v + d, facing down-left */
  left: string
}

export function isoBox(origin: IsoOrigin, u: number, v: number, w: number, d: number, h: number, z = 0): BoxFaces {
  const p = (a: number, b: number, c: number) => iso(origin, a, b, c)
  return {
    right: toPoints([p(u + w, v, z), p(u + w, v + d, z), p(u + w, v + d, z + h), p(u + w, v, z + h)]),
    left: toPoints([p(u, v + d, z), p(u + w, v + d, z), p(u + w, v + d, z + h), p(u, v + d, z + h)]),
    top: toPoints([p(u, v, z + h), p(u + w, v, z + h), p(u + w, v + d, z + h), p(u, v + d, z + h)]),
  }
}

/** Rectangle drawn on a face of constant v (down-left facing), spanning u..u+w and z..z+h. */
export function onLeftFace(origin: IsoOrigin, u: number, v: number, z: number, w: number, h: number): string {
  const p = (a: number, c: number) => iso(origin, a, v, c)
  return toPoints([p(u, z), p(u + w, z), p(u + w, z + h), p(u, z + h)])
}

/** Rectangle drawn on a face of constant u (down-right facing), spanning v..v+d and z..z+h. */
export function onRightFace(origin: IsoOrigin, u: number, v: number, z: number, d: number, h: number): string {
  const p = (b: number, c: number) => iso(origin, u, b, c)
  return toPoints([p(v, z), p(v + d, z), p(v + d, z + h), p(v, z + h)])
}

/** Diamond covering u0..u1, v0..v1 on the ground (or at height h). */
export function isoQuad(origin: IsoOrigin, u0: number, v0: number, u1: number, v1: number, h = 0): string {
  return toPoints([iso(origin, u0, v0, h), iso(origin, u1, v0, h), iso(origin, u1, v1, h), iso(origin, u0, v1, h)])
}
