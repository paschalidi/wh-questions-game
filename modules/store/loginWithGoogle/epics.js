import { ofType } from 'redux-observable'
import { of } from 'rxjs'
import { userLoginStart, userLoginComplete, userLoginError } from './actions'
import { catchError, flatMap, map } from 'rxjs/operators'
import { createObservableFromFirebase } from '../utils/createObservableFromFirebase'
import firebase from 'firebase/app'

export const userLoginStartEpic = (action$, state$, { firebase$ }) =>
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
