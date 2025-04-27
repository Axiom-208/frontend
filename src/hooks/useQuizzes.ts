import {useQuery} from "@tanstack/react-query";
import {quizzesApi} from "@/api/quizzes/endpoints.ts";


export function useGetUserQuizzes() {
    const queryKey = ["quizzes", "user"]
    return useQuery({
        queryKey,
        queryFn: () => quizzesApi.getUserQuizzes(),
        retry: false,
        staleTime: 5 * 60 * 1000
    })
}