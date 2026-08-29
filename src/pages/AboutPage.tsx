import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { PetFrame } from '../components/common/PetFrame';
import { PawIllustration, SparkleIllustration, VetCrossIllustration } from '../components/common/PetIllustrations';
import { TEAM_DATA } from '../data/mockData';
import { IMAGES } from '../data/images';
import { Heart, Sparkles, Shield, Award, CheckCircle2 } from 'lucide-react';
import { CTASection } from '../components/home/CTASection';

export const AboutPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenBooking = () => {
    if (isAuthenticated) {
      navigate('/dashboard/book');
    } else {
      navigate('/login?redirect=%2Fdashboard%2Fbook');
    }
  };

  const values = [
    {
      icon: <Heart className="w-6 h-6 text-terracotta-600" />,
      title: 'Unconditional Compassion',
      description: 'Every dog and cat is treated with the gentle patience, warmth, and dignity we give our own beloved companions.',
    },
    {
      icon: <Award className="w-6 h-6 text-terracotta-600" />,
      title: 'Clinical & Styling Excellence',
      description: 'We adhere to the highest international veterinary standards, state-of-the-art diagnostics, and master grooming craft.',
    },
    {
      icon: <Shield className="w-6 h-6 text-terracotta-600" />,
      title: 'Fear-Free Commitment',
      description: 'Our hospital and spa are designed from the ground up to minimize sensory overload, anxiety, and clinic trauma.',
    },
    {
      icon: <Sparkles className="w-6 h-6 text-terracotta-600" />,
      title: 'Intelligent Modern Care',
      description: 'We unite human medical empathy with intelligent technology to give pet parents proactive, actionable longevity tools.',
    },
  ];

  return (
    <div className="pt-32 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Brand Origin Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24 lg:mb-32 relative">
          {/* Floating SVG Illustrations in background */}
          <div className="absolute top-0 right-10 opacity-15 pointer-events-none hidden md:block">
            <PawIllustration size={100} color="#D97746" variant="drift" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6 text-left z-10"
          >
            <Badge variant="terracotta" size="md" withPaw>
              Our Origin & Purpose
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-chocolate-900 leading-[1.15] tracking-tight">
              Founded on Love.{' '}
              <span className="font-serif italic text-terracotta-500 block">
                Elevated by Medical Science.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-chocolate-700/85 leading-relaxed">
              Paws & Claws began with a simple yet transformative belief: pet healthcare and grooming shouldn’t be stressful, fragmented, or cold. Too many loving pet parents struggle with chaotic booking, frantic emergency room visits, and rushed grooming salons.
            </p>

            <p className="text-sm sm:text-base text-chocolate-700/85 leading-relaxed">
              We brought together board-certified veterinary doctors, certified master stylists, and animal behavioral scientists to build an integrated sanctuary. Here, high-touch human empathy meets modern AI-driven preventive care.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6 text-xs sm:text-sm font-bold text-chocolate-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>AAHA Certified Facility</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>100% Organic Products</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center z-10"
          >
            <div className="relative max-w-md w-full" data-cursor="view" data-cursor-text="About Us">
              <PetFrame
                src={IMAGES.aboutHero}
                alt="Gentle pet care story"
                shape="arch-lg"
                className="w-full shadow-warm-xl cursor-pointer"
                imgClassName="h-[460px] sm:h-[500px] w-full transition-transform duration-700 hover:scale-105"
                floatingBadgePosition="bottom-left"
                floatingBadge={
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-white p-4 rounded-3xl shadow-warm-lg border border-cream-300 flex items-center gap-3"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center font-bold">
                      <VetCrossIllustration size={22} color="#D97746" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-chocolate-900 block">Fear-Free Certified</span>
                      <span className="text-[11px] text-chocolate-600">Zero restraint philosophy</span>
                    </div>
                  </motion.div>
                }
              />
            </div>
          </motion.div>
        </div>

        {/* Mission & Core Values */}
        <div className="mb-24 lg:mb-32">
          <SectionHeader
            eyebrow="What Guides Us"
            cursiveSubtitle="Our Guiding North Star"
            title="The Core Principles of Paws & Claws"
            description="Our philosophy shapes every decision we make — from the organic botanicals we select to the soothing acoustics of our quiet cat wards."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="bg-white rounded-3xl p-6 sm:p-7 shadow-warm-sm hover:shadow-warm-xl border border-cream-300 flex flex-col justify-between transition-all duration-300 card-hover-glow cursor-default"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-cream-100 flex items-center justify-center mb-4 border border-cream-200 group-hover:bg-terracotta-50 transition-colors">
                    {v.icon}
                  </div>
                  <h3 className="text-lg font-bold text-chocolate-900 mb-2">
                    {v.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-chocolate-700/80 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Medical & Grooming Team Profiles */}
        <div id="team" className="mb-24 lg:mb-32">
          <SectionHeader
            eyebrow="Certified Specialists"
            cursiveSubtitle="Passionate Animal Advocates"
            title="Meet Our Veterinary & Grooming Team"
            description="Our clinicians and master stylists possess decades of collective clinical experience and an unwavering devotion to animal wellness."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_DATA.map((member, idx) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl sm:rounded-4xl p-6 shadow-warm-md hover:shadow-warm-xl border border-cream-300 flex flex-col justify-between group transition-all duration-300 card-hover-glow"
                data-cursor="view"
                data-cursor-text={member.name.split(' ')[0]}
              >
                <div>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-cream-200">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                    />
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-chocolate-900 group-hover:text-terracotta-600 transition-colors">
                    {member.name}
                  </h3>
                  <span className="text-xs font-semibold text-terracotta-600 block mb-2">
                    {member.role}
                  </span>

                  <p className="text-xs text-chocolate-500 font-mono mb-3">
                    {member.credentials}
                  </p>

                  <p className="text-xs text-chocolate-700/80 leading-relaxed mb-4">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-cream-200">
                  <p className="text-[11px] text-chocolate-600 italic font-serif">
                    "{member.quote}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Final CTA Banner */}
        <CTASection onOpenBooking={handleOpenBooking} />
      </div>
    </div>
  );
};
