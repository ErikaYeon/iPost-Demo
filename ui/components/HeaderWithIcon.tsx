import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

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

      {/* Línea debajo del encabezado */}
      <View
        style={[
          styles.line,
          { borderBottomColor: theme.colors.textSecondary, marginBottom: theme.spacing.medium },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 7,
    paddingLeft: 0,
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  line: {
    borderBottomWidth: 1,
    width: Dimensions.get('window').width, // Asegura que ocupe todo el ancho de la pantalla
    marginLeft: 0, // Elimina cualquier margen izquierdo
    marginRight: 0, // Asegura que no haya margen derecho tampoco
    alignSelf: 'center', // Alinea correctamente en caso de algún desajuste
  },
});

export default HeaderWithIcon;
