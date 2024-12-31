import { IExperience } from "@/app/types";
import Text from "../Text";
import MarkdownRenderer from "@/app/components/markdown-renderer";
import LinkText from "@/app/components/LinkText";
import Image from "next/image";

const Experience = (props: IExperience) => {
  return (
    <div>
      <div className="flex flex-row items-center gap-4 mb-[5px]">
        {/* Logo */}
        <div>
          <Image
            src={props.organisationLogo}
            alt={props.organisationName}
            width={50}
            height={50}
          />
        </div>

        {/* Name */}

        <div>
          <LinkText target="_blank" href={props.organisationUrl}>
            {props.organisationName}
          </LinkText>
        </div>
      </div>

      {/* Duration */}

      <div className="mb-[5px] flex items-center gap-1">
        <Text>{props.startDate}</Text>
        <Text as="span">-</Text>
        {props.isCurrent ? <Text>Present</Text> : <Text>{props.endDate}</Text>}
      </div>

      <div>
        {/* Org description */}

        <div className="mb-5">
          <MarkdownRenderer markdown={props.description} />
        </div>

        {/* Achievements */}
        <ul className="list-disc list-inside space-y-[6px]">
          {props.achievements.map((achievement) => (
            <li key={achievement.title}>
              <MarkdownRenderer markdown={achievement.title} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
