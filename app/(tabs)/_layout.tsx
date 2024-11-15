// NavBar.js
import React from 'react';
import { Tabs } from "expo-router";
import LupaIcon from "../../assets/images/icons/nav_search.svg"; 
import ProfileIcon from "../../assets/images/icons/nav_user.svg";
import PostIcon from "../../assets/images/icons/nav_more.svg"; 
import HomeIcon from "../../assets/images/icons/logoiPost.svg";
import { darkTheme } from '../../ui/styles/Theme'; 

const theme = darkTheme; // Cambia según tu lógica de tema

const NavBar = () => {
    return (
        <Tabs 
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.background, // Color de fondo del navbar
                    borderTopWidth: 0, // Asegúrate de que no haya borde superior
                    elevation: 0, // Eliminar sombra en Android
                    shadowOpacity: 0, // Eliminar sombra en iOS
                },
                tabBarLabel: () => null, // Ocultar las etiquetas de texto debajo de los iconos
            }}
        >
            <Tabs.Screen 
                name="search" 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: () => (
                        <LupaIcon width={24} height={24} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name="profile" 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: () => (
                        <ProfileIcon width={24} height={24} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name="createPost" 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: () => (
                        <PostIcon width={24} height={24} />
                    ) 
                }} 
            />
            <Tabs.Screen 
                name="home" 
                options={{ 
                    headerShown: false, 
                    tabBarIcon: () => (
                        <HomeIcon width={40} height={40} /> // Icono de Home con tamaño 40x40
                    ) 
                }} 
            />
        </Tabs>
    );
};

export default NavBar;
