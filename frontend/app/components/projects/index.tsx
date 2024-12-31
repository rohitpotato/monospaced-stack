import { IProject } from "@/app/types";
import SectionHeader from "../SectionHeader";
import Project from "../Project";

type IProps = {
  projects: IProject[];
};

const PersonalProjects = (props: IProps) => {
  const { projects } = props;
  return (
    <>
      <SectionHeader
        section={{
          title: "What have i built",
        }}
      />
      <div className="grid md:grid-cols-4 grid-rows-1 gap-5">
        {projects.map((project) => {
          return <Project key={project.title} {...project} />;
        })}
      </div>
    </>
  );
};

export default PersonalProjects;
