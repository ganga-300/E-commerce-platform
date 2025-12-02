import { DashboardNavbar } from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Check, Package, Bike, Home, ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";

const OrderTracking = () => {
    const navigate = useNavigate();
    const { orderId } = useParams();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [order, setOrder] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }

        // Fetch order from backend API
        const fetchOrder = async () => {
            try {
                if (!orderId) return;
                const response = await orderService.getOrderDetails(orderId);
                setOrder(response.order);
                updateOrderStatus(response.order.created_at);
            } catch (error) {
                console.error("Error fetching order:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();

        // Update status every minute
        const interval = setInterval(() => {
            if (order) {
                updateOrderStatus(order.created_at);
            }
        }, 60000);

        return () => clearInterval(interval);
    }, [orderId, order?.created_at]);

    const updateOrderStatus = (createdAt: string) => {
        // Ensure the date is treated as UTC if no timezone is specified
        const dateStr = createdAt.endsWith("Z") ? createdAt : `${createdAt}Z`;
        const orderTime = new Date(dateStr).getTime();
        const currentTime = new Date().getTime();
        const diffInMinutes = (currentTime - orderTime) / (1000 * 60);

        if (diffInMinutes >= 25) {
            setCurrentStep(3); // Delivered
        } else if (diffInMinutes >= 15) {
            setCurrentStep(2); // On the Way
        } else if (diffInMinutes >= 5) {
            setCurrentStep(1); // Packed
        } else {
            setCurrentStep(0); // Confirmed
        }
    };

    const steps = [
        { icon: Check, label: "Confirmed", color: "text-green-600" },
        { icon: Package, label: "Packed", color: "text-blue-600" },
        { icon: Bike, label: "On the Way", color: "text-orange-600" },
        { icon: Home, label: "Delivered", color: "text-purple-600" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
                <DashboardNavbar userName={user?.name || "Student"} />
                <div className="container py-16 text-center">
                    <div className="text-4xl mb-4">⏳</div>
                    <p className="font-handwritten text-2xl text-graphite">Loading order details...</p>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
                <DashboardNavbar userName={user?.name || "Student"} />
                <div className="container py-16 text-center">
                    <p className="font-handwritten text-2xl text-graphite">Order not found</p>
                    <Button onClick={() => navigate("/my-orders")} className="mt-4">
                        View My Orders
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar userName={user?.name || "Student"} />

            <main className="container py-8 px-4 max-w-4xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/my-orders")}
                        className="mb-4 font-handwritten hover:bg-transparent group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to My Orders
                    </Button>

                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite inline-block relative">
                        Your Order Status
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in slide-in-from-left duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                    <p className="text-muted-foreground mt-2 font-handwritten text-lg">
                        Order ID: {order.id}
                    </p>
                </div>

                {/* Timeline */}
                <div className="bg-white p-8 md:p-12 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8">
                    <div className="relative">
                        {/* Progress Line */}
                        <div className="absolute top-12 left-0 right-0 h-1 bg-graphite/20" />
                        <div
                            className="absolute top-12 left-0 h-1 bg-blueHighlight transition-all duration-1000 ease-out"
                            style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                        />

                        {/* Steps */}
                        <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4">
                            {steps.map((step, index) => {
                                const Icon = step.icon;
                                const isCompleted = index <= currentStep;
                                const isCurrent = index === currentStep;

                                return (
                                    <div key={index} className="flex flex-col items-center">
                                        <div
                                            className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mb-4 transition-all duration-500 ${isCompleted
                                                ? "border-blueHighlight bg-blueHighlight shadow-lg scale-110"
                                                : "border-graphite/30 bg-white"
                                                } ${isCurrent ? "animate-pulse" : ""}`}
                                        >
                                            <Icon
                                                className={`w-10 h-10 ${isCompleted ? "text-white" : "text-graphite/30"
                                                    }`}
                                            />
                                        </div>

                                        {/* Yellow sticky checkmark */}
                                        {isCompleted && (
                                            <div className="absolute top-0 right-0 bg-yellowHighlight w-8 h-8 rounded-full border-2 border-graphite flex items-center justify-center transform rotate-12 animate-in zoom-in duration-300">
                                                <Check className="w-5 h-5 text-graphite" />
                                            </div>
                                        )}

                                        <span
                                            className={`font-handwritten text-lg font-bold text-center ${isCompleted ? "text-graphite" : "text-graphite/40"
                                                }`}
                                        >
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Delivery Info */}
                <div className="bg-yellowHighlight/30 p-6 rounded-lg border-2 border-graphite transform -rotate-1 mb-8">
                    <p className="font-handwritten text-2xl font-bold text-graphite text-center">
                        🚴 Delivered to your hostel in about 25 mins!
                    </p>
                </div>

                {/* Order Details */}
                <div className="bg-white p-6 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h2 className="font-handwritten text-2xl font-bold text-graphite mb-4 border-b-2 border-dashed border-graphite/30 pb-3">
                        Order Details
                    </h2>

                    <div className="space-y-3">
                        {(() => {
                            // Handle items whether it's a string or already an object
                            const itemsArray = typeof order.items === 'string'
                                ? JSON.parse(order.items)
                                : order.items;

                            return itemsArray && itemsArray.map((item: any, index: number) => (
                                <div key={index} className="flex justify-between items-center">
                                    <div>
                                        <span className="font-handwritten font-bold">{item.name || item.product_name}</span>
                                        <span className="text-sm text-muted-foreground ml-2">x{item.quantity}</span>
                                    </div>
                                    <span className="font-bold">₹{(item.price || item.price_at_purchase) * item.quantity}</span>
                                </div>
                            ));
                        })()}

                        <div className="border-t-2 border-dashed border-graphite/30 pt-3 mt-3">
                            <div className="flex justify-between items-center">
                                <span className="font-handwritten text-xl font-bold">Total</span>
                                <span className="font-handwritten text-2xl font-bold text-blueHighlight">
                                    ₹{order.total_amount || order.total}
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-graphite/20">
                            <p className="text-sm text-muted-foreground">
                                <span className="font-bold">Payment Method:</span> {order.payment_method || order.paymentMethod}
                            </p>
                            <p className="text-sm text-muted-foreground">
                                <span className="font-bold">Order Date:</span> {new Date(order.created_at || order.date).toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default OrderTracking;
