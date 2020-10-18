import React, { useEffect } from 'react'
import { Formik } from 'formik'
import {
    fetchExistingQuestions,
    addNewQuestion,
} from '../modules/store/questions/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Row } from '../components/Grid/Row'
import { Col } from '../components/Grid/Col'

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
            <Row>
                {red && (
                    <Col lg={4}>
                        <h1>What questions</h1>
                        {red.map(item => (
                            <h3 key={item}>{item}</h3>
                        ))}
                        <Form
                            onSubmit={handleWhatQuestionSubmission}
                            formId="whatQuestion"
                        />
                    </Col>
                )}
                {yellow && (
                    <Col lg={4}>
                        <h1>What doing questions</h1>
                        {yellow.map(item => (
                            <h3 key={item}>{item}</h3>
                        ))}
                        <Form
                            onSubmit={handleWhatDoingQuestionSubmission}
                            formId="whatDoingQuestion"
                        />
                    </Col>
                )}
                {green && (
                    <Col lg={4}>
                        <h1>Who questions</h1>
                        {green.map(item => (
                            <h3 key={item}>{item}</h3>
                        ))}
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
