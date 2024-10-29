import { StyleSheet } from 'react-native';

const createStyles = (theme: any) => StyleSheet.create({
  button: {
    paddingVertical: 10,
    borderRadius: theme.borderRadius,
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  primary: {
    // Botón de Iniciar sesión (fondo verde)
    backgroundColor: theme.colors.primary, 
    marginBottom: 1, 
  },
  secondary: {
    // Botón de Registrarse (fondo claro, borde verde)
    backgroundColor: theme.colors.secondary,  
    borderWidth: 2,
    borderColor: theme.primary,  // Borde verde
  },
  disabled: {
    backgroundColor: theme.colors.textSecondary,
  },
  buttonTextPrimary: {
    fontSize: theme.fonts.medium,
    fontWeight: 'bold',
     
    color: '#201E43',  // Texto oscuro
  },
  buttonTextSecondary: {
    fontSize: theme.fonts.medium,
    fontWeight: 'bold',
    color: '#201E43',  // Texto oscuro
  },
});

export default createStyles;