import React, { useEffect } from "react";
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../ui/components/CustomButton";
import HeaderText from "../ui/components/HeaderText";
import createSharedStyles from "../ui/styles/SharedStyles";
import { darkTheme } from "../ui/styles/Theme";
import { useRouter } from "expo-router";
import RegularTextLine from "@/ui/components/RegularTextLine";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { autoLoginAsync } from "@/redux/slices/authSlice";
import { setProfileUserId } from "@/redux/slices/profileSlice";

const theme = darkTheme;
const sharedStyles = createSharedStyles(theme);

const FirstScreen: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    const checkAutoLogin = async () => {
      const resultAction = await dispatch(autoLoginAsync());
      if (autoLoginAsync.fulfilled.match(resultAction)) {
        dispatch(setProfileUserId(resultAction.payload.userId));
        router.push("/(tabs)/home");
      }
    };

    if (authStatus !== "authenticated") {
      checkAutoLogin();
    }
  }, [authStatus, dispatch, router]);

  return (
    <SafeAreaView style={sharedStyles.screenContainer}>
      <Image
        source={require("../assets/images/icons/LogoiPost.png")}
        style={{ width: 180, height: 180 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "baseline",
        }}
      >
        <HeaderText text="Bienvenidos a" theme={theme} />
        <Text
          style={{
            fontSize: 34,
            fontWeight: "bold",
            color: theme.colors.textPrimary,
          }}
        >
          {" "}
          iPost
        </Text>
      </View>

      {authStatus === "loading" ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <View style={{ width: "100%", alignItems: "center" }}>
          <CustomButton
            title="Iniciar Sesión"
            onPress={() => router.push("/LogIn")}
            type="primary"
            theme={theme}
            style={{ marginBottom: theme.spacing.medium, width: "85%" }}
          />
          <CustomButton
            title="Registrarse"
            onPress={() => router.push("/SignUp")}
            type="secondary"
            theme={theme}
            style={{ marginBottom: theme.spacing.medium, width: "85%" }}
          />
        </View>
      )}

      <RegularTextLine text="o continua con" theme={theme} />
      <TouchableOpacity
        style={[sharedStyles.googleButton, { marginTop: theme.spacing.xsmall }]}
        onPress={() => router.push("/LogInFaceId")}
      >
        <Image
          source={require("../assets/images/icons/Google.png")}
          style={{ width: 24, height: 24 }}
        />
        <Text style={sharedStyles.googleText}>Google</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default FirstScreen;
