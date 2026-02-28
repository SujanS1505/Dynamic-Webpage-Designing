import { Header } from './Header';
import { HypercubeScene } from '../canvas/HypercubeScene';

interface LayoutProps {
    children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div style={{ position: 'relative', minHeight: '100vh', width: '100%' }}>
            <Header />

            {/* 3D Background Canvas */}
            <div
                id="canvas-container"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 'var(--z-canvas)',
                    pointerEvents: 'none'
                }}
            >
                <HypercubeScene />
            </div>

            <main
                style={{
                    position: 'relative',
                    zIndex: 'var(--z-content)',
                    width: '100%',
                    maxWidth: '1440px',
                    margin: '0 auto',
                    padding: '0 2rem'
                }}
            >
                {children}
            </main>

            <footer style={{
                padding: '4rem 2rem',
                borderTop: '1px solid var(--border-color)',
                marginTop: '6rem',
                textAlign: 'center',
                color: 'var(--text-muted)'
            }}>
                <p className="mono-text" style={{ fontSize: '0.8rem' }}>© {new Date().getFullYear()} CENTILLION LABS. BUILT WITH INTELLIGENCE.</p>
            </footer>
        </div>
    );
};
