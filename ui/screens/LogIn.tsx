import React, { useState } from 'react';
import { SafeAreaView, Image, TouchableOpacity, View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';
import HeaderText from '../components/HeaderText';
import LinkText from '../components/LinkText';
import RegularText from '../components/RegularText';  
import createSharedStyles from '../styles/SharedStyles';
import { lightTheme, darkTheme } from '../styles/Theme';

const theme = darkTheme;  // Para alternar entre light y dark mode manualmente
const sharedStyles = createSharedStyles(theme);

const LogInScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      setError(true);
    } else {
      setError(false);
      console.log('Iniciar sesión');
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>

      {/* Logo como imagen PNG */}
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={{ width: 150, height: 150 }} 
      />

      {/* Texto "Ingresar a iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text="Ingresar a" theme={theme} />
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary }}> iPost</Text>
      </View>   

      {/* Input de Correo electrónico */}
      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={error && !email}
        theme={theme}
      />

      {/* Input de Contraseña */}
      <InputField
        label="Contraseña"
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={error && !password}
        theme={theme}
      />

      {/* Link para "¿Olvidaste tu contraseña?" */}
      <LinkText text="¿Olvidaste tu contraseña?" onPress={() => console.log('Olvidaste tu contraseña')} theme={theme} />

      {/* Botón de Iniciar sesión */}
      <CustomButton
        title="Iniciar sesión"
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.medium, width: '85%' }}
      />

      {/* Link para Registrarse */}
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <RegularText text="¿No tienes una cuenta? " theme={theme} />
        <LinkText text="Regístrate" onPress={() => console.log('Registrarse')} theme={theme} />
      </View>

      {/* Texto "o continua con" */}
      <RegularText text="o continua con" theme={theme} />

      {/* Botón de Google con imagen PNG */}
      <TouchableOpacity
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.xsmall }]}
        onPress={() => console.log('Google')}
      >
        <Image 
          source={require('./assets/images/icons/Google.png')} 
          style={{ width: 24, height: 24, marginRight: theme.spacing.medium }} 
        />
        <Text style={sharedStyles.googleText}>Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LogInScreen;