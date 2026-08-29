import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Select } from './Select';
import { SERVICES_DATA } from '../../data/mockData';
import { Calendar, Clock, CheckCircle2, Heart, Sparkles } from 'lucide-react';
import { Badge } from './Badge';

export interface BookingModalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
}

export const BookingModalPreview: React.FC<BookingModalPreviewProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [serviceId, setServiceId] = useState(preselectedServiceId || 'grooming');
  const [petName, setPetName] = useState('');
  const [species, setSpecies] = useState('Dog');
  const [breed, setBreed] = useState('');
  const [date, setDate] = useState('2026-09-02');
  const [time, setTime] = useState('10:00 AM');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update selected service if preselectedServiceId changes
  React.useEffect(() => {
    if (preselectedServiceId) {
      setServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D97746', '#221612', '#648B73', '#F1B267'],
      });
    }, 800);
  };

  const handleResetAndClose = () => {
    setStep('form');
    onClose();
  };

  const selectedService = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleResetAndClose}
      maxWidth="xl"
      title={step === 'form' ? 'Schedule a Pet Appointment' : undefined}
      subtitle={
        step === 'form'
          ? 'Fast-track your booking preview for professional grooming, veterinary, or wellness care.'
          : undefined
      }
    >
      {step === 'form' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-cream-100/90 rounded-2xl p-3.5 border border-cream-300 flex items-center justify-between text-xs text-chocolate-800">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-terracotta-500 shrink-0" />
              <span>Phase 1 Design Preview • Real-time instant confirmation active</span>
            </div>
            <Badge variant="terracotta" size="sm">Phase 1 Preview</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select
              label="Select Service"
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              options={SERVICES_DATA.map((s) => ({
                value: s.id,
                label: `${s.title} (From $${s.startingPrice})`,
              }))}
            />

            <Select
              label="Pet Species"
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
              options={[
                { value: 'Dog', label: 'Dog 🐶' },
                { value: 'Cat', label: 'Cat 🐱' },
                { value: 'Rabbit', label: 'Rabbit 🐰' },
                { value: 'Other', label: 'Other Companion' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Pet Name"
              placeholder="e.g. Milo"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
            />
            <Input
              label="Breed / Mix"
              placeholder="e.g. Golden Retriever"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Preferred Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              leftIcon={<Calendar className="w-4 h-4" />}
              required
            />
            <Select
              label="Preferred Time Slot"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              leftIcon={<Clock className="w-4 h-4" />}
              options={[
                { value: '09:00 AM', label: '09:00 AM (Early Morning)' },
                { value: '10:30 AM', label: '10:30 AM (Popular)' },
                { value: '01:00 PM', label: '01:00 PM (Afternoon)' },
                { value: '03:30 PM', label: '03:30 PM (Late Afternoon)' },
                { value: '05:00 PM', label: '05:00 PM (Evening)' },
              ]}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1 border-t border-cream-200">
            <Input
              label="Your Full Name"
              placeholder="e.g. Jessica Miller"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
            <Input
              label="Phone Number"
              placeholder="(555) 234-5678"
              type="tel"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
              required
            />
          </div>

          <div className="pt-3 flex items-center justify-between gap-3">
            <div className="text-xs text-chocolate-600">
              Est. Duration: <span className="font-semibold text-chocolate-900">{selectedService.duration}</span>
            </div>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={handleResetAndClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="terracotta"
                size="md"
                isLoading={isSubmitting}
                rightIcon={<Sparkles className="w-4 h-4" />}
              >
                Confirm Appointment
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full mx-auto flex items-center justify-center shadow-warm-sm animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="font-script text-2xl text-terracotta-600 font-bold block mb-1">
              Hooray! See you soon!
            </span>
            <h3 className="text-2xl font-bold text-chocolate-900">
              Appointment Reserved for {petName || 'Your Pet'}!
            </h3>
            <p className="text-sm text-chocolate-700/80 mt-2 max-w-md mx-auto">
              We’ve reserved a slot for <strong>{selectedService.title}</strong> on{' '}
              <strong>{date}</strong> at <strong>{time}</strong>.
            </p>
          </div>

          <div className="bg-cream-100 rounded-2xl p-4 max-w-md mx-auto text-left border border-cream-300 space-y-2 text-xs text-chocolate-800">
            <div className="flex justify-between">
              <span className="text-chocolate-500">Service:</span>
              <span className="font-semibold text-chocolate-900">{selectedService.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate-500">Estimated Price:</span>
              <span className="font-semibold text-chocolate-900">Starting at ${selectedService.startingPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate-500">Care Location:</span>
              <span className="font-semibold text-chocolate-900">742 Evergreen Wellness Ave, Suite 100</span>
            </div>
            <div className="flex justify-between">
              <span className="text-chocolate-500">Digital Reminders:</span>
              <span className="text-sage-700 font-medium">Enabled via SMS/Email</span>
            </div>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <Button variant="primary" size="md" onClick={handleResetAndClose} leftIcon={<Heart className="w-4 h-4 text-terracotta-400" />}>
              Done & Return
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
