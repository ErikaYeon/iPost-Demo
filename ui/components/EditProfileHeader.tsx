import React from "react";
import { View, Image, StyleSheet } from "react-native";

const EditProfileHeader: React.FC = () => {
  return (
    <>
      {/* Foto de portada */}
      <Image
        source={{ uri: "https://img.freepik.com/foto-gratis/fondo-mar-playa-vacio_74190-313.jpg" }}
        style={styles.coverImage}
      />
      {/* Foto de perfil */}
      <View style={styles.profileInfoContainer}>
        <View style={styles.profilePictureContainer}>
          <Image
            source={{ uri: "https://img.freepik.com/foto-gratis/selfie-retrato-videollamada_23-2149186122.jpg" }}
            style={styles.profilePicture}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  coverImage: {
    width: "100%",
    height: 150,
  },
  profileInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: -5,
    marginTop: -35, // Para superponer la foto de perfil sobre la portada
  },
  profilePictureContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: "#FFF",
    overflow: "hidden",
    marginLeft: 16, // Alinea la foto de perfil con un margen izquierdo
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
});

export default EditProfileHeader;
