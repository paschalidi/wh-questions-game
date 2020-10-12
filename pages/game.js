import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { RollDice } from "../components/RollDice";
import { Board } from "../components/Board";

export default function Game({}) {
  useIsAuthenticated();

  return (
    <>
      <RollDice />
      <Board />
    </>
  );
}
