import {LogInProps} from "@/api/auth/types.ts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {getUser, logIn, logOut} from "@/api/auth/requests.ts";

export function useLogIn(props: LogInProps) {

    return useMutation({
        mutationFn: () => logIn(props),
        onSuccess: (data) => {
            return data
        },
        onError: (err) => {
            console.log(err)
        }
    })
}

export function useLogOut() {

    return useMutation({

        mutationFn: () => logOut(),
        onSuccess: (data) => {
            return data
        },
        onError: (err) => {
            console.log(err)
        }


    })

}


export function useGetUser() {

    const queryKey = ["useGetUser"]

    return useQuery({
        queryKey,
        queryFn: () => getUser()
            .then(data => data),
    })

}