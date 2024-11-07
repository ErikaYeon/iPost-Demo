import { createSlice , PayloadAction } from '@reduxjs/toolkit';

interface CreatePostState {
    postContent: string;
    selectedImages: string[];
    location: string;
    likes: number,
    comments: number,
    commentSection: [],
    date: string,
}
interface PartialPostData {
  postContent: string;
  selectedImages: string[];
  location: string;
  date: string;
}

  const initialState: CreatePostState = {
  postContent: '',
  location: '',
  selectedImages:[],
  likes:0,
  comments:0,
  commentSection: [],
  date: '',
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
    setDate(state, action: PayloadAction<string>){
      state.date = action.payload;
    },
    setLike: (state, action: PayloadAction<number>) => {
      state.likes = action.payload;
    },
    setAllPostData(state, action: PayloadAction<PartialPostData>) { // Acción para establecer todos los datos al mismo tiempo
        const { postContent, selectedImages, location, date} = action.payload;
      state.postContent = postContent;
      state.selectedImages = selectedImages;
      state.location = location;
      state.date = date;
      },
    clearPost(state) {
      state.postContent = '';
      state.location = '';
      state.selectedImages = [];
    },
  },
});

// Exportar las acciones
export const { setPostContent, setLocation, setSelectedImages, clearPost, setAllPostData, setDate, setLike } = createPostSlice.actions;

// Definir y exportar los selectores como "getters"
// export const selectPostContent = (state) => state.createPost.postContent;
// export const selectLocation = (state) => state.createPost.location;
// export const selectSelectedImages = (state) => state.createPost.selectedImages;

export default createPostSlice.reducer;
