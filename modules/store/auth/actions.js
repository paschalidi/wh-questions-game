import { createAction } from "@reduxjs/toolkit";

export const startAuthListener = createAction("[auth] start auth listener");
export const setAuthenticated = createAction("[auth] set authenticated user");
export const setUnauthenticated = createAction(
  "[auth] set unauthenticated user"
);
export const setUserUpdate = createAction("[auth] set user updat");
