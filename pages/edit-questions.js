import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import {
    fetchExistingQuestions,
    addNewQuestion,
    deleteQuestion,
    setImageUrl,
} from '../store/questions/actions'
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
    &:hover {
        cursor: pointer;
        background-color: ${colors.destructiveActive};
    }
`
const ViewImageAnchor = styled.a`
    font-size: 13.3333px;

    font-family: Arial;
    padding: 1px 2px;
    border-radius: 2px;
    background-color: ${colors.green};
    border: none;
    color: white;
    &:hover {
        background-color: ${colors.affirmative};
    }

    a:active {
        background-color: ${colors.affirmative};
    }
`

const Form = ({ formId, onSubmit, onFileChange }) => {
    const isUploadingPhoto = useSelector(
        state => state.questionsReducer.imagesUrl[formId].isUploadingPhoto
    )
    return (
        <Row fullWidth style={{ paddingTop: '4vh' }}>
            <Col lg={10}>
                <Formik
                    initialValues={{ [formId]: '' }}
                    onSubmit={onSubmit}
                    validate={values => {
                        const errors = {}
                        if (!values[formId]) {
                            errors[formId] = 'Question required *'
                        }
                        return errors
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleSubmit,
                        isSubmitting,
                    }) => (
                        <form
                            onSubmit={handleSubmit}
                            style={{ fontFamily: 'Arial' }}
                        >
                            <div>
                                <div
                                    style={{
                                        fontSize: 13,
                                        color: colors.destructive,
                                    }}
                                >
                                    {errors[formId] &&
                                        touched[formId] &&
                                        `${errors[formId]}`}
                                </div>
                                <input
                                    style={{ width: '100%' }}
                                    type="text"
                                    name={formId}
                                    onChange={handleChange}
                                    value={values[formId]}
                                />
                            </div>
                            <div>
                                <input
                                    style={{ width: '100%' }}
                                    type="file"
                                    onChange={e => onFileChange(e, formId)}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting || isUploadingPhoto}
                                style={{ width: '100%', marginTop: 8 }}
                            >
                                Add new question
                            </button>
                        </form>
                    )}
                </Formik>
            </Col>
        </Row>
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
        { red: whatQuestion },
        { setSubmitting, resetForm }
    ) => {
        setSubmitting(true)
        dispatch(
            addNewQuestion({
                type: 'red',
                question: whatQuestion,
                setSubmitting,
                resetForm,
            })
        )
    }
    const handleWhatDoingQuestionSubmission = (
        { yellow: whatDoingQuestion },
        { setSubmitting, resetForm }
    ) => {
        setSubmitting(true)
        return dispatch(
            addNewQuestion({
                type: 'yellow',
                question: whatDoingQuestion,
                setSubmitting,
                resetForm,
            })
        )
    }
    const handleWhoQuestionSubmission = (
        { green: whoQuestion },
        { setSubmitting, resetForm }
    ) => {
        setSubmitting(true)
        return dispatch(
            addNewQuestion({
                type: 'green',
                question: whoQuestion,
                setSubmitting,
                resetForm,
            })
        )
    }

    const handleFileChange = (e, type) => {
        if (e.target.files[0]) {
            // todo
            dispatch(setImageUrl({ file: e.target.files[0], type }))
        }
    }

    return (
        <>
            <Row fullWidth style={{ margin: '2vh 0' }} textAlign="center">
                <Col lg={12}>
                    <h3>
                        Tip: While adding questions you can optionally add an
                        image to the question. <br /> To do so click on the
                        choose file button.
                    </h3>
                </Col>
            </Row>
            <Row fullWidth>
                {red && (
                    <Col offset={1} lg={3}>
                        <h2>What questions - red tiles</h2>
                        {Object.values(red).map(
                            ({ question, id, type, imageUrl }, _, array) => (
                                <Row key={id} fullWidth>
                                    <Col lg={8}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={2}>
                                        {imageUrl && (
                                            <ViewImageAnchor
                                                href={imageUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                image
                                            </ViewImageAnchor>
                                        )}
                                    </Col>
                                    <Col lg={2}>
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
                            onFileChange={handleFileChange}
                            onSubmit={handleWhatQuestionSubmission}
                            formId="red"
                        />
                    </Col>
                )}
                {yellow && (
                    <Col offset={1} lg={3}>
                        <h2>What doing questions - yellow tiles</h2>
                        {Object.values(yellow).map(
                            ({ question, id, type, imageUrl }, _, array) => (
                                <Row key={id} fullWidth>
                                    {console.log(type)}
                                    <Col lg={8}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={2}>
                                        {imageUrl && (
                                            <ViewImageAnchor
                                                href={imageUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                image
                                            </ViewImageAnchor>
                                        )}
                                    </Col>
                                    <Col lg={2}>
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
                            onFileChange={handleFileChange}
                            onSubmit={handleWhatDoingQuestionSubmission}
                            formId="yellow"
                        />
                    </Col>
                )}
                {green && (
                    <Col offset={1} lg={3}>
                        <h2>Who questions - green tiles</h2>
                        {Object.values(green).map(
                            ({ question, id, type, imageUrl }, _, array) => (
                                <Row key={id} fullWidth>
                                    <Col lg={8}>
                                        <h3>{question}</h3>
                                    </Col>
                                    <Col lg={2}>
                                        {imageUrl && (
                                            <ViewImageAnchor
                                                href={imageUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                image
                                            </ViewImageAnchor>
                                        )}
                                    </Col>
                                    <Col lg={2}>
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
                            onFileChange={handleFileChange}
                            onSubmit={handleWhoQuestionSubmission}
                            formId="green"
                        />
                    </Col>
                )}
            </Row>
        </>
    )
}

export default EditQuestions
