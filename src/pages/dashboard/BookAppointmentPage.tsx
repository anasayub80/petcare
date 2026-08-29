import React, { useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { usePetCare } from '../../context/PetCareContext';
import { SERVICES_DATA } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';
import { PawIllustration, SparkleIllustration } from '../../components/common/PetIllustrations';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Dog,
  Plus,
  ShieldCheck,
  Heart,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const BookAppointmentPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialPetId = searchParams.get('petId') || '';
  const initialServiceId = searchParams.get('serviceId') || 'grooming';

  const { pets, bookAppointment } = usePetCare();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [selectedPetId, setSelectedPetId] = useState(initialPetId || (pets[0]?.id || ''));
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [selectedDate, setSelectedDate] = useState('2026-09-08');
  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [reason, setReason] = useState('');
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const selectedPet = pets.find((p) => p.id === selectedPetId) || pets[0];
  const selectedService = SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];

  const timeSlots = [
    { time: '09:00 AM', period: 'Morning', available: true },
    { time: '10:00 AM', period: 'Morning', available: true },
    { time: '11:30 AM', period: 'Late Morning', available: true },
    { time: '01:30 PM', period: 'Afternoon', available: true },
    { time: '03:00 PM', period: 'Afternoon', available: true },
    { time: '04:30 PM', period: 'Late Afternoon', available: false },
    { time: '05:30 PM', period: 'Evening', available: true },
  ];

  const handleNextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handlePrevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleConfirmAppointment = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      const apt = bookAppointment({
        petId: selectedPet.id,
        serviceId: selectedService.id,
        date: selectedDate,
        startTime: selectedTime,
        endTime: '11:00 AM',
        status: 'Confirmed',
        customerNotes: reason ? `${reason}. ${specialInstructions}` : specialInstructions,
        assignedStaffName: selectedService.category === 'grooming' ? 'Marcus Chen (Master Stylist)' : 'Dr. Elena Vance, DVM',
        price: selectedService.startingPrice,
      });

      setIsSubmitting(false);
      setConfirmedBookingId(apt.id);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#D97746', '#221612', '#648B73', '#F1B267'],
      });
    }, 700);
  };

  const steps = [
    { num: 1, label: 'Pet' },
    { num: 2, label: 'Service' },
    { num: 3, label: 'Date' },
    { num: 4, label: 'Time' },
    { num: 5, label: 'Notes' },
    { num: 6, label: 'Review' },
  ];

  const stepVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 30 : -30,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 30 : -30,
      opacity: 0,
    }),
  };

  if (confirmedBookingId) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="max-w-xl mx-auto bg-white rounded-4xl sm:rounded-5xl p-8 sm:p-12 shadow-warm-xl border border-cream-300 text-center space-y-6 my-8 relative overflow-hidden card-hover-glow"
      >
        {/* Floating background paw celebration */}
        <div className="absolute -top-6 -right-6 opacity-10 text-terracotta-500 pointer-events-none">
          <PawIllustration size={140} variant="float" />
        </div>

        {/* Animated Checkmark SVG Draw */}
        <div className="relative w-20 h-20 bg-sage-100 rounded-full mx-auto flex items-center justify-center shadow-warm-sm">
          <svg className="w-12 h-12 text-sage-600" viewBox="0 0 52 52" fill="none">
            <motion.circle
              cx="26"
              cy="26"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.path
              d="M14 27l8 8 16-16"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.4, ease: 'easeOut' }}
            />
          </svg>
        </div>

        <div>
          <span className="font-script text-2xl text-terracotta-600 font-bold flex items-center justify-center gap-1.5 mb-1">
            <SparkleIllustration size={16} color="#D97746" variant="pulse" /> Tail Wags & Purrs Ahead!
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Appointment Confirmed!
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-2 max-w-md mx-auto leading-relaxed">
            We’ve reserved your session for <strong>{selectedPet?.name}</strong>. A confirmation and digital calendar reminder have been sent to your email and phone.
          </p>
        </div>

        <div className="bg-cream-100 rounded-3xl p-6 border border-cream-300 text-left space-y-3 text-xs text-chocolate-800">
          <div className="flex justify-between border-b border-cream-200 pb-2">
            <span className="text-chocolate-500">Service:</span>
            <span className="font-bold text-chocolate-900">{selectedService.title}</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-2">
            <span className="text-chocolate-500">Pet:</span>
            <span className="font-bold text-chocolate-900">{selectedPet?.name} ({selectedPet?.breed})</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-2">
            <span className="text-chocolate-500">Date & Time:</span>
            <span className="font-bold text-chocolate-900">{selectedDate} at {selectedTime}</span>
          </div>
          <div className="flex justify-between border-b border-cream-200 pb-2">
            <span className="text-chocolate-500">Estimated Total:</span>
            <span className="font-black text-terracotta-600 text-sm">${selectedService.startingPrice}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-chocolate-500">Location:</span>
            <span className="font-semibold text-chocolate-900">742 Evergreen Wellness Ave, Suite 100</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link to={`/dashboard/appointments/${confirmedBookingId}`} className="w-full sm:w-auto">
            <Button variant="terracotta" size="md" className="w-full justify-center shadow-warm-sm font-bold hover:scale-103 transition-transform">
              View Appointment Receipt
            </Button>
          </Link>

          <Link to="/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" size="md" className="w-full justify-center hover:scale-103 transition-transform">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <Badge variant="terracotta" size="sm" withPaw className="mb-2">
          Step-by-Step Scheduling
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
          Book Care Appointment
        </h1>
        <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
          Reserve your preferred time with licensed clinicians or certified master stylists.
        </p>
      </div>

      {/* Stepper Progress Bar with animated layoutId */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-cream-300 shadow-warm-xs flex items-center justify-between overflow-x-auto gap-2 relative">
        {steps.map((s) => {
          const isActive = s.num === currentStep;
          const isCompleted = s.num < currentStep;

          return (
            <button
              key={s.num}
              onClick={() => {
                if (isCompleted) {
                  setDirection(s.num > currentStep ? 1 : -1);
                  setCurrentStep(s.num);
                }
              }}
              disabled={s.num > currentStep}
              className={`relative flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap z-10 ${
                isActive
                  ? 'text-white'
                  : isCompleted
                  ? 'bg-sage-100 text-sage-800 cursor-pointer hover:bg-sage-200'
                  : 'bg-cream-100 text-chocolate-400 opacity-60 cursor-not-allowed'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeStepPill"
                  className="absolute inset-0 bg-chocolate-900 rounded-full shadow-warm-xs -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px]">
                {isCompleted ? '✓' : s.num}
              </span>
              <span>{s.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Step Container with Slide Transitions */}
      <div className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 min-h-[420px] flex flex-col justify-between overflow-hidden card-hover-glow relative">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={stepVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="flex-1 flex flex-col justify-between"
          >
            {/* STEP 1: CHOOSE PET */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 1: Choose Pet</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Select the companion who will be visiting us.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pets.map((pet) => {
                    const isSelected = selectedPetId === pet.id;
                    return (
                      <motion.button
                        key={pet.id}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedPetId(pet.id)}
                        className={`p-5 rounded-3xl border-2 transition-all flex items-center gap-4 text-left group ${
                          isSelected
                            ? 'border-terracotta-500 bg-terracotta-50/60 shadow-warm-sm ring-2 ring-terracotta-400/20'
                            : 'border-cream-300 bg-white hover:border-terracotta-300'
                        }`}
                      >
                        <img
                          src={pet.photo}
                          alt={pet.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-cream-200 shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="text-base font-bold text-chocolate-900 truncate">{pet.name}</h4>
                            {isSelected && <CheckCircle2 className="w-5 h-5 text-terracotta-500 animate-bounce" />}
                          </div>
                          <span className="text-xs text-chocolate-600 block truncate">{pet.breed}</span>
                          <span className="text-[11px] text-terracotta-600 font-semibold">{pet.weight} {pet.weightUnit}</span>
                        </div>
                      </motion.button>
                    );
                  })}

                  <Link
                    to="/dashboard/pets/new"
                    className="p-5 rounded-3xl border-2 border-dashed border-terracotta-300 hover:bg-terracotta-50/50 transition-all flex flex-col items-center justify-center gap-2 text-center text-terracotta-700 font-bold text-xs"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Add Another Pet First</span>
                  </Link>
                </div>
              </div>
            )}

            {/* STEP 2: CHOOSE SERVICE */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 2: Choose Care Service</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Select from our signature grooming, medical, or wellness treatments.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = selectedServiceId === service.id;
                    return (
                      <motion.button
                        key={service.id}
                        type="button"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`p-5 rounded-3xl border-2 transition-all flex flex-col justify-between text-left group ${
                          isSelected
                            ? 'border-terracotta-500 bg-terracotta-50/60 shadow-warm-sm ring-2 ring-terracotta-400/20'
                            : 'border-cream-300 bg-white hover:border-terracotta-300'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-base font-bold text-chocolate-900">{service.title}</h4>
                            <span className="text-base font-black text-terracotta-600">${service.startingPrice}</span>
                          </div>
                          <p className="text-xs text-chocolate-600 leading-relaxed mb-3">{service.shortDescription}</p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-cream-200 text-xs text-chocolate-500">
                          <span className="flex items-center gap-1 font-semibold text-chocolate-800">
                            <Clock className="w-3.5 h-3.5 text-terracotta-500" /> {service.duration}
                          </span>
                          {isSelected && (
                            <span className="text-terracotta-600 font-bold flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Selected
                            </span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: CHOOSE DATE */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 3: Select Date</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Pick a convenient date for your visit.</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <Input
                    label="Appointment Date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    leftIcon={<Calendar className="w-4 h-4" />}
                    required
                  />

                  <div className="p-4 bg-cream-100 rounded-2xl border border-cream-300 text-xs text-chocolate-800 space-y-1">
                    <span className="font-bold text-chocolate-900 block flex items-center gap-1">
                      <SparkleIllustration size={12} color="#D97746" /> Available Operating Hours:
                    </span>
                    <p>Monday to Friday: 8:00 AM – 7:30 PM</p>
                    <p>Saturday & Sunday: 9:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: CHOOSE TIME */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 4: Select Time Slot</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Available real-time slots on {selectedDate}:</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <motion.button
                        key={slot.time}
                        type="button"
                        disabled={!slot.available}
                        whileHover={slot.available ? { scale: 1.03 } : {}}
                        whileTap={slot.available ? { scale: 0.97 } : {}}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                          !slot.available
                            ? 'border-cream-200 bg-cream-100/50 opacity-40 cursor-not-allowed'
                            : isSelected
                            ? 'border-terracotta-500 bg-terracotta-50 text-chocolate-950 font-black shadow-warm-xs ring-2 ring-terracotta-400/20'
                            : 'border-cream-300 bg-white hover:border-terracotta-300 font-bold'
                        }`}
                      >
                        <span className="text-sm">{slot.time}</span>
                        <span className="text-[10px] text-chocolate-500 font-medium">
                          {slot.available ? slot.period : 'Unavailable'}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: ADDITIONAL NOTES */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 5: Symptoms & Handling Notes</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Let our clinicians and stylists know anything special about {selectedPet?.name}.</p>
                </div>

                <div className="space-y-4 max-w-xl mx-auto">
                  <Input
                    label="Primary Reason for Visit / Desired Styling"
                    placeholder="e.g. Routine summer coat trim & ear check"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  />

                  <div className="w-full">
                    <label className="block text-sm font-semibold text-chocolate-900 mb-1.5">
                      Special Comfort Instructions or Symptoms
                    </label>
                    <textarea
                      rows={4}
                      value={specialInstructions}
                      onChange={(e) => setSpecialInstructions(e.target.value)}
                      placeholder="e.g. Gets a little nervous with nail clippers; prefers treats beforehand."
                      className="w-full rounded-2xl bg-white border border-cream-300 px-4 py-3 text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400 transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW & CONFIRM */}
            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-chocolate-900">Step 6: Review & Confirm</h2>
                  <p className="text-xs text-chocolate-600 mt-1">Please review the details before confirming.</p>
                </div>

                <div className="bg-cream-100/90 rounded-3xl p-6 sm:p-8 border border-cream-300 space-y-4 max-w-xl mx-auto text-xs text-chocolate-800">
                  <div className="flex items-center gap-4 pb-4 border-b border-cream-200">
                    <img src={selectedPet?.photo} alt={selectedPet?.name} className="w-14 h-14 rounded-2xl object-cover border border-white" />
                    <div>
                      <h3 className="text-base font-bold text-chocolate-900">{selectedPet?.name}</h3>
                      <span className="text-chocolate-600">{selectedPet?.breed} • {selectedPet?.weight} {selectedPet?.weightUnit}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-chocolate-500 block">Care Service:</span>
                      <span className="font-bold text-chocolate-900">{selectedService.title}</span>
                    </div>
                    <div>
                      <span className="text-chocolate-500 block">Est. Duration:</span>
                      <span className="font-bold text-chocolate-900">{selectedService.duration}</span>
                    </div>
                    <div>
                      <span className="text-chocolate-500 block">Scheduled Date:</span>
                      <span className="font-bold text-chocolate-900">{selectedDate}</span>
                    </div>
                    <div>
                      <span className="text-chocolate-500 block">Selected Slot:</span>
                      <span className="font-bold text-chocolate-900">{selectedTime}</span>
                    </div>
                  </div>

                  {reason && (
                    <div className="pt-3 border-t border-cream-200">
                      <span className="text-chocolate-500 block">Visit Notes:</span>
                      <span className="font-semibold text-chocolate-900 italic">"{reason}"</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-cream-200 flex items-center justify-between text-sm">
                    <span className="font-bold text-chocolate-900">Total Starting Rate:</span>
                    <span className="font-black text-terracotta-600 text-lg">${selectedService.startingPrice}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="pt-8 mt-6 border-t border-cream-200 flex items-center justify-between">
              {currentStep > 1 ? (
                <Button
                  type="button"
                  variant="secondary"
                  size="md"
                  onClick={handlePrevStep}
                  leftIcon={<ArrowLeft className="w-4 h-4" />}
                >
                  Previous
                </Button>
              ) : (
                <div />
              )}

              {currentStep < 6 ? (
                <Button
                  type="button"
                  variant="terracotta"
                  size="md"
                  onClick={handleNextStep}
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  className="shadow-warm-sm font-bold hover:scale-103 transition-transform"
                >
                  Continue to {steps[currentStep].label}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="terracotta"
                  size="lg"
                  isLoading={isSubmitting}
                  onClick={handleConfirmAppointment}
                  rightIcon={<Sparkles className="w-4 h-4" />}
                  className="shadow-warm-md font-bold hover:scale-105 transition-all"
                >
                  Confirm Appointment Now
                </Button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
