import { ofType } from 'redux-observable'
import { catchError, flatMap, map, tap } from 'rxjs/operators'
import { from, of } from 'rxjs'
import { getDownloadURL } from 'rxfire/storage'
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
    setImageUrl,
    setImageUrlFailed,
    setImageUrlCompleted,
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
        flatMap(({ payload: { question, setSubmitting, resetForm, type } }) => {
            const { uid } = state$.value.authReducer.user
            const imageUrl = state$.value.questionsReducer.imagesUrl[type].url

            const newQuestion = {
                question,
                type,
                id: uuid(),
                ...(imageUrl && { imageUrl }),
            }

            const profile$ = firebase$
                .firestore()
                .collection('users')
                .doc(uid)
                .update({
                    [`questions.${type}`]: firebase$.firestore.FieldValue.arrayUnion(
                        newQuestion
                    ),
                })
            return from(profile$).pipe(
                map(() => addNewQuestionCompleted(newQuestion)),
                tap(() => {
                    setSubmitting(false)
                    resetForm({})
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

export const setImageUrlEpic = (action$, state$, { firebase$ }) =>
    action$.pipe(
        ofType(setImageUrl),
        flatMap(({ payload: { file, type } }) => {
            return from(
                firebase$.storage().ref(`/images/${file.name}`).put(file)
            ).pipe(
                flatMap(({ ref }) => getDownloadURL(ref)),
                map(url => setImageUrlCompleted({ url, type }))
            )
        }),
        catchError(error => {
            console.warn(error)
            return of(setImageUrlFailed(error))
        })
    )
