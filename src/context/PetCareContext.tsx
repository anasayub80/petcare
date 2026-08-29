import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet, Appointment, NotificationItem } from '../types';
import { IMAGES } from '../data/images';
import { useAuth } from './AuthContext';

export function calculatePetAge(dobString: string): string {
  if (!dobString) return 'Age unknown';
  const birth = new Date(dobString);
  const now = new Date();
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();

  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
    years--;
    months += 12;
  }

  if (years > 0) {
    return `${years} ${years === 1 ? 'Year' : 'Years'} Old`;
  }
  return `${Math.max(1, months)} ${months === 1 ? 'Month' : 'Months'} Old`;
}

interface PetCareContextType {
  pets: Pet[];
  appointments: Appointment[];
  notifications: NotificationItem[];
  addPet: (data: Omit<Pet, 'id' | 'createdAt' | 'ownerId'>) => Pet;
  updatePet: (id: string, data: Partial<Pet>) => void;
  deletePet: (id: string) => void;
  getPetById: (id: string) => Pet | undefined;
  bookAppointment: (data: Omit<Appointment, 'id' | 'bookingNumber' | 'createdAt' | 'userId'>) => Appointment;
  rescheduleAppointment: (id: string, newDate: string, newTime: string) => void;
  cancelAppointment: (id: string, reason?: string) => void;
  getAppointmentById: (id: string) => Appointment | undefined;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
}

const INITIAL_PETS: Pet[] = [
  {
    id: 'pet-milo-01',
    ownerId: 'usr-1001',
    name: 'Milo',
    species: 'Dog',
    breed: 'Golden Retriever',
    gender: 'Male',
    dateOfBirth: '2023-04-10',
    weight: 28.4,
    weightUnit: 'kg',
    photo: IMAGES.pets.milo,
    color: 'Honey Gold',
    allergies: ['Chicken Byproduct', 'Spring Pollen'],
    conditions: ['Mild Hip Sensitivity'],
    medications: ['Glucosamine Supplement (Daily)'],
    behaviorNotes: 'Extremely friendly and playful. Loves belly rubs and responds well to gentle commands.',
    notes: 'Please dry with warm air and use blueberry facial shampoo.',
    vaccinations: [
      {
        id: 'vac-1',
        name: 'Rabies (3-Year Booster)',
        administeredDate: '2025-09-18',
        expiryDate: '2028-09-18',
        status: 'Up to date',
        veterinarian: 'Dr. Elena Vance, DVM',
      },
      {
        id: 'vac-2',
        name: 'DHPP (Distemper, Parvo, Hepatitis)',
        administeredDate: '2025-09-18',
        expiryDate: '2027-09-18',
        status: 'Up to date',
        veterinarian: 'Dr. Elena Vance, DVM',
      },
      {
        id: 'vac-3',
        name: 'Bordetella (Kennel Cough)',
        administeredDate: '2026-03-10',
        expiryDate: '2026-09-10',
        status: 'Due Soon',
        veterinarian: 'Dr. Sarah Jenkins, BVSc',
      },
      {
        id: 'vac-4',
        name: 'Lyme Disease Vaccine',
        administeredDate: '2025-11-04',
        expiryDate: '2026-11-04',
        status: 'Up to date',
        veterinarian: 'Dr. Elena Vance, DVM',
      },
    ],
    createdAt: '2025-04-12',
  },
  {
    id: 'pet-luna-02',
    ownerId: 'usr-1001',
    name: 'Luna',
    species: 'Cat',
    breed: 'British Shorthair',
    gender: 'Female',
    dateOfBirth: '2024-02-14',
    weight: 4.2,
    weightUnit: 'kg',
    photo: IMAGES.pets.luna,
    color: 'Silver Tabby',
    allergies: ['Grain-heavy kibble'],
    conditions: ['None'],
    medications: ['None'],
    behaviorNotes: 'Calm and quiet. Prefers low-noise quiet handling in cat-only spaces.',
    notes: 'Loves chin scratches and salmon freeze-dried treats.',
    vaccinations: [
      {
        id: 'vac-5',
        name: 'FVRCP (Feline Viral Rhinotracheitis)',
        administeredDate: '2026-01-15',
        expiryDate: '2027-01-15',
        status: 'Up to date',
        veterinarian: 'Dr. Sarah Jenkins, BVSc',
      },
      {
        id: 'vac-6',
        name: 'Feline Rabies Vaccine',
        administeredDate: '2026-01-15',
        expiryDate: '2027-01-15',
        status: 'Up to date',
        veterinarian: 'Dr. Sarah Jenkins, BVSc',
      },
    ],
    createdAt: '2025-05-20',
  },
];

const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-101',
    bookingNumber: 'BK-89421',
    userId: 'usr-1001',
    petId: 'pet-milo-01',
    serviceId: 'grooming',
    date: '2026-09-08',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    status: 'Confirmed',
    customerNotes: 'Please focus on deshedding around the undercoat and gentle paw pad trimming.',
    assignedStaffName: 'Marcus Chen (Master Stylist)',
    price: 45,
    createdAt: '2026-08-28',
  },
  {
    id: 'apt-102',
    bookingNumber: 'BK-73190',
    userId: 'usr-1001',
    petId: 'pet-luna-02',
    serviceId: 'vaccination',
    date: '2026-07-15',
    startTime: '02:30 PM',
    endTime: '03:00 PM',
    status: 'Completed',
    customerNotes: 'Annual vaccine wellness booster checkup.',
    assignedStaffName: 'Dr. Sarah Jenkins, BVSc',
    price: 35,
    createdAt: '2026-07-10',
  },
];

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    userId: 'usr-1001',
    title: 'Appointment Confirmed',
    message: 'Milo’s Luxury Grooming session is confirmed for Sept 8 at 10:00 AM.',
    type: 'appointment',
    read: false,
    link: '/dashboard/appointments/apt-101',
    createdAt: '2 hours ago',
  },
  {
    id: 'notif-2',
    userId: 'usr-1001',
    title: 'Vaccination Due Soon',
    message: 'Milo’s Bordetella vaccine booster is due for renewal next week.',
    type: 'vaccine',
    read: false,
    link: '/dashboard/pets/pet-milo-01',
    createdAt: '1 day ago',
  },
  {
    id: 'notif-3',
    userId: 'usr-1001',
    title: 'AI Wellness Recommendation',
    message: 'Based on seasonal changes, seasonal coat conditioning is recommended for double-coated breeds.',
    type: 'reminder',
    read: true,
    link: '/dashboard/assistant',
    createdAt: '3 days ago',
  },
];

