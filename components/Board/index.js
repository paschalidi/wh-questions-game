import React from 'react'
import { Row } from '../Grid/Row'
import { Col } from '../Grid/Col'
import styled, { css } from 'styled-components'
import useDimensions from 'react-use-dimensions'
import { Pawn } from '../Pawn'
import { useSelector } from 'react-redux'
import { gameStatuses } from '../../modules/store/game/reducer'

const sharedCardStyles = css`
    box-shadow: 20px 10px 15px hsla(0, 0%, 50%, 0.5);
    height: 8vw;
    border-radius: 2px;
    border: 2px solid;
`
export const BoardStyles = styled.div`
    padding: 12px;
    border: 2px solid #7400b8;
    background: #dabfff;
    border-radius: 2px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
    margin-bottom: 10vh;
`
const CardWhite = styled.div`
    font-size: 2vw;
    ${sharedCardStyles}
    color: #7400b8;
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
const H1 = styled.h1`
    color: ${({ isPlaying }) => (isPlaying ? '#06d6a0' : 'white')};
`

const capitalize = s => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}
export const Board = () => {
    const [ref, { width: stepSize }] = useDimensions()
    const gameStatus = useSelector(state => state.gameReducer.status)
    const allPlayers = useSelector(state => state.gameReducer.allPlayers)
    const playingPlayerId = useSelector(
        state => state.gameReducer.playingPlayerId
    )
    return (
        <>
            <Row fullWidth position="center" textAlign="center">
                <Col lg={6}>
                    <h1>
                        {gameStatus === gameStatuses.GAME_IS_OVER &&
                            'GAME OVER'}
                    </h1>
                </Col>
            </Row>
            <Row fullWidth>
                <Col offset={1} lg={2}>
                    <Row fullWidth>
                        {Object.values(allPlayers).map(({ name, playerId }) => (
                            <Col
                                key={playerId}
                                lg={11}
                                style={{ marginBottom: 10 }}
                            >
                                <H1 isPlaying={playingPlayerId === playerId}>
                                    {capitalize(name)}
                                </H1>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col lg={6}>
                    <BoardStyles>
                        <Row fullWidth textAlign="center">
                            <Col lg={2}>
                                <CardWhite ref={ref}>
                                    <Row
                                        fullWidth
                                        textAlign="center"
                                        position="center"
                                    >
                                        {Object.values(allPlayers).map(
                                            ({ playerId, icon }) => {
                                                const length = Object.values(
                                                    allPlayers
                                                ).length
                                                const lengthTypes = {
                                                    2: 7,
                                                    3: 7,
                                                    4: 6,
                                                    5: 6,
                                                }
                                                return (
                                                    <Col
                                                        key={playerId}
                                                        lg={lengthTypes[length]}
                                                    >
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
                                        <Col>FINISH TILE</Col>
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
