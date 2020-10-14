import React, { useEffect } from "react";
import "../styles/globals.css";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { store } from "../modules/store/redux";
import { startLoadingFirebase } from "../modules/store/firebase/actions";
import { NavBar } from "../components/NavBar";

const GlobalStyles = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  vertical-align: baseline;
  @import url("https://fonts.googleapis.com/css?family=Roboto:100,300,400&display=swap");
  font-family: "Roboto", sans-serif;
}
`;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    store.dispatch(startLoadingFirebase());
  }, [store, startLoadingFirebase]);

  return (
    <Provider store={store}>
      <GlobalStyles />
      <NavBar />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
