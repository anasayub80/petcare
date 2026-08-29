import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SERVICES_DATA } from '../../data/mockData';
import { SectionHeader } from '../common/SectionHeader';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { Sparkles, Stethoscope, ShieldCheck, HeartPulse, ArrowRight, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
};

export interface ServicesGridProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectServiceToBook }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="services-preview" className="py-16 sm:py-24 relative overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-sand-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 -left-20 w-80 h-80 bg-caramel-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Signature Services"
          cursiveSubtitle="Crafted with Love & Science"
          title="Everything Your Pet Needs to Flourish"
          description="From soothing botanical baths and precision trims to accredited clinical diagnostics and lifelong vaccination passports, we offer complete care under one roof."
        />

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {SERVICES_DATA.map((service, index) => {
            const isHovered = hoveredId === service.id;
            const colSpan = 'lg:col-span-6';

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.12 }}
                onMouseEnter={() => setHoveredId(service.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`${colSpan} group flex flex-col bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-warm-md hover:shadow-warm-xl border border-cream-300/80 transition-all duration-500 relative overflow-hidden hover:-translate-y-2`}
                data-cursor="view"
                data-cursor-text="View →"
              >
                {/* Decorative floating paw mark revealed on hover */}
                <motion.div
                  animate={{
                    opacity: isHovered ? 0.12 : 0,
                    scale: isHovered ? 1 : 0.8,
                    rotate: isHovered ? 15 : 0,
                  }}
                  transition={{ duration: 0.35 }}
                  className="absolute -top-4 -right-4 pointer-events-none text-terracotta-600 z-0"
                >
                  <PawIllustration size={100} />
                </motion.div>

                {/* Top Media & Tags */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-6 bg-cream-200 z-10">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-chocolate-950/70 via-transparent to-transparent" />

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <Badge variant="cream" size="sm" className="shadow-warm-xs font-semibold">
                      {service.category.toUpperCase()}
                    </Badge>
                  </div>

                  {/* Price pill */}
                  <div className="absolute bottom-3 left-3 text-white">
                    <span className="text-xs text-cream-200 block font-medium">Starting at</span>
                    <span className="text-xl font-black">${service.startingPrice}</span>
                  </div>

                  {/* Duration pill */}
                  <div className="absolute bottom-3 right-3 bg-chocolate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-cream-100 flex items-center gap-1.5 border border-white/10">
                    <Clock className="w-3.5 h-3.5 text-caramel-400" />
                    <span>{service.duration}</span>
                  </div>
                </div>

                {/* Service Details */}
                <div className="flex-1 flex flex-col justify-between z-10">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <motion.div
                        animate={{
                          rotate: isHovered ? (index % 2 === 0 ? 8 : -8) : 0,
                          scale: isHovered ? 1.08 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shrink-0 group-hover:bg-terracotta-500 group-hover:text-white transition-colors duration-300 shadow-warm-xs"
                      >
                        {iconMap[service.iconName]}
                      </motion.div>
                      <h3 className="text-xl sm:text-2xl font-bold text-chocolate-900 group-hover:text-terracotta-600 transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs font-semibold text-terracotta-600 mb-3 font-script text-lg flex items-center gap-1">
                      <SparkleIllustration size={12} color="#D97746" /> {service.tagline}
                    </p>

                    <p className="text-sm text-chocolate-700/80 leading-relaxed mb-6">
                      {service.shortDescription}
                    </p>

                    {/* Key Inclusions Checklist */}
                    <div className="space-y-2 mb-6 pt-4 border-t border-cream-200">
                      <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
                        Included In Every Session:
                      </span>
                      {service.inclusions.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-chocolate-700">
                          <Check className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 border-t border-cream-200 flex items-center justify-between gap-3">
                    <Link
                      to="/services"
                      className="text-xs font-bold text-chocolate-800 hover:text-terracotta-600 flex items-center gap-1.5 transition-all group-hover:translate-x-0.5"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>

                    <Button
                      variant="terracotta"
                      size="sm"
                      onClick={() => onSelectServiceToBook(service.id)}
                      className="shadow-warm-xs hover:shadow-warm-sm hover:scale-105 font-bold transition-all"
                      data-cursor="book"
                      data-cursor-text="Book"
                    >
                      Book This Care
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Explorer Link */}
        <div className="mt-12 text-center">
          <Link to="/services">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="shadow-warm-xs hover:shadow-warm-sm hover:scale-105"
            >
              View All Comprehensive Services & Inclusions
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
