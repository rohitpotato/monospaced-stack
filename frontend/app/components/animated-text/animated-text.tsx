import React from "react";
import styles from "./animated-text.module.css";

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  className = "",
  style = {},
}) => {
  // Calculate total characters for consistent timing
  let charCount = 0;

  return (
    <span className={`${className} inline-flex flex-wrap`} style={style}>
      {text.split(" ").map((word, wordIndex, words) => {
        const wordStart = charCount;
        charCount += word.length + (wordIndex !== words.length - 1 ? 1 : 0); // Add 1 for space except last word

        return (
          <span key={wordIndex} className="inline-flex">
            {word.split("").map((char, charIndex) => (
              <span
                key={`${wordIndex}-${charIndex}`}
                className={styles.charReveal}
                style={{ animationDelay: `${(wordStart + charIndex) * 0.03}s` }}
              >
                {char}
              </span>
            ))}
            {wordIndex !== words.length - 1 && (
              <span
                className={styles.charReveal}
                style={{
                  animationDelay: `${(wordStart + word.length) * 0.03}s`,
                }}
              >
                &nbsp;
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export default AnimatedText;
