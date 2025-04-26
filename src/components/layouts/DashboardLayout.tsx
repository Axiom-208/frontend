import Navbar from "@/components/pages/DashboardLayout/Navbar.tsx";
import Footer from "@/components/pages/DashboardLayout/Footer.tsx";
import {Navigate, Outlet} from "react-router";
import {useGetUser} from "@/api/auth/hooks.ts";
import {DashboardContext} from "@/context/dashboard-context.ts";
import {LoaderCircle} from "lucide-react"

function DashboardLayout() {


    const {data: user, isLoading} = useGetUser()

    if (isLoading)
        return (
            <div className="animate-spin">
                <LoaderCircle/>
            </div>
        )

    if (!user)
        return <Navigate to="/auth/login"/>


    return (
        <DashboardContext value={{
            user
        }}>
            <div className="flex flex-col h-screen">
                <Navbar/>
                <main className="flex-1 flex flex-col">
                    <Outlet/>
                </main>
                <Footer/>
            </div>
        </DashboardContext>
    );
}

export default DashboardLayout;