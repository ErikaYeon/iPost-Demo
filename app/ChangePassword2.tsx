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
import { useTranslation } from "react-i18next";

const ChangePassword2: React.FC = () => {
  const { t, i18n } = useTranslation("translations"); // Inicializa i18n
  const theme = darkTheme;

  const sharedStyles = createSharedStyles(theme);
  const styles = createChangePasswordStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const emailProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emailProfile));
    setSuccessMessage(i18n.t("changePassword2.successMessage"));
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
          title={i18n.t("changePassword2.headerTitle")}
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
            message={i18n.t("changePassword2.instructions")}
            boldText={i18n.t("changePassword2.boldText")}
            theme={theme}
          />
        </View>

        {/* Botón "Enviar enlace" */}
        <CustomButton
          title={i18n.t("changePassword2.sendLinkButton")}
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
