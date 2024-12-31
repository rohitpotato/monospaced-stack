import { IBlog } from "@/app/types";
import SectionHeader from "../SectionHeader";
import Blog from "../Blog";

type IProps = {
  blogs: IBlog[];
};

const Blogs = (props: IProps) => {
  const { blogs } = props;
  return (
    <>
      <SectionHeader
        section={{
          title: "What have i written",
        }}
      />
      <div className="grid md:grid-cols-4 grid-rows-1 gap-5">
        {blogs.map((blog) => {
          return <Blog key={blog.title} {...blog} />;
        })}
      </div>
    </>
  );
};

export default Blogs;
