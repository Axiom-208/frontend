import {useQuery} from "@tanstack/react-query";
import {notesApi} from "@/api/notes/endpoints.ts";

export function useGetUserNotes() {
    const queryKey = ["notes", "user"]
    return useQuery({
        queryKey,
        queryFn: () => notesApi.getUserNotes(),
        retry: false,
        staleTime: 5 * 60 * 1000
    })
}