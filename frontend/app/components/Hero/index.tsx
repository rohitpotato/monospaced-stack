import { ITopUpdates } from "@/app/types";
import Text from "../Text";
import SectionHeader from "../SectionHeader";

export type IHeroProps = {
  updates: ITopUpdates[];
};

const Hero = (props: IHeroProps) => {
  const { updates } = props;
  return (
    <div>
      <SectionHeader
        section={{
          title: "Top Updates",
        }}
      />
      <ul className="list-disc ml-5">
        {updates.map((update) => {
          return (
            <Text className="mt-[6px]" as="li" key={update.title}>
              {update.title}
            </Text>
          );
        })}
      </ul>
    </div>
  );
};
export default Hero;
