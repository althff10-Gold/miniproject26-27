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
import StudentDashboard from './components/StudentDashboard';

function MainLayout() {
  const { user } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'guardian', 'student'

  const showGuardianPortal = currentView === 'guardian' || (user && user.role === 'guardian');
  const showStudentPortal = currentView === 'student' || (user && user.role === 'student');

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    if (role === 'guardian' && user && user.role === 'guardian') {
      setCurrentView('guardian');
      return;
    }
    if (role === 'student' && user && user.role === 'student') {
      setCurrentView('student');
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
        ) : showStudentPortal ? (
          <StudentDashboard onBack={() => setCurrentView('landing')} />
        ) : (
          <>
            <UserPortalBanner
              onOpenConsentModal={() => setConsentModalOpen(true)}
              onOpenGuardianDashboard={() => setCurrentView('guardian')}
              onOpenStudentDashboard={() => setCurrentView('student')}
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
