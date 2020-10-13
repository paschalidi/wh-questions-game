import React, { useState, useRef } from "react";
import { DiceStyles } from "./rollDice.styles";
import { useDispatch } from "react-redux";
import { pawnMovement } from "../../modules/store/game/reducer";

const useRollDice = () => {
  const dispatch = useDispatch();
  const [rollNumber, setRollNumber] = useState(null);
  const [disabled, toggleDisability] = useState(false);

  function rollDice() {
    toggleDisability(!disabled);
    const roll = getRandomNumber();
    toggleClasses(document.querySelector(".die-list"));
    setRollNumber(roll);

    [...Array(roll)].forEach((_, index) => {
      const nextPlayerTurn = Boolean(index + 1 === roll);
      //todo not settimeout but wait before execution
      setTimeout(() => {
        dispatch(pawnMovement({ nextPlayerTurn }));
      }, 1000);
      toggleDisability(!!disabled);
    });
  }

  function toggleClasses(die) {
    die.classList.toggle("odd-roll");
    die.classList.toggle("even-roll");
  }

  function getRandomNumber(min = 1, max = 6) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return { rollNumber, rollDice, disabled };
};

export const RollDice = () => {
  const { rollNumber, rollDice, disabled } = useRollDice();

  return (
    <DiceStyles>
      <button onClick={rollDice} disabled={disabled}>
        <ol
          className="die-list even-roll"
          data-roll={rollNumber}
          id="die-1"
          style={{ cursor: disabled ? "wait" : "pointer" }}
        >
          <li className="die-item" data-side="1">
            <span className="dot" />
          </li>
          <li className="die-item" data-side="2">
            <span className="dot" />
            <span className="dot" />
          </li>
          <li className="die-item" data-side="3">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </li>
          <li className="die-item" data-side="4">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </li>
          <li className="die-item" data-side="5">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </li>
          <li className="die-item" data-side="6">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </li>
        </ol>
      </button>
    </DiceStyles>
  );
};
