import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/analytics'
import 'firebase/performance'
import 'firebase/storage'

try {
    firebase.initializeApp({
        apiKey: 'AIzaSyD4h7pCoeLSy_QIXLllSaaznoI6HxDWuZo',
        authDomain: 'wh-questions-game.firebaseapp.com',
        databaseURL: 'https://wh-questions-game.firebaseio.com',
        projectId: 'wh-questions-game',
        storageBucket: 'wh-questions-game.appspot.com',
        messagingSenderId: '416273758463',
        appId: '1:416273758463:web:6a2c8ef26794631da574ca',
        measurementId: 'G-80BS5Y2MCY',
    })
    firebase.auth()
    firebase.firestore()
    firebase.analytics()
    firebase.performance()
    firebase.storage()
} catch (error) {
    /*
     * We skip the "already exists" message which is
     * not an actual error when we're hot-reloading.
     */
    if (!/already exists/u.test(error.message)) {
        // eslint-disable-next-line no-console
        console.error('Firebase admin initialization error', error.stack)
    }
}

export const firebase$ = firebase
