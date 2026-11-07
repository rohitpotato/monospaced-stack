'use client'

import type { ThreeElements, ThreeEvent } from '@react-three/fiber'
import type { MotionValue } from 'framer-motion'
import type { StopId, Target, Vec3 } from './stops'
import { RoundedBox, useTexture } from '@react-three/drei'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Suspense, useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import { LABELS, RX, RZ, STOP_INDEX, STOPS } from './stops'

export interface SceneNode { ready: boolean | null }

export interface RoomSceneProps {
  /** Continuous position along the journey: 0 is the first stop, 1 the second, and so on. */
  position: MotionValue<number>
  /** The stop whose chapter is on screen. */
  active: number
  reduceMotion: boolean
  nodes: SceneNode[]
  readyText: string
  screen: { date: string, note: string, synced: string }
  onTarget: (target: Target) => void
}

const BG = '#201d27'
const ACCENT = '#f0a77a'
const LED = { ok: '#3ddc97', bad: '#ef5a4a', unknown: '#8a8794' }

function ease(f: number) {
  // Rest at each stop while its chapter is being read; move in between.
  const t = THREE.MathUtils.clamp((f - 0.2) / 0.6, 0, 1)
  return t * t * (3 - 2 * t)
}

/** A rounded box that casts and takes shadows. */
function Box({ size, r = 0.04, color, roughness = 0.82, metalness = 0, emissive, emissiveIntensity, ...props }: {
  size: Vec3
  r?: number
  color: string
  roughness?: number
  metalness?: number
  emissive?: string
  emissiveIntensity?: number
} & Omit<ThreeElements['mesh'], 'args' | 'ref'>) {
  return (
    <RoundedBox args={size} radius={r} smoothness={4} castShadow receiveShadow {...props}>
      <meshStandardMaterial color={color} roughness={roughness} metalness={metalness} emissive={emissive} emissiveIntensity={emissiveIntensity} />
    </RoundedBox>
  )
}

function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement('canvas')
    c.width = c.height = 64
    const g = c.getContext('2d')!
    const r = g.createRadialGradient(32, 32, 0, 32, 32, 32)
    r.addColorStop(0, 'rgba(255,255,255,1)')
    r.addColorStop(0.25, 'rgba(255,255,255,.6)')
    r.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = r
    g.fillRect(0, 0, 64, 64)
    return new THREE.CanvasTexture(c)
  }, [])
}

/** Clickable things: pointer cursor on hover, and a click opens their details. */
function useClickable(target: Target, onTarget: (t: Target) => void) {
  return {
    onPointerOver: (e: ThreeEvent<PointerEvent>) => {
      e.stopPropagation()
      document.body.style.cursor = 'pointer'
    },
    onPointerOut: () => {
      document.body.style.cursor = ''
    },
    onClick: (e: ThreeEvent<MouseEvent>) => {
      e.stopPropagation()
      onTarget(target)
    },
  }
}

function Room() {
  const wall = '#3b3448'
  const WX0 = 0.2
  const WX1 = 3.4
  const WY0 = 2.4
  const WY1 = 4.6
  const H = 6.2
  const Z = -5.1
  const piece = (x0: number, x1: number, y0: number, y1: number) => (
    <Box key={`${x0}${y0}`} size={[x1 - x0, y1 - y0, 0.3]} color={wall} position={[(x0 + x1) / 2, (y0 + y1) / 2, Z]} />
  )
  const frame = '#e9dfd2'
  return (
    <group>
      <Box size={[10.4, 0.3, 10.4]} r={0.08} color="#5a4337" roughness={0.9} position={[0, -0.15, 0]} />
      {piece(-5.2, WX0, 0, H)}
      {piece(WX1, 5.2, 0, H)}
      {piece(WX0, WX1, 0, WY0)}
      {piece(WX0, WX1, WY1, H)}
      <Box size={[0.3, H, 10.4]} color={wall} position={[-5.2, H / 2, 0]} />
      {/* window frame and sill */}
      <Box size={[WX1 - WX0 + 0.3, 0.16, 0.6]} r={0.05} color={frame} position={[(WX0 + WX1) / 2, WY0 - 0.02, Z + 0.15]} />
      <Box size={[WX1 - WX0 + 0.2, 0.12, 0.2]} color={frame} position={[(WX0 + WX1) / 2, WY1, Z + 0.05]} />
      <Box size={[0.12, WY1 - WY0, 0.2]} color={frame} position={[WX0, (WY0 + WY1) / 2, Z + 0.05]} />
      <Box size={[0.12, WY1 - WY0, 0.2]} color={frame} position={[WX1, (WY0 + WY1) / 2, Z + 0.05]} />
      <Box size={[0.06, WY1 - WY0, 0.12]} r={0.02} color={frame} position={[(WX0 + WX1) / 2, (WY0 + WY1) / 2, Z + 0.05]} />
      {/* rug */}
      <Box size={[4.2, 0.03, 3]} r={0.01} color="#4b3a5a" roughness={1} position={[-0.8, 0.02, -0.8]} />
    </group>
  )
}

