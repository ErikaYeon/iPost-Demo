import React, { useState } from 'react';
import { SafeAreaView, Image, View, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import InputField from '../ui/components/InputField';
import HeaderText from '../ui/components/HeaderText';
import LinkText from '../ui/components/LinkText';
import RegularText from '../ui/components/RegularText';
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import { styles } from '@/ui/styles/LogIn';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/slices/profileSlice'; 
import MessageText from '@/ui/components/MessageText';

const theme = darkTheme; // Para alternar entre light y dark mode
const sharedStyles = createSharedStyles(theme);

const RestorePassword1: React.FC = () => {
    const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const username = 'María'; // Nombre del usuario

  const handleResetPass = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email ) {
        setErrorMessage('Por favor, completa los campos.');
  
      } else if (!emailRegex.test(email)) {
        setErrorMessage('Por favor, ingresa un correo electrónico válido.');
      } else {
        setErrorMessage('');
        dispatch(setProfile({ email,}));
        setEmail('');
        router.push('/RestorePssword2')

    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={styles.logo} 
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}> Reestablecer Contraseña</Text>
      </View>

      <Text style={styles.TextInfo}>
      Ingresa tu correo electrónico y te enviaremos un enlace 
      para que recuperes el acceso a tu cuenta.

      </Text>

      <InputField
        label="Correo electrónico"
        placeholder="micorreo@ejemplo.com"
        value={email}
        onChangeText={setEmail}
        error={!!errorMessage}
        theme={theme}
      />

      

     {/* <View style={{marginTop:10,}}> */}
      <CustomButton
        title="Enviar Enlace"
        onPress={handleResetPass}
        type="primary"
        theme={theme}
        style={{ marginTop: theme.spacing.large, width: '85%', marginBottom: theme.spacing.large}}
      />
      {/* </View>s */}

      
      <LinkText  text="Volver al inicio de sesión" onPress={() => router.push('/LogIn')} 
      theme={theme} 
      />

      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default RestorePassword1;