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

const ChangePassword2: React.FC = () => {
  // Establecer manualmente el tema aquí (elige entre darkTheme o lightTheme)
  const theme = darkTheme; // Cambia esto a lightTheme si prefieres el modo claro

  const sharedStyles = createSharedStyles(theme);

  const styles = createChangePasswordStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const emialProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emialProfile));
    setSuccessMessage("Email enviado con éxito");
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
          title="Cambiar contraseña"
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
            message="Se le enviará un link de verificación al correo asociado a esta cuenta. Revisa tu carpeta de correo no deseado o spam si no lo ves en la casilla de entrada"
            boldText="link de verificación"
            theme={theme}
          />
        </View>

        {/* Botón "Reenviar enlace" */}
        <CustomButton
          title="Enviar enlace"
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
