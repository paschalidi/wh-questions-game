import { setAuthenticated, setUnauthenticated } from "./actions";
import { createReducer } from "@reduxjs/toolkit";

export const authStatuses = {
  LOGGED_IN: "LOGGED_IN",
  NOT_LOGGED_IN: "NOT_LOGGED_IN",
  LOADING: "LOADING",
};
export const authReducer = createReducer(
  {
    profileLoaded: false,
    user: {
      uid: null,
      displayName: "",
    },
    authStatus: "LOADING",
  },
  (builder) => {
    builder
      .addCase(setAuthenticated, (state, { payload: { displayName, uid } }) => {
        state.authStatus = authStatuses.LOGGED_IN;
        state.user.uid = uid;
        state.user.displayName = displayName;
      })
      .addCase(setUnauthenticated, (state) => {
        state.authStatus = authStatuses.NOT_LOGGED_IN;
        state.user = {};
        state.profileLoaded = true;
      });
  }
);
