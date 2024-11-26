import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import HeaderWithIcon from "@/ui/components/HeaderWithIcon";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import PostImageGrid from "@/ui/components/PostImageGrid";
import { postsData } from "@/assets/mockdata";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import BackIconDark from "../assets/images/icons/navigate_before.svg";
import BackIconLight from "../assets/images/icons/navigate_before_lightMode.svg";
import { router } from "expo-router";

const otherProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const theme = darkTheme;
  const styles = createProfileScreenStyles(theme);

  const otherProfileData = useSelector(
    (state: RootState) => state.otherProfile
  );

  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.85;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderWithIcon
        iconComponent={() =>
          theme === darkTheme ? (
            <BackIconDark width={24} height={24} />
          ) : (
            <BackIconLight width={24} height={24} />
          )
        }
        title={`@${otherProfileData.username}`} // Título dinámico basado en el username
        onPress={() => router.back()} // Reemplaza con la acción que prefieras
        theme={theme}
      />

      {/* Header de Perfil sin íconos de edición */}
      <ProfileHeader theme={theme} isOtherProfile={true} />

      {/* Información Adicional */}
      <ProfileAdditionalInfo theme={darkTheme} isOtherProfile={true} />

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
        {/* <PostImageGrid posts={postsData} theme={theme} /> */}
        <PostImageGrid posts={postsData} />
      </View>
    </SafeAreaView>
  );
};

export default otherProfile;
