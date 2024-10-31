import { createSlice , PayloadAction } from '@reduxjs/toolkit';

interface CreatePostState {
    postContent: string;
    selectedImages: string[];
    location: string;
  }

  const initialState: CreatePostState = {
  postContent: '',
  location: '',
  selectedImages:[],
};

const createPostSlice = createSlice({
  name: 'createPost',
  initialState,
  reducers: {
    setPostContent(state, action: PayloadAction<string>) {
      state.postContent = action.payload;
    },
    setLocation(state, action: PayloadAction<string>) {
      state.location = action.payload;
    },
    setSelectedImages(state, action: PayloadAction<string[]>) {
      state.selectedImages = action.payload;
    },
    setAllPostData(state, action: PayloadAction<CreatePostState>) { // Acción para establecer todos los datos al mismo tiempo
        const { postContent, selectedImages, location } = action.payload;
      state.postContent = postContent;
      state.selectedImages = selectedImages;
      state.location = location;
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
// export const selectPostContent = (state) => state.createPost.postContent;
// export const selectLocation = (state) => state.createPost.location;
// export const selectSelectedImages = (state) => state.createPost.selectedImages;

export default createPostSlice.reducer;
