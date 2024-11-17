import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type TabButtonProps = {
  text: string;
  isActive: boolean;
  onPress: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ text, isActive, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 16,
    color: "#B5BACB",
  },
  activeTabText: {
    color: "#12C1A4",
    fontWeight: "bold",
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: "#12C1A4",
  },
});

export default TabButton;
