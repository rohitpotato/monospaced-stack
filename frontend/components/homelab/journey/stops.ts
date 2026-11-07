// The journey: where the camera stands for each chapter, and what it says.

export type StopId = 'window' | 'laptop' | 'cloud' | 'router' | 'nodes' | 'pod' | 'monitor' | 'potato' | 'room'

/** Things in the room you can click, and what clicking opens. */
export type Target = 'nodes' | 'deploys' | 'path' | 'potato'

export type Vec3 = [number, number, number]

export interface Stop {
  id: StopId
  kicker: string
  title: string
  text: string[]
  camera: { pos: Vec3, look: Vec3, fov: number }
}

// The rack's spot on the floor, used by the scene and the labels.
export const RX = 3.9
export const RZ = -3.9

export const STOPS: Stop[] = [
  {
    id: 'window',
    kicker: '01 · you are here',
    title: 'Follow this page home',
    text: [
      'You came in through that window on the home page. Behind it is a small room with three servers in it, and they made the page you’re reading.',
      'Scroll, and we’ll follow it from my rack to your screen.',
    ],
    camera: { pos: [1.9, 3.35, -1.2], look: [1.85, 3.5, -9], fov: 42 },
  },
  {
    id: 'laptop',
    kicker: '02 · you asked for a page',
    title: 'It starts with your click',
    text: ['Your browser asks for rohitpotato.xyz. Before anything reaches my servers, it has to find them.'],
    camera: { pos: [-1.4, 3.3, 0.6], look: [-3.0, 2.0, -4.2], fov: 34 },
  },
  {
    id: 'cloud',
    kicker: '03 · cloudflare',
    title: 'First stop: Cloudflare',
    text: [
      'The name points at Cloudflare, which sits in front of everything. It hides where the servers really are and soaks up anything nasty.',
      'From there the request heads for the room.',
    ],
    camera: { pos: [-0.2, 3.1, 1.6], look: [1.9, 3.6, -6.5], fov: 34 },
  },
  {
    id: 'router',
    kicker: '04 · the front door',
    title: 'In through Traefik',
    text: ['The request lands on a worker, where Traefik decides which app it’s for. Two copies run, one per worker, so either can take it.'],
    camera: { pos: [6.4, 3.4, -0.2], look: [3.7, 2.2, -4.3], fov: 34 },
  },
  {
    id: 'nodes',
    kicker: '05 · the servers',
    title: 'Three small servers',
    text: [
      'One runs Kubernetes itself, two run the apps. The lights are live: green means that server is ready right now.',
      'Click a server to see its CPU, memory and uptime.',
    ],
    camera: { pos: [6.3, 2.85, 1.3], look: [3.85, 1.45, -3.7], fov: 34 },
  },
  {
    id: 'pod',
    kicker: '06 · the pod',
    title: 'nginx hands it over',
    text: ['Inside one worker, a pod running nginx has the page ready, already built. It heads back to you the same way it came, in a few milliseconds.'],
    camera: { pos: [6.9, 2.7, 0.9], look: [3.9, 1.1, -3.5], fov: 34 },
  },
  {
    id: 'monitor',
    kicker: '07 · what changed lately',
    title: 'Every change goes through Git',
    text: [
      'That screen shows the latest change to the cluster’s repo. Argo CD watches the repo and applies changes on its own.',
      'Click the screen for the full list.',
    ],
    camera: { pos: [-0.3, 3.0, -0.6], look: [-1.2, 2.45, -4.6], fov: 36 },
  },
  {
    id: 'potato',
    kicker: '08 · the potato',
    title: 'And the potato',
    text: ['It does nothing. It has been asleep since the cluster went up. Click it anyway.'],
    camera: { pos: [-1.9, 4.5, 1.0], look: [-4.6, 3.85, -1.6], fov: 34 },
  },
  {
    id: 'room',
    kicker: 'the whole room',
    title: 'That’s all of it',
    text: ['Three servers, a router, a screen and a potato, in one room in Bengaluru. Click anything to look closer.'],
    camera: { pos: [17, 13.5, 17], look: [0.9, 1.6, -0.6], fov: 27 },
  },
]

export const STOP_INDEX = Object.fromEntries(STOPS.map((s, i) => [s.id, i])) as Record<StopId, number>

/** Labels pinned to things in the room. Only the current stop's shows; the last view shows the clickable ones. */
export const LABELS: { id: StopId, text: string, p: Vec3, target?: Target, inRoom?: boolean }[] = [
  { id: 'window', text: 'Bengaluru', p: [1.0, 4.35, -5.0] },
  { id: 'laptop', text: 'your browser', p: [-3.6, 2.45, -3.7] },
  { id: 'cloud', text: 'Cloudflare', p: [2.2, 4.55, -7.2], target: 'path', inRoom: true },
  { id: 'router', text: 'Traefik', p: [RX, 3.35, RZ], target: 'path' },
  { id: 'nodes', text: '3 servers', p: [RX - 0.95, 2.1, RZ + 0.7], target: 'nodes', inRoom: true },
  { id: 'pod', text: 'nginx pod', p: [RX + 0.3, 1.45, RZ + 0.75], target: 'path' },
  { id: 'monitor', text: 'latest change', p: [-1.2, 3.4, -4.5], target: 'deploys', inRoom: true },
  { id: 'potato', text: 'the potato', p: [-4.6, 4.3, -1.6], target: 'potato', inRoom: true },
]
