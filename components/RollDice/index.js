import React, { useState } from 'react'
import { DiceStyles } from './rollDice.styles'
import { useDispatch, useSelector } from 'react-redux'
import {
    gameStatuses,
    resetGame,
    startPawnMovement,
} from '../../modules/store/game/reducer'

const useRollDice = () => {
    const dispatch = useDispatch()
    const [rollNumber, setRollNumber] = useState(null)

    function rollDice() {
        const roll = getRandomNumber()
        toggleClasses(document.querySelector('.die-list'))
        setRollNumber(roll)

        dispatch(startPawnMovement({ roll }))
    }

    function toggleClasses(die) {
        die.classList.toggle('odd-roll')
        die.classList.toggle('even-roll')
    }

    function getRandomNumber(min = 1, max = 6) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    return { rollNumber, rollDice }
}

export const RollDice = () => {
    const dispatch = useDispatch()

    const { rollNumber, rollDice } = useRollDice()
    const gameStatus = useSelector(state => state.gameReducer.status)

    const handleRollDice = () => {
        if (gameStatus === gameStatuses.NEUTRAL) {
            return rollDice()
        }
        if (window.confirm('Game is over. Want to start over?')) {
            dispatch(resetGame())
        }
    }
    const isButtonDisabled =
        gameStatus === gameStatuses.PLAYER_IS_MOVING ||
        gameStatus === gameStatuses.GAME_IS_OVER

    return (
        <DiceStyles>
            <button onClick={handleRollDice} disabled={isButtonDisabled}>
                <ol
                    className="die-list even-roll"
                    data-roll={rollNumber}
                    id="die-1"
                    style={
                        isButtonDisabled
                            ? { cursor: 'not-allowed' }
                            : { cursor: 'pointer' }
                    }
                >
                    <li className="die-item" data-side="1">
                        <span className="dot" />
                    </li>
                    <li className="die-item" data-side="2">
                        <span className="dot" />
                        <span className="dot" />
                    </li>
                    <li className="die-item" data-side="3">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </li>
                    <li className="die-item" data-side="4">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </li>
                    <li className="die-item" data-side="5">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </li>
                    <li className="die-item" data-side="6">
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                        <span className="dot" />
                    </li>
                </ol>
            </button>
        </DiceStyles>
    )
}
