'use client'

import { motion } from "motion/react";

interface FadeInViewProps {
    children: React.ReactNode;
}

const FadeInView: React.FC<FadeInViewProps> = ({ children }) => {
    return <motion.div initial={{
        opacity: 0,
        y: 50
    }}
        whileInView={{
            opacity: 1,
            y: 0
        }}
        transition={{
            duration: 0.7,
            ease: "easeInOut"
        }}
    >
        {children}
    </motion.div>
}

export default FadeInView;