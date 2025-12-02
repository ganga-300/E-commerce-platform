import { ShoppingCart, User, Search, LogOut, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import { useCart } from "@/context/CartContext";

interface DashboardNavbarProps {
    userName: string;
    onSearch?: (query: string) => void;
}

export const DashboardNavbar = ({ userName, onSearch }: DashboardNavbarProps) => {
    const navigate = useNavigate();
    const { cartCount } = useCart();
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
        if (onSearch) {
            onSearch(value);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-2 border-dashed border-graphite/20">
            <div className="container flex h-16 items-center justify-between">
                {/* Logo */}
                <Link to="/dashboard" className="flex items-center gap-2 group">
                    <div className="relative">
                        <div className="absolute -inset-1 bg-yellowHighlight rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
                        <span className="relative font-handwritten text-2xl font-bold text-graphite transform group-hover:-rotate-2 transition-transform duration-300">
                            StudyStuff
                        </span>
                    </div>
                </Link>

                {/* Search Bar */}
                <div className="hidden md:flex items-center max-w-md w-full mx-4 relative">
                    <div className={`absolute inset-0 border-2 border-graphite rounded-md transition-all duration-300 ${isSearchFocused ? 'translate-x-1 translate-y-1 bg-blueHighlight/10' : 'translate-x-0 translate-y-0'}`} />
                    <div className="relative w-full bg-background rounded-md border-2 border-graphite overflow-hidden flex items-center">
                        <Search className={`w-4 h-4 ml-3 text-muted-foreground ${isSearchFocused ? 'text-blueHighlight animate-bounce' : ''}`} />
                        <Input
                            placeholder="Search essentials..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            className="border-0 focus-visible:ring-0 font-handwritten text-lg placeholder:text-muted-foreground/70"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    {/* Cart */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="relative group hover:bg-transparent"
                        onClick={() => navigate("/cart")}
                    >
                        <div className="absolute -inset-2 bg-yellowHighlight/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100" />
                        <ShoppingCart className="w-6 h-6 text-graphite relative z-10 group-hover:animate-wiggle" />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-destructive text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full animate-in zoom-in font-handwritten border border-graphite">
                                {cartCount}
                            </span>
                        )}
                    </Button>

                    {/* Profile Dropdown */}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-10 w-10 rounded-full border-2 border-graphite hover:bg-transparent group">
                                <div className="absolute inset-0 bg-blueHighlight/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                                <User className="h-5 w-5 text-graphite group-hover:scale-110 transition-transform" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 font-handwritten border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" align="end">
                            <DropdownMenuLabel>
                                <span className="text-sm text-muted-foreground">Hey,</span>
                                <span className="block text-lg font-bold text-blueHighlight">{userName}</span>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-graphite/20" />
                            <DropdownMenuItem
                                onClick={() => navigate("/my-orders")}
                                className="cursor-pointer focus:bg-yellowHighlight/30"
                            >
                                <Menu className="mr-2 h-4 w-4" />
                                <span>My Orders</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => navigate("/profile")}
                                className="cursor-pointer focus:bg-yellowHighlight/30"
                            >
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-graphite/20" />
                            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10" onClick={handleLogout}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};
