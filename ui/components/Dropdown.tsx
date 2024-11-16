import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const Dropdown = ({ options, onSelect, position }) => {
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

const styles = StyleSheet.create({
  dropdownContainer: {
    position: "absolute",
    marginTop: 27,
    backgroundColor: "#FFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#B5BACB",
    zIndex: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#B5BACB",
  },
  dropdownText: {
    fontSize: 14,
    color: "#201E43",
  },
});

export default Dropdown;
