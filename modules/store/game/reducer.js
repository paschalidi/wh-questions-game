import { createAction, createReducer } from '@reduxjs/toolkit'

export const startGame = createAction('[game] store players and start game')
export const startPawnMovement = createAction('[game] start movement')
export const pawnMovement = createAction('[game] pawn moves one step')
export const disableRoll = createAction('[game] disable dice')
export const resetGame = createAction('[game] reset')
export const gameOver = createAction('[game] game over')

export const gameStatuses = {
    NEUTRAL: 'NEUTRAL',
    PLAYER_IS_MOVING: 'PLAYER_IS_MOVING',
    GAME_IS_OVER: 'GAME_IS_OVER',
}

const initialState = {
    allPlayers: {
        0: {
            steps: 0,
            lastStepSize: 0,
            playerId: 0,
            icon: '🍔',
            name: 'burger',
        },
        1: {
            steps: 0,
            lastStepSize: 0,
            playerId: 1,
            icon: '🌮',
            name: 'tacos',
        },
        2: {
            steps: 0,
            lastStepSize: 0,
            playerId: 2,
            icon: '🍕',
            name: 'pizza',
        },
        3: {
            steps: 0,
            lastStepSize: 0,
            playerId: 3,
            icon: '🌯',
            name: 'burrito',
        },
        4: {
            steps: 0,
            lastStepSize: 0,
            playerId: 4,
            icon: '🍣',
            name: 'sushi',
        },
    },
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
                            lastStepSize: 0,
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
    builder.addCase(
        pawnMovement,
        (state, { payload: { nextPlayerTurn, nextPlayingPlayerId } }) => {
            state.allPlayers[state.playingPlayerId].steps++
            state.status = gameStatuses.PLAYER_IS_MOVING

            // in the last action of the batch we change player
            if (nextPlayerTurn) {
                state.playingPlayerId = nextPlayingPlayerId
                state.status = gameStatuses.NEUTRAL
            }
        }
    )
    builder.addCase(disableRoll, state => {
        state.status = gameStatuses.PLAYER_IS_MOVING
    })
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
