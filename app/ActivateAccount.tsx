import React, { useState } from 'react';
import { SafeAreaView, View, Image, Text } from 'react-native';
import CustomButton from '../ui/components/CustomButton';
import MessageText from '../ui/components/MessageText'; 
import LinkText from '../ui/components/LinkText'; 
import HeaderText from '../ui/components/HeaderText'; 
import createSharedStyles from '../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../ui/styles/Theme';
import { router } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { resendEmailAsync } from "@/redux/slices/authSlice";
import { EmailType } from "@/types/apiContracts";
import { styles } from "../ui/styles/LogIn";


const ActivateAccount: React.FC = () => {
  const themeMode = useSelector((state: RootState) => state.profile.theme); // Selecciona el tema desde Redux
  const theme = themeMode === "dark" ? darkTheme : lightTheme; // Selecciona el tema correcto

  const sharedStyles = createSharedStyles(theme);
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const email = userProfile.email;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const emailType = EmailType.CONFIRMATION;

  const handleReenvio = async () => {
     console.log(email)
    try {
      const result = await dispatch(resendEmailAsync({email,emailType}));
        setSuccessMessage("Email enviado con éxito");  
    } catch (error) {
      console.error("Error from signup:", error);
      setErrorMessage("Ocurrió un error, intentalo nuevamente");
    }
  }

 
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
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom:35 }}> iPost</Text>
      </View>

      {/* Mensaje Informativo para enlace de acceso */}
      <MessageText
        message="Se ha enviado un enlace de acceso a su correo. Por favor, verifique su bandeja de entrada."
        boldText="enlace de acceso"
        theme={theme}
      />

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title="Reenviar enlace"  //ToDo: decidir que hacer
        onPress={handleReenvio} //ToDo: hacer un fetch especial para este
        type="primary"
        theme={theme}
        style={{ marginBottom: 35, marginTop: 15, width: '85%' }}
      />

      {/* Enlace para "Volver a inicio de sesión" */}
      <LinkText
        text="Volver a inicio de sesión"
        onPress={()=>router.push('/LogIn')}
        theme={theme}
      />
      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}
      {/* Error message banner */}
      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.errorText}>{successMessage}</Text>
        </View>
      ) : null}

    </SafeAreaView>
  );
};


export default ActivateAccount;