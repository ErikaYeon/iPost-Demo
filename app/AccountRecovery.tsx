import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import MessageText from "../ui/components/MessageText";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { lightTheme, darkTheme } from "../ui/styles/Theme";
import createLogInScreenStyles from "../ui/styles/LogIn";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { useTranslation } from "react-i18next";
import {
  forgotPasswordAsync,
  magicLinkLoginAsync,
} from "@/redux/slices/authSlice";
import * as Linking from "expo-linking";
import { setProfileUserId } from "@/redux/slices/profileSlice";

const AccountRecovery: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const emialProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      try {
        console.log("Raw Deep Link URL:", event.url);

        const result = Linking.parse(event.url);

        console.log(JSON.stringify(result, null, 4));
        console.log("Parsed Query Params:", result.queryParams);

        const token = result.queryParams?.token as string;

        if (token) {
          console.log("Token encontrado:", token);
          const result = await dispatch(magicLinkLoginAsync(token));

          if (magicLinkLoginAsync.fulfilled.match(result)) {
            console.log("Magic Link Login Exitoso");
            const { id } = result.payload;
            dispatch(setProfileUserId(id));
            router.replace("/(tabs)/home");
          } else {
            console.log("Magic Link Login no Exitoso");
            router.replace("/Welcome");
          }
        } else {
          console.log(
            `No token found in deep link. Redirecting to Welcome page.`
          );
          router.replace("/Welcome");
        }
      } catch (error) {
        console.error("Error en manejo de deep link:", error);
        router.replace("/Welcome");
      }
    };

    // Listener para deep links cuando la app está abierta
    const subscription = Linking.addEventListener("url", handleDeepLink);

    // Verificar deep link inicial
    const checkDeepLink = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        console.log("Deep link inicial:", url);
        handleDeepLink({ url });
      }
    };

    // Intentar de inmediato y también suscribir a los cambios
    checkDeepLink();

    return () => {
      subscription.remove();
    };
  }, []);

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emialProfile));
    setSuccessMessage(i18n.t("restorePassword2.successMessage"));
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}>
          {i18n.t("restorePassword2.header")}
        </Text>
      </View>

      <View
        style={{
          marginTop: theme.spacing.medium,
          marginBottom: theme.spacing.small,
        }}
      >
        <MessageText
          message={i18n.t("restorePassword2.infoMessage")}
          boldText={i18n.t("restorePassword2.boldText")}
          theme={theme}
        />
      </View>

      <CustomButton
        title={i18n.t("restorePassword2.buttonText")}
        onPress={handleSendEmail}
        type="primary"
        theme={theme}
        style={{ marginBottom: 35, width: "85%" }}
      />

      <LinkText
        text={i18n.t("restorePassword2.linkText")}
        onPress={() => router.push("/LogIn")}
        theme={theme}
      />

      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.errorText}>{successMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default AccountRecovery;
