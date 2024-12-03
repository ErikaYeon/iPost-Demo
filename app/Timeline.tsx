import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchUserPosts } from "@/redux/slices/profileSlice";
import Post from "@/ui/components/Post";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { router } from "expo-router";
import Placeholders from "@/constants/ProfilePlaceholders";
import { isEmpty } from "@/utils/RegexExpressions";
import { levelToCrown } from "@/types/mappers";
import postStyles from "@/ui/styles/PostStyles";
import { useTranslation } from "react-i18next";
import { useLocalSearchParams } from "expo-router";
import { Post as POST } from "@/types/apiContracts";
import createPostStyles from "@/ui/styles/PostStyles"; // Importar correctamente

const Timeline: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto
  const styles = createTimelineStyles(theme);
  const postStyles = createPostStyles(theme);

  const { profileId, listPost, postId } = useLocalSearchParams();
  const userId = Array.isArray(profileId) ? profileId[0] : profileId;
  const posts: POST[] = listPost ? JSON.parse(listPost as string) : [];
  const { t, i18n } = useTranslation("translations");
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const flatListRef = React.useRef<FlatList>(null);

  useEffect(() => {
    const index = posts.findIndex((post) => post.id === postId);
    if (index !== -1) {
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index, animated: true });
      }, 300);
    }
  }, [postId, posts]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />
      <SafeAreaView>
        <HeaderWithIcon
          iconComponent={() =>
            theme.isDark ? (
              <BackIcon
                width={16}
                height={16}
                fill={theme.colors.textPrimary}
              />
            ) : (
              <BackIconLightMode
                width={16}
                height={16}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title={i18n.t("timeline.header.title")}
          onPress={() => router.back()}
          theme={theme}
          lineMarginBottom={0}
        />
      </SafeAreaView>
      <FlatList
        ref={flatListRef}
        data={posts}
        renderItem={({ item }) => (
          <Post
            profilePictureUrl={
              isEmpty(item.author.profileImage)
                ? Placeholders.DEFAULT_PROFILE_PHOTO
                : (item.author.profileImage as string)
            }
            name={item.author.name}
            username={item.author.username}
            description={item.title}
            location={item.location}
            date={item.createdAt}
            images={item.contents.map((content: string) => ({
              uri: content,
              type: content.endsWith(".mp4") ? "video" : "image",
            }))}
            initialLikes={item.likesCount}
            comments={item.commentsCount}
            isLikedByUser={item.liked}
            postId={item.id}
            userId={userId as string}
            crownType={levelToCrown(item.author.level)}
            theme={theme}
            onLike={() =>
              console.log(i18n.t("timeline.actions.like") + item.id)
            }
            onComment={() =>
              console.log(i18n.t("timeline.actions.comment") + item.id)
            }
            onSave={() =>
              console.log(i18n.t("timeline.actions.save") + item.id)
            }
            isAd={item.isAd}
            isSavedByUser={item.favorite}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={postStyles.postContainer}
        onScrollToIndexFailed={(info) => {
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
      />
    </SafeAreaView>
  );
};

const createTimelineStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Ahora depende dinámicamente del tema
      paddingTop: StatusBar.currentHeight || 0,
      paddingHorizontal: 5,
    },
    errorText: {
      color: theme.colors.error, // Dinámico según el tema
      textAlign: "center",
      marginVertical: 10,
    },
    safeArea: {
      backgroundColor: theme.colors.background, // Dinámico según el tema
      paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    },
  });
export default Timeline;
