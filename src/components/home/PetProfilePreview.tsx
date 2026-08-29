import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeader } from '../common/SectionHeader';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { MILO_DEMO_PROFILE } from '../../data/mockData';
import { PawIllustration, SparkleIllustration } from '../common/PetIllustrations';
import { Calendar, ShieldCheck, FileText, Bell, CheckCircle2, AlertCircle } from 'lucide-react';

export interface PetProfilePreviewProps {
  onOpenBooking: () => void;
}

export const PetProfilePreview: React.FC<PetProfilePreviewProps> = ({ onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'vaccines' | 'notes'>('overview');

  return (
    <section className="py-16 sm:py-24 lg:py-28 relative overflow-hidden bg-cream-50">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-sage-100/50 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-12 right-12 opacity-20 pointer-events-none hidden md:block">
        <PawIllustration size={80} color="#D97746" variant="floatSlow" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Customer Portal Preview"
          cursiveSubtitle="All Your Pet's History at a Glance"
          title="Digital Health Passport For Every Pet You Love"
          description="Never lose a vaccination card or forget grooming intervals again. Our unified customer portal keeps track of weights, upcoming appointments, and personalized care notes."
        />

        {/* Embedded Application Preview Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto bg-white rounded-3xl sm:rounded-5xl shadow-warm-xl border border-cream-300 overflow-hidden relative group card-hover-glow"
        >
          {/* Top Mock Window Bar */}
          <div className="bg-cream-100/90 px-4 sm:px-6 py-3 border-b border-cream-300/80 flex items-center justify-between">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-400/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-400/80" />
              <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-400/80" />
              <span className="text-[10px] sm:text-xs font-semibold text-chocolate-600 ml-1.5 truncate max-w-[180px] sm:max-w-none">
                portal.pawsclaws.care / pets / milo
              </span>
            </div>
            <Badge variant="sage" size="sm" withPaw className="text-[10px] sm:text-xs">
              Live Account
            </Badge>
          </div>

          <div className="p-4 sm:p-8 lg:p-10 space-y-6 sm:space-y-8">
            {/* Milo Profile Header Banner */}
            <div
              className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 p-4 sm:p-6 rounded-3xl bg-cream-100/70 border border-cream-300/80 transition-all duration-300 hover:border-terracotta-300/80 hover:bg-cream-100 relative overflow-hidden"
              data-cursor="view"
              data-cursor-text="Milo 🐾"
            >
              {/* Pet Avatar with smooth zoom */}
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-warm-md shrink-0 group-hover:scale-105 transition-transform duration-500">
                <img
                  src={MILO_DEMO_PROFILE.avatar}
                  alt={MILO_DEMO_PROFILE.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Pet Quick Stats */}
              <div className="flex-1 text-center sm:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3">
                  <h3 className="text-2xl sm:text-3xl font-black text-chocolate-900 flex items-center gap-1.5">
                    {MILO_DEMO_PROFILE.name}
                    <SparkleIllustration size={16} color="#D97746" variant="pulse" />
                  </h3>
                  <Badge variant="terracotta" size="sm">
                    {MILO_DEMO_PROFILE.breed}
                  </Badge>
                  <span className="text-[10px] sm:text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 sm:w-3.5 h-3 sm:h-3.5" />
                    {MILO_DEMO_PROFILE.vaccinationStatus}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs font-semibold text-chocolate-700">
                  <span>🎂 <strong>Age:</strong> {MILO_DEMO_PROFILE.age}</span>
                  <span>⚖️ <strong>Weight:</strong> {MILO_DEMO_PROFILE.weight}</span>
                  <span>🐾 <strong>Gender:</strong> {MILO_DEMO_PROFILE.gender}</span>
                </div>

                <p className="text-xs text-chocolate-600 italic">
                  "{MILO_DEMO_PROFILE.notes}"
                </p>
              </div>

              <div className="shrink-0 w-full sm:w-auto">
                <Button
                  variant="terracotta"
                  size="sm"
                  onClick={onOpenBooking}
                  leftIcon={<Calendar className="w-3.5 h-3.5" />}
                  className="w-full sm:w-auto text-xs font-bold shadow-warm-xs hover:shadow-warm-sm hover:scale-105 justify-center transition-all"
                  data-cursor="book"
                  data-cursor-text="Book"
                >
                  Book For Milo
                </Button>
              </div>
            </div>

            {/* Navigation Tabs with animated indicator */}
            <div className="flex items-center gap-2 border-b border-cream-200 pb-2 overflow-x-auto no-scrollbar relative">
              <button
                onClick={() => setActiveTab('overview')}
                className={`relative px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'overview'
                    ? 'text-white'
                    : 'text-chocolate-700 hover:bg-cream-100'
                }`}
              >
                {activeTab === 'overview' && (
                  <motion.div
                    layoutId="passportActiveTab"
                    className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Care Roadmap</span>
              </button>

              <button
                onClick={() => setActiveTab('vaccines')}
                className={`relative px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'vaccines'
                    ? 'text-white'
                    : 'text-chocolate-700 hover:bg-cream-100'
                }`}
              >
                {activeTab === 'vaccines' && (
                  <motion.div
                    layoutId="passportActiveTab"
                    className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Vaccine Passport (4/4)</span>
              </button>

              <button
                onClick={() => setActiveTab('notes')}
                className={`relative px-3.5 sm:px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-colors ${
                  activeTab === 'notes'
                    ? 'text-white'
                    : 'text-chocolate-700 hover:bg-cream-100'
                }`}
              >
                {activeTab === 'notes' && (
                  <motion.div
                    layoutId="passportActiveTab"
                    className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span>Allergies & Vet Notes</span>
              </button>
            </div>

            {/* Tab Contents with AnimatePresence */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6"
                >
                  {/* Next Appointment Card */}
                  <div className="bg-sand-100/70 rounded-3xl p-5 sm:p-6 border border-sand-300 space-y-3 sm:space-y-4 hover:border-terracotta-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-terracotta-700 uppercase tracking-wider flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" /> Next Appointment
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        Confirmed
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-chocolate-900">
                        {MILO_DEMO_PROFILE.nextAppointment?.service}
                      </h4>
                      <p className="text-xs text-chocolate-600 mt-1">
                        {MILO_DEMO_PROFILE.nextAppointment?.date} at {MILO_DEMO_PROFILE.nextAppointment?.time}
                      </p>
                      <p className="text-xs font-medium text-terracotta-600 mt-0.5">
                        Specialist: {MILO_DEMO_PROFILE.nextAppointment?.doctorOrStylist}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-sand-300/80 flex items-center justify-between text-xs text-chocolate-600">
                      <span>SMS Alert: 24h before</span>
                      <span className="text-terracotta-600 font-semibold cursor-pointer hover:underline">
                        Reschedule
                      </span>
                    </div>
                  </div>

                  {/* Recent History */}
                  <div className="bg-cream-100/70 rounded-3xl p-5 sm:p-6 border border-cream-300 space-y-3 sm:space-y-4 hover:border-terracotta-300 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-sage-700 uppercase tracking-wider flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" /> Recent Care Record
                      </span>
                      <span className="text-xs text-chocolate-500">Sept 18, 2026</span>
                    </div>

                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-chocolate-900">
                        Annual Comprehensive Checkup
                      </h4>
                      <p className="text-xs text-chocolate-700 mt-1 leading-relaxed">
                        Weight healthy at 28.4 kg. Teeth in excellent condition. Rabies booster administered with zero adverse reaction.
                      </p>
                    </div>

                    <div className="pt-2 border-t border-cream-200 flex items-center justify-between text-xs text-chocolate-600">
                      <span>Dr. Elena Vance</span>
                      <span className="text-chocolate-900 font-semibold flex items-center gap-1">
                        <FileText className="w-3.5 h-3.5" /> PDF Report
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'vaccines' && (
                <motion.div
                  key="vaccines"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 text-xs">
                    <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between hover:scale-[1.01] transition-transform">
                      <div>
                        <span className="font-bold text-chocolate-900 block">Rabies (3-Year)</span>
                        <span className="text-emerald-700 font-medium text-[11px]">Valid through Sept 2029</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between hover:scale-[1.01] transition-transform">
                      <div>
                        <span className="font-bold text-chocolate-900 block">DHPP Core Series</span>
                        <span className="text-emerald-700 font-medium text-[11px]">Valid through Oct 2027</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="p-3.5 sm:p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between hover:scale-[1.01] transition-transform">
                      <div>
                        <span className="font-bold text-chocolate-900 block">Bordetella (Kennel Cough)</span>
                        <span className="text-emerald-700 font-medium text-[11px]">Valid through Dec 2026</span>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    </div>
                    <div className="p-3.5 sm:p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between hover:scale-[1.01] transition-transform">
                      <div>
                        <span className="font-bold text-chocolate-900 block">Lyme Vaccine Booster</span>
                        <span className="text-amber-800 font-medium text-[11px]">Due in 45 Days (Nov 2026)</span>
                      </div>
                      <Bell className="w-5 h-5 text-amber-600 shrink-0" />
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'notes' && (
                <motion.div
                  key="notes"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-3 text-xs text-chocolate-800"
                >
                  <div className="p-3.5 sm:p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-rose-900 block">Known Sensitivities:</span>
                      <p className="mt-0.5 text-rose-800 leading-relaxed">Chicken meal formula triggers mild itching. Prefers salmon/lamb diet.</p>
                    </div>
                  </div>
                  <div className="p-3.5 sm:p-4 bg-cream-100 rounded-2xl border border-cream-300">
                    <span className="font-bold text-chocolate-900 block">Behavioral & Grooming Notes:</span>
                    <p className="mt-1 text-chocolate-700 leading-relaxed">
                      Milo loves receiving treats after blow-drying. Very gentle during paw pad trimming.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
