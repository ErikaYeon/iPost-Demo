import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Importa SafeAreaView
import ProfileHeader from "@/ui/components/ProfileHeader";
import ProfileAdditionalInfo from "@/ui/components/ProfileAdditionalInfo";
import TabButton from "@/ui/components/TabButton";
import PostImageGrid from "@/ui/components/PostImageGrid";
import styles from "@/ui/styles/ProfileStyles";
import { postsData, savedData } from "@/assets/mockdata";

const ProfileScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState("post");


  const photosToDisplay = activeTab === "post" ? postsData : savedData;

  return (
    <SafeAreaView style={[styles.container, { flex: 1 }]}> 
  
      <ProfileHeader />

      <ProfileAdditionalInfo />

      <View style={styles.tabsContainer}>
        <TabButton text="POST" isActive={activeTab === "post"} onPress={() => setActiveTab("post")} />
        <TabButton text="GUARDADOS" isActive={activeTab === "saved"} onPress={() => setActiveTab("saved")} />
      </View>

      <View style={{ flex: 1 }}>
        <PostImageGrid posts={photosToDisplay} />
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
