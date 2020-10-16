import React from 'react'
import { Row } from '../Grid/Row'
import { Col } from '../Grid/Col'
import styled from 'styled-components'
import { useIsAuthenticated } from '../../modules/hooks/useIsAuthenticated'
import Link from 'next/link'
import { colors } from '../utils/colors'
import { userLogoutStart } from '../../modules/store/loginWithGoogle/actions'
import { useDispatch } from 'react-redux'
import { Button } from '../Button'

const NavBarStyles = styled.div`
    background-color: ${colors.black};
    height: 56px;
    border-bottom: 1px solid #000;
    .base {
        font-size: 16px;
        background-color: rgba(0, 118, 255, 0.9);
        color: #fff;
        padding: 0.25rem 1rem;
        margin: 0;
        border-radius: 7px;
        display: flex;
        line-height: 1.65;
        align-items: center;
        justify-content: space-evenly;
        cursor: pointer;
        font-weight: 400;
        transition: background-color ease 0.2s;
        transition: border ease 0.2s;
        outline: none;
    }

    .no-border {
        box-sizing: border-box;
        color: ${colors.green};
        border: 1px solid transparent;
        background-color: transparent;

        i {
            font-size: 1.4em;
        }

        &:focus {
            outline: 0;
        }

        &:hover,
        &:active {
            border: 1px solid ${colors.white};
        }

        &:disabled {
            color: ${colors.white};
            background-color: ${colors.secondary};
            border: 1px solid ${colors.secondary};
        }
    }

    .primary {
        color: ${colors.white};
        background-color: ${colors.pink};
        border: 1px solid ${colors.pink};

        i {
            font-size: 1.5em;
        }

        &:hover,
        &:active {
            border: 1px solid ${colors.white};
            color: ${colors.white};
        }

        &:disabled {
            box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
            background-color: ${colors.divider};
        }
    }
`

export const NavBar = () => {
    const dispatch = useDispatch()
    const { isAuth } = useIsAuthenticated()

    if (!isAuth) {
        return <div />
    }
    return (
        <NavBarStyles>
            {isAuth && (
                <Row verticalAlign="middle" textAlign="center">
                    <Col lg={1}>
                        <Link href="/">
                            <div className="base no-border">Home</div>
                        </Link>
                    </Col>

                    <Col offset={8} lg={1}>
                        <Link href="/players">
                            <div className="base primary">Play</div>
                        </Link>
                    </Col>
                    <Col offset={1} lg={1}>
                        <Button
                            type="no-border"
                            onClick={() => dispatch(userLogoutStart())}
                        >
                            Logout
                        </Button>
                    </Col>
                </Row>
            )}
        </NavBarStyles>
    )
}
