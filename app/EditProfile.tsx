import React, { useState, useRef, useLayoutEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderWithIcon from "../ui/components/HeaderWithIcon";
import EditProfileHeader from "@/ui/components/EditProfileHeader";
import InputRow from "../ui/components/InputRow";
import Dropdown from "../ui/components/Dropdown";
import BackIcon from "../assets/images/icons/navigate_before.svg";
import BackIconLightMode from "../assets/images/icons/navigate_before_lightMode.svg";
import { darkTheme, lightTheme } from "../ui/styles/Theme";
import { router } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  setProfileLastName,
  setProfileUsername,
  setProfileName,
  setProfileDescription,
} from "@/redux/slices/profileSlice";

const theme = darkTheme; // Cambia manualmente entre `darkTheme` y `lightTheme`

const GENDER_OPTIONS = ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"];

const EditProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Profile = useSelector((state: RootState) => state.profile);
  const [gender, setGender] = useState("Mujer");
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

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

  const styles = createEditProfileStyles(theme);

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle={theme.isDark ? "light-content" : "dark-content"}
      />
      <SafeAreaView style={styles.safeArea}>
        <HeaderWithIcon
          iconComponent={() =>
            theme.isDark ? (
              <BackIcon
                width={15}
                height={15}
                fill={theme.colors.textPrimary}
              />
            ) : (
              <BackIconLightMode
                width={15}
                height={15}
                fill={theme.colors.textPrimary}
              />
            )
          }
          title="Editar perfil"
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Perfil y portada</Text>
        <Text style={styles.subtitle}>Toca la foto para cambiarla</Text>
      </View>

      <EditProfileHeader theme={theme} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputRow
          label="Nombre:"
          value={Profile.name}
          onChangeText={(value) => dispatch(setProfileName(value))}
          theme={theme}
        />
        <InputRow
          label="Apellido:"
          value={Profile.lastname}
          onChangeText={(value) => dispatch(setProfileLastName(value))}
          theme={theme}
        />
        {/* <InputRow
          label="Nickname:"
          value={nickname}
          onChangeText={setNickname}
          theme={theme}
        /> */}
        <InputRow
          label="Usuario:"
          value={Profile.username}
          onChangeText={(value) =>
            dispatch(setProfileUsername({ username: value }))
          }
          theme={theme}
        />
        <InputRow
          label="Género:"
          value={gender}
          isSelectable
          isDropdownVisible={genderDropdownVisible}
          genderInputRef={genderInputRef}
          onPressSelectable={() =>
            setGenderDropdownVisible(!genderDropdownVisible)
          }
          theme={theme}
        />
        <InputRow
          label="Descripción:"
          value={Profile.description}
          onChangeText={(value) => dispatch(setProfileDescription(value))}
          multiline
          theme={theme}
        />
        <CustomButton
          title="Guardar cambios"
          onPress={handleSaveChanges}
          type="primary"
          theme={theme}
          style={styles.saveButton}
        />
      </ScrollView>

      {genderDropdownVisible && (
        <Dropdown
          options={GENDER_OPTIONS}
          position={dropdownPosition}
          onSelect={(option) => {
            setGender(option);
            setGenderDropdownVisible(false);
          }}
          theme={theme}
        />
      )}
    </View>
  );
};

const createEditProfileStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
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
