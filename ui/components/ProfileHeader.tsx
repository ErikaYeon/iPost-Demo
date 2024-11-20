import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import CrownIcon from "../../assets/images/icons/gamif_crown_3.svg";
import EditIcon from "../../assets/images/icons/edit.svg";
import SettingsIcon from "../../assets/images/icons/settings.svg";
import { router } from "expo-router";

const ProfileHeader: React.FC<{ theme: any; isOtherProfile?: boolean }> = ({
  theme,
  isOtherProfile = false,
}) => {
  const styles = createStyles(theme);
  return (
    <>
      <Image
        source={{
          uri: "https://img.freepik.com/foto-gratis/fondo-mar-playa-vacio_74190-313.jpg",
        }}
        style={styles.coverImage}
      />
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: "https://img.freepik.com/foto-gratis/selfie-retrato-videollamada_23-2149186122.jpg",
            }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.userDetailsContainer}>
            <View style={styles.usernameContainer}>
              <CrownIcon width={20} height={20} style={styles.crownIcon} />
              <Text style={styles.name}>María González</Text>
            </View>
            <Text style={styles.username}>@maria_gnz</Text>
          </View>
          {!isOtherProfile && (
            <View style={styles.iconsContainer}>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/EditProfile")}
              >
                <EditIcon width={20} height={20} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.icon}
                onPress={() => router.push("/Settings")}
              >
                <SettingsIcon width={20} height={20} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    coverImage: { width: "100%", height: 150 },
    profileInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      marginLeft: 10,
      marginTop: -35,
    },
    profilePictureContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 1,
      borderColor: theme.colors.background,
      overflow: "hidden",
      marginRight: 16,
    },
    profilePicture: { width: "100%", height: "100%" },
    headerContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    userDetailsContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
      marginTop: 38,
    },
    usernameContainer: { flexDirection: "row", alignItems: "center" },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 5,
      color: theme.colors.textPrimary,
    },
    crownIcon: { marginRight: 5 },
    username: {
      fontSize: 14,
      marginTop: -2,
      color: theme.colors.textSecondary,
    },
    iconsContainer: { flexDirection: "row", marginTop: 20 },
    icon: { marginLeft: 8 },
  });

export default ProfileHeader;
