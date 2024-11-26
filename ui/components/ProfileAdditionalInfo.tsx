import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProfileAdditionalInfo: React.FC<{ theme: any; isOtherProfile?: boolean }> = ({
  theme,
  isOtherProfile = false,
}) => {
  const profileData = useSelector((state: RootState) =>
    isOtherProfile ? state.otherProfile : state.profile
  );

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Text style={styles.bio}>{profileData.description}</Text>
      <Text style={styles.followInfo}>
        <Text style={styles.boldText}>{profileData.followersCount}</Text> seguidores ·{" "}
        <Text style={styles.boldText}>{profileData.followingCount}</Text> seguidos
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
    },
  });

export default ProfileAdditionalInfo;
