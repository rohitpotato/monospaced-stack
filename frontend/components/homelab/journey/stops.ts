// The journey: where the view sits in the picture for each chapter, and what it says.

export type StopId = 'room' | 'cloud' | 'desk' | 'shelf' | 'dog'

/** Things in the picture you can click, and what clicking opens. */
export type Target = 'nodes' | 'deploys' | 'path'

/** The picture, in its own pixels. */
export const PICTURE = { src: '/homelab/bedroom.webp', placeholder: '/homelab/bedroom-640.webp', w: 1254, h: 1254 }

export interface Stop {
  id: StopId
  kicker: string
  title: string
  text: string[]
  /** Center of the view in picture pixels, and zoom (1 = the whole picture). Zoom stays at or under 1.7 so it stays sharp. */
  view: [x: number, y: number, zoom: number]
}

// The path runs top left → middle → right, then down to the bed.
export const STOPS: Stop[] = [
  {
    id: 'room',
    kicker: '01 · the room',
    title: 'A bedroom with a server shelf',
    text: ['A desk, a window, a dog asleep on the bed, and on the right a shelf of network gear and servers. Everything on this site is served from here.'],
    view: [627, 627, 1],
  },
  {
    id: 'cloud',
    kicker: '02 · cloudflare',
    title: 'Your request comes in from out there',
    text: ['When your browser asked for this page, Cloudflare answered first. It hides where the servers really are and soaks up anything nasty.'],
    view: [330, 290, 1.6],
  },
  {
    id: 'desk',
    kicker: '03 · the desk',
    title: 'Every change goes through Git',
    text: ['Nothing on the servers is changed by hand. A change is a commit to the cluster’s repo, and Argo CD notices it and applies it on its own.'],
    view: [680, 500, 1.7],
  },
  {
    id: 'shelf',
    kicker: '04 · the shelf',
    title: 'Router, switch, servers',
    text: [
      'The request comes through the router and the switch to Traefik on one of the workers, and nginx hands the page back.',
      'One server runs Kubernetes itself, two run the apps.',
    ],
    view: [1010, 540, 1.6],
  },
  {
    id: 'dog',
    kicker: '05 · goodnight',
    title: 'The dog runs nothing',
    text: ['It sleeps on the bed all day and supervises nothing.'],
    view: [300, 900, 1.6],
  },
]

/** Labels pinned to things in the picture. All show in the first view; after that, only the current stop's. */
export const LABELS: { stop: StopId, text: string, at: [number, number], target?: Target }[] = [
  { stop: 'cloud', text: 'Cloudflare', at: [330, 225], target: 'path' },
  { stop: 'desk', text: 'latest change', at: [675, 430], target: 'deploys' },
  { stop: 'shelf', text: 'router', at: [985, 365], target: 'path' },
  { stop: 'shelf', text: 'the servers', at: [1000, 565], target: 'nodes' },
  { stop: 'dog', text: 'the dog', at: [245, 865] },
]

/** The live status light, on the server's front panel. */
export const STATUS_LIGHT: [number, number] = [1082, 578]
