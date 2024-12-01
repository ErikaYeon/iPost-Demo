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
import { useTranslation } from "react-i18next";

const theme = darkTheme; 
const sharedStyles = createSharedStyles(theme);

const ActivateAccount: React.FC = () => {
  const { t, i18n } = useTranslation("translations"); // Importando traducciones
  const dispatch = useDispatch<AppDispatch>();
  const userProfile = useSelector((state: RootState) => state.profile);
  const email = userProfile.email;
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const emailType = EmailType.CONFIRMATION;

  const handleReenvio = async () => {
    console.log(email);
    try {
      const result = await dispatch(resendEmailAsync({ email, emailType }));
      setSuccessMessage(i18n.t("activateAccount.successMessage"));
    } catch (error) {
      console.error("Error from signup:", error);
      setErrorMessage(i18n.t("activateAccount.errorMessage"));
    }
  };

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      {/* Logo de iPost */}
      <Image 
        source={require('../assets/images/icons/LogoiPost.png')} 
        style={{ width: 150, height: 150, marginBottom: 20 }} 
      />

      {/* Título "Activá tu iPost" */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline' }}>
        <HeaderText text={i18n.t("activateAccount.titlePart1")} theme={theme} />
        <Text style={{ fontSize: 34, fontWeight: 'bold', color: theme.colors.textPrimary, marginBottom: 35 }}> iPost</Text>
      </View>

      {/* Mensaje Informativo para enlace de acceso */}
      <MessageText
        message={i18n.t("activateAccount.infoMessage")}
        boldText={i18n.t("activateAccount.boldText")}
        theme={theme}
      />

      {/* Botón "Reenviar enlace" */}
      <CustomButton
        title={i18n.t("activateAccount.resendButton")} 
        onPress={handleReenvio}
        type="primary"
        theme={theme}
        style={{ marginBottom: 35, marginTop: 15, width: '85%' }}
      />

      {/* Enlace para "Volver a inicio de sesión" */}
      <LinkText
        text={i18n.t("activateAccount.backToLogin")}
        onPress={() => router.push('/LogIn')}
        theme={theme}
      />

      {/* Error message banner */}
      {errorMessage ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{errorMessage}</Text>
        </View>
      ) : null}

      {/* Success message banner */}
      {successMessage ? (
        <View style={styles.successBanner}>
          <Text style={styles.errorText}>{successMessage}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

export default ActivateAccount;
