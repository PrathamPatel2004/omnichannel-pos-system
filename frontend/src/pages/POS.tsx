import { useState } from "react"
import { createOrder } from "../services/order.service"

type Product = {
  id: number
  name: string
  price: number
}

export default function POS() {

  const products: Product[] = [
    { id: 1, name: "Shirt", price: 500 },
    { id: 2, name: "Pants", price: 800 },
    { id: 3, name: "Shoes", price: 1200 },
  ]

  // cart Logic
  type CartItem = {
    id: number
    name: string
    price: number
    quantity: number
  }

  const [cart, setCart] = useState<CartItem[]>([])

  // Add to cart  logic
  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id)

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1 }])
    }
  }

  // Total logic
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  // Checkout Handler
  const handleCheckout = async() => {
    /*try{
      const items = cart.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))

      const res = await createOrder(items)

      console.log("Order Success:", res)

      setCart([]) // Clear cart

      alert("Order placed successfully")
    }
    catch(error: any) {
      console.error(error)
      alert("Checkout failed")
    }*/
    console.log("Mock order:", cart)
    setCart([])
    alert("Mock order placed")
  }


  return (
    <div className="h-screen flex">

      {/* LEFT */}
      <div className="w-2/3 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">Products</h2>

        <input
          type="text"
          placeholder="Search product..."
          className="w-full border px-3 py-2 mb-4"
        />

        <div className="grid grid-cols-3 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => addToCart(product)}
              className="border p-4 cursor-pointer hover:bg-gray-100"
            >
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-bold mb-4">Cart</h2>

        <div className="space-y-2">
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between border p-2 items-center">

              <span>{item.name}</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCart(cart
                      .map(i =>
                        i.id === item.id
                          ? { ...i, quantity: i.quantity - 1 }
                          : i
                      )
                      .filter(i => i.quantity > 0)
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    setCart(cart.map(i =>
                      i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                    ))
                  }
                >
                  +
                </button>
              </div>

              <span>₹{item.price * item.quantity}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 font-bold text-lg">
          Total: ₹{total}
        </div>

        <button
        onClick={handleCheckout}
        className="mt-4 w-full bg-green-500 text-white py-2">
          Checkout
        </button>
      </div>

    </div>
  )
}