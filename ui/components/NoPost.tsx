import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

interface NoPostsProps {
  theme: any; // Tema dinámico
}

const NoPosts: React.FC<NoPostsProps> = ({ theme }) => {
  const styles = createStyles(theme); // Crear estilos dinámicos según el tema

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icons/Camera.png")}
        style={styles.image}
      />
      <Text style={styles.text}>No hay ningún post</Text>
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Fondo dinámico
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
      color: theme.colors.textPrimary, // Texto dinámico
    },
  });

export default NoPosts;