const PetCareContext = createContext<PetCareContextType | undefined>(undefined);

export const PetCareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [pets, setPets] = useState<Pet[]>(() => {
    const saved = localStorage.getItem('petcare_pets_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PETS;
      }
    }
    return INITIAL_PETS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem('petcare_appointments_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_APPOINTMENTS;
      }
    }
    return INITIAL_APPOINTMENTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('petcare_notifications_list');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_NOTIFICATIONS;
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem('petcare_pets_list', JSON.stringify(pets));
  }, [pets]);

  useEffect(() => {
    localStorage.setItem('petcare_appointments_list', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('petcare_notifications_list', JSON.stringify(notifications));
  }, [notifications]);

  const addPet = (data: Omit<Pet, 'id' | 'createdAt' | 'ownerId'>): Pet => {
    const newPet: Pet = {
      ...data,
      id: `pet-${Date.now()}`,
      ownerId: user?.id || 'usr-1001',
      createdAt: new Date().toISOString().split('T')[0],
      vaccinations: data.vaccinations || [
        {
          id: `vac-${Date.now()}`,
          name: 'Core Wellness Baseline',
          administeredDate: new Date().toISOString().split('T')[0],
          expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Up to date',
          veterinarian: 'Dr. Elena Vance, DVM',
        },
      ],
    };
    setPets((prev) => [newPet, ...prev]);

    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'usr-1001',
        title: 'New Pet Profile Created',
        message: `${newPet.name}'s digital health passport is now active.`,
        type: 'system',
        read: false,
        link: `/dashboard/pets/${newPet.id}`,
        createdAt: 'Just now',
      },
      ...prev,
    ]);

    return newPet;
  };

  const updatePet = (id: string, data: Partial<Pet>) => {
    setPets((prev) =>
      prev.map((pet) => (pet.id === id ? { ...pet, ...data } : pet))
    );
  };

  const deletePet = (id: string) => {
    setPets((prev) => prev.filter((pet) => pet.id !== id));
    // Also remove appointments for deleted pet
    setAppointments((prev) => prev.filter((apt) => apt.petId !== id));
  };

  const getPetById = (id: string) => pets.find((p) => p.id === id);

  const bookAppointment = (
    data: Omit<Appointment, 'id' | 'bookingNumber' | 'createdAt' | 'userId'>
  ): Appointment => {
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const newApt: Appointment = {
      ...data,
      id: `apt-${Date.now()}`,
      bookingNumber: `BK-${randomCode}`,
      userId: user?.id || 'usr-1001',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setAppointments((prev) => [newApt, ...prev]);

    const petObj = pets.find((p) => p.id === data.petId);
    // Add notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'usr-1001',
        title: 'Appointment Scheduled',
        message: `Appointment for ${petObj?.name || 'your pet'} is scheduled for ${data.date} at ${data.startTime}.`,
        type: 'appointment',
        read: false,
        link: `/dashboard/appointments/${newApt.id}`,
        createdAt: 'Just now',
      },
      ...prev,
    ]);

    return newApt;
  };

  const rescheduleAppointment = (id: string, newDate: string, newTime: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, date: newDate, startTime: newTime, status: 'Confirmed' }
          : apt
      )
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'usr-1001',
        title: 'Appointment Rescheduled',
        message: `Your appointment has been rescheduled to ${newDate} at ${newTime}.`,
        type: 'appointment',
        read: false,
        link: `/dashboard/appointments/${id}`,
        createdAt: 'Just now',
      },
      ...prev,
    ]);
  };

  const cancelAppointment = (id: string, reason?: string) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === id
          ? { ...apt, status: 'Cancelled', cancellationReason: reason || 'Cancelled by customer' }
          : apt
      )
    );

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        userId: user?.id || 'usr-1001',
        title: 'Appointment Cancelled',
        message: 'Your appointment was marked as cancelled. You can book again anytime.',
        type: 'appointment',
        read: false,
        link: `/dashboard/appointments/${id}`,
        createdAt: 'Just now',
      },
      ...prev,
    ]);
  };

  const getAppointmentById = (id: string) => appointments.find((a) => a.id === id);

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <PetCareContext.Provider
      value={{
        pets,
        appointments,
        notifications,
        addPet,
        updatePet,
        deletePet,
        getPetById,
        bookAppointment,
        rescheduleAppointment,
        cancelAppointment,
        getAppointmentById,
        markNotificationAsRead,
        markAllNotificationsAsRead,
      }}
    >
      {children}
    </PetCareContext.Provider>
  );
};

export const usePetCare = () => {
  const context = useContext(PetCareContext);
  if (!context) {
    throw new Error('usePetCare must be used within a PetCareProvider');
  }
  return context;
};
