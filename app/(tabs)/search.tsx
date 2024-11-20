import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import HeaderWithIcon from "@/ui/components/HeaderWithIcon";
import SearchBar from "@/ui/components/SearchBar";
import BackIcon from "@/assets/images/icons/navigate_before.svg";
import BackIconLightMode from "@/assets/images/icons/navigate_before_lightMode.svg";
import CrownGrey from "@/assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "@/assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "@/assets/images/icons/gamif_crown_2.svg";
import CrownGold from "@/assets/images/icons/gamif_crown_3.svg";
import { createSearchProfilesStyles } from "@/ui/styles/SearchProfileStyles";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import { Crown } from "@/types/models";
import { router } from "expo-router";

const SearchProfiles: React.FC = () => {
  const theme = darkTheme; // Cambia manualmente entre `darkTheme` y `lightTheme`
  const styles = createSearchProfilesStyles(theme);

  const profilesData = [
    {
      id: "1",
      name: "Ana Paula Breuer",
      username: "@anapaubreuer",
      crownType: "gold",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Andrés Breuer",
      username: "@andy_breuer",
      crownType: "gold",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "José Breuer",
      username: "@jbreuer",
      crownType: "silver",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: "4",
      name: "Micaela Breuer",
      username: "@breuer_mica",
      crownType: "bronze",
      profileImage: "https://via.placeholder.com/50",
    },
  ];

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profilesData);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = profilesData.filter(
      (profile) =>
        profile.name.toLowerCase().includes(text.toLowerCase()) ||
        profile.username.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const renderCrownIcon = (crownType: string) => {
    switch (crownType) {
      case "gold":
        return <CrownGold width={20} height={20} />;
      case "silver":
        return <CrownSilver width={20} height={20} />;
      case "bronze":
        return <CrownBronze width={20} height={20} />;
      default:
        return <CrownGrey width={20} height={20} />;
    }
  };

  const renderProfile = ({ item }: { item: (typeof profilesData)[0] }) => (
    <TouchableOpacity onPress={() => router.push("/otherProfile")}>
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: item.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            {renderCrownIcon(item.crownType)}
            <Text style={styles.profileName}>{item.name}</Text>
          </View>
          <Text style={styles.profileUsername}>{item.username}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />

      {/* Header */}
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() =>
            theme.isDark ? (
              <BackIcon
                width={18}
                height={18}
                fill={theme.colors.textPrimary}
              />
            ) : (
              <BackIconLightMode
                width={18}
                height={18}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title="Buscar perfiles"
          onPress={() => router.push("/(tabs)/home")}
          theme={theme}
        />
      </SafeAreaView>

      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Buscar"
          onChangeText={handleSearch}
          value={searchQuery}
          theme={theme}
          onSearchPress={() => handleSearch}
        />
      </View>

      {/* Lista de perfiles */}
      <FlatList
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderProfile}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default SearchProfiles;
