import { createAction } from '@reduxjs/toolkit'

export const postQuestion = createAction('[questions] post')
export const postQuestionCompleted = createAction('[questions] complete')
export const postQuestionFailed = createAction('[questions] failed')
