import React, { useEffect, useState } from 'react';
import videoSrc from '../assets/Centillion logo.mp4';

interface SplashVideoProps {
  onFinish: () => void;
}

export const SplashVideo: React.FC<SplashVideoProps> = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Disable scrolling when splash is visible
    document.body.style.overflow = 'hidden';
    
    // Safety timeout: if video doesn't end for some reason, hide splash after 10 seconds
    const safetyTimeout = setTimeout(() => {
      handleVideoEnd();
    }, 10000);

    return () => {
      // Re-enable scrolling when splash is hidden
      document.body.style.overflow = 'auto';
      clearTimeout(safetyTimeout);
    };
  }, []);

  const handleVideoEnd = () => {
    setFadeOut(true);
    setTimeout(() => {
      onFinish();
    }, 800); // Duration of fade-out animation
  };

  const handleCanPlay = () => {
    setVideoReady(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.22; // Play the video faster
      videoRef.current.play().catch(e => console.error("Autoplay failed:", e));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      // Trigger end 0.5 seconds before the actual video ends
      if (duration > 0 && currentTime >= duration - 3.2 && !fadeOut) {
        handleVideoEnd();
      }
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#000',
        zIndex: 999999,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: (fadeOut || !videoReady) ? 0 : 1,
        transition: 'opacity 0.6s ease-in-out',
        pointerEvents: fadeOut ? 'none' : 'all',
        cursor: 'pointer',
      }}
      onClick={handleVideoEnd} // Allow skip on click
    >
      <video
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        preload="auto"
        onCanPlayThrough={handleCanPlay}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnd}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};
