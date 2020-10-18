import {
    addNewQuestionCompleted,
    deleteQuestionCompleted,
    fetchExistingQuestionsCompleted,
} from './actions'
import { v4 as uuid } from 'uuid'

import { createReducer } from '@reduxjs/toolkit'

export const questionsReducer = createReducer(
    {
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
                (state, { payload: { question, type } }) => {
                    state.questions[type].push({ question, id: uuid() })
                }
            )
            .addCase(
                deleteQuestionCompleted,
                (state, { payload: { type, newQuestions } }) => {
                    state.questions[type] = newQuestions
                }
            )
    }
)
