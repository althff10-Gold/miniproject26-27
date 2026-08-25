import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import UserPortalBanner from './components/UserPortalBanner';
import Hero from './components/Hero';
import IncubationTracks from './components/IncubationTracks';
import SafetyFeatures from './components/SafetyFeatures';
import StatsCounter from './components/StatsCounter';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import GuardianApprovalModal from './components/GuardianApprovalModal';
import GuardianDashboard from './components/GuardianDashboard';

function MainLayout() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing' or 'guardian'

  // If guardian logs in, show guardian portal option
  const showGuardianPortal = currentView === 'guardian' || (user && user.role === 'guardian');

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    if (role === 'guardian' && user && user.role === 'guardian') {
      setCurrentView('guardian');
      return;
    }
    setAuthMode(mode);
    setAuthRole(role);
    setAuthModalOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar
        onOpenAuth={handleOpenAuth}
        currentView={currentView}
        onSwitchView={setCurrentView}
      />
      
      <main style={{ flex: 1 }}>
        {showGuardianPortal ? (
          <GuardianDashboard onBack={() => setCurrentView('landing')} />
        ) : (
          <>
            <UserPortalBanner
              onOpenConsentModal={() => setConsentModalOpen(true)}
              onOpenGuardianDashboard={() => setCurrentView('guardian')}
            />
            <Hero onOpenAuth={handleOpenAuth} />
            <IncubationTracks onOpenAuth={handleOpenAuth} />
            <SafetyFeatures />
            <StatsCounter />
          </>
        )}
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
