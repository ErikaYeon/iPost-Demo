import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Platform,
} from "react-native";
import HeaderNoIcon from "@/ui/components/HeaderNoIcon";
import SearchBar from "@/ui/components/SearchBar";
import { darkTheme, lightTheme } from "@/ui/styles/Theme";
import { createSearchProfilesStyles } from "@/ui/styles/SearchProfileStyles";
import CrownGrey from "@/assets/images/icons/gamif_crown_0_1.svg";
import CrownBronze from "@/assets/images/icons/gamif_crown_1.svg";
import CrownSilver from "@/assets/images/icons/gamif_crown_2.svg";
import CrownGold from "@/assets/images/icons/gamif_crown_3.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchSearchResults, clearSearchResults } from "@/redux/slices/searchSlice";
import { levelToCrown } from "@/types/mappers";
import { router } from "expo-router";

const SearchProfiles: React.FC = () => {
  const theme = darkTheme; // Cambia manualmente entre `darkTheme` y `lightTheme`
  const styles = createSearchProfilesStyles(theme);

  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { results: profiles, status } = useSelector((state: RootState) => state.search);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim()) {
      dispatch(fetchSearchResults(text));
    } else {
      dispatch(clearSearchResults());
    }
  };

  const renderCrownIcon = (level: number) => {
    switch (levelToCrown(level)) {
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

  const renderProfile = ({ item }: { item: (typeof profiles)[0] }) => (
    <TouchableOpacity onPress={() => router.push(`/profiles/${item.id}`)}>
      <View style={styles.profileContainer}>
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
        <View style={styles.profileInfo}>
          <View style={styles.nameContainer}>
            {renderCrownIcon(item.level)}
            <Text style={styles.profileName}>
              {`${item.name} ${item.lastname}`}
            </Text>
          </View>
          <Text style={styles.profileUsername}>@{item.username}</Text>
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
      <SafeAreaView
        style={{
          backgroundColor: theme.colors.background,
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
        }}
      >
        <HeaderNoIcon title="Buscar perfiles" theme={theme} />
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

      {/* Lista de perfiles */}
      {status === "loading" ? (
        <ActivityIndicator size="large" color={theme.colors.primary} />
      ) : status === "failed" ? (
        <Text style={styles.errorText}>Error al cargar los resultados</Text>
      ) : (
        <FlatList
          data={profiles}
          keyExtractor={(item) => item.id}
          renderItem={renderProfile}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchProfiles;
