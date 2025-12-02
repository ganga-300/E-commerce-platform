import { DashboardNavbar } from "@/components/DashboardNavbar";
import { CartItem } from "@/components/CartItem";
import { OrderSummary } from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

const Cart = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { items, updateQuantity, removeFromCart } = useCart();
    const [user, setUser] = useState<{ name: string } | null>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + tax;

    const handleCheckout = () => {
        navigate("/checkout");
    };


    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar userName={user?.name || "Student"} />

            <main className="container py-8 px-4">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/dashboard")}
                        className="mb-4 font-handwritten hover:bg-transparent group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Shopping
                    </Button>

                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite inline-block relative">
                        Your Cart
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in slide-in-from-left duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                </div>

                {items.length === 0 ? (
                    /* Empty Cart State */
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                        <div className="relative mb-8">
                            <ShoppingBag className="w-32 h-32 text-graphite/20" strokeWidth={1.5} />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl">📓</span>
                            </div>
                        </div>

                        <h2 className="font-handwritten text-3xl font-bold text-graphite mb-2">
                            Nothing here yet...
                        </h2>
                        <p className="text-muted-foreground mb-8 font-handwritten text-lg">
                            Your cart is empty. Let's fill it with study essentials!
                        </p>

                        <Button
                            onClick={() => navigate("/dashboard")}
                            className="bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten text-lg font-bold px-8 py-6 relative group overflow-hidden"
                        >
                            <span className="relative z-10">Browse Products</span>
                            <div className="absolute inset-0 bg-blueHighlight/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                        </Button>
                    </div>
                ) : (
                    /* Cart with Items */
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items */}
                        <div className="flex-1">
                            <div className="space-y-4">
                                {items.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className="animate-in slide-in-from-left duration-300"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <CartItem
                                            item={item}
                                            onUpdateQuantity={updateQuantity}
                                            onRemove={removeFromCart}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-96">
                            <OrderSummary
                                subtotal={subtotal}
                                tax={tax}
                                total={total}
                                onCheckout={handleCheckout}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Cart;
