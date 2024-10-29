import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface LinkTextProps {
  text: string;
  onPress: () => void;
  theme?: any; // El tema es opcional
}

const LinkText: React.FC<LinkTextProps> = ({ text, onPress, theme }) => {
  const textColor = theme?.colors?.textPrimary || '#000'; // Color por defecto si no hay `theme`

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={[styles.linkText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkText: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

export default LinkText;