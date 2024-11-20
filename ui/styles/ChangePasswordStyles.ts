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
      position: "absolute", // Position it at the bottom
      bottom: 0, // Align to the bottom
      left: 0,
      right: 0,
      backgroundColor: theme.colors.error, // Red background for error
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    errorText: {
      color: "#FFFFFF", // White text
      textAlign: "center",
      fontSize: 16,
    },
    successBanner: {
      position: "absolute", // Position it at the bottom
      bottom: 0, // Align to the bottom
      left: 0,
      right: 0,
      backgroundColor: theme.colors.primary, // Red background for error
      padding: 10,
      borderRadius: 5,
      alignItems: "center",
    },
    // successText: {
    //   color: '#FFFFFF', // White text
    //   textAlign: 'center',
    //   fontSize: 16,
    // },
  });

export default createChangePasswordStyles;
