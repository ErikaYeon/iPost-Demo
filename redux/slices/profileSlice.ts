import { createSlice , PayloadAction } from '@reduxjs/toolkit';


interface ProfileState {
  email: string;
  password: string;
  username: string;
  name: string;
  profilePictureUrl : string;
  isVip: boolean,
  crownType: string,

  
}
interface PartialProfileState{
  email: string;
  password: string;
  username: string;
}
const initialState : ProfileState = {
  email: '',
  username: '',
  password: '',
  name: 'Ipost',
  profilePictureUrl: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  isVip: false,
  crownType: 'silver',
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<PartialProfileState>) => {
      const { email, username, password } = action.payload;
      state.email = email;
      state.password = password;
      state.username = username;  //A CHECKEAR SI ESTO VA ACA

    },
    setProfileExtraData:(state,action:PayloadAction<ProfileState>)=>{
      const{username,name, profilePictureUrl, isVip, crownType} = action.payload;   //ACA EN EL FETCH VOY A AGREGAR FOTO,ISVIP Y LA CORONA
      state.username = username;
      state.name = name;
      state.profilePictureUrl = profilePictureUrl;
      state.isVip = isVip;
      state.crownType = crownType;




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
