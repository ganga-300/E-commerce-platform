import { DashboardNavbar } from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Edit2, Save, LogOut, Moon, Sun, Package } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { orderService } from "@/services/orderService";

const Profile = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        university: "",
        collegeBlock: "",
        roomNumber: "",
    });

    useEffect(() => {
        // Load user data
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setFormData({
                name: userData.name || "",
                email: userData.email || "",
                phone: userData.phone || "",
                university: userData.university || "Rishihood University",
                collegeBlock: userData.college_block || "",
                roomNumber: userData.room_number || "",
            });
        }

        // Load dark mode preference
        const darkMode = localStorage.getItem("darkMode") === "true";
        setIsDarkMode(darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
        }

        // Load recent orders
        fetchRecentOrders();
    }, []);

    const fetchRecentOrders = async () => {
        try {
            const response = await orderService.getUserOrders();
            setRecentOrders(response.orders.slice(0, 3));
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        // Update user in localStorage
        const updatedUser = { ...user, ...formData };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setIsEditing(false);

        toast({
            description: (
                <div className="flex items-center gap-2">
                    <span className="text-2xl">✓</span>
                    <span className="font-handwritten font-bold text-lg">Profile updated!</span>
                </div>
            ),
            className: "bg-green-200 border-2 border-graphite font-handwritten",
            duration: 2000,
        });
    };

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem("darkMode", String(newMode));

        if (newMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            confirmed: { label: "Confirmed", color: "bg-green-200 text-green-800 border-green-800" },
            packed: { label: "Packed", color: "bg-blue-200 text-blue-800 border-blue-800" },
            "on-the-way": { label: "On the Way", color: "bg-orange-200 text-orange-800 border-orange-800" },
            delivered: { label: "Delivered", color: "bg-purple-200 text-purple-800 border-purple-800" },
        };
        return badges[status] || badges.confirmed;
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1a1a1a] transition-colors duration-500">
                <DashboardNavbar userName="Student" />
                <div className="container py-16 text-center">
                    <p className="font-handwritten text-2xl text-graphite dark:text-white">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] dark:bg-[#1a1a1a] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] dark:bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] transition-colors duration-500">
            <DashboardNavbar userName={user.name} />

            <main className="container py-8 px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-12 text-center animate-in slide-in-from-top duration-500">
                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite dark:text-white mb-2 inline-block relative">
                        Your Profile
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in draw-in duration-1000" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                    <p className="text-muted-foreground dark:text-gray-400 font-handwritten text-xl mt-4">
                        Manage your info & preferences ✏️
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - User Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* User Details Card */}
                        <div className="bg-white dark:bg-[#2a2a2a] p-6 md:p-8 rounded-lg border-2 border-graphite dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-in slide-in-from-left duration-700">
                            {/* Torn edge effect */}
                            <div className="absolute -right-2 top-8 w-4 h-4 bg-[#FDFBF7] dark:bg-[#2a2a2a] rounded-full border-2 border-graphite dark:border-white" />
                            <div className="absolute -right-2 bottom-8 w-4 h-4 bg-[#FDFBF7] dark:bg-[#2a2a2a] rounded-full border-2 border-graphite dark:border-white" />

                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-handwritten text-2xl font-bold text-graphite dark:text-white">
                                    👤 Personal Details
                                </h2>
                                {!isEditing && (
                                    <Button
                                        onClick={() => setIsEditing(true)}
                                        className="bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten font-bold transform -rotate-1 hover:rotate-0 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                    >
                                        <Edit2 className="w-4 h-4 mr-2" />
                                        Edit
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-4">
                                {/* Name */}
                                <div>
                                    <Label className="font-handwritten text-lg text-graphite dark:text-white">Full Name</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            className={`font-handwritten text-lg border-2 border-graphite dark:border-white dark:bg-[#1a1a1a] dark:text-white ${isEditing ? "bg-white dark:bg-[#1a1a1a] cursor-text" : "bg-gray-50 dark:bg-[#2a2a2a] cursor-not-allowed"
                                                }`}
                                        />
                                        {isEditing && <Edit2 className="absolute right-3 top-3 w-4 h-4 text-blueHighlight animate-pulse" />}
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <Label className="font-handwritten text-lg text-graphite dark:text-white">Email</Label>
                                    <Input
                                        value={formData.email}
                                        disabled
                                        className="font-handwritten text-lg border-2 border-graphite/30 dark:border-white/30 bg-gray-50 dark:bg-[#2a2a2a] dark:text-gray-400 cursor-not-allowed mt-1"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <Label className="font-handwritten text-lg text-graphite dark:text-white">Phone Number</Label>
                                    <div className="relative mt-1">
                                        <Input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            disabled={!isEditing}
                                            placeholder="Enter phone number"
                                            className={`font-handwritten text-lg border-2 border-graphite dark:border-white dark:bg-[#1a1a1a] dark:text-white ${isEditing ? "bg-white dark:bg-[#1a1a1a] cursor-text" : "bg-gray-50 dark:bg-[#2a2a2a] cursor-not-allowed"
                                                }`}
                                        />
                                        {isEditing && <Edit2 className="absolute right-3 top-3 w-4 h-4 text-blueHighlight animate-pulse" />}
                                    </div>
                                </div>

                                {/* University */}
                                <div>
                                    <Label className="font-handwritten text-lg text-graphite dark:text-white">University</Label>
                                    <Input
                                        value={formData.university}
                                        disabled
                                        className="font-handwritten text-lg border-2 border-graphite/30 dark:border-white/30 bg-gray-50 dark:bg-[#2a2a2a] dark:text-gray-400 cursor-not-allowed mt-1"
                                    />
                                </div>

                                {/* Address */}
                                <div className="pt-4 border-t-2 border-dashed border-graphite/30 dark:border-white/30">
                                    <h3 className="font-handwritten text-xl font-bold text-graphite dark:text-white mb-3">
                                        📍 Default Delivery Address
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="font-handwritten text-graphite dark:text-white">Hostel Block</Label>
                                            <div className="relative mt-1">
                                                <Input
                                                    name="collegeBlock"
                                                    value={formData.collegeBlock}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="e.g., Block A"
                                                    className={`font-handwritten border-2 border-graphite dark:border-white dark:bg-[#1a1a1a] dark:text-white ${isEditing ? "bg-white dark:bg-[#1a1a1a] cursor-text" : "bg-gray-50 dark:bg-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                                />
                                                {isEditing && <Edit2 className="absolute right-2 top-2 w-3 h-3 text-blueHighlight animate-pulse" />}
                                            </div>
                                        </div>
                                        <div>
                                            <Label className="font-handwritten text-graphite dark:text-white">Room Number</Label>
                                            <div className="relative mt-1">
                                                <Input
                                                    name="roomNumber"
                                                    value={formData.roomNumber}
                                                    onChange={handleChange}
                                                    disabled={!isEditing}
                                                    placeholder="e.g., 101"
                                                    className={`font-handwritten border-2 border-graphite dark:border-white dark:bg-[#1a1a1a] dark:text-white ${isEditing ? "bg-white dark:bg-[#1a1a1a] cursor-text" : "bg-gray-50 dark:bg-[#2a2a2a] cursor-not-allowed"
                                                        }`}
                                                />
                                                {isEditing && <Edit2 className="absolute right-2 top-2 w-3 h-3 text-blueHighlight animate-pulse" />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                {isEditing && (
                                    <div className="flex gap-3 pt-4">
                                        <Button
                                            onClick={handleSave}
                                            className="flex-1 bg-green-200 text-green-800 hover:bg-green-300 border-2 border-green-800 font-handwritten text-xl font-bold py-6 transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,100,0,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(0,100,0,0.5)] animate-in zoom-in"
                                        >
                                            <Save className="w-5 h-5 mr-2" />
                                            Save Changes
                                        </Button>
                                        <Button
                                            onClick={() => setIsEditing(false)}
                                            variant="outline"
                                            className="border-2 border-graphite dark:border-white font-handwritten font-bold dark:text-white"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Recent Orders Preview */}
                        <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg border-2 border-graphite dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-in slide-in-from-left duration-700" style={{ animationDelay: "100ms" }}>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-handwritten text-2xl font-bold text-graphite dark:text-white">
                                    📦 Recent Orders
                                </h2>
                                <Button
                                    onClick={() => navigate("/my-orders")}
                                    variant="link"
                                    className="font-handwritten text-blueHighlight dark:text-blue-400 hover:underline"
                                >
                                    View All →
                                </Button>
                            </div>

                            {recentOrders.length > 0 ? (
                                <div className="space-y-3">
                                    {recentOrders.map((order, index) => {
                                        const badge = getStatusBadge(order.status);
                                        return (
                                            <div
                                                key={order.id}
                                                onClick={() => navigate(`/order-tracking/${order.id}`)}
                                                className="p-4 bg-[#FDFBF7] dark:bg-[#1a1a1a] rounded border-2 border-graphite/30 dark:border-white/30 cursor-pointer hover:border-blueHighlight dark:hover:border-blue-400 transition-all hover:translate-x-1 transform -rotate-1 hover:rotate-0"
                                                style={{ animationDelay: `${index * 50}ms` }}
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <span className="font-handwritten font-bold text-graphite dark:text-white">
                                                            Order #{order.id.slice(-8)}
                                                        </span>
                                                        <p className="text-sm text-muted-foreground dark:text-gray-400">
                                                            {order.items_count || 0} items • ₹{order.total_amount}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${badge.color}`}>
                                                        {badge.label}
                                                    </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Package className="w-12 h-12 mx-auto text-muted-foreground dark:text-gray-400 mb-2" />
                                    <p className="font-handwritten text-lg text-muted-foreground dark:text-gray-400">
                                        No orders yet
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column - Settings */}
                    <div className="space-y-6">
                        {/* Dark Mode Toggle */}
                        <div className="bg-white dark:bg-[#2a2a2a] p-6 rounded-lg border-2 border-graphite dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-in slide-in-from-right duration-700">
                            <h2 className="font-handwritten text-2xl font-bold text-graphite dark:text-white mb-4">
                                🌙 Theme
                            </h2>
                            <div className="flex items-center justify-between p-4 bg-[#FDFBF7] dark:bg-[#1a1a1a] rounded border-2 border-dashed border-graphite/30 dark:border-white/30">
                                <div className="flex items-center gap-3">
                                    {isDarkMode ? (
                                        <Moon className="w-6 h-6 text-blueHighlight dark:text-blue-400" />
                                    ) : (
                                        <Sun className="w-6 h-6 text-orange-500" />
                                    )}
                                    <span className="font-handwritten font-bold text-graphite dark:text-white">
                                        {isDarkMode ? "Dark Mode" : "Light Mode"}
                                    </span>
                                </div>
                                <Switch
                                    checked={isDarkMode}
                                    onCheckedChange={toggleDarkMode}
                                    className="data-[state=checked]:bg-blueHighlight"
                                />
                            </div>
                            <p className="text-sm text-muted-foreground dark:text-gray-400 mt-3 font-handwritten">
                                {isDarkMode
                                    ? "Switch to notebook paper theme"
                                    : "Switch to midnight chalkboard theme"}
                            </p>
                        </div>

                        {/* Logout Button */}
                        <div className="bg-pink-100 dark:bg-red-900/30 p-6 rounded-lg border-2 border-graphite dark:border-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-in slide-in-from-right duration-700" style={{ animationDelay: "100ms" }}>
                            <h2 className="font-handwritten text-2xl font-bold text-graphite dark:text-white mb-4">
                                🔐 Account
                            </h2>
                            <Button
                                onClick={handleLogout}
                                className="w-full bg-destructive text-white hover:bg-destructive/90 border-2 border-graphite dark:border-white font-handwritten text-xl font-bold py-6 transition-all hover:scale-105 hover:rotate-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)] animate-on-hover"
                            >
                                <LogOut className="w-5 h-5 mr-2" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Profile;
