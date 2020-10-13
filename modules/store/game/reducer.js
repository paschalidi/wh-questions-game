import { createAction, createReducer, current } from "@reduxjs/toolkit";

export const pawnMovement = createAction("[pawn] moves one step");

export const players = {
  0: "ONE",
  1: "TWO",
};
const initialState = {
  totalNumberOfPlayers: 2,
  currentPlayerIndex: 0,
  gameContinues: true,
  allPlayers: {
    ONE: { steps: 0, lastStepSize: 0 },
    TWO: { steps: 0, lastStepSize: 0 },
  },
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder.addCase(pawnMovement, (state, { payload: { nextPlayerTurn } }) => {
    const currentPlayerId = players[state.currentPlayerIndex];

    state.allPlayers[currentPlayerId].steps++;

    state.gameContinues = Object.values(state.allPlayers).some(
      ({ steps }) => steps < 19
    );

    // deriving the next player
    if (nextPlayerTurn) {
      // if (state.currentPlayerIndex + 1 > state.totalNumberOfPlayers) {
      //   // todo
      //   // slice the Object.values(state.allPlayers) from the index you are at and move the ones before this in the end of the array.
      //   // then do the check to find out whether game continues or not.
      //   state.currentPlayerIndex = 1;
      // }
      // state.currentPlayerIndex = state.currentPlayerIndex + 1;
      state.currentPlayerIndex =
        state.currentPlayerIndex + 2 > state.totalNumberOfPlayers
          ? 0
          : state.currentPlayerIndex + 1;
    }
  });
});
