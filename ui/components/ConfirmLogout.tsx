import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "../../ui/components/CustomButton";
import { darkTheme } from "../../ui/styles/Theme";

const ConfirmLogout = ({ visible, onCancel, onConfirm, theme = darkTheme }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onCancel} // Cierra el modal al presionar el botón de atrás en Android
    >
      <View style={styles.overlay}>
        <View style={[styles.card, { backgroundColor: theme.colors.background }]}>
          <Text style={[styles.message, { color: theme.colors.textPrimary }]}>
            ¿Está seguro de que desea {"\n"}cerrar sesión?
          </Text>
          <View style={styles.buttonContainer}>
            {/* Botón Cancelar */}
            <CustomButton
              title="Cancelar"
              onPress={onCancel}
              type="secondary"
              theme={theme}
              style={[
                styles.cancelButton,
                { borderColor: theme.colors.textPrimary },
              ]}
              textStyle={{
                color: theme.colors.textPrimary,
                fontSize: 16, // Tamaño de fuente para el botón
              }}
            />

            {/* Botón Cerrar sesión */}
            <CustomButton
              title="Cerrar sesión"
              onPress={onConfirm}
              type="error"
              theme={theme}
              style={styles.logoutButton}
              textStyle={{
                color: theme.colors.textPrimary,
                fontSize: 16, // Tamaño de fuente para el botón
              }}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo translúcido
  },
  card: {
    borderRadius: 12,
    padding: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
    elevation: 5,
  },
  message: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  cancelButton: {
    flex: 1,
    marginRight: 10,
    backgroundColor: "transparent", // Fondo transparente
    borderWidth: 1, // Borde para el botón Cancelar
  },
  logoutButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#E34C5E", // Rojo para el botón de confirmar
  },
});

export default ConfirmLogout;
