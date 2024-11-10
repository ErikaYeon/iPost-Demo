import api from "./api";
import { handleError } from "./api";
import { APIError, Post } from "@/types/apiContracts";

export const getPosts = async (
  time: Date,
  userId: string,
  offset: number = 0,
  limit: number = 10
): Promise<Post[]> => {
  try {
    const response = await api.get(`/posts`, {
      params: {
        time,
        userId,
        offset,
        limit,
      },
    });
    console.log("Successful get post request.");
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed"); // This 'throw' is never executed, but TypeScript was whining about the method contract.
  }
};
