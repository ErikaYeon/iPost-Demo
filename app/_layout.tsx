import { Stack } from "expo-router";
import store from '../redux/store';
import { Provider } from 'react-redux';

const StackLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen name="(tabs)"  /> */}
        <Stack.Screen name="index"  />

      </Stack>
    </Provider>

  );
}

export default StackLayout;