"use client";

import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
} from "react";
import useLocalStorage from "../_hooks/useLocalStorage";

type ITheme = "dark" | "light";

const ThemeContext = createContext<{
  currentTheme: ITheme;
  setCurrentTheme: React.Dispatch<SetStateAction<ITheme>>;
}>({
  currentTheme: "dark",
  setCurrentTheme: () => {},
});

interface useTheme {
  currentTheme: ITheme;
  setCurrentTheme: React.Dispatch<SetStateAction<ITheme>>;
}

const useTheme = (): useTheme => {
  const themeProps = useContext(ThemeContext);
  if (!themeProps) {
    throw new Error("Cannot find context!");
  }
  const { currentTheme, setCurrentTheme } = themeProps;
  return { currentTheme, setCurrentTheme };
};

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useLocalStorage<ITheme>(
    "theme",
    "dark"
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.classList.toggle(
        "dark",
        currentTheme === "dark" ? true : false
      );
    }
    setCurrentTheme(currentTheme);
  }, [currentTheme, setCurrentTheme]);

  const value = useMemo(
    () => ({
      currentTheme,
      setCurrentTheme,
    }),
    [currentTheme, setCurrentTheme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export { useTheme, ThemeProvider };
