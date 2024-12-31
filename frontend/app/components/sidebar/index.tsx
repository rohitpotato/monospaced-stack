import { ComponentProps } from "react";
import Text from "../Text";
import ProfilePicture from "../profile-picture";
import { cn } from "@/app/_utils/cn";
import Categories, { ICategory } from "../Categories";
import Image from "next/image";

type IProps = ComponentProps<"aside">;

const categories: ICategory[] = [
  {
    title: "Phone",
    href: "tel:+91 9411861661",
  },
  {
    title: "Github",
    href: "https://github.com/rohitpotato",
  },
  {
    title: "Twitter",
    href: "https://twitter.com/rohitpotato",
  },
  {
    title: "Instagram",
    href: "https://instagram.com/rohitpotato",
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com/in/rohitpotato",
  },
  {
    title: "Email",
    href: "mailto:",
  },
  {
    title: "Spotify",
    href: "https://open.spotify.com/user/rohitpotato",
  },
];

const Sidebar = (props: IProps) => {
  const { className, ...rest } = props;
  return (
    <aside className={cn("", className)} {...rest}>
      <Image
        src={"/dp.png"}
        className="rounded-md"
        alt="site-avatar"
        width={36}
        height={36}
      />
      <Text as="h1" className="text-2xl leading-[29px] mt-5">
        The
      </Text>
      <Text as="h1" className="text-2xl leading-[29px]">
        Monospaced
      </Text>
      <Text as="h1" className="text-2xl leading-[29px] mb-5">
        Version
      </Text>
      <Text className="mb-5">Because i love the font monospace</Text>
      <div className="mb-5">
        <ProfilePicture />
      </div>
      <Categories categories={categories} />
    </aside>
  );
};

export default Sidebar;
