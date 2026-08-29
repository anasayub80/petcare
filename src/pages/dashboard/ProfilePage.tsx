import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { IMAGES } from '../../data/images';
import { User, Mail, Phone, MapPin, ShieldCheck, Save, CheckCircle2, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PRESET_AVATARS = [
  { label: 'Emily', url: IMAGES.testimonials.emily },
  { label: 'Jason', url: IMAGES.testimonials.jason },
  { label: 'Sophia', url: IMAGES.testimonials.sophia },
  { label: 'Michael', url: IMAGES.testimonials.michael },
];

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [emergencyContact, setEmergencyContact] = useState(user?.emergencyContact || '');
  const [avatar, setAvatar] = useState(user?.avatar || PRESET_AVATARS[0].url);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name,
      email,
      phone,
      address,
      city,
      emergencyContact,
      avatar,
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <Badge variant="terracotta" size="sm" withPaw className="mb-2">
          Account Details
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
          Parent Profile & Contact Info
        </h1>
        <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
          Update your contact preferences, emergency info, and linked profile avatar.
        </p>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 space-y-8"
      >
        {/* Avatar Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-cream-200">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-warm-md shrink-0">
            <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 space-y-2 text-center sm:text-left">
            <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
              Choose Profile Photo
            </span>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {PRESET_AVATARS.map((a, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setAvatar(a.url)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                    avatar === a.url
                      ? 'bg-chocolate-900 text-white border-chocolate-900 font-bold'
                      : 'bg-cream-100 text-chocolate-800 border-cream-300 hover:bg-cream-200'
                  }`}
                >
                  {a.label}
                </button>
              ))}
            </div>
            <Input
              placeholder="Or paste an avatar URL..."
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
              className="text-xs py-2 mt-1"
            />
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4" />}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            leftIcon={<Mail className="w-4 h-4" />}
            required
          />

          <Input
            label="Primary Phone Number"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            leftIcon={<Phone className="w-4 h-4" />}
            required
          />

          <Input
            label="Emergency Contact Person & Phone"
            placeholder="e.g. David Jenkins - (555) 987-6543"
            value={emergencyContact}
            onChange={(e) => setEmergencyContact(e.target.value)}
            leftIcon={<ShieldCheck className="w-4 h-4" />}
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-cream-200">
          <Input
            label="Street Address"
            placeholder="742 Evergreen Terrace"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            leftIcon={<MapPin className="w-4 h-4" />}
          />

          <Input
            label="City & State"
            placeholder="San Francisco, CA"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>

        {/* Save Bar */}
        <div className="pt-6 border-t border-cream-200 flex items-center justify-between">
          <div>
            {isSaved && (
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Profile Updated Successfully!
              </span>
            )}
          </div>

          <Button
            type="submit"
            variant="terracotta"
            size="lg"
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-warm-sm font-bold"
          >
            Save Profile Changes
          </Button>
        </div>
      </motion.form>
    </div>
  );
};
