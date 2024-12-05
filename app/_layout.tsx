import React from "react";
import { Stack } from "expo-router";
import store from "../redux/store";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";

import translation_es from "../utils/translations/es/translations.json";
import translation_en from "../utils/translations/en/translations.json";

i18next.use(initReactI18next).init({
  interpolation: { escapeValue: false },
  lng: "es", //Lenguaje Inicial
  resources: {
    es: {
      translation: translation_es,
    },
    en: {
      translation: translation_en,
    },
  },
});

const StackLayout = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18next}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
          </Stack>
        </GestureHandlerRootView>
      </I18nextProvider>
    </Provider>
  );
};

export default StackLayout;
