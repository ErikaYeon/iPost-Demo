import api from "./api";
import {
  APIError,
  ProfileImageRequest,
  ProfileUpdateRequest,
  UserResponse,
  UserSettingsResponse,
  UserShort,
} from "@/types/apiContracts";

export const getUserData = async (userId: string): Promise<UserResponse> => {
  const response = await api.get(`/users/${userId}`);
  if (response.status !== 200) {
    throw new APIError("Error getting user info.");
  }
  console.log("Successful user info get.");
  return response.data;
};

export const getUserSettings = async (
  userId: string
): Promise<UserSettingsResponse> => {
  const response = await api.get(`users/${userId}/settings`);
  if (response.status !== 200) {
    throw new APIError("Error getting user settings.");
  }
  console.log("Successful user settings get.");
  return response.data;
};

export const setUserSettings = async (
  userId: string,
  userSettings: UserSettingsResponse
): Promise<number> => {
  const response = await api.put(`users/${userId}/settings`, userSettings);
  if (response.status !== 200) {
    throw new APIError("Error setting user settings.");
  }
  console.log("Successful user settings set.");
  return response.status;
};

export const searchProfiles = async (
  searchValue: string,
  limit: number = 10,
  offset: number = 0
): Promise<UserShort[]> => {
  const response = await api.get(`/users`, {
    params: { searchValue, limit, offset },
  });
  console.log("Successful profile search:", response.data);
  return response.data;
};
export const setProfileImage = async (
  userId: string,
  profileImageData: ProfileImageRequest
): Promise<UserResponse> => {
    const response = await api.put(
        `users/${userId}/profile-images`,
        profileImageData
    );
    console.log("actualizacion foto exitosa");
    console.log(response.status);
    return response.data;
};

export const setUserData = async (
  userId: string,
  profileData: ProfileUpdateRequest
): Promise<UserResponse> => {
    const response = await api.put(`users/${userId}`, profileData);
    console.log("actualizacion data perfil exitosa");
    console.log(response.status);
    return response.data;
};
