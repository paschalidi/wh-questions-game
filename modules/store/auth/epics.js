import { ofType } from 'redux-observable'
import {
    setAuthenticated,
    setAuthenticatedError,
    setUnauthenticated,
    startAuthListener,
} from './actions'
import { map, flatMap, catchError } from 'rxjs/operators'
import { authState } from 'rxfire/auth'
import { from, of } from 'rxjs'
import { v4 as uuid } from 'uuid'

const initialQuestions = {
    red: [
        { question: 'What is your favourite colour?', id: uuid(), type: 'red' },
        { question: 'What is your favourite food?', id: uuid(), type: 'red' },
        { question: 'What is your favourite fruit?', id: uuid(), type: 'red' },
        { question: 'What is your favourite lesson?', id: uuid(), type: 'red' },
        { question: 'What is your mum’s name?', id: uuid(), type: 'red' },
        {
            question: 'What is the weather like today?',
            id: uuid(),
            type: 'red',
        },
        { question: 'What day is today?', id: uuid(), type: 'red' },
        { question: 'What day was yesterday?', id: uuid(), type: 'red' },
        { question: 'What day will be tomorrow?', id: uuid(), type: 'red' },
        { question: 'What colour is your top?', id: uuid(), type: 'red' },
    ],
    yellow: [
        { question: 'What is Georgia doing?', id: uuid(), type: 'yellow' },
        { question: 'What is Daniel doing?', id: uuid(), type: 'yellow' },
        { question: 'What is Syeda doing?', id: uuid(), type: 'yellow' },
        { question: 'What is Lauren doing?', id: uuid(), type: 'yellow' },
        { question: 'What is Marianna doing?', id: uuid(), type: 'yellow' },
    ],
    green: [
        { question: 'Who is this?', id: uuid(), type: 'green' },
        { question: 'Who are you working with?', id: uuid(), type: 'green' },
        {
            question: 'Who is your favourite teacher?',
            id: uuid(),
            type: 'green',
        },
        {
            question: 'Who is your favourite friend?',
            id: uuid(),
            type: 'green',
        },
        { question: 'Who is your favourite hero?', id: uuid(), type: 'green' },
        { question: 'Who would you give a hug?', id: uuid(), type: 'green' },
    ],
    finish: [
        {
            question: 'Congratulations for finishing!',
            id: uuid(),
            type: 'finish',
        },
    ],
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
                            flatMap(response => {
                                const { questions } = response.data()
                                if (!questions) {
                                    return from(
                                        document.set({
                                            displayName,
                                            email,
                                            questions: initialQuestions,
                                        })
                                    )
                                }
                                return of({})
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
                catchError(err => {
                    console.warn(err)
                    return of(setAuthenticatedError())
                })
            )
        })
    )
