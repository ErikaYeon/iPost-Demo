import React from "react";
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

const theme = darkTheme; // Para alternar entre light y dark mode manualmente
const sharedStyles = createSharedStyles(theme);

const index = () => {
  // return <Redirect href="/home" />;
  return (
    <Provider store={store}>
      <Redirect href="/Welcome" />
    </Provider>
  );
};

export default index;