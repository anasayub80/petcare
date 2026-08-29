import React from 'react';
import { STATS_DATA } from '../../data/mockData';
import { PawPrint, Award, Calendar, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from '../common/AnimatedCounter';

const iconMap: Record<string, React.ReactNode> = {
  PawPrint: <PawPrint className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  Star: <Star className="w-5 h-5" />,
};

export const StatsStrip: React.FC = () => {
  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 mb-12 sm:mb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="bg-cream-100/90 backdrop-blur-md rounded-3xl sm:rounded-4xl p-6 sm:p-10 border border-cream-300/80 shadow-warm-md card-hover-glow"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-cream-300/70">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={stat.id}
                whileHover={{ y: -3, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className={`flex flex-col items-center text-center cursor-default ${
                  idx > 1 ? 'pt-6 lg:pt-0' : idx % 2 !== 0 ? 'pl-2 sm:pl-4' : ''
                } ${idx > 0 ? 'lg:pl-8' : ''}`}
              >
                <div className="w-11 h-11 rounded-2xl bg-white text-terracotta-500 flex items-center justify-center mb-3 shadow-warm-xs border border-cream-200 group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-300">
                  {iconMap[stat.iconName] || <PawPrint className="w-5 h-5" />}
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-chocolate-900 tracking-tight flex items-baseline gap-0.5">
                  <AnimatedCounter value={stat.value} duration={2} />
                </div>
                <span className="text-sm font-bold text-chocolate-800 mt-1">
                  {stat.label}
                </span>
                <p className="text-xs text-chocolate-600/80 mt-1 max-w-[200px] leading-tight">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
