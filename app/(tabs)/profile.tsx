import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import TabButton from "@/ui/components/TabButton";
import PostImageGrid from "@/ui/components/PostImageGrid";
import {
  fetchUserPosts,
  fetchUserFavorites,
} from "@/redux/slices/profileSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import * as VideoThumbnails from "expo-video-thumbnails";
import NoPosts from "@/ui/components/NoPost";
import { router } from "expo-router";
import i18n from "i18next";

type PostImage = {
  id: string;
  uri: string;
  user: string;
  description: string;
  isVideo: boolean;
};

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("post");
  const [postImages, setPostImages] = useState<PostImage[]>([]);
  const [favoritesImages, setFavoritesImages] = useState<PostImage[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const { id, posts, loading, favorites } = userProfile;

  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

  const styles = createProfileScreenStyles(theme); // Usa el tema en los estilos


  // Genera thumbnails y construye los datos para la grilla
  useEffect(() => {
    const generateThumbnails = async () => {
      const postImages =
        posts?.map((post) => ({
          id: post.id,
          uri: post.contents[0] || "", // Asegúrate de que siempre haya un URI válido
          user: userProfile.username,
          description: post.title,
          isVideo: post.contents[0]?.endsWith(".mp4") || false,
        })) || [];

      const updatedPostImages = await Promise.all(
        postImages.map(async (post) => {
          if (post.isVideo) {
            const thumbnailUri = await generateVideoThumbnail(post.uri);
            return { ...post, uri: thumbnailUri || post.uri };
          }
          return post; // Si no es video, regresa el post tal cual
        })
      );
      setPostImages(updatedPostImages);
    };
    const generateThumbnailsF = async () => {
      const favoritesImages =
        favorites?.map((fav) => ({
          id: fav.id,
          uri: fav.contents[0] || "", // Asegúrate de que siempre haya un URI válido
          user: userProfile.username,
          description: fav.title,
          isVideo: fav.contents[0]?.endsWith(".mp4") || false,
        })) || [];

      const updatedFavoritesImages = await Promise.all(
        favoritesImages.map(async (fav) => {
          if (fav.isVideo) {
            const thumbnailUri = await generateVideoThumbnail(fav.uri);
            return { ...fav, uri: thumbnailUri || fav.uri };
          }
          return fav; // Si no es video, regresa el favorito tal cual
        })
      );
      console.log("entro");
      setFavoritesImages(updatedFavoritesImages);
    };

    if (activeTab === "post" && posts.length > 0) {
      generateThumbnails();
    }
    if (activeTab === "saved" && favorites.length > 0) {
      console.log("entro por aca");
      generateThumbnailsF();
    }
  }, [posts, activeTab]);

  // Fetch de los posts cuando cambia el tab
  useEffect(() => {
    if (id && activeTab === "post") {
      dispatch(fetchUserPosts(id));
    }
    if (id && activeTab === "saved") {
      dispatch(fetchUserFavorites(id));
    }
  }, [dispatch, id, activeTab]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header de Perfil */}
      <ProfileHeader theme={theme} />

      {/* Información Adicional */}
      <ProfileAdditionalInfo theme={theme} isOtherProfile={false} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TabButton
          text={i18n.t("profileScreen.tabPosts")}
          isActive={activeTab === "post"}
          onPress={() => setActiveTab("post")}
          theme={theme}
        />
        <TabButton
          text={i18n.t("profileScreen.tabSaved")}
          isActive={activeTab === "saved"}
          onPress={() => setActiveTab("saved")}
          theme={theme}
        />
      </View>

      {/* Grilla de Imágenes */}
      <View style={styles.gridContainer}>
        {activeTab === "post" &&
          (loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : postImages.length === 0 ? (
            <NoPosts theme={theme} />
          ) : (
            <PostImageGrid
              posts={postImages}
              onPressImage={(postId) => {
                if (id) {
                  router.push({
                    pathname: "/Timeline",
                    params: {
                      profileId: id,
                      listPost: JSON.stringify(posts),
                      postId,
                    },
                  });
                } else {
                  console.error(i18n.t("profileScreen.errorProfileId"));
                }
              }}
            />
          ))}
        {activeTab === "saved" &&
          (loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : favoritesImages.length === 0 ? (
            <NoPosts theme={theme} />
          ) : (
            <PostImageGrid
              posts={favoritesImages}
              onPressImage={(postId) => {
                if (id) {
                  router.push({
                    pathname: "/Timeline",
                    params: {
                      profileId: id,
                      listPost: JSON.stringify(favorites),
                      postId,
                    },
                  });
                } else {
                  console.error(i18n.t("profileScreen.errorProfileId"));
                }
              }}
            />
          ))}
      </View>
    </SafeAreaView>
  );
};

const generateVideoThumbnail = async (uri: string): Promise<string | null> => {
  try {
    const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(uri, {
      time: 1500, // Tiempo en milisegundos (1.5s)
    });
    return thumbnailUri;
  } catch (error) {
    console.error(i18n.t("profileScreen.errorThumbnail"), error);
    return null;
  }
};

export default ProfileScreen;
