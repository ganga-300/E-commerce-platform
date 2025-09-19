"use client"
import Image from "next/image"
import { Minus, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "../Context/Cartcontext"

export default function ProductCard({ product }) {
  const { image, name, quantity, price } = product
  const { addItem, removeItem, quantity: cartQuantity } = useCart()

  const count = cartQuantity[name]?.qty || 0

  return (
    <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-200 p-4 flex flex-col items-center hover:shadow-md transition-shadow duration-200">
      <div className="relative w-28 h-28 mb-4">
        <Image
          src={image || "/placeholder.svg"}
          alt={name}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      <h3 className="text-sm font-semibold text-gray-900 text-center mb-1 line-clamp-2">{name}</h3>

      <p className="text-sm text-gray-500 mb-3">{quantity}</p>

      <div className="w-full flex items-center justify-between">
        <span className="text-base font-semibold text-gray-800">₹{price.toLocaleString()}</span>

        {count > 0 ? (
          <div className="flex items-center rounded-md overflow-hidden border border-green-600">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(name)}
              className="px-3 py-1 text-green-600 hover:bg-green-50 h-8 w-8 p-0"
            >
              <Minus className="h-4 w-4" />
            </Button>

            <span className="px-3 py-1 text-green-600 font-semibold bg-green-50 min-w-[2rem] text-center">{count}</span>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => addItem(product)}
              className="px-3 py-1 text-green-600 hover:bg-green-50 h-8 w-8 p-0"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-green-600 border-green-600 hover:bg-green-50 font-medium"
            onClick={() => addItem(product)}
          >
            ADD
          </Button>
        )}
      </div>
    </div>
  )
}