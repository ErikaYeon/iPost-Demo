import React, { useEffect, useState } from "react";
import { SafeAreaView, FlatList, StatusBar, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Post from "@/ui/components/Post";
import { darkTheme } from "../../ui/styles/Theme";
import InitialMessage from "../../ui/components/InitialMessage";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { levelToCrown } from "@/types/mappers";
import { fetchPosts, addNewPost } from "@/redux/slices/postSlice";

const home = () => {
  const theme = darkTheme;

  const newPost = useSelector((state: RootState) => state.createPost);
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const { posts, loading, error, hasMore } = useSelector((state: RootState) => state.posts); // Acceder al slice de posts desde el estado global

  const [isFirstLoad, setIsFirstLoad] = useState(true);   // Estado local para gestionar la primera carga

  // Función para cargar los posts (llama al thunk fetchPosts)
  const loadPosts = (userId: string) => {
    dispatch(fetchPosts({ userId }));
  };

  // Carga inicial de los posts usando isFirstLoad para que solo se ejecute una vez
  useEffect(() => {
    console.log("userProfile.id:", userProfile.id, "isFirstLoad:", isFirstLoad);
    if (userProfile.id && isFirstLoad) {
      loadPosts(userProfile.id);
      setIsFirstLoad(false); // Aseguramos que solo se ejecute una vez
    }
  }, [userProfile.id, isFirstLoad]);

  // Agrega un nuevo post al estado cuando se detecta un cambio en newPost
  useEffect(() => {
    console.log("newPost change detected:", newPost);
    if (newPost.postContent) {
      const newPostData = {
        id: "4", // Asigna un ID único para el nuevo post
        author: {
          id: userProfile.id,
          email: userProfile.email ?? "",
          username: userProfile.username ?? "",
          name: userProfile.name ?? "",
          lastname: userProfile.lastname ?? "",
          level: userProfile.crown,
          profileImage: userProfile.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO,
          active: true,
        },
        createdAt: new Date().toISOString(), // Formato ISO para mantener la serialización en el estado
        location: newPost.location,
        title: newPost.postContent, 
        likesCount: 0, 
        commentsCount: 0, 
        contents: newPost.selectedImages ?? [], 
        likes: [], 
      };
      console.log("Adding new post:", newPostData);

      dispatch(addNewPost(newPostData)); // Despacha el nuevo post al estado global
    }
  }, [newPost, userProfile, dispatch]);

  // Función para scroll infinito
  const handleLoadMore = () => {
    console.log("handleLoadMore called, hasMore:", hasMore, "loading:", loading, "userProfile.id:", userProfile.id);
    if (hasMore && !loading && userProfile.id) {
      loadPosts(userProfile.id); 
    }
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
      {loading && posts.length === 0 ? (
        <View style={stylesLocal.loadingContainer}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : posts.length === 0 ? (
        <InitialMessage theme={theme} /> // Mensaje inicial si no hay posts
      ) : (
        <View style={stylesLocal.container}>
          {error && <Text style={stylesLocal.errorText}>{error}</Text>}
          <FlatList
            contentContainerStyle={stylesLocal.listContainer}
            data={posts}
            renderItem={({ item }) => (
              <Post
                profilePictureUrl={item.author.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO}
                name={item.author.name}
                username={item.author.username}
                description={item.title}
                location={item.location}
                date={item.createdAt.toString()}
                images={item.contents}
                likes={item.likesCount}
                comments={item.commentsCount}
                isVip={item.author.level > 1}
                crownType={levelToCrown(item.author.level)}
                commentSection={[]} //ToDo: check how to handle this
                onLike={() => console.log("Liked post " + item.id)} //ToDo: implement this
                onComment={() => console.log("Commented on post " + item.id)} //ToDo: implement this
                onSave={() => console.log("Saved post " + item.id)} //ToDo: implement this
                theme={darkTheme}
              />
            )}
            keyExtractor={(item) => item.id}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.5} 
            ListFooterComponent={loading && hasMore ? <Text>Cargando...</Text> : null} 
          />
        </View>
      )}
    </SafeAreaView>
  );
};

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

export default home;
