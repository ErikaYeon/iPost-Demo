import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MessageTextProps {
  message: string;
  boldText: string; 
  theme: any;
}

const MessageText: React.FC<MessageTextProps> = ({ message, boldText, theme }) => {
  const [beforeBold, afterBold] = message.split(boldText);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.secondary, borderColor: theme.colors.primary }]}>
      <Text style={[styles.text, { color: '#201E43' }]}>
        {beforeBold}
        <Text style={{ fontWeight: 'bold' }}>{boldText}</Text>
        {afterBold}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 8,
    marginBottom: 30,
    width: '85%',
    borderWidth: 2, 
    alignSelf: 'center',  // Para centrar el contenedor horizontalmente
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default MessageText;
