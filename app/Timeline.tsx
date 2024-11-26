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
import postStyles from "@/ui/styles/PostStyles"; // Importar estilos de Post
import { useLocalSearchParams } from "expo-router";

const Timeline: React.FC = () => {
  const { profileId } = useLocalSearchParams(); // Obtén el ID del perfil desde los parámetros
  const userId = Array.isArray(profileId) ? profileId[0] : profileId; // Convertimos a string si es un array
  const dispatch = useDispatch<AppDispatch>();
  const theme = darkTheme;
  const styles = createTimelineStyles(theme);

  const userProfilePosts = useSelector(
    (state: RootState) => state.profile.posts
  );
  const { loading, error } = useSelector((state: RootState) => state.profile);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserPosts({ userId, offset: 0, limit: 10 }));
    }
  }, [dispatch, userId]);

  const handleRefresh = () => {
    setRefreshing(true);
    if (userId) {
      dispatch(fetchUserPosts({ userId, offset: 0, limit: 10 }));
    }
    setRefreshing(false);
  };

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
                width={15}
                height={15}
                fill={theme.colors.textPrimary}
              />
            ) : (
              <BackIconLightMode
                width={15}
                height={15}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title="Posts"
          onPress={() => router.back()}
          theme={theme}
          lineMarginBottom={0}
        />
      </SafeAreaView>
      {loading ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={userProfilePosts}
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
              images={item.contents.map((content) => ({
                uri: content,
                type: content.endsWith(".mp4") ? "video" : "image",
              }))}
              initialLikes={item.likesCount}
              comments={item.commentsCount}
              isLikedByUser={item.isLikedByUser}
              postId={item.id}
              userId={userId as string}
              crownType={levelToCrown(item.author.level)}
              theme={theme}
              onLike={() => console.log("Liked post " + item.id)}
              onComment={() => console.log("Commented on post " + item.id)}
              onSave={() => console.log("Saved post " + item.id)}
              isAd={item.isAd}
            />
          )}
          keyExtractor={(item) => item.id}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          contentContainerStyle={postStyles.postContainer} // Aplicar estilos del contenedor de Post
        />
      )}
    </SafeAreaView>
  );
};

const createTimelineStyles = (theme: any) =>
    StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: darkTheme.colors.background,
        paddingTop: StatusBar.currentHeight || 0,
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
    safeArea: {
        backgroundColor: theme.colors.background,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
    },
    });

export default Timeline;
