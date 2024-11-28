import React, { useEffect } from "react";
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";

import createSharedStyles from "@/ui/styles/SharedStyles";
import { lightTheme, darkTheme } from "@/ui/styles/Theme";
import Welcome from "./Welcome";
import store from "../redux/store";
import { Provider } from "react-redux";
import { Redirect } from "expo-router";
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";

import translation_es from "../utils/translations/es/translations.json";
import translation_en from "../utils/translations/en/translations.json";


i18next.init({
  interpolation: { escapeValue: false},
  lng: "es", //Lenguaje Inicial
  resources: {
    es: {
      translation: translation_es,
    },
    en: {
      translation: translation_en,
    },
  }
});

const theme = darkTheme; // Para alternar entre light y dark mode manualmente
const sharedStyles = createSharedStyles(theme);

const handleChangeLanguage = (lang: string) => {
  i18next.changeLanguage(lang);
};


const index = () => {
  // return <Redirect href="/home" />;
  return (
    <I18nextProvider i18n={i18next}>
      <Provider store={store}>
        <Redirect href="/Welcome" />
      </Provider>
    </I18nextProvider>
  );
};

export default index; 