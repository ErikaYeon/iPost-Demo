import React from "react";
import { Provider } from "react-redux";
import { Redirect } from "expo-router";

import store from "../redux/store";
import "./i18n";
import { I18nextProvider } from "react-i18next";
import i18n from "../utils/i18n";

const index = () => {
  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <Redirect href="/Welcome" />
      </I18nextProvider>
    </Provider>
  );
};

export default index;
