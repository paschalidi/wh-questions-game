import { ofType } from 'redux-observable'
import {
    errorLoadingFirebase,
    completeLoadingFirebase,
    startLoadingFirebase,
} from './actions'
import { catchError, flatMap, switchMap, tap } from 'rxjs/operators'
import { lazyLoadFireBase } from './config'
import { concat, of } from 'rxjs'
import { startAuthListener } from '../auth/actions'

export const startLoadingFirebaseEpic = (action$, state$, { firebase }) =>
    action$.pipe(
        ofType(startLoadingFirebase),
        flatMap(() => lazyLoadFireBase()),
        tap(app => {
            firebase.next(app)
        }),
        switchMap(() =>
            concat(of(completeLoadingFirebase()), of(startAuthListener()))
        ),
        catchError(error => errorLoadingFirebase(error))
    )
