import React, { RefObject } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface InputRowProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  multiline?: boolean;
  isSelectable?: boolean;
  onPressSelectable?: () => void;
  isDropdownVisible?: boolean;
  genderInputRef?: RefObject<TouchableOpacity>;
  theme: any; // Agregado para manejar el tema
}

const InputRow: React.FC<InputRowProps> = ({
  label,
  value,
  onChangeText,
  multiline = false,
  isSelectable = false,
  onPressSelectable,
  isDropdownVisible,
  genderInputRef,
  theme,
}) => {
  const styles = createStyles(theme);

  return (
    <View style={styles.inputRow}>
      <Text style={styles.inputLabel}>{label}</Text>
      {isSelectable ? (
        <TouchableOpacity
          ref={genderInputRef}
          style={styles.inputField}
          onPress={onPressSelectable}
        >
          <Text style={styles.selectableText}>{value}</Text>
          <Icon
            name={isDropdownVisible ? "keyboard-arrow-up" : "keyboard-arrow-down"}
            size={26}
            color='#201E43'
          />
        </TouchableOpacity>
      ) : (
        <TextInput
          style={[styles.inputField, multiline && styles.multilineInput]}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          underlineColorAndroid="transparent"
        />
      )}
    </View>
  );
};

const createStyles = (theme: any) =>
  StyleSheet.create({
    inputRow: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginBottom: theme.spacing.small,
    },
    inputLabel: {
      width: 93,
      fontSize: theme.fonts.small,
      color: theme.colors.textPrimary,
      fontWeight: "bold",
      marginRight: theme.spacing.small,
    },
    inputField: {
      flex: 1,
      backgroundColor: theme.colors.secondary,
      borderRadius: 5,
      borderColor: "#B5BACB", // Color del borde
      borderWidth: 1, // Espesor del borde
      height: 32,
      paddingHorizontal: theme.spacing.small,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    multilineInput: {
      height: 80,
      textAlignVertical: "top",
    },
    selectableText: {
      fontSize: theme.fonts.small,
      color: '#201E43',
      flex: 1,
    },
  });

export default InputRow;
