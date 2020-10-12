import { ofType } from "redux-observable";
import {
  errorLoadingFirebase,
  completeLoadingFirebase,
  startLoadingFirebase,
} from "./actions";
import { catchError, flatMap, switchMap, tap } from "rxjs/operators";
import { CONFIG, lazyLoadFireBase } from "./config";
import { concat, empty, of } from "rxjs";
import { startAuthListener } from "../auth/actions";

export const startLoadingFirebaseEpic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType(startLoadingFirebase.type),
    flatMap(() => {
      return lazyLoadFireBase(CONFIG);
    }),
    tap((app) => {
      firebase.next(app);
    }),
    switchMap(() =>
      concat(of(completeLoadingFirebase()), of(startAuthListener()))
    ),
    catchError((error) => errorLoadingFirebase(error))
  );
