import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native";
import { darkTheme, lightTheme } from "../../ui/styles/Theme"; // Asegúrate de ajustar la ruta si es necesario

const SettingsStyles = StyleSheet.create({
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
    borderColor: darkTheme.colors.textSecondary, // Ajusta el color dinámicamente en el componente principal si es necesario
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 20,
  },
  fullWidthDivider: {
    height: 1,
    width: Dimensions.get("window").width, // Asegura que ocupe todo el ancho
    alignSelf: "center",
    backgroundColor: darkTheme.colors.textSecondary, // O asigna dinámicamente en el componente principal
  },
});

export default SettingsStyles;
