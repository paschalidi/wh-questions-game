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

  return (
    <NavBarStyles>
      {isAuth && (
        <Row verticalAlign="middle" textAlign="center">
          <Col lg={1}>
            <Button type="no-border">
              <Link href="/">Home</Link>
            </Button>
          </Col>

          <Col offset={9} lg={1}>
            <Button type="secondary">
              <Link href="/players">Play</Link>
            </Button>
          </Col>
          <Col lg={1}>
            <Button type="no-border">
              <Link href="/">Logout</Link>
            </Button>
          </Col>
        </Row>
      )}
    </NavBarStyles>
  );
};
