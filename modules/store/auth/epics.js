import { ofType } from 'redux-observable'
import {
    setAuthenticated,
    setAuthenticatedError,
    setUnauthenticated,
    startAuthListener,
} from './actions'
import { map, flatMap, catchError } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { from, iif, of } from 'rxjs'

const initialQuestions = {
    red: [
        'What is your favourite colour?',
        'What is your favourite food?',
        'What is your favourite fruit?',
        'What is your favourite lesson?',
        'What is your mum’s name?',
        'What is the weather like today?',
        'What day is today?',
        'What day was yesterday?',
        'What day will be tomorrow?',
        'What colour is your top?',
    ],
    yellow: [
        'What is Georgia doing?',
        'What is Daniel doing?',
        'What is Syeda doing?',
        'What is Lauren doing?',
        'What is Marianna doing?',
    ],
    green: [
        'Who is this?',
        'Who are you working with?',
        'Who is your favourite teacher?',
        'Who is your favourite friend?',
        'Who is your favourite hero?',
        'Who would you give a hug?',
    ],
    finish: ['Congratulations for finishing!'],
}

export const startAuthListenerEpic = (action$, _, { firebase$ }) =>
    action$.pipe(
        ofType(startAuthListener),
        flatMap(() => {
            return authState(firebase$.auth()).pipe(
                flatMap(user => {
                    if (user) {
                        const { uid, displayName, email } = user
                        const document = firebase$
                            .firestore()
                            .collection('users')
                            .doc(uid)
                        return from(document.get()).pipe(
                            flatMap(doc => {
                                const { questions } = doc.data()
                                return iif(
                                    () => questions,
                                    of({}),
                                    from(
                                        document.set({
                                            displayName,
                                            email,
                                            questions: initialQuestions,
                                        })
                                    )
                                )
                            }),
                            map(() =>
                                setAuthenticated({
                                    uid,
                                    displayName,
                                })
                            )
                        )
                    } else {
                        return of(setUnauthenticated())
                    }
                }),
                catchError(() => of(setAuthenticatedError()))
            )
        })
    )
