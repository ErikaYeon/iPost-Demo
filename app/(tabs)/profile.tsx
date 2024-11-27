import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import TabButton from "@/ui/components/TabButton";
import PostImageGrid from "@/ui/components/PostImageGrid";
import { fetchUserPosts } from "@/redux/slices/profileSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import * as VideoThumbnails from "expo-video-thumbnails";
import { router } from "expo-router";

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
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const { id, posts, loading } = userProfile;

  const theme = darkTheme;
  const styles = createProfileScreenStyles(theme);

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

    if (activeTab === "post" && posts.length > 0) {
      generateThumbnails();
    }
  }, [posts, activeTab]);

  // Fetch de los posts cuando cambia el tab
  useEffect(() => {
    if (id && activeTab === "post") {
      dispatch(fetchUserPosts(id));
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
                  console.error("ID de perfil no definido");
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
    console.error("Error al generar el thumbnail:", error);
    return null;
  }
};

export default ProfileScreen;
