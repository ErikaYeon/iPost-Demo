
import { createSlice, PayloadAction,  createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api';

interface LoginResponse{
    email: string;
    password: string;
    username:string;
    id: string;
    access_token: string;
    refresh_token: string;
  }
interface InitialProfiledata {
    email: string;
    password: string;
    username:string;
  }

const initialState : LoginResponse = {
    access_token: '',
    refresh_token: '',
    id: '',
    email: '',
    password:'',
    username: '',
};

  export const signup = createAsyncThunk(
    'profile/signup',
    async (userData, { rejectWithValue }) => {
      try {
        const response = await api.post('/api/accounts/signup', userData);
        
        // Verifica si la respuesta es exitosa
        // console.log(JSON.stringify(response,null,4))
        if (response.status === 200) {
          console.log('funciona nuevo'+response.status)
          console.log('funciona nuevo'+response.data)
          console.log('funciona nuevo'+'llamada bien')
          return response.data
        
        } else {
          console.log('no funciona nuevo'+'llamada mal')
          
        }
      } catch (error) {
        
        return  rejectWithValue(
          error
        );
      }
    }
  );
  
  export const loginUser = createAsyncThunk(
    'profile/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await api.post('/api/accounts/login', { email, password });
        console.log(response.data)
        setToken(response.data.access_token)
        console.log('ACCES TOKEN'+ response.data.access_token)
        
        return response.data as LoginResponse;
      } catch (error: any) {
        console.log(error)
        return rejectWithValue('Algo salió mal, inténtelo nuevamente');
      }
    }
  );
  export const fetchUserInfo = createAsyncThunk(
    'profile/fetchUserInfo',
    async (userId: string, { rejectWithValue }) => {
      try {
        const response = await api.get(`/api/users/${userId}`);
        console.log('funciona fetch data')
        console.log(response.data);
        
        return response.data; // Return the response data
      } catch (error: any) {
        console.error('Fetch user info failed:', error);
        return rejectWithValue('Failed to fetch user info');
      }
    }
  );
  const authSlice = createSlice({
    name: 'auth',
    initialState,
  reducers: {
    setToken: (state, action) => {
      state.access_token = action.payload;
    },
    setProfile: (state, action: PayloadAction<InitialProfiledata>) => {
        const { email,  password, username } = action.payload;
        state.email = email;
        state.password = password;
        state.username = username;  //A CHECKEAR SI ESTO VA ACA
  
      },
      setRegisterData: (state, action: PayloadAction<InitialProfiledata>) => {
        const { email,  password, username } = action.payload;
        state.email = email;
        state.password = password;
        state.username = username;  //A CHECKEAR SI ESTO VA ACA
  
      },
    clearToken: (state) => {
      state.access_token = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        const { email, username, name, lastname } = action.payload;
        state.email = email;
        state.username = username;
        // state.name = name;
        // state.lastname = lastname;
      })
      .addCase(signup.rejected, (state, action) => {
        console.error('Signup failed:', action.payload);
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { id, access_token, refresh_token } = action.payload;
        state.access_token = access_token;
        state.refresh_token = refresh_token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error('Login failed:', action.payload);
      })
      .addCase(fetchUserInfo.fulfilled, (state, action) => {
        const { username, email, name, lastname, profileImage } = action.payload;
        state.username = username;
        state.email = email;
        // state.name = name;
        // state.lastname = lastname;
       
      })
      .addCase(fetchUserInfo.rejected, (state, action) => {
        console.error('Fetch user info failed:', action.payload);
      });
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
