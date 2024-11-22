import api from "./api";
import { handleError } from "./api";
import {
  APIError,
  UserResponse,
  UserSettingsResponse,
} from "@/types/apiContracts";

export const getUserData = async (userId: string): Promise<UserResponse> => {
  try {
    const response = await api.get(`/users/${userId}`);

    if (response.status !== 200) {
      console.log(`Error getting user info. Code error: ${response.status}`);
      throw new APIError("Error getting user info.");
    }

    console.log("Successful user info get.");
    return response.data;
  } catch (error) {
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};

export const getUserSettings = async (
  userId: string
): Promise<UserSettingsResponse> => {
  try {
    const response = await api.get(`users/${userId}/settings`);
    if (response.status !== 200) {
      console.log(
        `Error getting user settings. Code error: ${response.status}`
      );
      throw new APIError("Error getting user settings.");
    }
    console.log("Successful user settings get.");
    console.log("USER SETTINGS" + JSON.stringify(response.data, null, 2));
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};
export const setUserSettings = async (
  userId: string,
  userSettings: UserSettingsResponse
): Promise<number> => {
  try {
    const response = await api.put(`users/${userId}/settings`, userSettings);
    if (response.status !== 200) {
      console.log(
        `Error setting user settings. Code error: ${response.status}`
      );
      throw new APIError("Error setting user settings.");
    }
    console.log(
      "settings y theme: " + userSettings.language + userSettings.theme
    );
    console.log("Successful user settings set.");
    console.log(
      "USER SETTINGS SET" + userSettings.language + userSettings.theme
    );
    return response.status;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};
