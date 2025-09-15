import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../app/__new/theme';

interface LoadingBarProps {
  progress: number;
}

const LoadingBar: React.FC<LoadingBarProps> = ({ progress }) => {
  return (
    <div className={`w-full h-4 bg-black border border-green-500 mt-1`}>
      <motion.div
        className={`h-full bg-green-500`}
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.05, ease: "linear" }}
      />
    </div>
  );
};

export default LoadingBar;
