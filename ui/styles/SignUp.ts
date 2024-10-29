import { StyleSheet } from 'react-native';
import { darkTheme } from './Theme';

const theme = darkTheme;

const createStyles = (theme: any) => {
  return StyleSheet.create({
    errorBanner: {
        position: 'absolute', // Position it at the bottom
        bottom: 0, // Align to the bottom
        left: 0,
        right: 0,
        backgroundColor: theme.colors.error, // Red background for error
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      errorText: {
        color: '#FFFFFF', // White text
        textAlign: 'center',
        fontSize: 16,
      },
    googleButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
      padding: theme.spacing.small,
      borderRadius: theme.borderRadius,
      width: '85%',
    },
    googleText: {
      color: theme.colors.googleText,
      fontSize: theme.fonts.medium,
      fontWeight: 'bold',
    },
  });
};

export default createStyles;
