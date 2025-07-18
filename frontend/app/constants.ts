
import { FooterCategory } from './types';



export const FOOTER_CATEGORIES: FooterCategory[] = [
  {
    title: 'Javascript',
    links: [
      { title: 'OBJECTS' },
      { title: 'CLASSES', subLinks: [{ title: 'REFERENTIAL EQUALITY' }] },
      { title: 'SCOPES' },
      { title: 'HOISTING' },
      { title: 'TYPESCRIPT' },
    ],
  },
  {
    title: 'Performance',
    links: [
      { title: 'BIG O' },
      { title: 'DEBOUNCE AND THROTTLE' },
      { title: 'LOOPS' },
      { title: 'MEMOIZATION' },
      { title: 'WEB WORKERS' },
    ],
  },
  {
    title: 'React',
    links: [{ title: 'MEMO, USEMEMO, USECALLBACK' }],
  },
  {
    title: 'State Management',
    links: [
      { title: 'STATE MANAGEMENT' },
      { title: 'XSTATE', subLinks: [{ title: 'GLOBAL STATE' }] }
    ],
  },
  {
    title: 'three.js',
    links: [
      { title: 'ANIMATE A MESH ON A SPHERE\'S SURFACE' },
      { title: 'SCROLL-DRIVEN CAMERA ANIMATION' },
      { title: 'SHADERS 101', subLinks: [{ title: 'SHADERS 102 SENDING DATA' }] },
    ],
  },
];
