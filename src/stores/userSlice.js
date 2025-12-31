import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogged: false,
    email: '',
    id:''
  },
  reducers: {
    login(state, action) {
      state.isLogged = action.payload.isLogged;
      state.email = action.payload.email;
      state.id = action.payload.id;
    },
    logout(state) {
      state = {};
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
