import api from "./api";
import { Ads, APIError, CreatePostRequest, Post } from "@/types/apiContracts";
import { handleError } from "./utils";

export const getPosts = async (
  userId: string,
  offset: number = 0,
  limit: number = 10,
  time?: string
): Promise<Post[]> => {
  try {
    console.log("last fetch service" + time);
    const params: Record<string, any> = { userId, offset, limit };
    if (time) {
      params.time = time;
    }
    if (time) {
      const response = await api.get("/posts", {
        params: { userId, offset, limit, time },
      });
    }
    const response = await api.get("/posts", {
      params: { userId, offset, limit },
    });
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const addPost = async (postData: CreatePostRequest): Promise<Post> => {
  try {
    const response = await api.post("/posts", postData);
    console.log("Successful post creation.");
    return response.data;
  } catch (error: any) {
    handleError(error);
    throw new APIError("Never executed");
  }
};

export const likePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await api.post(`/posts/${postId}/likes`, { userId }); // Evita duplicar 'api/'
  } catch (error: any) {
    console.error(
      "Error al agregar el like:",
      error.response?.data || error.message
    );
    throw new APIError("Error al agregar el like");
  }
};

export const unlikePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await api.delete(`/posts/${postId}/likes/${userId}`); // Evita duplicar 'api/'
  } catch (error: any) {
    console.error(
      "Error al quitar el like:",
      error.response?.data || error.message
    );
    throw new APIError("Error al quitar el like");
  }
};
export const getAdvertising = async (): Promise<Ads[]> => {
  try {
    const response = await api.get("/advertising");
    // console.log(response.data)
    console.log("Successful get ads");
    return response.data;
  } catch (error: any) {
    console.log("no anda ads");
    handleError(error);
    throw new APIError("Never executed");
  }
};
export const favoritePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await api.post(`users/${userId}/favorites`, { postId });
    console.log("favorito guardado exitosamente");
  } catch (error: any) {
    console.error(
      "Error al agregar el favorito:",
      error.response?.data || error.message
    );
    handleError(error);
    // throw new APIError("Error al agregar el favorito");
  }
};

export const unfavoritePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  try {
    await api.delete(`users/${userId}/favorites/${postId}`);
    console.log("favorito sacado exitosamente");
  } catch (error: any) {
    console.error(
      "Error al sacar el favorito:",
      error.response?.data || error.message
    );
    handleError(error);
    throw new APIError("Error al sacar el favorito");
  }
};
