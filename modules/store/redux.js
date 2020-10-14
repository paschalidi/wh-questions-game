import {
    configureStore as toolkitConfigureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { startLoadingFirebaseEpic } from './firebase/epics'
import { firebaseReducer } from './firebase/reducer'
import { authReducer } from './auth/reducer'
import { gameReducer } from './game/reducer'
import { firebaseApp$ } from './firebase/config'
import { startAuthListenerEpic } from './auth/epics'
import { userLoginStartEpic } from './loginWithGoogle/epics'
import { gameEpic } from './game/epics'

const rootEpic = combineEpics(
    startLoadingFirebaseEpic,
    startAuthListenerEpic,
    userLoginStartEpic,
    gameEpic
)

const rootReducer = combineReducers({
    firebaseReducer,
    authReducer,
    gameReducer,
})

const epicMiddleware = createEpicMiddleware({
    dependencies: { firebase: firebaseApp$ },
})

const store = toolkitConfigureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(epicMiddleware),
    devTools: true,
})

// this line needs to be executed after the configuration of the store.
epicMiddleware.run(rootEpic)

export { store }