/** The view out of the window: the home page's Bengaluru poster, with the sky masked off around the walls. */
function Outside() {
  const poster = useTexture('/bengaluru/poster-1024.webp')
  poster.colorSpace = THREE.SRGBColorSpace
  const invalidate = useThree(s => s.invalidate)
  useEffect(() => {
    invalidate()
  }, [poster, invalidate])
  return (
    <group>
      <mesh position={[1.8, 3.0, -10]}>
        <planeGeometry args={[9, 11.25]} />
        <meshBasicMaterial map={poster} toneMapped={false} />
      </mesh>
      <mesh position={[4, 16.2, -5.27]}>
        <planeGeometry args={[30, 20]} />
        <meshBasicMaterial color={BG} toneMapped={false} />
      </mesh>
      <mesh position={[12.2, 0, -5.27]}>
        <planeGeometry args={[14, 30]} />
        <meshBasicMaterial color={BG} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Cloud({ onTarget }: { onTarget: (t: Target) => void }) {
  const click = useClickable('path', onTarget)
  const puffs: [number, number, number, number][] = [[0, 0, 0, 0.55], [0.55, -0.08, 0.05, 0.42], [-0.55, -0.1, 0, 0.4], [0.2, 0.3, -0.05, 0.42], [-0.25, 0.22, 0.1, 0.36]]
  return (
    <group position={[2.5, 3.95, -7.4]} scale={0.75} {...click}>
      {puffs.map(([x, y, z, r]) => (
        <mesh key={`${x}${y}`} position={[x, y, z]}>
          <sphereGeometry args={[r, 32, 24]} />
          <meshStandardMaterial color="#fff3ea" roughness={1} emissive="#ffd9c2" emissiveIntensity={0.25} />
        </mesh>
      ))}
    </group>
  )
}

function wrap(ctx: CanvasRenderingContext2D, text: string, width: number, maxLines: number) {
  const lines: string[] = []
  let line = ''
  for (const word of text.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word
    if (ctx.measureText(next).width > width && line) {
      lines.push(line)
      line = word
    }
    else {
      line = next
    }
  }
  if (line)
    lines.push(line)
  if (lines.length > maxLines) {
    lines.length = maxLines
    lines[maxLines - 1] = `${lines[maxLines - 1].replace(/\s+\S*$/, '')}…`
  }
  return lines
}

/** The monitor on the desk shows the latest change to the GitOps repo. */
function Monitor({ screen, onTarget }: { screen: RoomSceneProps['screen'], onTarget: (t: Target) => void }) {
  const click = useClickable('deploys', onTarget)
  const canvas = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 760
    c.height = 440
    return c
  }, [])
  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas)
    t.colorSpace = THREE.SRGBColorSpace
    t.anisotropy = 4
    return t
  }, [canvas])
  const invalidate = useThree(s => s.invalidate)

  useEffect(() => {
    let cancelled = false
    const draw = () => {
      if (cancelled)
        return
      const g = canvas.getContext('2d')!
      g.fillStyle = '#16151b'
      g.fillRect(0, 0, 760, 440)
      g.font = '500 30px "JetBrains Mono", ui-monospace, monospace'
      g.fillStyle = ACCENT
      g.fillText('$ git log -1', 36, 70)
      g.fillStyle = '#8a8794'
      g.fillText(screen.date, 36, 136)
      g.fillStyle = '#efecf3'
      g.font = '500 34px "JetBrains Mono", ui-monospace, monospace'
      wrap(g, screen.note, 690, 3).forEach((line, i) => g.fillText(line, 36, 204 + i * 48))
      g.fillStyle = '#7ee2b8'
      g.font = '500 28px "JetBrains Mono", ui-monospace, monospace'
      g.fillText(screen.synced, 36, 392)
      texture.needsUpdate = true
      invalidate()
    }
    draw()
    // Draw again once the mono font has loaded, so the screen isn't stuck with the fallback.
    document.fonts?.ready.then(draw)
    return () => {
      cancelled = true
    }
  }, [canvas, texture, screen.date, screen.note, screen.synced, invalidate])

  const dark = '#1b1a20'
  return (
    <group {...click}>
      <Box size={[1.9, 1.15, 0.08]} color={dark} roughness={0.5} position={[-1.2, 2.55, -4.5]} />
      <Box size={[0.12, 0.5, 0.12]} r={0.03} color={dark} roughness={0.5} position={[-1.2, 1.85, -4.55]} />
      <Box size={[0.6, 0.05, 0.35]} r={0.02} color={dark} roughness={0.5} position={[-1.2, 1.64, -4.5]} />
      <mesh position={[-1.2, 2.55, -4.45]}>
        <planeGeometry args={[1.76, 1.02]} />
        <meshBasicMaterial map={texture} toneMapped={false} />
      </mesh>
    </group>
  )
}

