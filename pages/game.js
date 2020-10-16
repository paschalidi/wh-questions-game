import React from 'react'
import { RollDice } from '../components/RollDice'
import { Board } from '../components/Board'
import { Background } from './players'

export default function Game() {
    return (
        <Background>
            <Board />
        </Background>
    )
}
