import { ofType } from 'redux-observable'
import {
    concatMap,
    delay,
    flatMap,
    map,
    pluck,
    startWith,
} from 'rxjs/operators'
import {
    gameOver,
    movePawnOneStep,
    startPawnMovement,
    disableRoll,
    movePawnOneLastStep,
    openModal,
    answerCorrect,
    answerFalse,
    startNextRound,
} from './actions'
import { of, range } from 'rxjs'

const deriveNextPlayerIndex = (playingPlayerId, allPlayers) => {
    const currentPlayingPlayerIndexInAllPlayers = Object.values(
        allPlayers
    ).findIndex(({ playerId }) => playerId === playingPlayerId)

    const listOfPlayers = Object.values(allPlayers)

    const chunkFirst = listOfPlayers.slice(
        0,
        currentPlayingPlayerIndexInAllPlayers + 1
    )
    const chunkSecond = listOfPlayers.splice(
        currentPlayingPlayerIndexInAllPlayers + 1
    )
    const allPlayersSorted = [...chunkSecond, ...chunkFirst]

    const { playerId } = allPlayersSorted.find(({ steps }) => steps < 19) || {}
    return playerId
}

const allPlayersReachedMaximumPoints = allPlayers =>
    !Object.values(allPlayers).some(({ steps }) => steps < 19)

export const gameEpic = (action$, state$) =>
    action$.pipe(
        ofType(startPawnMovement),
        pluck('payload'),
        flatMap(({ roll }) =>
            range(0, roll).pipe(
                delay(1500),
                concatMap(i => of(i).pipe(delay(400))),
                map(rollCounter => {
                    const { allPlayers } = state$.value.gameReducer

                    if (allPlayersReachedMaximumPoints(allPlayers)) {
                        return gameOver()
                    }

                    const nextPlayerTurn = roll === rollCounter + 1

                    if (!nextPlayerTurn) {
                        return movePawnOneStep()
                    }

                    return movePawnOneLastStep()
                }),
                startWith(disableRoll())
            )
        )
    )

export const openModalEpic = action$ =>
    action$.pipe(
        ofType(movePawnOneLastStep),
        delay(600),
        map(() => {
            return openModal()
        })
    )

export const closeModalEpic = (action$, state$) =>
    action$.pipe(
        ofType(answerCorrect, answerFalse),
        map(() => {
            const { allPlayers, playingPlayerId } = state$.value.gameReducer
            const nextPlayingPlayerId = deriveNextPlayerIndex(
                playingPlayerId,
                allPlayers
            )
            return startNextRound({ nextPlayingPlayerId })
        })
    )
