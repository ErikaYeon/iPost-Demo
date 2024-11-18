import { StyleSheet, Platform, StatusBar } from "react-native";
import { Theme } from "@/ui/styles/Theme";

export const createEditProfilePhotoStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    },
    imageContainer: {
      alignItems: "center",
      marginVertical: theme.spacing.large,
    },
    profileImage: {
      width: 330,
      height: 330,
      borderRadius: 0,
    },
    coverImage: {
      width: "100%",
      height: 160, // Ajusta según el diseño
      resizeMode: "cover", // Asegura que la imagen ocupe todo el espacio
    },    
    optionContainer: {
      marginTop: -15
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: theme.spacing.large,
      paddingHorizontal: theme.spacing.medium,
    },
    cancelButton: {
      width: "40%",
      backgroundColor: theme.colors.error,
      borderColor:theme.colors.error,
    },
    saveButton: {
      width: "40%",
      backgroundColor: theme.colors.primary,
    },
  });

export default createEditProfilePhotoStyles;
