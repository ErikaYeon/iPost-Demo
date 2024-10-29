import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Text } from 'react-native';
import CustomButton from '../components/CustomButton'; 
import HeaderText from '../components/HeaderText';  
import RegularText from '../components/RegularText';  
import LinkText from '../components/LinkText';  
import InputField from '../components/InputField';  
import createSharedStyles from '../styles/SharedStyles';
import { lightTheme, darkTheme } from '../styles/Theme';
import { styles } from '../styles/LogIn';
import { useDispatch } from 'react-redux'; 
import { setProfile } from '../../redux/slices/profileSlice'; 

const theme = darkTheme;  // Para alternar entre darkTheme y lightTheme manualmente
const sharedStyles = createSharedStyles(theme);



const SignUpScreen: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Regular expression for validating password (at least 6 characters and one special character)
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!email || !username || !password) {
      setErrorMessage('Por favor, completa todos los campos.');
    }
    else if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
    } 
    // Check if password meets the requirements
    else if (!passwordRegex.test(password)) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
    } else {
      setErrorMessage('');
      dispatch(setProfile({ email, username, password }));
      setEmail('');
      setPassword('');
      setUsername('');
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      
      {/* Texto "Regístrese en iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text="Regístrese en" theme={theme} />
        <Text style={styles.headerText}> iPost</Text>
      </View> 

      {/* Input de Correo electrónico */}
      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Input de Nombre de usuario */}
      <InputField
        label="Nombre de usuario"
        placeholder="usuario_ejemplo"
        value={username}
        onChangeText={setUsername}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Input de Contraseña */}
      <InputField
        label="Contraseña"
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={!!errorMessage}
        theme={theme}
      />

      {/* Botón de Registrarse */}
      <CustomButton
        title="Registrarte"
        onPress={handleRegister}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.large, width: '85%' }}
      />

      {/* Link para iniciar sesión */}
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <RegularText text="¿Tienes una cuenta? " theme={theme} />
        <LinkText text="Inicia sesión" onPress={() => console.log('Iniciar Sesión')} theme={theme} />
      </View>

      {/* Texto "o continua con" */}
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: theme.spacing.small }}>
        <RegularText text="O continua con" theme={theme} />
      </View>

      {/* Botón de Google con imagen PNG */}
      <TouchableOpacity
        style={[styles.googleButton, { marginTop: theme.spacing.small }]} // Usa los estilos separados
        onPress={() => console.log('Google')}
      >
        <Image 
          source={require('../../assets/images/icons/Google.png')} 
          style={{ width: 24, height: 24, marginRight: theme.spacing.medium }} 
        />
        <Text style={styles.googleText}>Google</Text>
      </TouchableOpacity>

      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      
    </SafeAreaView>
  );
};

export default SignUpScreen;