function Desk() {
  const wood = '#a87457'
  const alu = '#c9c4cf'
  return (
    <group>
      <Box size={[6.2, 0.14, 1.7]} r={0.05} color={wood} roughness={0.7} position={[-1.5, 1.55, -4.0]} />
      {[-4.4, 1.4].flatMap(x => [-4.7, -3.3].map(z => (
        <Box key={`${x}${z}`} size={[0.12, 1.5, 0.12]} color={wood} roughness={0.7} position={[x, 0.75, z]} />
      )))}
      {/* laptop, with a little page glowing on its screen */}
      <Box size={[1.1, 0.05, 0.75]} r={0.02} color={alu} roughness={0.45} metalness={0.3} position={[-3.4, 1.65, -3.75]} />
      <Box size={[1.1, 0.72, 0.04]} r={0.02} color={alu} roughness={0.45} metalness={0.3} position={[-3.4, 2.0, -4.15]} rotation={[-0.25, 0, 0]} />
      <mesh position={[-3.4, 2.0, -4.12]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[0.98, 0.6]} />
        <meshBasicMaterial color="#2b2636" />
      </mesh>
      <mesh position={[-3.45, 2.12, -4.1]} rotation={[-0.25, 0, 0]}>
        <planeGeometry args={[0.5, 0.06]} />
        <meshBasicMaterial color={ACCENT} />
      </mesh>
      {/* desk lamp */}
      <Box size={[0.4, 0.06, 0.4]} r={0.03} color="#e9dfd2" position={[-4.2, 1.65, -4.4]} />
      <Box size={[0.06, 1.0, 0.06]} r={0.02} color="#e9dfd2" position={[-4.2, 2.15, -4.4]} />
      <mesh position={[-4.0, 2.7, -4.3]} rotation={[0, 0, 0.6]}>
        <coneGeometry args={[0.32, 0.4, 32, 1, true]} />
        <meshStandardMaterial color={ACCENT} side={THREE.DoubleSide} emissive={ACCENT} emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

function Server({ index, node, glow, onTarget, slide }: {
  index: number
  node?: SceneNode
  glow: THREE.Texture
  onTarget: (t: Target) => void
  slide?: React.RefObject<THREE.Group | null>
}) {
  const click = useClickable('nodes', onTarget)
  const color = node?.ready == null ? LED.unknown : node.ready ? LED.ok : LED.bad
  return (
    <group ref={slide} position={[RX, 0.55 + index * 0.68, RZ + 0.08]} {...click}>
      <Box size={[1.5, 0.52, 1.2]} r={0.05} color="#5d5770" roughness={0.5} />
      <Box size={[1.46, 0.46, 0.04]} r={0.02} color="#716a86" roughness={0.45} position={[0, 0, 0.61]} />
      {[0, 1, 2, 3, 4].map(k => (
        <Box key={k} size={[0.05, 0.26, 0.02]} r={0.01} color="#2b2933" position={[-0.15 + k * 0.1, 0, 0.635]} />
      ))}
      <Box size={[0.22, 0.08, 0.06]} r={0.03} color="#8f8a9c" position={[-0.52, 0, 0.66]} />
      <mesh position={[0.55, 0.08, 0.64]}>
        <sphereGeometry args={[0.045, 16, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <sprite position={[0.55, 0.08, 0.76]} scale={[0.3, 0.3, 1]}>
        <spriteMaterial map={glow} color={color} transparent opacity={0.55} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  )
}

function Rack({ nodes, glow, onTarget, slide, pod }: {
  nodes: SceneNode[]
  glow: THREE.Texture
  onTarget: (t: Target) => void
  slide: React.RefObject<THREE.Group | null>
  pod: React.RefObject<THREE.Group | null>
}) {
  const router = useClickable('path', onTarget)
  const podClick = useClickable('path', onTarget)
  return (
    <group>
      <Box size={[1.7, 2.5, 1.3]} r={0.08} color="#34303d" roughness={0.6} position={[RX, 1.25, RZ]} />
      {[0, 1, 2].map(i => (
        <Server key={i} index={i} node={nodes[i]} glow={glow} onTarget={onTarget} slide={i === 0 ? slide : undefined} />
      ))}
      {/* the nginx pod: a small crate in the pulled-out server, with a page rising out of it */}
      <group ref={pod} position={[RX + 0.3, 0.95, RZ + 0.75]} scale={0} {...podClick}>
        <Box size={[0.42, 0.22, 0.42]} r={0.05} color={ACCENT} emissive={ACCENT} emissiveIntensity={0.5} />
        <mesh position={[0, 0.26, 0]} rotation={[-0.15, 0.4, 0]}>
          <planeGeometry args={[0.26, 0.34]} />
          <meshBasicMaterial color="#fff7ef" side={THREE.DoubleSide} />
        </mesh>
        {[0, 1, 2].map(k => (
          <mesh key={k} position={[0.004 * k, 0.33 - k * 0.06, 0.012]} rotation={[-0.15, 0.4, 0]}>
            <planeGeometry args={[k === 0 ? 0.16 : 0.18, 0.018]} />
            <meshBasicMaterial color={k === 0 ? ACCENT : '#c9c1d3'} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      {/* the router on top, with antennas */}
      <group {...router}>
        <Box size={[1.0, 0.18, 0.6]} r={0.06} color="#e9dfd2" position={[RX, 2.6, RZ]} />
        {[-0.35, 0.35].map(dx => (
          <Box key={dx} size={[0.06, 0.6, 0.06]} r={0.03} color="#e9dfd2" position={[RX + dx, 2.95, RZ - 0.2]} rotation={[0, 0, dx * 0.5]} />
        ))}
        {[0, 1, 2, 3].map(k => (
          <mesh key={k} position={[RX - 0.3 + k * 0.12, 2.62, RZ + 0.31]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshBasicMaterial color="#7ee2b8" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function usePotatoGeometry() {
  return useMemo(() => {
    const geo = new THREE.SphereGeometry(0.38, 48, 32)
    const pos = geo.attributes.position
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      const n = 1 + 0.07 * Math.sin(v.x * 9 + 1) * Math.sin(v.y * 7) + 0.05 * Math.sin(v.z * 11 + 2)
      v.multiplyScalar(n)
      pos.setXYZ(i, v.x * 1.35, v.y * 0.8, v.z * 0.95)
    }
    geo.computeVertexNormals()
    return geo
  }, [])
}

function Shelf({ onTarget }: { onTarget: (t: Target) => void }) {
  const geo = usePotatoGeometry()
  const click = useClickable('potato', onTarget)
  const potato = useRef<THREE.Group>(null)
  const invalidate = useThree(s => s.invalidate)
  const wobble = useRef(0)

  // A little hop when clicked.
  useFrame((_, dt) => {
    if (!potato.current || wobble.current <= 0)
      return
    wobble.current = Math.max(0, wobble.current - dt * 1.6)
    const w = wobble.current
    potato.current.position.y = 3.93 + Math.abs(Math.sin(w * 10)) * 0.12 * w
    potato.current.rotation.z = Math.sin(w * 14) * 0.12 * w
    invalidate()
  })

  return (
    <group>
      <Box size={[0.9, 0.08, 1.8]} r={0.03} color="#a87457" roughness={0.7} position={[-4.65, 3.6, -1.6]} />
      <group
        ref={potato}
        position={[-4.6, 3.93, -1.6]}
        {...click}
        onClick={(e) => {
          click.onClick(e)
          wobble.current = 1
          invalidate()
        }}
      >
        <mesh geometry={geo} rotation={[0, 0.5, 0]} castShadow>
          <meshStandardMaterial color="#c99a5b" roughness={0.95} />
        </mesh>
        {[[0.18, 0.2, 0.2], [-0.2, 0.12, 0.25], [0.3, -0.02, 0.28]].map(([x, y, z]) => (
          <mesh key={`${x}`} position={[x, y, z]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#6b4a2a" />
          </mesh>
        ))}
      </group>
      <Box size={[0.5, 0.6, 0.12]} r={0.02} color="#7fb8a4" position={[-4.6, 3.94, -0.75]} />
      <Box size={[0.5, 0.52, 0.12]} r={0.02} color="#c49bd6" position={[-4.6, 3.9, -0.6]} />
      {/* plant */}
      <Box size={[0.6, 0.6, 0.6]} r={0.12} color="#c4724a" position={[-3.9, 0.3, 1.2]} />
      {[0, 1, 2, 3, 4, 5, 6].map(k => (
        <mesh key={k} position={[-3.9 + Math.sin(k) * 0.12, 1.1, 1.2 + Math.cos(k) * 0.12]} rotation={[Math.sin(k) * 0.5, 0, Math.cos(k * 1.7) * 0.5]} castShadow>
          <coneGeometry args={[0.12, 1.1, 12]} />
          <meshStandardMaterial color="#5f9c7c" roughness={0.82} />
        </mesh>
      ))}
    </group>
  )
}

// The packet's route, one curve per hop between stops that have it.
const v = (p: Vec3) => new THREE.Vector3(...p)
const P_LAPTOP: Vec3 = [-3.4, 2.4, -4.1]
const P_CLOUD: Vec3 = [2.4, 3.9, -7.2]
const P_ROUTER: Vec3 = [3.75, 2.78, -4.3]
const P_NODES: Vec3 = [RX - 0.2, 1.9, RZ + 0.75]
const P_POD: Vec3 = [RX + 0.3, 1.3, RZ + 0.75]
const HOP = new THREE.CatmullRomCurve3([v(P_LAPTOP), v([-1.2, 3.9, -4.5]), v([1.2, 3.8, -5.1]), v(P_CLOUD)])
const CABLE = new THREE.CatmullRomCurve3([v([2.2, 3.6, -7.0]), v([2.6, 3.0, -5.6]), v([2.9, 2.55, -5.0]), v([3.3, 2.6, -4.6]), v([3.7, 2.75, -4.35])])
const SEGMENTS: Partial<Record<StopId, THREE.Curve<THREE.Vector3>>> = {
  laptop: HOP,
  cloud: new THREE.CatmullRomCurve3([v(P_CLOUD), v([2.6, 3.0, -5.6]), v([2.9, 2.55, -5.0]), v([3.3, 2.6, -4.6]), v(P_ROUTER)]),
  router: new THREE.LineCurve3(v(P_ROUTER), v(P_NODES)),
  nodes: new THREE.LineCurve3(v(P_NODES), v(P_POD)),
}
const PACKET_FIRST = STOP_INDEX.laptop
const PACKET_LAST = STOP_INDEX.pod

function Routes() {
  const dash = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(HOP.getPoints(60))
    const line = new THREE.Line(geo, new THREE.LineDashedMaterial({ color: ACCENT, dashSize: 0.12, gapSize: 0.1, transparent: true, opacity: 0.8 }))
    line.computeLineDistances()
    return line
  }, [])
  return (
    <group>
      <mesh>
        <tubeGeometry args={[CABLE, 64, 0.022, 8, false]} />
        <meshStandardMaterial color="#141318" roughness={0.82} />
      </mesh>
      <primitive object={dash} />
    </group>
  )
}

/** Moves the camera, the packet, the pulled-out server and the pod as the reader scrolls. */
function Director({ position, reduceMotion, packet, slide, pod }: {
  position: MotionValue<number>
  reduceMotion: boolean
  packet: React.RefObject<THREE.Group | null>
  slide: React.RefObject<THREE.Group | null>
  pod: React.RefObject<THREE.Group | null>
}) {
  const camera = useThree(s => s.camera) as THREE.PerspectiveCamera
  const size = useThree(s => s.size)
  const invalidate = useThree(s => s.invalidate)
  const goal = useMemo(() => ({ pos: new THREE.Vector3(), look: new THREE.Vector3(), fov: 34 }), [])
  const look = useRef<THREE.Vector3 | null>(null)
  const tmp = useMemo(() => ({ a: new THREE.Vector3(), b: new THREE.Vector3() }), [])

  useEffect(() => position.on('change', () => invalidate()), [position, invalidate])
  // Draw once the canvas has its real size, and again whenever it changes.
  useEffect(() => {
    invalidate()
  }, [size.width, size.height, invalidate])

  useFrame((_, dt) => {
    const last = STOPS.length - 1
    const x = THREE.MathUtils.clamp(position.get(), 0, last)
    const i = Math.min(Math.floor(x), last - 1)
    const f = reduceMotion ? (x - i < 0.5 ? 0 : 1) : ease(x - i)
    const A = STOPS[i].camera
    const B = STOPS[i + 1].camera
    goal.pos.lerpVectors(tmp.a.set(...A.pos), tmp.b.set(...B.pos), f)
    goal.look.lerpVectors(tmp.a.set(...A.look), tmp.b.set(...B.look), f)
    // Narrow screens see less from side to side, so widen the view to keep each scene in frame.
    const aspect = size.width / size.height
    goal.fov = THREE.MathUtils.lerp(A.fov, B.fov, f) * Math.max(1, 0.9 / aspect) ** 0.8

    if (!look.current) {
      look.current = goal.look.clone()
      camera.position.copy(goal.pos)
      camera.fov = goal.fov
    }
    const k = reduceMotion ? 1 : 1 - Math.exp(-dt * 6)
    camera.position.lerp(goal.pos, k)
    look.current.lerp(goal.look, k)
    camera.fov += (goal.fov - camera.fov) * k
    camera.lookAt(look.current)
    camera.updateProjectionMatrix()

    // The packet rides its route between the laptop and the pod.
    if (packet.current) {
      const seg = SEGMENTS[STOPS[i].id]
      const onRoute = x >= PACKET_FIRST - 0.35 && x <= PACKET_LAST + 0.35
      packet.current.visible = onRoute
      if (onRoute) {
        if (seg && x >= i)
          packet.current.position.copy(seg.getPoint(f))
        else if (x < PACKET_FIRST)
          packet.current.position.set(...P_LAPTOP)
        else if (x >= PACKET_LAST)
          packet.current.position.set(...P_POD)
      }
    }

    // Near the pod's chapter, the first server slides out and the pod rises from it.
    const near = THREE.MathUtils.clamp(1 - Math.abs(x - PACKET_LAST) * 1.4, 0, 1)
    const open = reduceMotion ? (near > 0.5 ? 1 : 0) : near
    if (slide.current)
      slide.current.position.z = RZ + 0.08 + 0.55 * open
    if (pod.current)
      pod.current.scale.setScalar(Math.max(open, 0.0001))

    const settled = camera.position.distanceToSquared(goal.pos) < 1e-6 && look.current.distanceToSquared(goal.look) < 1e-6
    if (!settled)
      invalidate()
  })
  return null
}

function Packet({ glow, ref }: { glow: THREE.Texture, ref: React.RefObject<THREE.Group | null> }) {
  return (
    <group ref={ref} visible={false}>
      <mesh>
        <sphereGeometry args={[0.08, 24, 16]} />
        <meshBasicMaterial color="#ffd2b4" />
      </mesh>
      <sprite scale={[0.9, 0.9, 1]}>
        <spriteMaterial map={glow} color={ACCENT} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
    </group>
  )
}

type LabelRefs = React.RefObject<Map<StopId, HTMLElement>>

/** Keeps each label's DOM pill over its point in the room, hiding ones that fall off screen. */
function LabelProjector({ labels, active }: { labels: LabelRefs, active: number }) {
  const camera = useThree(s => s.camera)
  const invalidate = useThree(s => s.invalidate)
  // The pills for a new stop mount after this frame; place them on the next one.
  useEffect(() => {
    const id = requestAnimationFrame(() => invalidate())
    return () => cancelAnimationFrame(id)
  }, [active, invalidate])
  const size = useThree(s => s.size)
  const p = useMemo(() => new THREE.Vector3(), [])
  useFrame(() => {
    for (const l of LABELS) {
      const el = labels.current.get(l.id)
      if (!el)
        continue
      p.set(...l.p).project(camera)
      const off = p.z > 1 || Math.abs(p.x) > 0.97 || Math.abs(p.y) > 0.97
      el.style.visibility = off ? 'hidden' : 'visible'
      // Keep the whole pill inside the frame, even when its point is near an edge.
      const half = el.offsetWidth / 2 + 8
      const x = THREE.MathUtils.clamp(((p.x + 1) / 2) * size.width, half, Math.max(half, size.width - half))
      el.style.transform = `translate(${x}px, ${((1 - p.y) / 2) * size.height}px) translate(-50%, calc(-100% - 6px))`
    }
  })
  return null
}

function Labels({ active, readyText, onTarget, labels }: { active: number, readyText: string, onTarget: (t: Target) => void, labels: LabelRefs }) {
  const current = STOPS[active]?.id
  const all = current === 'room'
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {LABELS.filter(l => (all ? l.inRoom : l.id === current)).map(l => (
        <button
          key={l.id}
          ref={(el) => {
            if (el)
              labels.current.set(l.id, el)
            else
              labels.current.delete(l.id)
          }}
          type="button"
          tabIndex={-1}
          onClick={() => l.target && onTarget(l.target)}
          style={{ visibility: 'hidden' }}
          className={`absolute top-0 left-0 flex items-center gap-1.5 whitespace-nowrap rounded-full border bg-[rgba(23,22,27,.82)] px-2.5 py-1 font-mono text-[11px] font-medium text-ink sm:text-xs ${l.id === current ? 'border-accent' : 'border-[#3a3346]'} ${l.target ? 'pointer-events-auto cursor-pointer hover:border-accent' : ''}`}
        >
          <i className="size-1.5 rounded-full" style={{ background: l.id === current ? ACCENT : '#8a8794', boxShadow: l.id === current ? `0 0 8px ${ACCENT}` : undefined }} />
          {l.text}
          {l.id === 'nodes' && <small className="text-[10px] font-normal text-inkSubtle sm:text-[11px]">{readyText}</small>}
        </button>
      ))}
    </div>
  )
}

function Scene(props: RoomSceneProps & { labels: LabelRefs }) {
  const glow = useGlowTexture()
  const packet = useRef<THREE.Group>(null)
  const slide = useRef<THREE.Group>(null)
  const pod = useRef<THREE.Group>(null)
  const { onTarget } = props
  return (
    <>
      <color attach="background" args={[BG]} />
      <hemisphereLight args={['#c9b8e6', '#3a2a2a', 0.9]} />
      <directionalLight
        color="#ffb07a"
        intensity={2.6}
        position={[4, 9, -12]}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0004}
        shadow-camera-left={-9}
        shadow-camera-right={9}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={1}
        shadow-camera-far={40}
      />
      <directionalLight color="#9fb6ff" intensity={0.55} position={[8, 6, 8]} />
      <pointLight color="#b9c8ff" intensity={6} distance={6} decay={1.6} position={[5.2, 2.4, -1.6]} />
      <pointLight color="#ffcf9a" intensity={14} distance={9} decay={1.6} position={[-3.6, 3.6, -2.6]} />

      <Room />
      <Suspense fallback={null}>
        <Outside />
      </Suspense>
      <Cloud onTarget={onTarget} />
      <Desk />
      <Monitor screen={props.screen} onTarget={onTarget} />
      <Rack nodes={props.nodes} glow={glow} onTarget={onTarget} slide={slide} pod={pod} />
      <Shelf onTarget={onTarget} />
      <Routes />
      <Packet glow={glow} ref={packet} />
      <LabelProjector labels={props.labels} active={props.active} />
      <Director position={props.position} reduceMotion={props.reduceMotion} packet={packet} slide={slide} pod={pod} />
    </>
  )
}

export default function RoomScene(props: RoomSceneProps) {
  const labels = useRef(new Map<StopId, HTMLElement>())
  useEffect(() => () => {
    document.body.style.cursor = ''
  }, [])
  return (
    <div className="relative size-full">
      <Canvas
        shadows
        frameloop="demand"
        dpr={[1, 2]}
        camera={{ fov: 42, near: 0.1, far: 200, position: STOPS[0].camera.pos }}
        gl={{ antialias: true, toneMappingExposure: 1.05 }}
        onCreated={s => s.invalidate()}
        aria-hidden="true"
      >
        <Scene {...props} labels={labels} />
      </Canvas>
      <Labels active={props.active} readyText={props.readyText} onTarget={props.onTarget} labels={labels} />
    </div>
  )
}
