import Text from "@/app/components/Text";
import { ComponentPropsWithoutRef } from "react";

type IProps = ComponentPropsWithoutRef<"a">;

const LinkText = (props: IProps) => {
  const { children, ...rest } = props;
  return (
    <Text
      as="a"
      className="text-link cursor-pointer underline hover:no-underline"
      {...rest}
    >
      {children}
    </Text>
  );
};

export default LinkText;
