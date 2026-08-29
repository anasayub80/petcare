import { Service, Stat, Testimonial, TeamMember, PetProfile, FAQItem, ChatMessage } from '../types';
import { IMAGES } from './images';

export const SERVICES_DATA: Service[] = [
  {
    id: 'grooming',
    slug: 'luxury-pet-grooming',
    title: 'Pet Grooming & Spa',
    tagline: 'Stress-free bath, coat styling & gentle spa treatment',
    shortDescription: 'Warm botanical bubble baths, deshedding, hand-scissored styling, nail buffing, and ear cleansing in a calm, soothing environment.',
    fullDescription: 'Our master stylists use hypoallergenic, organic botanicals tailored to your pet’s specific coat and skin condition. Every session includes gentle relaxation techniques to keep even nervous pets completely at ease.',
    category: 'grooming',
    iconName: 'Sparkles',
    image: IMAGES.services.grooming,
    duration: '60 - 90 min',
    startingPrice: 45,
    featured: true,
    inclusions: [
      'Warm aroma-therapeutic hydrobath',
      'Hypoallergenic berry shampoo & conditioning',
      'Gentle warm-air fluff blow dry',
      'Precision breed-standard hand scissoring',
      'Nail clipping & smooth diamond-file buffing',
      'Ear cleansing & gentle hygiene trim'
    ],
    preparationTips: [
      'Take your pet on a short walk before arriving',
      'Inform our stylists of any sensitive spots or skin allergies',
      'Feel free to bring their favorite treat or comfort toy'
    ],
    benefits: [
      'Promotes healthy skin and shiny shedding-free coats',
      'Early detection of skin irregularities and ticks',
      'Reduced matting and tangling discomfort',
      'Ultra-clean, fresh-smelling coat for weeks'
    ]
  },
  {
    id: 'veterinary',
    slug: 'veterinary-consultation',
    title: 'Veterinary Consultation',
    tagline: 'Comprehensive exams, diagnostics & personalized health plans',
    shortDescription: 'Thorough head-to-tail wellness examinations, early illness detection, dietary counseling, and gentle pediatric & senior pet care.',
    fullDescription: 'Our experienced veterinarians perform in-depth physical health assessments, vitals check, musculoskeletal evaluations, and personalized guidance for your pet’s lifecycle stage.',
    category: 'medical',
    iconName: 'Stethoscope',
    image: IMAGES.services.veterinary,
    duration: '30 - 45 min',
    startingPrice: 65,
    featured: true,
    inclusions: [
      'Comprehensive head-to-tail physical exam',
      'Cardiopulmonary & vitals assessment',
      'Nutritional, weight & diet guidance',
      'Parasite prevention review & screening',
      'Behavioral advice & wellness roadmap',
      'Digital health report uploaded to pet profile'
    ],
    preparationTips: [
      'Keep a note of any recent behavioral or appetite changes',
      'Bring previous vaccination or medical records if new to us',
      'Cats should be transported in a safe carrier'
    ],
    benefits: [
      'Catch health issues before they become emergencies',
      'Personalized preventative healthcare tailored to breed risk',
      'Expert advice for optimal nutrition and weight control',
      'Peace of mind from licensed veterinarians'
    ]
  },
  {
    id: 'vaccination',
    slug: 'vaccination-immunization',
    title: 'Vaccination & Prevention',
    tagline: 'Core vaccines, booster shots & parasite protection',
    shortDescription: 'Core vaccines (Rabies, DHPP, FVRCP) and non-core boosters administered gently with digital vaccination tracking and reminders.',
    fullDescription: 'Protect your furry family members against infectious diseases. We maintain an automated digital vaccination passport that notifies you well before boosters are due.',
    category: 'preventive',
    iconName: 'ShieldCheck',
    image: IMAGES.services.vaccination,
    duration: '20 - 30 min',
    startingPrice: 35,
    featured: false,
    inclusions: [
      'Pre-vaccine vitals and temperature check',
      'Administration of core/non-core vaccine of choice',
      'Post-vaccine observation in our calming lounge',
      'Instant digital certificate & passport update',
      'SMS & email booster reminder scheduling'
    ],
    preparationTips: [
      'Ensure pet is well-hydrated and had a light meal',
      'Advise us of any previous vaccine reactions'
    ],
    benefits: [
      'Lifelong immunity against critical canine & feline diseases',
      'Compliant with boarding and travel regulations',
      'Trackable digital vaccination certificate'
    ]
  },
  {
    id: 'wellness',
    slug: 'health-and-wellness',
    title: 'Health & Wellness Plans',
    tagline: 'Holistic physical conditioning, dental & dietary therapy',
    shortDescription: 'Holistic care including gentle dental ultrasonic scaling, joint mobility therapy, allergy treatment, and lifestyle wellness.',
    fullDescription: 'Elevate your pet’s vitality through structured wellness programs combining nutritional optimization, gentle dental care, and mobility conditioning.',
    category: 'wellness',
    iconName: 'HeartPulse',
    image: IMAGES.services.wellness,
    duration: '45 - 60 min',
    startingPrice: 55,
    featured: false,
    inclusions: [
      'Oral health assessment & plaque check',
      'Joint mobility & flexibility evaluation',
      'Skin & coat allergy assessment',
      'Customized diet & exercise plan',
      'Follow-up milestone check-in'
    ],
    preparationTips: [
      'Bring current food/treat labels if seeking diet advice',
      'Note any stiffness when getting up after rest'
    ],
    benefits: [
      'Significantly prolongs active lifespan',
      'Prevents costly periodontal disease',
      'Keeps senior pets agile and comfortable'
    ]
  }
];

