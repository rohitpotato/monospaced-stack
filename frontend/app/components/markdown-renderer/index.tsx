import ImageWrapper from "@/app/components/Image";
import Text from "@/app/components/Text";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import LinkText from "../LinkText";

const MarkdownRenderer = ({
  markdown,
}: {
  markdown: string | null | undefined;
}) => {
  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      components={{
        em: (props) => {
          return <Text className="italic">{props.children}</Text>;
        },
        p: (props) => {
          return <Text as="p">{props.children}</Text>;
        },
        li: (props) => {
          return props.children;
        },
        a: (props) => {
          return <LinkText as="a" {...props} />;
        },
        img: (props) => {
          return (
            <ImageWrapper
              openPopupOnClick={true}
              imageProps={{
                className: "absolute left-0 top-0 object-cover size-full block",
                fill: "layout",
                sizes: `(min-width: 1680px) calc((1640px - 7.1vw) / 5),
              (min-width: 1440px) 18.02vw,
              (min-width: 940px) 21.96vw,
              (min-width: 823px) calc((94vw - 10.625rem) * 0.4),
              (min-width: 768px) calc(95.5vw - 10.625rem) * 0.6,
              98vw`,
                style: {
                  objectFit: "contain",
                  width: "100%",
                  height: "100%",
                },
                ...props,
              }}
              wrapperProps={{
                className: "max-w-full w-full relative cursor-pointer",
                style: {
                  aspectRatio: "4 / 2",
                },
              }}
            >
              {props.children}
            </ImageWrapper>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default MarkdownRenderer;
