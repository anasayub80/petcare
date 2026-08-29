import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePetCare, calculatePetAge } from '../../context/PetCareContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { SERVICES_DATA } from '../../data/mockData';
import { PawIllustration, SparkleIllustration } from '../../components/common/PetIllustrations';
import {
  ArrowLeft,
  Calendar,
  ShieldCheck,
  Heart,
  Bot,
  FileText,
  AlertCircle,
  Clock,
  Sparkles,
  CheckCircle2,
  Bell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const PetDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getPetById, appointments } = usePetCare();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<'health' | 'vaccines' | 'appointments' | 'ai'>('health');

  const pet = id ? getPetById(id) : undefined;

  if (!pet) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-chocolate-900">Pet Profile Not Found</h2>
        <p className="text-sm text-chocolate-600">The pet profile you are looking for does not exist or was removed.</p>
        <Link to="/dashboard/pets">
          <Button variant="terracotta" size="md">Back to My Pets</Button>
        </Link>
      </div>
    );
  }

  const petAppointments = appointments.filter((a) => a.petId === pet.id);
  const upcomingApts = petAppointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending');
  const pastApts = petAppointments.filter((a) => a.status === 'Completed' || a.status === 'Cancelled');

  const tabs = [
    { id: 'health', label: 'Health & Medical Overview' },
    { id: 'vaccines', label: `Vaccination Passport (${pet.vaccinations?.length || 0})` },
    { id: 'appointments', label: `Appointment History (${petAppointments.length})` },
    { id: 'ai', label: '✨ AI Health Recommendations' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Breadcrumb & Return */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/pets"
          className="inline-flex items-center gap-2 text-xs font-bold text-chocolate-700 hover:text-terracotta-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Pets</span>
        </Link>

        <div className="flex items-center gap-2">
          <Link to={`/dashboard/assistant?petId=${pet.id}`}>
            <Button
              variant="cream"
              size="sm"
              leftIcon={<Bot className="w-3.5 h-3.5 text-terracotta-600" />}
              className="text-xs hover:scale-103 transition-transform"
              data-cursor="ask"
              data-cursor-text="Ask ✨"
            >
              Ask AI About {pet.name}
            </Button>
          </Link>

          <Link to={`/dashboard/book?petId=${pet.id}`}>
            <Button
              variant="terracotta"
              size="sm"
              leftIcon={<Calendar className="w-3.5 h-3.5" />}
              className="text-xs font-bold shadow-warm-xs hover:scale-103 transition-transform"
              data-cursor="book"
              data-cursor-text="Book"
            >
              Book For {pet.name}
            </Button>
          </Link>
        </div>
      </div>

      {/* Hero Pet Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 flex flex-col md:flex-row items-center md:items-start gap-8 card-hover-glow relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none text-chocolate-900">
          <PawIllustration size={180} />
        </div>

        {/* Large Pet Frame */}
        <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-3xl sm:rounded-4xl overflow-hidden border-4 border-white shadow-warm-md shrink-0 bg-cream-200 group">
          <img src={pet.photo} alt={pet.name} className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" />
        </div>

        {/* Pet Meta Information */}
        <div className="flex-1 text-center md:text-left space-y-3 z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5">
            <h1 className="text-3xl sm:text-4xl font-black text-chocolate-900 tracking-tight flex items-center gap-2">
              {pet.name}
              <SparkleIllustration size={18} color="#D97746" variant="pulse" />
            </h1>
            <Badge variant="terracotta" size="md">
              {pet.species} • {pet.breed}
            </Badge>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Passport Active
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs sm:text-sm font-semibold text-chocolate-800">
            <span>🎂 <strong>Age:</strong> {calculatePetAge(pet.dateOfBirth)}</span>
            <span>⚖️ <strong>Weight:</strong> {pet.weight} {pet.weightUnit}</span>
            <span>🐾 <strong>Gender:</strong> {pet.gender}</span>
            {pet.color && <span>🎨 <strong>Color:</strong> {pet.color}</span>}
          </div>

          {pet.behaviorNotes && (
            <p className="text-xs sm:text-sm text-chocolate-700 leading-relaxed bg-cream-100/70 p-3.5 rounded-2xl border border-cream-200">
              💡 <strong>Behavioral Notes:</strong> "{pet.behaviorNotes}"
            </p>
          )}
        </div>
      </motion.div>

      {/* Navigation Tabs with animated indicator */}
      <div className="flex flex-wrap items-center gap-2 border-b border-cream-200 pb-3 overflow-x-auto no-scrollbar relative">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-5 py-2.5 rounded-2xl text-xs font-bold transition-colors whitespace-nowrap z-10 ${
                isActive
                  ? 'text-white'
                  : 'text-chocolate-800 hover:bg-cream-100'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="petDetailTabPill"
                  className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents with AnimatePresence */}
      <AnimatePresence mode="wait">
        {activeTab === 'health' && (
          <motion.div
            key="health"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {/* Allergies & Diet */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-4 hover:border-terracotta-300 transition-colors">
              <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
                Allergies & Sensitivities
              </span>
              {pet.allergies && pet.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {pet.allergies.map((a, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
                      {a}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-chocolate-600">No known food or seasonal allergies recorded.</p>
              )}
            </div>

            {/* Medical Conditions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-4 hover:border-terracotta-300 transition-colors">
              <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
                Pre-Existing Medical Conditions
              </span>
              {pet.conditions && pet.conditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {pet.conditions.map((c, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-chocolate-600">No chronic medical conditions listed.</p>
              )}
            </div>

            {/* Medications */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-4 hover:border-terracotta-300 transition-colors">
              <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
                Current Medications & Supplements
              </span>
              {pet.medications && pet.medications.length > 0 ? (
                <div className="space-y-2 text-xs text-chocolate-800">
                  {pet.medications.map((m, idx) => (
                    <div key={idx} className="p-3 bg-cream-100 rounded-xl border border-cream-200 font-semibold">
                      💊 {m}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-chocolate-600">No active medications prescribed.</p>
              )}
            </div>

            {/* Grooming & Special Handling Instructions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-4 hover:border-terracotta-300 transition-colors">
              <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
                Stylist & Clinical Special Notes
              </span>
              <p className="text-xs text-chocolate-700 leading-relaxed">
                {pet.notes || 'No special grooming or handling restrictions provided.'}
              </p>
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
            className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-chocolate-900">Verified Vaccine Passport</h3>
                <p className="text-xs text-chocolate-600">Official digital records maintained by certified clinicians.</p>
              </div>
              <Badge variant="sage" size="sm" withPaw>
                AAHA Standard
              </Badge>
            </div>

            <div className="space-y-3">
              {pet.vaccinations?.map((vac) => (
                <div
                  key={vac.id}
                  className="p-4 rounded-2xl bg-cream-100/70 border border-cream-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-terracotta-300 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-white text-emerald-600 border border-cream-200 flex items-center justify-center shrink-0 shadow-warm-xs">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-chocolate-900">{vac.name}</h4>
                      <span className="text-xs text-chocolate-600">Administered by {vac.veterinarian}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-chocolate-800">
                    <div>
                      <span className="text-chocolate-500 block text-[11px]">Given: {vac.administeredDate}</span>
                      <span className="font-bold text-emerald-700 block">Valid through: {vac.expiryDate}</span>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      {vac.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'appointments' && (
          <motion.div
            key="appointments"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            {/* Upcoming */}
            {upcomingApts.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-chocolate-900 uppercase tracking-wider">
                  Upcoming Visits
                </h3>
                {upcomingApts.map((apt) => {
                  const service = SERVICES_DATA.find((s) => s.id === apt.serviceId);
                  return (
                    <div
                      key={apt.id}
                      className="p-5 rounded-2xl bg-white border border-cream-300 shadow-warm-xs flex items-center justify-between gap-4 hover:border-terracotta-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-chocolate-900">{service?.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {apt.status}
                          </span>
                        </div>
                        <span className="text-xs text-chocolate-600 mt-1 block">
                          📅 {apt.date} at {apt.startTime} ({apt.bookingNumber})
                        </span>
                      </div>
                      <Link to={`/dashboard/appointments/${apt.id}`}>
                        <Button variant="secondary" size="sm" className="hover:scale-103 transition-transform">Details</Button>
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Past */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-chocolate-900 uppercase tracking-wider">
                Completed & Previous Care
              </h3>
              {pastApts.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-cream-300 text-center text-xs text-chocolate-600">
                  No past appointment records yet for {pet.name}.
                </div>
              ) : (
                pastApts.map((apt) => {
                  const service = SERVICES_DATA.find((s) => s.id === apt.serviceId);
                  return (
                    <div
                      key={apt.id}
                      className="p-5 rounded-2xl bg-white border border-cream-300 shadow-warm-xs flex items-center justify-between gap-4 hover:border-terracotta-300 transition-colors"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-chocolate-900">{service?.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 text-chocolate-800">
                            {apt.status}
                          </span>
                        </div>
                        <span className="text-xs text-chocolate-600 mt-1 block">
                          Completed on {apt.date} with {apt.assignedStaffName || 'Specialist'}
                        </span>
                      </div>
                      <Link to={`/dashboard/appointments/${apt.id}`}>
                        <Button variant="ghost" size="sm" className="hover:scale-103 transition-transform">View Receipt</Button>
                      </Link>
                    </div>
                  );
                })
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'ai' && (
          <motion.div
            key="ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-cream-300 shadow-warm-xs space-y-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-xs">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-chocolate-900">
                    Breed-Calibrated Care Protocol for {pet.name}
                  </h3>
                  <span className="text-xs text-chocolate-600">
                    Customized for a {calculatePetAge(pet.dateOfBirth)} {pet.breed}
                  </span>
                </div>
              </div>
              <Link to={`/dashboard/assistant?petId=${pet.id}`}>
                <Button
                  variant="terracotta"
                  size="sm"
                  leftIcon={<Sparkles className="w-3.5 h-3.5" />}
                  className="shadow-warm-xs hover:scale-105 transition-transform"
                  data-cursor="ask"
                  data-cursor-text="Ask ✨"
                >
                  Live Chat
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-chocolate-800">
              <div className="p-4 bg-cream-100 rounded-2xl border border-cream-200 space-y-1.5">
                <span className="font-bold text-chocolate-900 block flex items-center gap-1.5">
                  🧴 Ideal Grooming Interval
                </span>
                <p className="text-chocolate-700 leading-relaxed">
                  For {pet.breed}s with double coats, full deshedding and hydrobath every 4–6 weeks prevents painful pelted matting.
                </p>
              </div>

              <div className="p-4 bg-cream-100 rounded-2xl border border-cream-200 space-y-1.5">
                <span className="font-bold text-chocolate-900 block flex items-center gap-1.5">
                  🦷 Dental Prophylaxis Check
                </span>
                <p className="text-chocolate-700 leading-relaxed">
                  Ultrasonic dental checkup recommended annually to prevent early periodontal tartar buildup.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
