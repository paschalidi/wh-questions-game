import React, { useState } from "react";
import { DiceStyles } from "./rollDice.styles";

export const RollDice = () => {
  const [rollNumber, setRollNumber] = useState(1);
  function rollDice() {
    const dice = [...document.querySelectorAll(".die-list")];

    dice.forEach((die) => {
      toggleClasses(die);
      setRollNumber(getRandomNumber());
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

  return (
    <DiceStyles>
      <ol
        className="die-list even-roll"
        data-roll={rollNumber}
        id="die-1"
        onClick={rollDice}
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
    </DiceStyles>
  );
};
