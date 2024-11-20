import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'react-native-localize';

import en from '../assets/localization/translations/en.json';
import es from '../assets/localization/translations/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const languageDetector = {
  type: 'languageDetector',
  async: true,
  detect: (callback) => {
    const locale = Localization.getLocales()[0]?.languageCode || 'en';
    callback(locale);
  },
  init: () => {},
  cacheUserLanguage: () => {},
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en', // Idioma predeterminado
    resources,
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
  });

export default i18n;
