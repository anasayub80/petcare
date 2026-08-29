import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const reducedMotion = useReducedMotion();
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'button' | 'view' | 'ask' | 'book' | 'text'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring physics for fluid Awwwards-style movement
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Trailing ring with slightly looser physics
  const trailingConfig = { damping: 24, stiffness: 220, mass: 0.8 };
  const trailingX = useSpring(mouseX, trailingConfig);
  const trailingY = useSpring(mouseY, trailingConfig);

  useEffect(() => {
    // Detect if device supports hover and has fine pointer (desktop)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const updateTouchStatus = () => setIsTouchDevice(!mediaQuery.matches);
    updateTouchStatus();
    mediaQuery.addEventListener('change', updateTouchStatus);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check element under cursor for special cursor triggers
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Look up closest interactive element or custom cursor tag
      const cursorTarget = target.closest('[data-cursor], [data-cursor-text], a, button, input, select, textarea, [role="button"]');

      if (cursorTarget) {
        const explicitText = cursorTarget.getAttribute('data-cursor-text');
        const explicitVariant = cursorTarget.getAttribute('data-cursor');

        if (explicitText) {
          setCursorText(explicitText);
          setCursorVariant('view');
        } else if (explicitVariant) {
          setCursorVariant(explicitVariant as any);
          if (explicitVariant === 'view') setCursorText('View →');
          else if (explicitVariant === 'book') setCursorText('Book');
          else if (explicitVariant === 'ask') setCursorText('Ask ✨');
          else setCursorText('');
        } else {
          // Inferred from element type
          const tagName = cursorTarget.tagName.toLowerCase();
          const isButton = tagName === 'button' || cursorTarget.getAttribute('role') === 'button';
          const textContent = cursorTarget.textContent?.toLowerCase() || '';

          if (textContent.includes('book appointment') || textContent.includes('book care') || textContent.includes('book now')) {
            setCursorVariant('book');
            setCursorText('Book');
          } else if (textContent.includes('ai') || textContent.includes('ask') || textContent.includes('assistant')) {
            setCursorVariant('ask');
            setCursorText('Ask ✨');
          } else if (isButton || tagName === 'a') {
            setCursorVariant('hover');
            setCursorText('');
          } else {
            setCursorVariant('text');
            setCursorText('');
          }
        }
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      mediaQuery.removeEventListener('change', updateTouchStatus);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  // Don't render cursor on mobile/touch devices or if reduced motion is requested
  if (isTouchDevice || reducedMotion) {
    return null;
  }

  const getVariantStyles = () => {
    switch (cursorVariant) {
      case 'book':
      case 'ask':
      case 'view':
        return {
          width: cursorText ? Math.max(68, cursorText.length * 9.5) : 56,
          height: 38,
          borderRadius: 20,
          backgroundColor: '#221612',
          border: '1.5px solid rgba(217, 119, 70, 0.6)',
          scale: 1,
          opacity: 1,
        };
      case 'hover':
        return {
          width: 44,
          height: 44,
          borderRadius: 22,
          backgroundColor: 'rgba(217, 119, 70, 0.18)',
          border: '1.5px solid rgba(217, 119, 70, 0.8)',
          scale: 1.15,
          opacity: 1,
        };
      case 'text':
        return {
          width: 6,
          height: 22,
          borderRadius: 3,
          backgroundColor: '#D97746',
          border: 'none',
          scale: 1,
          opacity: 0.85,
        };
      default:
        return {
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: '#D97746',
          border: 'none',
          scale: 1,
          opacity: 0.9,
        };
    }
  };

  const currentStyles = getVariantStyles();

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden select-none">
      {/* Outer subtle trailing aura for default / hover states */}
      {cursorVariant === 'default' && (
        <motion.div
          className="absolute -top-4 -left-4 w-8 h-8 rounded-full border border-terracotta-400/40 pointer-events-none"
          style={{
            x: trailingX,
            y: trailingY,
            opacity: isVisible ? 0.6 : 0,
            transition: 'opacity 0.2s',
          }}
        />
      )}

      {/* Main interactive cursor bubble */}
      <motion.div
        className="absolute flex items-center justify-center pointer-events-none shadow-warm-md text-white font-sans text-[11px] font-bold tracking-wide"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
        animate={currentStyles}
        transition={{
          type: 'spring',
          damping: 26,
          stiffness: 380,
          mass: 0.4,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="text-cream-50 px-2 whitespace-nowrap text-[11px] font-extrabold flex items-center gap-1"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </div>
  );
};
