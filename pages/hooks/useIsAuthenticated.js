import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { authStatuses } from "../../modules/store/auth/reducer";

export const useIsAuthenticated = () => {
  const router = useRouter();

  const authStatus = useSelector((state) => state.authReducer.authStatus);

  useEffect(() => {
    if (authStatus === authStatuses.NOT_LOGGED_IN) {
      router.push("/");
    }
  });

  return { isAuth: Boolean(authStatus === authStatuses.LOGGED_IN) };
};
