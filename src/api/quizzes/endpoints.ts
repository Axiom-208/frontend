import {api} from "@/api";

const baseRoute = "/quizzes"


export const quizzesApi = {
    getUserQuizzes: async () => await api.get(`${baseRoute}/user`)
}