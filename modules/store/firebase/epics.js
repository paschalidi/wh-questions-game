import { ofType } from 'redux-observable'
import { loadingFirebaseCompleted, loadingFirebaseError } from './actions'
import { catchError, switchMap } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { startAuthListener } from '../auth/actions'

export const startLoadingFirebaseEpic = action$ =>
    action$.pipe(
        ofType(loadingFirebaseCompleted),
        switchMap(() => concat(of(startAuthListener()))),
        catchError(error => of(loadingFirebaseError(error)))
    )
