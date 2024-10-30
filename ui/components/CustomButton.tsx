import React from 'react';
import { TouchableOpacity, Text, ViewStyle } from 'react-native';
import createStyles from '../styles/ButtonStyles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary';
  disabled?: boolean;
  style?: ViewStyle;              
  theme: any;                      
}

const CustomButton: React.FC<ButtonProps> = ({ title, onPress, type = 'primary', disabled = false, style, theme }) => {
  const styles = createStyles(theme);

  return (
    <TouchableOpacity
      style={[
        { alignSelf: 'center' }, // Hace que el botón se centre en su contenedor
        styles.button,
        styles[type],
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text 
        style={type === 'primary' ? styles.buttonTextPrimary : styles.buttonTextSecondary}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
