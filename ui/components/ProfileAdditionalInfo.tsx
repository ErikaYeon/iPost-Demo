import { RootState } from "@/redux/store";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const ProfileAdditionalInfo: React.FC<{ theme: any }> = ({ theme }) => {
  const styles = createStyles(theme);
  const Profile = useSelector((state: RootState) => state.profile);
  return (
    <View style={styles.container}>
      <Text style={styles.bio}>{Profile.description}</Text>
      <Text style={styles.followInfo}>
        <Text style={styles.boldText}>{Profile.followersCount}</Text> seguidores
        · <Text style={styles.boldText}>{Profile.followingCount}</Text> seguidos
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
