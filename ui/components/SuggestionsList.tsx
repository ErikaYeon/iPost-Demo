import React from "react";
import { FlatList, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

interface SuggestionsListProps {
  suggestions: Array<{
    display_name: string;
    place_id?: string;
    osm_id: string | number;
  }>;
  onSuggestionPress: (displayName: string) => void;
  theme: any;
}

const SuggestionsList: React.FC<SuggestionsListProps> = ({
  suggestions,
  onSuggestionPress,
  theme,
}) => {
  const { t, i18n } = useTranslation("translations");
  return (
    <FlatList
      data={suggestions}
      keyExtractor={(item) => item.place_id || item.osm_id.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles(theme).suggestionItem}
          onPress={() => onSuggestionPress(item.display_name)}
        >
          <Text style={styles(theme).suggestionText}>{item.display_name}</Text>
        </TouchableOpacity>
      )}
      ListEmptyComponent={
        <Text style={styles(theme).emptyText}>
          {i18n.t("suggestionsList.noResults")}
        </Text>
      }
    />
  );
};

const styles = (theme: any) =>
  StyleSheet.create({
    suggestionItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
    },
    suggestionText: {
      fontSize: 16,
      color: theme.colors.textPrimary,
    },
    emptyText: {
      textAlign: "center",
      color: theme.colors.textSecondary,
      padding: 20,
    },
  });

export default SuggestionsList;
