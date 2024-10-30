import InitialMessage from '@/ui/components/InitialMessage';
import React from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import createSharedStyles from '../../ui/styles/SharedStyles';
import { lightTheme, darkTheme } from '../../ui/styles/Theme';
import { styles } from '../../ui/styles/LogIn';

const home = () => {
  
const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

    return (
      <SafeAreaView style={sharedStyles.screenContainer}>
        {/* mas adelante cuando este listo el timeline va a haber un condicional de si esta llena la lista 
        sale este componente y se pone el otro */}
      <InitialMessage theme={theme}/>
      </SafeAreaView>
    );
  }


export default home;
