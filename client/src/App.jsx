import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import UserPortalBanner from './components/UserPortalBanner';
import Hero from './components/Hero';
import IncubationTracks from './components/IncubationTracks';
import SafetyFeatures from './components/SafetyFeatures';
import StatsCounter from './components/StatsCounter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import GuardianApprovalModal from './components/GuardianApprovalModal';

function MainLayout() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const [consentModalOpen, setConsentModalOpen] = useState(false);

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    setAuthMode(mode);
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar onOpenAuth={handleOpenAuth} />
      
      <main style={{ flex: 1 }}>
        <UserPortalBanner onOpenConsentModal={() => setConsentModalOpen(true)} />
        <Hero onOpenAuth={handleOpenAuth} />
        <IncubationTracks onOpenAuth={handleOpenAuth} />
        <SafetyFeatures />
        <StatsCounter />
      </main>

      <Footer />

      {/* Interactive Modals */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
        initialRole={authRole}
      />

      <GuardianApprovalModal
        isOpen={consentModalOpen}
        onClose={() => setConsentModalOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
}
