import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface OptionButtonProps {
  iconComponent: () => React.ReactNode; 
  onPress?: () => void;
  theme: any;
}

const OptionButton: React.FC<OptionButtonProps> = ({ iconComponent, text, onPress, theme }) => {
  const handlePress = async () => {
    // Aquí puedes manejar diferentes acciones según el uso
    onPress && onPress();
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.optionContainer}>
      {React.isValidElement(iconComponent()) ? iconComponent() : null}
      <Text style={[styles.text, { color: theme.colors.textPrimary }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: '#545458',
    paddingLeft: 15,
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});

export default OptionButton;
