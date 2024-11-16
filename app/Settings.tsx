import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  Dimensions,
} from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import LightModeIcon from "../assets/images/icons/light_mode.svg";
import DarkModeIcon from "../assets/images/icons/dark_mode.svg";
import SelectableOption from "../ui/components/SelectableOption";
import SettingsOption from "../ui/components/SettingsOption";
import { darkTheme, lightTheme } from "../ui/styles/Theme";

const SettingsScreen: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState("Español");

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const handlePasswordChange = () => console.log("Cambiar contraseña presionado");
  const handleLogout = () => console.log("Cerrar sesión presionado");
  const handleDeleteAccount = () => console.log("Eliminar cuenta presionado");

  const themeSelectedBackgroundColor = themeMode === "dark" ? "#FFFFFF" : "#12C1A4";
  const themeSelectedTextColor = themeMode === "dark" ? "#201E43" : "#FFFFFF";

  const languageSelectedBackgroundColor = themeMode === "light" ? "#12C1A4" : "#fff";
  const languageSelectedTextColor = themeMode === "light" ? "#FFFFFF" : theme.colors.background;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <HeaderWithIcon
          iconComponent={() => (
            <BackIcon width={24} height={24} fill={theme.colors.textPrimary} />
          )}
          title="Ajustes"
          onPress={() => console.log("Volver")}
          theme={theme}
        />
      </View>

      {/* Body */}
      <View style={styles.container}>
        {/* Tema */}
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Tema</Text>
        <View style={styles.optionContainer}>
          <SelectableOption
            isSelected={themeMode === "light"}
            onPress={() => setThemeMode("light")}
            text="Claro"
            icon={<LightModeIcon width={24} height={24} />}
            selectedBackgroundColor={themeSelectedBackgroundColor}
            unselectedBackgroundColor={theme.colors.background}
            selectedTextColor={themeSelectedTextColor}
            unselectedTextColor="#EEEEEE"
          />
          <SelectableOption
            isSelected={themeMode === "dark"}
            onPress={() => setThemeMode("dark")}
            text="Oscuro"
            icon={<DarkModeIcon width={24} height={24} />}
            selectedBackgroundColor={themeSelectedBackgroundColor}
            unselectedBackgroundColor={theme.colors.background}
            selectedTextColor={themeSelectedTextColor}
            unselectedTextColor="#201E43"
          />
        </View>

        {/* Idioma */}
        <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>Idioma</Text>
        <View style={styles.optionContainer}>
          <SelectableOption
            isSelected={language === "Español"}
            onPress={() => setLanguage("Español")}
            text="Español"
            selectedBackgroundColor={languageSelectedBackgroundColor}
            unselectedBackgroundColor={theme.colors.background}
            selectedTextColor={languageSelectedTextColor}
            unselectedTextColor={theme.colors.textSecondary}
          />
          <SelectableOption
            isSelected={language === "Inglés"}
            onPress={() => setLanguage("Inglés")}
            text="Inglés"
            selectedBackgroundColor={languageSelectedBackgroundColor}
            unselectedBackgroundColor={theme.colors.background}
            selectedTextColor={languageSelectedTextColor}
            unselectedTextColor={theme.colors.textSecondary}
          />
        </View>

        {/* Opciones adicionales */}
        <View
            style={[
              styles.fullWidthDivider,
              { backgroundColor: theme.colors.textSecondary },
            ]}
          />
        <View>
          <SettingsOption
            text="Cambiar contraseña"
            onPress={handlePasswordChange}
            color={theme.colors.textPrimary}
            dividerColor={theme.colors.textSecondary}
          />
          <SettingsOption
            text="Cerrar sesión"
            onPress={handleLogout}
            color={theme.colors.textPrimary}
            dividerColor={theme.colors.textSecondary}
          />
          <SettingsOption
            text="Eliminar cuenta"
            onPress={handleDeleteAccount}
            color={theme.colors.error}
            dividerColor={theme.colors.textSecondary}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  container: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: darkTheme.colors.textSecondary,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  fullWidthDivider: {
    height: 1,
    width: Dimensions.get("window").width, // Asegura que ocupe todo el ancho
    alignSelf: "center",
  },
});

export default SettingsScreen;
