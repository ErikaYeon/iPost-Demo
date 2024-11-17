import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ProfileAdditionalInfo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.bio}>- Comer, rezar, amar 🙏{"\n"} - Mamá de 🐶🐴</Text>
      <Text style={styles.followInfo}>
        <Text style={styles.boldText}>234</Text> seguidores · <Text style={styles.boldText}>567</Text> seguidos
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 12,
  },
  bio: {
    color: "#FFF",
    fontSize: 14,
    marginBottom: 4,
  },
  followInfo: {
    color: "#FFF",
    fontSize: 14,
    marginVertical:10,
  },
  boldText: {
    fontWeight: "bold",
  },
});

export default ProfileAdditionalInfo;
