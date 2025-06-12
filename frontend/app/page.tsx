import Header from "@/app/components/header";
import Hero from "@/app/components/Hero";
import ProfessionalExperience from "@/app/components/professional-experience";
import Sidebar from "@/app/components/sidebar";
import {
  // IBlog,
  IExperience,
  IProject,
} from "./types";
import PersonalProjects from "./components/projects";
// import Blogs from "./components/Blogs";

const updates = [
  {
    title: "Hi, my name is Rohit Kashyap.",
  },
  {
    title: "I am currently working at Zepto with the customer-web team.",
  },
  {
    title: "In my free time, I like to watch movies and workout",
  },
  {
    title:
      "I built monospaced to learn more about devops and to build my own blogging site.",
  },
];

const experience: IExperience[] = [
  {
    startDate: "2024-06-01",
    description:
      "*Zepto is an Indian online grocery delivery service that promises to deliver groceries and essentials within 10 minutes*",
    position: "Software Engineer II",
    organisationName: "Zepto",
    organisationLogo:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAb0zCsPzg-rGGNn-6poaFGGFF9wiUaXWy1Q&s",
    organisationUrl: "https://zeptonow.com",
    achievements: [
      {
        title: `Revamped the entire PDP (product description page) single -
    handedly, achieving lighthouse scores of 94 consistently.
           ![enter image description here](https://i.postimg.cc/hGZY9ngh/Screenshot-2024-11-15-at-1-11-06-AM.png)`,
      },
      {
        title:
          "Significantly improved the performance of zeptonow.com by increasing the lighthouse score by almost 50 %",
      },
      {
        title:
          "Led the effort to boost retention by applying strategies such as service worker caching for fonts, eliminating layout shifts and applying relevant SEO tags to improve core web vitals.",
      },
      {
        title:
          "Moved multiple pages to React Server Components (RSC), to leverage latest react features to improve initial load times and streaming components as necessary, cutting down load times by 40 %.",
      },
      {
        title:
          "Implemented CSRF protection from scratch for sensitive routes in the edge runtime by writing polyfills for token generation and verification.",
      },
    ],
    isCurrent: true,
  },
  {
    isCurrent: false,
    description:
      "*Comprehensive suite of health benefits and insurance products to protect your team and your business*",
    position: "Software Engineer 3",
    organisationName: "Plum Benefits",
    organisationUrl: "https://plumhq.com",
    organisationLogo:
      "https://play-lh.googleusercontent.com/nQ2QiG8Kc3HZV0Da29HIivJWLpgtgDLzA7RO-sIwEm3AHkbkD4y77C3Jl6GMkfGQ3w=w3840-h2160-rw",
    startDate: "2022-01-17",
    endDate: "2024-06-01",
    achievements: [
      {
        title:
          "Developed a Frontend logging library compatible with every framework to format, organise, batch and send error, info and debug logs to a logging service to monitor and add relevant alerts for all projects. This is being used across 13 different frontend projects and decreased error rates down to almost 0%',",
      },
      {
        title: `Led the frontend development of Plum’s ”Retail Term Life”, enhancing user engagement through an intuitive UI. Utilized Framer Motion and React Server Components (RSCs) for a seamless, high-performance experience with sophisticated animations, significantly improving user interaction metrics"
![enter image description here](https://i.postimg.cc/CMGFWbnF/Screenshot-2024-12-21-at-4-51-14-PM.png)`,
      },
      {
        title: `Designed and launched an in-house In-App Support Centre, eliminating the need for Zendesk and saving the organization over Rs 60,000 monthly. Reduced support queries by 55%, streamlining customer service operations and enhancing user satisfaction.
![enter image description here](https://i.postimg.cc/kMvw4Nj1/Screenshot-2024-12-21-at-5-09-43-PM.png)`,
      },
      // {
      //   title:
      //     "Created and implemented ’Super Top-Up’, a principal retail product for Plum, enabling users to enhance their insurance coverage up to 1 crore using a custom component library and NodeJS in a domain-driven development approach.",
      // },
    ],
  },
  {
    isCurrent: false,
    description: `*Falabella is a Latin American retail conglomerate that sells a wide range of products and services*
![enter image description here](https://i.postimg.cc/YqSc2PCC/Screenshot-2024-12-21-at-5-06-12-PM.png)`,
    organisationName: "Falabella",
    organisationUrl: "https://falabella.com",
    position: "Software Engineer",
    organisationLogo:
      "https://images.falabella.com/v3/assets/blt7c5c2f2f888a7cc3/blta6ecea82cc374fd6/65a69977cdbb964526c4f3e5/falabella.com_green_icon_mobile.svg",
    startDate: "2020-10-20",
    endDate: "2022-01-16",
    achievements: [
      {
        title:
          "Engineered Smart Search for the Sodimac web application, significantly enhancing user engagement over 1 million users through advanced search functionalities.",
      },
      {
        title:
          "Architected and deployed multiple microservices to refine the system architecture, achieving a 50% improvement in critical performance metrics.",
      },

      {
        title:
          "Developed a reusable and scalable UI component library, adopted across 7 Falabella products to ensure a consistent design language and streamline UI development.",
      },
      {
        title:
          "Optimized development workflows by upgrading Webpack configurations and increasing test coverage to 90 per cent, markedly enhancing code quality and developer productivity across projects.",
      },
    ],
  },
  {
    isCurrent: false,
    description: "*Revolutionizing the future of work with our Workspace UX!*",
    organisationName: "2gethr",
    organisationUrl: "https://2gethr.com",
    position: "Software Engineer 3",
    organisationLogo: "https://i.postimg.cc/Pxk4JQP2/2gether-logo.webp",
    startDate: "2019-06-01",
    endDate: "2020-10-01",

    achievements: [
      {
        title:
          "Developed an Administrative Portal using React, Redux-Saga, Tailwind CSS, and Styled Components.",
      },
      {
        title: "Implemented Multi-tenancy for a SaaS Model of our application.",
      },
      {
        title:
          "Developed building real-time chat for the 2gethr Member Application for over 600 members.",
      },
      {
        title:
          "Responsible for building the Service Request module for the 2gethr Member App.",
      },
    ],
  },
];

