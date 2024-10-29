import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo: React.FC = () => {
  return <Image source={require('../assets/images/icons/LogoiPost.png')} style={styles.logo} />;
};

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
});

export default Logo;