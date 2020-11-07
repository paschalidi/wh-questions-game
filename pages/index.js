import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../store/loginWithGoogle/actions'
import { authStatuses } from '../store/auth/reducer'
import { Loading } from '../components/Loading'
import { Row } from '../components/Grid/Row'
import { Col } from '../components/Grid/Col'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { GoogleIcon } from '../components/svgs/GoogleIcon'
import { Clouds } from '../components/Clouds'
import { colors } from '../components/utils/colors'
import { Background } from './players'
import { useRouter } from 'next/router'

const GoogleButton = styled(Button)`
    margin: 0 auto;
    font-size: 16px !important;
    font-weight: 200;
    line-height: 0.9rem !important;
    padding: 0.6rem 2rem;

    .spanText {
        padding-left: 12px;
        line-height: initial;
    }
`

const Wave = styled.span`
    animation-name: wave-animation; /* Refers to the name of your @keyframes element below */
    animation-duration: 2.5s; /* Change to speed up or slow down */
    animation-iteration-count: 10s; /* Never stop waving :) */
    transform-origin: 70% 70%; /* Pivot around the bottom-left palm */
    display: inline-block;

    @keyframes wave-animation {
        0% {
            transform: rotate(0deg);
        }
        10% {
            transform: rotate(14deg);
        } /* The following five values can be played with to make the waving more or less extreme */
        20% {
            transform: rotate(-8deg);
        }
        30% {
            transform: rotate(14deg);
        }
        40% {
            transform: rotate(-4deg);
        }
        50% {
            transform: rotate(10deg);
        }
        60% {
            transform: rotate(0deg);
        } /* Reset for the last half to pause */
        100% {
            transform: rotate(0deg);
        }
    }

    h1 {
        font-size: 0.5em;
    }
`
export default function Home() {
    const dispatch = useDispatch()
    const router = useRouter()
    const authStatus = useSelector(state => state.authReducer.authStatus)
    const displayName = useSelector(state => state.authReducer.user.displayName)

    if (authStatus === authStatuses.LOADING) return <Loading />
    return (
        <>
            {authStatus === authStatuses.LOGGED_IN && (
                <>
                    <Background>
                        <Row textAlign="center" position="center">
                            <Col lg={6}>
                                <h1 style={{ paddingTop: '10vh' }}>
                                    <Wave>👋</Wave> {displayName}
                                </h1>
                                <h1>
                                    Press{' '}
                                    <a
                                        style={{
                                            cursor: 'pointer',
                                            color: colors.pink,
                                        }}
                                        onClick={() => {
                                            router.push('/players')
                                        }}
                                    >
                                        play
                                    </a>{' '}
                                    to start the game!!
                                </h1>
                                <h1
                                    style={{
                                        marginTop: '6vh',
                                        color: colors.green,
                                    }}
                                >
                                    Customize your questions
                                </h1>
                                <h2>
                                    You can add your own questions to the game!!
                                    <br />
                                    To add more questions click
                                    <a
                                        onClick={() => {
                                            router.push('/edit-questions')
                                        }}
                                        style={{
                                            color: colors.pink,
                                            cursor: 'pointer',
                                        }}
                                    >
                                        {' '}
                                        here
                                    </a>
                                </h2>

                                <h1
                                    style={{
                                        marginTop: '6vh',
                                        color: colors.green,
                                    }}
                                >
                                    How to play
                                </h1>
                                <div
                                    style={{
                                        textAlign: 'left',
                                        marginBottom: '10vh',
                                    }}
                                >
                                    <h3>
                                        To start the game you have to select at
                                        least two players. <br /> <br />
                                        After you have selected the players you
                                        can click the{' '}
                                        <b style={{ color: colors.green }}>
                                            "Start Game"
                                        </b>{' '}
                                        button.
                                        <br /> <br />
                                        This will take you to the board!! The
                                        board has many tiles and each tile has
                                        its own color. The different colors you
                                        will be seeing are three.{' '}
                                        <b style={{ color: colors.redTile }}>
                                            Red
                                        </b>
                                        ,{' '}
                                        <b style={{ color: colors.yellowTile }}>
                                            yellow
                                        </b>
                                        , and{' '}
                                        <b style={{ color: colors.greenTile }}>
                                            green
                                        </b>
                                        . Each color represents one type of
                                        question. <br />
                                        <ul>
                                            <li>
                                                <b
                                                    style={{
                                                        color: colors.redTile,
                                                    }}
                                                >
                                                    Red
                                                </b>{' '}
                                                represents "What questions".
                                            </li>
                                            <li>
                                                <b
                                                    style={{
                                                        color:
                                                            colors.yellowTile,
                                                    }}
                                                >
                                                    Yellow
                                                </b>{' '}
                                                represents "What doing
                                                questions"
                                            </li>
                                            <li>
                                                <b
                                                    style={{
                                                        color: colors.greenTile,
                                                    }}
                                                >
                                                    Green
                                                </b>{' '}
                                                represents "Who questions"
                                            </li>
                                        </ul>
                                        <br />
                                        The players play in sequence. The first
                                        player will roll the dice and will start
                                        moving on the board. When they land on a
                                        tile a question will pop up and the
                                        player who is playing is called to
                                        answer the question. If they answer
                                        correct they take one point. If they
                                        dont answer the question correctly they
                                        stay with the same amount of points.
                                        After the question is answered the next
                                        player will roll the dice and so on.
                                        <br />
                                        <br />
                                        The game ends when all the players reach
                                        the final tile and winner is the player
                                        with the most points.
                                    </h3>
                                </div>
                            </Col>
                        </Row>
                    </Background>
                </>
            )}
            {authStatus === authStatuses.NOT_LOGGED_IN && (
                <Row fullWidth>
                    <Col lg={8}>
                        <Clouds />
                    </Col>
                    <Col
                        lg={4}
                        style={{
                            zIndex: 200,
                            background: '#fff',
                            height: '100vh',
                        }}
                    >
                        <Row verticalAlign="middle" position="start" fullWidth>
                            <Col offset={2} lg={8}>
                                <h1 style={{ paddingBottom: 20 }}>
                                    Welcome to the questions game
                                </h1>
                                <GoogleButton
                                    style={{ padding: '0.6rem 2rem' }}
                                    type="white"
                                    onClick={() => dispatch(loginUser())}
                                >
                                    <span>
                                        <GoogleIcon />
                                    </span>
                                    <span className="spanText">
                                        Sign in with Google
                                    </span>
                                </GoogleButton>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            )}
        </>
    )
}
