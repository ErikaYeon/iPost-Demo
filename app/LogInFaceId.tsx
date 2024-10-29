import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import InputField from '../ui/components/InputField';
import HeaderText from '../ui/components/HeaderText';
import LinkText from '../ui/components/LinkText';
import RegularText from '../ui/components/RegularText';
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';

const theme = darkTheme; // Para alternar entre light y dark mode
const sharedStyles = createSharedStyles(theme);

const LogInFaceIdScreen: React.FC = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false); // Manejo de errores
  const username = 'María'; // Nombre del usuario

  const handleLogin = () => {
    if (!password) {
      setError(true);
    } else {
      setError(false);
      console.log('Iniciar sesión');
      // Manejar la lógica de inicio de sesión
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
        error={error && !password}
        theme={theme}
      />

      {/* Enlace para "¿Olvidaste tu contraseña?" */}
      <LinkText text="¿Olvidaste tu contraseña?" onPress={() => console.log('Olvidaste tu contraseña')} theme={theme} />

      {/* Botón de Iniciar sesión */}
      <CustomButton
        title="Iniciar sesión"
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.medium, width: '85%' }}
      />

      {/* Enlace para "Cambiar de usuario" */}
      <LinkText text="Cambiar de usuario" onPress={() => console.log('Cambiar de usuario')} theme={theme} />
    </SafeAreaView>
  );
};

export default LogInFaceIdScreen;