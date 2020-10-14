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
    pawnMovement,
    startPawnMovement,
    disableRoll,
} from './reducer'
import { of, range } from 'rxjs'

const deriveNextPlayerIndex = (playingPlayerId, allPlayers) => {
    const currentPlayingPlayerIndexInAllPlayers = Object.values(
        allPlayers
    ).findIndex(({ playerId }) => playerId === playingPlayerId)

    const listOfPlayers = Object.values(allPlayers)

    const chunckFirst = listOfPlayers.slice(
        0,
        currentPlayingPlayerIndexInAllPlayers + 1
    )
    const chunckSecond = listOfPlayers.splice(
        currentPlayingPlayerIndexInAllPlayers + 1
    )
    const allPlayersSorted = [...chunckSecond, ...chunckFirst]

    const { playerId } = allPlayersSorted.find(({ steps }) => steps < 19) || {}
    return playerId
}

const deriveGameOver = allPlayers =>
    !Object.values(allPlayers).some(({ steps }) => steps < 19)
export const gameEpic = (action$, state$) =>
    action$.pipe(
        ofType(startPawnMovement),
        pluck('payload'),
        flatMap(({ roll }) =>
            range(0, roll).pipe(
                concatMap(i => of(i).pipe(delay(400))),
                map(item => {
                    const {
                        allPlayers,
                        playingPlayerId,
                    } = state$.value.gameReducer

                    if (deriveGameOver(allPlayers)) {
                        return gameOver()
                    }

                    const nextPlayerTurn = roll === item + 1
                    const nextPlayingPlayerId = nextPlayerTurn
                        ? deriveNextPlayerIndex(playingPlayerId, allPlayers)
                        : playingPlayerId

                    return pawnMovement({ nextPlayerTurn, nextPlayingPlayerId })
                }),
                startWith(disableRoll())
            )
        )
    )