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
    category?: string
    createdAt?: string
    createdBy?: string
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

export interface QuizFormData {
    title: string
    description: string
    category: string
    questions: {
        question: string
        options: string[]
        correctAnswer: string
    }[]
}

export interface ParsedDocument {
    title?: string
    questions: {
        question: string
        options: string[]
        correctAnswer?: string
    }[]
    errors?: string[]
}
