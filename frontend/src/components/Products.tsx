import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

const products = [
  {
    name: "Premium Notebook Set",
    price: "₹149",
    category: "Notebooks",
    image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop",
    description: "High-quality spiral notebooks perfect for all your classes. Includes 3 notebooks with 200 pages each.",
    features: ["3 notebooks", "200 pages each", "Durable covers", "Perforated pages"],
  },
  {
    name: "Gel Pen Collection",
    price: "₹89",
    category: "Writing",
    image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
    description: "Smooth-writing gel pens in assorted colors. Perfect for note-taking and highlighting important points.",
    features: ["12 assorted colors", "0.7mm tip", "Smudge-resistant", "Quick-dry ink"],
  },
  {
    name: "Stationery Essentials Set",
    price: "₹199",
    category: "Bundles",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=400&h=400&fit=crop",
    description: "Complete stationery bundle with everything you need for the semester. Great value pack for students.",
    features: ["Notebooks", "Pens & Pencils", "Sticky Notes", "Clips & Pins"],
  },
  {
    name: "Sticky Note Bundle",
    price: "₹69",
    category: "Organization",
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
    description: "Colorful sticky notes in various sizes for organizing your study materials and marking important pages.",
    features: ["5 different sizes", "Assorted colors", "500 notes total", "Super sticky"],
  },
  {
    name: "Highlighter Set",
    price: "₹120",
    category: "Writing",
    image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop",
    description: "Vibrant highlighters that won't bleed through paper. Essential for effective studying and note-taking.",
    features: ["6 bright colors", "Chisel tip", "No bleed-through", "Pocket clip"],
  },
];

import { useNavigate } from "react-router-dom";

export const Products = () => {
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  return (
    <>
      <Dialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
        <DialogContent className="hand-drawn-border bg-background max-w-2xl">
          {selectedProduct && (
            <>
              <DialogHeader>
                <DialogTitle className="font-handwritten text-3xl text-graphite">
                  {selectedProduct.name}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProduct.category}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                {/* Product image */}
                <div className="aspect-video rounded-lg overflow-hidden hand-drawn-border">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Price and rating */}
                <div className="flex items-center justify-between">
                  <span className="font-handwritten text-4xl font-bold text-graphite">
                    {selectedProduct.price}
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellowHighlight text-yellowHighlight" />
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="font-handwritten text-xl font-bold text-graphite mb-2">
                    Description
                  </h4>
                  <p className="text-muted-foreground">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h4 className="font-handwritten text-xl font-bold text-graphite mb-2">
                    What's Included
                  </h4>
                  <ul className="space-y-2">
                    {selectedProduct.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-graphite" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Add to cart button */}
                <Button
                  className="w-full hand-drawn-border bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 font-medium font-handwritten text-lg transition-all hover:translate-x-1 hover:translate-y-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => navigate("/login")}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
      <section className="py-20 bg-[#FDFBF7] bg-[url('https://www.transparenttextures.com/patterns/notebook.png')]" id="products">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-in slide-in-from-top duration-700">
            <h2 className="font-handwritten text-4xl md:text-5xl font-bold text-graphite mb-4 relative inline-block">
              Popular Products
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-blueHighlight opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-handwritten mt-4">
              Scroll through our student favorites ✨
            </p>
          </div>

          {/* Horizontal scrolling container */}
          <div className="relative">
            <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
              {products.map((product, index) => (
                <div
                  key={product.name}
                  className="flex-none w-72 snap-start animate-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className="bg-white hand-drawn-border p-6 h-full hover:scale-[1.03] hover:-rotate-1 transition-all duration-300 group cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,0.5)]"
                    onClick={() => setSelectedProduct(product)}
                  >
                    {/* Product image */}
                    <div className="aspect-square rounded-lg mb-4 overflow-hidden hand-drawn-border relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      {/* Doodle corner */}
                      <div className="absolute top-2 right-2 w-8 h-8 bg-yellowHighlight rounded-full border-2 border-graphite flex items-center justify-center text-xs font-bold transform rotate-12 group-hover:rotate-45 transition-transform">
                        ✨
                      </div>
                    </div>

                    {/* Category tag - sticky note style */}
                    <div className="inline-block bg-yellowHighlight px-3 py-1 rounded border-2 border-graphite text-xs font-bold mb-2 transform -rotate-1 group-hover:rotate-1 group-hover:scale-105 transition-all">
                      {product.category}
                    </div>

                    <h3 className="font-handwritten text-xl font-bold text-graphite mb-2 group-hover:text-blueHighlight transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center justify-between mt-4">
                      <span className="font-handwritten text-2xl font-bold text-blueHighlight">
                        {product.price}
                      </span>
                      <Button
                        size="sm"
                        className="hand-drawn-border bg-yellowHighlight text-graphite hover:bg-yellowHighlight/90 font-handwritten font-bold transition-all hover:scale-110 hover:rotate-12 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden group/btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/login");
                        }}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {/* Scribble highlight animation */}
                        <div className="absolute inset-0 bg-blueHighlight/20 scale-0 group-hover/btn:scale-100 transition-transform rounded" />
                      </Button>
                    </div>

                    {/* Quick view hint */}
                    <div className="mt-4 pt-4 border-t-2 border-dashed border-border opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-handwritten text-xs text-graphite">
                        → Click for details
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll hint */}
            <div className="text-center mt-6">
              <span className="font-handwritten text-sm text-muted-foreground animate-pulse">
                ← Scroll for more →
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
