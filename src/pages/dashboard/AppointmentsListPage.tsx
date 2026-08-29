import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePetCare } from '../../context/PetCareContext';
import { SERVICES_DATA } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { EmptyState } from '../../components/common/EmptyState';
import {
  Calendar,
  Clock,
  Plus,
  ShieldCheck,
  CalendarDays,
  AlertCircle,
  RotateCcw,
  Ban,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppointmentsListPage: React.FC = () => {
  const { appointments, pets, rescheduleAppointment, cancelAppointment } = usePetCare();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed' | 'cancelled' | 'all'>('upcoming');

  // Modals state
  const [rescheduleAptId, setRescheduleAptId] = useState<string | null>(null);
  const [newDate, setNewDate] = useState('2026-09-12');
  const [newTime, setNewTime] = useState('11:30 AM');

  const [cancelAptId, setCancelAptId] = useState<string | null>(null);
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const filteredAppointments = appointments.filter((apt) => {
    if (activeTab === 'upcoming') return apt.status === 'Confirmed' || apt.status === 'Pending' || apt.status === 'In Progress';
    if (activeTab === 'completed') return apt.status === 'Completed';
    if (activeTab === 'cancelled') return apt.status === 'Cancelled' || apt.status === 'No Show';
    return true;
  });

  const handleRescheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rescheduleAptId) {
      rescheduleAppointment(rescheduleAptId, newDate, newTime);
      setRescheduleAptId(null);
    }
  };

  const handleCancelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cancelAptId) {
      cancelAppointment(cancelAptId, cancelReason);
      setCancelAptId(null);
    }
  };

  const statusBadgeMap: Record<string, string> = {
    Confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    'In Progress': 'bg-sky-50 text-sky-800 border-sky-200',
    Completed: 'bg-cream-200 text-chocolate-800 border-cream-300',
    Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
    'No Show': 'bg-chocolate-100 text-chocolate-600 border-chocolate-200',
  };

  const tabs = [
    { id: 'upcoming', label: `Upcoming (${appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Pending').length})` },
    { id: 'completed', label: `Completed (${appointments.filter((a) => a.status === 'Completed').length})` },
    { id: 'cancelled', label: `Cancelled (${appointments.filter((a) => a.status === 'Cancelled').length})` },
    { id: 'all', label: `All History (${appointments.length})` },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="terracotta" size="sm" withPaw className="mb-2">
            Care History & Schedule
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            My Appointments
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Track upcoming visits, reschedule times, or review past care reports.
          </p>
        </div>

        <Link to="/dashboard/book">
          <Button
            variant="terracotta"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-warm-sm font-bold hover:scale-103 transition-transform"
            data-cursor="book"
            data-cursor-text="Book"
          >
            Book New Appointment
          </Button>
        </Link>
      </div>

      {/* Tabs Bar with layoutId animated pill */}
      <div className="flex items-center gap-2 border-b border-cream-200 pb-3 overflow-x-auto no-scrollbar relative">
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
                  layoutId="appointmentsTabPill"
                  className="absolute inset-0 bg-chocolate-900 rounded-2xl shadow-warm-xs -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Appointments List */}
      {filteredAppointments.length === 0 ? (
        /* Empty State */
        <EmptyState
          type="no-appointments"
          title="No Appointments in this category"
          description="Ready to schedule grooming or a veterinary wellness exam for your pet?"
          actionText="Schedule Appointment"
          onAction={() => window.location.assign('/dashboard/book')}
        />
      ) : (
        <div className="space-y-4">
          {filteredAppointments.map((apt, idx) => {
            const pet = pets.find((p) => p.id === apt.petId);
            const service = SERVICES_DATA.find((s) => s.id === apt.serviceId);

            return (
              <motion.div
                key={apt.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-3xl sm:rounded-4xl p-6 sm:p-7 shadow-warm-md border border-cream-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 hover:shadow-warm-lg transition-all card-hover-glow hover:-translate-y-0.5"
                data-cursor="view"
                data-cursor-text="Receipt"
              >
                {/* Left Info: Pet & Service */}
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={pet?.photo}
                    alt={pet?.name}
                    className="w-16 h-16 rounded-2xl object-cover border border-cream-200 shrink-0 shadow-warm-xs"
                  />
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-chocolate-500 font-bold">
                        {apt.bookingNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${statusBadgeMap[apt.status] || 'bg-cream-100 text-chocolate-800'
                          }`}
                      >
                        {apt.status}
                      </span>
                    </div>

                    <h3 className="text-lg font-black text-chocolate-900 leading-tight">
                      {service?.title || 'Care Service'} —{' '}
                      <span className="text-terracotta-600 font-serif italic">
                        {pet?.name}
                      </span>
                    </h3>

                    <p className="text-xs text-chocolate-600 mt-1">
                      Specialist: <strong>{apt.assignedStaffName || 'Assigned Specialist'}</strong>
                    </p>
                  </div>
                </div>

                {/* Middle Info: Date & Time */}
                <div className="flex items-center gap-6 text-xs text-chocolate-800 bg-cream-100/60 p-3.5 px-5 rounded-2xl border border-cream-200">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-terracotta-500 shrink-0" />
                    <div>
                      <span className="text-chocolate-500 text-[10px] block">Date</span>
                      <span className="font-bold text-chocolate-900">{apt.date}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 border-l border-cream-300 pl-4">
                    <Clock className="w-4 h-4 text-terracotta-500 shrink-0" />
                    <div>
                      <span className="text-chocolate-500 text-[10px] block">Time Slot</span>
                      <span className="font-bold text-chocolate-900">{apt.startTime}</span>
                    </div>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 w-full lg:w-auto justify-end">
                  <Link to={`/dashboard/appointments/${apt.id}`}>
                    <Button variant="secondary" size="sm" className="text-xs font-bold hover:scale-103 transition-transform">
                      View Details
                    </Button>
                  </Link>

                  {apt.status === 'Confirmed' && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setRescheduleAptId(apt.id);
                          setNewDate(apt.date);
                          setNewTime(apt.startTime);
                        }}
                        leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
                        className="text-xs hover:scale-103 transition-transform"
                      >
                        Reschedule
                      </Button>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setCancelAptId(apt.id)}
                        leftIcon={<Ban className="w-3.5 h-3.5 text-rose-500" />}
                        className="text-xs text-rose-600 hover:bg-rose-50 hover:scale-103 transition-transform"
                      >
                        Cancel
                      </Button>
                    </>
                  )}

                  {apt.status === 'Completed' && (
                    <Link to={`/dashboard/book?petId=${pet?.id}&serviceId=${service?.id}`}>
                      <Button variant="terracotta" size="sm" className="text-xs font-bold hover:scale-103 transition-transform">
                        Book Again
                      </Button>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Reschedule Modal */}
      <Modal
        isOpen={!!rescheduleAptId}
        onClose={() => setRescheduleAptId(null)}
        maxWidth="md"
        title="Reschedule Appointment"
        subtitle="Choose a new date and time slot for your pet's visit."
      >
        <form onSubmit={handleRescheduleSubmit} className="space-y-4">
          <Input
            label="New Date"
            type="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
            required
          />

          <Select
            label="New Time Slot"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
            options={[
              { value: '09:00 AM', label: '09:00 AM (Morning)' },
              { value: '10:00 AM', label: '10:00 AM (Morning)' },
              { value: '11:30 AM', label: '11:30 AM (Late Morning)' },
              { value: '01:30 PM', label: '01:30 PM (Afternoon)' },
              { value: '03:30 PM', label: '03:30 PM (Late Afternoon)' },
              { value: '05:00 PM', label: '05:00 PM (Evening)' },
            ]}
          />

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setRescheduleAptId(null)}>
              Cancel
            </Button>
            <Button type="submit" variant="terracotta" size="md">
              Confirm Reschedule
            </Button>
          </div>
        </form>
      </Modal>

      {/* Cancel Confirmation Modal */}
      <Modal
        isOpen={!!cancelAptId}
        onClose={() => setCancelAptId(null)}
        maxWidth="sm"
        title="Cancel Appointment?"
      >
        <form onSubmit={handleCancelSubmit} className="space-y-4 text-xs">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-rose-900 leading-relaxed">
              Are you sure you wish to cancel this appointment? The time slot will be released back to the clinic calendar.
            </p>
          </div>

          <Select
            label="Reason for Cancellation (Optional)"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            options={[
              { value: 'Schedule conflict', label: 'Schedule conflict' },
              { value: 'Pet feeling better / not needed', label: 'Pet feeling better / not needed' },
              { value: 'Need different service', label: 'Need different service' },
              { value: 'Other reason', label: 'Other personal reason' },
            ]}
          />

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setCancelAptId(null)}>
              Keep Appointment
            </Button>
            <Button type="submit" variant="terracotta" size="sm" className="bg-rose-600 hover:bg-rose-700">
              Confirm Cancellation
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
