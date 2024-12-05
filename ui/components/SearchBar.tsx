import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import SearchIcon from '../../assets/images/icons/search.svg';
import { useTranslation } from "react-i18next";

const { t, i18n } = useTranslation("translations");

interface SearchBarProps {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  value?: string;
  theme: any;
  onSearchPress?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = i18n.t("searchBar.placeholder"),  // Utilizamos la clave de traducción
  onChangeText,
  value,
  theme,
  onSearchPress
}) => {
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary }]}>
      <TextInput
        style={[styles.input, { color: '#201E43' }]}
        placeholder={placeholder}
        placeholderTextColor="#49454F"
        onChangeText={onChangeText}
        value={value}
        textAlignVertical="center"
      />
      <TouchableOpacity onPress={onSearchPress}>
        <SearchIcon width={20} height={20} fill="#49454F" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRadius: 16,
    height: 40,
    borderWidth: 1,
    borderColor: '#B5BACB',
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    paddingBottom: 3,
    textAlignVertical: 'center',
  },
});

export default SearchBar;
