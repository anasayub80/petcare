import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { Bell, Lock, Shield, Trash2, CheckCircle2, AlertCircle, Save } from 'lucide-react';
import { motion } from 'framer-motion';

export const SettingsPage: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Notification toggles
  const [emailConfirmations, setEmailConfirmations] = useState(true);
  const [smsReminders, setSmsReminders] = useState(true);
  const [vaccineAlerts, setVaccineAlerts] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  // Password fields
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaved, setPasswordSaved] = useState(false);

  // Delete modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaved(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSaved(false), 3500);
  };

  const handleDeleteAccount = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div>
        <Badge variant="terracotta" size="sm" withPaw className="mb-2">
          Preferences & Security
        </Badge>
        <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
          Account & Notification Settings
        </h1>
        <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
          Control reminder frequencies, change your password, and manage your account.
        </p>
      </div>

      {/* 1. Notification Preferences */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-md border border-cream-300 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-cream-200">
          <div className="w-10 h-10 rounded-2xl bg-terracotta-100 text-terracotta-600 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-chocolate-900">
              Notification Preferences
            </h3>
            <p className="text-xs text-chocolate-600">
              Choose how you want to receive alerts about your pets' appointments and wellness milestones.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <label className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:bg-cream-100 transition-colors">
            <div>
              <span className="text-xs sm:text-sm font-bold text-chocolate-900 block">
                Instant Appointment Confirmations
              </span>
              <span className="text-[11px] sm:text-xs text-chocolate-600">
                Receive booking numbers and calendar invites via email immediately upon reservation.
              </span>
            </div>
            <input
              type="checkbox"
              checked={emailConfirmations}
              onChange={(e) => setEmailConfirmations(e.target.checked)}
              className="w-5 h-5 rounded text-terracotta-500 focus:ring-terracotta-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:bg-cream-100 transition-colors">
            <div>
              <span className="text-xs sm:text-sm font-bold text-chocolate-900 block">
                24-Hour SMS Appointment Reminders
              </span>
              <span className="text-[11px] sm:text-xs text-chocolate-600">
                Receive a quick text reminder 24 hours and 2 hours before your scheduled arrival time.
              </span>
            </div>
            <input
              type="checkbox"
              checked={smsReminders}
              onChange={(e) => setSmsReminders(e.target.checked)}
              className="w-5 h-5 rounded text-terracotta-500 focus:ring-terracotta-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:bg-cream-100 transition-colors">
            <div>
              <span className="text-xs sm:text-sm font-bold text-chocolate-900 block">
                Vaccination Passport & Booster Alerts
              </span>
              <span className="text-[11px] sm:text-xs text-chocolate-600">
                Get notified 30 days and 7 days prior to vaccine passport expiration dates.
              </span>
            </div>
            <input
              type="checkbox"
              checked={vaccineAlerts}
              onChange={(e) => setVaccineAlerts(e.target.checked)}
              className="w-5 h-5 rounded text-terracotta-500 focus:ring-terracotta-400"
            />
          </label>

          <label className="flex items-center justify-between p-4 rounded-2xl bg-cream-50 border border-cream-200 cursor-pointer hover:bg-cream-100 transition-colors">
            <div>
              <span className="text-xs sm:text-sm font-bold text-chocolate-900 block">
                Personalized AI Care & Seasonal Tips
              </span>
              <span className="text-[11px] sm:text-xs text-chocolate-600">
                Breed-specific seasonal grooming intervals and dietary wellness check-ins.
              </span>
            </div>
            <input
              type="checkbox"
              checked={aiSuggestions}
              onChange={(e) => setAiSuggestions(e.target.checked)}
              className="w-5 h-5 rounded text-terracotta-500 focus:ring-terracotta-400"
            />
          </label>
        </div>
      </motion.div>

      {/* 2. Password Change */}
      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handlePasswordSubmit}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-md border border-cream-300 space-y-6"
      >
        <div className="flex items-center gap-3 pb-4 border-b border-cream-200">
          <div className="w-10 h-10 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-chocolate-900">
              Security & Password
            </h3>
            <p className="text-xs text-chocolate-600">
              Ensure your pet account is secure with a strong password.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="••••••••••••"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />

          <Input
            label="New Password"
            type="password"
            placeholder="Minimum 8 characters"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          {passwordSaved ? (
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Password Updated Successfully!
            </span>
          ) : (
            <div />
          )}

          <Button type="submit" variant="secondary" size="md">
            Update Password
          </Button>
        </div>
      </motion.form>

      {/* 3. Danger Zone */}
      <div className="bg-rose-50/70 rounded-3xl sm:rounded-4xl p-6 sm:p-8 border border-rose-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-rose-950 flex items-center gap-2">
            <Trash2 className="w-4 h-4 text-rose-600" />
            <span>Delete Pet Parent Account</span>
          </h3>
          <p className="text-xs text-rose-800 mt-1 max-w-lg">
            Permanently delete your profile, companion records, vaccine passports, and appointment history. This action cannot be undone.
          </p>
        </div>

        <Button
          type="button"
          variant="terracotta"
          size="sm"
          onClick={() => setIsDeleteModalOpen(true)}
          className="bg-rose-600 hover:bg-rose-700 shrink-0 font-bold"
        >
          Delete Account
        </Button>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        maxWidth="sm"
        title="Delete Your Account?"
      >
        <div className="space-y-4 text-xs">
          <div className="p-4 bg-rose-100 rounded-2xl border border-rose-300 text-rose-900 leading-relaxed">
            <AlertCircle className="w-5 h-5 text-rose-700 mb-2" />
            Are you absolutely sure? All pet health records, vaccination history, and future appointments will be permanently erased.
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={() => setIsDeleteModalOpen(false)}>
              Keep My Account
            </Button>
            <Button
              variant="terracotta"
              size="sm"
              onClick={handleDeleteAccount}
              className="bg-rose-600 hover:bg-rose-700 font-bold"
            >
              Permanently Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
