import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
  StatusBar,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchOtherProfilePosts } from "@/redux/slices/otherProfileSlice";
import HeaderWithIcon from "@/ui/components/HeaderWithIcon";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import PostImageGrid from "@/ui/components/PostImageGrid";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import BackIconDark from "../assets/images/icons/navigate_before.svg";
import BackIconLight from "../assets/images/icons/navigate_before_lightMode.svg";
import * as VideoThumbnails from "expo-video-thumbnails";
import { router } from "expo-router";
import NoPosts from "@/ui/components/NoPost";
import { followUserThunk, unfollowUserThunk } from "@/redux/slices/searchSlice";

type PostImage = {
  id: string;
  uri: string;
  user: string;
  description: string;
  isVideo: boolean;
};

const OtherProfile: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

  const [postImages, setPostImages] = useState<PostImage[]>([]);
  const [Loading, setLoading] = useState(false);
  const styles = createProfileScreenStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const Profile = useSelector((state: RootState) => state.profile);
  const otherProfileData = useSelector(
    (state: RootState) => state.otherProfile
  );
  const { id, username, posts, loading } = otherProfileData;
  const [isFollowing, setIsFollowing] = useState(otherProfileData.following);
  console.log("other profile following" + otherProfileData.following);
  console.log(isFollowing);

  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.85;

  const handleFollowToggle = async () => {
    setLoading(true);
    try {
      if (isFollowing) {
        await dispatch(
          unfollowUserThunk({ userId: Profile.id, userToUnfollow: id })
        ).unwrap();
        console.log("Dejó de seguir con éxito");
      } else {
        await dispatch(
          followUserThunk({ userId: Profile.id, userToFollow: id })
        ).unwrap();
        console.log("Siguió con éxito");
      }
      // dispatch
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error al cambiar el estado de seguimiento:", error);
    } finally {
      setLoading(false);
    }
  };

  // Carga inicial de los posts
  useEffect(() => {
    if (id) {
      dispatch(fetchOtherProfilePosts({ userId: id }));
    }
  }, [dispatch, id]);

  // Generar thumbnails y construir datos para la grilla
  useEffect(() => {
    const generateThumbnails = async () => {
      if (!posts || posts.length === 0) {
        setPostImages([]);
        return;
      }

      const updatedPostImages = await Promise.all(
        posts.map(async (post) => {
          const isVideo = post.contents[0]?.endsWith(".mp4");
          const thumbnailUri = isVideo
            ? await generateVideoThumbnail(post.contents[0])
            : post.contents[0];
          return {
            id: post.id,
            uri: thumbnailUri || post.contents[0],
            user: username,
            description: post.title,
            isVideo,
          };
        })
      );
      setPostImages(updatedPostImages);
    };

    generateThumbnails();
  }, [posts, username]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      {/* Header con el nombre del usuario */}
      <HeaderWithIcon
        iconComponent={() =>
          theme === darkTheme ? (
            <BackIconDark width={15} height={15} />
          ) : (
            <BackIconLight width={18} height={18} />
          )
        }
        title={`@${username}`}
        onPress={() => router.back()}
        theme={theme}
        lineMarginBottom={1}
      />

      {/* Información de perfil */}
      <ProfileHeader theme={theme} isOtherProfile={true} />
      <ProfileAdditionalInfo theme={theme} isOtherProfile={true} />

      {/* Botón de Seguir/Dejar de Seguir */}
      <View style={styles.followButtonContainer}>
        <TouchableOpacity
          style={[
            styles.followButton,
            isFollowing
              ? {
                  backgroundColor: theme.colors.background,
                  borderWidth: 1,
                  borderColor: "#B5BACB",
                }
              : { backgroundColor: theme.colors.primary },
            { width: buttonWidth },
          ]}
          onPress={handleFollowToggle}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={isFollowing ? "#B5BACB" : "#FFFFFF"} />
          ) : (
            <Text
              style={[
                styles.followButtonText,
                isFollowing
                  ? { color: theme.colors.textPrimary }
                  : { color: theme.colors.textPrimary },
              ]}
            >
              {isFollowing ? "Dejar de Seguir" : "Seguir"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer2}>
        <View style={styles.tabButtonDisabled}>
          <Text style={styles.tabButtonText}>POST</Text>
        </View>
      </View>

      {/* Grilla de imágenes y videos */}
      <View style={styles.gridContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : posts.length === 0 ? (
          <NoPosts theme={theme} />
        ) : (
          <PostImageGrid
            posts={postImages}
            onPressImage={(postId) =>
              router.push({
                pathname: "/Timeline",
                params: {
                  profileId: id,
                  listPost: JSON.stringify(posts),
                  postId,
                },
              })
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const generateVideoThumbnail = async (uri: string): Promise<string | null> => {
  try {
    const { uri: thumbnailUri } = await VideoThumbnails.getThumbnailAsync(uri, {
      time: 1500,
    });
    return thumbnailUri;
  } catch (error) {
    console.error("Error al generar el thumbnail:", error);
    return null;
  }
};

export default OtherProfile;
