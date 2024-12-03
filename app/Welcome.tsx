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
import { darkTheme } from "../ui/styles/Theme";
import { useRouter } from "expo-router";
import RegularTextLine from "@/ui/components/RegularTextLine";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { autoLoginAsync } from "@/redux/slices/authSlice";
import { setProfileUserId } from "@/redux/slices/profileSlice";
import { useTranslation } from "react-i18next";

const FirstScreen: React.FC = () => {
  const theme = darkTheme; // Puedes cambiar manualmente entre lightTheme y darkTheme
  const sharedStyles = createSharedStyles(theme);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { status, loading } = useSelector((state: RootState) => state.auth);
  const { t, i18n } = useTranslation("translations");

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
        <HeaderText text={i18n.t("firstScreen.welcome")} theme={theme} />
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
          title={i18n.t("firstScreen.login")}
          onPress={() => router.push("/LogIn")}
          type="primary"
          theme={theme}
          style={{ marginBottom: theme.spacing.medium, width: "85%" }}
        />

        {/* Botón de Registrarse */}
        <CustomButton
          title={i18n.t("firstScreen.register")}
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

      {/* Texto "o continuar con" */}
      <RegularTextLine
        text={i18n.t("firstScreen.orContinueWith")}
        theme={theme}
      />
    </SafeAreaView>
  );
};

export default FirstScreen;
