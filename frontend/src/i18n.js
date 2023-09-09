import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from './locales/en/translation.json';
import frTranslation from './locales/fr/translation.json';
import esTranslation from './locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslation },
      fr: { translation: frTranslation },
      es: { translation: esTranslation }
    },
    lng: 'en', // default language
    fallbackLng: 'en', // use English if the language can't be detected
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
