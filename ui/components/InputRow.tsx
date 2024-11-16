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
}) => {
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
            color="#201E43"
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

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 8,
  },
  inputLabel: {
    width: 93,
    fontSize: 14,
    color: "#FFFF",
    fontWeight: "bold",
    marginRight: 8,
  },
  inputField: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 6,
    height: 32,
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  multilineInput: {
    height: 80,
    textAlignVertical: "top",
  },
  selectableText: {
    fontSize: 14,
    color: "#201E43",
    flex: 1,
  },
});

export default InputRow;
