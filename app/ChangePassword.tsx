import React, { useState } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import InputField from "../ui/components/InputField";
import CustomButton from "../ui/components/CustomButton";
import LinkText from "../ui/components/LinkText";
import { createChangePasswordStyles } from "../ui/styles/ChangePasswordStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { useDispatch } from "react-redux";
// import { changePasswordAsync } from "@/redux/slices/authSlice"; // Si implementas esta acción
import { AppDispatch } from "@/redux/store";

const ChangePasswordScreen: React.FC = () => {
  // Establecer manualmente el tema aquí (elige entre darkTheme o lightTheme)
  const theme = darkTheme; // Cambia esto a lightTheme si prefieres el modo claro

  const dispatch = useDispatch<AppDispatch>();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const styles = createChangePasswordStyles(theme); // Genera estilos dinámicamente

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("La nueva contraseña y su confirmación no coinciden.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      setErrorMessage("");
      const resultAction = await dispatch(
        changePasswordAsync({ currentPassword, newPassword })
      );
      if (changePasswordAsync.fulfilled.match(resultAction)) {
        setSuccessMessage("Contraseña cambiada exitosamente.");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setErrorMessage("Error al cambiar la contraseña. Intenta nuevamente.");
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setErrorMessage("Ocurrió un error, intentalo nuevamente.");
    }
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
              <BackIconLightMode width={18} height={18} fill={theme.colors.textPrimary} />
            ) : (
              <BackIcon width={18} height={18} fill={theme.colors.textPrimary} />
            )
          }
          title="Cambiar contraseña"
          onPress={() => console.log("Volver")}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <InputField
          label="Contraseña actual"
          placeholder="**************"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label="Contraseña nueva"
          placeholder="**************"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label="Confirmación de contraseña nueva"
          placeholder="**************"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <CustomButton
          title="Cambiar"
          onPress={handleChangePassword}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />

        <LinkText
          text="Olvidé mi contraseña"
          onPress={() => console.log("Olvidé mi contraseña")}
          theme={theme}
          style={styles.link}
        />

        {errorMessage ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : null}

        {successMessage ? (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>{successMessage}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ChangePasswordScreen;
