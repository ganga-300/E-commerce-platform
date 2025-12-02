import { DashboardNavbar } from "@/components/DashboardNavbar";
import { Package, Clock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";

const MyOrders = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Load orders from backend
        const fetchOrders = async () => {
            try {
                const response = await orderService.getUserOrders();
                setOrders(response.orders);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const [, setTick] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => setTick(t => t + 1), 60000);
        return () => clearInterval(interval);
    }, []);

    const getOrderStatus = (createdAt: string) => {
        // Ensure the date is treated as UTC if no timezone is specified
        const dateStr = createdAt.endsWith("Z") ? createdAt : `${createdAt}Z`;
        const orderTime = new Date(dateStr).getTime();
        const now = Date.now();
        const diffInMinutes = (now - orderTime) / (1000 * 60);

        if (diffInMinutes >= 25) return "delivered";
        if (diffInMinutes >= 15) return "on-the-way";
        if (diffInMinutes >= 5) return "packed";
        return "confirmed";
    };

    const getStatusBadge = (status: string) => {
        const badges: any = {
            confirmed: { color: "bg-gray-100 text-gray-700 border-gray-700", icon: Clock, label: "Pending" },
            packed: { color: "bg-blue-100 text-blue-700 border-blue-700", icon: Package, label: "Packed" },
            "on-the-way": { color: "bg-orange-100 text-orange-700 border-orange-700", icon: Package, label: "On the Way" },
            delivered: { color: "bg-green-100 text-green-700 border-green-700", icon: CheckCircle, label: "Delivered ⭐" },
        };
        return badges[status] || badges.confirmed;
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar userName={user?.name || "Student"} />

            <main className="container py-8 px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite inline-block relative">
                        My Orders
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in slide-in-from-left duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                    <p className="text-muted-foreground mt-2 font-handwritten text-lg">
                        Your order history
                    </p>
                </div>

                {/* Orders List */}
                {loading ? (
                    <div className="text-center py-16">
                        <div className="text-4xl mb-4">⏳</div>
                        <p className="font-handwritten text-xl text-graphite">Loading your orders...</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📦</div>
                        <h2 className="font-handwritten text-3xl font-bold text-graphite mb-2">
                            No orders yet
                        </h2>
                        <p className="text-muted-foreground font-handwritten text-lg mb-6">
                            Start shopping to see your orders here!
                        </p>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="bg-yellowHighlight text-graphite px-6 py-3 rounded-lg border-2 border-graphite font-handwritten text-lg font-bold hover:translate-x-1 hover:translate-y-1 transition-transform shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        >
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => {
                            const currentStatus = getOrderStatus(order.created_at);
                            const badge = getStatusBadge(currentStatus);
                            const Icon = badge.icon;
                            const itemsCount = order.items_count || order.items?.length || 0;

                            return (
                                <div
                                    key={order.id}
                                    onClick={() => navigate(`/order-tracking/${order.id}`)}
                                    className="group bg-white p-6 rounded-lg border-2 border-graphite cursor-pointer transition-all duration-300 hover:translate-x-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.8)] animate-in slide-in-from-left"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    {/* Torn edge effect */}
                                    <div className="absolute -right-2 top-4 w-4 h-4 bg-[#FDFBF7] rounded-full border-2 border-graphite" />
                                    <div className="absolute -right-2 bottom-4 w-4 h-4 bg-[#FDFBF7] rounded-full border-2 border-graphite" />

                                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="font-handwritten text-xl font-bold text-graphite">
                                                    Order #{order.id.slice(-8)}
                                                </span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${badge.color} flex items-center gap-1`}>
                                                    <Icon className="w-3 h-3" />
                                                    {badge.label}
                                                </span>
                                            </div>

                                            <div className="text-sm text-muted-foreground space-y-1">
                                                <p>
                                                    <span className="font-bold">{itemsCount}</span> item{itemsCount > 1 ? "s" : ""}
                                                </p>
                                                <p className="text-xs">
                                                    {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <p className="text-sm text-muted-foreground">Total</p>
                                                <p className="font-handwritten text-2xl font-bold text-blueHighlight">
                                                    ₹{order.total_amount}
                                                </p>
                                            </div>
                                            <div className="text-2xl group-hover:translate-x-1 transition-transform">
                                                →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
};

export default MyOrders;
