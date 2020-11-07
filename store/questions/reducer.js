import {
    addNewQuestionCompleted,
    deleteQuestionCompleted,
    fetchExistingQuestionsCompleted,
    setImageUrl,
    setImageUrlCompleted,
} from './actions'
import { v4 as uuid } from 'uuid'

import { createReducer } from '@reduxjs/toolkit'
import { answerCorrect, answerFalse } from '../game/actions'

export const questionsReducer = createReducer(
    {
        imagesUrl: {
            red: {},
            yellow: {},
            green: {},
        },
        questions: {},
    },
    builder => {
        builder
            .addCase(
                fetchExistingQuestionsCompleted,
                (state, { payload: { questions } }) => {
                    state.questions = questions
                }
            )
            .addCase(
                addNewQuestionCompleted,
                (state, { payload: { question, type, imageUrl } }) => {
                    state.questions[type].push({
                        type,
                        question,
                        id: uuid(),
                        imageUrl,
                    })
                }
            )
            .addCase(
                deleteQuestionCompleted,
                (state, { payload: { type, newQuestions } }) => {
                    state.questions[type] = newQuestions
                }
            )
            .addCase(setImageUrl, (state, { payload: { url, type } }) => {
                state.imagesUrl[type].isUploadingPhoto = true
            })
            .addCase(
                setImageUrlCompleted,
                (state, { payload: { url, type } }) => {
                    state.imagesUrl[type].url = url
                    state.imagesUrl[type].isUploadingPhoto = false
                }
            )
            .addCase(answerCorrect, (state, { payload: { id, type } }) => {
                state.questions = {
                    ...state.questions,
                    [type]: state.questions[type].filter(
                        ({ id: questionId }) => questionId !== id
                    ),
                }
            })
            .addCase(answerFalse, (state, { payload: { id, type } }) => {
                state.questions = {
                    ...state.questions,
                    [type]: state.questions[type].filter(
                        ({ id: questionId }) => questionId !== id
                    ),
                }
            })
    }
)
