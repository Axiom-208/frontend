import {useNavigate} from "react-router";
import {logOut} from "@/api/auth/requests.ts";

function Logout() {

    const navigate = useNavigate();
    logOut()
        .then(() => {
            navigate("/auth/login")
        })
        .catch(() => {
            navigate("/auth/login")
        })

    return (
        <div></div>
    );
}

export default Logout;