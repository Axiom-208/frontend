import { Button } from "@/components/ui/button";
import {Link} from "react-router";

function Navbar() {
    return (
        <header className="bg-gray-900 text-white p-4 shadow-md">
            <div className="container mx-auto h-16 flex items-center justify-between">
                <Link to="" className="text-2xl font-bold text-white hover:text-amber-200 transition duration-200">
                    AXIOM
                </Link>
                
                <nav className="flex items-center justify-between gap-4">
                    <Link to="login">
                        <Button variant="ghost" className="text-white hover:text-amber-200 hover:bg-gray-800">
                            Log In
                        </Button>
                    </Link>
                    <Link to="/signup">
                        <Button variant="secondary" className="bg-amber-200 text-gray-900 hover:bg-amber-300">
                            Sign Up
                        </Button>
                    </Link>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;