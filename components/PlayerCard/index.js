import { Box } from "reakit";
import styled from "styled-components";

const StyledCard = styled(Box)`
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  border-radius: 8px;
  padding: 40px 16px;
  background: #fff;
  border: none;
`;

export const PlayerCard = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};
