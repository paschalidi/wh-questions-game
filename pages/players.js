import React, { useState, useMemo } from 'react'

import { useIsAuthenticated } from '../hooks/useIsAuthenticated'
import { Row } from '../components/Grid/Row'
import { Col } from '../components/Grid/Col'
import styled from 'styled-components'
import { CharacterDropdown } from '../components/CharacterDropdown'
import { FunkyButton } from '../components/FunkyButton'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { startGame } from '../store/game/actions'

export const Background = styled.div`
    color: white;
    min-height: calc(100vh - 56px);
    background-color: #000;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="72" viewBox="0 0 36 72"%3E%3Cg fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Cpath d="M2 6h12L8 18 2 6zm18 36h12l-6 12-6-12z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E');

    animation: moveIt 60s linear infinite;
    @keyframes moveIt {
        from {
            background-position: left;
        }
        to {
            background-position: right;
        }
    }
`

const FunkyButtonStartGame = styled(FunkyButton)`
    background: #f54768;
    color: white;
`

export default function Players({}) {
    const dispatch = useDispatch()
    const router = useRouter()

    useIsAuthenticated()
    const [openMenuId, setMenuOpen] = useState(null)
    const [selectedPlayers, selectPlayer] = useState({
        0: {},
        1: {},
        2: {},
        3: {},
        4: {},
        5: {},
    })

    const handleGameStart = () => {
        dispatch(startGame(selectedPlayers))
        router.push('/game')
    }

    const lengthOfPlayers = useMemo(
        () => Object.values(selectedPlayers).filter(({ name }) => name).length,
        [selectedPlayers]
    )

    return (
        <Background>
            {lengthOfPlayers > 1 ? (
                <Row position="center" style={{ padding: '4vh 0 2vh 0' }}>
                    <Col lg={6}>
                        <FunkyButtonStartGame
                            onClick={() => handleGameStart()}
                            style={{ width: '500px', textAlign: 'center' }}
                        >
                            START GAME WITH {lengthOfPlayers} PLAYERS
                        </FunkyButtonStartGame>
                    </Col>
                </Row>
            ) : (
                <div style={{ height: 'calc(6vh + 61px)' }} />
            )}

            <Row
                fullWidth
                space="evenly"
                verticalAlign="top"
                textAlign="center"
            >
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={0}
                    />
                </Col>
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={1}
                    />
                </Col>
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={2}
                    />
                </Col>
            </Row>

            <Row
                fullWidth
                space="evenly"
                verticalAlign="top"
                textAlign="center"
            >
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={3}
                    />
                </Col>
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={4}
                    />
                </Col>
                <Col lg={3}>
                    <CharacterDropdown
                        selectPlayer={selectPlayer}
                        players={selectedPlayers}
                        openMenu={setMenuOpen}
                        openMenuId={openMenuId}
                        menuId={5}
                    />
                </Col>
            </Row>
        </Background>
    )
}
