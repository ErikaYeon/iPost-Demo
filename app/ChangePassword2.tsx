import React, { useState } from "react"; 
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CustomButton from "../ui/components/CustomButton";
import MessageText from "../ui/components/MessageText";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { createChangePasswordStyles } from "../ui/styles/ChangePasswordStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { forgotPasswordAsync } from "@/redux/slices/authSlice";
import { useTranslation } from "react-i18next"; // Importar hook de traducción

const ChangePassword2: React.FC = () => {
  const { t } = useTranslation(); // Inicializar traducciones
  const theme = darkTheme; // Cambia a lightTheme si prefieres el modo claro

  const sharedStyles = createSharedStyles(theme);
  const styles = createChangePasswordStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const emialProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emialProfile));
    setSuccessMessage(t("change_password_2.success_message")); // Traducción
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme === darkTheme ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() =>
            theme === lightTheme ? (
              <BackIconLightMode
                width={18}
                height={18}
                fill={theme.colors.textPrimary}
              />
            ) : (
              <BackIcon
                width={18}
                height={18}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title={t("change_password_2.title")} // Traducción
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ marginBottom: 10 }}>
          <MessageText
            message={t("change_password_2.message")} // Traducción
            boldText={t("change_password_2.bold_text")} // Traducción
            theme={theme}
          />
        </View>

        {/* Botón "Reenviar enlace" */}
        <CustomButton
          title={t("change_password_2.button")} // Traducción
          onPress={handleSendEmail}
          theme={theme}
          style={{ marginBottom: theme.spacing.medium, width: "85%" }}
        />
      </View>

      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.errorText}>{successMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ChangePassword2;
