import api from "./api";
import { CommentType1 } from "@/types/apiContracts";

export const getComments = async (postId: string): Promise<CommentType1[]> => {
  const response = await api.get(`/posts/${postId}/comments`);
  return response.data;
};

export const setComment = async (
  postId: string,
  authorId: string,
  comment: string
): Promise<CommentType1> => {
  const commentData = {
    authorId,
    content: comment,
  };
  const response = await api.post(`/posts/${postId}/comments`, commentData);
  console.log("Successful post comments by id:", response.data);
  return response.data;
};
