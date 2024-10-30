import React from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import MessageText from '../ui/components/MessageText'; 
import LinkText from '../ui/components/LinkText'; 
import HeaderText from '../ui/components/HeaderText'; 
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import { router } from 'expo-router';
import { styles } from '@/ui/styles/LogIn';

const theme = darkTheme; 
const sharedStyles = createSharedStyles(theme);

const RestorePassword2: React.FC = () => {
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>

<Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={styles.logo} 
      />
      <View style={styles.headerContainer}>
        <Text style={styles.headerTextContra}> Reestablecer Contraseña</Text>
      </View>

      <View style={{marginTop:20, marginBottom:10}}>
      <MessageText
        message="Se ha enviado un enlace de recuperación al correo asociado a su cuenta. Revisa también la carpeta de spam o correo no deseado si no lo encuentras"
        boldText="enlace de recuperación"
        theme={theme}
      />
      </View>

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"
        onPress={() => console.log('Reenviar enlace')}
        type="primary"
        theme={theme}
        style={{ marginBottom: theme.spacing.medium, width: '85%' }}
      />

      {/* Enlace para "Volver a inicio de sesión" */}
      <LinkText
        text="Volver a inicio de sesión"
        onPress={() => router.push('/LogIn')}
        theme={theme}
      />

    </SafeAreaView>
  );
};

export default RestorePassword2;