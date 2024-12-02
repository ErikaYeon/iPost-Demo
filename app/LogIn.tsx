import React, { useState } from "react";
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import InputField from "../ui/components/InputField";
import HeaderText from "../ui/components/HeaderText";
import LinkText from "../ui/components/LinkText";
import RegularText from "../ui/components/RegularText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import createLogInScreenStyles from "@/ui/styles/LogIn";
import { useRouter } from "expo-router";
import { useDispatch } from "react-redux";
import RegularTextLine from "@/ui/components/RegularTextLine";
import { isEmailValid } from "@/utils/RegexExpressions";
import { AppDispatch } from "@/redux/store";
import { loginAsync } from "@/redux/slices/authSlice";
import {
  setProfileExtraData,
  setProfileEmail,
} from "@/redux/slices/profileSlice";
import { useTranslation } from "react-i18next"; // Hook de i18n

const LogInScreen: React.FC = () => {
  const theme = darkTheme; // Cambiar manualmente a lightTheme si es necesario
  const sharedStyles = createSharedStyles(theme);
  const styles = createLogInScreenStyles(theme);

  const { t, i18n } = useTranslation("translations");

  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleLogin = async () => {
    if (!email || !password) {
      setErrorMessage(i18n.t("loginScreen.errorMessage.fillFields"));
    } else if (!isEmailValid(email)) {
      setErrorMessage(i18n.t("loginScreen.errorMessage.invalidEmail"));
    } else {
      try {
        setErrorMessage("");
        dispatch(setProfileEmail({ email }));
        const resultAction = await dispatch(loginAsync({ email, password }));
        if (loginAsync.fulfilled.match(resultAction)) {
          setEmail("");
          setPassword("");
          dispatch(setProfileExtraData(resultAction.payload));
          router.push("/(tabs)/home");
        } else {
          setErrorMessage(i18n.t("loginScreen.errorMessage.invalidCredentials"));
        }
      } catch (error) {
        console.error("Error from login:", error);
        setErrorMessage(i18n.t("loginScreen.errorMessage.genericError"));
      }
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />

        <View style={styles.headerContainer}>
          <HeaderText text={i18n.t("loginScreen.header.title")} theme={theme} />
          <Text style={styles.headerText}>iPost</Text>
        </View>



      <InputField
        label={i18n.t("loginScreen.input.email.label")}
        placeholder={i18n.t("loginScreen.input.email.placeholder")}
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      <InputField
        label={i18n.t("loginScreen.input.password.label")}
        placeholder={i18n.t("loginScreen.input.password.placeholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={!!errorMessage}
        theme={theme}
      />
      <View style={{ marginTop: 7 }}>
        <LinkText
          text={i18n.t("loginScreen.link.forgotPassword")}
          onPress={() => router.push("/RestorePssword1")}
          theme={theme}
        />
      </View>

      <CustomButton
        title={i18n.t("loginScreen.button.login")}
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.medium, width: "85%" }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 7,
          marginBottom: 10,
        }}
      >
        <RegularText text={i18n.t("loginScreen.text.noAccount")} theme={theme} />
        <LinkText
          text={`${i18n.t("loginScreen.link.signup")}`}
          onPress={() => router.push("/SignUp")}
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

export default LogInScreen;
