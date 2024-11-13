import api from "./api";
import { handleError } from "./api";
import { APIError, CreatePostRequest, Post } from "@/types/apiContracts";

export const getPosts = async (
  userId: string,
  offset: number = 0,
  limit: number = 10
): Promise<Post[]> => {
  try {
    const response = await api.get("/posts", {
      params: {
        // time,
        userId,
        offset,
        limit,
      },
    });
    console.log("Successful get post request.");
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const addPost = async (postData: CreatePostRequest): Promise<Post> => {
  try {
    const response = await api.post("/posts", postData);
    console.log(response.data)
    console.log("Successful post creation.");
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const likePost = async (postId: string, userId: string): Promise<void> => {
  try {
    await api.post(`/posts/${postId}/likes`, { userId }); // Evita duplicar 'api/'
  } catch (error: any) {
    console.error("Error al agregar el like:", error.response?.data || error.message);
    throw new APIError("Error al agregar el like");
  }
};

export const unlikePost = async (postId: string, userId: string): Promise<void> => {
  try {
    await api.delete(`/posts/${postId}/likes/${userId}`); // Evita duplicar 'api/'
  } catch (error: any) {
    console.error("Error al quitar el like:", error.response?.data || error.message);
    throw new APIError("Error al quitar el like");
  }
};
