import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Post from "@/ui/components/Post";
import { darkTheme, lightTheme } from "../../ui/styles/Theme";
import InitialMessage from "../../ui/components/InitialMessage";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { levelToCrown } from "@/types/mappers";
import { fetchPosts } from "@/redux/slices/postSlice";
import { addPost, addPosts } from "@/redux/slices/timelineSlice";
import { fetchAds, fillPostsFromAds } from "@/redux/slices/adsSlice";
import {
  fetchUserInfo,
  getUserSettingsAsync,
} from "../../redux/slices/profileSlice";
import { isEmpty } from "@/utils/RegexExpressions";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";

const home = () => {
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto
  const styles = createHomeStyles(theme);
  const userProfile = useSelector((state: RootState) => state.profile);
  const localPosts = useSelector(
    (state: RootState) => state.timeline.LocalListPosts
  );
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, hasMore } = useSelector(
    (state: RootState) => state.posts
  );
  const ListAdsPost = useSelector((state: RootState) => state.ads.postsFromAds);
  const [hasFetched, setHasFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Función para cargar los posts (llama al thunk fetchPosts)
  const loadPosts = (userId: string, isRefreshing: boolean) => {
    if (isRefreshing) {
      dispatch(fetchPosts({ userId, isRefreshing }));
    } else {
      dispatch(fetchPosts({ userId, isRefreshing: false }));
    }
  };

  // Carga inicial de los posts usando isFirstLoad para que solo se ejecute una vez
  useEffect(() => {
    if (userProfile.id && !hasFetched) {
      loadPosts(userProfile.id, false);
      dispatch(fetchAds());
      dispatch(fillPostsFromAds());
      setHasFetched(true);
      dispatch(fetchUserInfo(userProfile.id));
      ChangeInitialLanguage();
    }
  }, [userProfile.id, dispatch, hasFetched]);

  const ChangeInitialLanguage = async () => {
    try {
      await dispatch(getUserSettingsAsync(userProfile.id));
      console.log(userProfile.language);
      i18next.changeLanguage(userProfile.language);
    } catch {
      console.log("error al cambiar el lenguage");
    }
  };

  useEffect(() => {
    if (hasFetched) {
      dispatch(fillPostsFromAds());
      dispatch(addPosts({ newPosts: posts, postsFromAds: ListAdsPost }));
    }
  }, [posts, hasFetched, dispatch]);

  // Función para scroll infinito
  const handleLoadMore = () => {
    console.log(
      "handleLoadMore called, hasMore:",
      hasMore,
      "loading:",
      loading,
      "userProfile.id:",
      userProfile.id
    );
    if (hasMore && !loading && userProfile.id) {
      loadPosts(userProfile.id, false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulando un retraso en la carga de los posts
    setTimeout(() => {
      if (userProfile.id) {
        loadPosts(userProfile.id, true); // Llamada al fetch
      }
      setRefreshing(false);
    }, 1500); // Retraso de 1.5 segundos antes de hacer el refresh
  };

  return (
    <SafeAreaView
      style={[
        styles.screenContainer,
        {
          paddingTop: StatusBar.currentHeight || 0,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {loading && localPosts.length === 0 ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : !loading && localPosts.length === 0 ? (
        <InitialMessage theme={theme} /> // Mensaje inicial si no hay posts
      ) : (
        <View style={styles.container}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={localPosts}
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
                // date={item.createdAt.toString()}
                images={item.contents.map((content) => ({
                  uri: content,
                  type: content.endsWith(".mp4") ? "video" : "image",
                }))}
                initialLikes={item.likesCount}
                comments={item.commentsCount}
                isLikedByUser={item.liked}
                isVip={item.author.level > 1}
                crownType={levelToCrown(item.author.level)}
                commentSection={[]} //ToDo: check how to handle this
                onLike={() => console.log("Liked post " + item.id)} //ToDo: implement this
                onComment={() => console.log("Commented on post " + item.id)} //ToDo: implement this
                onSave={() => console.log("Saved post " + item.id)} //ToDo: implement this
                theme={darkTheme}
                postId={item.id} // Asegúrate de pasar el postId
                userId={userProfile.id} // Asegúrate de pasar el userId
                isAd={item.isAd}
                isSavedByUser={item.favorite}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              loading && hasMore ? (
                <ActivityIndicator
                  size="small"
                  color={theme.colors.textSecondary}
                />
              ) : null
            }
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh} // Llamada a la función onRefresh
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default home;

const createHomeStyles = (theme: any) =>
  StyleSheet.create({
    screenContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    safeArea: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      paddingHorizontal: 15,
    },
    listContainer: {
      paddingBottom: 20,
    },
    errorText: {
      color: "red",
      textAlign: "center",
      marginVertical: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });
