import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES } from '../data/mockData';
import i18n from '../i18n';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'login' | 'create-account' | 'dashboard-volunteer' | 'dashboard-center' | 'dashboard-headoffice'
  const [userSession, setUserSession] = useState(null); // Stores logged-in user details
  const [selectedLanguage, setSelectedLanguageState] = useState(() => {
    const savedCode = localStorage.getItem('selectedLanguage') || 'en';
    return LANGUAGES.find(l => l.code === savedCode) || LANGUAGES[0];
  });
  const [toastMessage, setToastMessage] = useState(null);

  const setSelectedLanguage = (langObj) => {
    if (!langObj) return;
    const targetLang = typeof langObj === 'string' ? (LANGUAGES.find(l => l.code === langObj) || LANGUAGES[0]) : langObj;
    setSelectedLanguageState(targetLang);
    localStorage.setItem('selectedLanguage', targetLang.code);
    i18n.changeLanguage(targetLang.code);
  };

  useEffect(() => {
    if (selectedLanguage?.code) {
      i18n.changeLanguage(selectedLanguage.code);
    }
  }, []);

  const navigateTo = (viewName) => {
    if (viewName === '/' || viewName === 'home') {
      setCurrentView('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (viewName.startsWith('#')) {
      if (currentView !== 'home') {
        setCurrentView('home');
        setTimeout(() => {
          const elem = document.querySelector(viewName);
          if (elem) elem.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const elem = document.querySelector(viewName);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    setCurrentView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        userSession,
        setUserSession,
        selectedLanguage,
        setSelectedLanguage,
        navigateTo,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
