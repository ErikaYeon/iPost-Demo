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
import { router } from "expo-router";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import NoFollowers from "@/ui/components/NoFollowers";
import { UserShort } from "@/types/apiContracts";

const SearchFollowers: React.FC = () => {
  const theme = darkTheme;
  const styles = createSearchProfilesStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState<UserShort[]>([]);
  const followersList = useSelector(
    (state: RootState) => state.search.followersList
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredList([]); // Resetea la lista filtrada si no hay búsqueda
    } else {
      const results = followersList.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase())
      );
      console.log(results);
      setFilteredList(results);
    }
  };

  const renderCrownIcon = (level: number) => {
    switch (level) {
      case 1:
        return <CrownGrey width={20} height={20} />;
      case 2:
        return <CrownBronze width={20} height={20} />;
      case 3:
        return <CrownSilver width={20} height={20} />;
      case 4:
        return <CrownGold width={20} height={20} />;
      default:
        return null;
    }
  };

  const renderProfile = ({ item }: { item: (typeof followersList)[0] }) => (
    <TouchableOpacity style={styles.profileContainer}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          {renderCrownIcon(item.level)}
          <Text style={styles.profileName}>{item.name}</Text>
        </View>
        <Text style={styles.profileUsername}>{item.username}</Text>
      </View>
    </TouchableOpacity>
  );

  const listToDisplay = searchQuery ? filteredList : followersList;

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
          title="Seguidores"
          onPress={() => router.back()}
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
        />
      </View>

      {listToDisplay.length === 0 ? (
        <NoFollowers theme={theme} />
      ) : (
        <FlatList
          data={listToDisplay}
          keyExtractor={(item) => item.id}
          renderItem={renderProfile}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchFollowers;
