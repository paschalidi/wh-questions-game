import React from 'react'
import styled from 'styled-components'
import useDimensions from 'react-use-dimensions'
import { FunkyButton } from '../FunkyButton'
import { colors } from '../utils/colors'

const CardStyles = styled.div`
    position: relative;
    padding: 2rem;
    box-shadow: 1rem 1rem 0 0 #222;
    width: 100%;
    margin: 2rem;
    background: #111;

    .center {
        text-align: center;
    }
`

const FunkyDropdownButton = styled(FunkyButton)`
    color: #8bd76b;
`

const FunkyDropdownMenu = styled.div`
    z-index: 1;
    position: absolute;
    transform: ${props => `translate(${props.width}px, 1vh)`};

    .selectorOptions {
        overflow: hidden;
        display: block;
        background-color: #000;
        border: 0.15rem solid #f54768;
        border-radius: 2rem;
        box-shadow: 0 0 5rem 1rem #000;
        list-style: none;
        padding: 0;
        margin: 0;
    }
    ul {
        display: block;
        list-style-type: disc;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        padding-inline-start: 40px;
    }

    .itemIcon {
        font-size: 50px;
        display: block;
        -webkit-transition: color 0.5s ease-in-out;
        transition: color 0.5s ease-in-out;
        border-bottom: none;
    }
    .item {
        cursor: pointer;
    }

    .item:hover {
        background: #f54768;
        color: white;
        transition: background-color ease 0.2s;

        .itemIcon {
            background: ${colors.pink};
        }
    }
`

const H1 = styled.h1`
    font-size: 1.5em;
    font-weight: normal;
    color: #f54768;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    &::after {
        margin-left: 1rem;
    }

    &::before {
        margin-right: 1rem;
    }

    &::before,
    &::after {
        flex: 1;
        content: '';
        height: 0.15rem;
        background-color: #333;
    }
`

const AVAILABLE_PLAYERS = {
    lion: {
        name: 'lion',
        icon: '🦁',
        desc: 'I can roar!',
    },
    fox: {
        name: 'fox',
        icon: '🦊',
        desc: 'I eat chicken!',
    },
    snake: {
        name: 'snake',
        icon: '🐍',
        desc: 'I can hiss!',
    },
    dolphin: {
        name: 'dolphin',
        icon: '🐬',
        desc: 'I can swim fast!',
    },
    parrot: {
        name: 'parrot',
        icon: '🦜',
        desc: 'I can fly!',
    },
    dinosaur: {
        name: 'dinosaur',
        icon: '🦖',
        desc: 'I can stomp!',
    },
}

export const CharacterDropdown = ({
    openMenu,
    openMenuId,
    menuId,
    players,
    selectPlayer,
}) => {
    const [ref, { width }] = useDimensions()

    const handlePlayerSelections = name => {
        selectPlayer({
            ...players,
            [menuId]: { ...AVAILABLE_PLAYERS[name], id: menuId },
        })
        openMenu(null)
    }

    return (
        <CardStyles>
            <H1 style={{ paddingBottom: 16 }}>Choose your favourite animal</H1>
            <FunkyDropdownButton
                ref={ref}
                onClick={() => {
                    if (players[menuId].name) {
                        return
                    }
                    if (menuId === openMenuId) {
                        return openMenu(null)
                    }
                    return openMenu(menuId)
                }}
            >
                {players[menuId].name
                    ? players[menuId].name
                    : '👉 Choose character 👈'}
            </FunkyDropdownButton>

            <FunkyDropdownMenu width={width / 2 - 50}>
                {menuId === openMenuId && (
                    <div style={{ width: 100 }}>
                        <ul className="selectorOptions">
                            {Object.values(AVAILABLE_PLAYERS).map(
                                ({ name, icon }) => (
                                    <li key={name}>
                                        <div
                                            className="item"
                                            onClick={() =>
                                                handlePlayerSelections(name)
                                            }
                                        >
                                            <span className={'itemIcon'}>
                                                {icon}
                                            </span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                )}
            </FunkyDropdownMenu>
        </CardStyles>
    )
}
