import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Image,
  Text,
  Linking,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import MessageText from "../ui/components/MessageText";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme } from "../ui/styles/Theme";
import { router } from "expo-router";
import { styles } from "@/ui/styles/LogIn";
import { useDispatch } from "react-redux";
import {
  magicLinkLoginAsync,
  resendEmailAsync,
} from "@/redux/slices/authSlice"; // Acción para login con magic link
import { AppDispatch } from "@/redux/store";
import { EmailType } from "@/types/apiContracts";

const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const RestorePassword2: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const email = userProfile.email;
  const emailType = EmailType.RECOVERY;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleReenvio = async () => {
    console.log(email);
    try {
      const result = await dispatch(resendEmailAsync({ email, emailType }));
      setSuccessMessage("Email enviado con éxito");
    } catch (error) {
      console.error("Error from signup:", error);
      setErrorMessage("Ocurrió un error, intentalo nuevamente");
    }
  };

  const handleMagicLinkLogin = async (token: string) => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(magicLinkLoginAsync({ token }));
      setLoading(false);
      router.push("/home");
    } catch (err) {
      setLoading(false);
      setError("Hubo un error al intentar iniciar sesión. Intenta nuevamente.");
    }
  };

  // Función para manejar los deep links
  const handleDeepLink = (url: string) => {
    const tokenFromLink = url?.match(/token=([^&]+)/)?.[1]; // Extraer el token del deep link
    if (tokenFromLink) {
      setToken(tokenFromLink); // Almacenar el token
      handleMagicLinkLogin(tokenFromLink); // Llamar a la función de autologin
    } else {
      setError("Token inválido o no encontrado en el enlace.");
    }
  };

  useEffect(() => {
    const handleUrlEvent = (event: { url: string }) =>
      handleDeepLink(event.url);
    const susbcription = Linking.addEventListener("url", handleUrlEvent);

    Linking.getInitialURL().then((url) => {
      if (url) handleDeepLink(url);
    });

    return () => {
      susbcription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}> Reestablecer Contraseña</Text>
      </View>

      <View style={{ marginTop: 20, marginBottom: 10 }}>
        <MessageText
          message="Se ha enviado un enlace de recuperación al correo asociado a su cuenta. Revisa también la carpeta de spam o correo no deseado si no lo encuentras"
          boldText="enlace de recuperación"
          theme={theme}
        />
      </View>

      {loading && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={{ marginTop: 10 }}>Autenticando...</Text>
        </View>
      )}

      {error && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <Text style={{ color: "red" }}>{error}</Text>
        </View>
      )}

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"
        onPress={() => console.log("Reenviar enlace")} // Aquí puedes manejar la lógica para reenviar el enlace
        type="primary"
        theme={theme}
        style={{ marginBottom: theme.spacing.medium, width: "85%" }}
      />

      {/* Enlace para "Volver a inicio de sesión" */}
      <LinkText
        text="Volver a inicio de sesión"
        onPress={() => router.push("/LogIn")}
        theme={theme}
      />
    </SafeAreaView>
  );
};

export default RestorePassword2;
