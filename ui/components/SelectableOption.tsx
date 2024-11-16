import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface SelectableOptionProps {
  isSelected: boolean;
  onPress: () => void;
  text: string;
  icon?: React.ReactNode;
  selectedBackgroundColor: string;
  unselectedBackgroundColor: string;
  selectedTextColor: string;
  unselectedTextColor: string;
}

const SelectableOption: React.FC<SelectableOptionProps> = ({
  isSelected,
  onPress,
  text,
  icon,
  selectedBackgroundColor,
  unselectedBackgroundColor,
  selectedTextColor,
  unselectedTextColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isSelected ? selectedBackgroundColor : unselectedBackgroundColor },
      ]}
      onPress={onPress}
    >
      {icon}
      <Text style={[styles.text, { color: isSelected ? selectedTextColor : unselectedTextColor }]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
  },
  text: {
    fontSize: 14,
    marginLeft: 8,
  },
});

export default SelectableOption;
