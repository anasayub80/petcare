import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePetCare, calculatePetAge } from '../../context/PetCareContext';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { Modal } from '../../components/common/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { Plus, Trash2, Calendar, ShieldCheck, Heart, AlertCircle, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const PetsListPage: React.FC = () => {
  const { pets, deletePet } = usePetCare();
  const [petToDelete, setPetToDelete] = useState<string | null>(null);

  const handleDeleteConfirm = () => {
    if (petToDelete) {
      deletePet(petToDelete);
      setPetToDelete(null);
    }
  };

  const selectedPetForDelete = pets.find((p) => p.id === petToDelete);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="terracotta" size="sm" withPaw className="mb-2">
            My Companions
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Pet Profiles & Health Passports
          </h1>
          <p className="text-xs sm:text-sm text-chocolate-600 mt-1">
            Manage your pets’ digital medical records, vaccination schedules, and dietary notes.
          </p>
        </div>

        <Link to="/dashboard/pets/new">
          <Button
            variant="terracotta"
            size="md"
            leftIcon={<Plus className="w-4 h-4" />}
            className="shadow-warm-sm font-bold hover:scale-103 transition-transform"
            data-cursor="hover"
          >
            Add New Pet
          </Button>
        </Link>
      </div>

      {/* Pet Cards Grid */}
      {pets.length === 0 ? (
        /* Empty State */
        <EmptyState
          type="no-pets"
          title="Let's add your best friend!"
          description="Create a digital passport for your dog, cat, or companion to access personalized healthcare and fast scheduling."
          actionText="Add Your First Pet"
          onAction={() => window.location.assign('/dashboard/pets/new')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet, idx) => (
            <motion.div
              key={pet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              className="bg-white rounded-3xl sm:rounded-4xl p-6 shadow-warm-md hover:shadow-warm-xl border border-cream-300 transition-all flex flex-col justify-between group card-hover-glow hover:-translate-y-1.5"
              data-cursor="view"
              data-cursor-text="Passport"
            >
              <div>
                {/* Pet Photo in Arch Mask */}
                <div className="relative aspect-[4/3] w-full rounded-2xl sm:rounded-3xl overflow-hidden mb-5 bg-cream-200 border-2 border-cream-100">
                  <img
                    src={pet.photo}
                    alt={pet.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="cream" size="sm" className="font-bold">
                      {pet.species}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-chocolate-900 shadow-warm-xs">
                    {pet.gender}
                  </div>
                </div>

                {/* Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black text-chocolate-900 group-hover:text-terracotta-600 transition-colors">
                      {pet.name}
                    </h3>
                    <span className="text-xs font-bold text-terracotta-600">
                      {pet.weight} {pet.weightUnit}
                    </span>
                  </div>

                  <p className="text-xs text-chocolate-600 font-semibold">
                    {pet.breed} • {calculatePetAge(pet.dateOfBirth)}
                  </p>

                  {/* Vaccines & Allergy Tags */}
                  <div className="pt-3 border-t border-cream-200 flex flex-wrap gap-1.5">
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      Vaccines Up to Date
                    </span>
                    {pet.allergies && pet.allergies.length > 0 && (
                      <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        {pet.allergies[0]}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 mt-4 border-t border-cream-200 flex items-center justify-between gap-2">
                <Link to={`/dashboard/pets/${pet.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full text-xs font-bold justify-center hover:scale-102 transition-transform">
                    View Passport
                  </Button>
                </Link>

                <Link to={`/dashboard/book?petId=${pet.id}`}>
                  <Button
                    variant="terracotta"
                    size="sm"
                    className="text-xs font-bold px-3 hover:scale-105 transition-transform"
                    title="Book for this pet"
                    data-cursor="book"
                    data-cursor-text="Book"
                  >
                    <Calendar className="w-4 h-4" />
                  </Button>
                </Link>

                <button
                  onClick={() => setPetToDelete(pet.id)}
                  className="p-2 rounded-full text-chocolate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Remove Pet"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!petToDelete}
        onClose={() => setPetToDelete(null)}
        maxWidth="sm"
        title="Remove Pet Profile?"
      >
        <div className="space-y-4 text-xs text-chocolate-700">
          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-200 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Are you sure you want to remove <strong>{selectedPetForDelete?.name}</strong>? This will permanently delete their vaccination passport and scheduled appointments.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="ghost" size="sm" onClick={() => setPetToDelete(null)}>
              Keep Pet
            </Button>
            <Button
              variant="terracotta"
              size="sm"
              onClick={handleDeleteConfirm}
              className="bg-rose-600 hover:bg-rose-700"
            >
              Confirm Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
