import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Importa SafeAreaView
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import TabButton from "@/ui/components/TabButton";
import CustomButton from "../ui/components/CustomButton";
import PostImageGrid from "@/ui/components/PostImageGrid";
import styles from "@/ui/styles/ProfileStyles";
import { postsData, savedData } from "@/assets/mockdata";
import { darkTheme, lightTheme } from "../ui/styles/Theme"; // Asegúrate de ajustar la ruta si es necesario


const theme = darkTheme;

const OtherProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("post");


  const photosToDisplay = activeTab === "post" ? postsData : savedData;

  const handleFollow = () => {
    console.log("Follow button pressed");
  };
  

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}> 
  
      <ProfileHeader />

      <ProfileAdditionalInfo />

      <CustomButton
          title="Cambiar"
          onPress={handleFollow}
          type="primary"
          theme={theme}
          style={styles.followButton}
        />

      <View style={styles.tabsContainer}>
        <TabButton text="POST"/>
      </View>

      <View style={{ flex: 1 }}>
        <PostImageGrid posts={photosToDisplay} />
      </View>
    </SafeAreaView>
  );
};

export default OtherProfileScreen;
