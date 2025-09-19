
"use client"
import { useCart } from "../Context/Cartcontext.js"
import { useRouter } from "next/navigation"
import { useAuth } from "../Context/AuthContext"
import { ShoppingCart, Plus, Minus, Heart, Trash2, ArrowLeft, BookOpen, GraduationCap } from "lucide-react"

export default function EnhancedCartPage() {
  const { quantity, addItem, removeItem } = useCart()
  const { user } = useAuth()
  const router = useRouter()

  const cartItems = Object.values(quantity)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)

  const handlePlaceOrder = () => {
    if (user) {
      router.push("/Checkout")
    } else {
      router.push("/Login")
    }
  }

  const handleContinueShopping = () => {
    router.push("/") 
  }

  const EmptyCartState = () => (
    <div className="flex-1 flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md mx-auto">
       
        <div className="relative mb-8">
          <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#728F41]/10 to-[#728F41]/20 rounded-full flex items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-[#728F41]/60" strokeWidth={1.5} />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#728F41] rounded-full flex items-center justify-center">
            <BookOpen className="w-4 h-4 text-white" />
          </div>
        </div>

       
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Your Study Cart is Empty</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Looks like you haven't added any study materials yet. Discover amazing books, notes, and resources to boost
          your learning journey!
        </p>

      
        <div className="space-y-3">
          <button
            onClick={handleContinueShopping}
            className="w-full bg-[#728F41] hover:bg-[#5f7220] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
          >
            <BookOpen className="w-5 h-5" />
            Start Shopping
          </button>

          <button
            onClick={() => router.push("/categories")}
            className="w-full border-2 border-[#728F41] text-[#728F41] hover:bg-[#728F41] hover:text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <GraduationCap className="w-5 h-5" />
            Browse Categories
          </button>
        </div>

      
        <div className="mt-12">
          <p className="text-sm text-gray-500 mb-4">Popular Categories</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {["Textbooks", "Notes", "Question Papers", "Reference Books"].map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-[#728F41]/10 hover:text-[#728F41] cursor-pointer transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="bg-[#f8f9fa] min-h-screen">
  
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-2xl font-bold text-gray-800">My Cart ({cartItems.length})</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col lg:flex-row gap-8">
          {cartItems.length === 0 ? (
            <EmptyCartState />
          ) : (
            <>
            
              <div className="flex-1 space-y-4">
                {cartItems.map((product) => (
                  <div
                    key={product.name}
                    className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="relative">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-lg border-2 border-gray-100"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg text-gray-800 truncate pr-4">{product.name}</h3>
                          <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                            <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                          </button>
                        </div>

                        <p className="text-[#728F41] font-semibold text-lg mb-4">₹{product.price}</p>

                        <div className="flex justify-between items-center">
                        
                          <div className="flex items-center bg-gray-50 rounded-lg border">
                            <button
                              className="p-2 hover:bg-gray-100 rounded-l-lg transition-colors"
                              onClick={() => removeItem(product.name)}
                            >
                              <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{product.qty}</span>
                            <button
                              className="p-2 hover:bg-gray-100 rounded-r-lg transition-colors"
                              onClick={() => addItem(product)}
                            >
                              <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>

                         
                          <div className="flex items-center gap-4">
                            <button className="text-sm text-[#728F41] hover:text-[#5f7220] font-medium transition-colors">
                              Save for Later
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-full transition-colors group">
                              <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

            
                <div className="bg-white rounded-xl p-6 border-2 border-dashed border-gray-200">
                  <div className="text-center">
                    <p className="text-gray-600 mb-3">Need more study materials?</p>
                    <button
                      onClick={handleContinueShopping}
                      className="text-[#728F41] hover:text-[#5f7220] font-semibold flex items-center gap-2 mx-auto transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

         
          {cartItems.length > 0 && (
            <div className="w-full lg:w-96">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Payment Summary
                </h2>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total MRP</span>
                    <span className="font-semibold">₹{totalPrice}</span>
                  </div>

                  <div className="flex justify-between items-center text-green-600">
                    <span>Discount</span>
                    <span>− ₹0</span>
                  </div>

                  <div className="flex justify-between items-center text-green-600">
                    <span>Coupon Savings</span>
                    <span>− ₹0</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST</span>
                    <span>₹0</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Delivery</span>
                    <span className="text-green-600 font-semibold">Free</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-[#728F41]">₹{totalPrice}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="w-full bg-[#728F41] hover:bg-[#5f7220] text-white font-bold py-4 mt-6 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  PLACE ORDER
                </button>

                
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                    🔒 Secure checkout guaranteed
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
