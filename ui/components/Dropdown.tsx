import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  position: { top: number; left: number; width: number };
  theme: any; // Agregado para manejar el tema
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, position, theme }) => {
  const styles = createStyles(theme);

  return (
    <View style={[styles.dropdownContainer, position]}>
      {options.map((option, index) => (
        <TouchableOpacity key={index} style={styles.dropdownItem} onPress={() => onSelect(option)}>
          <Text style={styles.dropdownText}>{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    dropdownContainer: {
      position: "absolute",
      backgroundColor: '#EEEEEE',
      borderRadius: 5,
      borderWidth: 1,
      borderColor: '#B5BACB',
      zIndex: 10,
      marginTop: 26,
    },
    dropdownItem: {
      paddingVertical: 5,
      paddingHorizontal: theme.spacing.small,
      borderBottomWidth: 1,
      borderBottomColor: '#B5BACB',
    },
    dropdownText: {
      fontSize: theme.fonts.small,
      color: '#201E43',
    },
  });

export default Dropdown;
