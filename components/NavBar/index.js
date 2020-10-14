import React from 'react'
import { Row } from '../Grid/Row'
import { Col } from '../Grid/Col'
import styled from 'styled-components'
import { useIsAuthenticated } from '../../modules/hooks/useIsAuthenticated'
import Link from 'next/link'
import { Button } from '../Button'
import { colors } from '../utils/colors'

const NavBarStyles = styled.div`
    height: 56px;
    border-bottom: 1px solid #eaeaea;
    color: #1b263b;
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
        outline: none;
    }

    .no-border {
        box-sizing: border-box;
        color: ${colors.primary};
        border: 1px solid transparent;
        background-color: ${colors.white};

        i {
            font-size: 1.4em;
        }

        &:focus {
            outline: 0;
        }

        &:hover,
        &:active {
            border: 1px solid ${colors.primary};
        }

        &:disabled {
            color: ${colors.white};
            background-color: ${colors.secondary};
            border: 1px solid ${colors.secondary};
        }
    }

    .primary {
        color: ${colors.white};
        background-color: ${colors.primary};
        border: 1px solid ${colors.primary};

        i {
            font-size: 1.5em;
        }

        &:hover {
            top: -4px;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
            border: 1px solid ${colors.active};
            background-color: ${colors.active};
        }

        &:active {
            background-color: ${colors.active};
        }

        &:disabled {
            box-shadow: rgba(0, 0, 0, 0.12) 0px 5px 10px 0px;
            background-color: ${colors.divider};
        }
    }
`

export const NavBar = () => {
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

                    <Col offset={9} lg={1}>
                        <Link href="/players">
                            <div className="base primary">Play</div>
                        </Link>
                    </Col>
                    <Col lg={1}>
                        <Link href="/">
                            <div className="base no-border">Logout</div>
                        </Link>
                    </Col>
                </Row>
            )}
        </NavBarStyles>
    )
}
