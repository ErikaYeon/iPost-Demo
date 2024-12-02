import React from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import CustomButton from "../../ui/components/CustomButton";
import { darkTheme } from "../../ui/styles/Theme";
import { useTranslation } from "react-i18next";

const ConfirmDeleteAccount = ({ visible, onCancel, onConfirm, theme = darkTheme }) => {
  const { t, i18n } = useTranslation("translations");

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
            {i18n.t("confirmDeleteAccount.message")}
          </Text>
          <View style={styles.buttonContainer}>
            {/* Botón Cancelar */}
            <CustomButton
              title={i18n.t("confirmDeleteAccount.cancel")}
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

            {/* Botón Eliminar Cuenta */}
            <CustomButton
              title={i18n.t("confirmDeleteAccount.confirm")}
              onPress={onConfirm}
              type="error"
              theme={theme}
              style={styles.deleteButton}
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
    width: "90%",
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
    paddingHorizontal: -2,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: "#E34C5E", // Rojo para el botón de confirmar
    paddingHorizontal: 6,
  },
});

export default ConfirmDeleteAccount;
