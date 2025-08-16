'use client'
import { motion } from "framer-motion"

interface FadeInProps {
    children: React.ReactNode
    delay?: number
    duration?: number
    direction?: 'up' | 'down' | 'left' | 'right'
    className?: string
}

const FadeIn = ({
    children,
    delay = 0.1,
    duration = 0.3,
    direction = 'up',
    className = ''
}: FadeInProps) => {
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up':
                return { y: 10 }
            case 'down':
                return { y: -10 }
            case 'left':
                return { x: 10 }
            case 'right':
                return { x: -10 }
            default:
                return { y: 10 }
        }
    }

    return (
        <motion.div
            initial={{
                opacity: 0,
                ...getDirectionOffset()
            }}
            animate={{
                opacity: 1,
                x: 0,
                y: 0
            }}
            transition={{
                duration,
                ease: "easeInOut",
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default FadeIn