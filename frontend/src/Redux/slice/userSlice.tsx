import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";
import InfoUser from "../../models/infoUser";


const token = window.localStorage.getItem('token');
let initialState = {};


if (token) {
  const user: InfoUser = jwtDecode(token);
  initialState = user;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {

    login: (state, action) => {
      const user: InfoUser = jwtDecode(action.payload);
      state = user;
      window.localStorage.setItem('token', action.payload);
      return state;
    },
    logout: (state) => {
      state = {};
      window.localStorage.removeItem('token');
      return state;
    }
  }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;