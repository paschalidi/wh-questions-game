import React from 'react'
import { Board } from '../components/Board'
import { Background } from './players'

export default function Game() {
    return (
        <Background>
            <Board />
        </Background>
    )
}
