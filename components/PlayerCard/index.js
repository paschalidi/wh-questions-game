import styled from "styled-components";
import { useSelector } from "react-redux";

const PlayerCardStyles = styled.div`
  background: white;
  border: 1px solid;
  border-color: #ddd;
  box-shadow: 0 50px 50px -10px rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  min-height: 150px;
`;

export const PlayerCard = ({ playerId }) => {
  const points = useSelector(
    (state) => state.gameReducer.allPlayers[playerId].steps
  );
  return (
    <PlayerCardStyles>
      <h4>
        Player {playerId.toLowerCase()} points : {points}
      </h4>
    </PlayerCardStyles>
  );
};
