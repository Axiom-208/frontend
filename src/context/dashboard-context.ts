import {User} from "@/schema/user.ts";
import {createContext, useContext} from "react";

export type DashboardContextProps = {
    user: User
}

export const DashboardContext = createContext<DashboardContextProps | undefined>(undefined)

export function useDashboardContext() {

    const context = useContext(DashboardContext)

    if (!context)
        throw new Error("useDashboardContext must be used within DashboardContext")

    return context

}

