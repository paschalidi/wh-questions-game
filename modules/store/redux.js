import {
    configureStore as toolkitConfigureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { authReducer } from './auth/reducer'
import { gameReducer } from './game/reducer'
import { startLoadingFirebaseEpic } from './firebase/epics'
import { startAuthListenerEpic } from './auth/epics'
import { userLoginStartEpic } from './loginWithGoogle/epics'
import { gameEpic, openModalEpic,closeModalEpic } from './game/epics'
import { firebase$ } from './firebase/config'

const rootEpic = combineEpics(
    startLoadingFirebaseEpic,
    startAuthListenerEpic,
    userLoginStartEpic,
    gameEpic,
    openModalEpic,
    closeModalEpic
)

const rootReducer = combineReducers({
    authReducer,
    gameReducer,
})

const epicMiddleware = createEpicMiddleware({
    dependencies: { firebase$ },
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
