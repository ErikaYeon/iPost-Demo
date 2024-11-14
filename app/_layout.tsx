import { Stack } from "expo-router";
import store from "../redux/store";
import { Provider } from "react-redux";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import DeepLinkListener from "@/hooks/DeepLinkListener";

const linking = {
  prefixes: ["ipost://"],
  config: {
    screens: {
      RecoverAccount: "magic-link/:token",
    },
  },
};

const StackLayout = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DeepLinkListener />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default StackLayout;
