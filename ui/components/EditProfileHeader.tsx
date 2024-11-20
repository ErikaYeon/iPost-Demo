import React from "react";
import { View, Image, StyleSheet } from "react-native";

const EditProfileHeader: React.FC<{ theme: any }> = ({ theme }) => {
  const styles = createStyles(theme);
  return (
    <>
      <Image
        source={{ uri: "https://img.freepik.com/foto-gratis/fondo-mar-playa-vacio_74190-313.jpg" }}
        style={styles.coverImage}
      />
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
