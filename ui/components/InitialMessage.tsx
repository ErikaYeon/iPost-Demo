import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";

interface InitialMessageProps {
  theme: any;
}

const InitialMessage: React.FC<InitialMessageProps> = ({ theme }) => {
  const { t, i18n } = useTranslation("translations");

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />

      {/* Texto de bienvenida */}
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 36, color: theme.colors.textPrimary }}>
          {i18n.t("initialMessage.welcome")}
        </Text>
      </View>

      {/* Mensaje informativo */}
      <Text
        style={{
          fontSize: theme.fonts.medium,
          color: theme.colors.textPrimary,
          textAlign: "center",
        }}
      >
        {i18n.t("initialMessage.prompt")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  logo: {
    width: 200, // ajustar según sea necesario
    height: 200, // ajustar según sea necesario
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    padding: 7,
  },
});

export default InitialMessage;
