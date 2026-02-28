import React, { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
    const [isLight, setIsLight] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme === 'light') {
            setIsLight(true);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleTheme = () => {
        setIsLight(!isLight);
        if (!isLight) {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'dark');
        }
    };

    return (
        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            style={{
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.3s',
                position: 'relative',
                zIndex: 100
            }}
            className="hover-border-accent"
            aria-label="Toggle Theme"
        >
            {isLight ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
    );
};
