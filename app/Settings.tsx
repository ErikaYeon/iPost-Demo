import React, { useEffect, useState } from "react";
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
import {
  clearProfile,
  updateTheme,
  updateLanguage,
  setUserSettingsAsync,
} from "@/redux/slices/profileSlice";
import { resetPosts } from "@/redux/slices/timelineSlice";
import { languageToLevel, themeToLevel } from "../types/mappers";
import { UserSettingsResponse } from "@/types/apiContracts";
import { useTranslation } from "react-i18next";
import i18next from "i18next"; // Asegúrate de importar i18next

const SettingsScreen: React.FC = () => {
  const { t, i18n } = useTranslation("translations"); // Usando i18next para la traducción
  console.log(i18n.t("settings.title"))
  
  const [isLogoutVisible, setLogoutVisible] = useState(false);
  const [isDeleteAccountVisible, setDeleteAccountVisible] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const Profile = useSelector((state: RootState) => state.profile);
  const userId = Profile.id;
  const themeMode = Profile.theme;
  const language = Profile.language;

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
      const result = await dispatch(deleteAccountAsync(userId)).unwrap(); 
      console.log("Cuenta eliminada con éxito: " + result);
      router.push("/Welcome");
    } catch (error: any) {
      console.log(error);
      console.log("Error al intentar eliminar la cuenta");
    }
  };

  const handleGoBack = () => {
    const userSettings: UserSettingsResponse = {
      language: languageToLevel(Profile.language),
      theme: themeToLevel(Profile.theme),
    };
    dispatch(setUserSettingsAsync({ userSettings, userId }));
    router.back();
  };

  // Función para cambiar el idioma
  const handleChangeLanguage = (lang: string) => {
    i18next.changeLanguage(lang); // Cambia el idioma con i18next
    dispatch(updateLanguage(lang)); // Actualiza el idioma en Redux
    AsyncStorage.setItem('language', lang); // Guarda el idioma en AsyncStorage
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
      style={[SettingsStyles.safeArea, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />

      {/* Header */}
      <View style={SettingsStyles.headerContainer}>
        <HeaderWithIcon
          iconComponent={() =>
            themeMode === "light" ? (
              <BackIconLightMode width={15} height={15} fill={theme.colors.textPrimary} />
            ) : (
              <BackIcon width={18} height={18} fill={theme.colors.textPrimary} />
            )
          }
          title={i18n.t("settings.title")}  //PONER i18n!!!
          onPress={handleGoBack}
          theme={theme}
        />
      </View>

      {/* Body */}
      <View style={SettingsStyles.container}>
        {/* Tema */}
        <Text style={[SettingsStyles.sectionTitle, { color: theme.colors.textPrimary }]}>
          {t("settings.theme")}
        </Text>
        <View style={[SettingsStyles.optionContainer, { backgroundColor: containerBackgroundColor }]}>
          {renderSelectableOption({
            isSelected: themeMode === "light",
            onPress: () => dispatch(updateTheme("light")),
            text: t("settings.lightMode"),
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
            onPress: () => dispatch(updateTheme("dark")),
            text: t("settings.darkMode"),
            icon: <DarkModeIcon width={24} height={24} />,
            selectedTextColor: darkModeTextColor,
            unselectedTextColor: "#201E43",
          })}
        </View>

        {/* Idioma */}
        <Text style={[SettingsStyles.sectionTitle, { color: theme.colors.textPrimary }]}>
          {t("settings.language")}
        </Text>
        <View style={[SettingsStyles.optionContainer, { backgroundColor: containerBackgroundColor }]}>
          {renderSelectableOption({
            isSelected: language === "Español",
            onPress: () => handleChangeLanguage("es"), // Cambia a Español
            text: t("settings.spanish"),
            selectedTextColor: languageSelectedTextColor,
            unselectedTextColor: theme.colors.textSecondary,
          })}
          {renderSelectableOption({
            isSelected: language === "Inglés",
            onPress: () => handleChangeLanguage("en"), // Cambia a Inglés
            text: t("settings.english"),
            selectedTextColor: languageSelectedTextColor,
            unselectedTextColor: theme.colors.textSecondary,
          })}
        </View>

        {/* Opciones adicionales */}
        <View style={[SettingsStyles.fullWidthDivider, { backgroundColor: theme.colors.textSecondary }]} />
        <View>
          {renderSettingsOption({
            text: t("settings.changePassword"),
            onPress: () => router.push("/ChangePassword"),
            color: theme.colors.textPrimary,
            dividerColor: theme.colors.textSecondary,
          })}
          {renderSettingsOption({
            text: t("settings.logout"),
            onPress: () => setLogoutVisible(true),
            color: theme.colors.textPrimary,
            dividerColor: theme.colors.textSecondary,
          })}
          {renderSettingsOption({
            text: t("settings.deleteAccount"),
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
          onConfirm={handleLogout}
          theme={theme}
        />
      )}
      {isDeleteAccountVisible && (
        <ConfirmDeleteAccount
          visible={isDeleteAccountVisible}
          onCancel={() => setDeleteAccountVisible(false)}
          onConfirm={handleDeleteAccount}
          theme={theme}
        />
      )}
    </SafeAreaView>
  );
};

export default SettingsScreen;
