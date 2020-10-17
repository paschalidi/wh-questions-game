import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import {
    loginUser,
    loginUserComplete,
    loginUserError,
    logoutUser,
    logoutUserComplete,
    logoutUserError,
} from './actions'
import { catchError, flatMap, ignoreElements, map } from 'rxjs/operators'
import { createObservableFromFirebase } from '../utils/createObservableFromFirebase'
import firebase from 'firebase/app'

export const userLoginEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(loginUser),
        flatMap(() => {
            const provider = new firebase.auth.GoogleAuthProvider()

            return createObservableFromFirebase(
                firebase$.auth().signInWithPopup(provider)
            ).pipe(
                map(() => loginUserComplete()),
                catchError(err => of(loginUserError(err)))
            )
        })
    )

export const userLogoutEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(logoutUser),
        flatMap(() => {
            return createObservableFromFirebase(
                firebase$.auth().signOut()
            ).pipe(
                map(() => logoutUserComplete()),
                catchError(err => of(logoutUserError(err)))
            )
        }),
        ignoreElements()
    )
