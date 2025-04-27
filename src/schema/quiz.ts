// Define core types for the application
export interface Question {
    question: string
    options: string[]
    correctAnswer: string
}

export interface Quiz {
    id: string
    title: string
    description: string
    questions: Question[]
}

export interface QuizCategory {
    id: string
    title: string
    description: string
    quizzes: {
        id: string
        title: string
        questionCount: number
    }[]
}

export interface QuizResult {
    correct: number
    total: number
}
