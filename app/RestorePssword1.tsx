import React, { useState } from "react";
import { SafeAreaView, Image, View, Text } from "react-native";
import CustomButton from "../ui/components/CustomButton";
import InputField from "../ui/components/InputField";
import LinkText from "../ui/components/LinkText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme } from "../ui/styles/Theme";
import { styles } from "@/ui/styles/LogIn";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { clearProfile } from "../redux/slices/profileSlice";
import { isEmailValid } from "@/utils/RegexExpressions";
import { forgotPasswordAsync } from "@/redux/slices/authSlice";
import { AppDispatch } from "@/redux/store";

const theme = darkTheme; // Para alternar entre light y dark mode
const sharedStyles = createSharedStyles(theme);

const RestorePassword1: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleResetPass = async () => {
    if (!email) {
      setErrorMessage("Por favor, completa los campos.");
    } else if (!isEmailValid(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
    } else {
      try {
        setErrorMessage("");
        dispatch(clearProfile());
        const resultAction = await dispatch(forgotPasswordAsync({ email }));
        if (forgotPasswordAsync.fulfilled.match(resultAction)) {
          console.log("Contraseña correctamente reseteada");
          router.push("/RestorePssword2");
        } else {
          setErrorMessage("Error al recuperar contraseña, intente nuevamente");
        }
      } catch (error) {
        console.error("Error en la recuperación de la contraseña:", error);
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
        <Text style={styles.headerTextContra}> Reestablecer Contraseña</Text>
      </View>

      <Text style={styles.TextInfo}>
        Ingresa tu correo electrónico y te enviaremos un enlace para que
        recuperes el acceso a tu cuenta.
      </Text>

      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      {/* <View style={{marginTop:10,}}> */}
      <CustomButton
        title="Enviar Enlace"
        onPress={handleResetPass}
        type="primary"
        theme={theme}
        style={{
          marginTop: theme.spacing.large,
          width: "85%",
          marginBottom: theme.spacing.large,
        }}
      />
      {/* </View>s */}

      <LinkText
        text="Volver al inicio de sesión"
        onPress={() => router.push("/LogIn")}
        theme={theme}
      />

      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default RestorePassword1;
