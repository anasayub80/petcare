import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { PetFrame } from '../common/PetFrame';
import { IMAGES } from '../../data/images';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { ShieldCheck, HeartHandshake, CalendarClock, Home, Sparkles } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const points = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-terracotta-600" />,
      title: 'Licensed & Accredited Professionals',
      description: 'Our certified veterinarians and master stylists undergo rigorous ongoing training and fear-free animal handling certifications.',
    },
    {
      icon: <HeartHandshake className="w-5 h-5 text-terracotta-600" />,
      title: 'Hyper-Personalized Pet Care',
      description: 'We treat every pet as an individual, tailoring shampoo chemistries, treatment speeds, and medical plans to their unique temperament.',
    },
    {
      icon: <CalendarClock className="w-5 h-5 text-terracotta-600" />,
      title: 'Effortless Real-Time Scheduling',
      description: 'Book preferred times in seconds with no phone tag, plus receive automated SMS reminder alerts before your visit.',
    },
    {
      icon: <Home className="w-5 h-5 text-terracotta-600" />,
      title: 'Safe, Serene & Calming Clinic Spaces',
      description: 'Dedicated quiet feline rooms, soothing aromatherapy, non-slip surfaces, and low-stress handling protocols.',
    },
    {
      icon: <Sparkles className="w-5 h-5 text-terracotta-600" />,
      title: 'AI-Powered Digital Health Records',
      description: 'Instant access to past wellness reports, vaccine passports, and proactive longevity recommendations.',
    },
  ];

  return (
    <section className="py-20 sm:py-28 bg-cream-100/60 relative overflow-hidden border-t border-cream-300/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual Composition with Organic Masks */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            <div className="relative max-w-md w-full" data-cursor="view" data-cursor-text="View →">
              {/* Floating Paw illustration */}
              <div className="absolute -top-4 -right-4 z-20 text-caramel-500/80 pointer-events-none hidden sm:block">
                <PawIllustration size={36} color="#D97746" variant="float" />
              </div>

              <PetFrame
                src={IMAGES.whyChooseUs}
                alt="Compassionate veterinarian gently caring for a dog"
                shape="arch-lg"
                className="w-full shadow-warm-xl cursor-pointer"
                imgClassName="h-[460px] sm:h-[520px] w-full transition-transform duration-700 hover:scale-105"
                floatingBadgePosition="bottom-right"
                floatingBadge={
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-chocolate-900 text-cream-50 p-4 rounded-3xl shadow-warm-lg border border-chocolate-800 flex items-center gap-3 max-w-[240px]"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center font-bold text-sm shrink-0">
                      100%
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">Fear-Free Guarantee</span>
                      <p className="text-[11px] text-cream-300/80 mt-0.5">Gentle, patient care at your pet's own pace</p>
                    </div>
                  </motion.div>
                }
              />
            </div>
          </motion.div>

          {/* Right Column: Editorial Points */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            <SectionHeader
              eyebrow="Why Pet Parents Trust Us"
              cursiveSubtitle="The Gold Standard in Animal Wellness"
              title="A Healthier, Happier Life for Your Companion"
              align="left"
              className="mb-8 max-w-none"
            />

            <div className="space-y-4 w-full">
              {points.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.08 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white/85 border border-cream-300/80 shadow-warm-xs hover:shadow-warm-sm transition-all hover:border-terracotta-300"
                >
                  <div className="w-10 h-10 rounded-2xl bg-cream-100 flex items-center justify-center shrink-0 border border-cream-200 mt-0.5 group-hover:bg-terracotta-100 transition-colors">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-chocolate-900 mb-1 flex items-center gap-1.5">
                      {point.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-chocolate-700/80 leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
