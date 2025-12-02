import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

interface OrderSummaryProps {
    subtotal: number;
    tax: number;
    total: number;
    onCheckout: () => void;
}

export const OrderSummary = ({ subtotal, tax, total, onCheckout }: OrderSummaryProps) => {
    const [isChecking, setIsChecking] = useState(false);

    const handleCheckout = () => {
        setIsChecking(true);
        setTimeout(() => {
            onCheckout();
            setIsChecking(false);
        }, 1000);
    };

    return (
        <div className="bg-white p-6 rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-24">
            {/* Header */}
            <div className="border-b-2 border-dashed border-graphite/30 pb-4 mb-4">
                <h2 className="font-handwritten text-2xl font-bold text-graphite">
                    Order Summary
                </h2>
            </div>

            {/* Summary Lines */}
            <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold text-graphite">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Delivery</span>
                    <div className="flex items-center gap-2">
                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold border border-green-700">
                            FREE
                        </span>
                    </div>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Tax (5%)</span>
                    <span className="font-bold text-graphite">₹{tax.toFixed(2)}</span>
                </div>

                <div className="border-t-2 border-dashed border-graphite/30 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                        <span className="font-handwritten text-xl font-bold text-graphite">Total</span>
                        <span className="font-handwritten text-2xl font-bold text-blueHighlight">
                            ₹{total.toFixed(2)}
                        </span>
                    </div>
                </div>
            </div>

            {/* Checkout Button */}
            <Button
                onClick={handleCheckout}
                disabled={isChecking}
                className="w-full bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten text-lg font-bold py-6 transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
                {isChecking ? (
                    <Check className="w-5 h-5 animate-in zoom-in" />
                ) : (
                    <>
                        Proceed to Checkout
                        <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                )}
            </Button>

            {/* Decorative doodle */}
            <div className="mt-6 pt-6 border-t-2 border-dashed border-graphite/30">
                <p className="text-center font-handwritten text-sm text-muted-foreground">
                    → Secure checkout guaranteed
                </p>
            </div>
        </div>
    );
};
