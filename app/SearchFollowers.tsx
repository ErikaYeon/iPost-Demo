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
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import SearchBar from "../ui/components/SearchBar";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import CrownGrey from "../assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "../assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "../assets/images/icons/gamif_crown_2.svg";
import CrownGold from "../assets/images/icons/gamif_crown_3.svg";
import { createSearchProfilesStyles } from "@/ui/styles/SearchProfileStyles";
import { darkTheme } from "../ui/styles/Theme";

const SearchFollowers: React.FC = () => {
  const theme = darkTheme;
  const styles = createSearchProfilesStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(followersData);

  const followersData = [
    {
      id: "1",
      name: "Carlos López",
      username: "@carlos_lopez",
      crownType: "gold",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: "2",
      name: "Andrea García",
      username: "@andrea_g",
      crownType: "silver",
      profileImage: "https://via.placeholder.com/50",
    },
    {
      id: "3",
      name: "María Fernández",
      username: "@mariaf",
      crownType: "bronze",
      profileImage: "https://via.placeholder.com/50",
    },
  ];

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    const filtered = followersData.filter(
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

  const renderProfile = ({ item }: { item: typeof followersData[0] }) => (
    <TouchableOpacity style={styles.profileContainer}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          {renderCrownIcon(item.crownType)}
          <Text style={styles.profileName}>{item.name}</Text>
        </View>
        <Text style={styles.profileUsername}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />

      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() =>
            theme.isDark ? (
              <BackIcon width={18} height={18} fill={theme.colors.textPrimary} />
            ) : (
              <BackIconLightMode
                width={18}
                height={18}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title="Seguidores"
          onPress={() => console.log("Volver")}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder="Buscar"
          onChangeText={handleSearch}
          value={searchQuery}
          theme={theme}
          onSearchPress={() => console.log("Buscar presionado")}
        />
      </View>

      <FlatList
        data={filteredProfiles}
        keyExtractor={(item) => item.id}
        renderItem={renderProfile}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default SearchFollowers;
