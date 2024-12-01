import React, { useState } from "react";
import { SafeAreaView, Image, View, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import InputField from "../ui/components/InputField";
import HeaderText from "../ui/components/HeaderText";
import LinkText from "../ui/components/LinkText";
import RegularText from "../ui/components/RegularText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { lightTheme, darkTheme } from "../ui/styles/Theme";
import { useDispatch } from "react-redux";
import { setProfile } from "../redux/slices/profileSlice";
import { router } from "expo-router";
import { styles } from "@/ui/styles/LogIn";
import { isPasswordValid } from "@/utils/RegexExpressions";
import { useTranslation } from "react-i18next"; // Hook de i18n

const LogInFaceIdScreen: React.FC = () => {
  const theme = darkTheme; // Para alternar entre light y dark mode
  const sharedStyles = createSharedStyles(theme);
  const { t, i18n } = useTranslation(); // Hook de i18n para traducir

  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const username = "María"; // Nombre del usuario

  const handleLogin = () => {
    if (!password) {
      setErrorMessage(i18n.t("logInFaceIdScreen.errorMessage.fillFields"));
    } else if (!isPasswordValid(password)) {
      setErrorMessage(i18n.t("logInFaceIdScreen.errorMessage.invalidPassword"));
    } else {
      setErrorMessage("");
      dispatch(
        setProfile({
          password,
          email: "",
          username: "",
        })
      );
      setPassword("");
      router.push("/(tabs)/home");
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      {/* Logo como imagen PNG */}
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={{ width: 150, height: 150 }}
      />

      {/* Saludo personalizado */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <HeaderText text={i18n.t("logInFaceIdScreen.header.hello")} theme={theme} />
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            color: theme.colors.textPrimary,
          }}
        >
          {" "}{username}!
        </Text>
      </View>

      {/* Input de Contraseña */}
      <InputField
        label={i18n.t("logInFaceIdScreen.input.password.label")}
        placeholder={i18n.t("logInFaceIdScreen.input.password.placeholder")}
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        theme={theme}
        style={{ marginBottom: 10, marginTop: 10 }}
      />

      <LinkText
        text={i18n.t("logInFaceIdScreen.link.forgotPassword")}
        onPress={() => router.push("/RestorePssword1")}
        theme={theme}
      />

      <CustomButton
        title={i18n.t("logInFaceIdScreen.button.login")}
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{
          marginTop: theme.spacing.large,
          marginBottom: theme.spacing.medium,
          width: "85%",
        }}
      />

      <LinkText
        text={i18n.t("logInFaceIdScreen.link.changeUser")}
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

export default LogInFaceIdScreen;
