"use client";
import { cn } from "@/app/_utils/cn";
import Image, { ImageProps } from "next/image";
import { ComponentProps, ReactNode, useState } from "react";
import PopOver from "../Popover";
import Portal from "../Portal";

type IProps = {
  imageProps: ImageProps;
  wrapperProps?: ComponentProps<"div">;
  children?: ReactNode;
  openPopupOnClick?: boolean;
};

const ImageWrapper = (props: IProps) => {
  const { imageProps, openPopupOnClick, children, wrapperProps } = props;
  const { className, ...rest } = wrapperProps || {};

  const [isPopOverOpen, setIsPopOverOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        onClick={() => {
          if (openPopupOnClick) {
            setIsPopOverOpen(true);
          }
        }}
        className={cn(
          "shadow-image h-full w-full group border border-black hover:shadow-image-hover focus:shadow-image-hover group p-[5px] transition-[box-shadow,transform] transform-gpu duration-300"
        )}
      >
        <div
          className={cn(
            "relative group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-transform",
            className
          )}
          {...rest}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image {...imageProps} />
          {children}
        </div>
      </div>

      {/* Popover */}
      <Portal>
        <PopOver
          onClose={() => {
            setIsPopOverOpen(false);
          }}
          title={imageProps.alt}
          id={imageProps.alt || "popover"}
          open={isPopOverOpen}
        >
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image {...imageProps} />
        </PopOver>
      </Portal>
    </>
  );
};

export default ImageWrapper;
