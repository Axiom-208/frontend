const path: string = "/auth"

export const ENDPOINTS = {
    LOGIN: (): string => `${path}/login`,
    LOGOUT: (): string => `${path}/logout`,
    ME: (): string => `${path}/me`,
    REGISTER: (): string => `${path}/register`,
}