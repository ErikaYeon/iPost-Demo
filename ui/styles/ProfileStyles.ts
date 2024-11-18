// ProfileScreenStyles.ts
import { StyleSheet, Dimensions } from "react-native";
import { Theme } from "@/ui/styles/Theme"; // Asegúrate de actualizar esta ruta

const screenWidth = Dimensions.get("window").width;

export const createProfileScreenStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    tabsContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.background,
      backgroundColor: theme.colors.background,
    },
    gridContainer: {
      flex: 1,
      backgroundColor: theme.colors.background, // Fondo oscuro para la grilla
    },
    postImage: {
      width: screenWidth / 3 - 2,
      height: screenWidth / 3 - 2,
      borderRadius: theme.borderRadius,
    },
    followButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.borderRadius * 2,
      paddingHorizontal: theme.spacing.large,
      paddingVertical: theme.spacing.small,
    },
  });
