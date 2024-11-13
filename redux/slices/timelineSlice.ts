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
      state.LocalListPosts.unshift(action.payload); // Agrega el nuevo post al inicio de la lista
    },
    // Reducer para agregar múltiples posts
    addPosts(state, action: PayloadAction<Structure[]>) {
      state.LocalListPosts = [...state.LocalListPosts, ...action.payload]; // Agrega más posts al final de la lista existente
    },
    // Reducer para resetear la lista de posts si fuera necesario
    resetPosts(state) {
      state.LocalListPosts = [];
    },
  },
});

export const { addPost, addPosts, resetPosts } = timelineSlice.actions;
export default timelineSlice.reducer;
