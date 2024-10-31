import { createSlice } from '@reduxjs/toolkit';

// interface CreatePostState {
//     postContent: string;
//     selectedImages: string[];
//     location: string;
//   }

const initialState = {
  postContent: '',
  location: '',
  selectedImages: [],
};

const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setPostContent(state, action) {
      state.postContent = action.payload;
    },
    setLocation(state, action) {
      state.location = action.payload;
    },
    setSelectedImages(state, action) {
      state.selectedImages = action.payload;
    },
    setAllPostData(state, action) { // Acción para establecer todos los datos al mismo tiempo
        const { postContent, location, selectedImages } = action.payload;
        state.postContent = postContent;
        state.location = location;
        state.selectedImages = selectedImages;
      },
    clearPost(state) {
      state.postContent = '';
      state.location = '';
      state.selectedImages = [];
    },
  },
});

// Exportar las acciones
export const { setPostContent, setLocation, setSelectedImages, clearPost, setAllPostData } = createPostSlice.actions;

// Definir y exportar los selectores como "getters"
export const selectPostContent = (state) => state.createPost.postContent;
// export const selectLocation = (state) => state.createPost.location;
// export const selectSelectedImages = (state) => state.createPost.selectedImages;

export default createPostSlice.reducer;
