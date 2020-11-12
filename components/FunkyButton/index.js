import styled from 'styled-components'

export const FunkyButton = styled.a`
    cursor: pointer;
    background-color: transparent;
    display: inline-block;
    border: 2px solid #f54768;
    border-radius: 6rem;
    margin: 0 auto;
    padding: 1rem 1rem;
    box-shadow: 0 0 5rem 0 #000;
    letter-spacing: 0.15rem;
    text-transform: uppercase;
    transition: color 0.5s ease-in-out, border 0.5s ease-in-out;

    &:hover {
        outline-width: 0;
        color: #fff;
        border-color: #fff;
    }
`
