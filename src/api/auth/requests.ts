import {ENDPOINTS} from "@/api/auth/routes.ts";
import ApiService from "@/api/methods.ts";
import {LogInProps, RegisterProps} from "@/api/auth/types.ts";
import {User} from "@/schema/user.ts";


export async function logIn(props: LogInProps) {
    const endpoint = ENDPOINTS.LOGIN()
    return await ApiService.post<{ username: string }>(endpoint, props)
}

export async function register(props: RegisterProps) {
    const endpoint = ENDPOINTS.REGISTER()
    return await ApiService.post<User>(endpoint, props)
}

export async function logOut() {
    const endpoint = ENDPOINTS.LOGOUT()
    return await ApiService.post<boolean>(endpoint)
}

export async function getUser() {
    const endpoint = ENDPOINTS.ME()
    return await ApiService.get<User>(endpoint)
}