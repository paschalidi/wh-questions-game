import { useIsAuthenticated } from "./hooks/useIsAuthenticated";
import { RollDice } from "../components/RollDice";
import { Board } from "../components/Board";
import { useSelector } from "react-redux";

export default function Game({}) {
  //todo
  // useIsAuthenticated();
  const gameContinues = useSelector((state) => state.gameReducer.gameContinues);

  return (
    <>
      <RollDice />
      <Board />
    </>
  );
}
