import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ErrorConex from '../assets/images/icons/errorConexion.svg'; 
import CustomButton from '../ui/components/CustomButton'; 
import { darkTheme, lightTheme } from '../ui/styles/Theme'; 
import { Router, useRouter } from 'expo-router';


const ErrorConexion = ({  theme = lightTheme }) => {
  const router = useRouter();
  const onRetry  = () => {
    router.back();
  }
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.card}>
        <ErrorConex  width={300} height={300} style={styles.icon} />
        <Text style={styles.title}>No hay conexión a{'\n'}Internet</Text>
        <Text style={styles.message}>Por favor, chequea tu conexión a Internet.</Text>
        
        {/* Botón de reintentar usando CustomButton */}
        <CustomButton
          title="Reintentar"
          onPress={onRetry}
          type="primary"
          theme={darkTheme}
          style={{ marginTop: 20, width: '85%' }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 12,
      padding: 20,
      paddingBottom: 115,
      width: '80%',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 10,
      elevation: 5,
    },
    icon: {
      marginBottom: 5,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#201E43',
      textAlign: 'center',
      marginBottom: 10,
      marginTop: -80,
    },
    message: {
      fontSize: 16,
      color: '#201E43',
      textAlign: 'center',
      marginBottom: 20,
    },
  });
export default ErrorConexion;
