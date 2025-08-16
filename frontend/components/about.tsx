import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "./markdown/mapping"
import { getAbout } from "@/lib/posts"

const About = async () => {
    const about = await getAbout()

    return <div className="prose prose-invert prose-slate max-w-none">
        <MDXRemote source={about} components={mdxComponents} />
    </div>
}

export default About;