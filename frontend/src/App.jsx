import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { QualityPricing } from './components/QualityPricing';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';
import { LoginPage } from './pages/LoginPage';
import { CreateAccountPage } from './pages/CreateAccountPage';
import { Dashboards } from './pages/Dashboards';

const AppContent = () => {
  const { currentView } = useApp();

  if (currentView === 'login') {
    return <LoginPage />;
  }

  if (currentView === 'create-account') {
    return <CreateAccountPage />;
  }

  if (
    currentView === 'dashboard-volunteer' ||
    currentView === 'dashboard-center' ||
    currentView === 'dashboard-headoffice'
  ) {
    return <Dashboards />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900 antialiased font-sans flex flex-col justify-between">
      <div>
        {/* Sticky Compact Navbar */}
        <Navbar />

        {/* Main High-Impact Home Sections */}
        <main>
          {/* Hero */}
          <Hero />

          {/* How It Works */}
          <HowItWorks />

          {/* Quality-Based Fair Pricing */}
          <QualityPricing />

          {/* Final CTA */}
          <CTASection />
        </main>
      </div>

      {/* Minimal Small Footer */}
      <Footer />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
