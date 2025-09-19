"use client"
import ProductCard from "./ProductCard"

const productList = [
  {
    id: "1",
    image: "/placeholder.svg?height=200&width=200",
    name: "Classmate Notebook",
    quantity: "200 Pages",
    price: 65,
  },
  {
    id: "2",
    image: "/placeholder.svg?height=200&width=200",
    name: "Camlin Geometry Box",
    quantity: "1 Set",
    price: 70,
  },
  {
    id: "3",
    image: "/placeholder.svg?height=200&width=200",
    name: "Apsara Platinum Pencils",
    quantity: "Pack of 10",
    price: 30,
  },
  {
    id: "4",
    image: "/placeholder.svg?height=200&width=200",
    name: "Camel Poster Colours",
    quantity: "12 Shades",
    price: 120,
  },
  {
    id: "5",
    image: "/placeholder.svg?height=200&width=200",
    name: "Cello Butterflow Pen",
    quantity: "Pack of 5",
    price: 55,
  },
  {
    id: "6",
    image: "/placeholder.svg?height=200&width=200",
    name: "Fevicol MR",
    quantity: "200 g",
    price: 35,
  },
  {
    id: "7",
    image: "/placeholder.svg?height=200&width=200",
    name: "Sticky Notes Neon",
    quantity: "400 Sheets",
    price: 80,
  },
  {
    id: "8",
    image: "/placeholder.svg?height=200&width=200",
    name: "Stapler with Pins",
    quantity: "Small Size",
    price: 45,
  },
  {
    id: "9",
    image: "/placeholder.svg?height=200&width=200",
    name: "Faber-Castell Erasers",
    quantity: "Pack of 3",
    price: 25,
  },
  {
    id: "10",
    image: "/placeholder.svg?height=200&width=200",
    name: "Glue Stick",
    quantity: "15 g",
    price: 20,
  },
]

export default function ProductsSection() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Our Products</h2>
          <p className="mt-4 text-lg text-gray-600">Discover our wide range of quality stationery items</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center">
          {productList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}