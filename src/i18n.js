// config.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  fallbackLng: 'en', // Fallback language
  lng: 'en', // Default language
  resources: {
    en: { translations: require('./locales/en/translations.json') },
    hi: { translations: require('./locales/hi/translations.json') },
  },
  ns: ['translations'], // Namespace
  defaultNS: 'translations', // Default namespace
});

i18n.languages = ['en', 'hi']; // Supported languages

export default i18n;
