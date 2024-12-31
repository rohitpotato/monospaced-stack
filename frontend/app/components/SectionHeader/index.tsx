import { ComponentProps } from "react";
import Text from "../Text";

export type ISectionHeader = {
  title: string;
  url?: string;
};

type IProps = {
  section: ISectionHeader;
} & ComponentProps<"div">;

const SectionHeader = (props: IProps) => {
  const { section, ...rest } = props;
  const { title } = section;
  return (
    <Text
      as="h2"
      className="after:contents-[''] after:w-full after:h-[1px] after:bg-gray-800 after:block after:mt-2.5 after:mb-5"
      {...rest}
    >
      {title}
    </Text>
  );
};

export default SectionHeader;
