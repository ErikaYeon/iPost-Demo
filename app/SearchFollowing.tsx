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
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import NoFollowings from "@/ui/components/NoFollowings";
import { useTranslation } from "react-i18next";

const SearchFollowing: React.FC = () => {
  const { t, i18n } = useTranslation();
  const theme = darkTheme;
  const styles = createSearchProfilesStyles(theme);

  const followingList = useSelector(
    (state: RootState) => state.search.followingsList
  );

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
          title={i18n.t('searchFollowing.title')}
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      {followingList.length === 0 ? (
        <NoFollowings theme={theme} />
      ) : (
        <FlatList
          data={followingList}
          keyExtractor={(item) => item.id}
          renderItem={renderProfile}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </SafeAreaView>
  );
};

export default SearchFollowing;
