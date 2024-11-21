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
import { useDispatch, useSelector } from "react-redux";
import { changePasswordAsync } from "@/redux/slices/authSlice"; // Si implementas esta acción
import { AppDispatch, RootState } from "@/redux/store";
import { router } from "expo-router";
import { ChangePasswordRequest } from "@/types/apiContracts";
import { isPasswordValid } from "@/utils/RegexExpressions";

const ChangePasswordScreen: React.FC = () => {
  // Establecer manualmente el tema aquí (elige entre darkTheme o lightTheme)
  const theme = darkTheme; // Cambia esto a lightTheme si prefieres el modo claro

  const dispatch = useDispatch<AppDispatch>();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userEmail = useSelector((state: RootState) => state.profile.email);

  const styles = createChangePasswordStyles(theme); // Genera estilos dinámicamente

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage("Por favor, completa todos los campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("La nueva contraseña y su confirmación no coinciden.");
      return;
    } else if (!isPasswordValid(newPassword)) {
      setErrorMessage(
        "La contraseña debe tener al menos 6 caracteres y un carácter especial."
      );
    }

    if (newPassword.length < 8) {
      setErrorMessage("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    try {
      setErrorMessage("");
      const Request: ChangePasswordRequest = {
        email: userEmail,
        password: currentPassword,
        newPassword: newPassword,
      };
      const resultAction = await dispatch(changePasswordAsync(Request));

      if (changePasswordAsync.fulfilled.match(resultAction)) {
        const { message } = resultAction.payload;
        setSuccessMessage(message);
      } else if (changePasswordAsync.rejected.match(resultAction)) {
        const { message } = resultAction.payload || {
          message: "Error inesperado",
        };
        setErrorMessage(message);
      }
    } catch {
      setErrorMessage("Error inesperado");
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
          // style={styles.link}
        />
      </View>
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.errorText}>{successMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ChangePasswordScreen;
