import { createAction } from '@reduxjs/toolkit'

export const userLoginStart = createAction('[user login] start')
export const userLoginError = createAction('[user login] error')
export const userLoginComplete = createAction('[user login complete]')

export const userLogoutStart = createAction('[user logout] start')
