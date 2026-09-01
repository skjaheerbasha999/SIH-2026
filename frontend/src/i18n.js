import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import teTranslation from './locales/te/translation.json';
import hiTranslation from './locales/hi/translation.json';

const savedLang = typeof window !== 'undefined' ? localStorage.getItem('selectedLanguage') || 'en' : 'en';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      te: { translation: teTranslation },
      hi: { translation: hiTranslation },
    },
    lng: savedLang,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
