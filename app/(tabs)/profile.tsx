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
import { darkTheme } from "@/ui/styles/Theme";
import * as VideoThumbnails from "expo-video-thumbnails";
import NoPosts from "@/ui/components/NoPost";

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

  const theme = darkTheme;
  const styles = createProfileScreenStyles(theme);

  // Genera thumbnails y construye los datos para la grilla
  useEffect(() => {
    const generateThumbnails = async () => {
      const updatedPostImages = await Promise.all(
        posts.map(async (post) => {
          const isVideo = post.contents[0]?.endsWith(".mp4");
          const thumbnailUri = isVideo
            ? await generateVideoThumbnail(post.contents[0])
            : post.contents[0];
          return {
            id: post.id,
            uri: thumbnailUri || post.contents[0], // Fallback en caso de error
            user: userProfile.username,
            description: post.title,
            isVideo,
          };
        })
      );
      setPostImages(updatedPostImages);
    };
    const generateThumbnailsF = async () => {
      const updatedPostImages = await Promise.all(
        favorites.map(async (fav) => {
          const isVideo = fav.contents[0]?.endsWith(".mp4");
          const thumbnailUri = isVideo
            ? await generateVideoThumbnail(fav.contents[0])
            : fav.contents[0];
          return {
            id: fav.id,
            uri: thumbnailUri || fav.contents[0], // Fallback en caso de error
            user: userProfile.username,
            description: fav.title,
            isVideo,
          };
        })
      );
      console.log("entro");
      console.log(updatedPostImages);
      setFavoritesImages(updatedPostImages);
    };

    if (activeTab === "post" && posts.length > 0) {
      generateThumbnails();
    } else if (activeTab === "saved" && favorites.length > 0) {
      console.log("entro por aca");
      generateThumbnailsF();
    }
  }, [posts, activeTab]);

  // Fetch de los posts cuando cambia el tab
  useEffect(() => {
    if (id && activeTab === "post") {
      dispatch(fetchUserPosts({ userId: id, offset: 0, limit: 10 }));
    } else if (id && activeTab === "saved") {
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
          text="POST"
          isActive={activeTab === "post"}
          onPress={() => setActiveTab("post")}
          theme={theme}
        />
        <TabButton
          text="GUARDADOS"
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
            <PostImageGrid posts={postImages} />
          ))}
        {activeTab === "saved" &&
          (loading ? (
            <ActivityIndicator size="large" color={theme.colors.primary} />
          ) : favoritesImages.length === 0 ? (
            <NoPosts theme={theme} />
          ) : (
            <PostImageGrid posts={favoritesImages} />
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
    console.error("Error al generar el thumbnail:", error);
    return null;
  }
};

export default ProfileScreen;
