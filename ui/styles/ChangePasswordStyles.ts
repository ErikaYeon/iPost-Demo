import { StyleSheet, Platform, StatusBar } from "react-native";
import { darkTheme } from "../../ui/styles/Theme";

const theme = darkTheme;

const styles = StyleSheet.create({
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
    paddingHorizontal: 0,
    paddingTop: 15,
    alignItems: "center",
  },
  inputField: {
    width: "100%",
    marginBottom: 15,
  },
  saveButton: {
    width: "85%",
    marginTop: 20,
    marginBottom: 10,
    backgroundColor: theme.colors.primary,
  },
  link: {
    alignSelf: "center",
  },
});

export default styles;
