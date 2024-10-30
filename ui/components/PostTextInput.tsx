import React from 'react';
import { View, TextInput, ViewStyle, StyleSheet } from 'react-native';

interface PostTextInputProps {
  label?: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  theme: any;
  style?: ViewStyle;
}

const PostTextInput: React.FC<PostTextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  multiline = false,
  theme,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: theme.colors.textSecondary,
            color: theme.colors.textPrimary,
            backgroundColor: theme.colors.background,
            textAlignVertical: 'top',
            height: 140, // Establecer altura fija
          },
        ]}
        placeholder={placeholder}
        placeholderTextColor="#B5BACB"
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        scrollEnabled={true} // Habilitar desplazamiento
        textAlignVertical="top" // Asegurarse de que el texto comience en la parte superior
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 2,
    marginTop: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default PostTextInput;
