import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { TESTIMONIALS_DATA } from '../../data/mockData';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { Star, Quote } from 'lucide-react';
import { Badge } from '../common/Badge';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-28 bg-cream-100/80 relative overflow-hidden border-t border-cream-300">
      {/* Decorative paw pattern in background */}
      <div className="absolute top-10 right-10 opacity-10 pointer-events-none text-terracotta-400">
        <PawIllustration size={220} variant="floatSlow" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10 pointer-events-none text-caramel-400">
        <PawIllustration size={160} variant="drift" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Real Stories from Pet Parents"
          cursiveSubtitle="Loved by Dogs, Cats & Their Humans"
          title="What Our Pet Community Is Saying"
          description="Over 3,200 verified five-star reviews from happy pet owners who trust us with their companions’ health, happiness, and styling."
        />

        {/* Editorial Masonry-style Testimonial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-warm-md hover:shadow-warm-xl border border-cream-300 flex flex-col justify-between transition-all duration-300 group card-hover-glow"
            >
              <div>
                {/* Header with stars and service tag */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                    ))}
                  </div>
                  <Badge variant="sage" size="sm">
                    {t.serviceUsed}
                  </Badge>
                </div>

                {/* Comment quote */}
                <div className="relative mb-6">
                  <Quote className="w-8 h-8 text-cream-300 absolute -top-3 -left-2 -z-0 opacity-60" />
                  <p className="relative z-10 text-chocolate-800 text-sm sm:text-base leading-relaxed italic">
                    "{t.comment}"
                  </p>
                </div>
              </div>

              {/* Author & Pet Profile */}
              <div className="pt-4 border-t border-cream-200 flex items-center justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-terracotta-400 shadow-warm-xs shrink-0 group-hover:scale-105 transition-transform">
                    <img
                      src={t.authorImage}
                      alt={t.authorName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-chocolate-900 leading-tight flex items-center gap-1">
                      {t.authorName}
                    </h4>
                    <p className="text-xs text-terracotta-600 font-medium">
                      Parent to <span className="font-semibold text-chocolate-900">{t.petName}</span> ({t.petBreed})
                    </p>
                  </div>
                </div>

                <span className="text-[11px] text-chocolate-500 font-medium hidden sm:inline-block">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
