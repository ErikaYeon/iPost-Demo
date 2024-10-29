import React, { useState } from 'react';
import { SafeAreaView, View, TouchableOpacity, Image, Text } from 'react-native';
import CustomButton from '../components/CustomButton'; 
import HeaderText from '../components/HeaderText';  
import RegularText from '../components/RegularText';  
import LinkText from '../components/LinkText';  
import InputField from '../components/InputField';  
import createSharedStyles from '../styles/SharedStyles';
import { lightTheme, darkTheme } from '../styles/Theme';

const theme = darkTheme;  // Para alternar entre darkTheme y lightTheme manualmente
const sharedStyles = createSharedStyles(theme);

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleRegister = () => {
    if (!email || !username || !password) {
      setError(true);
    } else {
      setError(false);
      console.log('Registro exitoso');
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      
      {/* Texto "Regístrese en iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text="Regístrese en" theme={theme} />
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

      {/* Input de Nombre de usuario */}
      <InputField
        label="Nombre de usuario"
        placeholder="usuario_ejemplo"
        value={username}
        onChangeText={setUsername}
        error={error && !username}
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
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.small }]}
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

export default SignUpScreen;