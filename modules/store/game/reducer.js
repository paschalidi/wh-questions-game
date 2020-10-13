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
    ONE: { steps: 0, lastStepSize: 0, index: 0 },
    TWO: { steps: 0, lastStepSize: 0, index: 1 },
  },
};

export const gameReducer = createReducer(initialState, (builder) => {
  builder.addCase(pawnMovement, (state, { payload: { nextPlayerTurn } }) => {
    const currentPlayerId = players[state.currentPlayerIndex];

    state.allPlayers[currentPlayerId].steps++;

    state.gameContinues = Object.values(state.allPlayers).some(
      ({ steps }) => steps < 19
    );

    if (nextPlayerTurn) {
      const listOfPlayers = Object.values(state.allPlayers);
      const firstHalf = listOfPlayers.splice(0, state.currentPlayerIndex + 1);
      const secondHalf = listOfPlayers.splice(-(state.currentPlayerIndex + 1));
      const allPlayers = [...secondHalf, ...firstHalf];

      const { index } = allPlayers.find(({ steps }) => steps < 19) || {};
      state.currentPlayerIndex = index;
    }
  });
});
