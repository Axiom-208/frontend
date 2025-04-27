import {create} from "zustand"
import {persist} from "zustand/middleware"
import {v4 as uuidv4} from "uuid"
import {Quiz, QuizFormData} from "@/schema/quiz.ts";

interface QuizStore {
    customQuizzes: Quiz[]
    addQuiz: (quizData: QuizFormData) => string
    getQuiz: (id: string) => Quiz | undefined
    getAllQuizzes: () => Quiz[]
}

export const useQuizStore = create<QuizStore>()(
    persist(
        (set, get) => ({
            customQuizzes: [],

            addQuiz: (quizData: QuizFormData) => {
                const id = uuidv4()
                const newQuiz: Quiz = {
                    id,
                    title: quizData.title,
                    description: quizData.description,
                    category: quizData.category,
                    questions: quizData.questions,
                    createdAt: new Date().toISOString(),
                }

                set((state) => ({
                    customQuizzes: [...state.customQuizzes, newQuiz],
                }))

                return id
            },

            getQuiz: (id: string) => {
                return get().customQuizzes.find((quiz) => quiz.id === id)
            },

            getAllQuizzes: () => {
                return get().customQuizzes
            },
        }),
        {
            name: "quiz-storage",
        },
    ),
)
