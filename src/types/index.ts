export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  role: 'customer' | 'admin';
  address?: string;
  city?: string;
  emergencyContact?: string;
  createdAt: string;
}

export interface VaccinationRecord {
  id: string;
  name: string;
  administeredDate: string;
  expiryDate: string;
  status: 'Up to date' | 'Due Soon' | 'Overdue';
  veterinarian: string;
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Rabbit' | 'Bird' | 'Other';
  breed: string;
  gender: 'Male' | 'Female';
  dateOfBirth: string; // YYYY-MM-DD
  weight: number;
  weightUnit: 'kg' | 'lbs';
  photo: string;
  color?: string;
  allergies?: string[];
  conditions?: string[];
  medications?: string[];
  behaviorNotes?: string;
  notes?: string;
  vaccinations?: VaccinationRecord[];
  createdAt: string;
}

export interface PetProfile {
  id: string;
  name: string;
  species: 'Dog' | 'Cat' | 'Other';
  breed: string;
  age: string;
  weight: string;
  gender: 'Male' | 'Female';
  avatar: string;
  vaccinationStatus: 'Up to date' | 'Due Soon' | 'Overdue';
  nextAppointment?: {
    service: string;
    date: string;
    time: string;
    doctorOrStylist: string;
  };
  recentActivity: string;
  allergies?: string[];
  notes?: string;
}

export type AppointmentStatus = 'Pending' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';

export interface Appointment {
  id: string;
  bookingNumber: string;
  userId: string;
  petId: string;
  serviceId: string;
  date: string; // YYYY-MM-DD
  startTime: string; // "10:00 AM"
  endTime: string; // "11:00 AM"
  status: AppointmentStatus;
  customerNotes?: string;
  internalNotes?: string;
  assignedStaffName?: string;
  price: number;
  cancellationReason?: string;
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'appointment' | 'vaccine' | 'system' | 'reminder';
  read: boolean;
  link?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedActions?: { label: string; actionId: string }[];
  recommendedService?: {
    id: string;
    title: string;
    duration: string;
  };
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'grooming' | 'medical' | 'preventive' | 'wellness';
  iconName: string;
  image: string;
  duration: string;
  startingPrice: number;
  featured?: boolean;
  tagline: string;
  inclusions: string[];
  preparationTips: string[];
  benefits: string[];
}

export interface Testimonial {
  id: string;
  authorName: string;
  petName: string;
  petBreed: string;
  authorImage: string;
  serviceUsed: string;
  rating: number;
  comment: string;
  date: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialization: string;
  credentials: string;
  bio: string;
  image: string;
  quote: string;
}

export interface Stat {
  id: string;
  value: string;
  numericValue: number;
  label: string;
  suffix?: string;
  description: string;
  iconName: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}
