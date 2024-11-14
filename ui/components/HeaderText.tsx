import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface HeaderTextProps {
  text: string;
  theme?: any; 
}

const HeaderText: React.FC<HeaderTextProps> = ({ text, theme }) => {
  const textColor = theme?.colors?.textPrimary || '#000'; // Valor por defecto si no hay `theme`

  return <Text style={[styles.headerText, { color: textColor }]}>{text}</Text>;
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: 33,
    marginBottom: 20,
  },
});

export default HeaderText;