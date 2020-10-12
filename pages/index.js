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
          <h3>{displayName}</h3>
        </div>
      )}
      {authStatus === authStatuses.NOT_LOGGED_IN && (
        <div>
          <button onClick={() => dispatch(userLoginStart())}>Login</button>
        </div>
      )}
      <h3>Welcome to the game you always looking for</h3>
    </>
  );
}
