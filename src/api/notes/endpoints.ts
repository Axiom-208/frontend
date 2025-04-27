import {api} from "@/api";

const baseRoute = "/notes"


export const notesApi = {
    getUserNotes: async () => await api.get(`${baseRoute}/user`)
}