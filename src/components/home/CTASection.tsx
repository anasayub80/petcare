import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { MagneticButton } from '../common/MagneticButton';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { Calendar, PhoneCall, Heart, Sparkles } from 'lucide-react';
import { IMAGES } from '../../data/images';

export interface CTASectionProps {
  onOpenBooking: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBooking }) => {
  return (
    <section className="py-16 sm:py-24 lg:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="relative bg-gradient-to-br from-terracotta-600 via-terracotta-500 to-caramel-600 rounded-3xl sm:rounded-5xl p-6 sm:p-12 lg:p-16 text-white shadow-warm-xl overflow-hidden"
        >
          {/* Decorative background paw prints */}
          <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none text-white">
            <PawIllustration size={320} />
          </div>
          <div className="absolute top-6 right-1/3 opacity-15 pointer-events-none text-white">
            <SparkleIllustration size={64} color="#FFFFFF" variant="pulse" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 sm:space-y-5 text-left">
              <div className="inline-flex flex-wrap items-center gap-2">
                <Badge variant="cream" size="md" withPaw className="text-terracotta-800 font-bold bg-white/90">
                  Ready When You Are
                </Badge>
                <span className="font-script text-xl sm:text-2xl text-cream-100 font-bold flex items-center gap-1">
                  <SparkleIllustration size={16} color="#FAF6F0" /> Paws-itively effortless
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
                Give Your Best Friend The Care They Deserve.
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-cream-100/90 max-w-xl font-normal leading-relaxed">
                Join thousands of loving pet parents who enjoy stress-free grooming, top-tier clinical checkups, and 24/7 AI wellness guidance.
              </p>

              <div className="pt-2 sm:pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <MagneticButton strength={0.3} maxDistance={6}>
                  <Button
                    variant="cream"
                    size="lg"
                    onClick={onOpenBooking}
                    leftIcon={<Calendar className="w-5 h-5 text-terracotta-600" />}
                    className="shadow-warm-md hover:scale-105 font-bold justify-center py-3.5 px-6 transition-all"
                    data-cursor="book"
                    data-cursor-text="Book"
                  >
                    Book Appointment Now
                  </Button>
                </MagneticButton>

                <MagneticButton strength={0.25} maxDistance={5}>
                  <a
                    href="tel:+18005557297"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black/20 hover:bg-black/30 backdrop-blur-md text-white text-sm font-bold border border-white/20 transition-all text-center"
                    data-cursor="hover"
                  >
                    <PhoneCall className="w-4 h-4 text-cream-200" />
                    <span>Call (800) 555-PAWS</span>
                  </a>
                </MagneticButton>
              </div>
            </div>

            {/* Right Mini Pet Composition */}
            <div className="lg:col-span-4 hidden lg:flex justify-end">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.4 }}
                className="relative w-56 sm:w-64 h-56 sm:h-64 rounded-full p-2 bg-white/20 backdrop-blur-sm border-2 border-white/40 shadow-warm-lg cursor-pointer"
                data-cursor="view"
                data-cursor-text="Milo 🐾"
              >
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={IMAGES.pets.milo}
                    alt="Happy Golden Retriever"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-2 -left-2 bg-white text-chocolate-900 p-2.5 px-3.5 rounded-2xl shadow-warm-md flex items-center gap-2 text-xs font-bold">
                  <Heart className="w-4 h-4 text-terracotta-500 fill-terracotta-500" />
                  <span>100% Tail-Wag Guaranteed</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
