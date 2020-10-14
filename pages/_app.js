import React, { useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { store } from '../modules/store/redux'
import { startLoadingFirebase } from '../modules/store/firebase/actions'
import { NavBar } from '../components/NavBar'

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Aguafina+Script&display=swap')

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  list-style: none;
  vertical-align: baseline;
  font-family: 'Aguafina Script', cursive;
}
`

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        store.dispatch(startLoadingFirebase())
    }, [store, startLoadingFirebase])

    return (
        <Provider store={store}>
            <GlobalStyles />
            <NavBar />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
