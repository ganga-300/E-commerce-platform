export interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    description: string[];
}

export const products: Product[] = [
    // Notebooks (5)
    {
        id: 1,
        name: "A4 Spiral Notebook",
        category: "Notebooks",
        price: 149,
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?w=400&h=400&fit=crop",
        description: ["200 ruled pages", "Durable spiral binding", "Perfect for lectures"]
    },
    {
        id: 2,
        name: "Hardbound Diary",
        category: "Notebooks",
        price: 299,
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=400&h=400&fit=crop",
        description: ["Premium leather cover", "192 pages", "Ribbon bookmark included"]
    },
    {
        id: 3,
        name: "Dotted Journal",
        category: "Notebooks",
        price: 199,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
        description: ["Bullet journal friendly", "120 gsm paper", "Lay-flat binding"]
    },
    {
        id: 4,
        name: "Exam Writing Pads",
        category: "Notebooks",
        price: 99,
        image: "https://images.unsplash.com/photo-1506784242126-2a0b0b89c56a?w=400&h=400&fit=crop",
        description: ["Pack of 3 pads", "100 sheets each", "Ideal for practice"]
    },
    {
        id: 5,
        name: "Pocket Notebook Set",
        category: "Notebooks",
        price: 129,
        image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
        description: ["Set of 3 mini notebooks", "Portable size", "Assorted colors"]
    },

    // Pens & Markers (5)
    {
        id: 6,
        name: "Gel Pens Set",
        category: "Pens & Markers",
        price: 179,
        image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=400&h=400&fit=crop",
        description: ["Pack of 10 colors", "Smooth writing", "0.7mm tip"]
    },
    {
        id: 7,
        name: "Ball Pens Blue",
        category: "Pens & Markers",
        price: 89,
        image: "https://images.unsplash.com/photo-1565022536102-b3f424c8c787?w=400&h=400&fit=crop",
        description: ["Pack of 10 pens", "Comfortable grip", "Long-lasting ink"]
    },
    {
        id: 8,
        name: "Pastel Highlighter Pack",
        category: "Pens & Markers",
        price: 149,
        image: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?w=400&h=400&fit=crop",
        description: ["6 pastel shades", "Chisel tip", "No bleed-through"]
    },
    {
        id: 9,
        name: "Permanent Markers",
        category: "Pens & Markers",
        price: 119,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=400&fit=crop",
        description: ["Pack of 4 colors", "Waterproof ink", "Quick-dry formula"]
    },
    {
        id: 10,
        name: "Brush Pen Set",
        category: "Pens & Markers",
        price: 249,
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&h=400&fit=crop",
        description: ["12 vibrant colors", "Flexible brush tips", "Perfect for lettering"]
    },

    // Desk Accessories (5)
    {
        id: 11,
        name: "LED Study Lamp",
        category: "Desk Accessories",
        price: 599,
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
        description: ["Adjustable brightness", "USB powered", "Eye-care technology"]
    },
    {
        id: 12,
        name: "Wooden Pen Stand",
        category: "Desk Accessories",
        price: 199,
        image: "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=400&h=400&fit=crop",
        description: ["Eco-friendly wood", "Multiple compartments", "Minimalist design"]
    },
    {
        id: 13,
        name: "Sticky Notes Set",
        category: "Desk Accessories",
        price: 129,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
        description: ["5 neon colors", "100 sheets per pad", "Strong adhesive"]
    },
    {
        id: 14,
        name: "Paper Clips Set",
        category: "Desk Accessories",
        price: 79,
        image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&h=400&fit=crop",
        description: ["Assorted sizes", "Rust-resistant", "200 pieces"]
    },
    {
        id: 15,
        name: "Whiteboard Markers",
        category: "Desk Accessories",
        price: 159,
        image: "https://images.unsplash.com/photo-1616628188467-b3a9b1f2f2e3?w=400&h=400&fit=crop",
        description: ["Pack of 6 colors", "Easy erase", "Low odor ink"]
    },

    // Organization (5)
    {
        id: 16,
        name: "File Folders Set",
        category: "Organization",
        price: 189,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
        description: ["Pack of 12 folders", "Color-coded tabs", "Durable plastic"]
    },
    {
        id: 17,
        name: "Binder Clips",
        category: "Organization",
        price: 99,
        image: "https://images.unsplash.com/photo-1611532736573-418d5b0d0b4d?w=400&h=400&fit=crop",
        description: ["Assorted sizes", "50 pieces", "Heavy-duty metal"]
    },
    {
        id: 18,
        name: "Desk Organizer",
        category: "Organization",
        price: 399,
        image: "https://images.unsplash.com/photo-1611532736573-418d5b0d0b4d?w=400&h=400&fit=crop",
        description: ["Multi-compartment", "Mesh design", "Space-saving"]
    },
    {
        id: 19,
        name: "Academic Planner 2025",
        category: "Organization",
        price: 349,
        image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=400&h=400&fit=crop",
        description: ["Monthly & weekly views", "Goal tracking pages", "Hardcover binding"]
    },
    {
        id: 20,
        name: "Index Tabs",
        category: "Organization",
        price: 119,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=400&fit=crop",
        description: ["Sticky page markers", "5 colors x 20 sheets", "Write-on surface"]
    },

    // Bags (5)
    {
        id: 21,
        name: "Laptop Backpack",
        category: "Bags",
        price: 899,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
        description: ["Fits 15.6 inch laptop", "Water-resistant", "Padded straps"]
    },
    {
        id: 22,
        name: "Canvas Tote Bag",
        category: "Bags",
        price: 299,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400&h=400&fit=crop",
        description: ["Eco-friendly canvas", "Large capacity", "Minimalist design"]
    },
    {
        id: 23,
        name: "Pencil Pouch",
        category: "Bags",
        price: 149,
        image: "https://images.unsplash.com/photo-1564514797047-fd5c0d6c6b82?w=400&h=400&fit=crop",
        description: ["Dual compartments", "Durable zipper", "Compact size"]
    },
    {
        id: 24,
        name: "Sling Bag",
        category: "Bags",
        price: 449,
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
        description: ["Crossbody style", "Multiple pockets", "Lightweight"]
    },
    {
        id: 25,
        name: "Backpack Rain Cover",
        category: "Bags",
        price: 199,
        image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop",
        description: ["Universal fit", "100% waterproof", "Compact storage"]
    },

    // Art Supplies (5)
    {
        id: 26,
        name: "A4 Sketchbook",
        category: "Art Supplies",
        price: 249,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
        description: ["100 sheets", "160 gsm paper", "Spiral bound"]
    },
    {
        id: 27,
        name: "Acrylic Paint Set",
        category: "Art Supplies",
        price: 499,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
        description: ["12 vibrant colors", "75ml tubes", "Non-toxic formula"]
    },
    {
        id: 28,
        name: "Paint Brush Set",
        category: "Art Supplies",
        price: 299,
        image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=400&fit=crop",
        description: ["15 assorted brushes", "Synthetic bristles", "Ergonomic handles"]
    },
    {
        id: 29,
        name: "A4 Art Sheets",
        category: "Art Supplies",
        price: 179,
        image: "https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=400&h=400&fit=crop",
        description: ["Pack of 100 sheets", "200 gsm thickness", "Acid-free paper"]
    },
    {
        id: 30,
        name: "Self-Healing Cutting Mat",
        category: "Art Supplies",
        price: 399,
        image: "https://images.unsplash.com/photo-1611532736573-418d5b0d0b4d?w=400&h=400&fit=crop",
        description: ["A3 size", "Grid markings", "Double-sided use"]
    },
];
