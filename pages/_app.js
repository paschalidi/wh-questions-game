import React, { useEffect } from 'react'
import '../styles/globals.css'
import { Provider } from 'react-redux'
import { store } from '../modules/store/redux'
import { startLoadingFirebase } from '../modules/store/firebase/actions'
import { NavBar } from '../components/NavBar'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        store.dispatch(startLoadingFirebase())
    }, [store, startLoadingFirebase])

    return (
        <Provider store={store}>
            <NavBar />
            <Component {...pageProps} />
        </Provider>
    )
}

export default MyApp
