import { createAction, createReducer } from "@reduxjs/toolkit";

export const startGame = createAction("[game] store players and start game");
export const startPawnMovement = createAction("[game] start movement");
export const pawnMovement = createAction("[game] pawn moves one step");
export const disableRoll = createAction("[game] disable dice");
export const resetGame = createAction("[game] reset");
export const gameOver = createAction("[game] game over");

export const players = {
  0: "ONE",
  1: "TWO",
  2: "THREE",
  3: "FOUR",
  4: "FIVE",
  5: "SIX",
};

export const gameStatuses = {
  NEUTRAL: "NEUTRAL",
  PLAYER_IS_MOVING: "PLAYER_IS_MOVING",
  GAME_IS_OVER: "GAME_IS_OVER",
};

const initialState = {
  allPlayers: {},
  status: gameStatuses.NEUTRAL,
  totalNumberOfPlayers: 2,
  currentPlayerIndex: 0,
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder.addCase(startGame, (state, { payload: selectedPlayers }) => {
    const allPlayers = Object.values(selectedPlayers).reduce(
      (acc, { name, id, icon }) => {
        if (id) {
          return {
            ...acc,
            [players[id]]: {
              steps: 0,
              lastStepSize: 0,
              playerId: id,
              icon,
              name,
            },
          };
        }
        return acc;
      },
      {}
    );
    state.allPlayers = allPlayers;
  });
  builder.addCase(
    pawnMovement,
    (state, { payload: { nextPlayerTurn, nextPlayerIndex } }) => {
      const currentPlayerId = players[state.currentPlayerIndex];
      state.allPlayers[currentPlayerId].steps++;
      state.status = gameStatuses.PLAYER_IS_MOVING;

      // in the last action of the batch we change player
      if (nextPlayerTurn) {
        state.currentPlayerIndex = nextPlayerIndex;
        state.status = gameStatuses.NEUTRAL;
      }
    }
  );
  builder.addCase(disableRoll, (state) => {
    state.status = gameStatuses.PLAYER_IS_MOVING;
  });
  builder.addCase(gameOver, (state) => {
    state.status = gameStatuses.GAME_IS_OVER;
  });
  builder.addCase(resetGame, (state) => {
    state.status = gameStatuses.NEUTRAL;
    state.totalNumberOfPlayers = initialState.totalNumberOfPlayers;
    state.currentPlayerIndex = initialState.currentPlayerIndex;
    state.allPlayers = initialState.allPlayers;
  });
});
