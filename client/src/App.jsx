import React, { useState, useEffect } from 'react';
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
import MentorDashboard from './components/MentorDashboard';
import AdminDashboard from './components/AdminDashboard';
import LmsView from './components/LmsView';
import PitchDemoDayView from './components/PitchDemoDayView';
import SupervisedChatView from './components/SupervisedChatView';

function MainLayout() {
  const { user, isAuthenticated } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authRole, setAuthRole] = useState('student');
  const [consentModalOpen, setConsentModalOpen] = useState(false);
  
  // Views: 'landing' | 'student' | 'guardian' | 'mentor' | 'admin' | 'lms' | 'pitch' | 'chat'
  const [currentView, setCurrentView] = useState('landing');

  // When user logs in as admin, switch directly to admin view
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'admin' && currentView === 'landing') {
        setCurrentView('admin');
      }
    }
  }, [isAuthenticated, user]);

  const handleOpenAuth = (mode = 'login', role = 'student') => {
    if (role === 'guardian' && user && user.role === 'guardian') {
      setCurrentView('guardian');
      return;
    }
    if (role === 'student' && user && user.role === 'student') {
      setCurrentView('student');
      return;
    }
    if (role === 'mentor' && user && user.role === 'mentor') {
      setCurrentView('mentor');
      return;
    }
    if (role === 'admin' && user && user.role === 'admin') {
      setCurrentView('admin');
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
        {currentView === 'guardian' ? (
          <GuardianDashboard onBack={() => setCurrentView('landing')} />
        ) : currentView === 'student' ? (
          <StudentDashboard onBack={() => setCurrentView('landing')} />
        ) : currentView === 'mentor' ? (
          <MentorDashboard user={user} onBack={() => setCurrentView('landing')} />
        ) : currentView === 'admin' ? (
          <AdminDashboard onBack={() => setCurrentView('landing')} />
        ) : currentView === 'lms' ? (
          <LmsView onBack={() => setCurrentView('landing')} />
        ) : currentView === 'pitch' ? (
          <PitchDemoDayView onBack={() => setCurrentView('landing')} />
        ) : currentView === 'chat' ? (
          <SupervisedChatView onBack={() => setCurrentView('landing')} />
        ) : (
          <>
            <UserPortalBanner
              onOpenConsentModal={() => setConsentModalOpen(true)}
              onOpenGuardianDashboard={() => setCurrentView('guardian')}
              onOpenStudentDashboard={() => setCurrentView('student')}
              onOpenMentorDashboard={() => setCurrentView('mentor')}
              onOpenAdminDashboard={() => setCurrentView('admin')}
              onOpenLms={() => setCurrentView('lms')}
              onOpenPitch={() => setCurrentView('pitch')}
              onOpenChat={() => setCurrentView('chat')}
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
