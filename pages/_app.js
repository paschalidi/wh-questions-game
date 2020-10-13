import React, { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { store } from "../modules/store/redux";
import { startLoadingFirebase } from "../modules/store/firebase/actions";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}
`;

function MyApp({ Component, pageProps }) {
  // todo
  // useEffect(() => {
  //   store.dispatch(startLoadingFirebase());
  // }, [store]);
  return (
    <Provider store={store}>
      <GlobalStyles />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
