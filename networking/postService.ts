import api from "./api";
import { handleError } from "./api";
import { Ads, APIError, CreatePostRequest, Post } from "@/types/apiContracts";

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

export const getAdvertising = async (): Promise<Ads[]> => {
  try{
    const response = await api.get("/advertising");
    console.log(response.data)
    console.log("Successful get ads");
    return response.data;
  }catch (error: any) {
    console.log('no anda ads')
    handleError(error);
    throw new APIError("Never executed");
  }
};
