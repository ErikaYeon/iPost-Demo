import api from "./api";
import { Ads, CreatePostRequest, Post } from "@/types/apiContracts";

export const getPosts = async (
  userId: string,
  offset: number = 0,
  limit: number = 10,
  time?: string
): Promise<Post[]> => {
  console.log("last fetch service", time);
  const params: Record<string, any> = { userId, offset, limit };
  if (time) {
    params.time = time;
  }
  const response = await api.get("/posts", { params });
  return response.data;
};

export const addPost = async (postData: CreatePostRequest): Promise<Post> => {
  const response = await api.post("/posts", postData);
  console.log("Successful post creation.");
  return response.data;
};

export const likePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  await api.post(`/posts/${postId}/likes`, { userId });
};

export const unlikePost = async (
  postId: string,
  userId: string
): Promise<void> => {
  await api.delete(`/posts/${postId}/likes/${userId}`);
};

export const getAdvertising = async (): Promise<Ads[]> => {
  const response = await api.get("/advertising");
  console.log("Successful get ads");
  return response.data;
};
