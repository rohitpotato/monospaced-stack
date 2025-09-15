'use client'

import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

const AudioEqualizer: React.FC = () => {
  return (
    <div className="flex items-end h-16 space-x-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={cn('w-2', 'bg-green-500')}
          initial={{ height: '10%' }}
          animate={{
            height: ['10%', '100%', '10%'],
          }}
          transition={{
            duration: 1 + i * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

export default AudioEqualizer
