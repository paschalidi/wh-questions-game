import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { RollDice } from "../components/RollDice";
import styled from "styled-components";
import { Board } from "../components/Board";
export const GameStyles = styled.div`
  height: 100vh;
`;
export default function Game({}) {
  useIsAuthenticated();

  return (
    <GameStyles>
      <RollDice />
      <Board/>
    </GameStyles>
  );
}
