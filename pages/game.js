import React, { useEffect } from 'react'
import { Board } from '../components/Board'
import { Background } from './players'
import { fetchExistingQuestions } from '../store/questions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { authStatuses } from '../store/auth/reducer'
import { Loading } from '../components/Loading'

export default function Game() {
    const dispatch = useDispatch()
    const uid = useSelector(state => state.authReducer.user.uid)
    const authStatus = useSelector(state => state.authReducer.authStatus)
    const questions = useSelector(state => state.questionsReducer.questions)

    useEffect(() => {
        if (uid) {
            dispatch(fetchExistingQuestions())
        }
    }, [uid, dispatch, fetchExistingQuestions])

    if (authStatus === authStatuses.LOADING) return <Loading />

    return (
        <Background>
            <Board questions={questions} />
        </Background>
    )
}
