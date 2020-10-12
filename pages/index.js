import { useDispatch, useSelector } from "react-redux";
import { userLoginStart } from "../modules/store/loginWithGoogle/actions";
import { authStatuses } from "../modules/store/auth/reducer";

export default function Home({}) {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.authReducer.authStatus);
  const displayName = useSelector(
    (state) => state.authReducer.user.displayName
  );

  if (authStatus === authStatuses.LOADING) return <div>loading</div>;
  return (
    <>
      {authStatus === authStatuses.LOGGED_IN && (
        <div>
          <h5>{displayName}</h5>
          welcome to the wh question
        </div>
      )}
      {authStatus === authStatuses.NOT_LOGGED_IN && (
        <button onClick={() => dispatch(userLoginStart())}>Login</button>
      )}
    </>
  );
}
