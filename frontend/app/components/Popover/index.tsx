"use client";
import { cn } from "@/app/_utils/cn";
import {
  ComponentPropsWithoutRef,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type IProps = {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
} & ComponentPropsWithoutRef<"div">;

const DEFAULT_Z_INDEX = 1000;

const PopOver = (props: IProps) => {
  const { open, onClose, title, className, children, ...rest } = props;
  const [isOpen, setIsOpen] = useState(open);
  const [zIndex, setZIndex] = useState(DEFAULT_Z_INDEX);
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  });

  const getLastComputedZIndex = () => {
    let max = DEFAULT_Z_INDEX;
    const allPopover = document.querySelectorAll("[data-component=popover]");
    allPopover.forEach((popover) => {
      const current = Number(getComputedStyle(popover).zIndex) || 0;
      if (current === 0) {
        max = 1000;
      }
      if (current > max) {
        max = current;
      }
    });
    return max + 1;
  };

  useEffect(() => {
    setIsOpen(open);
    setZIndex(getLastComputedZIndex());
  }, [open]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        onCloseRef?.current?.();
      }
    });
  }, []);

  return (
    <div
      data-component="popover"
      className={cn(
        "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 fixed md:w-auto w-full",
        isOpen && "visible pointer-events-auto",
        !isOpen && "invisible pointer-events-none",
        className
      )}
      style={{
        zIndex: zIndex,
      }}
      role="dialog"
      aria-modal={false}
      {...rest}
    >
      <div
        className={cn(
          "border border-black clip p-0 relative shadow-modal w-full md:w-[50vmin] md:max-w-[560px] md:min-w-[320px] print:hidden",
          !isOpen && "scale-0 blur-[10px]",
          isOpen &&
            "duration-200 scale-100 transition-[transform,color] blur-none bg-white"
        )}
      >
        <div
          className={cn(
            "delay-200 ease-in opacity-0",
            isOpen && "opacity-100 duration-200 transition-opacity"
          )}
        >
          {/* header */}
          <div className="flex justify-between bg-black p-2  title-bar items-center">
            <span className="text-[11px] text-white">{title}</span>
            <button
              className="text-white"
              aria-label="close"
              onClick={() => {
                setIsOpen(false);
                onClose?.();
              }}
            >
              x
            </button>
          </div>
          {/* content */}
          <div className="bg-white content">
            <div
              className="relative w-full max-w-full animate-show-media flex items-center justify-center"
              style={{
                aspectRatio: "1120 / 1120",
              }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopOver;
