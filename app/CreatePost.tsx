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
import { darkTheme } from "../ui/styles/Theme";
import CloseIcon from "../assets/images/icons/close.svg";
import PhotoIcon from "../assets/images/icons/photo.svg";
import LocationIcon from "../assets/images/icons/location_on.svg";
import { useRouter } from "expo-router";
import {
  setAllPostData,
  setPostContent,
  setSelectedImages,
  setLocation,
  clearPost,
  setDate,
  createPostAsync,
} from "../redux/slices/createPostSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { CreatePostRequest } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { addPost } from "@/redux/slices/timelineSlice";
import { Video } from "expo-av";

const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const CreatePost: React.FC = () => {
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
            type: isVideo ? "video" : "image", // Asegura que el tipo es correcto
          };
        })
      );

      dispatch(setSelectedImages(mediaItems));
    }
  };

  const renderMediaItem = ({ item }) => (
    <View style={{ marginRight: 10, position: "relative" }}>
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
          top: -5,
          right: -5,
          backgroundColor: "rgba(0,0,0,0.5)",
          borderRadius: 12,
          padding: 4,
        }}
      >
        <CloseIcon width={16} height={16} fill="white" />
      </TouchableOpacity>
    </View>
  );

  const handleCreatePostRedux = () => {
    const generateRandomId = (): string =>
      Math.floor(1000 + Math.random() * 9000).toString();
    const newPostData = {
      id: generateRandomId(),
      author: {
        id: userProfile.id,
        email: userProfile.email ?? "iPost@gmail.com",
        username: userProfile.username ?? "iPost",
        name: userProfile.name ?? "iPost",
        lastname: userProfile.lastname ?? "iPost",
        level: userProfile.crown,
        profileImage:
          userProfile.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO,
        active: true,
      },
      createdAt: new Date().toISOString(),
      location: location,
      title: postContent,
      likesCount: 0,
      commentsCount: 0,
      contents: selectedImages.map((item) => item.uri), // Extrae solo los URIs
      likes: [],
      isLikedByUser: false,
      isAd: false,
    };
    dispatch(addPost(newPostData));
  };

  const handlePublish = async () => {
    dispatch(setDate(date));
    dispatch(
      setAllPostData({
        postContent,
        selectedImages: selectedImages.map((item) => ({
          uri: item.uri,
          type: item.type,
        })), // Pasa tanto `uri` como `type`
        location,
        date,
      })
    );

    handleCreatePostRedux();
    dispatch(clearPost());
    router.push("/(tabs)/home");

    const request: CreatePostRequest = {
      userId: userProfile.id,
      location: location,
      contents: selectedImages.map((item) => item.uri), // Envía solo los URIs en base64
      title: postContent,
    };

    try {
      const result = await dispatch(createPostAsync(request));
      if (createPostAsync.fulfilled.match(result)) {
        console.log("Post creado exitosamente");
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
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="light-content"
      />

      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          paddingTop:
            Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
        }}
      >
        <HeaderWithIcon
          iconComponent={() => (
            <View style={{ marginLeft: 10 }}>
              <CloseIcon
                width={26}
                height={26}
                fill={theme.colors.textPrimary}
              />
            </View>
          )}
          title="Nuevo post"
          onPress={() => router.push("/(tabs)/home")}
          theme={theme}
        />
      </SafeAreaView>

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
          iconComponent={() => (
            <PhotoIcon width={24} height={24} fill={theme.colors.textPrimary} />
          )}
          text="Seleccionar fotos o videos"
          onPress={selectImages}
          theme={theme}
        />

        <OptionButton
          iconComponent={() => (
            <LocationIcon
              width={24}
              height={24}
              fill={theme.colors.textPrimary}
            />
          )}
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
            disabled={!isPublishEnabled} // Deshabilita si no cumple la condición
            style={{
              marginTop: 30,
              marginBottom: 150,
              backgroundColor: isPublishEnabled
                ? theme.colors.primary
                : "#B5BACB", // Cambia el color según la condición
              borderColor: isPublishEnabled ? theme.colors.primary : "#B5BACB",
              width: "95%",
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CreatePost;
