import React from 'react'
import { Row } from '../Grid/Row'
import { Col } from '../Grid/Col'
import styled, { css } from 'styled-components'
import useDimensions from 'react-use-dimensions'
import { Pawn } from '../Pawn'
import { useSelector } from 'react-redux'
import { PlayerCard } from '../PlayerCard'
import { gameStatuses } from '../../modules/store/game/reducer'

const sharedCardStyles = css`
    box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
        rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
    height: 8vw;
    border-radius: 2px;
    border: 2px solid;
`
export const BoardStyles = styled.div`
    padding: 12px;
    border: 2px solid #9336fd;
    background: #dabfff;
    border-radius: 2px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
`
const CardWhite = styled.div`
    ${sharedCardStyles}
    color: #9336fd;
    background-color: #f1f1f1;
    border: 2px solid #d3d3d3;
`
const CardGreen = styled.div`
    ${sharedCardStyles}

    background-color: #2b9348;
    border-color: #007f5f;
`
const CardYellow = styled.div`
    ${sharedCardStyles}
    background-color: #ffff3f;
    border-color: #fdf148;
`
const CardRed = styled.div`
    ${sharedCardStyles}
    background-color: #e71d36;
    border-color: #f94144;
`

export const Board = () => {
    const [ref, { width: stepSize }] = useDimensions()
    const name = useSelector(state => {
        const { playingPlayerId, allPlayers } = state.gameReducer

        return allPlayers[playingPlayerId].name
    })

    const gameStatus = useSelector(state => state.gameReducer.status)

    const allPlayers = useSelector(state => state.gameReducer.allPlayers)
    return (
        <>
            <Row fullWidth position="center" textAlign="center">
                <Col lg={6}>
                    <h2>
                        {gameStatus === gameStatuses.GAME_IS_OVER
                            ? 'GAME OVER'
                            : `${name} is playing!`}
                    </h2>
                </Col>
            </Row>
            <Row fullWidth>
                <Col offset={1} lg={2}>
                    <Row fullWidth>
                        <Col lg={11} style={{ marginBottom: 10 }}>
                            <PlayerCard playerId="ONE" />
                        </Col>
                        <Col lg={11}>
                            <PlayerCard playerId="TWO" />
                        </Col>
                    </Row>
                </Col>
                <Col lg={6}>
                    <BoardStyles>
                        <Row fullWidth textAlign="center">
                            <Col lg={2}>
                                <CardWhite ref={ref}>
                                    <Row fullWidth textAlign="center">
                                        {Object.values(allPlayers).map(
                                            ({ playerId, icon }) => {
                                                return (
                                                    <Col key={playerId} lg={6}>
                                                        <Pawn
                                                            stepSize={stepSize}
                                                            playerId={playerId}
                                                            icon={icon}
                                                        />
                                                    </Col>
                                                )
                                            }
                                        )}
                                    </Row>
                                </CardWhite>
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                        </Row>

                        <Row fullWidth>
                            <Col lg={2} offset={10}>
                                <CardYellow />
                            </Col>
                        </Row>

                        <Row fullWidth>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                        </Row>

                        <Row fullWidth>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                        </Row>

                        <Row fullWidth textAlign="center">
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardGreen />
                            </Col>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardWhite>
                                    <Row
                                        fullWidth
                                        textAlign="center"
                                        verticalAlign="middle"
                                    >
                                        <Col>
                                            <h1>FINISH</h1>
                                        </Col>
                                    </Row>
                                </CardWhite>
                            </Col>
                        </Row>
                    </BoardStyles>
                </Col>
            </Row>
        </>
    )
}
