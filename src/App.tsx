import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PetCareProvider } from './context/PetCareContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { DashboardLayout } from './components/dashboard/DashboardLayout';
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage';
import { PetsListPage } from './pages/dashboard/PetsListPage';
import { AddPetPage } from './pages/dashboard/AddPetPage';
import { PetDetailPage } from './pages/dashboard/PetDetailPage';
import { BookAppointmentPage } from './pages/dashboard/BookAppointmentPage';
import { AppointmentsListPage } from './pages/dashboard/AppointmentsListPage';
import { AppointmentDetailPage } from './pages/dashboard/AppointmentDetailPage';
import { AIAssistantPage } from './pages/dashboard/AIAssistantPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { ScrollToTop } from './components/common/ScrollToTop';
import { CustomCursor } from './components/common/CustomCursor';
import { ScrollProgress } from './components/common/ScrollProgress';

function AppLayout() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-cream-50 text-chocolate-900 selection:bg-terracotta-200">
      <CustomCursor />
      <ScrollProgress />
      <ScrollToTop />
      {!isDashboard && <Navbar />}

      <div className="flex-1">
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Customer Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardOverviewPage />} />
            <Route path="pets" element={<PetsListPage />} />
            <Route path="pets/new" element={<AddPetPage />} />
            <Route path="pets/:id" element={<PetDetailPage />} />
            <Route path="book" element={<BookAppointmentPage />} />
            <Route path="appointments" element={<AppointmentsListPage />} />
            <Route path="appointments/:id" element={<AppointmentDetailPage />} />
            <Route path="assistant" element={<AIAssistantPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>

      {!isDashboard && <Footer />}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <PetCareProvider>
        <Router>
          <AppLayout />
        </Router>
      </PetCareProvider>
    </AuthProvider>
  );
}

export default App;
