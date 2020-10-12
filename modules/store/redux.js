import {
  configureStore as toolkitConfigureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { createEpicMiddleware, combineEpics } from "redux-observable";
import { startLoadingFirebaseEpic } from "./firebase/epics";
import { firebaseReducer } from "./firebase/reducer";
import { authReducer } from "./auth/reducer";
import { firebaseApp$ } from "./firebase/config";
import { startAuthListenerEpic } from "./auth/epics";
import { userLoginStartEpic } from "./loginWithGoogle/epics";

const rootEpic = combineEpics(
  startLoadingFirebaseEpic,
  startAuthListenerEpic,
  userLoginStartEpic
);

const rootReducer = combineReducers({
  firebaseReducer,
  authReducer,
});

const [
  ,
  immutableStateInvariant,
  serializableStateInvariant,
] = getDefaultMiddleware();

const epicMiddleware = createEpicMiddleware({
  dependencies: { firebase: firebaseApp$ },
});

const middleware = [
  immutableStateInvariant,
  serializableStateInvariant,
  epicMiddleware,
];

const store = toolkitConfigureStore({
  reducer: rootReducer,
  middleware,
  devTools: true,
});

// this line needs to be executed after the configuration of the store.
epicMiddleware.run(rootEpic);

export { store };
