import AnimatedText from "../animated-text/animated-text";
import Logo from "@/app/_icons/logo";
import styles from "./page-title.module.css";

const PageTitle = ({ title }: { title: string }) => {
  return (
    <div className={styles.container}>
      <Logo size={clamp(60, 84)} className="flex-shrink-0" />
      <div>
        <h1 className={styles.title}>
          <AnimatedText text={title} />
        </h1>
        <p className={styles.subtitle}>
          Notes about web dev, infrastructure, and some other stuff.
        </p>
      </div>
    </div>
  );
};

// Helper function to calculate clamp values
function clamp(min: number, max: number): number {
  const preferredValue = `${(max - min) * 0.5 + min}`;
  return Math.min(Math.max(min, parseFloat(preferredValue)), max);
}

export default PageTitle;
