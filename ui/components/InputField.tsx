import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

interface InputFieldProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  error?: boolean;
  secureTextEntry?: boolean;
  theme: any;
}

const InputField: React.FC<InputFieldProps> = ({ label, placeholder, value, onChangeText, error, secureTextEntry = false, theme }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.textSecondary, marginTop:2 }]}>{label}</Text>
      <TextInput
        style={[styles.input, { borderColor: error ? theme.colors.error : '#B5BACB', color: '#201E43', backgroundColor: theme.colors.secondary }]}
        placeholder={placeholder}
        placeholderTextColor= '#B5BACB'
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginBottom:2,
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
});

export default InputField;