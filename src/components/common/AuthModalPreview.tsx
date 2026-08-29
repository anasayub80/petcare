import React from 'react';
import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { Badge } from './Badge';
import { Sparkles, User, Lock, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export interface AuthModalPreviewProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}

export const AuthModalPreview: React.FC<AuthModalPreviewProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="md"
      title="Customer Portal & Sign In"
      subtitle="Access your pet’s digital health passports, appointment records, and AI care history."
    >
      <div className="space-y-4">
        <div className="bg-cream-100 rounded-2xl p-3.5 border border-cream-300 flex items-center justify-between text-xs text-chocolate-800">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-terracotta-500 shrink-0" />
            <span>Phase 1 Design Preview • Phase 2 Auth Integration</span>
          </div>
          <Badge variant="terracotta" size="sm">Phase 2 Preview</Badge>
        </div>

        <div className="space-y-3">
          <Input
            label="Email Address"
            type="email"
            placeholder="parent@example.com"
            defaultValue="jessica.milo@example.com"
            leftIcon={<User className="w-4 h-4" />}
          />
          <Input
            label="Password"
            type="password"
            placeholder="••••••••••••"
            defaultValue="password123"
            leftIcon={<Lock className="w-4 h-4" />}
          />
        </div>

        <div className="flex items-center justify-between text-xs text-chocolate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" defaultChecked className="rounded text-terracotta-500 focus:ring-terracotta-400" />
            <span>Remember me</span>
          </label>
          <span className="text-terracotta-600 font-semibold cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>

        <div className="pt-2">
          <Button
            variant="terracotta"
            size="md"
            className="w-full justify-center shadow-warm-sm font-bold"
            onClick={() => {
              onClose();
              onOpenBooking();
            }}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Demo Sign In & View Appointments
          </Button>
        </div>

        <div className="pt-2 text-center">
          <p className="text-xs text-chocolate-600">
            Don't have a pet profile yet?{' '}
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="font-bold text-terracotta-600 hover:underline"
            >
              Create Pet Profile
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
};
