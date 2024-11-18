import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileAdditionalInfo: React.FC<{ theme: any }> = ({ theme }) => {
  const styles = createStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.bio}>- Comer, rezar, amar 🙏{"\n"} - Mamá de 🐶🐴</Text>
      <Text style={styles.followInfo}>
        <Text style={styles.boldText}>234</Text> seguidores · <Text style={styles.boldText}>567</Text> seguidos
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
