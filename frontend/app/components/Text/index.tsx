import { cn } from "@/app/_utils/cn";
import { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

export interface ITextProps<T extends ElementType> {
  as?: T;
  children: ReactNode;
}

function Text<T extends ElementType = "button">({
  as,
  ...props
}: ITextProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ITextProps<T>>) {
  const { className, ...rest } = props;
  const Component = as || "p";

  return (
    <Component
      className={cn(
        "text-[#000000] dark:text-white !tracking-[-.03em] font-normal font-mono leading-[18.2px] text-[13px]",
        className
      )}
      {...rest}
    />
  );
}

export default Text;
