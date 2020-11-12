import {
    addNewQuestionCompleted,
    deleteQuestionCompleted,
    fetchExistingQuestionsCompleted,
    prepareQuestionsForNextRoundByReordering,
    setImageUrl,
    setImageUrlCompleted,
} from './actions'
import { v4 as uuid } from 'uuid'

import { createReducer } from '@reduxjs/toolkit'

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
            .addCase(setImageUrl, (state, { payload: { type } }) => {
                state.imagesUrl[type].isUploadingPhoto = true
            })
            .addCase(
                setImageUrlCompleted,
                (state, { payload: { url, type } }) => {
                    state.imagesUrl[type].url = url
                    state.imagesUrl[type].isUploadingPhoto = false
                }
            )
            .addCase(
                prepareQuestionsForNextRoundByReordering,
                (state, { payload: { resortedQuestions } }) => {
                    state.questions = resortedQuestions
                }
            )
    }
)