export const STATS_DATA: Stat[] = [
  {
    id: 'pets',
    value: '5,000+',
    numericValue: 5000,
    suffix: '+',
    label: 'Happy Pets Cared For',
    description: 'Dogs, cats, and small animals treated with love and patience',
    iconName: 'PawPrint'
  },
  {
    id: 'experts',
    value: '25+',
    numericValue: 25,
    suffix: '+',
    label: 'Pet Care Specialists',
    description: 'Licensed veterinarians, certified master groomers & nutritionists',
    iconName: 'Award'
  },
  {
    id: 'experience',
    value: '10+',
    numericValue: 10,
    suffix: '+',
    label: 'Years of Excellence',
    description: 'Pioneering gentle, stress-free clinical & spa experiences',
    iconName: 'Calendar'
  },
  {
    id: 'rating',
    value: '4.9',
    numericValue: 4.9,
    suffix: ' ★',
    label: 'Average Client Rating',
    description: 'From 3,200+ verified pet parent reviews',
    iconName: 'Star'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Create Your Pet Profile',
    description: 'Add your pet’s species, breed, age, weight, and health preferences in under 60 seconds.',
    icon: 'UserPlus'
  },
  {
    step: '02',
    title: 'Choose A Service',
    description: 'Browse grooming styles, veterinary exams, or let our AI assistant suggest the right care.',
    icon: 'Sparkles'
  },
  {
    step: '03',
    title: 'Select Date & Time',
    description: 'Pick convenient real-time slots with your preferred specialist or veterinary clinician.',
    icon: 'CalendarCheck'
  },
  {
    step: '04',
    title: 'We Take Care Of The Rest',
    description: 'Relax in our cozy lounge or receive digital progress updates while your pet is pampered.',
    icon: 'HeartHandshake'
  }
];

