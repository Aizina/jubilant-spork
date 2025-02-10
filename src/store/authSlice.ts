import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  tokenExpire: string | null; 
  loading: boolean;
  error: string | null;
}

const loadState = (): AuthState => {
  const token = localStorage.getItem("accessToken") || sessionStorage.getItem("accessToken");
  const tokenExpire = localStorage.getItem("tokenExpire") || sessionStorage.getItem("tokenExpire");

  return {
    isAuthenticated: !!token,
    token: token || null,
    tokenExpire: tokenExpire || null, 
    loading: false,
    error: null,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadState(),
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string; expire: string }>) {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.tokenExpire = action.payload.expire; 
      state.loading = false;
      state.error = null;

      localStorage.setItem("accessToken", action.payload.token);
      localStorage.setItem("tokenExpire", action.payload.expire);
      sessionStorage.setItem("accessToken", action.payload.token);
      sessionStorage.setItem("tokenExpire", action.payload.expire);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.tokenExpire = null;
      state.error = null;

      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpire");
      sessionStorage.removeItem("accessToken");
      sessionStorage.removeItem("tokenExpire");
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
