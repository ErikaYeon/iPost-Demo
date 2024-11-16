import React from "react";
import { TouchableOpacity, Text, View, StyleSheet, Dimensions } from "react-native";

const SettingsOption = ({ text, onPress, color, dividerColor }) => (
  <>
    <TouchableOpacity style={styles.link} onPress={onPress}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </TouchableOpacity>
    <View style={[styles.divider, { backgroundColor: dividerColor }]} />
  </>
);

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: Dimensions.get("window").width, // Asegura que ocupe todo el ancho de la pantalla
    alignSelf: "center",
  },
  link: {
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
  },
});

export default SettingsOption;
