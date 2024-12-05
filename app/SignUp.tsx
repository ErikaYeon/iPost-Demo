import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderText from "../ui/components/HeaderText";
import RegularText from "../ui/components/RegularText";
import LinkText from "../ui/components/LinkText";
import InputField from "../ui/components/InputField";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { createLogInScreenStyles } from "../ui/styles/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { AppDispatch, RootState } from "@/redux/store";
import { signupAsync } from "@/redux/slices/authSlice";
import { SignupRequest } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import {
  isEmailValid,
  isPasswordValid,
  isStringWithNoSpaces,
} from "@/utils/RegexExpressions";
import {
  setProfileEmail,
  setProfileUsername,
} from "@/redux/slices/profileSlice";
import { useTranslation } from "react-i18next";

const SignUpScreen: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme);

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password) {
      setErrorMessage(i18n.t("signUp.errors.missingFields"));
    } else if (!isEmailValid(email)) {
      setErrorMessage(i18n.t("signUp.errors.invalidEmail"));
    } else if (!isPasswordValid(password)) {
      setErrorMessage(i18n.t("signUp.errors.invalidPassword"));
    } else if (!isStringWithNoSpaces(username)) {
      setErrorMessage(i18n.t("signUp.errors.invalidUsername"));
    } else {
      setErrorMessage("");
      dispatch(setProfileEmail({ email }));
      dispatch(setProfileUsername({ username }));
      const userData: SignupRequest = {
        email,
        password,
        username,
        name: Placeholders.DEFAULT_PROFILE_NAME,
        lastname: Placeholders.DEFAULT_PROFILE_LASTNAME,
      };

      try {
        const result = await dispatch(signupAsync(userData)).unwrap();

        if (result.status === 201) {
          router.push("/ActivateAccount");
        }
      } catch (error: any) {
        if (error.status === 409 || error.status === 404) {
          setErrorMessage(i18n.t("signUp.errors.emailTaken"));
        } else {
          console.error("Error from signup:", error);
          setErrorMessage(i18n.t("signUp.errors.genericError"));
        }
      }
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <HeaderText text={i18n.t("signUp.header.prefix")} theme={theme} />
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
            color: theme.colors.textPrimary,
            marginLeft: 5,
          }}
        >
          {i18n.t("signUp.header.appName")}
        </Text>
      </View>

      <InputField
        label={i18n.t("signUp.fields.email.label")}
        placeholder={i18n.t("signUp.fields.email.placeholder")}
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      <InputField
        label={i18n.t("signUp.fields.username.label")}
        placeholder={i18n.t("signUp.fields.username.placeholder")}
        value={username}
        onChangeText={setUsername}
        error={!!errorMessage}
        theme={theme}
      />

      <InputField
        label={i18n.t("signUp.fields.password.label")}
        placeholder={i18n.t("signUp.fields.password.placeholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={!!errorMessage}
        theme={theme}
      />

      <CustomButton
        title={i18n.t("signUp.actions.register")}
        onPress={handleRegister}
        type="primary"
        theme={theme}
        style={{ marginTop: 30, width: "85%" }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 7,
          marginBottom: 10,
        }}
      >
        <RegularText text={i18n.t("signUp.links.login.prefix")} theme={theme} />
        <LinkText
          text={` ${i18n.t("signUp.links.login.action")}`}
          onPress={() => router.push("/LogIn")}
          theme={theme}
        />
      </View>

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SignUpScreen;
