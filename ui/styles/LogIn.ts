import { StyleSheet } from "react-native";
import { darkTheme } from "./Theme";

export const createLogInScreenStyles = (theme: typeof darkTheme) =>
  StyleSheet.create({
    logo: {
      width: 150,
      height: 150,
      marginBottom: 10,
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "baseline",
      padding: 7,
    },
    headerText: {
      fontSize: 34,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
    },
    headerTextContra: {
      fontSize: 25,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
      marginBottom: 9,
    },
    TextInfo: {
      fontSize: 16,
      color: theme.colors.textPrimary,
      textAlign: "center",
      margin: 18,
      marginBottom: 10,
      paddingHorizontal: 10,
    },
    googleButton: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.secondary,
      padding: theme.spacing.small,
      borderRadius: theme.borderRadius,
      width: "85%",
    },
    googleText: {
      color: theme.colors.textSecondary,
      fontSize: theme.fonts.medium,
      fontWeight: "bold",
    },
    errorBanner: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.error,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    errorText: {
      color: "#FFFFFF",
      textAlign: "center",
      fontSize: 16,
    },
    successBanner: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: theme.colors.primary,
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
  });

export default createLogInScreenStyles;
