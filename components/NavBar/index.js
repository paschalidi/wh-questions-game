import { Row } from "../Grid/Row";
import { Col } from "../Grid/Col";
import styled from "styled-components";
import { useIsAuthenticated } from "../../pages/hooks/useIsAuthenticated";
import Link from "next/link";
import { Button } from "../Button";

const NavBarStyles = styled.div`
  height: 56px;
  border-bottom: 1px solid #eaeaea;
  color: #1b263b;
  .a {
  }
`;

export const NavBar = () => {
  const { isAuth } = useIsAuthenticated();
  if (!isAuth) return <div />;

  return (
    <NavBarStyles>
      <Row verticalAlign="middle" textAlign="center">
        <Col lg={1}>
          <Link href="/">
            <Button type="no-border">Home</Button>
          </Link>
        </Col>

        <Col offset={9} lg={1}>
          <Link href="/game">
            <Button type="secondary">Play</Button>
          </Link>
        </Col>
        <Col lg={1}>
          <Link href="/">
            <Button type="no-border">Logout</Button>
          </Link>
        </Col>
      </Row>
    </NavBarStyles>
  );
};
