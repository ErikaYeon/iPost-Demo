import React, { useState } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CustomButton from '../ui/components/CustomButton';
import MessageText from '../ui/components/MessageText'; 
import LinkText from '../ui/components/LinkText'; 
import createSharedStyles from '../ui/styles/SharedStyles';
import { createChangePasswordStyles } from "../ui/styles/ChangePasswordStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { useDispatch } from "react-redux";
// import { changePasswordAsync } from "@/redux/slices/authSlice"; // Si implementas esta acción
import { AppDispatch } from "@/redux/store";
import { router } from "expo-router";



const ChangePassword2: React.FC = () => {
  // Establecer manualmente el tema aquí (elige entre darkTheme o lightTheme)
  const theme = darkTheme; // Cambia esto a lightTheme si prefieres el modo claro

  const sharedStyles = createSharedStyles(theme);

  const styles = createChangePasswordStyles(theme);

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

      <View style={{marginTop:20, marginBottom:10}}>
      <MessageText
        message="Se le envió un link de verificación al correo asociado a esta cuenta. Revisa tu carpeta de correo no deseado o spam si no lo ves en la casilla de entrada"
        boldText="enlace de verificación"
        theme={theme}
      />
      </View>

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"
        onPress={() => console.log('Reenviar enlace')}
        type="primary"
        theme={theme}
        style={{ marginBottom: theme.spacing.medium, width: '85%' }}
      />

    </View>
  );
};


export default ChangePassword2;
