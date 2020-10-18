import { createAction } from '@reduxjs/toolkit'

export const submitQuestion = createAction('[questions] sumbit')
export const submitQuestionCompleted = createAction('[questions] complete')
export const submitQuestionFailed = createAction('[questions] failed')
