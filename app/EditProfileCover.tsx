import React, { useState } from "react";
import { SafeAreaView, View, StatusBar, Image, Alert } from "react-native";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import OptionButton from "../ui/components/OptionButton";
import CustomButton from "../ui/components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system"; // Importar FileSystem
import { createEditProfilePhotoStyles } from "../ui/styles/EditProfilePhotoStyles"; // Puedes usar los mismos estilos o crear otros específicos
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CameraIcon from "../assets/images/icons/camera.svg";
import UploadIcon from "../assets/images/icons/photo.svg";
import CameraIconLight from "../assets/images/icons/camera_lightMode.svg";
import UploadIconLight from "../assets/images/icons/photo_lightMode.svg";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setProfileCover,
  updateProfileImageAsync,
} from "@/redux/slices/profileSlice";
import { ProfileImageRequest } from "@/types/apiContracts";
import { useTranslation } from "react-i18next";

const EditProfileCover: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

  const Profile = useSelector((state: RootState) => state.profile);
  const ProfileCover = Profile.coverImage;
  const userId = Profile.id;
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    ProfileCover
  );
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const router = useRouter();
  const styles = createEditProfilePhotoStyles(theme);
  const dispatch = useDispatch<AppDispatch>();

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
        i18n.t("permissions.denied"),
        i18n.t("permissions.cameraNeeded")
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 7], // Define el aspecto para la foto de portada
      quality: 0.8,
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
        i18n.t("permissions.denied"),
        i18n.t("permissions.galleryNeeded")
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 7], // Define el aspecto para la foto de portada
      quality: 0.8,
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

  const handleSave = async () => {
    dispatch(setProfileCover(base64Image!));
    const profileImageData: ProfileImageRequest = {
      image: base64Image!,
      type: "COVER",
    };
    await dispatch(updateProfileImageAsync({ userId, profileImageData }));
    // Implementa la lógica para guardar la imagen seleccionada y su versión en Base64
    router.back(); // Regresa al perfil
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme === darkTheme ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <HeaderWithIcon
        iconComponent={() =>
          theme === darkTheme ? (
            <BackIcon width={18} height={18} fill={theme.colors.textPrimary} />
          ) : (
            <BackIconLightMode
              width={18}
              height={18}
              fill={theme.colors.textPrimary}
            />
          )
        }
        title={i18n.t("editProfileCover.title")}
        onPress={() => router.back()}
        theme={theme}
      />

      {/* Imagen Seleccionada */}
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: selectedImage || "https://via.placeholder.com/600x150", // Imagen por defecto
          }}
          style={styles.coverImage} // Cambia a estilos específicos para la portada
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
          text={i18n.t("editProfileCover.takePhoto")}
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
          text={i18n.t("editProfileCover.uploadImage")}
          onPress={handleUploadImage}
          theme={theme}
        />
      </View>

      {/* Botones */}
      <View style={styles.buttonsContainer}>
        <CustomButton
          title={i18n.t("editProfileCover.cancel")}
          onPress={handleCancel}
          type="secondary"
          theme={theme}
          style={styles.cancelButton}
        />
        <CustomButton
          title={i18n.t("editProfileCover.save")}
          onPress={handleSave}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />
      </View>
    </SafeAreaView>
  );
};

export default EditProfileCover;
