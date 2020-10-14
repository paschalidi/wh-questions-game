import styled from 'styled-components'
import { useRouter } from 'next/router'

export const Space = styled.div`
    @keyframes floating {
        from {
            transform: translateY(0px);
        }
        65% {
            transform: translateY(15px);
        }
        to {
            transform: translateY(0px);
        }
    }

    background-image: url('https://assets.codepen.io/1538474/star.svg'),
        linear-gradient(to bottom, #05007a, #4d007d);
    height: 100vh;
    margin: 0;
    background-attachment: fixed;
    overflow: hidden;

    .mars {
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        height: 27vmin;
        background: url('https://assets.codepen.io/1538474/mars.svg') no-repeat
            bottom center;
        background-size: cover;
    }

    .logo-404 {
        position: absolute;
        margin-left: auto;
        margin-right: auto;
        left: 0;
        right: 0;
        top: 16vmin;
        width: 30vmin;
    }
    @media (max-width: 480px) and (min-width: 320px) {
        .logo-404 {
            top: 45vmin;
        }
    }

    .meteor {
        position: absolute;
        right: 2vmin;
        top: 16vmin;
    }

    .title {
        color: white;
        font-weight: 600;
        text-align: center;
        font-size: 5vmin;
        margin-top: 31vmin;
    }
    @media (max-width: 480px) and (min-width: 320px) {
        .title {
            margin-top: 65vmin;
        }
    }

    .subtitle {
        color: white;
        font-weight: 400;
        text-align: center;
        font-size: 3.5vmin;
        margin-top: -1vmin;
        margin-bottom: 9vmin;
    }

    .btn-back {
        cursor: pointer;
        border: none;
        color: white;
        padding: 12px 20px;
        text-decoration: none;
        border-radius: 5px;
        background: black;
        font-size: 2rem;
        transition: all 0.2s ease 0s;
    }
    .btn-back:hover {
        background: white;
        color: black;
    }
    @media (max-width: 480px) and (min-width: 320px) {
        .btn-back {
            font-size: 3.5vmin;
        }
    }

    .astronaut {
        position: absolute;
        top: 18vmin;
        left: 10vmin;
        height: 30vmin;
        animation: floating 3s infinite ease-in-out;
    }
    @media (max-width: 480px) and (min-width: 320px) {
        .astronaut {
            top: 2vmin;
        }
    }

    .spaceship {
        position: absolute;
        bottom: 15vmin;
        right: 24vmin;
    }
    @media (max-width: 480px) and (min-width: 320px) {
        .spaceship {
            width: 45vmin;
            bottom: 18vmin;
        }
    }
`
export default function Page() {
    const router = useRouter()
    return (
        <Space>
            <div className="mars" />
            <img
                src="https://assets.codepen.io/1538474/404.svg"
                className="logo-404"
            />
            <img
                src="https://assets.codepen.io/1538474/meteor.svg"
                className="meteor"
            />
            <p className="title">Oh no!!</p>
            <p className="subtitle">
                You’re either misspelling the URL <br /> or requesting a page
                that's no longer here.
            </p>
            <div align="center">
                <button className="btn-back" onClick={() => router.push('/')}>
                    Back to home
                </button>
            </div>
            <img
                src="https://assets.codepen.io/1538474/astronaut.svg"
                className="astronaut"
            />
            <img
                src="https://assets.codepen.io/1538474/spaceship.svg"
                className="spaceship"
            />
        </Space>
    )
}
