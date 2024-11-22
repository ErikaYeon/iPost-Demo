import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

interface RegularTextProps {
  text: string;
  theme?: any; 
}

const RegularText: React.FC<RegularTextProps> = ({ text, theme }) => {
  const textColor = theme?.colors?.textPrimary || '#000'; // Color predeterminado para el texto
  const lineColor = theme?.colors?.textPrimary || '#000'; // Color predeterminado para la línea

  return (
    <View style={styles.container}>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
      <Text style={[styles.text, { color: textColor }]}>{text}</Text>
      <View style={[styles.line, { backgroundColor: lineColor }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center', // Centra el texto verticalmente con las líneas
  },
  line: {
    flex: 1, // Toma el espacio disponible
    height: 1, // Grosor de la línea
    marginHorizontal: 25, // Espacio entre la línea y el texto
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default RegularText;
