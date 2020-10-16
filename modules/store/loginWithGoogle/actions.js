import { createAction } from '@reduxjs/toolkit'

export const userLoginStart = createAction('[login] start')
export const userLoginError = createAction('[login] error')
export const userLoginComplete = createAction('[login] complete')

export const userLogoutStart = createAction('[logout] start')
export const userLogoutError = createAction('[logout] error')
export const userLogoutComplete = createAction('[logout] complete')
