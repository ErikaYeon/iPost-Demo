import { Stack } from "expo-router";
import store from '../redux/store';
import { Provider } from 'react-redux';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const StackLayout = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }}>
          {/* <Stack.Screen name="(tabs)"  /> */}
          <Stack.Screen name="index"  />

        </Stack>
      </GestureHandlerRootView>
    </Provider>

  );
}

export default StackLayout;