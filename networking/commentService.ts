import api from "./api";
import { APIError, commentType1 } from "@/types/apiContracts";
import { handleError } from "./utils";

export const getComments = async (postId: string): Promise<commentType1[]> => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    return response.data;
  } catch (error: any) {
    console.log("no anda comments");
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const setComment = async (
  postId: string,
  authorId: string,
  comment: string
): Promise<commentType1> => {
  try {
    const commentData = {
      authorId: authorId,
      content: comment,
    };
    const response = await api.post(`/posts/${postId}/comments`, commentData);
    console.log(response.data);
    console.log("Successful post comments by id");
    return response.data;
  } catch (error: any) {
    console.log("no anda post comments");
    handleError(error);
    throw new APIError("Never executed");
  }
};
