import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginStart } from '../modules/store/loginWithGoogle/actions'
import { authStatuses } from '../modules/store/auth/reducer'
import { Loading } from '../components/Loading'
import { Row } from '../components/Grid/Row'
import { Col } from '../components/Grid/Col'
import { Button } from '../components/Button'
import styled from 'styled-components'
import { GoogleIcon } from '../components/svgs/GoogleIcon'
import { Clouds } from '../components/Clouds'
import { colors } from '../components/utils/colors'

const GoogleButton = styled(Button)`
    margin: 0 auto;

    font-size: 16px !important;
    font-weight: 200;
    line-height: 0.9rem !important;
    padding: 0.6rem 2rem;
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
    const authStatus = useSelector(state => state.authReducer.authStatus)
    const displayName = useSelector(state => state.authReducer.user.displayName)

    if (authStatus === authStatuses.LOADING) return <Loading />
    return (
        <>
            {authStatus === authStatuses.LOGGED_IN && (
                <>
                    <Row textAlign="center" style={{ marginTop: '10vh' }}>
                        <Col>
                            <h2>
                                <Wave>👋</Wave> {displayName}
                            </h2>
                            <h2>
                                Press{' '}
                                <span style={{ color: colors.primary }}>
                                    play
                                </span>{' '}
                                to start the game!!
                            </h2>
                        </Col>
                    </Row>
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
                        <Row verticalAlign="middle" position="center">
                            <Col offset={2} lg={8}>
                                <h1 style={{ paddingBottom: 20 }}>
                                    Welcome to the questions game
                                </h1>
                                <GoogleButton
                                    style={{ padding: '0.6rem 2rem' }}
                                    type="white"
                                    onClick={() => dispatch(userLoginStart())}
                                >
                                    <span>
                                        <GoogleIcon />
                                    </span>
                                    <span className="abcRioButtonContents">
                                        <span style={{ paddingLeft: 10 }}>
                                            Sign in with Google
                                        </span>
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
