import React, { useState } from "react";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import PostImageGrid from "@/ui/components/PostImageGrid";
import { postsData } from "@/assets/mockdata";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";

const otherProfile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const theme = darkTheme;
  const styles = createProfileScreenStyles(theme);

  const screenWidth = Dimensions.get("window").width;
  const buttonWidth = screenWidth * 0.85;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header de Perfil sin íconos de edición */}
      <ProfileHeader theme={theme} isOtherProfile={true} />

      {/* Información Adicional */}
      <ProfileAdditionalInfo theme={theme} />

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
