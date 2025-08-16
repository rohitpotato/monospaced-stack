'use client'
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"

interface PageTransitionProps {
    children: React.ReactNode
}

const PageTransition = ({ children }: PageTransitionProps) => {
    const pathname = usePathname()
    return (
        <motion.div
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
                duration: 0.2,
                ease: "easeInOut"
            }}
        >
            {children}
        </motion.div>
    )
}

export default PageTransition

