import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

/**
 * CustomCursor Component - Quiet Intelligence Edition
 * A refined, non-intrusive cursor follower that preserves the native cursor
 * to avoid lag while adding a sophisticated brand touch.
 */
export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Motion values for instant tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Very reactive spring for the follower ring
  const springConfig = { damping: 40, stiffness: 500, mass: 0.5 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsActive(true);
    const handleMouseUp = () => setIsActive(false);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('[role="button"]') ||
        window.getComputedStyle(target).cursor === 'pointer';
      
      setIsHovering(isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // We NO LONGER hide the default cursor to avoid the "laggy" feeling
    // and ensure perfect accessibility/usability.
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Disable on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden">
      {/* Follower Aura - Sophisticated trailing ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovering ? 56 : 32,
          height: isHovering ? 56 : 32,
          borderColor: isHovering ? 'rgba(45, 46, 79, 0.4)' : 'rgba(45, 46, 79, 0.1)',
          backgroundColor: isHovering ? 'rgba(45, 46, 79, 0.04)' : 'transparent',
          scale: isActive ? 0.9 : 1
        }}
        transition={{
          width: { duration: 0.2, ease: "easeOut" },
          height: { duration: 0.2, ease: "easeOut" },
          borderColor: { duration: 0.2 },
          backgroundColor: { duration: 0.2 }
        }}
        className="absolute border-[1px] rounded-full"
      />

      {/* Center Dot - Very subtle indicator */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isActive ? 0.8 : isHovering ? 0 : 0.5,
          opacity: isHovering ? 0 : 1,
          backgroundColor: '#2D2E4F'
        }}
        className="absolute w-2 h-2 rounded-full z-10"
      />
    </div>
  );
}
