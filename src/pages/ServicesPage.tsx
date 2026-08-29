import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICES_DATA, FAQ_DATA } from '../data/mockData';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { PawIllustration, SparkleIllustration } from '../components/common/PetIllustrations';
import { Sparkles, Stethoscope, ShieldCheck, HeartPulse, Clock, Check, Calendar, ChevronDown, HelpCircle } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Stethoscope: <Stethoscope className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  HeartPulse: <HeartPulse className="w-5 h-5" />,
};

export const ServicesPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const handleBookService = (serviceId: string) => {
    const targetUrl = `/dashboard/book?serviceId=${serviceId}`;
    if (isAuthenticated) {
      navigate(targetUrl);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  const filteredServices =
    selectedCategory === 'all'
      ? SERVICES_DATA
      : SERVICES_DATA.filter((s) => s.category === selectedCategory);

  const categories = [
    { id: 'all', label: 'All Services (4)' },
    { id: 'grooming', label: 'Pet Grooming & Spa' },
    { id: 'medical', label: 'Veterinary Care' },
    { id: 'preventive', label: 'Vaccines & Prevention' },
    { id: 'wellness', label: 'Health & Wellness' },
  ];

  return (
    <div className="pt-32 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <SectionHeader
          eyebrow="Accredited Care & Styling"
          cursiveSubtitle="Gentle & Science-Backed"
          title="Complete Veterinary, Spa & Wellness Services"
          description="Every treatment is performed by compassionate, board-certified professionals using gentle handling, organic hypoallergenic formulas, and state-of-the-art diagnostics."
        />

        {/* Category Filters with animated active pill */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 sm:mb-16 relative">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold transition-colors duration-200 z-10 ${
                  isSelected
                    ? 'text-cream-50'
                    : 'text-chocolate-800 bg-white/80 hover:bg-cream-100 border border-cream-300'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="servicesFilterPill"
                    className="absolute inset-0 bg-chocolate-900 rounded-full shadow-warm-sm -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Services Breakdown */}
        <div className="space-y-16 lg:space-y-20">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 lg:p-12 shadow-warm-lg border border-cream-300/80 overflow-hidden card-hover-glow relative group"
                data-cursor="view"
                data-cursor-text="View →"
              >
                {/* Decorative paw watermark */}
                <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none text-chocolate-900">
                  <PawIllustration size={160} />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                  {/* Visual Image Side */}
                  <div
                    className={`lg:col-span-5 ${
                      index % 2 === 1 ? 'lg:order-2' : 'lg:order-1'
                    }`}
                  >
                    <div className="relative aspect-[4/3] rounded-3xl sm:rounded-4xl overflow-hidden shadow-warm-md border-4 border-cream-100 group">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge variant="cream" size="sm" withPaw className="shadow-warm-xs">
                          {service.category.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-chocolate-900/90 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-caramel-400" />
                        <span>{service.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content Details Side */}
                  <div
                    className={`lg:col-span-7 flex flex-col justify-between ${
                      index % 2 === 1 ? 'lg:order-1' : 'lg:order-2'
                    }`}
                  >
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-2.5">
                          <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-700 flex items-center justify-center shadow-warm-xs"
                          >
                            {iconMap[service.iconName]}
                          </motion.div>
                          <h3 className="text-2xl sm:text-3xl font-black text-chocolate-900">
                            {service.title}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-chocolate-500 block">Starting from</span>
                          <span className="text-2xl font-black text-terracotta-600">
                            ${service.startingPrice}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs font-semibold text-terracotta-600 font-script text-xl mb-3 flex items-center gap-1">
                        <SparkleIllustration size={12} color="#D97746" /> {service.tagline}
                      </p>

                      <p className="text-sm text-chocolate-700 leading-relaxed mb-6">
                        {service.fullDescription}
                      </p>

                      {/* What's Included & Benefits Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-5 rounded-2xl bg-cream-100/70 border border-cream-300/80 mb-8">
                        <div>
                          <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block mb-2.5">
                            ✓ What is Included:
                          </span>
                          <ul className="space-y-1.5 text-xs text-chocolate-700">
                            {service.inclusions.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <Check className="w-3.5 h-3.5 text-sage-600 shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block mb-2.5">
                            ⭐ Key Pet Benefits:
                          </span>
                          <ul className="space-y-1.5 text-xs text-chocolate-700">
                            {service.benefits.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-terracotta-500 font-bold shrink-0">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-cream-200">
                      <div className="text-xs text-chocolate-600">
                        💡 <strong>Prep Tip:</strong> {service.preparationTips[0]}
                      </div>
                      <Button
                        variant="terracotta"
                        size="md"
                        onClick={() => handleBookService(service.id)}
                        leftIcon={<Calendar className="w-4 h-4" />}
                        className="shadow-warm-sm font-bold hover:scale-105 transition-transform"
                        data-cursor="book"
                        data-cursor-text="Book"
                      >
                        Book {service.title}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Service FAQ Accordion */}
        <div className="mt-24 max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Questions & Answers"
            cursiveSubtitle="Clear Answers for Caring Parents"
            title="Frequently Asked Care Questions"
            description="Have questions about appointment check-in, vaccination validity, or special handling? We’ve got you covered."
          />

          <div className="space-y-3">
            {FAQ_DATA.map((faq) => {
              const isExpanded = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-cream-300 shadow-warm-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-chocolate-900 hover:text-terracotta-600 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-terracotta-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-chocolate-500 transition-transform duration-300 shrink-0 ${
                        isExpanded ? 'rotate-180 text-terracotta-600' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5 text-xs sm:text-sm text-chocolate-700/85 leading-relaxed border-t border-cream-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
