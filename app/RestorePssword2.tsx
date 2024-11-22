import React, { useState } from "react";
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
import { forgotPasswordAsync } from "@/redux/slices/authSlice";

const RestorePassword2: React.FC = () => {
  const theme = darkTheme; // Cambiar a lightTheme si deseas usar el tema claro
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme); // Generar estilos dinámicos
  const dispatch = useDispatch<AppDispatch>();
  const emialProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emialProfile));
    setSuccessMessage("Email enviado con éxito");
  };
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo} // Usando estilo dinámico
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}>Reestablecer Contraseña</Text>
      </View>

      <View
        style={{
          marginTop: theme.spacing.medium,
          marginBottom: theme.spacing.small,
        }}
      >
        <MessageText
          message="Se ha enviado un enlace de recuperación al correo asociado a su cuenta. Revisa también la carpeta de spam o correo no deseado si no lo encuentras"
          boldText="enlace de recuperación"
          theme={theme}
        />
      </View>

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"
        onPress={handleSendEmail}
        type="primary"
        theme={theme}
        style={{ marginBottom: 35, width: "85%" }}
      />

      {/* Enlace para "Volver a inicio de sesión" */}
      <LinkText
        text="Volver a inicio de sesión"
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

export default RestorePassword2;
