import {useQuery} from "@tanstack/react-query";
import {flashcardDecksApi} from "@/api/decks/endpoints.ts";

export function useGetUserFlashcardDecks() {
    const queryKey = ["decks", "user"]
    return useQuery({
        queryKey,
        queryFn: () => flashcardDecksApi.getUserDecks(),
        retry: false,
        staleTime: 5 * 60 * 1000
    })
}