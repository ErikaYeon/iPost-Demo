import { StyleSheet } from 'react-native';

const createSharedStyles = (theme: any) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.small,
  },
   googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.small,
    paddingHorizontal: theme.spacing.medium,
    borderWidth: 1,
    backgroundColor: theme.colors.background,
    borderColor: theme.colors.textSecondary,
    borderRadius: 10,
    width: '85%',
    justifyContent: 'flex-start',  // Cambiado para alinear al margen izquierdo
    marginVertical: 20,
  },
  googleText: {
    fontSize: theme.fonts.medium,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    marginLeft: 'auto',  
    marginRight: 'auto', 
  },
});

export default createSharedStyles;