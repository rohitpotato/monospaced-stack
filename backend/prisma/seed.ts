import db from '../src/database'

async function main() {
    const user = await db.user.create({
        data: {
            name: 'Rohit Kashyap',
            bio: 'A software engineer currently working at Zepto',
            email: 'rohit.212@icloud.com',
            phone: '+91 9411861661',
            profile_picture: ['https://avatars.githubusercontent.com/u/47269217?v=4'],
            playlist_url: 'https://open.spotify.com/playlist/3P5GZ53gZN40M0R0OuvIXj?si=d9ff1ec5c70246f1',
            twitter_url: 'https://twitter.com/rohitpotato',
            github_url: 'https://github.com.rohitpotato',
            linkedin_url: 'https://www.linkedin.com/in/rohit-kashyap-a33a4716a/',
        }
    })

    const experience = await db.experience.createMany({
        data: [{
            is_current: true,
            description: '',
            organisation_name: "Zepto",
            designation: 'Software Engineer 2',
            organisation_logo: 'https://avatars.githubusercontent.com/u/47269217?v=4',
            start_date: new Date('2024-07-01'),
            userId: user.id,
            achievements: [
                'Revamped the entire PDP(product description page) single - handedly, achieving lighthouse scores of 94 consistently.',
                'Significantly improved the performance of zeptonow.com by increasing the lighthouse score by almost 50 %',
                'Led the effort to boost retention by applying strategies such as service worker caching for fonts, eliminating layout shifts and applying relevant SEO tags to improve core web vitals.',
                'Moved multiple pages to React Server Components(RSC), to leverage latest react features to improve initial load times and streaming components as necessary, cutting down load times by 40 %.',
                'Implemented CSRF protection from scratch for sensitive routes in the edge runtime by writing polyfills for token generation and verification.',
            ]
        }, {
            is_current: false,
            description: '',
            designation: 'Software Engineer 3',
            organisation_name: "Plum Benefits",
            organisation_logo: 'https://avatars.githubusercontent.com/u/47269217?v=4',
            start_date: new Date('2022-01-17'),
            end_date: new Date('2024-06-01'),
            userId: user.id,
            achievements: [
                'Developed a Frontend logging library compatible with every framework to format, organise, batch and send error, info and debug logs to a logging service to monitor and add relevant alerts for all projects. This is being used across 13 different frontend projects and decreased error rates down to almost 0%',
                'Led the frontend development of Plum’s ”Retail Term Life”, enhancing user engagement through an intuitive UI. Utilized Framer Motion and React Server Components (RSCs) for a seamless, high-performance experience with sophisticated animations, significantly improving user interaction metrics',
                'Designed and launched an in-house In-App Support Centre, eliminating the need for Zendesk and saving the organization over Rs 60,000 monthly. Reduced support queries by 55%, streamlining customer service operations and enhancing user satisfaction.',
                'Developed an In-App Health Assessment tool, boosting telehealth consultations by 18% by empowering users to evaluate their health and promoting engagement with relevant health professionals.',
                'Created and implemented ’Super Top-Up’, a principal retail product for Plum, enabling users to enhance their insurance coverage up to 1 crore using a custom component library and NodeJS in a domain-driven development approach.',
                'Built a Revenue-Boosting Campaign Service, autonomously creating a system that increased revenue by 75% for Super Top-up and telehealth services through strategic user engagement.',
                'Developed Type-Safe Headless UI Component Libraries, enhancing UI consistency across 5 public-facing projects with libraries built on Tailwind CSS and class variance authority, focusing on accessibility and extendable API.',
                'Improved the Claims Experience, comprehensively overhauling the process and lifting the Net Promoter Score (NPS) from 45 to 60, significantly improving customer satisfaction and loyalty.',
                'Contributed to the frontend development of ”Policy GPT”, an AI-driven tool by Plum, attracting over 10,000 visits since its beta launch, designed to clarify insurance policies and coverages for users.',
            ]
        },
        {
            is_current: false,
            description: '',
            organisation_name: "Falabella",
            designation: 'Software Engineer',
            organisation_logo: 'https://avatars.githubusercontent.com/u/47269217?v=4',
            start_date: new Date('2020-10-20'),
            end_date: new Date('2022-01-16'),
            userId: user.id,
            achievements: [
                'Engineered Smart Search for the Sodimac web application, significantly enhancing user engagement over 1 million users through advanced search functionalities.',
                'Architected and deployed multiple microservices to refine the system architecture, achieving a 50% improvement in critical performance metrics.',
                'Developed a reusable and scalable UI component library, adopted across 7 Falabella products to ensure a consistent design language and streamline UI development.',
                'Optimized development workflows by upgrading Webpack configurations and increasing test coverage to 90 per cent, markedly enhancing code quality and developer productivity across projects.',
            ]
        },
        {
            is_current: false,
            description: '',
            organisation_name: "2gethr",
            designation: 'Software Engineer 3',
            organisation_logo: 'https://avatars.githubusercontent.com/u/47269217?v=4',
            start_date: new Date('2019-06-01'),
            end_date: new Date('2020-10-01'),
            userId: user.id,
            achievements: [
                'Developed an Administrative Portal using React, Redux-Saga, Tailwind CSS, and Styled Components.',
                'Implemented Multi-tenancy for a SaaS Model of our application.',
                'Responsible for optimizing and migrating existing APIs to a 3-layer architecture for increased performance and better error handling.',
                'Developed building real-time chat for the 2gethr Member Application for over 600 members.',
                'Responsible for building the Service Request module for the 2gethr Member App.',
            ]

        }]
    })

    const projects = await db.projects.createMany({
        data: [
            {
                title: 'Svelte Command Palette',
                description: [
                    'Developed a command palette library for Svelte applications which was mentioned on the official Svelte blog.',
                    'The library has a very extensible API that allows it to be customised and used across any use case.',
                    'The project has over 150+ stars on GitHub and is currently used in various projects.',
                    'The project is built using Sveltekit and also has an interactive documentation website.'
                ],
                userId: user.id,
                url: 'abcd',
            },
            {
                title: 'Svelte Toggle',
                description: [
                    'Created a svelte toggle library for svelte apps.',
                    'This project was mentioned on the official Svelte blog.',
                    'The project has an interactive documentation site built with Sveltekit and tailwind CSS',
                    'The project is built using Sveltekit and also has an interactive documentation website.'
                ],
                userId: user.id,
                url: 'abcd',
            },
            {
                title: 'Spotify Unbiased Shuffle',
                description: [
                    'Provides truly random and unbiased shuffling algorithm overriding Spotify’s default algorithm.',
                    'Users can combine multiple playlists with a true shuffle to provide a better listening experience.',
                    'Currently has over 1000 monthly active users all over the world.',
                ],
                userId: user.id,
                url: 'abcd',
            }
        ]
    })

    const blogs = await db.blogs.createMany({
        data: [
            {
                title: 'Build your own Zustand!',
                url: 'https://rohitpotato.hashnode.dev/build-your-own-zustand',
                userId: user.id,
                description: ["Brag at parties by building your own state management library for React! 🚀🚀. You're here, you have explored the React ecosystem, taught yourself about state management, built a few cool projects and now you're here, thinking about redux when you should be sleeping."],
            },
            {
                title: "Implement Dark Mode with Zustand and Tailwind CSS in React",
                url: 'https://drive.google.com/file/d/16Foh2tUAZlIykq61jvKSlpJooSXz-d2B/view',
                description: ['The Dark Side Of The Force Is A Pathway To Many Abilities Some Consider To Be Unnatural — Darth Plagueis. Today, I’ll show you how to create a dark mode react application with zustand (german) and Tailwind CSS. Let’s begin!'],
                userId: user.id,
            },
            {
                title: 'How React Implements useState and useEffect internally - A simplified overview',
                url: 'https://rohitpotato.hashnode.dev/how-react-implements-usestate-and-useeffect-internally-a-simplified-overview-1',
                description: ["Ever wondered how React implements hooks under the hood? React is an open-source library but navigating through thousands of lines of codes can be quite intimidating. We are going to implement probably the most common hooks you'll use in a typical application: useState and useEffect."],
                userId: user.id,
            }
        ]
    })
}

main()
    .then(async () => {
        await db.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await db.$disconnect()
        process.exit(1)
    })