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

      {/* Texto de seguidores */}
      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 36, color: theme.colors.textPrimary }}>
          {i18n.t("initialMessage.followers")}
        </Text>
      </View>

      {/* Mensaje motivacional */}
      <Text
        style={{
          fontSize: theme.fonts.medium,
          color: theme.colors.textPrimary,
          textAlign: "center",
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        {i18n.t("initialMessage.motivation")}
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
    width: 150,
    height: 150,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    padding: 7,
  },
});

export default InitialMessage;
