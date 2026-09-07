import { useEffect, useState } from "react";
import { FiMinus, FiPlus, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Increase quantity
  const increaseQuantity = (id) => {
    const currentCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = currentCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: (item.quantity || 1) + 1,
          }
        : item
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    // Update Navbar count
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const currentCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = currentCart.map((item) =>
      item.id === id
        ? {
            ...item,
            quantity: Math.max(
              1,
              (item.quantity || 1) - 1
            ),
          }
        : item
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    // Update Navbar count
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // DELETE PRODUCT FROM CART
  const removeFromCart = (id) => {
    const currentCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = currentCart.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    setCart(updatedCart);

    // Update Navbar count immediately
    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // Total quantity
  const totalItems = cart.reduce(
    (total, item) =>
      total + (item.quantity || 1),
    0
  );

  // Total price
  const totalPrice = cart.reduce(
    (total, item) => {
      const price = Number(
        item.price
          .replace("₹", "")
          .replace(",", "")
      );

      return total + price * (item.quantity || 1);
    },
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10">
          <p className="font-semibold text-blue-600">
            Your Shopping Cart
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            My Cart
          </h1>

          <p className="mt-3 text-slate-500">
            Review your selected products before checkout.
          </p>
        </div>

        {/* Empty Cart */}
        {cart.length === 0 ? (
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-3xl bg-white p-10 text-center shadow-lg">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
              <FiShoppingCart
                size={45}
                className="text-blue-600"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-900">
              Your cart is empty
            </h2>

            <p className="mt-2 text-slate-500">
              Looks like you haven't added anything to your cart yet.
            </p>

            <Link
              to="/Product"
              className="mt-6 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

            {/* Cart Products */}
            <div className="space-y-5 lg:col-span-2">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-lg shadow-slate-200/50 transition duration-300 hover:shadow-xl sm:flex-row sm:items-center"
                >

                  {/* Product Icon */}
                  <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 via-white to-blue-50 sm:w-32">
                    <span className="text-6xl drop-shadow-lg">
                      {item.icon}
                    </span>
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">

                    <p className="text-sm text-slate-500">
                      {item.category}
                    </p>

                    <Link
                      to={`/Product/${item.id}`}
                      className="mt-1 block text-xl font-bold text-slate-900 transition hover:text-blue-600"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-lg font-bold text-slate-900">
                        {item.price}
                      </span>

                      {item.oldPrice && (
                        <span className="text-sm text-slate-400 line-through">
                          {item.oldPrice}
                        </span>
                      )}
                    </div>

                    {/* Quantity */}
                    <div className="mt-4 flex items-center gap-4">

                      <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-white">
                        
                        <button
                          onClick={() =>
                            decreaseQuantity(item.id)
                          }
                          className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-100"
                        >
                          <FiMinus />
                        </button>

                        <span className="flex h-10 w-12 items-center justify-center border-x border-slate-200 font-semibold text-slate-800">
                          {item.quantity || 1}
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                          className="flex h-10 w-10 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-100"
                        >
                          <FiPlus />
                        </button>

                      </div>

                      {/* Delete */}
                      <button
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                        className="flex cursor-pointer items-center gap-2 font-semibold text-red-500 transition hover:text-red-700"
                      >
                        <FiTrash2 />

                        Delete
                      </button>

                    </div>
                  </div>

                  {/* Item Total */}
                  <div className="text-left sm:text-right">

                    <p className="text-sm text-slate-500">
                      Item Total
                    </p>

                    <p className="mt-1 text-xl font-bold text-slate-900">
                      ₹
                      {(
                        Number(
                          item.price
                            .replace("₹", "")
                            .replace(",", "")
                        ) *
                        (item.quantity || 1)
                      ).toLocaleString("en-IN")}
                    </p>

                  </div>

                </div>
              ))}

            </div>

            {/* Order Summary */}
            <div className="h-fit rounded-3xl bg-white p-6 shadow-xl lg:sticky lg:top-24">

              <h2 className="text-2xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-slate-600">
                  <span>
                    Items ({totalItems})
                  </span>

                  <span>
                    ₹{totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>
                    Delivery
                  </span>

                  <span className="font-semibold text-emerald-600">
                    FREE
                  </span>
                </div>

                <div className="border-t border-slate-200 pt-4">

                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-slate-900">
                      Total
                    </span>

                    <span className="text-2xl font-extrabold text-blue-600">
                      ₹{totalPrice.toLocaleString("en-IN")}
                    </span>
                  </div>

                </div>

              </div>

              <button
                className="mt-7 w-full cursor-pointer rounded-xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-xl"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/Product"
                className="mt-4 block text-center font-semibold text-blue-600 transition hover:text-blue-800"
              >
                Continue Shopping
              </Link>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;