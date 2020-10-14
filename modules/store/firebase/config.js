import { from, forkJoin, ReplaySubject } from 'rxjs'
import { catchError, map } from 'rxjs/operators'
import { errorLoadingFirebase } from './actions'

export const CONFIG = {
    apiKey: 'AIzaSyD4h7pCoeLSy_QIXLllSaaznoI6HxDWuZo',
    authDomain: 'wh-questions-game.firebaseapp.com',
    databaseURL: 'https://wh-questions-game.firebaseio.com',
    projectId: 'wh-questions-game',
    storageBucket: 'wh-questions-game.appspot.com',
    messagingSenderId: '416273758463',
    appId: '1:416273758463:web:6a2c8ef26794631da574ca',
}

export const lazyLoadFireBase = (config = CONFIG) => {
    const app$ = from(import('firebase/app'))
    const firestore$ = from(import('firebase/firestore'))
    const fireAuth$ = from(import('firebase/auth'))

    return forkJoin(app$, firestore$, fireAuth$).pipe(
        map(([firebase]) => {
            const app = firebase.initializeApp(config)
            app.firestore().performance()
            app.firestore().analytics()
            app.firestore().enablePersistence()
            return app
        }),
        catchError(error => errorLoadingFirebase(error))
    )
}

const firebaseApp$ = new ReplaySubject(1)

firebaseApp$.asObservable()

export { firebaseApp$ }
