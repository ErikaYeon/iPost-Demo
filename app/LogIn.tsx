import React, { Profiler, useState } from 'react';
import { SafeAreaView, Image, TouchableOpacity, View, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import InputField from '../ui/components/InputField';
import HeaderText from '../ui/components/HeaderText';
import LinkText from '../ui/components/LinkText';
import RegularText from '../ui/components/RegularText';  
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import { styles } from '../ui/styles/LogIn';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux'; 
import { setProfile } from '../redux/slices/profileSlice'; 
import RegularTextLine from '@/ui/components/RegularTextLine';


const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const LogInScreen: React.FC = () =>{
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  // Regular expression for validating password (at least 6 characters and one special character)
  const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    if (!email || !password) {
      setErrorMessage('Por favor, completa todos los campos.');

    } 
    else if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, ingresa un correo electrónico válido.');
    } 
    // Check if password meets the requirements
    else if (!passwordRegex.test(password)) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres y un carácter especial.');
    }else {
      setErrorMessage('');
      dispatch(setProfile({ email, password }));
      setEmail('');
      setPassword('');
      router.push('/(tabs)/home');
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={styles.logo} 
      />
      <View style={styles.headerContainer}>
        <HeaderText text="Ingresar a" theme={theme} />
        <Text style={styles.headerText}> iPost</Text>
      </View>   

      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      <InputField
        label="Contraseña"
        placeholder="**************"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        error={!!errorMessage}
        theme={theme}
      />
      <View style={ {marginTop:7,}}>
      <LinkText text="¿Olvidaste tu contraseña?" onPress={() => router.push('/RestorePssword1')} theme={theme} />
      </View>

      <CustomButton
        title="Iniciar sesión"
        onPress={handleLogin}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.medium, width: '85%' }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop:7,}}>
        <RegularText text="¿No tienes una cuenta? " theme={theme} />
        <LinkText text="Regístrate" onPress={() => router.push('/SignUp')} theme={theme} />
      </View>

      <RegularTextLine text="o continua con" theme={theme} />

      <TouchableOpacity
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.xsmall }]}
        onPress={() => console.log('Google')}
      >
        <Image 
          source={require('../assets/images/icons/Google.png')} 
          style={{ width: 24, height: 24 }} 
        />
        <Text style={sharedStyles.googleText}>Google</Text>
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

export default LogInScreen;
