import {
    startLoadingFirebase,
    completeLoadingFirebase,
    errorLoadingFirebase,
} from './actions'

import { createReducer } from '@reduxjs/toolkit'

export const firebaseReducer = createReducer(
    {
        firebaseStatus: 'LOADING',
        error: '',
    },
    builder => {
        builder
            .addCase(startLoadingFirebase, (state, action) => {
                state.firebaseStatus = 'LOADING'
            })
            .addCase(completeLoadingFirebase, (state, action) => {
                state.firebaseStatus = 'COMPLETED'
            })
            .addCase(errorLoadingFirebase, (state, { payload: { error } }) => {
                state.firebaseStatus = 'ERROR'
                state.error = error
            })
    }
)
