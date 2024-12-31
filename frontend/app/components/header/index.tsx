"use client";
import clsx from "clsx";
import { ComponentProps } from "react";
import Text from "../Text";

type IProps = ComponentProps<"header">;

const Header = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <header
      className={clsx("border-b dark:bg-black border-gray-100", className)}
      {...rest}
    >
      <nav className="max-w-[105rem] items-center w-full flex px-5 py-[2.5] lg:px-3 lg:py-2 h-[3.75rem] lg:h-[3.125rem] progress-bar">
        <Text>M O N O S P A C E D</Text>
        <div className="ml-auto flex gap-4">
          {/* {currentTheme === "light" ? (
            <DarkModeIcon
              onClick={() => {
                setCurrentTheme("dark");
              }}
              color={currentTheme === "dark" ? "white" : "black"}
            />
          ) : (
            <LightModeIcon
              onClick={() => {
                setCurrentTheme("light");
              }}
              color={currentTheme === "dark" ? "white" : "black"}
            />
          )} */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
