import React, { useEffect } from "react";
import {
  SafeAreaView,
  View,
  StatusBar,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import CustomButton from "../ui/components/CustomButton";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import PostTextInput from "../ui/components/PostTextInput";
import OptionButton from "../ui/components/OptionButton";
import createSharedStyles from "../ui/styles/SharedStyles";
import { createEditProfilePhotoStyles } from "../ui/styles/EditProfilePhotoStyles";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import CloseIconDark from "../assets/images/icons/close.svg";
import CloseIconLight from "../assets/images/icons/closeLight.svg";
import PhotoIconDark from "../assets/images/icons/photo.svg";
import PhotoIconLight from "../assets/images/icons/photo_lightMode.svg";
import LocationIconDark from "../assets/images/icons/location_on.svg";
import LocationIconLight from "../assets/images/icons/location_onLight.svg";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  setAllPostData,
  setPostContent,
  setSelectedImages,
  setLocation,
  clearPost,
  setDate,
  createPostAsync,
} from "../redux/slices/createPostSlice";
import { CreatePostRequest } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { addPost } from "@/redux/slices/timelineSlice";
import { Video } from "expo-av";

const CreatePost: React.FC = () => {
  const theme = darkTheme; // Cambiar a `lightTheme` si es necesario
  const sharedStyles = createSharedStyles(theme);
  const styles = createEditProfilePhotoStyles(theme);

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const postContent = useSelector(
    (state: RootState) => state.createPost.postContent
  );
  const selectedImages = useSelector(
    (state: RootState) => state.createPost.selectedImages
  );
  const location = useSelector((state: RootState) => state.createPost.location);
  const formattedDate = new Date();
  const date = `${formattedDate.getDate().toString().padStart(2, "0")}/${(
    formattedDate.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}/${formattedDate.getFullYear()}`;
  const userProfile = useSelector((state: RootState) => state.profile);

  useEffect(() => {
    if (router.params?.location) {
      dispatch(setLocation(router.params.location));
    }
  }, [router.params?.location]);

  const selectImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      selectionLimit: 10,
      quality: 0.4,
    });

    if (!result.canceled) {
      const mediaItems = await Promise.all(
        result.assets.map(async (asset) => {
          const isVideo = asset.type === "video" && asset.uri.endsWith(".mp4");
          const base64 = await FileSystem.readAsStringAsync(asset.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });

          return {
            uri: isVideo
              ? `data:video/mp4;base64,${base64}`
              : `data:image/jpeg;base64,${base64}`,
            type: isVideo ? "video" : "image",
          };
        })
      );

      dispatch(setSelectedImages(mediaItems));
    }
  };

  const renderMediaItem = ({ item }) => (
    <View style={{ marginRight: 10, position: "relative", paddingTop:16 }}>
      {item.type === "image" ? (
        <Image
          source={{ uri: item.uri }}
          style={{ width: 130, height: 130, borderRadius: 8 }}
        />
      ) : (
        <Video
          source={{ uri: item.uri }}
          style={{ width: 130, height: 130, borderRadius: 8 }}
          useNativeControls
          resizeMode="cover"
        />
      )}
      <TouchableOpacity
        onPress={() =>
          dispatch(
            setSelectedImages(
              selectedImages.filter((media) => media.uri !== item.uri)
            )
          )
        }
        style={{
          position: "absolute",
          top: 9,
          right: -8,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 5,
        }}
      >
        <CloseIconDark width={16} height={16} />

      </TouchableOpacity>
    </View>
  );

  const handlePublish = async () => {
    dispatch(setDate(date));
    dispatch(
      setAllPostData({
        postContent,
        selectedImages: selectedImages.map((item) => ({
          uri: item.uri,
          type: item.type,
        })),
        location,
        date,
      })
    );

    const request: CreatePostRequest = {
      userId: userProfile.id,
      location: location,
      contents: selectedImages.map((item) => item.uri),
      title: postContent,
    };

    try {
      const result = await dispatch(createPostAsync(request));
      if (createPostAsync.fulfilled.match(result)) {
        console.log("Post creado exitosamente");
        dispatch(clearPost());
        router.push("/(tabs)/home");
      }
    } catch (error) {
      console.log("Error al crear el Post");
    }
  };

  const isPublishEnabled =
    postContent.trim() !== "" &&
    selectedImages.length > 0 &&
    location.trim() !== "";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />

      <HeaderWithIcon
        iconComponent={() =>
          theme.isDark ? (
            <CloseIconDark width={24} height={24} />
          ) : (
            <CloseIconLight
              width={15}
              height={15}
            />
          )
        }
        title="Editar foto de perfil"
        onPress={() => router.push("/(tabs)/home")}
        theme={theme}
      />

      <SafeAreaView
        style={[
          sharedStyles.screenContainer,
          {
            width: "100%",
            alignSelf: "center",
            paddingHorizontal: 20,
            justifyContent: "flex-start",
            alignItems: "stretch",
          },
        ]}
      >
        <PostTextInput
          placeholder="¿Qué te gustaría publicar?"
          value={postContent}
          onChangeText={(text) => dispatch(setPostContent(text))}
          multiline={true}
          theme={theme}
          style={{ marginBottom: theme.spacing.medium }}
        />

        <FlatList
          data={selectedImages}
          renderItem={renderMediaItem}
          keyExtractor={(item, index) => `${item.uri}-${index}`}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginVertical: theme.spacing.small }}
        />

        <OptionButton
          iconComponent={() =>
            theme === darkTheme ? (
              <PhotoIconDark width={24} height={24} />
            ) : (
              <PhotoIconLight width={20} height={20} />
            )
          }
          text="Seleccionar fotos o videos"
          onPress={selectImages}
          theme={theme}
        />

        <OptionButton
          iconComponent={() =>
            theme === darkTheme ? (
              <LocationIconDark width={24} height={24} />
            ) : (
              <LocationIconLight width={20} height={20} />
            )
          }
          text={location ? location : "Agregar ubicación"}
          onPress={() => router.push("/AddLocation")}
          theme={theme}
        />

        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomButton
            title="Publicar"
            onPress={handlePublish}
            type="secondary"
            theme={theme}
            disabled={!isPublishEnabled}
            style={{
              marginTop: 30,
              marginBottom: 150,
              backgroundColor: isPublishEnabled
                ? theme.colors.primary
                : "#B5BACB",
              borderColor: isPublishEnabled ? theme.colors.primary : "#B5BACB",
              width: "95%",
            }}
          />
        </View>
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default CreatePost;
