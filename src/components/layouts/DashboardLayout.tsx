import Navbar from "@/components/pages/DashboardLayout/Navbar.tsx";
import Footer from "@/components/pages/DashboardLayout/Footer.tsx";
import {Outlet} from "react-router";
import {useGetUser} from "@/api/auth/hooks.ts";


function DashboardLayout() {


    const {data: user} = useGetUser()

    console.log(user)

    return (
        <div className="flex flex-col h-screen">
            <Navbar/>
            <main className="flex-1 flex flex-col">
                <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default DashboardLayout;