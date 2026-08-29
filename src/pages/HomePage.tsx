import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Hero } from '../components/home/Hero';
import { StatsStrip } from '../components/home/StatsStrip';
import { ServicesGrid } from '../components/home/ServicesGrid';
import { HowItWorks } from '../components/home/HowItWorks';
import { AIChatPreview } from '../components/home/AIChatPreview';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { PetProfilePreview } from '../components/home/PetProfilePreview';
import { Testimonials } from '../components/home/Testimonials';
import { CTASection } from '../components/home/CTASection';

export const HomePage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleOpenBooking = (serviceId?: string) => {
    const targetUrl = serviceId ? `/dashboard/book?serviceId=${serviceId}` : '/dashboard/book';
    if (isAuthenticated) {
      navigate(targetUrl);
    } else {
      navigate(`/login?redirect=${encodeURIComponent(targetUrl)}`);
    }
  };

  return (
    <main className="min-h-screen">
      <Hero onOpenBooking={() => handleOpenBooking()} />
      <StatsStrip />
      <ServicesGrid onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
      <HowItWorks onOpenBooking={() => handleOpenBooking()} />
      <AIChatPreview onSelectServiceToBook={(sId) => handleOpenBooking(sId)} />
      <WhyChooseUs />
      <PetProfilePreview onOpenBooking={() => handleOpenBooking()} />
      <Testimonials />
      <CTASection onOpenBooking={() => handleOpenBooking()} />
    </main>
  );
};
