import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export interface AnimatedCounterProps {
  value: string; // e.g. "5,000+", "99.8%", "15+", "4.9"
  duration?: number; // duration in seconds
  className?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.8,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState('0');

  // Parse numeric part and formatting
  // e.g. "5,000+" -> numeric: 5000, prefix: "", suffix: "+", hasComma: true, decimals: 0
  const match = value.match(/^([^0-9.]*)([0-9,.]+)([^0-9.]*)$/);
  const prefix = match ? match[1] : '';
  const rawNumStr = match ? match[2] : '0';
  const suffix = match ? match[3] : '';

  const hasComma = rawNumStr.includes(',');
  const isDecimal = rawNumStr.includes('.');
  const decimals = isDecimal ? rawNumStr.split('.')[1].length : 0;
  const targetNumber = parseFloat(rawNumStr.replace(/,/g, '')) || 0;

  useEffect(() => {
    if (reducedMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

      // Ease out expo formula for premium natural feel
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNumber = easeProgress * targetNumber;

      let formattedNum = currentNumber.toFixed(decimals);
      if (hasComma) {
        const parts = formattedNum.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        formattedNum = parts.join('.');
      }

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value); // ensure final exact string match
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, targetNumber, duration, value, prefix, suffix, decimals, hasComma, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
};
