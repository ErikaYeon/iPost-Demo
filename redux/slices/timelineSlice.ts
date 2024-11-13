import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Post as Structure } from '@/types/apiContracts';

interface TimelineState {
  LocalListPosts: Structure[];
}

const initialState: TimelineState = {
    LocalListPosts: [], // Lista vacía de posts
};
const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    // Reducer para agregar un solo post
    addPost(state, action: PayloadAction<Structure>) {
      state.LocalListPosts.unshift(action.payload);
    },
    addPosts(state, action: PayloadAction<{ newPosts: Structure[]; postsFromAds: Structure[] }>) {
    //   state.LocalListPosts = [...state.LocalListPosts, ...action.payload]; 
    
    const { newPosts, postsFromAds } = action.payload;
    
    newPosts.forEach((post, index) => {
        state.LocalListPosts.push(post); // Agregar el post local
    
        // Cada vez que agregas 5 posts locales, agrega uno de la lista de Ads
        if ((state.LocalListPosts.length) % 5 === 0 && postsFromAds.length > 0) {
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

export const { addPost, addPosts, resetPosts } = timelineSlice.actions;
export default timelineSlice.reducer;
