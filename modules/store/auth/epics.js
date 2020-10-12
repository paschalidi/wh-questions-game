import { ofType } from "redux-observable";

import { combineLatest } from "rxjs";
import {
  setAuthenticated,
  setUnauthenticated,
  startAuthListener,
} from "./actions";
import { map, flatMap } from "rxjs/operators";
import { authState } from "rxfire/auth";

export const startAuthListenerEpic = (action$, state$, { firebase }) =>
  action$.pipe(
    ofType(startAuthListener.type),
    flatMap(() => combineLatest(firebase)),
    flatMap(([app]) => {
      return authState(app.auth()).pipe(
        map((user) => {
          if (user) {
            return setAuthenticated(user);
          } else {
            return setUnauthenticated();
          }
        })
      );
    })
  );
