import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import InputField from '../ui/components/InputField';
import HeaderText from '../ui/components/HeaderText';
import LinkText from '../ui/components/LinkText';
import RegularText from '../ui/components/RegularText';
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/slices/profileSlice'; 
import { router } from 'expo-router';
import { styles } from '@/ui/styles/LogIn';

const theme = darkTheme; // Para alternar entre light y dark mode
const sharedStyles = createSharedStyles(theme);

const LogInFaceIdScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState('');
  const username = 'María'; // Nombre del usuario

  const handleLogin = () => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!password) {
      setErrorMessage('Por favor, completa todos los campos.');

    } else if (!passwordRegex.test(password)) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
    }else {
      setErrorMessage('');
      dispatch(setProfile({ password }));
      setPassword('');
      router.push('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      {/* Logo como imagen PNG */}
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={{ width: 150, height: 150 }} 
      />

      {/* Saludo personalizado */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text="¡Hola" theme={theme} />
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary }}> {username}!</Text>
      </View>

      {/* Input de Contraseña */}
      <InputField
        label="Contraseña"
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        // error={!passwordRegex && !password}
        theme={theme}
        style={{ marginBottom:10, marginTop:10}}
      />

      
      <LinkText text="¿Olvidaste tu contraseña?" onPress={() => router.push('/RestorePssword1')} theme={theme} />
     

     
      <CustomButton
        title="Iniciar sesión"
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.large, marginBottom: theme.spacing.medium, width: '85%' }}
      />
    

     
      <LinkText text="Cambiar de usuario" onPress={() => router.push('/LogIn')} theme={theme} />
      
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default LogInFaceIdScreen;