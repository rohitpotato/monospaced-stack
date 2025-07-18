
import { Article, FooterCategory } from './types';
import {
  JuiceIcon, Css3DIcon, AnimateSphereIcon, WriteIcon, ScrollDrawIcon,
  ShadersIcon, CameraIcon, BrowserIcon, TocIcon, UserUiIcon,
  BlendIcon, ObserverIcon, NewsIcon, PersonalizationIcon, ScrollPercentIcon
} from './components/icons';

export const ARTICLES: Article[] = [
  {
    id: 1,
    title: 'Juice',
    description: 'What is Juice in software development. What is Game Feel and how it can be used in non-game software. How software can fulfill emotional requirements.',
    Icon: JuiceIcon,
  },
  {
    id: 2,
    title: '3D in CSS',
    description: 'How to create a 3D space using CSS. How to use the CSS perspective and perspectiveOrigin properties. How to translate, scale and rotate an element in 3D space.',
    Icon: Css3DIcon,
  },
  {
    id: 3,
    title: 'Animate a mesh across a sphere\'s surface',
    description: 'How to animate a mesh across the surface of a sphere using three.js and GSAP.',
    Icon: AnimateSphereIcon,
  },
  {
    id: 4,
    title: 'How to write',
    description: 'What is the purpose of writing a blog post. How to choose what to write about and how to say it. The value of writing.',
    Icon: WriteIcon,
  },
  {
    id: 5,
    title: 'Scroll-driven draw animation',
    description: 'How to create a line drawing effect on scroll using SVG clip-path.',
    Icon: ScrollDrawIcon,
  },
  {
    id: 6,
    title: 'Shaders 101',
    description: 'An introduction to WebGL shaders. What they are. How they work. Why they are valuable.',
    Icon: ShadersIcon,
  },
  {
    id: 7,
    title: 'Scroll-driven camera animation',
    description: 'How to move the camera around a three.js scene as the user scrolls down the page.',
    Icon: CameraIcon,
  },
  {
    id: 8,
    title: 'Browser adaptation',
    description: 'Exploring the browser as a storytelling medium.',
    Icon: BrowserIcon,
  },
  {
    id: 9,
    title: 'Table of contents',
    description: 'How to create a web page table of contents UI (User Interface).',
    Icon: TocIcon,
  },
  {
    id: 10,
    title: 'User-driven UI',
    description: 'What is a User Driven UI. What is the Zone of Proximal Development. Different approaches to teaching users how to use a UI.',
    Icon: UserUiIcon,
  },
  {
    id: 11,
    title: 'CSS blend modes',
    description: 'What are CSS blend modes. How to use background-blend-mode and mix-blend-mode. Interactive examples.',
    Icon: BlendIcon,
  },
  {
    id: 12,
    title: 'Intersection Observer',
    description: 'What is the Intersection Observer and how to use the it.',
    Icon: ObserverIcon,
  },
  {
    id: 13,
    title: 'News',
    description: 'News sources for web dev, creative coders.',
    Icon: NewsIcon,
  },
  {
    id: 14,
    title: 'Personalization',
    description: 'What is software personalization. How to personalize software and the benefits to the user.',
    Icon: PersonalizationIcon,
  },
  {
    id: 15,
    title: 'Scroll percent',
    description: 'How to calculate how far the user has scrolled on the page or page section.',
    Icon: ScrollPercentIcon,
  },
];

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
