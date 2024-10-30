import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HeaderWithIconProps {
  iconComponent: () => React.ReactNode; // Cambiado a función para asegurar que devuelve un componente React
  title: string;
  onPress: () => void;
  theme: any;
}

const HeaderWithIcon: React.FC<HeaderWithIconProps> = ({ iconComponent, title, onPress, theme }) => {
  // Renderiza el icono solo si es una función válida
  const renderIcon = () => {
    const Icon = iconComponent();
    return React.isValidElement(Icon) ? Icon : null;
  };

  return (
    <View>
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          {renderIcon()}
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.textPrimary }]}>{title}</Text>
      </View>
      
      {/* Línea debajo del encabezado con un margen inferior */}
      <View style={[styles.line, { borderBottomColor: '#B5BACB', width: '100%', marginBottom: theme.spacing.medium }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5, 
  },
  title: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  line: {
    borderBottomWidth: 1,
    marginTop: 5,
  },
});

export default HeaderWithIcon;
