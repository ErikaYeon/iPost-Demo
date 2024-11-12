import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderText from "../ui/components/HeaderText";
import RegularText from "../ui/components/RegularText";
import LinkText from "../ui/components/LinkText";
import InputField from "../ui/components/InputField";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme } from "../ui/styles/Theme";
import { styles } from "../ui/styles/LogIn";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import RegularTextLine from "@/ui/components/RegularTextLine";
import { AppDispatch, RootState } from "@/redux/store";
import { signupAsync } from "@/redux/slices/authSlice";
import { SignupRequest } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import {
  isEmailValid,
  isPasswordValid,
  isStringWithNoSpaces,
} from "@/utils/RegexExpressions";
import { setProfileEmail , setProfilePassword, setProfileUsername } from "@/redux/slices/profileSlice";

const theme = darkTheme; // Para alternar entre darkTheme y lightTheme manualmente
const sharedStyles = createSharedStyles(theme);

const SignUpScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    if (!email || !username || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
    } else if (!isEmailValid(email)) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
    }
    // Check if password meets the requirements
    else if (!isPasswordValid(password)) {
      setErrorMessage(
        "La contraseña debe tener al menos 6 caracteres y un carácter especial."
      );
    }
    // Check if password meets the requirements
    else if (!isStringWithNoSpaces(username)) {
      setErrorMessage("El username no puede tener espacios en blanco.");
    } else {
      setErrorMessage("");
      dispatch(setProfileEmail({ email }));
      dispatch(setProfilePassword({ password }));
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
          setErrorMessage("Error. El email ya está registrado");
        } else {
        console.error("Error from signup:", error);
        setErrorMessage("Ocurrió un error, intentalo nuevamente");
      }
    }
    };
  }

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      {/* Texto "Regístrese en iPost" */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <HeaderText text="Regístrese en" theme={theme} />
        <Text style={styles.headerText}> iPost</Text>
      </View>

      {/* Input de Correo electrónico */}
      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Input de Nombre de usuario */}
      <InputField
        label="Nombre de usuario"
        placeholder="usuario_ejemplo"
        value={username}
        onChangeText={setUsername}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Input de Contraseña */}
      <InputField
        label="Contraseña"
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Botón de Registrarse */}
      <CustomButton
        title="Registrarte"
        onPress={handleRegister}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.large, width: "85%" }}
      />

      {/* Link para iniciar sesión */}
      <View
        style={{ flexDirection: "row", justifyContent: "center", marginTop: 7 }}
      >
        <RegularText text="¿Tienes una cuenta? " theme={theme} />
        <LinkText
          text="Inicia sesión"
          onPress={() => router.push("/LogIn")}
          theme={theme}
        />
      </View>

      {/* Texto "o continua con" */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: theme.spacing.small,
        }}
      >
        <RegularTextLine text="O continua con" theme={theme} />
      </View>

      {/* Botón de Google con imagen PNG */}
      <TouchableOpacity
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.small }]} // Usa los estilos separados
        onPress={() => console.log("Google")}
      >
        <Image
          source={require("../assets/images/icons/Google.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={sharedStyles.googleText}>Google</Text>
      </TouchableOpacity>

      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default SignUpScreen;


