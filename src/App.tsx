import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authStore';
import { Layout } from './components/Layout/Layout';
import { AuthForm } from './components/Auth/AuthForm';
import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { ChatPage } from './pages/ChatPage';

function App() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showAuth, setShowAuth] = useState(false);
  const { isAuthenticated } = useAuthStore();

  const handleGetStarted = () => {
    setAuthMode('register');
    setShowAuth(true);
  };

  if (showAuth && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
        <AuthForm mode={authMode} onModeChange={setAuthMode} />
        <Toaster position="top-center" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <HomePage onGetStarted={handleGetStarted} />
        <Toaster position="top-center" />
      </>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Layout title="Dashboard" />}>
          <Route index element={<DashboardPage />} />
        </Route>
        <Route path="/chat" element={<Layout title="AI Chat" />}>
          <Route index element={<ChatPage />} />
        </Route>
        <Route path="/expenses" element={<Layout title="Expenses" />}>
          <Route index element={<div className="p-6 text-center">Expenses page coming soon!</div>} />
        </Route>
        <Route path="/goals" element={<Layout title="Goals" />}>
          <Route index element={<div className="p-6 text-center">Goals page coming soon!</div>} />
        </Route>
        <Route path="/education" element={<Layout title="Learn" />}>
          <Route index element={<div className="p-6 text-center">Education page coming soon!</div>} />
        </Route>
        <Route path="/achievements" element={<Layout title="Achievements" />}>
          <Route index element={<div className="p-6 text-center">Achievements page coming soon!</div>} />
        </Route>
        <Route path="/settings" element={<Layout title="Settings" />}>
          <Route index element={<div className="p-6 text-center">Settings page coming soon!</div>} />
        </Route>
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;