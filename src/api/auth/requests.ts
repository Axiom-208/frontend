import {ENDPOINTS} from "@/api/auth/routes.ts";
import ApiService from "@/api/methods.ts";
import {LogInProps} from "@/api/auth/types.ts";
import {convertToUser, UserResponse} from "@/schema/user.ts";


export async function logIn(props: LogInProps) {
    const endpoint = ENDPOINTS.LOGIN()
    return await ApiService.post<{ username: string }>(endpoint, props)
}

export async function logOut() {
    const endpoint = ENDPOINTS.LOGOUT()
    return await ApiService.post<boolean>(endpoint)
}

export async function getUser() {
    const endpoint = ENDPOINTS.ME()
    const response = await ApiService.get<UserResponse>(endpoint)
    return convertToUser(response)
}