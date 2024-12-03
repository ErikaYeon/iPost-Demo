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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import NoFollowings from "@/ui/components/NoFollowings";
import { useTranslation } from "react-i18next";
import { UserShort } from "@/types/apiContracts";
import {
  fetchFollowingsUser,
  setOffset,
  clearFollowingList,
} from "@/redux/slices/searchSlice";

const SearchFollowing: React.FC = () => {
  const { t, i18n } = useTranslation("translations");
  const theme = darkTheme;
  const styles = createSearchProfilesStyles(theme);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredList, setFilteredList] = useState<UserShort[]>([]);
  const followingList = useSelector(
    (state: RootState) => state.search.followingsList
  );
  const Profile = useSelector((state: RootState) => state.profile);
  const isLoading = useSelector(
    (state: RootState) => state.search.status === "loading"
  );
  const { offset } = useSelector((state: RootState) => state.search);
  const hasMoreFollowings = !(offset === Profile.followingCount);
  // const hasMoreFollowings = !(offset === 18);
  const dispatch = useDispatch<AppDispatch>();

  const handleGoBack = () => {
    dispatch(setOffset(0));
    dispatch(clearFollowingList());
    router.back();
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === "") {
      setFilteredList([]); // Resetea la lista filtrada si no hay búsqueda
    } else {
      const results = followingList.filter(
        (item) =>
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.username.toLowerCase().includes(query.toLowerCase())
      );
      console.log(results);
      setFilteredList(results);
    }
  };
  const loadMoreFollowers = () => {
    if (!isLoading && hasMoreFollowings) {
      dispatch(fetchFollowingsUser(Profile.id));
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

  const renderProfile = ({ item }: { item: (typeof followingList)[0] }) => (
    <View style={styles.profileContainer}>
      <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      <View style={styles.profileInfo}>
        <View style={styles.nameContainer}>
          {renderCrownIcon(item.level)}
          <Text style={styles.profileName}>{item.name}</Text>
        </View>
        <Text style={styles.profileUsername}>{item.username}</Text>
      </View>
    </View>
  );

  const listToDisplay = searchQuery ? filteredList : followingList;

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
          title={i18n.t("searchFollowing.title")}
          onPress={handleGoBack}
          theme={theme}
        />
      </SafeAreaView>
      {/* Barra de búsqueda */}
      <View style={styles.searchBarContainer}>
        <SearchBar
          placeholder={i18n.t("searchScreen.search")}
          onChangeText={handleSearch}
          value={searchQuery}
          theme={theme}
        />
      </View>

      {listToDisplay.length === 0 ? (
        <NoFollowings theme={theme} />
      ) : (
        <FlatList
          data={listToDisplay}
          keyExtractor={(item) => item.id}
          renderItem={renderProfile}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMoreFollowers}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            isLoading ? (
              <ActivityIndicator
                size="small"
                color={theme.colors.textPrimary}
              />
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
};

export default SearchFollowing;
