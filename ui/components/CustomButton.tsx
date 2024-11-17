import React from 'react';
import { TouchableOpacity, Text, ViewStyle, TextStyle } from 'react-native';
import createStyles from '../styles/ButtonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;               // Personalización del estilo del botón
  textStyle?: TextStyle;           // Personalización del estilo del texto
  theme: any;                      // Tema dinámico
}

const CustomButton: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  type = 'primary', 
  disabled = false, 
  style, 
  textStyle, 
  theme 
}) => {
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[
        { alignSelf: 'center' }, // Centrar el botón
        styles.button,
        styles[type],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text 
        style={[
          type === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary,
          textStyle, // Sobrescribir estilos del texto
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
