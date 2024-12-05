import React, { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderText from "../ui/components/HeaderText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { useRouter } from "expo-router";
import RegularTextLine from "@/ui/components/RegularTextLine";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { autoLoginAsync } from "@/redux/slices/authSlice";
import { setProfileUserId } from "@/redux/slices/profileSlice";

const FirstScreen: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

  const sharedStyles = createSharedStyles(theme);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { status, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const performAutoLogin = async () => {
      const resultAction = await dispatch(autoLoginAsync());

      if (autoLoginAsync.fulfilled.match(resultAction)) {
        const { userId } = resultAction.payload;
        dispatch(setProfileUserId(userId));
        router.push("/(tabs)/home");
      }
    };

    performAutoLogin();
  }, [dispatch, router]);

  if (loading || status === "idle") {
    return (
      <SafeAreaView style={sharedStyles.screenContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      {/* Logo como imagen PNG */}
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={{ width: 180, height: 180 }}
      />

      {/* Texto "Bienvenidos a iPost" */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <HeaderText text={"Bienvenido a"} theme={theme} />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: theme.colors.textPrimary,
          }}
        >
          {" "}
          iPost
        </Text>
      </View>

      {/* Contenedor de botones */}
      <View style={{ width: "100%", alignItems: "center" }}>
        {/* Botón de Iniciar sesión */}
        <CustomButton
          title={"Iniciar sesión"}
          onPress={() => router.push("/LogIn")}
          type="primary"
          theme={theme}
          style={{ marginBottom: theme.spacing.medium, width: "85%" }}
        />

        {/* Botón de Registrarse */}
        <CustomButton
          title={"Registrarse"}
          onPress={() => router.push("/SignUp")}
          type="secondary"
          theme={theme}
          style={{
            marginBottom: theme.spacing.medium,
            width: "85%",
            borderWidth: 1,
          }}
        />
      </View>

      {/* Texto "o continua con" */}
      <RegularTextLine text={"continuar con"} theme={theme} />

      {/* Botón de Google con imagen PNG */}
      {/* <TouchableOpacity
        style={[
          sharedStyles.googleButton,
          { marginTop: theme.spacing.medium, width: "85%" },
        ]}
        onPress={() => router.push("/LogInFaceId")}
      >
        <Image
          source={require("../assets/images/icons/Google.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={sharedStyles.googleText}>Google</Text>
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default FirstScreen;
