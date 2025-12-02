import { X } from "lucide-react";
import { Product } from "@/data/products";
import { useState } from "react";
import { Button } from "./ui/button";

interface ProductModalProps {
    product: Product;
    onClose: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductModal = ({ product, onClose, onAddToCart }: ProductModalProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        onAddToCart(product, quantity);
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-[#FDFBF7] rounded-lg border-2 border-graphite shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in slide-in-from-bottom duration-500"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button - Eraser Icon */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 w-10 h-10 bg-pink-200 rounded-md border-2 border-graphite hover:bg-pink-300 transition-colors flex items-center justify-center group"
                >
                    <X className="w-5 h-5 text-graphite group-hover:rotate-90 transition-transform" />
                </button>

                <div className="p-8">
                    {/* Product Image with Doodle Frame */}
                    <div className="relative mb-6 animate-in zoom-in duration-700">
                        <div className="absolute -inset-2 border-2 border-dashed border-blueHighlight/30 rounded-lg" />
                        <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-80 object-cover rounded-lg border-2 border-graphite"
                        />
                        {/* Doodle stars */}
                        <div className="absolute -top-3 -right-3 text-4xl animate-bounce">⭐</div>
                        <div className="absolute -bottom-3 -left-3 text-3xl animate-pulse">✨</div>
                    </div>

                    {/* Product Name - Handwritten Style */}
                    <h2 className="font-handwritten text-4xl font-bold text-graphite mb-2 relative inline-block">
                        {product.name}
                        <svg className="absolute -bottom-1 left-0 w-full h-2 text-blueHighlight opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" className="animate-in draw-in duration-1000" />
                        </svg>
                    </h2>

                    {/* Category Sticky Label */}
                    <div className="inline-block bg-yellowHighlight px-4 py-2 rounded-md border-2 border-graphite transform -rotate-1 mb-4">
                        <span className="font-handwritten text-sm font-bold text-graphite">{product.category}</span>
                    </div>

                    {/* Description Bullets */}
                    <div className="my-6 space-y-2">
                        {product.description.map((point, index) => (
                            <div key={index} className="flex items-start gap-3 animate-in slide-in-from-left" style={{ animationDelay: `${index * 100}ms` }}>
                                <span className="text-blueHighlight text-xl">✓</span>
                                <p className="text-graphite">{point}</p>
                            </div>
                        ))}
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <span className="font-handwritten text-5xl font-bold text-blueHighlight">
                            ₹{product.price}
                        </span>
                    </div>

                    {/* Quantity Selector */}
                    <div className="flex items-center gap-4 mb-6">
                        <span className="font-handwritten text-lg font-bold text-graphite">Quantity:</span>
                        <div className="flex items-center gap-3 bg-white border-2 border-graphite rounded-lg p-2">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="w-8 h-8 bg-pink-200 rounded border-2 border-graphite hover:bg-pink-300 transition-colors font-bold text-graphite"
                            >
                                −
                            </button>
                            <span className="w-12 text-center font-bold text-xl text-graphite">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="w-8 h-8 bg-green-200 rounded border-2 border-graphite hover:bg-green-300 transition-colors font-bold text-graphite"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Add to Cart Button */}
                    <Button
                        onClick={handleAddToCart}
                        className="w-full bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 border-2 border-graphite font-handwritten text-2xl font-bold py-6 transition-all hover:translate-x-1 hover:translate-y-1 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    >
                        Add {quantity} to Cart 🛒
                    </Button>
                </div>
            </div>
        </div>
    );
};
