import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: '',
    id: '',
    token: '',
  },
  reducers: {
    login(state, action) {
      state.isLogged = action.payload.isLogged;
      state.email = action.payload.email;
      state.id = action.payload.id;
      state.token = action.payload.token;
    },
    logout() {
      return {
        isLogged: false,
        email: '',
        id: '',
        token: '',
      };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
