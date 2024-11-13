import React, { useEffect } from "react";
import { SafeAreaView, FlatList, StatusBar, StyleSheet, View, Text, ActivityIndicator } from "react-native";
import Post from "@/ui/components/Post";
import { darkTheme } from "../../ui/styles/Theme";
import InitialMessage from "../../ui/components/InitialMessage";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import Placeholders from "@/constants/ProfilePlaceholders";
import { levelToCrown } from "@/types/mappers";
import { fetchPosts } from "@/redux/slices/postSlice";


const Home = () => {
  const theme = darkTheme;
  const dispatch = useDispatch<AppDispatch>();

  const userProfile = useSelector((state: RootState) => state.profile);
  const { posts, loading, error, hasMore } = useSelector((state: RootState) => state.posts);
  const { loading: authLoading, error: authError, access_token } = useSelector(
    (state: RootState) => state.auth
  );

  // Verificar el token al montar el componente
  useEffect(() => {
    const checkToken = async () => {
      const accessToken = await localStorage.getItem("access_token"); // O AsyncStorage si es React Native
  
      if (accessToken) {
        const isValid = await validateToken(accessToken);
        if (isValid) {
          dispatch(autoLoginAsync()); // Si el token es válido, hace el auto-login
        } else {
          console.log("Token inválido. Redirigiendo a login...");
          // Redirigir a la página de login aquí si el token es inválido
        }
      } else {
        console.log("No hay token en el almacenamiento.");
        // Redirigir a login si no hay token
      }
    };

    checkToken();
  }, [dispatch]);

  // Verificar si el usuario está logueado y cargar los posts
  useEffect(() => {
    if (access_token && userProfile.id) {
      dispatch(fetchPosts({ userId: userProfile.id }));
    }
  }, [dispatch, userProfile, access_token]);

  const handleLoadMore = (userId: string | null) => {
    if (hasMore && !loading && userId) {
      dispatch(fetchPosts({ userId }));
    }
  };

  // Si el auth está cargando, mostramos el indicador de carga
  if (authLoading) {
    return (
      <View style={stylesLocal.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    );
  }

  // Si hay un error de autenticación, mostramos el mensaje de error
  if (authError) {
    return (
      <View style={stylesLocal.loadingContainer}>
        <Text style={stylesLocal.errorText}>Error de autenticación: {authError}</Text>
      </View>
    );
  }

  // Si no hay posts o está cargando, mostramos el mensaje inicial o el indicador de carga
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
                commentSection={[]}
                onLike={() => console.log("Liked post " + item.id)}
                onComment={() => console.log("Commented on post " + item.id)}
                onSave={() => console.log("Saved post " + item.id)}
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

export default Home;
