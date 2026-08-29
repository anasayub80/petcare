import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Heart, Phone, Mail, MapPin, Clock, ArrowRight, Instagram, Facebook, Twitter, Check } from 'lucide-react';
import { PawIllustration } from '../common/PetIllustrations';
import { motion } from 'framer-motion';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 4000);
      setEmail('');
    }
  };

  return (
    <footer className="bg-chocolate-900 text-cream-100 pt-20 pb-12 overflow-hidden relative border-t-4 border-terracotta-500">
      {/* Decorative background paw watermark */}
      <div className="absolute -right-16 -bottom-16 opacity-5 pointer-events-none text-white">
        <PawIllustration size={380} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 pb-16 border-b border-chocolate-800">
          {/* Col 1 & 2: Brand Bio */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group">
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.08 }}
                className="w-10 h-10 rounded-2xl bg-terracotta-500 text-white flex items-center justify-center shadow-warm-sm"
              >
                <PawPrint className="w-5 h-5" />
              </motion.div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight text-white leading-none">
                  Paws<span className="text-terracotta-400 font-normal italic font-serif">&</span>Claws
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-widest text-cream-400 mt-0.5">
                  Pet Care & AI Wellness
                </span>
              </div>
            </Link>

            <p className="text-cream-300/80 text-sm leading-relaxed max-w-sm">
              Setting a new standard in pet care. From luxury botanical grooming to accredited veterinary medicine and 24/7 AI-guided triage, we deliver compassionate care for the pets you love.
            </p>

            {/* Emergency Hotline Banner */}
            <div className="inline-flex items-center gap-3 bg-chocolate-800/80 border border-chocolate-700/80 rounded-2xl p-3 px-4 shadow-warm-xs">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <div className="text-xs">
                <span className="text-cream-400 block font-medium">Urgent Care Nurse Hotline:</span>
                <a href="tel:+18005557297" className="font-bold text-white hover:text-terracotta-400 transition-colors">
                  (800) 555-PAWS (7297)
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <motion.a
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                href="#instagram"
                className="w-9 h-9 rounded-full bg-chocolate-800 text-cream-300 hover:bg-terracotta-500 hover:text-white transition-colors flex items-center justify-center text-sm shadow-warm-xs"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: -6 }}
                whileTap={{ scale: 0.9 }}
                href="#facebook"
                className="w-9 h-9 rounded-full bg-chocolate-800 text-cream-300 hover:bg-terracotta-500 hover:text-white transition-colors flex items-center justify-center text-sm shadow-warm-xs"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                href="#twitter"
                className="w-9 h-9 rounded-full bg-chocolate-800 text-cream-300 hover:bg-terracotta-500 hover:text-white transition-colors flex items-center justify-center text-sm shadow-warm-xs"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Col 3: Services */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Care Services
            </h4>
            <ul className="space-y-3 text-sm text-cream-300/80">
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Luxury Pet Grooming
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Veterinary Consultation
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Vaccinations & Boosters
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Dental & Plaque Care
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Nutritional & Wellness Plans
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Fear-Free Puppy Styling
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Company */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Platform & Info
            </h4>
            <ul className="space-y-3 text-sm text-cream-300/80">
              <li>
                <Link to="/about" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  About Our Clinic
                </Link>
              </li>
              <li>
                <Link to="/about#team" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Meet the Medical Team
                </Link>
              </li>
              <li>
                <Link to="/#how-it-works" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/#ai-assistant" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  AI Pet Assistant
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Clinic Location & FAQ
                </Link>
              </li>
              <li>
                <a href="#privacy" className="hover:text-terracotta-400 transition-colors inline-block hover:translate-x-1 duration-200">
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Col 5: Hours & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Hours & Updates
            </h4>
            <div className="text-xs text-cream-300/80 space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Mon – Fri:</span> 8:00 AM – 7:30 PM
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Sat – Sun:</span> 9:00 AM – 6:00 PM
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1">
                <MapPin className="w-4 h-4 text-terracotta-400 shrink-0 mt-0.5" />
                <span>742 Evergreen Wellness Ave, Suite 100</span>
              </div>
            </div>

            <div className="pt-3">
              <span className="text-xs font-semibold text-white block mb-2">
                Join Pet Parent Newsletter
              </span>
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter your email..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-chocolate-800 border border-chocolate-700 text-white placeholder:text-cream-400/60 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-2 focus:ring-terracotta-400 pr-10 transition-all"
                  />
                  <button
                    type="submit"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 rounded-lg bg-terracotta-500 text-white hover:bg-terracotta-600 transition-colors flex items-center justify-center"
                    aria-label="Subscribe"
                  >
                    {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
                {subscribed && (
                  <motion.p
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[11px] text-sage-300 font-medium"
                  >
                    ✓ Thank you! Welcome to the pack.
                  </motion.p>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-400/80">
          <p>© {new Date().getFullYear()} Paws & Claws Platform. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-terracotta-400 fill-terracotta-400 animate-pulse" />
            <span>for happy, healthy pets everywhere.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
