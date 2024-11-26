import api from "./api";
import { handleError } from "./api";
import { APIError, UserShort } from "@/types/apiContracts";

export const getFollowingsUser = async (
  userId: string
): Promise<UserShort[]> => {
  try {
    const response = await api.get(`users/${userId}/followings`);
    console.log("get folloowings succesful", response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Error getting followings");
  }
};
export const getFollowersUser = async (
  userId: string
): Promise<UserShort[]> => {
  try {
    const response = await api.get(`users/${userId}/followers`);
    console.log("get folloowings succesful", response.data);
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Error getting followings");
  }
};
