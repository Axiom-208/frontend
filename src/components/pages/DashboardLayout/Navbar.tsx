import { useState } from "react";
import { Link, NavLink } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { DropdownMenuContent, DropdownMenuTrigger, DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardNavbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-sm sticky top-0 left-0 w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="" className="text-2xl font-bold text-blue-900">
                        Axiom
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                        {/* Keep existing dropdown menu but style it to match home page */}
                        <DropdownMenu>
                            <DropdownMenuTrigger className="rounded-full" asChild>
                                <Button variant="ghost" className="flex items-center space-x-2 text-blue-900 hover:text-pink-500">
                                    <Avatar className="w-8 h-8 bg-yellow-200 text-blue-900">
                                        <AvatarFallback>JD</AvatarFallback>
                                    </Avatar>
                                    <span>John Doe</span>
                                    <ChevronDown size={16} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white border border-yellow-100">
                                <DropdownMenuItem asChild className="hover:bg-yellow-50 text-blue-900 focus:bg-yellow-50 focus:text-pink-500">
                                    <Link to="/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="hover:bg-yellow-50 text-blue-900 focus:bg-yellow-50 focus:text-pink-500">
                                    <Link to="/settings">Settings</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild className="hover:bg-yellow-50 text-blue-900 focus:bg-yellow-50 focus:text-pink-500">
                                    <Link to="/login">Logout</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Button 
                        className="md:hidden text-blue-900 hover:text-pink-500" 
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
                    </Button>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white border-t border-yellow-100">
                    <div className="px-4 py-2 space-y-2">
                        <NavLink to="" className="block py-2 text-blue-900 hover:text-pink-500">
                            Home
                        </NavLink>
                        <NavLink to="reports" className="block py-2 text-blue-900 hover:text-pink-500">
                            Reports
                        </NavLink>
                        <NavLink to="settings" className="block py-2 text-blue-900 hover:text-pink-500">
                            Settings
                        </NavLink>
                        <div className="border-t border-yellow-100 pt-2">
                            <NavLink to="/profile" className="block py-2 text-blue-900 hover:text-pink-500">
                                Profile
                            </NavLink>
                            <NavLink to="login" className="block py-2 text-pink-500 hover:text-pink-600">
                                Logout
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}