import {
    configureStore as toolkitConfigureStore,
    combineReducers,
} from '@reduxjs/toolkit'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { authReducer } from './auth/reducer'
import { gameReducer } from './game/reducer'
import { questionsReducer } from './questions/reducer'

import { startLoadingFirebaseEpic } from './firebase/epics'
import { startAuthListenerEpic } from './auth/epics'
import { userLoginEpic, userLogoutEpic } from './loginWithGoogle/epics'
import {
    fetchExistingQuestionsEpic,
    addNewQuestionsEpic,
} from './questions/epics'
import { gameEpic, openModalEpic, closeModalEpic } from './game/epics'
import { firebase$ } from './firebase/config'

const rootEpic = combineEpics(
    startLoadingFirebaseEpic,
    startAuthListenerEpic,
    userLoginEpic,
    userLogoutEpic,
    gameEpic,
    openModalEpic,
    closeModalEpic,
    fetchExistingQuestionsEpic,
    addNewQuestionsEpic
)

const rootReducer = combineReducers({
    authReducer,
    gameReducer,
    questionsReducer,
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
