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
  setProfileData,
  updateProfileDataAsync,
} from "@/redux/slices/profileSlice";
import { genderToString, stringToGender } from "@/types/mappers";
import { ProfileUpdateRequest } from "@/types/apiContracts";
import { useTranslation } from "react-i18next";

const theme = darkTheme; // Cambia manualmente entre `darkTheme` y `lightTheme`

const GENDER_OPTIONS = ["Mujer", "Hombre", "No binario", "Prefiero no decirlo"];

const EditProfile: React.FC = () => {
  const { t } = useTranslation(); // Usamos el hook de i18next para traducir
  const dispatch = useDispatch<AppDispatch>();
  const Profile = useSelector((state: RootState) => state.profile);
  const [genderDropdownVisible, setGenderDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const [firstName, setFirstName] = useState(Profile.name);
  const [lastName, setLastName] = useState(Profile.lastname);
  const [username, setUsername] = useState(Profile.username);
  const [description, setDescription] = useState(Profile.description);
  const [gender, setGender] = useState(
    genderToString(Profile.gender.toString())
  );
  const userId = Profile.id;

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
    const ProfileData: ProfileUpdateRequest = {
      name: firstName,
      lastname: lastName,
      username: username,
      description: description,
      gender: stringToGender(gender),
    };
    dispatch(setProfileData(ProfileData));
    dispatch(updateProfileDataAsync({ userId, profileData: ProfileData }));
    router.back();
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
          title={t("editProfile.title")}
          onPress={() => router.back()}
          theme={theme}
        />
      </SafeAreaView>

      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>{t("editProfile.profileAndCover")}</Text>
        <Text style={styles.subtitle}>{t("editProfile.tapToChangePhoto")}</Text>
      </View>

      <EditProfileHeader theme={theme} />

      <ScrollView contentContainerStyle={styles.contentContainer}>
        <InputRow
          label={t("editProfile.firstName")}
          value={firstName}
          onChangeText={setFirstName}
          theme={theme}
        />
        <InputRow
          label={t("editProfile.lastName")}
          value={lastName}
          onChangeText={setLastName}
          theme={theme}
        />
        <InputRow
          label={t("editProfile.username")}
          value={username}
          onChangeText={setUsername}
          theme={theme}
        />
        <InputRow
          label={t("editProfile.gender")}
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
          label={t("editProfile.description")}
          value={description}
          onChangeText={setDescription}
          multiline
          theme={theme}
        />
        <CustomButton
          title={t("editProfile.saveChanges")}
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
