import React, { useState } from "react";
import { SafeAreaView, View, Text, StatusBar } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import LightModeIcon from "../assets/images/icons/light_mode.svg";
import DarkModeIcon from "../assets/images/icons/dark_mode.svg";
import LightModeSelectedIcon from "../assets/images/icons/light_mode_selected.svg";
import SelectableOption from "../ui/components/SelectableOption";
import SettingsOption from "../ui/components/SettingsOption";
import SettingsStyles from "../ui/styles/SettingsStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import ConfirmLogout from "../ui/components/ConfirmLogout";
import ConfirmDeleteAccount from "../ui/components/ConfirmDeleteAccount";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout, deleteAccountAsync } from "@/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { clearPosts } from "@/redux/slices/postSlice";
import { clearProfile } from "@/redux/slices/profileSlice";
import { resetPosts } from "@/redux/slices/timelineSlice";

const SettingsScreen: React.FC = () => {
  const [themeMode, setThemeMode] = useState<"light" | "dark">("dark");
  const [language, setLanguage] = useState("Español");
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [isDeleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const userId = useSelector((state: RootState) => state.profile.id);

  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  const containerBackgroundColor = themeMode === "dark" ? "#383860" : "#DCDCE4";
  const themeSelectedBackgroundColor =
    themeMode === "dark" ? "#EEEEEE" : theme.colors.background;
  const lightModeTextColor = themeMode === "dark" ? "#EEEEEE" : "#201E43";
  const darkModeTextColor = themeMode === "dark" ? "#383860" : "#201E43";
  const languageSelectedBackgroundColor = themeSelectedBackgroundColor;
  const languageSelectedTextColor =
    themeMode === "dark" ? "#383860" : "#201E43";

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("access_token");
      await AsyncStorage.removeItem("refresh_token");

      dispatch(logout());
      dispatch(clearPosts());
      dispatch(clearProfile());
      dispatch(resetPosts());

      router.push("/Welcome");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  const handleDeleteAccount = async () => {
    try {
      const result = await dispatch(deleteAccountAsync(userId)); //Todo: no fucniona
      // console.log("cuenta eliminada con exito" + result);
      router.push("/Welcome");
    } catch {
      console.log("error al querer eliminar la cuenta");
    }
  };

  const renderSelectableOption = ({
    isSelected,
    onPress,
    text,
    icon,
    selectedTextColor,
    unselectedTextColor,
  }: {
    isSelected: boolean;
    onPress: () => void;
    text: string;
    icon?: JSX.Element;
    selectedTextColor: string;
    unselectedTextColor: string;
  }) => (
    <SelectableOption
      isSelected={isSelected}
      onPress={onPress}
      text={text}
      icon={icon}
      selectedBackgroundColor={themeSelectedBackgroundColor}
      unselectedBackgroundColor={containerBackgroundColor}
      selectedTextColor={selectedTextColor}
      unselectedTextColor={unselectedTextColor}
    />
  );

  const renderSettingsOption = ({
    text,
    onPress,
    color,
    dividerColor,
  }: {
    text: string;
    onPress: () => void;
    color: string;
    dividerColor: string;
  }) => (
    <SettingsOption
      text={text}
      onPress={onPress}
      color={color}
      dividerColor={dividerColor}
    />
  );

  return (
    <SafeAreaView
      style={[
        SettingsStyles.safeArea,
        { backgroundColor: theme.colors.background },
      ]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />

      {/* Header */}
      <View style={SettingsStyles.headerContainer}>
        <HeaderWithIcon
          iconComponent={() =>
            themeMode === "light" ? (
              <BackIconLightMode
                width={15}
                height={15}
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
          title="Ajustes"
          onPress={() => router.back()}
          theme={theme}
        />
      </View>

      {/* Body */}
      <View style={SettingsStyles.container}>
        {/* Tema */}
        <Text
          style={[
            SettingsStyles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Tema
        </Text>
        <View
          style={[
            SettingsStyles.optionContainer,
            { backgroundColor: containerBackgroundColor },
          ]}
        >
          {renderSelectableOption({
            isSelected: themeMode === "light",
            onPress: () => setThemeMode("light"),
            text: "Claro",
            icon:
              themeMode === "light" ? (
                <LightModeSelectedIcon width={24} height={24} />
              ) : (
                <LightModeIcon width={24} height={24} />
              ),
            selectedTextColor: lightModeTextColor,
            unselectedTextColor: "#EEEEEE",
          })}
          {renderSelectableOption({
            isSelected: themeMode === "dark",
            onPress: () => setThemeMode("dark"),
            text: "Oscuro",
            icon: <DarkModeIcon width={24} height={24} />,
            selectedTextColor: darkModeTextColor,
            unselectedTextColor: "#201E43",
          })}
        </View>

        {/* Idioma */}
        <Text
          style={[
            SettingsStyles.sectionTitle,
            { color: theme.colors.textPrimary },
          ]}
        >
          Idioma
        </Text>
        <View
          style={[
            SettingsStyles.optionContainer,
            { backgroundColor: containerBackgroundColor },
          ]}
        >
          {renderSelectableOption({
            isSelected: language === "Español",
            onPress: () => setLanguage("Español"),
            text: "Español",
            selectedTextColor: languageSelectedTextColor,
            unselectedTextColor: theme.colors.textSecondary,
          })}
          {renderSelectableOption({
            isSelected: language === "Inglés",
            onPress: () => setLanguage("Inglés"),
            text: "Inglés",
            selectedTextColor: languageSelectedTextColor,
            unselectedTextColor: theme.colors.textSecondary,
          })}
        </View>

        {/* Opciones adicionales */}
        <View
          style={[
            SettingsStyles.fullWidthDivider,
            { backgroundColor: theme.colors.textSecondary },
          ]}
        />
        <View>
          {renderSettingsOption({
            text: "Cambiar contraseña",
            onPress: () => router.push("/ChangePassword"),
            color: theme.colors.textPrimary,
            dividerColor: theme.colors.textSecondary,
          })}
          {renderSettingsOption({
            text: "Cerrar sesión",
            onPress: () => setLogoutVisible(true),
            color: theme.colors.textPrimary,
            dividerColor: theme.colors.textSecondary,
          })}
          {renderSettingsOption({
            text: "Eliminar cuenta",
            onPress: () => setDeleteAccountVisible(true),
            color: theme.colors.error,
            dividerColor: theme.colors.textSecondary,
          })}
        </View>
      </View>

      {/* Ventanas emergentes */}
      {isLogoutVisible && (
        <ConfirmLogout
          visible={isLogoutVisible}
          onCancel={() => setLogoutVisible(false)}
          onConfirm={() => {
            setLogoutVisible(false);
            handleLogout();
          }}
          theme={theme}
        />
      )}
      {isDeleteAccountVisible && (
        <ConfirmDeleteAccount
          visible={isDeleteAccountVisible}
          onCancel={() => setDeleteAccountVisible(false)}
          onConfirm={() => {
            setDeleteAccountVisible(false);
            handleDeleteAccount();
          }}
          theme={theme}
        />
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
