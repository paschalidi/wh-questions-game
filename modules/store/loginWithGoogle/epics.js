import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import {
    userLoginStart,
    userLoginComplete,
    userLoginError,
    userLogoutStart,
    userLogoutComplete,
    userLogoutError,
} from './actions'
import { catchError, flatMap, ignoreElements, map } from 'rxjs/operators'
import { createObservableFromFirebase } from '../utils/createObservableFromFirebase'
import firebase from 'firebase/app'

export const userLoginEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(userLoginStart),
        flatMap(() => {
            const provider = new firebase.auth.GoogleAuthProvider()

            return createObservableFromFirebase(
                firebase$.auth().signInWithPopup(provider)
            ).pipe(
                map(() => userLoginComplete()),
                catchError(err => of(userLoginError(err)))
            )
        })
    )

export const userLogoutEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(userLogoutStart),
        flatMap(() => {
            return createObservableFromFirebase(
                firebase$.auth().signOut()
            ).pipe(
                map(() => userLogoutComplete()),
                catchError(err => of(userLogoutError(err)))
            )
        }),
        ignoreElements()
    )
