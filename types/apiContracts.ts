export interface ApiGenericResponse {
  message: string;
  statusCode: number;
}

export class APIError extends Error {
  code?: number;

  constructor(message: string, code?: number) {
    super(message);
    this.code = code;
  }
}
export interface RejectedPayload {
  message: string;
  status: number;
}

export interface SignupRequest {
  email: string;
  password: string;
  username: string;
  name: string;
  lastname: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ChangePasswordRequest {
  email: string;
  password: string;
  newPassword: string;
}

export interface CreatePostRequest {
  userId: string;
  location: string;
  contents: string[];
  title: string;
}

export interface LoginResponse {
  id: string;
  username: string;
  name: string;
  lastname: string;
  level: number;
  access_token: string;
  refresh_token: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  name: string;
  lastname: string;
  level: number;
  profileImage: string;
  coverImage: string;
  description: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
  gender: Gender;
}
export interface UserSettingsResponse {
  language: string;
  theme: string;
}
export enum language {
  SPANISH,
  ENGLISH,
}
export enum theme {
  DARK = "DARK",
  LIGHT = "lih",
}
export enum Gender {
  WOMAN,
  MEN,
  NON_BINARY,
  PREFER_NOT_TO_ANSWER,
}
export enum EmailType {
  CONFIRMATION,
  RECOVERY,
}

export interface UserShort {
  id: string;
  email: string;
  username: string;
  name: string;
  lastname: string;
  level: number;
  profileImage: string | null;
  active: boolean;
}

export interface Post {
  id: string;
  author: UserShort;
  createdAt: string;
  location: string;
  title: string;
  likesCount: number;
  commentsCount: number;
  contents: string[];
  likes: string[];
  isLikedByUser: boolean;
  isAd: boolean;
}

export interface Ads {
  companyName: string;
  dateStart: string;
  dateEnd: string;
  siteUrl: string;
  contents: string[];
}
export interface commentType1 {
  id: string;
  author: UserComment;
  content: string;
  createAt: string;
}
export interface UserComment {
  id: string;
  name: string | null;
  lastname: string | null;
  nickname: string | null;
  level: number;
  profileImage: string | null;
  active: boolean;
}

export interface PageParams {
  offset: number;
  limit: number;
}
