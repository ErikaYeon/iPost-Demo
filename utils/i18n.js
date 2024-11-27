import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importa los textos traducidos
import en from "./translations/en/translation.json";
import es from "./translations/es/translation.json";

i18n
  .use(initReactI18next) // Integración con React
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
    },
    lng: 'es', // Idioma inicial
    fallbackLng: 'es', // Idioma por defecto si no se encuentra una traducción
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
