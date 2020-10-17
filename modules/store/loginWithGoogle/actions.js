import { createAction } from '@reduxjs/toolkit'

export const loginUser = createAction('[login] start')
export const loginUserError = createAction('[login] error')
export const loginUserComplete = createAction('[login] complete')

export const logoutUser = createAction('[logout] start')
export const logoutUserError = createAction('[logout] error')
export const logoutUserComplete = createAction('[logout] complete')
