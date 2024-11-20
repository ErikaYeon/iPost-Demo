import { StyleSheet, Platform, StatusBar } from "react-native";
import { Theme } from "@/ui/styles/Theme";

export const createSearchProfilesStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      backgroundColor: theme.colors.background,
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    },
    searchBarContainer: {
      paddingHorizontal: theme.spacing.medium,
      marginBottom: theme.spacing.small,
    },
    listContainer: {
      paddingHorizontal: theme.spacing.medium,
    },
    profileContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: theme.spacing.small,
      borderBottomWidth: 1,
      borderBottomColor: '#B5BACB',
    },
    profileImage: {
      width: 44,
      height: 44,
      borderRadius: 25,
      marginRight: theme.spacing.small,
    },
    profileInfo: {
      flex: 1,
    },
    nameContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom:-5,
    },
    profileName: {
      fontSize: 15,
      fontWeight: "bold",
      color: theme.colors.textPrimary,
      marginLeft: theme.spacing.xsmall,
    },
    profileUsername: {
      fontSize: 15,
      color: '#B5BACB',
    },
  });

export default createSearchProfilesStyles;
