import api from "./api";
import { handleError } from "./api";
import { APIError, UserResponse } from "@/types/apiContracts";

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
