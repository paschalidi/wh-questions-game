import { createReducer } from '@reduxjs/toolkit'
export const gameStatuses = {
    NEUTRAL: 'NEUTRAL',
    PLAYER_IS_MOVING: 'PLAYER_IS_MOVING',
    GAME_IS_OVER: 'GAME_IS_OVER',
    QUESTION_IS_OPEN: 'QUESTION_IS_OPEN',
}
import {
    startNextRound,
    movePawnOneLastStep,
    movePawnOneStep,
    disableRoll,
    resetGame,
    gameOver,
    openModal,
    answerCorrect,
    answerFalse,
    startGame,
} from './actions'

const initialState = {
    allPlayers: {},
    status: gameStatuses.NEUTRAL,
    playingPlayerId: 0,
}

export const gameReducer = createReducer(initialState, builder => {
    builder
        .addCase(startGame, (state, { payload: selectedPlayers }) => {
            const allPlayers = Object.values(selectedPlayers).reduce(
                (acc, { name, id, icon }) => {
                    if (typeof id === 'number') {
                        return {
                            ...acc,
                            [id]: {
                                steps: 0,
                                score: 0,
                                playerId: id,
                                icon,
                                name,
                            },
                        }
                    }
                    return acc
                },
                {}
            )

            const { playerId } = Object.values(allPlayers).find(
                ({ playerId }) => playerId
            )
            state.playingPlayerId = playerId
            state.allPlayers = allPlayers
        })
        .addCase(disableRoll, state => {
            state.status = gameStatuses.PLAYER_IS_MOVING
        })

        .addCase(movePawnOneStep, state => {
            state.allPlayers[state.playingPlayerId].steps++
            state.status = gameStatuses.PLAYER_IS_MOVING
        })
        .addCase(movePawnOneLastStep, state => {
            state.allPlayers[state.playingPlayerId].steps++
        })

        .addCase(openModal, state => {
            state.status = gameStatuses.QUESTION_IS_OPEN
        })

        .addCase(answerCorrect, state => {
            state.status = gameStatuses.NEUTRAL
            state.allPlayers[state.playingPlayerId].score++
        })
        .addCase(answerFalse, state => {
            state.status = gameStatuses.NEUTRAL
        })
        .addCase(
            startNextRound,
            (state, { payload: { nextPlayingPlayerId } }) => {
                state.playingPlayerId = nextPlayingPlayerId
            }
        )
        .addCase(gameOver, state => {
            state.status = gameStatuses.GAME_IS_OVER
        })
        .addCase(resetGame, state => {
            state.allPlayers = initialState.allPlayers
            state.playingPlayerId = initialState.playingPlayerId
            state.status = gameStatuses.NEUTRAL
        })
})
