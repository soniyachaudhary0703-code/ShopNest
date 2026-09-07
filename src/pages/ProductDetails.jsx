import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FiHeart,
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiShield,
  FiTruck,
  FiRefreshCw,
} from "react-icons/fi";

function ProductDetails() {
  const { id } = useParams();

  const [quantity, setQuantity] =
    useState(1);

  const products = [
    {
      id: 1,
      name: "Noise ColorFit Pro 4",
      category: "Electronics",
      price: "₹2,999",
      oldPrice: "₹4,999",
      discount: "20% OFF",
      icon: "⌚",
      description:
        "A stylish and smart smartwatch designed to keep you connected, active and healthy throughout the day.",
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Shoes",
      price: "₹6,499",
      oldPrice: "₹8,999",
      discount: "28% OFF",
      icon: "👟",
      description:
        "Comfortable and stylish running shoes with a modern design, perfect for everyday use and workouts.",
    },
    {
      id: 3,
      name: "Wildcraft Backpack",
      category: "Fashion",
      price: "₹1,299",
      oldPrice: "₹2,199",
      discount: "41% OFF",
      icon: "🎒",
      description:
        "A durable and spacious backpack suitable for college, office, travel and everyday activities.",
    },
    {
      id: 4,
      name: "boAt Rockerz 450",
      category: "Electronics",
      price: "₹1,999",
      oldPrice: "₹3,490",
      discount: "43% OFF",
      icon: "🎧",
      description:
        "Wireless headphones with powerful sound, comfortable ear cushions and a stylish everyday design.",
    },
    {
      id: 5,
      name: "Premium T-Shirt",
      category: "Fashion",
      price: "₹899",
      oldPrice: "₹1,499",
      discount: "40% OFF",
      icon: "👕",
      description:
        "Premium quality comfortable t-shirt made for casual everyday wear with a clean modern look.",
    },
    {
      id: 6,
      name: "Smartphone Pro",
      category: "Electronics",
      price: "₹24,999",
      oldPrice: "₹29,999",
      discount: "17% OFF",
      icon: "📱",
      description:
        "A powerful smartphone with a modern display, smooth performance and features for everyday use.",
    },
    {
      id: 7,
      name: "Running Shoes",
      category: "Shoes",
      price: "₹2,499",
      oldPrice: "₹3,999",
      discount: "38% OFF",
      icon: "👟",
      description:
        "Lightweight running shoes designed to provide comfort and support during workouts and daily walks.",
    },
    {
      id: 8,
      name: "Wireless Earbuds",
      category: "Electronics",
      price: "₹1,499",
      oldPrice: "₹2,499",
      discount: "40% OFF",
      icon: "🎧",
      description:
        "Compact wireless earbuds offering clear audio, comfortable fit and convenient everyday listening.",
    },
  ];

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
        <div className="text-center">

          <h1 className="text-3xl font-bold text-slate-900">
            Product not found
          </h1>

          <Link
            to="/Product"
            className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700"
          >
            <FiArrowLeft />
            Back to Products
          </Link>

        </div>
      </div>
    );
  }

  // ================= ADD TO CART =================
  const addToCart = () => {
    const currentCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const existingProduct =
      currentCart.find(
        (item) => item.id === product.id
      );

    let updatedCart;

    if (existingProduct) {
      updatedCart = currentCart.map(
        (item) =>
          item.id === product.id
            ? {
                ...item,
                quantity:
                  Number(
                    item.quantity || 1
                  ) + quantity,
              }
            : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Navbar update
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Product added to cart!");
  };

  // ================= WISHLIST =================
  const addToWishlist = () => {
    const currentWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const alreadyExists =
      currentWishlist.some(
        (item) => item.id === product.id
      );

    if (alreadyExists) {
      const updatedWishlist =
        currentWishlist.filter(
          (item) => item.id !== product.id
        );

      localStorage.setItem(
        "wishlist",
        JSON.stringify(updatedWishlist)
      );

      window.dispatchEvent(
        new Event("wishlistUpdated")
      );

      alert(
        "Product removed from wishlist!"
      );

      return;
    }

    const updatedWishlist = [
      ...currentWishlist,
      product,
    ];

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );

    alert("Product added to wishlist!");
  };

  // ================= QUANTITY =================
  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prev) =>
      prev > 1 ? prev - 1 : 1
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <Link
          to="/Product"
          className="mb-8 inline-flex cursor-pointer items-center gap-2 font-medium text-slate-600 transition hover:text-blue-600"
        >
          <FiArrowLeft />
          Back to Products
        </Link>


        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* IMAGE */}
          <div className="relative flex min-h-[500px] items-center justify-center overflow-hidden rounded-3xl border border-white bg-linear-to-br from-blue-100 via-white to-purple-100 shadow-2xl">

            <div className="absolute left-10 top-10 h-32 w-32 rounded-full bg-blue-300/30 blur-3xl" />

            <div className="absolute bottom-10 right-10 h-40 w-40 rounded-full bg-purple-300/30 blur-3xl" />

            <div className="absolute left-16 top-20 h-8 w-8 rounded-full bg-linear-to-br from-blue-400 to-indigo-700 shadow-xl" />

            <div className="absolute right-20 top-16 h-12 w-12 rounded-full bg-linear-to-br from-pink-300 to-purple-500 shadow-xl" />

            <div className="absolute bottom-20 left-24 h-10 w-10 rounded-full bg-linear-to-br from-indigo-300 to-blue-600 shadow-xl" />

            <div className="relative flex h-80 w-80 items-center justify-center rounded-full bg-white/60 shadow-2xl backdrop-blur-md">

              <div className="absolute inset-8 rounded-full bg-linear-to-br from-blue-100 to-purple-100 shadow-inner" />

              <div className="relative z-10 text-[150px] drop-shadow-2xl transition duration-500 hover:scale-110">
                {product.icon}
              </div>

            </div>


            {/* WISHLIST */}
            <button
              onClick={addToWishlist}
              className="absolute right-6 top-6 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-white shadow-lg transition duration-300 hover:scale-110 hover:text-red-500"
            >
              <FiHeart size={22} />
            </button>

          </div>


          {/* INFORMATION */}
          <div className="flex flex-col justify-center">

            <p className="font-semibold uppercase tracking-wide text-blue-600">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 leading-7 text-slate-500">
              {product.description}
            </p>


            {/* PRICE */}
            <div className="mt-7 flex items-center gap-4">

              <span className="text-3xl font-extrabold text-slate-900">
                {product.price}
              </span>

              <span className="text-lg text-slate-400 line-through">
                {product.oldPrice}
              </span>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                {product.discount}
              </span>

            </div>


            {/* QUANTITY */}
            <div className="mt-8">

              <p className="mb-3 font-semibold text-slate-800">
                Quantity
              </p>

              <div className="flex w-fit items-center overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

                <button
                  onClick={decreaseQuantity}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-100"
                >
                  <FiMinus />
                </button>

                <span className="flex h-11 w-14 items-center justify-center border-x border-slate-200 font-bold text-slate-900">
                  {quantity}
                </span>

                <button
                  onClick={increaseQuantity}
                  className="flex h-11 w-11 cursor-pointer items-center justify-center text-slate-600 transition hover:bg-slate-100"
                >
                  <FiPlus />
                </button>

              </div>

            </div>


            {/* BUTTONS */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={addToCart}
                className="flex cursor-pointer items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-blue-700 hover:shadow-2xl"
              >
                <FiShoppingCart size={20} />
                Add to Cart
              </button>

              <button
                className="cursor-pointer rounded-xl border-2 border-blue-600 bg-white px-7 py-4 font-bold text-blue-600 transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
              >
                Buy Now
              </button>

            </div>


            {/* FEATURES */}
            <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg">

                <FiTruck className="text-2xl text-blue-600" />

                <p className="mt-2 font-semibold text-slate-800">
                  Fast Delivery
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Quick & safe delivery
                </p>

              </div>


              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg">

                <FiShield className="text-2xl text-blue-600" />

                <p className="mt-2 font-semibold text-slate-800">
                  Secure Payment
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  100% secure checkout
                </p>

              </div>


              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-lg">

                <FiRefreshCw className="text-2xl text-blue-600" />

                <p className="mt-2 font-semibold text-slate-800">
                  Easy Returns
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  Simple return policy
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;