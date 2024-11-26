import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import CrownGrey from "@/assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "@/assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "@/assets/images/icons/gamif_crown_2.svg";
import CrownGold from "@/assets/images/icons/gamif_crown_3.svg";
import EditIcon from "../../assets/images/icons/edit.svg";
import SettingsIcon from "../../assets/images/icons/settings.svg";
import Placeholders from "@/constants/ProfilePlaceholders";
import { Crown } from "@/types/models";
import { isEmpty } from "@/utils/RegexExpressions";
import { router } from "expo-router";

const ProfileHeader: React.FC<{ theme: any; isOtherProfile?: boolean }> = ({
  theme,
  isOtherProfile = false,
}) => {
  const profileData = useSelector((state: RootState) =>
    isOtherProfile ? state.otherProfile : state.profile
  );

  const styles = createStyles(theme);

  // Renderiza la corona correspondiente usando el enum Crown
  const renderCrownIcon = (type: Crown) => {
    switch (type) {
      case Crown.GREY:
        return <CrownGrey width={20} height={20} style={styles.crownIcon} />;
      case Crown.BRONCE:
        return <CrownBronze width={20} height={20} style={styles.crownIcon} />;
      case Crown.SILVER:
        return <CrownSilver width={20} height={20} style={styles.crownIcon} />;
      case Crown.GOLD:
        return <CrownGold width={20} height={20} style={styles.crownIcon} />;
      default:
        return <CrownGrey width={20} height={20} style={styles.crownIcon} />;
    }
  };

  return (
    <>
      {/* Imagen de portada */}
      <Image
        source={{
          uri: isEmpty(profileData.coverImage)
            ? Placeholders.DEFAULT_PROFILE_PHOTO_COVER
            : profileData.coverImage,
        }}
        style={styles.coverImage}
      />

      <View style={styles.profileInfoContainer}>
        {/* Imagen de perfil */}
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: isEmpty(profileData.profileImage)
                ? Placeholders.DEFAULT_PROFILE_PHOTO
                : profileData.profileImage,
            }}
            style={styles.profilePicture}
          />
        </View>

        <View style={styles.headerContainer}>
          {/* Nombre, apellido y corona */}
          <View style={styles.userDetailsContainer}>
            <View style={styles.usernameContainer}>
              {renderCrownIcon(profileData.crown as Crown)}
              <Text style={styles.name}>
                {profileData.name} {profileData.lastname}
              </Text>
            </View>
            <Text style={styles.username}>@{profileData.username}</Text>
          </View>

          {/* Botones de editar/configuración (solo para perfil propio) */}
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
    coverImage: {
      width: "100%",
      height: 150,
    },
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
    profilePicture: {
      width: "100%",
      height: "100%",
    },
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
    usernameContainer: {
      flexDirection: "row",
      alignItems: "center",
    },
    name: {
      fontSize: 18,
      fontWeight: "bold",
      marginLeft: 5,
      color: theme.colors.textPrimary,
    },
    crownIcon: {
      marginRight: 5,
    },
    username: {
      fontSize: 14,
      marginTop: -2,
      color: theme.colors.textSecondary,
    },
    iconsContainer: {
      flexDirection: "row",
      marginTop: 20,
    },
    icon: {
      marginLeft: 8,
    },
  });

export default ProfileHeader;
