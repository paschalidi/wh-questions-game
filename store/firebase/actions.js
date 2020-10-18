import { createAction } from '@reduxjs/toolkit'

export const loadingFirebaseError = createAction(
    '[firebase] error loading firebase'
)
export const loadingFirebaseCompleted = createAction(
    '[firebase]complete loading firebase'
)
