import { Middleware } from "@reduxjs/toolkit";
import { logout } from "./authSlice";

export const apiMiddleware: Middleware = (store) => {
  let logoutTriggered = false;

  return (next) => (action) => {
    const state = store.getState();
    
    if (state.auth.tokenExpire) {
      const expirationDate = new Date(state.auth.tokenExpire);
      
      if (expirationDate < new Date() && !logoutTriggered) {
        logoutTriggered = true; 
        setTimeout(() => {
          store.dispatch(logout());
          logoutTriggered = false; 
        }, 0);
      }
    }

    return next(action);
  };
};
