import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import CrownIcon3 from "../../assets/images/icons/gamif_crown_3.svg";
import CrownIcon0_1 from "../../assets/images/icons/gamif_crown_0_1.svg";
import CrownIcon0_2 from "../../assets/images/icons/gamif_crown_0_2.svg";
import CrownIcon1 from "../../assets/images/icons/gamif_crown_1.svg";
import CrownIcon2 from "../../assets/images/icons/gamif_crown_2.svg";
import EditIcon from "../../assets/images/icons/edit.svg";
import SettingsIcon from "../../assets/images/icons/settings.svg";
import { router } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { Crown } from "@/types/models";
import { isEmpty } from "@/utils/RegexExpressions";

const ProfileHeader: React.FC<{ theme: any; isOtherProfile?: boolean }> = ({
  theme,
  isOtherProfile = false,
}) => {
  const styles = createStyles(theme);
  //TODO: MANEJAR LA DIFERENCIA DE PERFILES
  const Profile = useSelector((state: RootState) => state.profile);

  const name = Profile.name;
  const lastname = Profile.lastname;
  const username = Profile.username;
  console.log(Profile.crown);

  return (
    <>
      <Image
        source={{
          uri: isEmpty(Profile.coverImage)
            ? Placeholders.DEFAULT_PROFILE_PHOTO_COVER
            : Profile.coverImage,
        }}
        style={styles.coverImage}
      />
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{
              uri: isEmpty(Profile.profileImage)
                ? Placeholders.DEFAULT_PROFILE_PHOTO
                : Profile.profileImage,
            }}
            style={styles.profilePicture}
          />
        </View>
        <View style={styles.headerContainer}>
          <View style={styles.userDetailsContainer}>
            <View style={styles.usernameContainer}>
              {Profile.crown === 0 ? (
                <CrownIcon3 width={20} height={20} style={styles.crownIcon} />
              ) : Profile.crown === 1 ? (
                <CrownIcon2 width={20} height={20} style={styles.crownIcon} />
              ) : Profile.crown === 2 ? (
                <CrownIcon1 width={20} height={20} style={styles.crownIcon} />
              ) : (
                <CrownIcon0_1 width={20} height={20} style={styles.crownIcon} />
              )}
              <Text style={styles.name}>
                {name} {lastname}
              </Text>
            </View>
            <Text style={styles.username}>@{username}</Text>
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
