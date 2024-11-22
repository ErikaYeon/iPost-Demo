import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Image, Alert } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import OptionButton from "../ui/components/OptionButton";
import CustomButton from "../ui/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Importar FileSystem
import { createEditProfilePhotoStyles } from "../ui/styles/EditProfilePhotoStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CameraIcon from "../assets/images/icons/camera.svg";
import UploadIcon from "../assets/images/icons/photo.svg";
import CameraIconLight from "../assets/images/icons/camera_lightMode.svg";
import UploadIconLight from "../assets/images/icons/photo_lightMode.svg";
import { useRouter } from "expo-router";
import Placeholders from "@/constants/ProfilePlaceholders";


const EditProfilePhoto: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState<string | null>(null); // Nueva variable para almacenar la imagen en Base64
  const router = useRouter();
  const theme = darkTheme; // Cambiar a `lightTheme` si es necesario
  const styles = createEditProfilePhotoStyles(theme);

  const convertToBase64 = async (uri: string) => {
    try {
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
      console.error("Error al convertir la imagen a Base64:", error);
      return null;
    }
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso a la cámara para tomar fotos."
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Define el aspecto cuadrado
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      const base64 = await convertToBase64(uri);
      if (base64) {
        setBase64Image(base64); // Guardar la imagen en Base64
      }
    }
  };

  const handleUploadImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert(
        "Permiso denegado",
        "Se necesita acceso a la galería para subir imágenes."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Define el aspecto cuadrado
      quality: 0.5,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setSelectedImage(uri);
      const base64 = await convertToBase64(uri);
      if (base64) {
        setBase64Image(base64); // Guardar la imagen en Base64
      }
    }
  };

  const handleCancel = () => {
    console.log("Cancelado");
    router.back(); // Regresa al perfil
  };

  const handleSave = () => {
    console.log("Guardar", selectedImage, base64Image);
    // Implementa la lógica para guardar la imagen seleccionada y su versión en Base64
    router.back(); // Regresa al perfil
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
        onPress={() => router.back()}
        theme={theme}
      />

      {/* Imagen Seleccionada */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: selectedImage || Placeholders.DEFAULT_PROFILE_PHOTO, // Imagen por defecto
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
