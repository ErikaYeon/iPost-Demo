import React from "react";
import { SafeAreaView, View, Image, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import MessageText from "../ui/components/MessageText";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { lightTheme, darkTheme } from "../ui/styles/Theme";
import createLogInScreenStyles from "../ui/styles/LogIn";
import { router } from "expo-router";

const RestorePassword2: React.FC = () => {
  const theme = darkTheme; // Cambiar a lightTheme si deseas usar el tema claro
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme); // Generar estilos dinámicos

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo} // Usando estilo dinámico
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}>Reestablecer Contraseña</Text>
      </View>

      <View style={{ marginTop: theme.spacing.medium, marginBottom: theme.spacing.small }}>
        <MessageText
          message="Se ha enviado un enlace de recuperación al correo asociado a su cuenta. Revisa también la carpeta de spam o correo no deseado si no lo encuentras"
          boldText="enlace de recuperación"
          theme={theme}
        />
      </View>

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"
        onPress={() => console.log("Reenviar enlace")}
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
    </SafeAreaView>
  );
};

export default RestorePassword2;
