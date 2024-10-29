import React from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import MessageText from '../components/MessageText'; 
import LinkText from '../components/LinkText'; 
import HeaderText from '../components/HeaderText'; 
import createSharedStyles from '../styles/SharedStyles';
import { lightTheme, darkTheme } from '../styles/Theme';

const theme = darkTheme; 
const sharedStyles = createSharedStyles(theme);

const ActivateAccount: React.FC = () => {
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>

      {/* Logo de iPost */}
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={{ width: 150, height: 150, marginBottom: 20 }} 
      />

      {/* Título "Activá tu iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text="Activá tu" theme={theme} />
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary }}> iPost</Text>
      </View>

      {/* Mensaje Informativo para enlace de acceso */}
      <MessageText
        message="Se ha enviado un enlace de acceso a su correo. Por favor, verifique su bandeja de entrada."
        boldText="enlace de acceso"
        theme={theme}
      />

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
        onPress={() => console.log('Volver a inicio de sesión')}
        theme={theme}
      />

    </SafeAreaView>
  );
};

export default ActivateAccount;