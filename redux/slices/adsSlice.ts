import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Post, Ads, UserShort } from "@/types/apiContracts";
import { getAdvertising } from "@/networking/postService";
import Placeholders from "@/constants/ProfilePlaceholders";

// Thunk asincrónico para obtener los anuncios
export const fetchAds = createAsyncThunk("posts/getAdvertising", async () => {
  const ads = await getAdvertising();
  return ads;
});

interface AdsState {
  ads: Ads[];
  postsFromAds: Post[];
  status: "idle" | "loading" | "succeeded" | "failed";
}
const convertAdToPost = (ad: Ads, generateId: () => string): Post => ({
  id: generateId(),
  author: {
    id: generateId(),
    email: " ",
    username: ad.companyName,
    name: ad.companyName,
    lastname: ad.companyName,
    level: 1,
    profileImage: Placeholders.DEFAULT_PROFILE_PHOTO,
    active: true,
  },
  createdAt: new Date(ad.dateEnd).toISOString(),
  location: "Promoción valida hasta:",
  title: ad.siteUrl,
  likesCount: 0,
  commentsCount: 0,
  contents: ad.contents,
  likes: [],
  isLikedByUser: false,
  isAd: true,
});

const initialState: AdsState = {
  ads: [],
  postsFromAds: [],
  status: "idle",
};

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    fillPostsFromAds: (state) => {
      state.postsFromAds = state.ads.map((ad) =>
        convertAdToPost(ad, generateId)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.ads = action.payload;
        state.postsFromAds = state.ads.map((ad) =>
          convertAdToPost(ad, generateId)
        );
      })
      .addCase(fetchAds.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default adsSlice.reducer;
export const { fillPostsFromAds } = adsSlice.actions;

const generateId = () => {
  return Math.random().toString(36).substr(2, 9); // Método simple para generar ID aleatorio
};
