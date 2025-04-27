import {api} from "@/api";

const baseRoute = "/decks"


export const flashcardDecksApi = {
    getUserDecks: async () => await api.get(`${baseRoute}/user`)
}