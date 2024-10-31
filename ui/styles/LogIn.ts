// LogInScreenStyles.ts
import { StyleSheet } from 'react-native';
import { darkTheme } from './Theme';

const theme = darkTheme;

export const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    padding: 7,
  },
  headerText: {
    fontSize: 34,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  headerTextContra: {
    fontSize: 25,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  TextInfo: {
    fontSize: 17,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    margin: 18,
    paddingHorizontal: 10,

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
    color: theme.colors.textSecondary,
    fontSize: theme.fonts.medium,
    fontWeight: 'bold',
  },
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
  listContainer: {
    paddingTop: 30,
    paddingBottom: 0,
    marginBottom: 100,
  },
});
