export interface HairlineRead { textContent: string | null }
export interface HairlineHandle { set: (value: number) => void, destroy: () => void }
export interface HairlineSpec {
  name: string
  means: string
  rules: number[]
  range: [number, number, number]
  tour: ([number, number] | null)[] | null
  mount: (ctx: { stage: HTMLElement, svg: SVGSVGElement, read: HairlineRead }, value: number) => HairlineHandle
}
export declare const HL: {
  inject: (root: Document | ShadowRoot) => void
  mk: (tag: string, attrs: Record<string, string>, parent: Element) => SVGSVGElement
  tour: (stage: HTMLElement, stops: ([number, number] | null)[], onStop?: (i: number) => void) => { stop: () => void }
  LAP: ([number, number] | null)[]
}
export declare const figures: Record<'potato' | 'rack' | 'route' | 'spindle' | 'trays', HairlineSpec>
