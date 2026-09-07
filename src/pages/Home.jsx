import { Link, useNavigate } from "react-router-dom";
import {
  FiArrowRight,
  FiHeart,
  FiShoppingCart,
  FiSmartphone,
  FiHeadphones,
} from "react-icons/fi";
import { useState } from "react";

function Home() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Fashion",
      icon: "👕",
      items: "1200+ Items",
    },
    {
      name: "Electronics",
      icon: <FiSmartphone />,
      items: "950+ Items",
    },
    {
      name: "Shoes",
      icon: "👟",
      items: "750+ Items",
    },
    {
      name: "Accessories",
      icon: <FiHeadphones />,
      items: "650+ Items",
    },
  ];

  const products = [
    {
      id: 1,
      name: "Noise ColorFit Pro 4",
      category: "Smart Watch",
      price: "₹2,999",
      oldPrice: "₹4,999",
      discount: "20% OFF",
      icon: "⌚",
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Men's Shoes",
      price: "₹6,499",
      oldPrice: "₹8,999",
      discount: "28% OFF",
      icon: "👟",
    },
    {
      id: 3,
      name: "Wildcraft Bag Pack",
      category: "Backpack",
      price: "₹1,299",
      oldPrice: "₹2,199",
      discount: "41% OFF",
      icon: "🎒",
    },
    {
      id: 4,
      name: "boAt Rockerz 450",
      category: "Headphones",
      price: "₹1,999",
      oldPrice: "₹3,490",
      discount: "43% OFF",
      icon: "🎧",
    },
  ];

  const [wishlist, setWishlist] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || []
    );
  });

  const [addedProduct, setAddedProduct] =
    useState(null);

  // ================= WISHLIST =================
  const handleWishlist = (product) => {
    const currentWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const alreadyAdded =
      currentWishlist.some(
        (item) => item.id === product.id
      );

    let updatedWishlist;

    if (alreadyAdded) {
      updatedWishlist =
        currentWishlist.filter(
          (item) => item.id !== product.id
        );
    } else {
      updatedWishlist = [
        ...currentWishlist,
        product,
      ];
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

    // IMPORTANT
    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= CART =================
  const handleAddToCart = (product) => {
    const currentCart =
      JSON.parse(
        localStorage.getItem("cart")
      ) || [];

    const alreadyInCart =
      currentCart.some(
        (item) => item.id === product.id
      );

    let updatedCart;

    if (alreadyInCart) {
      updatedCart = currentCart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity:
                Number(item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // IMPORTANT
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    setAddedProduct(product.id);

    setTimeout(() => {
      setAddedProduct(null);
    }, 2000);
  };

  // ================= CATEGORY =================
  const handleCategory = (category) => {
    navigate(
      `/Product?category=${category}`
    );
  };

  return (
    <div className="min-h-screen overflow-hidden bg-slate-50">

      {/* HERO */}
      <section className="relative overflow-hidden">

        <div className="absolute inset-0 bg-linear-to-br from-indigo-600 via-blue-500 to-pink-200" />

        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-purple-400/30 blur-2xl" />

        <div className="absolute right-10 top-10 h-56 w-56 rounded-full bg-pink-300/40 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-40 w-96 rounded-full bg-white/20 blur-3xl" />

        <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 py-20 md:flex-row md:py-28">

          <div className="z-10 max-w-2xl text-white">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
              ✨ Best Quality, Best Price
            </div>

            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
              Everything You Need,
              <span className="block text-yellow-300">
                All in One Place.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-50">
              Discover top-quality products at
              unbeatable prices and enjoy a smooth
              shopping experience.
            </p>

            <Link
              to="/Product"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 font-semibold text-blue-600 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              Shop Now

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                <FiArrowRight />
              </span>
            </Link>

          </div>

          {/* 3D OBJECT */}
          <div className="relative flex h-80 w-full items-center justify-center md:w-[45%]">

            <div className="absolute h-64 w-64 rounded-full bg-white/30 blur-3xl" />

            <div className="absolute left-5 top-8 h-10 w-10 animate-bounce rounded-full bg-linear-to-br from-pink-300 to-purple-500 shadow-xl" />

            <div className="absolute right-8 top-2 h-8 w-8 rounded-full bg-linear-to-br from-blue-200 to-purple-500 shadow-xl" />

            <div className="absolute bottom-8 left-12 h-14 w-14 rounded-full bg-linear-to-br from-blue-300 to-indigo-700 shadow-2xl" />

            <div className="absolute h-64 w-64 rounded-full bg-white/30 shadow-2xl backdrop-blur-md md:h-72 md:w-72" />

            <div className="relative z-10 flex h-48 w-56 items-center justify-center rounded-3xl border border-white/30 bg-white/20 shadow-2xl backdrop-blur-lg transition duration-500 hover:-translate-y-3">

              <div className="text-8xl drop-shadow-2xl">
                🛍️
              </div>

            </div>

          </div>

        </div>

        <div className="absolute -bottom-16 left-0 h-32 w-full rounded-[50%] bg-slate-50" />

      </section>


      {/* CATEGORIES */}
      <section className="relative mx-auto max-w-7xl px-6 py-16">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-slate-900">
            Shop by Category
          </h2>

          <Link
            to="/Product"
            className="flex items-center gap-2 font-semibold text-blue-600"
          >
            View All
            <FiArrowRight />
          </Link>

        </div>

        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">

          {categories.map(
            (category, index) => (

              <button
                key={index}
                onClick={() =>
                  handleCategory(
                    category.name
                  )
                }
                className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-white bg-white p-5 text-left shadow-lg shadow-blue-100/40 transition duration-300 hover:-translate-y-2 hover:shadow-xl"
              >

                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-purple-100 text-3xl shadow-inner">
                  {category.icon}
                </div>

                <div>

                  <h3 className="font-bold text-slate-900">
                    {category.name}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {category.items}
                  </p>

                </div>

                <div className="ml-auto hidden h-9 w-9 items-center justify-center rounded-full bg-slate-50 group-hover:flex">
                  <FiArrowRight className="text-blue-600" />
                </div>

              </button>

            )
          )}

        </div>

      </section>


      {/* FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-6 pb-20">

        <div className="mb-8 flex items-center justify-between">

          <h2 className="text-3xl font-bold text-slate-900">
            Featured Products
          </h2>

          <Link
            to="/Product"
            className="flex items-center gap-2 font-semibold text-blue-600"
          >
            View All
            <FiArrowRight />
          </Link>

        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {products.map(
            (product) => {

              const isWishlisted =
                wishlist.some(
                  (item) =>
                    item.id === product.id
                );

              const isAdded =
                addedProduct === product.id;

              return (
                <div
                  key={product.id}
                  className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >

                  {/* IMAGE */}
                  <div
                    onClick={() =>
                      navigate(
                        `/Product/${product.id}`
                      )
                    }
                    className="relative flex h-56 cursor-pointer items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50"
                  >

                    {/* HEART */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWishlist(product);
                      }}
                      className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
                    >

                      <FiHeart
                        size={20}
                        className={
                          isWishlisted
                            ? "fill-red-500 text-red-500"
                            : "text-slate-700"
                        }
                      />

                    </button>

                    <div className="text-8xl drop-shadow-xl transition duration-500 group-hover:scale-110 group-hover:-rotate-3">
                      {product.icon}
                    </div>

                  </div>


                  {/* DETAILS */}
                  <div className="p-5">

                    <p className="text-sm text-slate-500">
                      {product.category}
                    </p>

                    <h3
                      onClick={() =>
                        navigate(
                          `/Product/${product.id}`
                        )
                      }
                      className="mt-1 cursor-pointer font-bold text-slate-900 hover:text-blue-600"
                    >
                      {product.name}
                    </h3>

                    <div className="mt-4 flex items-center gap-2">

                      <span className="text-xl font-bold text-slate-900">
                        {product.price}
                      </span>

                      <span className="text-sm text-slate-400 line-through">
                        {product.oldPrice}
                      </span>

                    </div>

                    <span className="mt-2 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                      {product.discount}
                    </span>

                    {/* CART */}
                    <button
                      onClick={() =>
                        handleAddToCart(
                          product
                        )
                      }
                      className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 ${
                        isAdded
                          ? "bg-green-600 shadow-green-200"
                          : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
                      }`}
                    >

                      <FiShoppingCart />

                      {isAdded
                        ? "Added to Cart ✓"
                        : "Add to Cart"}

                    </button>

                  </div>

                </div>
              );
            }
          )}

        </div>

      </section>


      {/* SUCCESS */}
      {addedProduct && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white shadow-2xl">
          Product added to cart successfully! 🛒
        </div>
      )}

    </div>
  );
}

export default Home;