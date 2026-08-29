import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { HOW_IT_WORKS_STEPS } from '../../data/mockData';
import { UserPlus, Sparkles, CalendarCheck, HeartHandshake, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';
import { MagneticButton } from '../common/MagneticButton';
import { PawIllustration } from '../common/PetIllustrations';

const iconMap: Record<string, React.ReactNode> = {
  UserPlus: <UserPlus className="w-6 h-6" />,
  Sparkles: <Sparkles className="w-6 h-6" />,
  CalendarCheck: <CalendarCheck className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
};

export interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 bg-cream-100/70 relative overflow-hidden border-y border-cream-300/70">
      {/* Subtle organic background decoration */}
      <div className="absolute -left-20 top-1/3 w-80 h-80 bg-terracotta-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute right-10 bottom-10 opacity-15 pointer-events-none hidden md:block">
        <PawIllustration size={90} color="#D97746" variant="drift" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Seamless & Stress-Free"
          cursiveSubtitle="Simple as 1, 2, 3, 4"
          title="Pet Care Made Effortlessly Simple"
          description="We’ve reimagined booking and pet wellness so you spend less time on phone calls and more quality time playing with your furry companion."
        />

        {/* Steps Grid with Connected Path */}
        <div className="relative">
          {/* Connecting Curved Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 border-t-2 border-dashed border-terracotta-300/60 -translate-y-8 -z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {HOW_IT_WORKS_STEPS.map((step, idx) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-xl border border-cream-300 transition-all duration-300 cursor-default"
              >
                {/* Step Number & Icon Container */}
                <div className="flex items-center justify-between w-full mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-cream-100 text-terracotta-600 flex items-center justify-center shadow-inner group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-300">
                    {iconMap[step.icon]}
                  </div>
                  <span className="text-3xl font-black text-cream-400 font-serif group-hover:text-terracotta-400 transition-colors">
                    {step.step}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-chocolate-900 mb-2 group-hover:text-terracotta-600 transition-colors">
                  {step.title}
                </h3>

                <p className="text-xs sm:text-sm text-chocolate-700/80 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Bar with Magnetic Attraction */}
        <div className="mt-14 text-center">
          <MagneticButton strength={0.25} maxDistance={6}>
            <Button
              variant="terracotta"
              size="lg"
              onClick={onOpenBooking}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shadow-warm-md hover:shadow-warm-lg hover:scale-105 font-bold transition-all"
              data-cursor="book"
              data-cursor-text="Book"
            >
              Schedule Your Pet’s Visit Today
            </Button>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
};
