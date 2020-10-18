import React, { useEffect } from 'react'
import { Formik } from 'formik'
import {
    fetchExistingQuestions,
    addNewQuestion,
    deleteQuestion,
} from '../modules/store/questions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from '../components/Grid/Row'
import { Col } from '../components/Grid/Col'
import { colors } from '../components/utils/colors'
import styled from 'styled-components'

const DeleteButton = styled.button`
    background: ${colors.destructive};
    color: ${colors.white};
    border: none;
    padding: 1px 2px;
    border-radius: 2px;
`

const Form = ({ formId, onSubmit }) => {
    return (
        <Formik initialValues={{ [formId]: '' }} onSubmit={onSubmit}>
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name={formId}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values[formId]}
                    />
                    {errors[formId] && touched[formId] && errors[formId]}
                    <button type="submit" disabled={isSubmitting}>
                        Add new
                    </button>
                </form>
            )}
        </Formik>
    )
}
const EditQuestions = () => {
    const dispatch = useDispatch()
    const { red, yellow, green } = useSelector(
        state => state.questionsReducer.questions
    )
    const uid = useSelector(state => state.authReducer.user.uid)

    useEffect(() => {
        if (uid) {
            dispatch(fetchExistingQuestions())
        }
    }, [uid, dispatch, fetchExistingQuestions])

    const handleWhatQuestionSubmission = (
        { whatQuestion },
        { setSubmitting }
    ) => {
        setSubmitting(true)
        dispatch(
            addNewQuestion({
                type: 'red',
                question: whatQuestion,
                setSubmitting,
            })
        )
    }
    const handleWhatDoingQuestionSubmission = (
        { whatDoingQuestion },
        { setSubmitting }
    ) => {
        setSubmitting(true)
        return dispatch(
            addNewQuestion({
                type: 'yellow',
                question: whatDoingQuestion,
                setSubmitting,
            })
        )
    }
    const handleWhoQuestionSubmission = (
        { whoQuestion },
        { setSubmitting }
    ) => {
        setSubmitting(true)
        return dispatch(
            addNewQuestion({
                type: 'green',
                question: whoQuestion,
                setSubmitting,
            })
        )
    }

    return (
        <>
            <Row style={{ margin: '2vh 0' }}>
                <Col lg={12}>
                    Tip: deleting all questions from a list is impossible since
                    you wont be able to play the game
                </Col>
            </Row>
            <Row>
                {red && (
                    <Col lg={4}>
                        <h1>What questions</h1>
                        {Object.values(red).map(
                            ({ question, id, type }, _, array) => (
                                <Row key={id} fullWidth>
                                    <Col lg={9}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={1}>
                                        {array.length !== 1 && (
                                            <DeleteButton
                                                onClick={() => {
                                                    dispatch(
                                                        deleteQuestion({
                                                            id,
                                                            type,
                                                        })
                                                    )
                                                }}
                                            >
                                                delete
                                            </DeleteButton>
                                        )}
                                    </Col>
                                </Row>
                            )
                        )}
                        <Form
                            onSubmit={handleWhatQuestionSubmission}
                            formId="whatQuestion"
                        />
                    </Col>
                )}
                {yellow && (
                    <Col lg={4}>
                        <h1>What doing questions</h1>
                        {Object.values(yellow).map(
                            ({ question, id, type }, _, array) => (
                                <Row key={id} fullWidth>
                                    <Col lg={9}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={1}>
                                        {array.length !== 1 && (
                                            <DeleteButton
                                                onClick={() => {
                                                    dispatch(
                                                        deleteQuestion({
                                                            id,
                                                            type,
                                                        })
                                                    )
                                                }}
                                            >
                                                delete
                                            </DeleteButton>
                                        )}
                                    </Col>
                                </Row>
                            )
                        )}
                        <Form
                            onSubmit={handleWhatDoingQuestionSubmission}
                            formId="whatDoingQuestion"
                        />
                    </Col>
                )}
                {green && (
                    <Col lg={4}>
                        <h1>Who questions</h1>
                        {Object.values(green).map(
                            ({ question, id, type }, _, array) => (
                                <Row key={id} fullWidth>
                                    <Col lg={9}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={1}>
                                        {array.length !== 1 && (
                                            <DeleteButton
                                                onClick={() => {
                                                    dispatch(
                                                        deleteQuestion({
                                                            id,
                                                            type,
                                                        })
                                                    )
                                                }}
                                            >
                                                delete
                                            </DeleteButton>
                                        )}
                                    </Col>
                                </Row>
                            )
                        )}
                        <Form
                            onSubmit={handleWhoQuestionSubmission}
                            formId="whoQuestion"
                        />
                    </Col>
                )}
            </Row>
        </>
    )
}

export default EditQuestions
