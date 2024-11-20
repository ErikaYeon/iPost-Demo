import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import TabButton from "@/ui/components/TabButton";
import PostImageGrid from "@/ui/components/PostImageGrid";
import { postsData, savedData } from "@/assets/mockdata";
import { createProfileScreenStyles } from "@/ui/styles/ProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme"; // Importamos únicamente el tema oscuro

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("post"); // Estado para el tab activo
  const theme = darkTheme; // Usamos el tema oscuro por defecto
  const styles = createProfileScreenStyles(theme); // Genera estilos dinámicos con el tema oscuro

  const photosToDisplay = activeTab === "post" ? postsData : savedData;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header de Perfil */}
      <ProfileHeader theme={theme} />

      {/* Información Adicional */}
      <ProfileAdditionalInfo theme={theme} />

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TabButton
          text="POST"
          isActive={activeTab === "post"}
          onPress={() => setActiveTab("post")}
          theme={theme}
        />
        <TabButton
          text="GUARDADOS"
          isActive={activeTab === "saved"}
          onPress={() => setActiveTab("saved")}
          theme={theme}
        />
      </View>

      {/* Grilla de Imágenes */}
      <View style={styles.gridContainer}>
        {/* <PostImageGrid posts={photosToDisplay} theme={theme} /> */}
        <PostImageGrid posts={photosToDisplay} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
