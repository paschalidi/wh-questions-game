import { createAction } from '@reduxjs/toolkit'

export const startAuthListener = createAction(
    '[auth] start listening for authentication'
)

export const setAuthenticated = createAction(
    '[auth] setting authenticated user'
)
export const setAuthenticatedError = createAction(
    '[auth] setting authenticated error'
)
export const setAuthenticatedLoading = createAction(
    '[auth] setting authenticated loading'
)
export const setUnauthenticated = createAction(
    '[auth] setting unauthenticated user'
)