export const MILO_DEMO_PROFILE: PetProfile = {
  id: 'pet-milo-01',
  name: 'Milo',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: '3 Years',
  weight: '28.4 kg',
  gender: 'Male',
  avatar: IMAGES.pets.milo,
  vaccinationStatus: 'Up to date',
  nextAppointment: {
    service: 'Luxury Spa & Coat Grooming',
    date: 'Wednesday, Oct 14',
    time: '10:30 AM',
    doctorOrStylist: 'Marcus Chen (Master Stylist)'
  },
  recentActivity: 'Completed Annual Physical & Rabies Booster on Sept 18',
  allergies: ['Chicken byproduct', 'Seasonal pollen'],
  notes: 'Enjoys belly rubs and gentle paw handling. Loves salmon treats.'
};

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'test-1',
    authorName: 'Emily Richardson',
    petName: 'Milo & Oliver',
    petBreed: 'Golden Retriever & Scottish Fold',
    authorImage: IMAGES.testimonials.emily,
    serviceUsed: 'Spa Grooming & Vet Check',
    rating: 5,
    comment: 'The level of care here is unlike anything else. Milo used to shake with fear at ordinary groomers, but here he literally wags his tail right at the doorstep! The AI assistant also gave super helpful prep tips.',
    date: '2 days ago'
  },
  {
    id: 'test-2',
    authorName: 'Jason Martinez',
    petName: 'Rocky',
    petBreed: 'French Bulldog',
    authorImage: IMAGES.testimonials.jason,
    serviceUsed: 'Allergy & Wellness Consultation',
    rating: 5,
    comment: 'Dr. Elena diagnosed Rocky’s stubborn skin allergies after two other clinics misdiagnosed him. Having all his medical history and booster reminders accessible on our phone is a game changer.',
    date: '1 week ago'
  },
  {
    id: 'test-3',
    authorName: 'Sophia Lin',
    petName: 'Mochi',
    petBreed: 'Ragdoll Cat',
    authorImage: IMAGES.testimonials.sophia,
    serviceUsed: 'Gentle Cat Hygiene & Vaccines',
    rating: 5,
    comment: 'Cat-friendly environments are so rare. They have a dedicated quiet room for felines, and the staff handles them with so much gentleness. Truly a 5-star experience!',
    date: '2 weeks ago'
  },
  {
    id: 'test-4',
    authorName: 'Michael Turner',
    petName: 'Daisy',
    petBreed: 'Border Collie',
    authorImage: IMAGES.testimonials.michael,
    serviceUsed: 'Complete Care Package',
    rating: 5,
    comment: 'Seamless booking, zero wait times, and genuine pet lovers everywhere. You can see how much they respect and adore every single animal that walks through their doors.',
    date: '3 weeks ago'
  }
];

export const TEAM_DATA: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Elena Vance, DVM',
    role: 'Chief Medical Director & Senior Vet',
    specialization: 'Internal Medicine & Preventative Cardiology',
    credentials: 'Cornell University College of Vet Med • 12+ Yrs Exp',
    bio: 'Dedicated to compassionate, stress-free veterinary medicine with a special focus on early preventative diagnostics and senior animal vitality.',
    image: IMAGES.team.elena,
    quote: 'Every pet deserves to be treated with the gentle patience and respect we would give our own family.'
  },
  {
    id: 'team-2',
    name: 'Marcus Chen',
    role: 'Master Pet Stylist & Grooming Lead',
    specialization: 'Asian Fusion Styling & Sensitive Coat Therapy',
    credentials: 'International Certified Master Groomer (ICMG) • 9+ Yrs Exp',
    bio: 'Recognized for artistic breed-standard trims and fear-free grooming methods that turn nervous bathers into relaxed, happy regulars.',
    image: IMAGES.team.marcus,
    quote: 'Grooming is not just about looks; it is the cornerstone of skin comfort, hygiene, and confidence.'
  },
  {
    id: 'team-3',
    name: 'Dr. Sarah Jenkins, BVSc',
    role: 'Veterinary Surgeon & Feline Specialist',
    specialization: 'Soft Tissue Surgery & Feline Behavioral Wellness',
    credentials: 'Royal Veterinary College • 8+ Yrs Exp',
    bio: 'Specialist in gentle feline handling techniques, pediatric kitten care, and advanced dental rehabilitation.',
    image: IMAGES.team.sarah,
    quote: 'Creating a tranquil, fear-free clinic space transforms how pets experience healthcare.'
  },
  {
    id: 'team-4',
    name: 'David Ross',
    role: 'Head of Animal Care & Patient Coordinator',
    specialization: 'Canine Hydrotherapy & Post-Op Recovery',
    credentials: 'Certified Veterinary Technician (CVT) • 7+ Yrs Exp',
    bio: 'Ensures every appointment runs like clockwork, keeping pet parents updated in real-time with photos and post-care routines.',
    image: IMAGES.team.david,
    quote: 'Seeing a pet bounce out the door happy, healthy, and revitalized is the greatest reward.'
  }
];

