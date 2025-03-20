import { useEffect } from 'react';

const TouchHandler = () => {
  useEffect(() => {
    // Prevent pinch zoom on touch devices
    const preventZoom = (e) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    // Add passive: false to ensure preventDefault works
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('touchstart', preventZoom, { passive: false });

    // Clean up event listeners
    return () => {
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('touchstart', preventZoom);
    };
  }, []);

  // This component doesn't render anything
  return null;
};

export default TouchHandler; 