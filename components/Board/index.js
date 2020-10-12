import React from "react";
import { Row } from "../Grid/Row";
import { Col } from "../Grid/Col";
import styled from "styled-components";

export const BoardStyles = styled.div`
  padding: 12px;
  border: 2px solid #9336fd;
  background: #dabfff;
  border-radius: 2px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.45);

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .item {
    width: 16%;
    padding-bottom: 16%; /* Same as width, sets height */
    margin-bottom: 2%; /* (100-32*3)/2 */
    position: relative;
  }
`;
export const CardWhite = styled.div`
  color: "#9336fd";
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  margin: 1px;
  height: 8vw;
  background-color: #f1f1f1;
  border: 2px solid #d3d3d3;
  border-radius: 2px;
`;
export const CardRed = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  margin: 1px;
  height: 8vw;
  background-color: #2b9348;
  border: 2px solid #007f5f;
  border-radius: 2px;
`;
export const CardYellow = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  margin: 1px;
  height: 8vw;
  background-color: #ffff3f;
  border: 2px solid #fdf148;
  border-radius: 2px;
`;
export const CardOrange = styled.div`
  box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 1px -2px,
    rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px;
  margin: 1px;
  height: 8vw;
  background-color: #ff9770;
  border: 2px solid #e85d04;
  border-radius: 2px;
`;
export const Board = () => {
  return (
    <Row fullWidth>
      <Col lg={6} offset={3}>
        <BoardStyles>
          <Row fullWidth textAlign="center">
            <Col lg={2}>
              <CardWhite>
                <Row fullWidth textAlign="center" verticalAlign="middle">
                  <Col>
                    <h1>START</h1>
                  </Col>
                </Row>
              </CardWhite>
            </Col>
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardRed />
            </Col>
            <Col lg={2}>
              <CardYellow />
            </Col>
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardRed />
            </Col>
          </Row>

          <Row fullWidth>
            <Col lg={2} offset={10}>
              <CardRed />
            </Col>
          </Row>

          <Row fullWidth>
            <Col lg={2}>
              <CardRed />
            </Col>
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardRed />
            </Col>
            <Col lg={2}>
              <CardYellow />
            </Col>
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardRed />
            </Col>
          </Row>

          <Row fullWidth>
            <Col lg={2}>
              <CardRed />
            </Col>
          </Row>

          <Row fullWidth textAlign="center">
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardYellow />
            </Col>
            <Col lg={2}>
              <CardRed />
            </Col>
            <Col lg={2}>
              <CardYellow />
            </Col>
            <Col lg={2}>
              <CardOrange />
            </Col>
            <Col lg={2}>
              <CardWhite>
                <Row fullWidth textAlign="center" verticalAlign="middle">
                  <Col>
                    <h1>FINISH</h1>
                  </Col>
                </Row>
              </CardWhite>
            </Col>
          </Row>
        </BoardStyles>
      </Col>
    </Row>
  );
};
