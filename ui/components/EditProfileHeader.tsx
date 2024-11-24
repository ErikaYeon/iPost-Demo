import Placeholders from "@/constants/ProfilePlaceholders";
import { RootState } from "@/redux/store";
import { router } from "expo-router";
import React from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const EditProfileHeader: React.FC<{ theme: any }> = ({ theme }) => {
  const styles = createStyles(theme);
  const Profile = useSelector((state: RootState) => state.profile);
  return (
    <>
      <View>
        <TouchableOpacity onPress={() => router.push("/EditProfileCover")}>
          <Image
            source={{
              uri:
                Profile.coverImage ?? Placeholders.DEFAULT_PROFILE_PHOTO_COVER,
            }}
            style={styles.coverImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <TouchableOpacity onPress={() => router.push("/EditProfilePhoto")}>
            <Image
              source={{
                uri: Profile.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO,
              }}
              style={styles.profilePicture}
            />
          </TouchableOpacity>
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
      marginTop: -35,
    },
    profilePictureContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 2,
      borderColor: theme.colors.background,
      overflow: "hidden",
      marginLeft: 16,
    },
    profilePicture: {
      width: "100%",
      height: "100%",
    },
  });

export default EditProfileHeader;
