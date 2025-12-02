import { useState, useEffect } from "react";
import { DashboardNavbar } from "@/components/DashboardNavbar";
import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";
import { FilterSidebar } from "@/components/FilterSidebar";
import { useToast } from "@/hooks/use-toast";
import { ShoppingBasket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { products as ALL_PRODUCTS, Product } from "@/data/products";

const CATEGORIES = ["Notebooks", "Pens & Markers", "Desk Accessories", "Organization", "Bags", "Art Supplies"];

const Dashboard = () => {
    const { toast } = useToast();
    const { addToCart } = useCart();
    const [user, setUser] = useState<{ name: string } | null>(null);
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [products, setProducts] = useState(ALL_PRODUCTS);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        // Load user from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleAddToCart = (product: Product, quantity: number = 1) => {
        for (let i = 0; i < quantity; i++) {
            addToCart(product);
        }

        toast({
            description: (
                <div className="flex items-center gap-2">
                    <ShoppingBasket className="w-5 h-5 text-blueHighlight" />
                    <span className="font-handwritten font-bold text-lg">
                        Added {quantity} {quantity > 1 ? "items" : "item"} to cart!
                    </span>
                </div>
            ),
            className: "bg-yellowHighlight border-2 border-graphite font-handwritten",
            duration: 2000,
        });
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    // Filter products
    useEffect(() => {
        let filtered = ALL_PRODUCTS;

        // Filter by search query
        if (searchQuery.trim()) {
            filtered = filtered.filter((p) =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Filter by categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((p) => selectedCategories.includes(p.category));
        }

        // Filter by price range
        filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

        setProducts(filtered);
    }, [selectedCategories, priceRange, searchQuery]);

    return (
        <div className="min-h-screen bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]">
            <DashboardNavbar
                userName={user?.name || "Student"}
                onSearch={setSearchQuery}
            />

            <main className="container py-8 px-4">
                {/* Greeting */}
                <div className="mb-12 text-center relative">
                    <h1 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-2 inline-block relative">
                        Hey, {user?.name?.split(" ")[0] || "Student"}!
                        <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                            <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                        </svg>
                    </h1>
                    <p className="text-muted-foreground font-handwritten text-xl mt-4">
                        Ready to grab your study gear? 📚✨
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <FilterSidebar
                        categories={CATEGORIES}
                        selectedCategories={selectedCategories}
                        onCategoryChange={handleCategoryChange}
                        priceRange={priceRange}
                        onPriceChange={setPriceRange}
                    />

                    {/* Product Grid */}
                    <div className="flex-1">
                        {/* Search Results Header */}
                        {searchQuery && (
                            <div className="mb-6 p-4 bg-blueHighlight/10 rounded-lg border-2 border-blueHighlight">
                                <p className="font-handwritten text-lg text-graphite">
                                    🔍 Showing results for: <span className="font-bold">"{searchQuery}"</span>
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        ({products.length} {products.length === 1 ? 'item' : 'items'} found)
                                    </span>
                                </p>
                                <Button
                                    onClick={() => setSearchQuery("")}
                                    variant="link"
                                    className="text-blueHighlight hover:underline p-0 h-auto font-handwritten"
                                >
                                    Clear search
                                </Button>
                            </div>
                        )}

                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAddToCart={() => handleAddToCart(product, 1)}
                                    onViewDetails={() => setSelectedProduct(product)}
                                />
                            ))}
                        </div>

                        {products.length === 0 && (
                            <div className="text-center py-12">
                                <p className="font-handwritten text-2xl text-muted-foreground">
                                    No essentials found matching your filters...
                                </p>
                                <Button
                                    variant="link"
                                    onClick={() => {
                                        setSelectedCategories([]);
                                        setPriceRange([0, 1000]);
                                    }}
                                    className="mt-4 text-blueHighlight font-bold"
                                >
                                    Clear all filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* Product Modal */}
            {selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={() => setSelectedProduct(null)}
                    onAddToCart={handleAddToCart}
                />
            )}
        </div>
    );
};

export default Dashboard;
