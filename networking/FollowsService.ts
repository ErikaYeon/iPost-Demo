import api from "./api";
import { APIError, UserShort } from "@/types/apiContracts";
import { handleError } from "./utils";

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
export const followUser = async (
  userId: string,
  userToFollow: string
): Promise<void> => {
  try {
    await api.post(`users/${userId}/followings`, { userId: userToFollow });
  } catch (error: any) {
    console.log("error a; tratar de seguir a un usario", error);
    handleError(error);
    throw new APIError("Error following user");
  }
};
export const unfollowUser = async (
  userId: string,
  userToUnfollow: string
): Promise<void> => {
  try {
    await api.delete(`users/${userId}/followings/${userToUnfollow}`);
  } catch (error: any) {
    console.log("error a; tratar de seguir a un usario", error);
    handleError(error);
    throw new APIError("Error following user");
  }
};
