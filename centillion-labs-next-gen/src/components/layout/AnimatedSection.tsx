import React from 'react';
import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
    children: ReactNode;
    id?: string;
    delay?: number;
    className?: string;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({
    children,
    id,
    delay = 0,
    className = ''
}) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
        >
            {children}
        </motion.section>
    );
};

export const AnimatedItem: React.FC<{ children: ReactNode, delay?: number, className?: string }> = ({
    children,
    delay = 0,
    className = ''
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay,
                ease: [0.22, 1, 0.36, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};
