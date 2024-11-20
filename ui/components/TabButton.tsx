import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type TabButtonProps = {
  text: string;
  isActive: boolean;
  onPress: () => void;
  theme: any;
};

const TabButton: React.FC<TabButtonProps> = ({ text, isActive, onPress, theme }) => {
  const styles = createStyles(theme);
  return (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTabButton]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.activeTabText]}>{text}</Text>
    </TouchableOpacity>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    tabButton: {
      flex: 1,
      alignItems: "center",
      paddingVertical: theme.spacing.small,
      color: theme.colors.background,
    },
    tabText: {
      fontSize: theme.fonts.small,
      color: theme.colors.textPrimary,
    },
    activeTabText: {
      color: theme.colors.primary,
      fontWeight: "bold",
    },
    activeTabButton: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    },
  });

export default TabButton;
