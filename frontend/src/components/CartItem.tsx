import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType } from "@/context/CartContext";
import { useState } from "react";

interface CartItemProps {
    item: CartItemType;
    onUpdateQuantity: (id: number, quantity: number) => void;
    onRemove: (id: number) => void;
}

export const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemove = () => {
        setIsRemoving(true);
        setTimeout(() => onRemove(item.id), 300);
    };

    return (
        <div
            className={`group relative bg-white p-4 rounded-lg border-2 border-graphite mb-4 transition-all duration-300 ${isRemoving ? 'opacity-0 scale-95' : 'hover:-translate-y-1'
                }`}
        >
            {/* Hand-drawn border shadow */}
            <div className="absolute inset-0 border-2 border-graphite rounded-lg translate-x-1 translate-y-1 -z-10 transition-all group-hover:translate-x-2 group-hover:translate-y-2" />

            <div className="flex gap-4 items-center">
                {/* Image */}
                <div
                    className="w-24 h-24 rounded-md border-2 border-dashed border-graphite/50 flex-shrink-0 overflow-hidden"
                    style={{ backgroundColor: item.color }}
                >
                    <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover mix-blend-multiply"
                    />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <h3 className="font-handwritten text-xl font-bold text-graphite leading-tight">
                                {item.name}
                            </h3>
                            <div className="inline-block bg-yellowHighlight px-2 py-1 mt-1 transform -rotate-1 border border-graphite/30">
                                <span className="font-handwritten text-xs font-bold text-graphite uppercase">
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-graphite whitespace-nowrap">
                            ₹{item.price.toFixed(2)}
                        </span>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex items-center gap-2 border-2 border-graphite rounded-md overflow-hidden bg-white">
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0 hover:bg-blueHighlight/20 rounded-none border-r-2 border-graphite"
                            >
                                <Minus className="w-4 h-4" />
                            </Button>
                            <span className="font-handwritten font-bold text-lg w-8 text-center">
                                {item.quantity}
                            </span>
                            <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0 hover:bg-blueHighlight/20 rounded-none border-l-2 border-graphite"
                            >
                                <Plus className="w-4 h-4" />
                            </Button>
                        </div>

                        <span className="font-bold text-graphite">
                            = ${(item.price * item.quantity).toFixed(2)}
                        </span>

                        {/* Remove Button */}
                        <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleRemove}
                            className="ml-auto text-destructive hover:bg-destructive/10 group/remove"
                        >
                            <Trash2 className="w-5 h-5 group-hover/remove:animate-wiggle" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
