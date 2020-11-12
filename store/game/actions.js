import { createAction } from '@reduxjs/toolkit'

export const startGame = createAction('[game] store players and start game')
export const startPawnMovement = createAction('[game] start movement')
export const movePawnOneStep = createAction('[game] pawn moves one step')
export const movePawnOneLastStep = createAction(
    '[game] pawn moves its final step for the round'
)
export const startNextRound = createAction('[game] next player is on')

export const openModal = createAction('[game] open modal')
export const answerCorrect = createAction('[game] correct answer')
export const answerFalse = createAction('[game] wrong answer')
export const answerForFinishingLine = createAction(
    '[game] finishing line answer'
)

export const disableRoll = createAction('[game] disable dice')
export const resetGame = createAction('[game] reset')
export const gameOver = createAction('[game] game over')
