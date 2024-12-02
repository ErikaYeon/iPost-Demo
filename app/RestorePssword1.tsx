import React, { useState } from "react";
import { SafeAreaView, Image, View, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import InputField from "../ui/components/InputField";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { lightTheme, darkTheme } from "../ui/styles/Theme";
import createLogInScreenStyles from "../ui/styles/LogIn";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setProfileEmail } from "../redux/slices/profileSlice";
import { isEmailValid } from "@/utils/RegexExpressions";
import { AppDispatch } from "@/redux/store";
import { forgotPasswordAsync } from "@/redux/slices/authSlice";
import { useTranslation } from "react-i18next";

const RestorePassword1: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const theme = darkTheme;
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPass = () => {
    if (!email) {
      setErrorMessage(i18n.t('restorePassword.errorFields'));
    } else if (!isEmailValid(email)) {
      setErrorMessage(i18n.t('restorePassword.errorInvalidEmail'));
    } else {
      setErrorMessage("");
      dispatch(setProfileEmail({ email }));
      dispatch(forgotPasswordAsync(email));
      setEmail("");
      router.push("/RestorePssword2");
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}>{i18n.t('restorePassword.header')}</Text>
      </View>

      <Text style={styles.TextInfo}>
        {i18n.t('restorePassword.info')}
      </Text>

      <InputField
        label=""
        placeholder={i18n.t("loginScreen.input.email.placeholder")}
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      <CustomButton
        title={i18n.t('restorePassword.buttonText')}
        onPress={handleResetPass}
        type="primary"
        theme={theme}
        style={{
          marginTop: 44,
          width: "85%",
          marginBottom: theme.spacing.large,
        }}
      />

      <LinkText
        text={i18n.t('restorePassword.linkText')}
        onPress={() => router.push("/LogIn")}
        theme={theme}
      />

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default RestorePassword1;
