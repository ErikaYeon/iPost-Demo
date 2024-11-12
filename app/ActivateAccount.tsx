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
import { signupAsync } from "@/redux/slices/authSlice";
import { SignupRequest } from "@/types/apiContracts";
import Placeholders from "@/constants/ProfilePlaceholders";
import { styles } from "../ui/styles/LogIn";


const theme = darkTheme; 
const sharedStyles = createSharedStyles(theme);


const ActivateAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const email = userProfile.email;
  const password = userProfile.password;
  const username = userProfile.username;
  const [errorMessage, setErrorMessage] = useState("");

  const handleReenvio = async () => {
     console.log(email)
    //  const userData: SignupRequest = {
    //   email,
    //   password,
    //   username,
    //   name: Placeholders.DEFAULT_PROFILE_NAME,
    //   lastname: Placeholders.DEFAULT_PROFILE_LASTNAME,
    // };

    // try {
    //   const result = await dispatch(signupAsync(userData));

    //   if (signupAsync.fulfilled.match(result)) {
    //     // setPassword("");
    //     // setUsername("");
    //     router.push("/ActivateAccount");
    //   } else {
    //     setErrorMessage("Ocurrió un error, intentalo nuevamente");
    //   }
    // } catch (error) {
    //   console.error("Error from signup:", error);
    //   setErrorMessage("Ocurrió un error, intentalo nuevamente");
    // }
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
        title="Reenviar enlace"  //ToDo: decidir que hacer
        onPress={handleReenvio} //ToDo: hacer un fetch especial para este
        type="primary"
        theme={theme}
        style={{ marginBottom: theme.spacing.medium, width: '85%' }}
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

    </SafeAreaView>
  );
};


export default ActivateAccount;