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
import { useTranslation } from "react-i18next";

const ChangePasswordScreen: React.FC = () => {
  const { t, i18n } = useTranslation("translations"); // Inicializa i18n
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

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
      setErrorMessage(i18n.t("changePassword.errors.emptyFields"));
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage(i18n.t("changePassword.errors.passwordMismatch"));
      return;
    } else if (!isPasswordValid(newPassword)) {
      setErrorMessage(i18n.t("changePassword.errors.invalidPassword"));
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage(i18n.t("changePassword.errors.shortPassword"));
      return;
    }

    try {
      setErrorMessage("");
      const request: ChangePasswordRequest = {
        email: userEmail,
        password: currentPassword,
        newPassword: newPassword,
      };
      const resultAction = await dispatch(changePasswordAsync(request));

      if (changePasswordAsync.fulfilled.match(resultAction)) {
        const { message } = resultAction.payload;
        setSuccessMessage(message);
      } else if (changePasswordAsync.rejected.match(resultAction)) {
        const { message } = resultAction.payload || {
          message: i18n.t("changePassword.errors.unexpected"),
        };
        setErrorMessage(message);
      }
    } catch {
      setErrorMessage(i18n.t("changePassword.errors.unexpected"));
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
          title={i18n.t("changePassword.headerTitle")}
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <InputField
          label={i18n.t("changePassword.currentPasswordLabel")}
          placeholder={i18n.t("changePassword.passwordPlaceholder")}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label={i18n.t("changePassword.newPasswordLabel")}
          placeholder={i18n.t("changePassword.passwordPlaceholder")}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <InputField
          label={i18n.t("changePassword.confirmNewPasswordLabel")}
          placeholder={i18n.t("changePassword.passwordPlaceholder")}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <CustomButton
          title={i18n.t("changePassword.changeButton")}
          onPress={handleChangePassword}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />

        <LinkText
          text={i18n.t("changePassword.forgotPasswordLink")}
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
