import React from "react";
import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";

import LupaIconDark from "../../assets/images/icons/nav_search.svg";
import LupaIconLight from "../../assets/images/icons/nav_search_light.svg";

import ProfileIconDark from "../../assets/images/icons/nav_user.svg";
import ProfileIconLight from "../../assets/images/icons/nav_user_light.svg";

import PostIconDark from "../../assets/images/icons/nav_more.svg";
import PostIconLight from "../../assets/images/icons/nav_more_light.svg";

import HomeIcon from "../../assets/images/icons/logoiPost.svg";

const NavBar = () => {
  // Obtén el tema desde Redux
  const themeMode = useSelector((state: RootState) => state.profile.theme);
  const theme = themeMode === "dark" ? darkTheme : lightTheme;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: theme.colors.background, // Cambia dinámicamente el fondo del navbar
          borderTopWidth: 0, // Sin borde superior
          elevation: 0, // Sin sombra en Android
          shadowOpacity: 0, // Sin sombra en iOS
        },
        tabBarLabel: () => null, // Oculta las etiquetas de texto debajo de los iconos
      }}
    >
      {/* Pantalla de búsqueda */}
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          tabBarIcon: () =>
            themeMode === "dark" ? (
              <LupaIconDark width={24} height={24} />
            ) : (
              <LupaIconLight width={24} height={24} />
            ),
        }}
      />

      {/* Pantalla de perfil */}
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarIcon: () =>
            themeMode === "dark" ? (
              <ProfileIconDark width={24} height={24} />
            ) : (
              <ProfileIconLight width={24} height={24} />
            ),
        }}
      />

      {/* Pantalla de crear publicación */}
      <Tabs.Screen
        name="createPost"
        options={{
          headerShown: false,
          tabBarIcon: () =>
            themeMode === "dark" ? (
              <PostIconDark width={24} height={24} />
            ) : (
              <PostIconLight width={24} height={24} />
            ),
        }}
      />

      {/* Pantalla de inicio */}
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          tabBarIcon: () => <HomeIcon width={40} height={40} />, // Ícono único, no depende del tema
        }}
      />
    </Tabs>
  );
};

export default NavBar;
