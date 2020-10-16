import { createAction, createReducer } from '@reduxjs/toolkit'

export const startGame = createAction('[game] store players and start game')
export const startPawnMovement = createAction('[game] start movement')
export const movePawnOneStep = createAction('[game] pawn moves one step')
export const movePawnOneLastStep = createAction(
    '[game] pawn moves its final step for the round'
)
export const disableRoll = createAction('[game] disable dice')
export const resetGame = createAction('[game] reset')
export const gameOver = createAction('[game] game over')

export const openModal = createAction('[game] open modal')
export const answerCorrect = createAction('[game] correct answer')
export const answerFalse = createAction('[game] wrong answer')

export const startNextRound = createAction('[game] next player is on')

export const gameStatuses = {
    NEUTRAL: 'NEUTRAL',
    PLAYER_IS_MOVING: 'PLAYER_IS_MOVING',
    GAME_IS_OVER: 'GAME_IS_OVER',
    QUESTION_IS_OPEN: 'QUESTION_IS_OPEN',
}

const initialState = {
    allPlayers: {},
    status: gameStatuses.NEUTRAL,
    totalNumberOfPlayers: 2,
    playingPlayerId: 0,
}

export const gameReducer = createReducer(initialState, builder => {
    builder.addCase(startGame, (state, { payload: selectedPlayers }) => {
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
    builder.addCase(disableRoll, state => {
        state.status = gameStatuses.PLAYER_IS_MOVING
    })

    builder.addCase(movePawnOneStep, state => {
        state.allPlayers[state.playingPlayerId].steps++
        state.status = gameStatuses.PLAYER_IS_MOVING
    })
    builder.addCase(movePawnOneLastStep, state => {
        state.allPlayers[state.playingPlayerId].steps++
    })

    builder.addCase(openModal, state => {
        state.status = gameStatuses.QUESTION_IS_OPEN
    })

    builder.addCase(answerCorrect, state => {
        state.status = gameStatuses.NEUTRAL
        state.allPlayers[state.playingPlayerId].score++
    })
    builder.addCase(answerFalse, state => {
        state.status = gameStatuses.NEUTRAL
    })
    builder.addCase(
        startNextRound,
        (state, { payload: { nextPlayingPlayerId } }) => {
            state.playingPlayerId = nextPlayingPlayerId
        }
    )
    builder.addCase(gameOver, state => {
        state.status = gameStatuses.GAME_IS_OVER
    })
    builder.addCase(resetGame, state => {
        state.status = gameStatuses.NEUTRAL
        state.totalNumberOfPlayers = initialState.totalNumberOfPlayers
        state.playingPlayerId = initialState.playingPlayerId
        state.allPlayers = initialState.allPlayers
    })
})
