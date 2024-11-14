import React from 'react';
import { SafeAreaView,  TouchableOpacity, View, Image, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import HeaderText from '../ui/components/HeaderText';    
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
{/* import i18n from '../i18n'; */} // Para las traducciones. No pude probarlo, solo está en esta pantalla por ahora
import { Link, useRouter } from 'expo-router';
import RegularTextLine from '@/ui/components/RegularTextLine';

const theme =   darkTheme;  // Puedes cambiar manualmente entre lightTheme y darkTheme
const sharedStyles = createSharedStyles(theme);

const FirstScreen: React.FC = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={sharedStyles.screenContainer}>

      {/* Logo como imagen PNG */}
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={{ width: 180, height: 180 }} 
      />

      {/* Texto "Bienvenidos a iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text= {('Bienvenido a')} theme={theme} />
        <Text style={{ fontSize: 33, fontWeight: 'bold', color: theme.colors.textPrimary }}> iPost</Text>
      </View> 

      {/* Contenedor de botones */}
      <View style={{ width: '100%', alignItems: 'center' }}>

        {/* Botón de Iniciar sesión */}
        <CustomButton
          title= {('Iniciar sesión')}
          onPress={() => router.push('/LogIn')}
          type="primary"
          theme={theme}
          style={{marginBottom: theme.spacing.medium, width: '90%' }} 
        />

        {/* Botón de Registrarse */}
        <CustomButton
          title={('Registrarse')} 
          onPress={() => router.push('/SignUp')}
          type="secondary"
          theme={theme}
          style={{ marginBottom: theme.spacing.medium, width: '90%' }} 
        />
      </View>

      {/* Texto "o continua con" */}
      <RegularTextLine text= {('continuar con')} theme={theme} />

      {/* Botón de Google con imagen PNG */}
      <TouchableOpacity
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.medium, width: '90%' }]}
        onPress={() => router.push('/LogInFaceId')}
      >
        <Image 
          source={require('../assets/images/icons/Google.png')} 
          style={{ width: 24, height: 24}} 
        />
        <Text style={sharedStyles.googleText}>Google</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
};

export default FirstScreen;