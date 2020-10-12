import React, { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { store } from "../modules/store/redux";
import { startLoadingFirebase } from "../modules/store/firebase/actions";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(startLoadingFirebase());
  }, [store]);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
