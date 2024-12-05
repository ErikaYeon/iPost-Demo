import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post as Structure } from "@/types/apiContracts";
import APIConstants from "@/constants/APIConstants";

interface TimelineState {
  LocalListPosts: Structure[];
}

const initialState: TimelineState = {
  LocalListPosts: [], // Lista vacía de posts
};
const timelineSlice = createSlice({
  name: "timeline",
  initialState,
  reducers: {
    // Reducer para agregar un solo post
    addPost(state, action: PayloadAction<Structure>) {
      state.LocalListPosts.unshift(action.payload);
    },
    addPostsReload(
      state,
      action: PayloadAction<{
        newPosts: Structure[];
        postsFromAds: Structure[];
      }>
    ) {
      const { newPosts, postsFromAds } = action.payload;

      const cantAds: number = newPosts.length % APIConstants.ADS_BETWEEN_COUNT;
      const postsWithAds = [];

      if (cantAds > 0) {
        const randomIndex = Math.floor(Math.random() * postsFromAds.length);

        for (let i = 0; i < newPosts.length; i++) {
          postsWithAds.push(newPosts[i]);
          if (
            (i + 1) % APIConstants.ADS_BETWEEN_COUNT === 0 &&
            postsFromAds.length > 0
          ) {
            postsWithAds.push(postsFromAds[randomIndex]);
          }
        }
      } else {
        postsWithAds.push(...newPosts);
      }

      state.LocalListPosts.unshift(...postsWithAds);
    },
    addPosts(
      state,
      action: PayloadAction<{
        newPosts: Structure[];
        postsFromAds: Structure[];
      }>
    ) {
      //   state.LocalListPosts = [...state.LocalListPosts, ...action.payload];

      const { newPosts, postsFromAds } = action.payload;

      newPosts.forEach((post, index) => {
        state.LocalListPosts.push(post); // Agregar el post local

        // Cada vez que agregas 5 posts locales, agrega uno de la lista de Ads
        if (
          state.LocalListPosts.length % APIConstants.ADS_BETWEEN_COUNT === 0 &&
          postsFromAds.length > 0
        ) {
          const randomIndex = Math.floor(Math.random() * postsFromAds.length); // Seleccionar un índice aleatorio
          state.LocalListPosts.push(postsFromAds[randomIndex]); // Insertar el post aleatorio
        }
      });
    },
    resetPosts(state) {
      state.LocalListPosts = [];
    },
  },
});

export const { addPost, addPosts, resetPosts, addPostsReload } =
  timelineSlice.actions;
export default timelineSlice.reducer;
