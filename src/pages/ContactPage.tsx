import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { MagneticButton } from '../components/common/MagneticButton';
import { PawIllustration, SparkleIllustration } from '../components/common/PetIllustrations';
import { FAQ_DATA } from '../data/mockData';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, AlertCircle, HelpCircle, ChevronDown } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    petName: '',
    topic: 'General Inquiry',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleOpenBooking = () => {
    if (isAuthenticated) {
      navigate('/dashboard/book');
    } else {
      navigate('/login?redirect=%2Fdashboard%2Fbook');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D97746', '#221612', '#648B73'],
      });
    }, 700);
  };

  return (
    <div className="pt-32 pb-24 sm:pt-36 sm:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Decorative background paw watermark */}
        <div className="absolute top-20 right-0 opacity-10 pointer-events-none text-terracotta-500 hidden lg:block">
          <PawIllustration size={160} variant="floatSlow" />
        </div>

        {/* Page Header */}
        <SectionHeader
          eyebrow="Get In Touch"
          cursiveSubtitle="We’d Love to Hear From You"
          title="Contact Our Clinic & Care Coordinators"
          description="Have a question about a treatment plan, dietary questions, or want to schedule a visit? Our friendly care coordinators are here for you."
        />

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24 relative z-10">
          {/* Left Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 card-hover-glow"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <div className="w-16 h-16 bg-sage-100 text-sage-600 rounded-full mx-auto flex items-center justify-center shadow-warm-sm animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-chocolate-900">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-chocolate-700 max-w-md mx-auto">
                  Thank you, <strong>{formData.fullName}</strong>. One of our care coordinators will reach back out to you and {formData.petName || 'your pet'} within 2–4 hours.
                </p>
                <div className="pt-4">
                  <Button
                    variant="terracotta"
                    size="md"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        petName: '',
                        topic: 'General Inquiry',
                        message: '',
                      });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-cream-200 text-xs text-chocolate-600 font-semibold">
                  <MessageSquare className="w-4 h-4 text-terracotta-500" />
                  <span>Send a Direct Message to Our Clinic Staff</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    placeholder="e.g. Alex Morgan"
                    value={formData.fullName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    placeholder="(555) 123-4567"
                    type="tel"
                    value={formData.phone}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                  <Input
                    label="Pet’s Name & Breed"
                    placeholder="e.g. Milo (Golden Retriever)"
                    value={formData.petName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, petName: e.target.value })}
                  />
                </div>

                <Select
                  label="Inquiry Topic"
                  value={formData.topic}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFormData({ ...formData, topic: e.target.value })}
                  options={[
                    { value: 'General Inquiry', label: 'General Inquiry' },
                    { value: 'Grooming Services', label: 'Grooming & Spa Consultation' },
                    { value: 'Veterinary Checkup', label: 'Veterinary Health & Diagnostics' },
                    { value: 'Vaccine Passport', label: 'Vaccination Schedules & Reminders' },
                    { value: 'Emergency Triage', label: 'Urgent Non-Critical Care' },
                  ]}
                />

                <div className="w-full">
                  <label className="block text-sm font-semibold text-chocolate-900 mb-1.5">
                    Your Message / Pet Details
                  </label>
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us how we can help your pet..."
                    required
                    className="w-full rounded-2xl bg-white border border-cream-300 px-4 py-3 text-chocolate-900 text-sm placeholder:text-chocolate-400 focus:outline-none focus:ring-2 focus:ring-terracotta-400 focus:border-terracotta-400 transition-all shadow-warm-xs"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs text-chocolate-500">
                    🔒 We respect your privacy & never share info.
                  </span>
                  <MagneticButton strength={0.25} maxDistance={5}>
                    <Button
                      type="submit"
                      variant="terracotta"
                      size="md"
                      isLoading={isLoading}
                      rightIcon={<Send className="w-4 h-4" />}
                      className="shadow-warm-sm hover:scale-105 font-bold transition-all"
                      data-cursor="hover"
                    >
                      Send Message
                    </Button>
                  </MagneticButton>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Contact Cards & Clinic Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="bg-chocolate-900 text-cream-50 rounded-3xl p-6 sm:p-8 shadow-warm-lg space-y-6 card-hover-glow">
              <div>
                <Badge variant="terracotta" size="sm" withPaw className="mb-3">
                  Clinic Location
                </Badge>
                <h3 className="text-xl font-bold text-white">
                  Main Wellness Center
                </h3>
                <p className="text-xs text-cream-300 mt-1">
                  Accredited fear-free pet clinic & luxury spa lounge.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-cream-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Address:</span>
                    <span>742 Evergreen Wellness Ave, Suite 100, West District</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Direct Line:</span>
                    <a href="tel:+18005557297" className="hover:text-terracotta-400 transition-colors">
                      (800) 555-PAWS (7297)
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-terracotta-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block">Email:</span>
                    <a href="mailto:care@pawsclaws.care" className="hover:text-terracotta-400 transition-colors">
                      care@pawsclaws.care
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours Schedule */}
              <div className="pt-4 border-t border-chocolate-800 space-y-2 text-xs">
                <span className="font-bold text-white block flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-terracotta-400" /> Operating Schedule:
                </span>
                <div className="flex justify-between text-cream-300">
                  <span>Monday – Friday:</span>
                  <span className="font-semibold text-white">8:00 AM – 7:30 PM</span>
                </div>
                <div className="flex justify-between text-cream-300">
                  <span>Saturday – Sunday:</span>
                  <span className="font-semibold text-white">9:00 AM – 6:00 PM</span>
                </div>
              </div>

              {/* Booking Shortcut Button with Magnetic pull */}
              <div className="pt-2">
                <MagneticButton strength={0.25} maxDistance={5} className="w-full">
                  <Button
                    variant="terracotta"
                    size="md"
                    onClick={handleOpenBooking}
                    className="w-full justify-center shadow-warm-sm font-bold hover:scale-103 transition-transform"
                    data-cursor="book"
                    data-cursor-text="Book"
                  >
                    Schedule Appointment Directly
                  </Button>
                </MagneticButton>
              </div>
            </div>

            {/* Urgent Care Notice */}
            <div className="bg-sand-100 rounded-3xl p-6 border border-sand-300 text-xs text-chocolate-800 space-y-2">
              <div className="flex items-center gap-2 font-bold text-chocolate-900">
                <AlertCircle className="w-4 h-4 text-amber-700" />
                <span>Need Emergency Medical Advice?</span>
              </div>
              <p className="leading-relaxed">
                If your pet has consumed a toxin or is experiencing breathing difficulty, call our 24/7 urgent nurse dispatch immediately at <strong>(800) 555-9911</strong>.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Quick FAQs */}
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            eyebrow="Quick FAQ"
            cursiveSubtitle="Need Instant Answers?"
            title="Frequently Asked Questions"
          />

          <div className="space-y-3">
            {FAQ_DATA.slice(0, 3).map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-cream-300 shadow-warm-xs overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-chocolate-900 hover:text-terracotta-600 transition-colors"
                  >
                    <span className="flex items-center gap-2.5">
                      <HelpCircle className="w-4 h-4 text-terracotta-500 shrink-0" />
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-chocolate-500 transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180 text-terracotta-600' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
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
