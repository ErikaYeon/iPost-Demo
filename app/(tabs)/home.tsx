import React, { useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StatusBar,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import Post from "@/ui/components/Post";
import { darkTheme } from "../../ui/styles/Theme";
import InitialMessage from "../../ui/components/InitialMessage";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { levelToCrown } from "@/types/mappers";
import { fetchPosts } from "@/redux/slices/postSlice";

const home = () => {
  const theme = darkTheme;

  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const { posts, loading, error, hasMore } = useSelector(
    (state: RootState) => state.posts // Acceder al slice de posts desde el estado global
  );

  // Función para cargar los posts
  const loadPosts = (userId: string, lastFetch: Date) => {
    dispatch(fetchPosts({ lastFetch, userId }));
  };

  // Cargar posts al iniciar el componente
  useEffect(() => {
    if (userProfile.id) {
      loadPosts(userProfile.id);
    }
  }, [dispatch, userProfile]);

  // Función llamada cuando se llega al final del scroll
  const handleLoadMore = (userId: string | null) => {
    if (hasMore && !loading && userId) {
      loadPosts(userId); // Cargar más posts cuando el usuario se acerca al final
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
      {loading ? (
        <View style={stylesLocal.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
      ) : posts.length === 0 ? (
        <InitialMessage theme={theme} />
      ) : (
        <View style={stylesLocal.container}>
          {error && <Text style={stylesLocal.errorText}>{error}</Text>}
          <FlatList
            contentContainerStyle={stylesLocal.listContainer}
            data={posts}
            renderItem={({ item }) => (
              <Post
                profilePictureUrl={
                  item.author.profileImage ?? Placeholders.DEFAULT_PROFILE_PHOTO
                }
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
            onEndReached={() => handleLoadMore(userProfile.id)}
            onEndReachedThreshold={0.5}
            ListFooterComponent={loading ? <Text>Cargando...</Text> : null}
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
