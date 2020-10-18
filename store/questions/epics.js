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
    deleteQuestion,
    deleteQuestionCompleted,
    deleteQuestionFailed,
} from './actions'
import { v4 as uuid } from 'uuid'

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

export const addNewQuestionEpic = (action$, state$, { firebase$ }) =>
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
                        { question, id: uuid() }
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
            console.warn(error)
            return of(addNewQuestionFailed(error))
        })
    )

export const deleteQuestionEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(deleteQuestion),
        flatMap(({ payload: { id, type } }) => {
            const { uid } = state$.value.authReducer.user
            const { questions } = state$.value.questionsReducer

            const newQuestions = questions[type].filter(
                ({ id: questionId }) => questionId !== id
            )
            const profile$ = firebase$
                .firestore()
                .collection('users')
                .doc(uid)
                .update({
                    [`questions.${type}`]: newQuestions,
                })

            return from(profile$).pipe(
                map(() => deleteQuestionCompleted({ type, newQuestions }))
            )
        }),
        catchError(error => {
            console.warn(error)
            return of(deleteQuestionFailed(error))
        })
    )
