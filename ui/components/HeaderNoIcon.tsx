import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

interface HeaderNoIconProps {
  title: string;
  theme: any;
}

const HeaderNoIcon: React.FC<HeaderNoIconProps> = ({ title, theme }) => {
  return (
    <SafeAreaView>
      {/* Contenedor principal para centrar el título */}
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
      </View>

      {/* Línea debajo del encabezado con un margen inferior */}
      <View style={[styles.line, { borderBottomColor: '#545458', width: '100%', marginBottom: theme.spacing.medium }]} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',  // Centra el texto horizontalmente
    paddingVertical: 10,   // Añade un poco de padding vertical
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    marginTop: 2,
  },
});

export default HeaderNoIcon;
