import api from "./api";
import { handleError } from "./api";
import {
  APIError,
  ProfileImageRequest,
  ProfileUpdateRequest,
  UserResponse,
  UserSettingsResponse,
  UserShort,
  Post,
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

export const searchProfiles = async (
  searchValue: string,
  limit: number = 10,
  offset: number = 0
): Promise<UserShort[]> => {
  try {
    const response = await api.get(`/users`, {
      params: { searchValue, limit, offset },
    });
    console.log("Successful profile search:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error searching profiles:",
      error.response?.data || error.message
    );
    throw new APIError("Error searching profiles");
  }
};
export const setProfileImage = async (
  userId: string,
  profileImageData: ProfileImageRequest
): Promise<UserResponse> => {
  try {
    const response = await api.put(
      `users/${userId}/profile-images`,
      profileImageData
    );
    console.log("actualizacion foto exitosa");
    console.log(response.status);
    return response.data;
  } catch (error: any) {
    console.log("no se pudo actualizar la foto ");
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const setUserData = async (
  userId: string,
  profileData: ProfileUpdateRequest
): Promise<UserResponse> => {
  try {
    const response = await api.put(`users/${userId}`, profileData);
    console.log("actualizacion data perfil exitosa");
    console.log(response.status);
    return response.data;
  } catch (error: any) {
    console.log("no se pudo actualizar la data profile");
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const getUserPosts = async (userId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`/users/${userId}/posts`);
    console.log("Posts del usuario obtenidos exitosamente.");
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener los posts del usuario:", error);
    throw new APIError("Error al obtener los posts del usuario");
  }
};
export const getUserFavorites = async (userId: string): Promise<Post[]> => {
  try {
    const response = await api.get(`users/${userId}/favorites`);
    console.log("get favorites exitoso");
    return response.data;
  } catch (error: any) {
    console.log("error al traer los favoritos");
    handleError(error);
    throw new Error("No se pudieron obtener los favoritos");
  }
};