const projects: IProject[] = [
  {
    title: `[Svelte Command Palette](https://github.com/rohitpotato/svelte-command-palette)`,
    description: `A fully accessible, customisable command palette for svelte apps. Built using svelte-kit.
![enter image description here](https://i.postimg.cc/kgV2YL0G/Screenshot-2024-12-23-at-1-54-52-AM.png)`,
    url: "https://github.com/rohitpotato/svelte-command-palette",
  },
  {
    title: `[Spotify Unbiased Shuffle](https://github.com/rohitpotato/spotify-unbiased-shuffle)`,
    description: `Unbiased shuffle for spotify playlists, combine and shuffle playlists for the ultimate experience!

Spotify designed a new algorithm that distributes artists and genres more evenly. Despite that new algorithm, Johansson said that users still tell Spotify developers that the shuffle functionality is not random. And it isn't – but it's calculated to feel more random, not less.

![enter image description here](https://camo.githubusercontent.com/99060d959f082ace77b893c8c5fa7c087eb859025bc7d0e6c2fe629c51dd63e9/68747470733a2f2f726f6869742d6d6973632e73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f657a6769662e636f6d2d6769662d6d616b65722e676966)`,
    url: "https://github.com/rohitpotato/spotify-unbiased-shuffle",
  },
  {
    title: `[Svelte Switcher](https://github.com/rohitpotato/svelte-switcher)`,
    description: `A fully accessible, mobile-friendly and customisable toggle component for svelte apps.
![enter image description here](https://i.postimg.cc/yNLr6Q1M/Screenshot-2024-12-23-at-1-55-07-AM.png)`,
    url: "https://github.com/rohitpotato/svelte-command-palette",
  },
  {
    title: `[Node HTTP Server](https://github.com/rohitpotato/node-http-server)`,
    description: "A basic http server built using node primitives.",
    url: "https://github.com/rohitpotato/node-http-server",
  },
];

// const blogs: IBlog[] = [
//   {
//     title: `[Svelte Command Palette](https://github.com/rohitpotato/svelte-command-palette)`,
//     description: `A fully accessible, customisable command palette for svelte apps. Built using svelte-kit.
// ![enter image description here](https://i.postimg.cc/kgV2YL0G/Screenshot-2024-12-23-at-1-54-52-AM.png)`,
//     url: "https://github.com/rohitpotato/svelte-command-palette",
//   },
//   {
//     title: `[Spotify Unbiased Shuffle](https://github.com/rohitpotato/spotify-unbiased-shuffle)`,
//     description: `Unbiased shuffle for spotify playlists, combine and shuffle playlists for the ultimate experience!

// Spotify designed a new algorithm that distributes artists and genres more evenly. Despite that new algorithm, Johansson said that users still tell Spotify developers that the shuffle functionality is not random. And it isn't – but it's calculated to feel more random, not less.

// ![enter image description here](https://camo.githubusercontent.com/99060d959f082ace77b893c8c5fa7c087eb859025bc7d0e6c2fe629c51dd63e9/68747470733a2f2f726f6869742d6d6973632e73332e61702d736f7574682d312e616d617a6f6e6177732e636f6d2f657a6769662e636f6d2d6769662d6d616b65722e676966)`,
//     url: "https://github.com/rohitpotato/spotify-unbiased-shuffle",
//   },
//   {
//     title: `[Svelte Switcher](https://github.com/rohitpotato/svelte-switcher)`,
//     description: `A fully accessible, mobile-friendly and customisable toggle component for svelte apps.
// ![enter image description here](https://i.postimg.cc/yNLr6Q1M/Screenshot-2024-12-23-at-1-55-07-AM.png)`,
//     url: "https://github.com/rohitpotato/svelte-command-palette",
//   },
//   {
//     title: `[Node HTTP Server](https://github.com/rohitpotato/node-http-server)`,
//     description: "A basic http server built using node primitives.",
//     url: "https://github.com/rohitpotato/node-http-server",
//   },
// ];

export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      {/* Fixed Header */}
      <Header className="fixed bg-white top-0 left-0 w-full h-16 text-white flex items-center px-4 z-50" />

      <div className="flex flex-1 pt-16">
        {/* Fixed Sidebar */}
        <Sidebar className="hidden lg:block fixed top-16 left-0 h-[calc(100%-4rem)] w-64  text-white p-4 z-40 overflow-y-auto" />

        {/* Main Content */}
        <main className="flex-grow lg:ml-64 p-4 overflow-y-auto">
          <Hero updates={updates} />
          <div className="mt-[4rem]">
            <ProfessionalExperience experiences={experience} />
            <h3>
              This secret is being served by vault: {process.env.IDENTIFIER}
            </h3>
          </div>
          {/* Projects */}
          <div className="mt-[4rem]">
            <PersonalProjects projects={projects} />
          </div>
          {/* Blogs */}
          {/* <div className="mt-[4rem]">
            <Blogs blogs={projects} />
          </div> */}
        </main>
      </div>
    </div>
  );
}
