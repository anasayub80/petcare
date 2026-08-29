import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { usePetCare } from '../../context/PetCareContext';
import { SERVICES_DATA } from '../../data/mockData';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  RotateCcw,
  Ban,
  CheckCircle2,
  AlertCircle,
  MapPin,
  FileText,
  Phone,
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AppointmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getAppointmentById, pets, rescheduleAppointment, cancelAppointment } = usePetCare();
  const navigate = useNavigate();

  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [newDate, setNewDate] = useState('2026-09-15');
  const [newTime, setNewTime] = useState('10:00 AM');

  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('Schedule conflict');

  const apt = id ? getAppointmentById(id) : undefined;
  const pet = apt ? pets.find((p) => p.id === apt.petId) : undefined;
  const service = apt ? SERVICES_DATA.find((s) => s.id === apt.serviceId) : undefined;

  if (!apt) {
    return (
      <div className="text-center py-20 space-y-4">
        <h2 className="text-2xl font-bold text-chocolate-900">Appointment Not Found</h2>
        <p className="text-sm text-chocolate-600">The appointment you requested does not exist.</p>
        <Link to="/dashboard/appointments">
          <Button variant="terracotta" size="md">Back to Appointments</Button>
        </Link>
      </div>
    );
  }

  const handleReschedule = (e: React.FormEvent) => {
    e.preventDefault();
    rescheduleAppointment(apt.id, newDate, newTime);
    setIsRescheduleOpen(false);
  };

  const handleCancel = (e: React.FormEvent) => {
    e.preventDefault();
    cancelAppointment(apt.id, cancelReason);
    setIsCancelOpen(false);
  };

  const statusBadgeMap: Record<string, string> = {
    Confirmed: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    Pending: 'bg-amber-50 text-amber-800 border-amber-200',
    'In Progress': 'bg-sky-50 text-sky-800 border-sky-200',
    Completed: 'bg-cream-200 text-chocolate-800 border-cream-300',
    Cancelled: 'bg-rose-50 text-rose-800 border-rose-200',
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          to="/dashboard/appointments"
          className="inline-flex items-center gap-2 text-xs font-bold text-chocolate-700 hover:text-terracotta-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Appointments</span>
        </Link>

        <span className="text-xs font-mono font-bold text-chocolate-500">
          Booking Ref: {apt.bookingNumber}
        </span>
      </div>

      {/* Main Receipt Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 space-y-8"
      >
        {/* Top Status Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-cream-200">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border ${
                  statusBadgeMap[apt.status] || 'bg-cream-100'
                }`}
              >
                {apt.status}
              </span>
              <span className="text-xs text-chocolate-500">
                Booked on {apt.createdAt}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
              {service?.title || 'Care Service'}
            </h1>
          </div>

          <div className="text-left sm:text-right">
            <span className="text-xs text-chocolate-500 block">Service Total</span>
            <span className="text-3xl font-black text-chocolate-900">${apt.price}</span>
          </div>
        </div>

        {/* Pet & Care Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pet Information */}
          <div className="p-5 rounded-3xl bg-cream-100/70 border border-cream-300 space-y-3">
            <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
              Companion Details
            </span>
            <div className="flex items-center gap-3.5">
              <img
                src={pet?.photo}
                alt={pet?.name}
                className="w-14 h-14 rounded-2xl object-cover border border-white shrink-0"
              />
              <div>
                <h4 className="text-base font-bold text-chocolate-900">{pet?.name}</h4>
                <span className="text-xs text-chocolate-600 block">{pet?.breed} • {pet?.weight} {pet?.weightUnit}</span>
                <Link to={`/dashboard/pets/${pet?.id}`} className="text-xs font-bold text-terracotta-600 hover:underline">
                  View Full Health Passport →
                </Link>
              </div>
            </div>
          </div>

          {/* Specialist & Location */}
          <div className="p-5 rounded-3xl bg-cream-100/70 border border-cream-300 space-y-3">
            <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
              Care Specialist & Location
            </span>
            <div className="space-y-1 text-xs text-chocolate-800">
              <p>
                <strong>Assigned Specialist:</strong> {apt.assignedStaffName || 'Lead Certified Stylist'}
              </p>
              <p className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-terracotta-500" />
                <span>742 Evergreen Wellness Ave, Suite 100</span>
              </p>
              <p className="flex items-center gap-1 text-chocolate-600">
                <Phone className="w-3.5 h-3.5 text-terracotta-500" />
                <span>(800) 555-PAWS (7297)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Schedule Timing Box */}
        <div className="p-6 rounded-3xl bg-sand-50 border border-sand-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shrink-0 shadow-warm-xs">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-chocolate-600 font-semibold block">Scheduled Appointment</span>
              <span className="text-lg font-bold text-chocolate-900">
                {apt.date} at {apt.startTime}
              </span>
            </div>
          </div>

          <span className="text-xs font-semibold text-chocolate-700 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-terracotta-500" /> Duration: {service?.duration || '60 min'}
          </span>
        </div>

        {/* Customer Notes */}
        {apt.customerNotes && (
          <div className="p-5 rounded-2xl bg-cream-50 border border-cream-200 text-xs text-chocolate-800 space-y-1">
            <span className="font-bold text-chocolate-900 block flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-terracotta-500" /> Customer Notes & Symptoms:
            </span>
            <p className="italic leading-relaxed">"{apt.customerNotes}"</p>
          </div>
        )}

        {/* Cancellation Reason if Cancelled */}
        {apt.status === 'Cancelled' && (
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1">
            <span className="font-bold block flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-rose-600" /> Cancellation Reason:
            </span>
            <p>{apt.cancellationReason || 'Cancelled upon customer request.'}</p>
          </div>
        )}

        {/* Actions Bar */}
        <div className="pt-6 border-t border-cream-200 flex flex-wrap items-center justify-between gap-3">
          <Link to="/dashboard/appointments">
            <Button variant="ghost" size="sm">
              Back to List
            </Button>
          </Link>

          <div className="flex items-center gap-2">
            {apt.status === 'Confirmed' && (
              <>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setIsRescheduleOpen(true)}
                  leftIcon={<RotateCcw className="w-4 h-4" />}
                  className="text-xs font-bold"
                >
                  Reschedule Time
                </Button>

                <Button
                  variant="ghost"
                  size="md"
                  onClick={() => setIsCancelOpen(true)}
                  leftIcon={<Ban className="w-4 h-4 text-rose-500" />}
                  className="text-xs text-rose-600 hover:bg-rose-50"
                >
                  Cancel Visit
                </Button>
              </>
            )}

            {apt.status === 'Completed' && (
              <Link to={`/dashboard/book?petId=${pet?.id}&serviceId=${service?.id}`}>
                <Button variant="terracotta" size="md" className="shadow-warm-sm font-bold">
                  Book Again for {pet?.name}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </motion.div>

      {/* Reschedule Modal */}
      <Modal
        isOpen={isRescheduleOpen}
        onClose={() => setIsRescheduleOpen(false)}
        maxWidth="md"
        title="Reschedule Appointment"
      >
        <form onSubmit={handleReschedule} className="space-y-4">
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
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsRescheduleOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="terracotta" size="md">
              Confirm Reschedule
            </Button>
          </div>
        </form>
      </Modal>

      {/* Cancel Modal */}
      <Modal
        isOpen={isCancelOpen}
        onClose={() => setIsCancelOpen(false)}
        maxWidth="sm"
        title="Cancel Appointment?"
      >
        <form onSubmit={handleCancel} className="space-y-4 text-xs">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 text-rose-900 leading-relaxed">
            Are you sure you wish to cancel this appointment for <strong>{pet?.name}</strong>?
          </div>

          <Select
            label="Reason for Cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            options={[
              { value: 'Schedule conflict', label: 'Schedule conflict' },
              { value: 'Pet feeling better / not needed', label: 'Pet feeling better / not needed' },
              { value: 'Need different service', label: 'Need different service' },
              { value: 'Other reason', label: 'Other reason' },
            ]}
          />

          <div className="pt-3 flex justify-end gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={() => setIsCancelOpen(false)}>
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
