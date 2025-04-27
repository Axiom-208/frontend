import {AxiosRequestConfig, AxiosResponse} from "axios";
import {apiClient, ApiResponse} from "./axios.ts";
import config from "@/config.ts";


class ApiService {

    private readonly prefix: string;

    constructor(prefix?: string) {
        this.prefix = prefix || "";
    }

    private static handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {

        if (!response || typeof response !== "object") {
            console.error("Invalid response format:", response);
            throw new Error("Unexpected response structure from the API.");
        }

        if (config.app.mode === "development") {
            console.debug("Raw API Response:", response);
        }

        const {data, success, error} = response.data;

        if (!success) {
            console.error("API Error:", error?.message || "Unknown error");
            throw new Error(error?.message || "API request failed.");
        }

        // if (data === undefined || data === null) {
        //     console.error("API returned empty data:", response);
        //     throw new Error("API response contains no data.");
        // }

        if (response.data === null || response.data === undefined) {
            console.error("API returned empty data:", response);
            throw new Error("API response contains no data,");
        }

        return data as T;
    }

    async get<T>(url?: string, config?: AxiosRequestConfig): Promise<T> {
        const fullUrl = this.prefix + (url || "");
        const response = await apiClient.get<ApiResponse<T>>(fullUrl, config);
        return ApiService.handleResponse<T>(response);
    }

    async post<T>(url?: string, data?: Record<string, unknown> | FormData, config?: AxiosRequestConfig): Promise<T> {
        const fullUrl = this.prefix + (url || "");
        const response = await apiClient.post<ApiResponse<T>>(fullUrl, data, config);
        return ApiService.handleResponse<T>(response);
    }

    async put<T>(url?: string, data?: Record<string, unknown> | FormData, config?: AxiosRequestConfig): Promise<T> {
        const fullUrl = this.prefix + (url || "");
        const response = await apiClient.put<ApiResponse<T>>(fullUrl, data, config);
        return ApiService.handleResponse<T>(response);
    }

    async del<T>(url?: string, config?: AxiosRequestConfig): Promise<T> {
        const fullUrl = this.prefix + (url || "");
        const response = await apiClient.delete<ApiResponse<T>>(fullUrl, config);
        return ApiService.handleResponse<T>(response);
    }
}

export default ApiService;