export const AI_DEMO_CONVERSATIONS: {
  prompt: string;
  response: string;
  recommendedService?: {
    id: string;
    title: string;
    duration: string;
  };
}[] = [
  {
    prompt: "My 3-year-old Labrador has been scratching his ears and shaking his head frequently.",
    response: "Ear scratching combined with head shaking often suggests moisture buildup, mild yeast irritation, or early ear canal inflammation. For a 3-year-old Labrador, I recommend scheduling a Veterinary Consultation for a gentle otoscopic check, or a soothing Ear Cleansing & Grooming session if symptoms are mild.",
    recommendedService: {
      id: 'veterinary',
      title: 'Veterinary Consultation & Otic Check',
      duration: '30 min'
    }
  },
  {
    prompt: "How often should I get my Golden Retriever groomed to prevent heavy matting?",
    response: "For double-coated breeds like Golden Retrievers, a full grooming session every 4 to 6 weeks is ideal. Regular deshedding and hydrobath treatments remove dead undercoat hairs, prevent painful pelted mats, and keep their natural water-resistant coat healthy.",
    recommendedService: {
      id: 'grooming',
      title: 'Luxury Deshedding & Coat Styling',
      duration: '75 min'
    }
  },
  {
    prompt: "What vaccines does my 8-week-old puppy need before meeting other dogs?",
    response: "At 8 weeks, puppies typically begin their core DHPP (Distemper, Hepatitis, Parvovirus, Parainfluenza) vaccine series. Before socializing in public parks, puppies should finish their booster series around 16 weeks to ensure full protective antibody levels.",
    recommendedService: {
      id: 'vaccination',
      title: 'Puppy Core Vaccine & Health Check',
      duration: '25 min'
    }
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I prepare my pet for their first grooming appointment?',
    answer: 'We recommend taking your dog on a brief walk to relieve extra energy before arriving. Feel free to bring their favorite comfort blanket or treats. Our stylists take 5-10 minutes initially to let your pet sniff the salon, get comfortable, and build trust.',
    category: 'Grooming'
  },
  {
    id: 'faq-2',
    question: 'What is your cancellation and rescheduling policy?',
    answer: 'We understand pet parents have dynamic schedules! You can easily reschedule or cancel up to 24 hours before your appointment with zero penalty through your online portal or by giving us a quick call.',
    category: 'Bookings'
  },
  {
    id: 'faq-3',
    question: 'Are your veterinarians licensed for surgical procedures and emergency care?',
    answer: 'Yes! All our clinicians are board-certified veterinarians with state licensure and specialized training in fear-free clinical care, routine surgery, and diagnostic ultrasonography.',
    category: 'Veterinary'
  },
  {
    id: 'faq-4',
    question: 'Can I stay with my pet during their grooming or examination?',
    answer: 'You are always welcome in the examination room for vet checkups! For grooming, pets typically stay calmer when parents relax in our panoramic observation lounge with a fresh artisan coffee.',
    category: 'General'
  },
  {
    id: 'faq-5',
    question: 'How will the AI Pet Care Assistant personalize recommendations?',
    answer: 'Our AI assistant utilizes your pet’s species, breed traits, age, weight history, and past health notes to suggest optimal grooming intervals, seasonal dietary adjustments, and preventive health milestones.',
    category: 'AI Assistant'
  }
];
