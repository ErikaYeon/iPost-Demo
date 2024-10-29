import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface RegularTextProps {
  text: string;
  theme?: any; 
}

const RegularText: React.FC<RegularTextProps> = ({ text, theme }) => {
  const textColor = theme?.colors?.textPrimary || '#000'; // Color predeterminado

  return <Text style={[styles.text, { color: textColor }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegularText;