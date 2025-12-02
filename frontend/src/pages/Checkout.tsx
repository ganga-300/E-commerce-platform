import { DashboardNavbar } from "@/components/DashboardNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Checkout = () => {
    const navigate = useNavigate();
    const { items, cartTotal } = useCart();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        collegeBlock: "",
        roomNumber: "",
        notes: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            setUser(userData);
            setFormData((prev) => ({ ...prev, fullName: userData.name || "" }));
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleProceedToPayment = (e: React.FormEvent) => {
        e.preventDefault();
        // Save delivery details to localStorage
        localStorage.setItem("deliveryDetails", JSON.stringify(formData));
        navigate("/payment");
    };

    const subtotal = cartTotal;
    const tax = subtotal * 0.08;
    const total = subtotal + tax;

    // Convert to INR (assuming 1 USD = 83 INR for mock conversion)
    const toINR = (amount: number) => Math.round(amount * 83);

    if (items.length === 0) {
        navigate("/cart");
        return null;
    }

    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar userName={user?.name || "Student"} />

            <main className="container py-8 px-4 max-w-6xl">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        onClick={() => navigate("/cart")}
                        className="mb-4 font-handwritten hover:bg-transparent group"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                        Back to Cart
                    </Button>

                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite inline-block relative">
                        Checkout
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60 animate-in slide-in-from-left duration-500" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Delivery Details Form */}
                    <div className="flex-1">
                        <div className="bg-white p-8 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="border-b-2 border-dashed border-graphite/30 pb-4 mb-6">
                                <h2 className="font-handwritten text-2xl font-bold text-graphite">
                                    📍 Delivery Details
                                </h2>
                                <p className="text-sm text-muted-foreground mt-1">
                                    Fill in your hostel details for delivery
                                </p>
                            </div>

                            <form onSubmit={handleProceedToPayment} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" className="font-handwritten text-lg text-graphite">
                                        Full Name
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="fullName"
                                            type="text"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            required
                                            className="border-2 border-graphite rounded-md bg-[#FDFBF7] focus:bg-white transition-colors font-handwritten text-lg"
                                            placeholder="Your full name"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-graphite/20" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="font-handwritten text-lg text-graphite">
                                        Phone Number
                                    </Label>
                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            className="border-2 border-graphite rounded-md bg-[#FDFBF7] focus:bg-white transition-colors font-handwritten text-lg"
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                        <div className="absolute bottom-0 left-0 right-0 h-px bg-graphite/20" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="collegeBlock" className="font-handwritten text-lg text-graphite">
                                            College Block
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="collegeBlock"
                                                type="text"
                                                value={formData.collegeBlock}
                                                onChange={handleChange}
                                                required
                                                className="border-2 border-graphite rounded-md bg-[#FDFBF7] focus:bg-white transition-colors font-handwritten text-lg"
                                                placeholder="Block A"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-graphite/20" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="roomNumber" className="font-handwritten text-lg text-graphite">
                                            Room Number
                                        </Label>
                                        <div className="relative">
                                            <Input
                                                id="roomNumber"
                                                type="text"
                                                value={formData.roomNumber}
                                                onChange={handleChange}
                                                required
                                                className="border-2 border-graphite rounded-md bg-[#FDFBF7] focus:bg-white transition-colors font-handwritten text-lg"
                                                placeholder="101"
                                            />
                                            <div className="absolute bottom-0 left-0 right-0 h-px bg-graphite/20" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="notes" className="font-handwritten text-lg text-graphite">
                                        Additional Notes (Optional)
                                    </Label>
                                    <Textarea
                                        id="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        className="border-2 border-graphite rounded-md bg-[#FDFBF7] focus:bg-white transition-colors font-handwritten text-lg min-h-24"
                                        placeholder="Any special instructions..."
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten text-xl font-bold py-6 transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                                >
                                    Proceed to Payment
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:w-96">
                        <div className="bg-white p-6 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-24 transform rotate-1">
                            <div className="border-b-2 border-dashed border-graphite/30 pb-4 mb-4">
                                <h2 className="font-handwritten text-2xl font-bold text-graphite">
                                    Order Summary
                                </h2>
                            </div>

                            {/* Items */}
                            <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-3 items-center">
                                        <div
                                            className="w-16 h-16 rounded border border-graphite/30 flex-shrink-0"
                                            style={{ backgroundColor: item.color }}
                                        >
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover mix-blend-multiply" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-handwritten font-bold text-sm truncate">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <span className="font-bold text-sm">₹{toINR(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Summary */}
                            <div className="space-y-2 border-t-2 border-dashed border-graphite/30 pt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-bold">₹{toINR(subtotal)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Delivery</span>
                                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold border border-green-700">
                                        FREE
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Tax</span>
                                    <span className="font-bold">₹{toINR(tax)}</span>
                                </div>
                                <div className="border-t-2 border-graphite pt-2 mt-2">
                                    <div className="flex justify-between items-center">
                                        <span className="font-handwritten text-xl font-bold">Total</span>
                                        <span className="font-handwritten text-2xl font-bold text-blueHighlight">
                                            ₹{toINR(total)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Checkout;
