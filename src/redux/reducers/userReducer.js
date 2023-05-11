import { createReducer } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, {
  loginRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  loginSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.result;
    localStorage.setItem("isAuthenticated", true);
  },
  loginFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = true;
  },

  logoutRequest: (state) => {
    state.loading = true;
  },
  logoutSuccess: (state) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.user = null;
  },
  logoutFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  
  registerRequest: (state) => {
    state.loading = true;
    state.isAuthenticated = false;
  },
  registerSuccess: (state, action) => {
    state.loading = false;
    state.isAuthenticated = true;
    state.user = action.payload.result;
    localStorage.setItem("isAuthenticated", true);
  },
  registerFail: (state, action) => {
    state.loading = false;
    state.isAuthenticated = false;
    state.error = true;
  },
  
  clearError: (state) => {
    state.error = null;
  },
});