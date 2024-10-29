import React from 'react';
import { SafeAreaView,  TouchableOpacity, View, Image, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import HeaderText from '../components/HeaderText';  
import RegularText from '../components/RegularText';  
import createSharedStyles from '../styles/SharedStyles';
import { lightTheme, darkTheme } from '../styles/Theme';
{/* import i18n from '../i18n'; */} // Para las traducciones. No pude probarlo, solo está en esta pantalla por ahora

const theme =   darkTheme;  // Puedes cambiar manualmente entre lightTheme y darkTheme
const sharedStyles = createSharedStyles(theme);

const FirstScreen: React.FC = () => {
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>

      {/* Logo como imagen PNG */}
      <Image 
        source={require('./assets/images/icons/LogoiPost.png')} 
        style={{ width: 180, height: 180 }} 
      />

      {/* Texto "Bienvenidos a iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text= {i18n.t('welcome')} theme={theme} />
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary }}> iPost</Text>
      </View> 

      {/* Contenedor de botones */}
      <View style={{ width: '100%', alignItems: 'center' }}>

        {/* Botón de Iniciar sesión */}
        <CustomButton
          title= {i18n.t('login')}
          onPress={() => console.log('Iniciar sesión')}
          type="primary"
          theme={theme}
          style={{marginBottom: theme.spacing.medium, width: '85%' }} 
        />

        {/* Botón de Registrarse */}
        <CustomButton
          title={i18n.t('signup')} 
          onPress={() => console.log('Registrarse')}
          type="secondary"
          theme={theme}
          style={{ marginBottom: theme.spacing.medium, width: '85%' }} 
        />
      </View>

      {/* Texto "o continua con" */}
      <RegularText text= {i18n.t('continueWith')} theme={theme} />

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

export default FirstScreen;