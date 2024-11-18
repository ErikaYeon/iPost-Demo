import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import InputField from "../ui/components/InputField";
import LinkText from "../ui/components/LinkText";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import { darkTheme } from "../ui/styles/Theme";

const theme = darkTheme;

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = () => {
    console.log("Contraseña cambiada");
    // Implementar lógica para cambiar contraseña aquí
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() => (
            <BackIcon width={24} height={24} fill={theme.colors.textPrimary} />
          )}
          title="Cambiar contraseña"
          onPress={() => console.log("Volver")}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.contentContainer}>
        <InputField
          label="Contraseña actual"
          placeholder="**************"
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField} // Aplicando estilo al componente directamente
        />

        <InputField
          label="Contraseña nueva"
          placeholder="**************"
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry
          theme={theme}
          style={styles.inputField} // Aplicando estilo al componente directamente
        />

        <CustomButton
          title="Cambiar"
          onPress={handleChangePassword}
          type="primary"
          theme={theme}
          style={styles.button}
        />

        <LinkText
          text="Olvidé mi contraseña"
          onPress={() => console.log("Olvidé mi contraseña")}
          theme={theme}
          style={styles.link}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  safeArea: {
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: "center",
  },
  inputField: {
    width: "90%", // Aplicando directamente al InputField
    marginBottom: 20,
    alignSelf: "center", // Asegura que se centre incluso si cambia el padre
  },
  button: {
    width: "90%", // Ancho consistente con los inputs
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: theme.colors.primary,
    alignSelf: "center", // Asegura el centrado
  },
  link: {
    alignSelf: "center",
  },
});

export default ChangePasswordScreen;
