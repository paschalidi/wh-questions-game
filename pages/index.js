import { useDispatch, useSelector } from "react-redux";
import { userLoginStart } from "../modules/store/loginWithGoogle/actions";
import { authStatuses } from "../modules/store/auth/reducer";
import { Loading } from "../components/Loading";
import { Clouds } from "../components/Clouds";
import { Row } from "../components/Grid/Row";
import { Col } from "../components/Grid/Col";
import { Button } from "../components/Button";
import styled from "styled-components";
import { GoogleIcon } from "../components/svgs/GoogleIcon";

const GoogleButton = styled(Button)`
  font-size: 16px !important;
  font-weight: 200;
  line-height: 0.9rem !important;

  
`;

export default function Home({}) {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.authReducer.authStatus);
  const displayName = useSelector(
    (state) => state.authReducer.user.displayName
  );

  if (authStatus === authStatuses.LOADING) return <Loading />;
  return (
    <>
      {authStatus === authStatuses.LOGGED_IN && (
        <div>
          <h3>{displayName}</h3>
        </div>
      )}
      {authStatus === authStatuses.NOT_LOGGED_IN && (
        <Row fullWidth>
          <Col lg={8}>
            <Clouds />
          </Col>
          <Col
            lg={4}
            style={{ zIndex: 200, background: "#fff", height: "100vh" }}
          >
            <Row verticalAlign="middle" position="center">
              <Col lg={0}>
                <GoogleButton
                  type="white"
                  onClick={() => dispatch(userLoginStart())}
                >
                  <span>
                    <GoogleIcon />
                  </span>
                  <span className="abcRioButtonContents">
                    <span>Sign in with Google</span>
                  </span>
                </GoogleButton>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
      <h3>Welcome to the game you always looking for</h3>
    </>
  );
}
