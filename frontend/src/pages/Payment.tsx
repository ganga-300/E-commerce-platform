import { DashboardNavbar } from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { orderService } from "@/services/orderService";
import { useToast } from "@/hooks/use-toast";

const Payment = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { items, cartTotal, clearCart } = useCart();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [selectedMethod, setSelectedMethod] = useState<"upi" | "cod" | null>("upi");
    const [selectedUPI, setSelectedUPI] = useState<"gpay" | "phonepe" | "paytm" | null>("gpay");
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const subtotal = cartTotal;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const toINR = (amount: number) => Math.round(amount * 83);

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            // Get delivery details from localStorage
            const deliveryDetails = JSON.parse(localStorage.getItem("deliveryDetails") || "{}");

            // Create order via API
            const orderData = {
                items: items.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: toINR(item.price),
                })),
                totalAmount: toINR(total),
                paymentMethod: selectedMethod === "upi" ? `UPI (${selectedUPI})` : "Cash on Delivery",
                deliveryDetails: {
                    phone: deliveryDetails.phone || "",
                    collegeBlock: deliveryDetails.collegeBlock || "",
                    roomNumber: deliveryDetails.roomNumber || "",
                    notes: deliveryDetails.notes || "",
                },
            };

            const response = await orderService.createOrder(orderData);

            // Clear cart
            clearCart();
            localStorage.removeItem("deliveryDetails");

            // Navigate to order tracking
            navigate(`/order-tracking/${response.order.id}`);
        } catch (error: any) {
            console.error("Payment error:", error);
            toast({
                title: "Error",
                description: error.message || "Failed to create order. Please try again.",
                variant: "destructive",
            });
            setIsProcessing(false);
        }
    };

    if (items.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar userName={user?.name || "Student"} />

            <main className="container py-8 px-4 max-w-2xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/checkout")}
                        className="mb-4 font-handwritten hover:bg-transparent group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Checkout
                    </Button>

                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite inline-block relative">
                        Choose Payment Method
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in slide-in-from-left duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                </div>

                {/* Payment Options */}
                <div className="bg-white p-8 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                    {/* Spiral binding decoration */}
                    <div className="absolute -left-4 top-8 flex flex-col gap-4">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="w-3 h-3 rounded-full border-2 border-graphite bg-white" />
                        ))}
                    </div>

                    <div className="space-y-4">
                        {/* UPI Option */}
                        <div
                            onClick={() => setSelectedMethod("upi")}
                            className={`p - 6 rounded - lg border - 2 cursor - pointer transition - all ${selectedMethod === "upi"
                                ? "border-blueHighlight bg-blueHighlight/10 shadow-[3px_3px_0px_0px_rgba(59,130,246,0.5)]"
                                : "border-graphite hover:border-blueHighlight/50"
                                } `}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w - 6 h - 6 rounded - full border - 2 ${selectedMethod === "upi" ? "border-blueHighlight bg-blueHighlight" : "border-graphite"
                                        } flex items - center justify - center`}>
                                        {selectedMethod === "upi" && <Check className="w-4 h-4 text-white" />}
                                    </div>
                                    <span className="font-handwritten text-2xl font-bold text-graphite">UPI</span>
                                </div>
                                <span className="text-xs bg-yellowHighlight px-2 py-1 rounded border border-graphite font-bold">
                                    RECOMMENDED
                                </span>
                            </div>

                            {selectedMethod === "upi" && (
                                <div className="grid grid-cols-3 gap-3 mt-4 animate-in slide-in-from-top duration-300">
                                    {[
                                        { id: "gpay", name: "Google Pay", emoji: "🟢" },
                                        { id: "phonepe", name: "PhonePe", emoji: "🟣" },
                                        { id: "paytm", name: "Paytm", emoji: "🔵" },
                                    ].map((upi) => (
                                        <div
                                            key={upi.id}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedUPI(upi.id as any);
                                            }}
                                            className={`p - 4 rounded - md border - 2 cursor - pointer transition - all text - center ${selectedUPI === upi.id
                                                ? "border-blueHighlight bg-blueHighlight/20"
                                                : "border-graphite/30 hover:border-graphite"
                                                } `}
                                        >
                                            <div className="text-3xl mb-2">{upi.emoji}</div>
                                            <span className="text-sm font-bold">{upi.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Cash on Delivery */}
                        <div
                            onClick={() => setSelectedMethod("cod")}
                            className={`p - 6 rounded - lg border - 2 cursor - pointer transition - all ${selectedMethod === "cod"
                                ? "border-blueHighlight bg-blueHighlight/10 shadow-[3px_3px_0px_0px_rgba(59,130,246,0.5)]"
                                : "border-graphite hover:border-blueHighlight/50"
                                } `}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w - 6 h - 6 rounded - full border - 2 ${selectedMethod === "cod" ? "border-blueHighlight bg-blueHighlight" : "border-graphite"
                                    } flex items - center justify - center`}>
                                    {selectedMethod === "cod" && <Check className="w-4 h-4 text-white" />}
                                </div>
                                <span className="font-handwritten text-2xl font-bold text-graphite">Cash on Delivery</span>
                                <span className="text-2xl ml-auto">💵</span>
                            </div>
                        </div>

                        {/* Card (Disabled) */}
                        <div className="p-6 rounded-lg border-2 border-graphite/30 bg-gray-50 opacity-50 cursor-not-allowed">
                            <div className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full border-2 border-graphite/30" />
                                <span className="font-handwritten text-2xl font-bold text-graphite/50">Credit/Debit Card</span>
                                <span className="text-xs bg-gray-200 px-2 py-1 rounded border border-graphite/30 ml-auto">
                                    COMING SOON
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pay Button */}
                <Button
                    onClick={handlePayment}
                    disabled={!selectedMethod || isProcessing}
                    className="w-full bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten text-2xl font-bold py-8 transition-all hover:translate-x-1 hover:translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isProcessing ? (
                        <>
                            <Loader2 className="w-6 h-6 mr-2 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        <>
                            Pay ₹{toINR(total)}
                            <span className="ml-2">💳</span>
                        </>
                    )}
                </Button>

                {/* Security Note */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground font-handwritten">
                        🔒 Your payment is secure and encrypted
                    </p>
                </div>
            </main>
        </div>
    );
};

export default Payment;
