import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Image, Alert } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import OptionButton from "../ui/components/OptionButton";
import CustomButton from "../ui/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { createEditProfilePhotoStyles } from "../ui/styles/EditProfilePhotoStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CameraIcon from "../assets/images/icons/camera.svg";
import UploadIcon from "../assets/images/icons/photo.svg";
import CameraIconLight from "../assets/images/icons/camera_lightMode.svg";
import UploadIconLight from "../assets/images/icons/photo_lightMode.svg";
import { useRouter } from "expo-router";

const EditProfilePhoto: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const router = useRouter();
  const theme = lightTheme; // Cambiar a `lightTheme` si es necesario
  const styles = createEditProfilePhotoStyles(theme);

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la cámara para tomar fotos.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Define el aspecto cuadrado
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permiso denegado", "Se necesita acceso a la galería para subir imágenes.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Define el aspecto cuadrado
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleCancel = () => {
    console.log("Cancelado");
    router.push("/profile"); // Regresa al perfil
  };

  const handleSave = () => {
    console.log("Guardar", selectedImage);
    // Implementa la lógica para guardar la imagen seleccionada
    router.push("/profile"); // Regresa al perfil
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <HeaderWithIcon
        iconComponent={() =>
          theme.isDark ? (
            <BackIcon width={18} height={18} fill={theme.colors.textPrimary} />
          ) : (
            <BackIconLightMode
              width={18}
              height={18}
              fill={theme.colors.textPrimary}
            />
          )
        }
        title="Editar foto de perfil"
        onPress={() => router.push("/profile")}
        theme={theme}
      />

      {/* Imagen Seleccionada */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: selectedImage || "https://via.placeholder.com/150", // Imagen por defecto
          }}
          style={styles.profileImage}
        />
      </View>

      {/* Contenedor de Opciones */}
      <View style={styles.optionContainer}>
        <OptionButton
          iconComponent={() =>
            theme === darkTheme ? (
              <CameraIcon width={24} height={24} />
            ) : (
              <CameraIconLight width={24} height={24} />
            )
          }
          text="Tomar foto"
          onPress={handleTakePhoto}
          theme={theme}
        />
        <OptionButton
          iconComponent={() =>
            theme === darkTheme ? (
              <UploadIcon width={24} height={24} />
            ) : (
              <UploadIconLight width={24} height={24} />
            )
          }
          text="Subir imagen"
          onPress={handleUploadImage}
          theme={theme}
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          title="Cancelar"
          onPress={handleCancel}
          type="secondary"
          theme={theme}
          style={styles.cancelButton}
        />
        <CustomButton
          title="Guardar"
          onPress={handleSave}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfilePhoto;