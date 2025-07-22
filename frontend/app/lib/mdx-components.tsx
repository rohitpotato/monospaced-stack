import type { ComponentType } from "react";
import Bolt from "@/app/_icons/bolt";
import Stats from "@/app/_icons/stats";
import Logo from "@/app/_icons/logo";
import {
  Document,
  AnimateSphere,
  Blend,
  Browser,
  Camera,
  Css3D,
  Juice,
  News,
  Observer,
  Personalization,
  ScrollDraw,
  ScrollPercent,
  Shaders,
  Toc,
  UserUi,
  Write,
} from "@/app/components/icons";
import { IconProps } from "@/app/components/icons";

// Add all your icons here
export const mdxComponents = {
  Bolt,
  Stats,
  Logo,
  Document,
  AnimateSphere,
  Blend,
  Browser,
  Camera,
  Css3D,
  Juice,
  News,
  Observer,
  Personalization,
  ScrollDraw,
  ScrollPercent,
  Shaders,
  Toc,
  UserUi,
  Write,
} as Record<string, ComponentType<IconProps>>;
