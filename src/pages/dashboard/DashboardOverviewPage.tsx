import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePetCare, calculatePetAge } from '../../context/PetCareContext';
import { SERVICES_DATA } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { PawIllustration, SparkleIllustration } from '../../components/common/PetIllustrations';
import {
  Calendar,
  Clock,
  Sparkles,
  Bot,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck,
  Activity,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const DashboardOverviewPage: React.FC = () => {
  const { user } = useAuth();
  const { pets, appointments } = usePetCare();

  const upcomingAppointments = appointments
    .filter((a) => a.status === 'Confirmed' || a.status === 'Pending')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const nearestAppointment = upcomingAppointments[0];
  const nearestPet = nearestAppointment ? pets.find((p) => p.id === nearestAppointment.petId) : null;
  const nearestService = nearestAppointment ? SERVICES_DATA.find((s) => s.id === nearestAppointment.serviceId) : null;

  const petNamesList = pets.map((p) => p.name).join(' and ');

  return (
    <div className="space-y-8">
      {/* 1. Personalized Greeting Hero Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-cream-100 via-cream-200/90 to-sand-200/80 rounded-3xl sm:rounded-5xl p-6 sm:p-10 border border-cream-300 shadow-warm-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden"
      >
        {/* Floating background decorative paw */}
        <div className="absolute right-12 -top-6 opacity-10 pointer-events-none text-terracotta-500">
          <PawIllustration size={120} variant="floatSlow" />
        </div>

        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2">
            <Badge variant="terracotta" size="sm" withPaw>
              Pet Parent Dashboard
            </Badge>
            <span className="text-xs text-chocolate-600 font-semibold hidden sm:inline-block flex items-center gap-1">
              <SparkleIllustration size={10} color="#D97746" /> San Francisco Wellness Hub
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-chocolate-900 tracking-tight">
            Good Morning, {user?.name?.split(' ')[0] || 'Friend'} 👋
          </h1>

          <p className="text-xs sm:text-sm text-chocolate-700/90 leading-relaxed font-normal">
            {pets.length > 0
              ? `How are ${petNamesList} doing today? All digital passports and wellness schedules are synchronized.`
              : `Welcome to your personal pet wellness portal. Let’s start by adding your furry companion!`}
          </p>
        </div>

        {/* Quick CTAs */}
        <div className="flex flex-wrap items-center gap-3 z-10 w-full sm:w-auto">
          <Link to="/dashboard/book" className="w-full sm:w-auto">
            <Button
              variant="terracotta"
              size="md"
              leftIcon={<Calendar className="w-4 h-4" />}
              className="w-full justify-center shadow-warm-sm font-bold hover:scale-103 transition-transform"
              data-cursor="book"
              data-cursor-text="Book"
            >
              Book Appointment
            </Button>
          </Link>
          <Link to="/dashboard/assistant" className="w-full sm:w-auto">
            <Button
              variant="cream"
              size="md"
              leftIcon={<Bot className="w-4 h-4 text-terracotta-600" />}
              className="w-full justify-center hover:scale-103 transition-transform"
              data-cursor="ask"
              data-cursor-text="Ask ✨"
            >
              Ask AI Assistant
            </Button>
          </Link>
        </div>
      </motion.div>

      {/* 2. Main Grid: Upcoming Appointment & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Nearest Appointment Card */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-chocolate-900 flex items-center gap-2">
              <CalendarCheck className="w-5 h-5 text-terracotta-500" />
              <span>Next Upcoming Care</span>
            </h2>
            <Link
              to="/dashboard/appointments"
              className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1"
            >
              <span>View All ({appointments.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {nearestAppointment && nearestPet ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-8 shadow-warm-md border border-cream-300 relative overflow-hidden card-hover-glow"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={nearestPet.photo}
                      alt={nearestPet.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-warm-xs shrink-0"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-black text-chocolate-900">{nearestPet.name}</h3>
                      <Badge variant="terracotta" size="sm">{nearestPet.breed}</Badge>
                      <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        {nearestAppointment.status}
                      </span>
                    </div>
                    <span className="text-sm font-bold text-terracotta-600 block">
                      {nearestService?.title || 'Pet Wellness Care'}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono text-chocolate-500 block">
                    {nearestAppointment.bookingNumber}
                  </span>
                  <span className="text-lg font-black text-chocolate-900 block">
                    ${nearestAppointment.price}
                  </span>
                </div>
              </div>

              {/* Appointment Schedule Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-5 text-xs text-chocolate-800">
                <div className="flex items-center gap-2.5 bg-cream-100/70 p-3 rounded-2xl border border-cream-300/80">
                  <Calendar className="w-4 h-4 text-terracotta-500 shrink-0" />
                  <div>
                    <span className="font-bold text-chocolate-900 block">Date & Time</span>
                    <span>{nearestAppointment.date} at {nearestAppointment.startTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 bg-cream-100/70 p-3 rounded-2xl border border-cream-300/80">
                  <ShieldCheck className="w-4 h-4 text-sage-600 shrink-0" />
                  <div>
                    <span className="font-bold text-chocolate-900 block">Care Specialist</span>
                    <span>{nearestAppointment.assignedStaffName || 'Assigned Lead Stylist'}</span>
                  </div>
                </div>
              </div>

              {/* Customer Notes */}
              {nearestAppointment.customerNotes && (
                <div className="bg-sand-50 p-3.5 rounded-2xl border border-sand-200 text-xs text-chocolate-700 mb-6 italic">
                  "{nearestAppointment.customerNotes}"
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <Link
                  to={`/dashboard/appointments/${nearestAppointment.id}`}
                  className="text-xs font-bold text-chocolate-900 hover:text-terracotta-600 flex items-center gap-1 transition-colors"
                >
                  <span>View Appointment Receipt</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>

                <div className="flex items-center gap-2">
                  <Link to={`/dashboard/appointments/${nearestAppointment.id}`}>
                    <Button variant="secondary" size="sm" className="hover:scale-103 transition-transform">
                      Manage / Reschedule
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ) : (
            /* Empty State for Upcoming Appointments */
            <EmptyState
              type="no-appointments"
              title="No Upcoming Appointments"
              description="Keep your pet fresh, happy, and up to date on vaccines by booking their next visit."
              actionText="Schedule Now"
              onAction={() => window.location.assign('/dashboard/book')}
            />
          )}

          {/* 3. Care Reminders Widget */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-warm-md border border-cream-300 space-y-4 card-hover-glow">
            <h3 className="text-base font-bold text-chocolate-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Pet Care & Vaccination Reminders</span>
            </h3>

            <div className="space-y-3 text-xs">
              <motion.div
                whileHover={{ scale: 1.01, x: 2 }}
                className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 flex items-start justify-between gap-3 transition-transform"
              >
                <div>
                  <span className="font-bold text-chocolate-900 block">Milo’s Bordetella Booster Due Soon</span>
                  <p className="text-chocolate-700 mt-0.5">
                    Recommended before upcoming kennel stays or play park socialization.
                  </p>
                </div>
                <Link to="/dashboard/book">
                  <span className="font-bold text-terracotta-600 hover:underline shrink-0 block">
                    Book Shot
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.01, x: 2 }}
                className="p-4 rounded-2xl bg-sage-50/80 border border-sage-200 flex items-start justify-between gap-3 transition-transform"
              >
                <div>
                  <span className="font-bold text-chocolate-900 block">Luna’s Coat Grooming Interval</span>
                  <p className="text-chocolate-700 mt-0.5">
                    Last groomed 6 weeks ago. Ideal time for a gentle feline hygiene & deshedding brush.
                  </p>
                </div>
                <Link to="/dashboard/book">
                  <span className="font-bold text-sage-800 hover:underline shrink-0 block">
                    Schedule Spa
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Column: My Pets & Quick Action Cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-chocolate-900 flex items-center gap-2">
              <Heart className="w-5 h-5 text-terracotta-500 fill-terracotta-500" />
              <span>My Furry Family</span>
            </h2>
            <Link
              to="/dashboard/pets"
              className="text-xs font-bold text-terracotta-600 hover:underline flex items-center gap-1"
            >
              <span>Manage Pets ({pets.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pet Cards List */}
          <div className="space-y-3">
            {pets.map((pet) => (
              <motion.div
                key={pet.id}
                whileHover={{ x: 4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  to={`/dashboard/pets/${pet.id}`}
                  className="group flex items-center justify-between p-4 rounded-2xl bg-white border border-cream-300 shadow-warm-xs hover:shadow-warm-md hover:border-terracotta-300 transition-all block"
                  data-cursor="view"
                  data-cursor-text="Passport"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={pet.photo}
                      alt={pet.name}
                      className="w-12 h-12 rounded-2xl object-cover border border-cream-200 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-chocolate-900 truncate">
                          {pet.name}
                        </h4>
                        <Badge variant="cream" size="sm">
                          {pet.species}
                        </Badge>
                      </div>
                      <span className="text-xs text-chocolate-600 block truncate">
                        {pet.breed} • {calculatePetAge(pet.dateOfBirth)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-terracotta-600 group-hover:translate-x-1 transition-transform">
                      Passport →
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}

            <Link
              to="/dashboard/pets/new"
              className="w-full py-3.5 px-4 rounded-2xl border-2 border-dashed border-terracotta-300 text-terracotta-700 hover:bg-terracotta-50/60 font-bold text-xs flex items-center justify-center gap-2 transition-all block text-center hover:scale-101"
            >
              <Plus className="w-4 h-4" />
              <span>Add Another Pet</span>
            </Link>
          </div>

          {/* Quick Actions Grid with Hover Lift */}
          <div className="bg-cream-100/80 rounded-3xl p-6 border border-cream-300 space-y-4">
            <h3 className="text-sm font-bold text-chocolate-900 uppercase tracking-wider">
              Quick Portals
            </h3>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/dashboard/book"
                className="p-4 bg-white rounded-2xl border border-cream-300 shadow-warm-xs hover:shadow-warm-md hover:border-terracotta-400 hover:-translate-y-1 transition-all text-left group card-hover-glow"
                data-cursor="book"
                data-cursor-text="Book"
              >
                <div className="w-8 h-8 rounded-xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center mb-2 group-hover:bg-terracotta-500 group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-chocolate-900 block">Book Care</span>
                <span className="text-[11px] text-chocolate-500">Fast 6-step scheduler</span>
              </Link>

              <Link
                to="/dashboard/assistant"
                className="p-4 bg-white rounded-2xl border border-cream-300 shadow-warm-xs hover:shadow-warm-md hover:border-terracotta-400 hover:-translate-y-1 transition-all text-left group card-hover-glow"
                data-cursor="ask"
                data-cursor-text="Ask ✨"
              >
                <div className="w-8 h-8 rounded-xl bg-caramel-100 text-caramel-700 flex items-center justify-center mb-2 group-hover:bg-caramel-500 group-hover:text-white transition-colors">
                  <Bot className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-chocolate-900 block">AI Triage</span>
                <span className="text-[11px] text-chocolate-500">Ask health queries</span>
              </Link>

              <Link
                to="/dashboard/pets/new"
                className="p-4 bg-white rounded-2xl border border-cream-300 shadow-warm-xs hover:shadow-warm-md hover:border-terracotta-400 hover:-translate-y-1 transition-all text-left group card-hover-glow"
              >
                <div className="w-8 h-8 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center mb-2 group-hover:bg-sage-600 group-hover:text-white transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-chocolate-900 block">Add Pet</span>
                <span className="text-[11px] text-chocolate-500">Digital passport</span>
              </Link>

              <Link
                to="/dashboard/appointments"
                className="p-4 bg-white rounded-2xl border border-cream-300 shadow-warm-xs hover:shadow-warm-md hover:border-terracotta-400 hover:-translate-y-1 transition-all text-left group card-hover-glow"
              >
                <div className="w-8 h-8 rounded-xl bg-cream-200 text-chocolate-800 flex items-center justify-center mb-2 group-hover:bg-chocolate-900 group-hover:text-white transition-colors">
                  <Activity className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-chocolate-900 block">History</span>
                <span className="text-[11px] text-chocolate-500">Past & receipts</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
