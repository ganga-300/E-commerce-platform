import { Product } from "@/data/products";

interface ProductCardProps {
    product: Product;
    onAddToCart: () => void;
    onViewDetails: () => void;
}

export const ProductCard = ({ product, onAddToCart, onViewDetails }: ProductCardProps) => {
    return (
        <div className="group bg-white rounded-lg border-2 border-graphite shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            {/* Product Image - Clickable */}
            <div
                className="relative h-48 overflow-hidden cursor-pointer"
                onClick={onViewDetails}
            >
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:rotate-2"
                />
                {/* Doodle corner decoration */}
                <div className="absolute top-2 right-2 w-8 h-8 bg-yellowHighlight rounded-full border-2 border-graphite flex items-center justify-center text-xs font-bold transform rotate-12 group-hover:rotate-45 transition-transform">
                    ✨
                </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
                {/* Category Sticky Label */}
                <div className="inline-block bg-yellowHighlight px-3 py-1 rounded-md border-2 border-graphite transform -rotate-1 mb-3 group-hover:rotate-1 group-hover:scale-105 transition-all">
                    <span className="font-handwritten text-xs font-bold text-graphite">{product.category}</span>
                </div>

                {/* Product Name - Clickable */}
                <h3
                    className="font-handwritten text-xl font-bold text-graphite mb-2 cursor-pointer hover:text-blueHighlight transition-colors"
                    onClick={onViewDetails}
                >
                    {product.name}
                </h3>

                {/* Description Preview */}
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {product.description[0]}
                </p>

                {/* Price and Add Button */}
                <div className="flex items-center justify-between">
                    <span className="font-handwritten text-2xl font-bold text-blueHighlight">
                        ₹{product.price}
                    </span>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart();
                        }}
                        className="w-10 h-10 bg-green-200 rounded-full border-2 border-graphite hover:bg-green-300 transition-all hover:scale-110 hover:rotate-12 flex items-center justify-center font-bold text-xl text-graphite shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                        +
                    </button>
                </div>
            </div>

            {/* Hand-drawn border effect */}
            <div className="absolute inset-0 border-2 border-graphite rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
    );
};
