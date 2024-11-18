import { StyleSheet, Platform, StatusBar } from "react-native";
import { Theme } from "@/ui/styles/Theme";

export const createChangePasswordStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      width: "100%",
    },
    safeArea: {
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    contentContainer: {
      paddingHorizontal: theme.spacing.medium,
      paddingTop: theme.spacing.large,
      alignItems: "center",
    },
    inputField: {
      width: "100%",
      marginBottom: theme.spacing.medium,
    },
    saveButton: {
      width: "85%",
      marginTop: theme.spacing.medium,
      marginBottom: theme.spacing.small,
      backgroundColor: theme.colors.primary,
    },
    link: {
      alignSelf: "center",
      color: theme.colors.textSecondary,
      textDecorationLine: "underline",
    },
    errorBanner: {
      marginTop: theme.spacing.small,
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.error,
      borderRadius: theme.borderRadius,
      width: "90%",
    },
    errorText: {
      color: theme.colors.background,
      fontSize: theme.fonts.small,
    },
    successBanner: {
      marginTop: theme.spacing.small,
      padding: theme.spacing.medium,
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius,
      width: "90%",
    },
    successText: {
      color: theme.colors.background,
      fontSize: theme.fonts.small,
    },
  });

export default createChangePasswordStyles;
