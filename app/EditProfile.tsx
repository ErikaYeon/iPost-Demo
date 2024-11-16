import React, { useState, useRef, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  StyleSheet,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import EditProfileHeader from "@/ui/components/EditProfileHeader";
import InputRow from "../ui/components/InputRow";
import Dropdown from "../ui/components/Dropdown";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import { darkTheme } from "../ui/styles/Theme";

const theme = darkTheme;

const GENDER_OPTIONS = ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"];

const EditProfile: React.FC = () => {
  const [firstName, setFirstName] = useState("María");
  const [lastName, setLastName] = useState("González");
  const [nickname, setNickname] = useState("La Mari");
  const [username, setUsername] = useState("maria_gnz");
  const [gender, setGender] = useState("Mujer");
  const [description, setDescription] = useState("Comer, rezar, amar 🙏 Mamá de 🐶🐴");
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const genderInputRef = useRef<View>(null);

  useLayoutEffect(() => {
    if (genderDropdownVisible) {
      genderInputRef.current?.measureInWindow((x, y, width, height) => {
        setDropdownPosition({
          top: y + height,
          left: x,
          width,
        });
      });
    }
  }, [genderDropdownVisible]);

  const handleSaveChanges = () => {
    console.log("Cambios guardados");
  };

  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.background} barStyle="light-content" />
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() => <BackIcon width={15} height={15} fill={theme.colors.textPrimary} />}
          title="Editar perfil"
          onPress={() => console.log("Volver")}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Perfil y portada</Text>
        <Text style={styles.subtitle}>Toca la foto para cambiarla</Text>
      </View>

      <EditProfileHeader /> 

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputRow label="Nombre:" value={firstName} onChangeText={setFirstName} />
        <InputRow label="Apellido:" value={lastName} onChangeText={setLastName} />
        <InputRow label="Nickname:" value={nickname} onChangeText={setNickname} />
        <InputRow label="Usuario:" value={username} onChangeText={setUsername} />
        <InputRow
          label="Género:"
          value={gender}
          isSelectable
          isDropdownVisible={genderDropdownVisible}
          genderInputRef={genderInputRef}
          onPressSelectable={() => setGenderDropdownVisible(!genderDropdownVisible)}
        />
        <InputRow label="Descripción:" value={description} onChangeText={setDescription} multiline />
        <CustomButton title="Guardar cambios" onPress={handleSaveChanges} type="primary" theme={theme} style={styles.saveButton} />
      </ScrollView>

      {genderDropdownVisible && (
        <Dropdown
          options={GENDER_OPTIONS}
          position={dropdownPosition}
          onSelect={(option) => {
            setGender(option);
            setGenderDropdownVisible(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight + 10 : 30,
  },
  sectionContainer: {
    paddingHorizontal: 10,
    marginTop: -9,
    backgroundColor: theme.colors.background,
  },
  sectionTitle: {
    fontSize: 15,
    color: theme.colors.textPrimary,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: theme.fonts.small,
    color: theme.colors.textSecondary,
    marginBottom: 10,
  },
  contentContainer: {
    alignItems: "center",
    padding: 16,
  },
  saveButton: {
    marginTop: 20,
    width: "90%",
    backgroundColor: theme.colors.primary,
  },
});

export default EditProfile;