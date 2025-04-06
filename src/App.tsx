import {Route, Routes} from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import LandingPage from "./pages/Home.tsx";
import LogIn from "./pages/LogIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Logout from "@/pages/auth/logout.tsx";

function App() {
    return (
        <div>
            <Routes>
                {/* Root  */}
                <Route path="/" element={<HomeLayout/>}>
                    <Route path="auth">
                        <Route path="login" element={<LogIn/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="logout" element={<Logout/>}/>
                    </Route>
                    <Route index element={<LandingPage/>}/>
                </Route>
                <Route path="dashboard" element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;