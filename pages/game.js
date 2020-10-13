import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { RollDice } from "../components/RollDice";
import { Board } from "../components/Board";

export default function Game({}) {
  //todo
  // useIsAuthenticated();

  return (
    <>
      <RollDice />
      <Board />
    </>
  );
}
