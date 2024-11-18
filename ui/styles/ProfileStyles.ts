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
    followButtonContainer: {
      alignItems: "center",
      marginVertical: 6,
    },
    followButton: {
      paddingVertical: 10,
      borderRadius: 30,
    },
    followButtonText: {
      fontSize: 16,
      fontWeight: "bold",
      textAlign: "center",
    },    
    tabsContainer2: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.textPrimary, // Color del borde
      backgroundColor: theme.colors.background,
    },
    tabButton: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },
    tabButtonDisabled: {
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
    },
    tabButtonText: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.textPrimary, // Siempre mantiene este color
    },  
  });
