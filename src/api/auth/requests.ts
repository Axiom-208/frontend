import {ENDPOINTS} from "@/api/auth/routes.ts";
import {LogInProps, RegisterProps} from "@/api/auth/types.ts";
import {User} from "@/schema/user.ts";
import {api} from "@/api";


export async function logIn(props: LogInProps) {
    const endpoint = ENDPOINTS.LOGIN()
    return await api.post<{ username: string }>(endpoint, props)
}

export async function register(props: RegisterProps) {
    const endpoint = ENDPOINTS.REGISTER()
    return await api.post<User>(endpoint, props)
}

export async function logOut() {
    const endpoint = ENDPOINTS.LOGOUT()
    return await api.post<boolean>(endpoint)
}

export async function getUser() {
    const endpoint = ENDPOINTS.ME()
    return await api.get<User>(endpoint)
}