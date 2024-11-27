import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface OptionButtonProps {
  iconComponent: () => React.ReactNode;  // El componente de ícono
  text: string; // Añadimos 'text' como propiedad
  onPress?: () => void;
  theme: any;
}

const OptionButton: React.FC<OptionButtonProps> = ({ iconComponent, text, onPress, theme }) => {
  const handlePress = async () => {
    // Llamar a la función onPress si está definida
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
