import React from 'react';
import { motion, Variants } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  stagger?: number;
  delay?: number;
  className?: string;
}

const containerVariants: Variants = {
  hidden: {},
  visible: (stagger: number = 0.1) => ({
    transition: {
      staggerChildren: stagger,
    },
  }),
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

const FadeIn: React.FC<FadeInProps> = ({ children, stagger = 0.1, delay = 0, className }) => {
  const motionChildren = React.Children.map(children, (child) => (
    <motion.div variants={itemVariants}>{child}</motion.div>
  ));

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={stagger}
      style={{ transitionDelay: `${delay}s`}}
    >
      {motionChildren}
    </motion.div>
  );
};

export default FadeIn;