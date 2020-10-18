import React, { useEffect } from 'react'
import { Row } from '../Grid/Row'
import { Col } from '../Grid/Col'
import styled, { css } from 'styled-components'
import useDimensions from 'react-cool-dimensions'
import { MAX_POSSIBLE_STEPS, Pawn } from '../Pawn'
import { useDispatch, useSelector } from 'react-redux'
import { answerCorrect, answerFalse, resetGame } from '../../store/game/actions'
import { gameStatuses } from '../../store/game/reducer'
import { RainbowIcon } from '../svgs/RainbowIcon'
import Modal from 'react-modal'
import { colors } from '../utils/colors'
import { Button } from '../Button'
import { RollDice } from '../RollDice'
import { useRouter } from 'next/router'

const sharedCardStyles = css`
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    height: 8vw;
    border-radius: 2px;
    border: 2px solid;
`
export const BoardStyles = styled.div`
    padding: 12px;
    border: 2px solid #9475ff;
    background: #dabfff;
    border-radius: 2px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);
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

const deriveTheKindOfQuestion = steps => {
    if (steps > MAX_POSSIBLE_STEPS) {
        return 'finish'
    }

    switch (steps) {
        case 1:
        case 3:
        case 4:
        case 7:
        case 10:
        case 12:
        case 14:
        case 16:
        case 18:
            return 'red'
        case 2:
        case 6:
        case 9:
        case 15:
            return 'yellow'
        case 5:
        case 8:
        case 11:
        case 13:
        case 17:
            return 'green'
        default:
            return 'finish'
    }
}

const useQuestion = ({
    allPlayers,
    playingPlayerId,
    gameStatus,
    questions,
}) => {
    if (gameStatus !== gameStatuses.QUESTION_IS_OPEN) {
        return {}
    }
    const steps = allPlayers[playingPlayerId].steps
    const questionType = deriveTheKindOfQuestion(steps)
    const questionsOfType = questions[questionType]
    const { question } = questionsOfType[
        Math.floor(Math.random() * questionsOfType.length)
    ]
    return { question, questionType }
}

Modal.setAppElement('#__next')

export const Board = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const gameStatus = useSelector(state => state.gameReducer.status)
    const questions = useSelector(state => state.questionsReducer.questions)
    const allPlayers = useSelector(state => state.gameReducer.allPlayers)
    const playingPlayerId = useSelector(
        state => state.gameReducer.playingPlayerId
    )
    const { ref, width: stepSize } = useDimensions({})
    const { question, questionType } = useQuestion({
        allPlayers,
        playingPlayerId,
        gameStatus,
        questions,
    })

    // on unmount
    useEffect(() => {
        return () => {
            dispatch(resetGame())
        }
    }, [resetGame, dispatch])

    return (
        <>
            <Modal
                style={{
                    content: {
                        border: `solid 1px ${colors.black}`,
                        top: '40%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: (() => {
                            switch (questionType) {
                                case 'red':
                                    return colors.redBackgroundLight
                                case 'green':
                                    return colors.greenBackgroundLight
                                case 'yellow':
                                    return colors.yellowBackgroundLight
                                default:
                                    return colors.white
                            }
                        })(),
                    },
                }}
                isOpen={gameStatus === gameStatuses.QUESTION_IS_OPEN}
            >
                <Row position="center" textAlign="center">
                    <Col lg={12}>
                        <h1 style={{ margin: '20px 0 40px 0' }}>{question}</h1>
                        <Row position="center" textAlign="center">
                            {questionType === 'finish' ? (
                                <Col lg={6}>
                                    <Button
                                        style={{ margin: '0 auto' }}
                                        type="primary"
                                        onClick={() => dispatch(answerFalse())}
                                    >
                                        next player
                                    </Button>
                                </Col>
                            ) : (
                                <>
                                    <Col lg={6}>
                                        <Button
                                            style={{ margin: '0 auto' }}
                                            type="red"
                                            onClick={() =>
                                                dispatch(answerFalse())
                                            }
                                        >
                                            Not correct
                                        </Button>
                                    </Col>
                                    <Col lg={6}>
                                        <Button
                                            style={{ margin: '0 auto' }}
                                            type="green"
                                            onClick={() =>
                                                dispatch(
                                                    answerCorrect({
                                                        playingPlayerId,
                                                    })
                                                )
                                            }
                                        >
                                            Correct
                                        </Button>
                                    </Col>
                                </>
                            )}
                        </Row>
                    </Col>
                </Row>
            </Modal>
            <Modal
                style={{
                    content: {
                        border: `solid 1px ${colors.black}`,
                        top: '40%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        background: 'white',
                    },
                }}
                isOpen={gameStatus === gameStatuses.GAME_IS_OVER}
            >
                <Row position="center" textAlign="center">
                    <Col lg={12}>
                        <h1 style={{ margin: '20px 0 40px 0' }}>
                            Game is over!{' '}
                        </h1>
                        <Row position="center" textAlign="center">
                            <Col lg={12}>
                                <Button
                                    style={{ margin: '0 auto' }}
                                    type="primary"
                                    onClick={() => router.push('/players')}
                                >
                                    Start again
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Modal>

            <Row fullWidth verticalAlign="middle">
                <Col lg={3}>
                    <Row
                        fullWidth
                        style={{ marginBottom: 120 }}
                        textAlign="right"
                    >
                        <Col lg={12} style={{ marginBottom: 40 }}>
                            <RollDice />
                        </Col>
                        {Object.values(allPlayers).map(({ name, playerId }) => (
                            <Col
                                key={playerId}
                                lg={8}
                                style={{ marginBottom: 10 }}
                            >
                                <H1 isPlaying={playingPlayerId === playerId}>
                                    {capitalize(name)}:{' '}
                                    {allPlayers[playerId].score}
                                </H1>
                            </Col>
                        ))}
                    </Row>
                </Col>
                <Col lg={6}>
                    <BoardStyles>
                        <Row fullWidth textAlign="center">
                            <Col lg={2}>
                                <div ref={ref}>
                                    <CardWhite>
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
                                                            lg={
                                                                lengthTypes[
                                                                    length
                                                                ]
                                                            }
                                                        >
                                                            <Pawn
                                                                stepSize={
                                                                    stepSize
                                                                }
                                                                playerId={
                                                                    playerId
                                                                }
                                                                icon={icon}
                                                            />
                                                        </Col>
                                                    )
                                                }
                                            )}
                                        </Row>
                                    </CardWhite>
                                </div>
                            </Col>
                            <Col lg={2}>
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardYellow />
                            </Col>
                            <Col lg={2}>
                                <CardRed />
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
                                <CardRed />
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
                                <CardGreen />
                            </Col>
                        </Row>

                        <Row fullWidth textAlign="center">
                            <Col lg={2}>
                                <CardRed />
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
                                <CardRed />
                            </Col>
                            <Col lg={2}>
                                <CardWhite>
                                    <Row
                                        fullWidth
                                        textAlign="center"
                                        verticalAlign="middle"
                                    >
                                        <Col>
                                            <RainbowIcon />
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
