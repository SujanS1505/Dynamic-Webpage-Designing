import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SecureAIPlayground } from './SecureAIPlayground';

interface Props { onClose: () => void }

export function SecureAIPlaygroundPage({ onClose }: Readonly<Props>) {
    /* ── keyboard + scroll lock ─────────────────────────────── */
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = 'hidden';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    return (
        <AnimatePresence>
            <motion.div
                key="sai-overlay"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.2 }}
                style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
            >
                <SecureAIPlayground onClose={onClose} />
            </motion.div>
        </AnimatePresence>
    );
}
