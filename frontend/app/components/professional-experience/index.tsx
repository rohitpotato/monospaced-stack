import { IExperience } from "@/app/types";
import SectionHeader from "../SectionHeader";
import Experience from "../experience";

type IProps = {
  experiences: IExperience[];
};

const ProfessionalExperience = (props: IProps) => {
  const { experiences } = props;
  return (
    <>
      <SectionHeader
        section={{
          title: "What have i done",
        }}
      />
      <div className="grid sm:grid-cols-4 grid-rows-1 gap-5">
        {experiences.map((exp) => {
          return <Experience key={exp.organisationName} {...exp} />;
        })}
      </div>
    </>
  );
};

export default ProfessionalExperience;
