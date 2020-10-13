import styled from "styled-components";

const Styles = styled.div`
  @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400&display=swap");
  font-family: "Roboto", sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0;
  min-height: 100vh;
  background: #fff;
  overflow: hidden;

  #container {
    position: relative;
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .divider {
    position: absolute;
    z-index: 2;
    top: 65px;
    left: 200px;
    width: 50px;
    height: 15px;
    background: #fff;
  }

  .loading-text {
    position: relative;
    font-size: 3.75rem;
    font-weight: 300;
    margin: 0;
    white-space: nowrap;
  }
  .loading-text::before {
    position: absolute;
    content: "";
    z-index: 1;
    top: 40px;
    left: 115px;
    width: 6px;
    height: 6px;
    background: #000;
    border-radius: 50%;
    -webkit-animation: dotMove 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75)
      infinite;
    animation: dotMove 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75) infinite;
  }
  .loading-text .letter {
    display: inline-block;
    position: relative;
    color: #000;
    letter-spacing: 21px;
  }
  .loading-text .letter:nth-child(1) {
    -webkit-transform-origin: 100% 70%;
    transform-origin: 100% 70%;
    -webkit-transform: scale(1, 1.275);
    transform: scale(1, 1.275);
  }
  .loading-text .letter:nth-child(1)::before {
    position: absolute;
    content: "";
    top: 21px;
    left: 0;
    width: 14px;
    height: 36px;
    background: #fff;
    -webkit-transform-origin: 100% 0;
    transform-origin: 100% 0;
    -webkit-animation: lineStretch 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75)
      infinite;
    animation: lineStretch 1800ms cubic-bezier(0.25, 0.25, 0.75, 0.75) infinite;
  }
  .loading-text .letter:nth-child(5) {
    -webkit-transform-origin: 100% 70%;
    transform-origin: 100% 70%;
    -webkit-animation: letterStretch 1800ms cubic-bezier(0.25, 0.23, 0.73, 0.75)
      infinite;
    animation: letterStretch 1800ms cubic-bezier(0.25, 0.23, 0.73, 0.75)
      infinite;
  }
  .loading-text .letter:nth-child(5)::before {
    position: absolute;
    content: "";
    top: 15px;
    left: 2px;
    width: 9px;
    height: 15px;
    background: #fff;
  }

  @-webkit-keyframes dotMove {
    0%,
    100% {
      -webkit-transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg);
      transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg);
    }
    50% {
      -webkit-transform: rotate(0deg) translate(-111px, 10px) rotate(0deg);
      transform: rotate(0deg) translate(-111px, 10px) rotate(0deg);
    }
  }

  @keyframes dotMove {
    0%,
    100% {
      -webkit-transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg);
      transform: rotate(180deg) translate(-110px, -10px) rotate(-180deg);
    }
    50% {
      -webkit-transform: rotate(0deg) translate(-111px, 10px) rotate(0deg);
      transform: rotate(0deg) translate(-111px, 10px) rotate(0deg);
    }
  }
  @-webkit-keyframes letterStretch {
    0%,
    100% {
      -webkit-transform: scale(1, 0.35);
      transform: scale(1, 0.35);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    8%,
    28% {
      -webkit-transform: scale(1, 2.125);
      transform: scale(1, 2.125);
      -webkit-transform-origin: 100% 67%;
      transform-origin: 100% 67%;
    }
    37% {
      -webkit-transform: scale(1, 0.875);
      transform: scale(1, 0.875);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    46% {
      -webkit-transform: scale(1, 1.03);
      transform: scale(1, 1.03);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    50%,
    97% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
  }
  @keyframes letterStretch {
    0%,
    100% {
      -webkit-transform: scale(1, 0.35);
      transform: scale(1, 0.35);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    8%,
    28% {
      -webkit-transform: scale(1, 2.125);
      transform: scale(1, 2.125);
      -webkit-transform-origin: 100% 67%;
      transform-origin: 100% 67%;
    }
    37% {
      -webkit-transform: scale(1, 0.875);
      transform: scale(1, 0.875);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    46% {
      -webkit-transform: scale(1, 1.03);
      transform: scale(1, 1.03);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
    50%,
    97% {
      -webkit-transform: scale(1);
      transform: scale(1);
      -webkit-transform-origin: 100% 75%;
      transform-origin: 100% 75%;
    }
  }
  @-webkit-keyframes lineStretch {
    0%,
    45%,
    70%,
    100% {
      -webkit-transform: scaleY(0.125);
      transform: scaleY(0.125);
    }
    49% {
      -webkit-transform: scaleY(0.75);
      transform: scaleY(0.75);
    }
    50% {
      -webkit-transform: scaleY(0.875);
      transform: scaleY(0.875);
    }
    53% {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    60% {
      -webkit-transform: scaleY(0);
      transform: scaleY(0);
    }
    68% {
      -webkit-transform: scaleY(0.18);
      transform: scaleY(0.18);
    }
  }
  @keyframes lineStretch {
    0%,
    45%,
    70%,
    100% {
      -webkit-transform: scaleY(0.125);
      transform: scaleY(0.125);
    }
    49% {
      -webkit-transform: scaleY(0.75);
      transform: scaleY(0.75);
    }
    50% {
      -webkit-transform: scaleY(0.875);
      transform: scaleY(0.875);
    }
    53% {
      -webkit-transform: scaleY(0.5);
      transform: scaleY(0.5);
    }
    60% {
      -webkit-transform: scaleY(0);
      transform: scaleY(0);
    }
    68% {
      -webkit-transform: scaleY(0.18);
      transform: scaleY(0.18);
    }
  }
  @media (min-width: 48rem) {
    #container {
      -webkit-transform: scale(0.725rem);
      transform: scale(0.725rem);
    }
  }
  @media (min-width: 62rem) {
    #container {
      -webkit-transform: scale(0.85);
      transform: scale(0.85);
    }
  }
`;
export const Loading = () => {
  return (
    <Styles>
      <div id="container">
        <p className="loading-text" aria-label="Loading">
          <span className="letter" aria-hidden="true">
            L
          </span>
          <span className="letter" aria-hidden="true">
            o
          </span>
          <span className="letter" aria-hidden="true">
            a
          </span>
          <span className="letter" aria-hidden="true">
            d
          </span>
          <span className="letter" aria-hidden="true">
            i
          </span>
          <span className="letter" aria-hidden="true">
            n
          </span>
          <span className="letter" aria-hidden="true">
            g
          </span>
        </p>
      </div>
    </Styles>
  );
};
