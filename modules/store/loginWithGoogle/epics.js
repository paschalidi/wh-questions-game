import { ofType } from "redux-observable";
import { combineLatest, from, of } from "rxjs";
import { userLoginStart, userLoginComplete, userLoginError } from "./actions";
import { catchError, flatMap, map } from "rxjs/operators";
import { createObservableFromFirebase } from "../utils/createObservableFromFirebase";
import firebase from "firebase/app";

export const userLoginStartEpic = (action$, state$, { firebase: firebase$ }) =>
  action$.pipe(
    ofType(userLoginStart),
    flatMap((action) => combineLatest(firebase$)),
    flatMap(([app]) => {
      const provider = new firebase.auth.GoogleAuthProvider();

      return createObservableFromFirebase(
        app.auth().signInWithPopup(provider)
      ).pipe(
        map(() => userLoginComplete()),
        catchError((err) => of(userLoginError(err)))
      );
    })
  );
