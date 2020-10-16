import styled from 'styled-components'
import { colors } from '../utils/colors'

const ButtonStyles = styled.div`
    button:disabled,
    button:disabled .component-child {
        cursor: not-allowed !important;
    }

    button {
        font-family: inherit;
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

    .secondary {
        box-sizing: border-box;
        color: ${colors.white};
        border: 1px solid ${colors.primary};
        background-color: ${colors.primary};

        i {
            font-size: 1.4em;
        }

        &:hover,
        &:active {
            color: ${colors.primary};
            background-color: ${colors.white};
            border: 1px solid ${colors.primary};
        }

        &:disabled {
            color: ${colors.white};
            background-color: ${colors.secondary};
            border: 1px solid ${colors.secondary};
        }
    }

    .white {
        box-sizing: border-box;
        color: ${colors.primary};
        border: 1px solid ${colors.primary};
        background-color: ${colors.white};

        i {
            font-size: 1.4em;
        }

        &:focus {
            outline: 0;
        }

        &:hover,
        &:active {
            color: ${colors.white};
            background-color: ${colors.primary};
            border: 1px solid ${colors.primary};
        }

        &:disabled {
            color: ${colors.white};
            background-color: ${colors.secondary};
            border: 1px solid ${colors.secondary};
        }
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
`

export default ButtonStyles
