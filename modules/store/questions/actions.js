import { createAction } from '@reduxjs/toolkit'

export const addNewQuestion = createAction('[questions] adding a new question')

export const addNewQuestionCompleted = createAction(
    '[questions] adding a new question completed'
)
export const addNewQuestionFailed = createAction(
    '[questions] adding a new question failed'
)

export const fetchExistingQuestions = createAction(
    '[questions] fetching all questions'
)
export const fetchExistingQuestionsCompleted = createAction(
    '[questions] fetching all questions completed'
)
export const fetchExistingQuestionsFailed = createAction(
    '[questions] fetching all questions failed'
)
