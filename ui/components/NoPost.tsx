import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface NoPostsProps {
  theme: any;
}

const NoPosts: React.FC<NoPostsProps> = ({ theme }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icons/Camera.png")}
        style={styles.image}
      />
      <Text style={[styles.text, { color: theme.colors.textPrimary }]}>
        No hay ningún post
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default NoPosts;
