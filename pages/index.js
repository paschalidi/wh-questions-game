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

const GoogleButton = styled(Button)`
    margin: 0 auto;

    font-size: 16px !important;
    font-weight: 200;
    line-height: 0.9rem !important;
    padding: 0.6rem 2rem;
`

export default function Home({}) {
    const dispatch = useDispatch()
    const authStatus = useSelector(state => state.authReducer.authStatus)
    const displayName = useSelector(state => state.authReducer.user.displayName)

    return (
        <>
            {authStatus === authStatuses.LOGGED_IN && (
                <div>
                    <h3>{displayName}</h3>
                </div>
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
                                <h1>Welcome to the questions game</h1>
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
