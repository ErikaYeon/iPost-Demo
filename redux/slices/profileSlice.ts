import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  username: '',
  password: '',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action) => {
      const { email, username, password } = action.payload;
      state.email = email;
      state.username = username;
      state.password = password;
    },
    clearProfile: (state) => {
      state.email = '';
      state.username = '';
      state.password = '';
    },
  },
});

// Exportar las acciones
export const { setProfile, clearProfile } = profileSlice.actions;

// Exportar el reducer
export default profileSlice.reducer;
