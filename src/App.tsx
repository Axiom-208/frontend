import { Route, Routes } from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Home from './pages/Home.tsx';
import Logout from "@/pages/auth/logout.tsx";
function App() {
    return (
        <div>
            <Routes>
                {/* Public routes with HomeLayout */}
                <Route element={<HomeLayout />}>
                    {/* Landing page */}
                    <Route path="/" element={<Home />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="logout" element={<Logout />} />

                    {/* Auth routes */}
                    <Route path="auth">
                        {/*Nada funciona aq dentro @Delcio */}
                    </Route>
                </Route>
                
                {/* Protected dashboard routes */}
                <Route path="dashboard" element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    {/* Add more dashboard routes here */}
                </Route>
            </Routes>
        </div>
    );
}

export default App;