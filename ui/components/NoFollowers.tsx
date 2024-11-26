import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import HeaderText from "./HeaderText";

interface InitialMessageProps {
  theme: any;
}

const InitialMessage: React.FC<InitialMessageProps> = ({ theme }) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/icons/LogoiPost.png")}
        style={styles.logo}
      />

      <View style={styles.headerContainer}>
        <Text style={{ fontSize: 36, color: theme.colors.textPrimary }}>
          {" "}
          0 Seguidores
        </Text>
      </View>

      <Text
        style={{
          fontSize: theme.fonts.medium,
          color: theme.colors.textPrimary,
          textAlign: "center",
          marginLeft: 15,
          marginRight: 15,
        }}
      >
        Mientras más uses la app más seguidores conseguirás!
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
    width: 150, // adjust as needed
    height: 150, // adjust as needed
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
    padding: 7,
  },
});

export default InitialMessage;
