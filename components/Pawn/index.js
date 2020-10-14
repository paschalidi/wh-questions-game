import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Motion, spring } from 'react-motion'

const PawnStyles = styled.div`
    margin: 0 auto;
    font-size: 3.5vw;
    height: 2.6vw;
    width: 2.6vw;
    line-height: 1.5rem;
    border-radius: 50%;
    color: white;
`

const MAX_POSSIBLE_STEPS = 19
const movementMappedOnSteps = (steps = 0, stepSize = 0) => {
    switch (steps) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            return { x: spring(stepSize * steps), y: spring(0) }
        case 6:
            return {
                x: spring(stepSize * (steps - 1)),
                y: spring(stepSize + 2),
            }
        case 7:
            return {
                x: spring(stepSize * (steps - 2)),
                y: spring(stepSize * 2 + 4),
            }
        case 8:
            return {
                x: spring(stepSize * (steps - 4)),
                y: spring(stepSize * 2 + 4),
            }
        case 9:
            return {
                x: spring(stepSize * (steps - 6)),
                y: spring(stepSize * 2 + 4),
            }
        case 10:
            return {
                x: spring(stepSize * (steps - 8)),
                y: spring(stepSize * 2 + 4),
            }
        case 11:
            return {
                x: spring(stepSize * (steps - 10)),
                y: spring(stepSize * 2 + 4),
            }
        case 12:
            return {
                x: spring(stepSize * (steps - 12)),
                y: spring(stepSize * 2 + 4),
            }
        case 13:
            return {
                x: spring(stepSize * (steps - 13)),
                y: spring(stepSize * 3 + 6),
            }
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
            return {
                x: spring(stepSize * (steps - 14)),
                y: spring(stepSize * 4 + 6),
            }
        default:
            return { x: spring(0), y: spring(0) }
    }
}

export const Pawn = ({ stepSize, playerId, icon }) => {
    const steps = useSelector(
        state => state.gameReducer.allPlayers[playerId].steps
    )
    return (
        <Motion
            style={
                steps < MAX_POSSIBLE_STEPS
                    ? movementMappedOnSteps(steps, stepSize)
                    : { x: spring(stepSize * 5), y: spring(stepSize * 4 + 6) }
            }
        >
            {({ x, y }) => {
                return (
                    <PawnStyles
                        style={{
                            WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
                            transform: `translate3d(${x}px, ${y}px, 0)`,
                        }}
                    >
                        {icon}
                    </PawnStyles>
                )
            }}
        </Motion>
    )
}
