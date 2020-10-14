import React from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useIsAuthenticated } from './hooks/useIsAuthenticated'
import { RollDice } from '../components/RollDice'
import { Board } from '../components/Board'
import { Background } from './players'

export default function Game() {
    useIsAuthenticated()
    const allPlayers = useSelector(state => state.gameReducer.allPlayers)
    const router = useRouter()

    if (Object.values(allPlayers).length === 0) {
        router.push('/game')
    }
    return (
        <>
            <Background />
            <RollDice />
            <Board />
        </>
    )
}
