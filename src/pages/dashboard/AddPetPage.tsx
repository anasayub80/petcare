import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { usePetCare, calculatePetAge } from '../../context/PetCareContext';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { IMAGES } from '../../data/images';
import { ArrowLeft, Save, Sparkles, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const PRESET_PHOTOS = [
  { label: 'Golden Retriever', url: IMAGES.pets.milo },
  { label: 'British Shorthair Cat', url: IMAGES.pets.luna },
  { label: 'French Bulldog', url: IMAGES.pets.charlie },
  { label: 'Beagle Companion', url: IMAGES.pets.bella },
];

export const AddPetPage: React.FC = () => {
  const { addPet } = usePetCare();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [species, setSpecies] = useState<'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Other'>('Dog');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female'>('Male');
  const [dateOfBirth, setDateOfBirth] = useState('2024-01-15');
  const [weight, setWeight] = useState('12.5');
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [color, setColor] = useState('');
  const [photo, setPhoto] = useState(PRESET_PHOTOS[0].url);
  const [allergies, setAllergies] = useState('');
  const [conditions, setConditions] = useState('');
  const [medications, setMedications] = useState('');
  const [behaviorNotes, setBehaviorNotes] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newPet = addPet({
      name,
      species,
      breed: breed || (species === 'Dog' ? 'Golden Mix' : 'Domestic Shorthair'),
      gender,
      dateOfBirth,
      weight: parseFloat(weight) || 10,
      weightUnit,
      color: color || 'Natural',
      photo: photo || PRESET_PHOTOS[0].url,
      allergies: allergies ? allergies.split(',').map((s) => s.trim()) : [],
      conditions: conditions ? conditions.split(',').map((s) => s.trim()) : [],
      medications: medications ? medications.split(',').map((s) => s.trim()) : [],
      behaviorNotes,
      notes,
    });

    setTimeout(() => {
      setIsSubmitting(false);
      navigate(`/dashboard/pets/${newPet.id}`);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Top Breadcrumb */}
      <div className="flex items-center gap-3">
        <Link to="/dashboard/pets" className="p-2 rounded-2xl bg-white border border-cream-300 hover:bg-cream-100 transition-colors">
          <ArrowLeft className="w-4 h-4 text-chocolate-700" />
        </Link>
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-chocolate-900 tracking-tight">
            Add New Pet Companion
          </h1>
          <p className="text-xs text-chocolate-600">
            Create their digital wellness passport in under two minutes.
          </p>
        </div>
      </div>

      <motion.form
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl sm:rounded-5xl p-6 sm:p-10 shadow-warm-lg border border-cream-300 space-y-8"
      >
        {/* Section 1: Avatar Selection */}
        <div>
          <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block mb-3">
            1. Pet Avatar & Photo
          </span>
          <div className="flex flex-wrap items-center gap-4">
            <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-terracotta-500 shadow-warm-sm shrink-0">
              <img src={photo} alt="Selected Pet" className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-[240px] space-y-2">
              <span className="text-xs font-semibold text-chocolate-700 block">Choose preset avatar or paste photo URL:</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_PHOTOS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setPhoto(p.url)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      photo === p.url
                        ? 'bg-chocolate-900 text-white border-chocolate-900 font-bold'
                        : 'bg-cream-100 text-chocolate-800 border-cream-300 hover:bg-cream-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
              <Input
                placeholder="Or paste an image URL..."
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="text-xs py-2 mt-1"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Core Vital Information */}
        <div className="pt-6 border-t border-cream-200 space-y-4">
          <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
            2. Core Information
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="Pet Name"
              placeholder="e.g. Charlie"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <Select
              label="Species"
              value={species}
              onChange={(e) => setSpecies(e.target.value as any)}
              options={[
                { value: 'Dog', label: 'Dog 🐕' },
                { value: 'Cat', label: 'Cat 🐈' },
                { value: 'Rabbit', label: 'Rabbit 🐇' },
                { value: 'Bird', label: 'Bird 🦜' },
                { value: 'Other', label: 'Other Companion' },
              ]}
            />

            <Input
              label="Breed / Mix"
              placeholder="e.g. French Bulldog"
              value={breed}
              onChange={(e) => setBreed(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as any)}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />

            <div>
              <Input
                label="Date of Birth"
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                required
              />
              <span className="text-[11px] text-terracotta-600 font-bold mt-1 block">
                Calculated Age: {calculatePetAge(dateOfBirth)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Weight"
                type="number"
                step="0.1"
                placeholder="12.5"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <Select
                label="Unit"
                value={weightUnit}
                onChange={(e) => setWeightUnit(e.target.value as any)}
                options={[
                  { value: 'kg', label: 'kg' },
                  { value: 'lbs', label: 'lbs' },
                ]}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Coat Color / Markings"
              placeholder="e.g. Fawn with white chest"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
            <Input
              label="Known Allergies (comma-separated)"
              placeholder="e.g. Chicken, Beef, Grass pollen"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
            />
          </div>
        </div>

        {/* Section 3: Health & Behavioral Preferences */}
        <div className="pt-6 border-t border-cream-200 space-y-4">
          <span className="text-xs font-bold text-chocolate-900 uppercase tracking-wider block">
            3. Medical & Behavioral Notes
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Pre-existing Medical Conditions"
              placeholder="e.g. Mild hip dysplasia, sensitive stomach"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
            />
            <Input
              label="Current Medications / Supplements"
              placeholder="e.g. Daily Omega-3 oil, Joint chews"
              value={medications}
              onChange={(e) => setMedications(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-semibold text-chocolate-900 mb-1.5">
              Temperament & Handling Preferences
            </label>
            <textarea
              rows={3}
              value={behaviorNotes}
              onChange={(e) => setBehaviorNotes(e.target.value)}
              placeholder="e.g. Very gentle. A little nervous around loud hair dryers; prefers warm towel dries."
              className="w-full rounded-2xl bg-white border border-cream-300 px-4 py-3 text-chocolate-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-6 border-t border-cream-200 flex items-center justify-end gap-3">
          <Link to="/dashboard/pets">
            <Button type="button" variant="ghost" size="md">
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            variant="terracotta"
            size="lg"
            isLoading={isSubmitting}
            leftIcon={<Save className="w-4 h-4" />}
            className="shadow-warm-sm font-bold"
          >
            Save Pet Profile
          </Button>
        </div>
      </motion.form>
    </div>
  );
};
