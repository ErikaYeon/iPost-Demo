import React from "react";
import {
  fetchFollowingsUser,
  fetchFollowersUser,
} from "@/redux/slices/searchSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const ProfileAdditionalInfo: React.FC<{
  theme: any;
  isOtherProfile?: boolean;
}> = ({ theme, isOtherProfile = false }) => {
  const styles = createStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

  const profileData = useSelector((state: RootState) =>
    isOtherProfile ? state.otherProfile : state.profile
  );

  const handleOnPressFollowings = () => {
    dispatch(fetchFollowingsUser(profileData.id));
    router.push("/SearchFollowing");
  };
  const handleOnPressFollowers = () => {
    dispatch(fetchFollowersUser(profileData.id));
    router.push("/SearchFollowers");
  };

  const { t, i18n } = useTranslation("translations");

  return (
    <View style={styles.container}>
      <Text style={styles.bio}>{profileData.description}</Text>
      <Text style={styles.followInfo}>
        {isOtherProfile ? (
          <>
            <Text style={styles.boldText}>{profileData.followersCount}</Text>{" "}
            {i18n.t("profile.followers")} ·{" "}
            <Text style={styles.boldText}>{profileData.followingCount}</Text>{" "}
            {i18n.t("profile.following")}
          </>
        ) : (
          <>
            <Text style={styles.followInfo}>
              <TouchableOpacity onPress={handleOnPressFollowers}>
                <Text style={styles.boldText}>
                  {profileData.followersCount}{" "}
                  <Text style={styles.boldText}>{i18n.t("profile.followers")}</Text>
                </Text>
              </TouchableOpacity>
              {" · "}
              <TouchableOpacity onPress={handleOnPressFollowings}>
                <Text style={styles.boldText}>
                  {profileData.followingCount}{" "}
                  <Text style={styles.boldText}>{i18n.t("profile.following")}</Text>
                </Text>
              </TouchableOpacity>
            </Text>
          </>
        )}
      </Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      marginTop: 12,
    },
    bio: {
      color: theme.colors.textPrimary,
      fontSize: theme.fonts.small,
      marginBottom: 4,
    },
    followInfo: {
      color: theme.colors.textPrimary,
      fontSize: theme.fonts.small,
      marginVertical: 10,
    },
    boldText: {
      fontWeight: "bold",
      color: theme.colors.textPrimary,
    },
  });

export default ProfileAdditionalInfo;
