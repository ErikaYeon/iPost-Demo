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
import { useTranslation } from "react-i18next";

const RestorePassword2: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const theme = darkTheme;
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const emialProfile = useSelector((state: RootState) => state.profile.email);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSendEmail = async () => {
    await dispatch(forgotPasswordAsync(emialProfile));
    setSuccessMessage(i18n.t('restorePassword2.successMessage'));
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}>{i18n.t('restorePassword2.header')}</Text>
      </View>

      <View
        style={{
          marginTop: theme.spacing.medium,
          marginBottom: theme.spacing.small,
        }}
      >
        <MessageText
          message={i18n.t('restorePassword2.infoMessage')}
          boldText={i18n.t('restorePassword2.boldText')}
          theme={theme}
        />
      </View>

      <CustomButton
        title={i18n.t('restorePassword2.buttonText')}
        onPress={handleSendEmail}
        type="primary"
        theme={theme}
        style={{ marginBottom: 35, width: "85%" }}
      />

      <LinkText
        text={i18n.t('restorePassword2.linkText')}
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
