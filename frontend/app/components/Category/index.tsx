"use client";
import LinkText from "@/app/components/LinkText";
import { ReactNode, useEffect, useRef } from "react";

export type IProps = {
  href: string;
  children: ReactNode;
  title: string;
};

const Category = (props: IProps) => {
  const { children, href, title } = props;
  const audioRef = useRef(typeof window !== "undefined" ? new Audio() : null);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.remove();
      }
    };
  }, []);

  return (
    <LinkText
      onMouseOver={() => {
        if (title === "Spotify") {
          audioRef.current = new Audio("/media/rick-roll.mp3");
          audioRef.current.autoplay = true;
          audioRef.current.play();
        }
      }}
      onMouseLeave={() => {
        if (audioRef.current && title === "Spotify") {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
      }}
      data-title={title}
      href={href}
      target="_blank"
    >
      [{children}]
    </LinkText>
  );
};

export default Category;
