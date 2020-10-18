import {
    addNewQuestionCompleted,
    fetchExistingQuestions,
    fetchExistingQuestionsCompleted,
    fetchExistingQuestionsFailed,
} from './actions'

import { createReducer } from '@reduxjs/toolkit'

const statuses = {
    LOADING: 'LOADING',
    DEFAULT: 'DEFAULT',
    ERROR: 'ERROR',
}
export const questionsReducer = createReducer(
    {
        questionsPageStatus: statuses.LOADING,
        questions: {},
    },
    builder => {
        builder
            .addCase(fetchExistingQuestions, state => {
                state.questionsPageStatus = statuses.LOADING
            })
            .addCase(
                fetchExistingQuestionsCompleted,
                (state, { payload: { questions } }) => {
                    state.questionsPageStatus = statuses.DEFAULT
                    state.questions = questions
                }
            )
            .addCase(fetchExistingQuestionsFailed, state => {
                state.questionsPageStatus = statuses.ERROR
            })
            .addCase(
                addNewQuestionCompleted,
                (state, { payload: { question, type } }) => {
                    state.questionsPageStatus = statuses.ERROR
                    state.questions[type].push(question)
                }
            )
    }
)
