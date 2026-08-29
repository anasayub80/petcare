import React, { useRef, useState } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight, Star, ShieldCheck, Heart } from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { PetFrame } from '../common/PetFrame';
import { MagneticButton } from '../common/MagneticButton';
import {
  PawIllustration,
  BoneIllustration,
  SparkleIllustration,
  CatYarnIllustration,
} from '../common/PetIllustrations';
import { IMAGES } from '../../data/images';
import { Link } from 'react-router-dom';

export interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const reducedMotion = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !containerRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) / (width / 2);
    const y = (clientY - (top + height / 2)) / (height / 2);
    setMouseOffset({ x: x * 8, y: y * 8 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  // Staggered word animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      {/* Soft warm ambient background blobs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-caramel-100/50 via-terracotta-50/30 to-transparent blur-3xl -z-10 rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-72 sm:w-80 h-72 sm:h-80 bg-sage-100/60 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-64 sm:w-72 h-64 sm:h-72 bg-sand-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Floating Handcrafted SVG Accents */}
      <div className="absolute top-24 left-8 lg:left-20 opacity-40 pointer-events-none hidden md:block">
        <PawIllustration size={28} color="#D97746" variant="float" />
      </div>
      <div className="absolute bottom-20 left-12 opacity-30 pointer-events-none hidden md:block">
        <BoneIllustration size={34} color="#E8963D" variant="drift" />
      </div>
      <div className="absolute top-36 right-12 lg:right-28 opacity-40 pointer-events-none hidden lg:block">
        <SparkleIllustration size={24} color="#D97746" variant="pulse" />
      </div>
      <div className="absolute bottom-16 right-1/3 opacity-30 pointer-events-none hidden md:block">
        <CatYarnIllustration size={28} color="#ADC6B7" variant="floatSlow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-start text-left z-10"
          >
            {/* Eyebrow badge */}
            <motion.div variants={wordVariants} className="inline-flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="terracotta" size="md" withPaw>
                Professional Care For Your Best Friend
              </Badge>
              <span className="font-script text-lg sm:text-xl text-terracotta-600 font-bold -rotate-2 flex items-center gap-1">
                <SparkleIllustration size={14} color="#D97746" /> AI-Powered Wellness
              </span>
            </motion.div>

            {/* Main Headline with word-by-word stagger */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] font-black text-chocolate-900 leading-[1.12] sm:leading-[1.1] tracking-tight text-balance">
              <motion.span variants={wordVariants} className="inline-block mr-2.5">
                Better
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block mr-2.5">
                Care
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block mr-2.5">
                For
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block mr-2.5">
                The
              </motion.span>
              <motion.span variants={wordVariants} className="relative inline-block text-terracotta-500 font-serif italic">
                Pets You Love.
                {/* Decorative underline swoop drawing into view */}
                <svg
                  className="absolute -bottom-1.5 sm:-bottom-2 left-0 w-full h-2.5 sm:h-3 text-caramel-400/90 -z-10"
                  viewBox="0 0 100 20"
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M0,15 Q50,0 100,15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
                  />
                </svg>
              </motion.span>
            </h1>

            {/* Supporting Copy */}
            <motion.p
              variants={wordVariants}
              className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-chocolate-700/85 leading-relaxed max-w-xl font-normal"
            >
              Professional grooming, veterinary care, and personalized pet wellness — all conveniently available through one intelligent, compassionate platform.
            </motion.p>

            {/* CTA Action Buttons with Magnetic Pull */}
            <motion.div
              variants={wordVariants}
              className="mt-7 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto"
            >
              <MagneticButton strength={0.3} maxDistance={6} className="w-full sm:w-auto">
                <Button
                  variant="terracotta"
                  size="lg"
                  onClick={onOpenBooking}
                  leftIcon={<Calendar className="w-5 h-5" />}
                  className="w-full sm:w-auto shadow-warm-md hover:shadow-warm-lg justify-center font-bold text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 transition-all"
                  data-cursor="book"
                  data-cursor-text="Book"
                >
                  Book Appointment
                </Button>
              </MagneticButton>

              <MagneticButton strength={0.25} maxDistance={5} className="w-full sm:w-auto">
                <Link to="/services" className="w-full sm:w-auto block">
                  <Button
                    variant="secondary"
                    size="lg"
                    rightIcon={<ArrowRight className="w-4 h-4 text-chocolate-600" />}
                    className="w-full justify-center text-sm sm:text-base py-3.5 sm:py-4 px-6 sm:px-8 hover:bg-cream-200/80"
                    data-cursor="view"
                    data-cursor-text="Explore"
                  >
                    Explore Services
                  </Button>
                </Link>
              </MagneticButton>
            </motion.div>

            {/* Trust Checklist Pills */}
            <motion.div
              variants={wordVariants}
              className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-cream-300/80 flex flex-wrap items-center gap-y-2.5 gap-x-5 sm:gap-x-6 text-xs sm:text-sm font-semibold text-chocolate-800"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-sage-100 text-sage-700 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Accredited Vets & Stylists</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-caramel-100 text-caramel-700 flex items-center justify-center shrink-0">
                  <Heart className="w-3.5 h-3.5 fill-caramel-700" />
                </div>
                <span>Fear-Free Certified</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span>Instant AI Health Guidance</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Editorial Visual Composition with Mouse Parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: mouseOffset.x * -0.6,
              y: mouseOffset.y * -0.6,
            }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 relative flex justify-center lg:justify-end px-2 sm:px-0"
          >
            {/* Main Arch-Framed Pet Composition */}
            <div className="relative max-w-md w-full" data-cursor="view" data-cursor-text="View →">
              {/* Decorative background outline frame */}
              <div className="absolute -top-3 -right-3 sm:-top-5 sm:-right-5 w-full h-full rounded-t-[8rem] sm:rounded-t-[10rem] rounded-b-[2.5rem] sm:rounded-b-[3rem] border-2 border-dashed border-terracotta-400/40 -z-10" />

              {/* Floating Paw Print SVG Accent */}
              <div className="absolute -top-6 -left-4 sm:-top-8 sm:-left-6 z-20 text-caramel-500/80 animate-float-slow hidden sm:block">
                <PawIllustration size={44} color="#D97746" variant="float" />
              </div>

              <PetFrame
                src={IMAGES.hero}
                alt="Golden Retriever and British Shorthair Cat sitting happily"
                shape="arch-lg"
                className="w-full shadow-warm-xl cursor-pointer"
                imgClassName="h-[360px] sm:h-[460px] lg:h-[500px] w-full transition-transform duration-700 hover:scale-105"
                floatingBadgePosition="bottom-left"
                floatingBadge={
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl sm:rounded-3xl shadow-warm-lg border border-cream-300/90 flex items-center gap-2.5 sm:gap-3.5 max-w-[220px] sm:max-w-[260px]"
                  >
                    <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-sm sm:text-base shrink-0 shadow-inner">
                      <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-amber-400 text-amber-500" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-chocolate-900 text-xs sm:text-sm">4.9 / 5.0</span>
                        <span className="text-[10px] sm:text-[11px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.2 rounded-full">
                          Verified
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-chocolate-600/80 font-medium mt-0.5 leading-tight">
                        5,000+ Happy Pets
                      </p>
                    </div>
                  </motion.div>
                }
              />

              {/* Second Floating Badge: AI Assistant Indicator */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute -top-3 -right-2 sm:-top-5 sm:-right-5 bg-chocolate-900 text-cream-50 p-2.5 px-3.5 sm:p-3 sm:px-4 rounded-2xl shadow-warm-lg border border-chocolate-700 flex items-center gap-2 sm:gap-2.5 z-20"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping shrink-0" />
                <div className="text-left">
                  <span className="text-[11px] sm:text-xs font-bold block flex items-center gap-1 text-white">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-caramel-400 shrink-0" /> AI Assistant
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-cream-300/80">24/7 Triage Active</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
