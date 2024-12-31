import { IProject } from "@/app/types";
import MarkdownRenderer from "@/app/components/markdown-renderer";

const Project = (props: IProject) => {
  return (
    <div>
      {/* Name */}

      <div>
        <MarkdownRenderer markdown={props.title} />
      </div>

      {/* Duration */}

      {/* <div className="mb-[5px] flex items-center gap-1">
        <Text>{props.startDate}</Text>
        <Text as="span">-</Text>
        <Text>{props.endDate}</Text>
      </div> */}

      <div>
        {/* Org description */}

        <div className="mb-5">
          <MarkdownRenderer markdown={props.description} />
        </div>
      </div>
    </div>
  );
};

export default Project;
