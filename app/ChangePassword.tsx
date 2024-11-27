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
import { changePasswordAsync } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { router } from "expo-router";
import { ChangePasswordRequest } from "@/types/apiContracts";
import { isPasswordValid } from "@/utils/RegexExpressions";
import { useTranslation } from "react-i18next"; // Importar hook de traducción

const ChangePasswordScreen: React.FC = () => {
  const { t } = useTranslation(); // Inicializar traducciones
  const theme = darkTheme; // Cambia a lightTheme si prefieres el modo claro

  const dispatch = useDispatch<AppDispatch>();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const userEmail = useSelector((state: RootState) => state.profile.email);

  const styles = createChangePasswordStyles(theme);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setErrorMessage(t("change_password.errors.empty_fields")); // Traducción
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(t("change_password.errors.passwords_mismatch")); // Traducción
      return;
    } else if (!isPasswordValid(newPassword)) {
      setErrorMessage(t("change_password.errors.invalid_password")); // Traducción
    }

    if (newPassword.length < 8) {
      setErrorMessage(t("change_password.errors.short_password")); // Traducción
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
          message: t("change_password.errors.unexpected_error"),
        };
        setErrorMessage(message);
      }
    } catch {
      setErrorMessage(t("change_password.errors.unexpected_error"));
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
          title={t("change_password.title")} // Traducción
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <InputField
          label={t("change_password.labels.current_password")} // Traducción
          placeholder="**************"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label={t("change_password.labels.new_password")} // Traducción
          placeholder="**************"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label={t("change_password.labels.confirm_new_password")} // Traducción
          placeholder="**************"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <CustomButton
          title={t("change_password.buttons.change")} // Traducción
          onPress={handleChangePassword}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />

        <LinkText
          text={t("change_password.links.forgot_password")} // Traducción
          onPress={() => router.push("/ChangePassword2")}
          theme={theme}
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
