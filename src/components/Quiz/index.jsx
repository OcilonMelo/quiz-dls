import React, { useState } from 'react'
import { QuestionAnswer } from '../QuestionAnswer'
import { Result } from '../Result'
import { ProgressBar } from '../ProgressBar'

import S from './styles.module.scss'

const QUESTIONS = [
    {
        id: 1,
        question: 'Qual é o meu nome?',
        answers: ['Miguel', 'Luis', 'Manoel', 'Ana'],
        correctAnswer: 'Manoel',
    },
    {
        id: 2,
        question: 'Qual minha idade?',
        answers: ['12', '2', '23', '32'],
        correctAnswer: '23',
    },
    {
        id: 3,
        question: 'O que eu sou?',
        answers: ['Desenvolvedor', 'Médico', 'Eletricista', 'Jogador de Futebol'],
        correctAnswer: 'Desenvolvedor',
    }
]

export function Quiz() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [isTakingQuiz, setIsTakingQuiz] = useState(true)
    const [isCurrentQuestionAnswered, setIsCurrentQuestionAnswered] = useState(false)
    const [correctAnswersCount, setCorrectAnswersCount] = useState(0)

    const handleNextQuestion = () => {
        if (currentQuestionIndex + 1 < QUESTIONS.length) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
        } else {
            setIsTakingQuiz(false)
        }

        setIsCurrentQuestionAnswered(false)
    }

    const handleTryAgain = () => {
        setIsTakingQuiz(true)
        setCurrentQuestionIndex (0)
        setCorrectAnswersCount (0)
    }

const handleAnswerQuestion = (event, question, userAnswer) => {
    const isCorrectAnswer = question.correctAnswer === userAnswer

    const resultClassName = isCorrectAnswer ? S.correct : S.incorrect
    event.currentTarget.classList.toggle(resultClassName)
}

    const quizSize = QUESTIONS.length
    const currentQuestion = QUESTIONS[currentQuestionIndex]
    const navigationButtonText = currentQuestionIndex + 1 == quizSize ? 'Ver Resultado' : 'Proxima Pergunta'

    return (
        <div className={S.container}>
            <div className={S.card}>
            {isTakingQuiz ? (                <div className={S.quiz}>
                    <header>
                        <span>PERGUNTA 1/3</span>
                        <p>{currentQuestion.question}</p>
                    </header>

                    <ul className={S.answers}>
                        {currentQuestion.answers.map(answer => (
                            <li key={answer} >
                                <QuestionAnswer 
                                question={currentQuestion}
                                answer={answer}
                                handleAnswerQuestion={handleAnswerQuestion}
                                />
                            </li>
                        ))}
                    </ul>

                    <button className={S.navigationBtn} onClick={handleNextQuestion}>
                        {navigationButtonText}
                    </button>
                </div>
                ) : (
                    <div>
                        <h1>Resultado</h1>
                    </div>
                )}
            </div>
        </div>
    )
}