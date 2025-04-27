import {Route, Routes} from "react-router";
import HomeLayout from "./components/layouts/HomeLayout.tsx";
import LogIn from "./pages/auth/LogIn.tsx";
import SignUp from "./pages/auth/SignUp.tsx";
import DashboardLayout from "@/components/layouts/DashboardLayout.tsx";
import Dashboard from "@/pages/Dashboard.tsx";
import Home from './pages/Home.tsx';
import Logout from "@/pages/auth/logout.tsx";
import QuizPage from "@/pages/dashboard/quiz/single-quiz.tsx";
import ResultsPage from "@/pages/dashboard/quiz/quiz-result.tsx";

function App() {
    return (
        <div>
            <Routes>
                {/* Public routes with HomeLayout */}
                <Route element={<HomeLayout/>}>
                    {/* Landing page */}
                    <Route path="/" element={<Home/>}/>


                    {/* Auth routes */}
                    <Route path="auth">
                        <Route path="signup" element={<SignUp/>}/>
                        <Route path="login" element={<LogIn/>}/>
                        <Route path="logout" element={<Logout/>}/>
                    </Route>
                </Route>

                {/* Protected dashboard routes */}
                <Route path="dashboard" element={<DashboardLayout/>}>
                    <Route index element={<Dashboard/>}/>
                    <Route path="quiz">
                        <Route path=":quizId">
                            <Route index element={<QuizPage/>}/>
                            <Route path="results" element={<ResultsPage/>}/>
                        </Route>
                    </Route>

                </Route>
            </Routes>
        </div>
    );
}

export default App;