import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StatusBar, StyleSheet, View, Text, ActivityIndicator, RefreshControl } from "react-native";
import Post from "@/ui/components/Post";
import { darkTheme } from "../../ui/styles/Theme";
import InitialMessage from "../../ui/components/InitialMessage";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { levelToCrown } from "@/types/mappers";
import { fetchPosts } from "@/redux/slices/postSlice";
import {  addPost,addPosts } from '@/redux/slices/timelineSlice';
import { fetchAds, fillPostsFromAds } from "@/redux/slices/adsSlice";

const home = () => {
  const theme = darkTheme;
  const userProfile = useSelector((state: RootState) => state.profile);
  const localPosts = useSelector((state: RootState) => state.timeline.LocalListPosts)
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, hasMore } = useSelector((state: RootState) => state.posts);
  const  ListAdsPost  = useSelector((state: RootState) => state.ads.postsFromAds);
  const [hasFetched, setHasFetched] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  // Función para cargar los posts (llama al thunk fetchPosts)
  const loadPosts = (userId: string) => {
    dispatch(fetchPosts({ userId }));
  };

  // Carga inicial de los posts usando isFirstLoad para que solo se ejecute una vez
  useEffect(() => {
    if (userProfile.id && !hasFetched ) {
      loadPosts(userProfile.id);
       dispatch(fetchAds())
       dispatch(fillPostsFromAds());
      setHasFetched(true);
    }
  }, [userProfile.id,  dispatch, hasFetched]);

  useEffect(() => {
    if (hasFetched) {
      dispatch(fillPostsFromAds());
      dispatch(addPosts({newPosts: posts, postsFromAds: ListAdsPost}))
    }
  }, [posts, hasFetched, dispatch]);

  // Función para scroll infinito
  const handleLoadMore = () => {
    console.log("handleLoadMore called, hasMore:", hasMore, "loading:", loading, "userProfile.id:", userProfile.id);
    if (hasMore && !loading && userProfile.id) {
      loadPosts(userProfile.id); 
    }
  };

  //ToDo: a checkear si funciona
  const onRefresh = () => {
    setRefreshing(true);
    // Simulando un retraso en la carga de los posts
    setTimeout(() => {
      if (userProfile.id) {
        loadPosts(userProfile.id);  // Llamada al fetch
        
      }
      setRefreshing(false);
    }, 1500);  // Retraso de 1.5 segundos antes de hacer el refresh
  };
  

  return (
    <SafeAreaView
      style={[
        stylesLocal.screenContainer,
        {
          paddingTop: StatusBar.currentHeight || 0,
          backgroundColor: theme.colors.background,
        },
      ]}
    >
      {loading && localPosts.length === 0 ? (
        <View style={stylesLocal.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : !loading && localPosts.length === 0  ? (
        <InitialMessage theme={theme} /> // Mensaje inicial si no hay posts
      ) : (
        <View style={stylesLocal.container}>
          {error && <Text style={stylesLocal.errorText}>{error}</Text>}
          <FlatList
            contentContainerStyle={stylesLocal.listContainer}
            data={localPosts}
            renderItem={({ item }) => (
              <Post
                profilePictureUrl={item.author.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO}
                name={item.author.name}
                username={item.author.username}
                description={item.title}
                location={item.location}
                date={item.createdAt}
                // date={item.createdAt.toString()}
                images={item.contents}
                initialLikes={item.likesCount}
                comments={item.commentsCount}
                isLikedByUser={item.isLikedByUser}
                isVip={item.author.level > 1}
                crownType={levelToCrown(item.author.level)}
                commentSection={[]} //ToDo: check how to handle this
                onLike={() => console.log("Liked post " + item.id)} //ToDo: implement this
                onComment={() => console.log("Commented on post " + item.id)} //ToDo: implement this
                onSave={() => console.log("Saved post " + item.id)} //ToDo: implement this
                theme={darkTheme}
                postId={item.id} // Asegúrate de pasar el postId
                userId={userProfile.id} // Asegúrate de pasar el userId
                isAd ={item.isAd}
              />
            )}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5} 
            ListFooterComponent={loading && hasMore ? <Text>Cargando...</Text> : null} 
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}  // Llamada a la función onRefresh
              />
            }
          />
        </View>
      )}
    </SafeAreaView>
  );
};
export default home;

const stylesLocal = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
  },
  safeArea: {
    flex: 1,
    backgroundColor: darkTheme.colors.background,
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



