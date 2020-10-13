import { ofType } from "redux-observable";
import { concatMap, delay, flatMap, map, pluck } from "rxjs/operators";
import { gameOver, pawnMovement, startPawnMovement } from "./reducer";
import { of, range } from "rxjs";

const deriveNextPlayerIndex = (currentPlayerIndex, allPlayers) => {
  const listOfPlayers = Object.values(allPlayers);
  const firstHalf = listOfPlayers.splice(0, currentPlayerIndex + 1);
  const secondHalf = listOfPlayers.splice(-(currentPlayerIndex + 1));
  const allPlayersSorted = [...secondHalf, ...firstHalf];

  const { index } = allPlayersSorted.find(({ steps }) => steps < 19) || {};
  return index;
};

const deriveGameOver = (allPlayers) =>
  !Boolean(Object.values(allPlayers).some(({ steps }) => steps < 19));
export const gameEpic = (action$, state$) =>
  action$.pipe(
    ofType(startPawnMovement),
    pluck("payload"),
    flatMap(({ roll }) =>
      range(0, roll).pipe(
        concatMap((i) => of(i).pipe(delay(400))),
        map((item) => {
          const { allPlayers, currentPlayerIndex } = state$.value.gameReducer;

          if (deriveGameOver(allPlayers)) {
            return gameOver();
          }

          const nextPlayerTurn = roll === item + 1;
          const nextPlayerIndex = nextPlayerTurn
            ? deriveNextPlayerIndex(currentPlayerIndex, allPlayers)
            : currentPlayerIndex;

          return pawnMovement({ nextPlayerTurn, nextPlayerIndex });
        })
        // startWith(disableRoll())
      )
    )
  );
