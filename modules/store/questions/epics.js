import { ofType } from 'redux-observable'
import { catchError, flatMap, map, tap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import {
    fetchExistingQuestions,
    fetchExistingQuestionsCompleted,
    fetchExistingQuestionsFailed,
    addNewQuestion,
    addNewQuestionCompleted,
    addNewQuestionFailed,
} from './actions'

export const fetchExistingQuestionsEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(fetchExistingQuestions),
        flatMap(() => {
            const { uid } = state$.value.authReducer.user

            const document = firebase$.firestore().collection('users').doc(uid)
            return from(document.get()).pipe(
                map(response => {
                    const { questions } = response.data()
                    return fetchExistingQuestionsCompleted({ questions })
                })
            )
        }),
        catchError(error => {
            console.warn(error)
            return of(fetchExistingQuestionsFailed(error))
        })
    )

export const addNewQuestionsEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(addNewQuestion),
        flatMap(({ payload: { question, setSubmitting, type } }) => {
            const { uid } = state$.value.authReducer.user

            const profile$ = firebase$
                .firestore()
                .collection('users')
                .doc(uid)
                .update({
                    [`questions.${type}`]: firebase$.firestore.FieldValue.arrayUnion(
                        question
                    ),
                })
            return from(profile$).pipe(
                map(() => addNewQuestionCompleted({ question, type })),
                tap(() => {
                    setSubmitting(false)
                })
            )
        }),
        catchError(error => {
            debugger
            console.warn(error)
            return of(addNewQuestionFailed(error))
        })
    )
