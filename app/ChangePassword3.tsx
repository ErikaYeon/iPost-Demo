import React, { useState } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import InputField from "../ui/components/InputField";
import CustomButton from "../ui/components/CustomButton";
import { createChangePasswordStyles } from "../ui/styles/ChangePasswordStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "expo-router";
import changePasswordAsync from "@/redux/slices/authSlice";

const ChangePassword3: React.FC = () => {
  const theme = darkTheme; // Cambia a lightTheme si prefieres el modo claro
  const styles = createChangePasswordStyles(theme);

  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangePassword = async () => {
    if (!password) {
      setErrorMessage("Por favor, ingresa tu nueva contraseña.");
    } else if (password.length < 6) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
    } else {
      try {
        setErrorMessage("");
        const resultAction = await dispatch(changePasswordAsync({ password }));
        if (changePasswordAsync.fulfilled.match(resultAction)) {
          setPassword("");
          router.push("/(tabs)/home"); // Redirigir al home después del cambio de contraseña
        } else {
          setErrorMessage("Error al cambiar la contraseña, inténtalo nuevamente.");
        }
      } catch (error) {
        console.error("Error from change password:", error);
        setErrorMessage("Ocurrió un error, inténtalo nuevamente.");
      }
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
          label="Contraseña nueva"
          placeholder="**************"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField}
        />

        <CustomButton
          title="Aceptar"
          onPress={handleChangePassword}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />
      </View>

      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default ChangePassword3;
