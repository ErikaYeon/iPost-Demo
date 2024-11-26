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
import { darkTheme } from "@/ui/styles/Theme";
import BackIconDark from "../assets/images/icons/navigate_before.svg";
import BackIconLight from "../assets/images/icons/navigate_before_lightMode.svg";
import * as VideoThumbnails from "expo-video-thumbnails";
import { router } from "expo-router";
import NoPosts from "@/ui/components/NoPost";

type PostImage = {
  id: string;
  uri: string;
  user: string;
  description: string;
  isVideo: boolean;
};

const otherProfile = () => {
  const [postImages, setPostImages] = useState<PostImage[]>([]);
  const [isFollowing, setIsFollowing] = useState(false); // Estado para el botón "Seguir"
  const theme = darkTheme;
  const styles = createProfileScreenStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const otherProfileData = useSelector(
    (state: RootState) => state.otherProfile
  );

  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.85;

  useEffect(() => {
    if (otherProfileData.id) {
      dispatch(
        fetchOtherProfilePosts({
          userId: otherProfileData.id,
          offset: 0,
          limit: 20,
        })
      );
    }
  }, [dispatch, otherProfileData.id]);

  useEffect(() => {
    const generateThumbnails = async () => {
      if (!otherProfileData.posts || otherProfileData.posts.length === 0) {
        setPostImages([]);
        return;
      }

      const updatedPostImages = await Promise.all(
        otherProfileData.posts.map(async (post) => {
          const isVideo = post.contents[0]?.endsWith(".mp4");
          const thumbnailUri = isVideo
            ? await generateVideoThumbnail(post.contents[0])
            : post.contents[0];
          return {
            id: post.id,
            uri: thumbnailUri || post.contents[0],
            user: otherProfileData.username,
            description: post.title,
            isVideo,
          };
        })
      );
      setPostImages(updatedPostImages);
    };

    generateThumbnails();
  }, [otherProfileData.posts]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <HeaderWithIcon
        iconComponent={() =>
          theme === darkTheme ? (
            <BackIconDark width={15} height={15} />
          ) : (
            <BackIconLight width={18} height={18} />
          )
        }
        title={`@${otherProfileData.username}`}
        onPress={() => router.back()}
        theme={theme}
        lineMarginBottom={1} // Personaliza el marginBottom solo para esta pantalla
      />

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
          onPress={() => setIsFollowing(!isFollowing)}
        >
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
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer2}>
        <View style={styles.tabButtonDisabled}>
          <Text style={styles.tabButtonText}>POST</Text>
        </View>
      </View>

      {/* Grilla de Imágenes */}
      <View style={styles.gridContainer}>
        {otherProfileData.loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : otherProfileData.posts.length === 0 ? (
          <NoPosts theme={theme} />
        ) : (
          <PostImageGrid posts={postImages} />
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

export default otherProfile;
