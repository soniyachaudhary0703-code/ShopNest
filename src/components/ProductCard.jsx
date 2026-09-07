import { useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
} from "react-icons/fi";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  const [wishlist, setWishlist] =
    useState(() => {
      return (
        JSON.parse(
          localStorage.getItem("wishlist")
        ) || []
      );
    });

  const [added, setAdded] = useState(false);

  const isWishlisted =
    wishlist.some(
      (item) => item.id === product.id
    );

  // ================= WISHLIST =================
  const handleWishlist = () => {
    const currentWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const alreadyExists =
      currentWishlist.some(
        (item) => item.id === product.id
      );

    let updatedWishlist;

    if (alreadyExists) {
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

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ================= CART =================
  const handleAddToCart = () => {
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
                  ) + 1,
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

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 2000);
  };

  return (
    <>
      <div className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg shadow-slate-200/50 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">

        {/* IMAGE */}
        <div className="relative flex h-56 items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50">

          <button
            onClick={handleWishlist}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md transition duration-300 hover:scale-110"
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

          <Link
            to={`/Product/${product.id}`}
            className="text-8xl drop-shadow-xl transition duration-500 group-hover:scale-110 group-hover:-rotate-3"
          >
            {product.icon}
          </Link>

        </div>


        {/* DETAILS */}
        <div className="p-5">

          <p className="text-sm text-slate-500">
            {product.category}
          </p>

          <Link
            to={`/Product/${product.id}`}
            className="mt-1 block cursor-pointer text-lg font-bold text-slate-900 transition hover:text-blue-600"
          >
            {product.name}
          </Link>

          <div className="mt-3 flex items-center gap-2">

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

          <button
            onClick={handleAddToCart}
            className={`mt-4 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-3 font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 ${
              added
                ? "bg-green-600 shadow-green-200"
                : "bg-blue-600 shadow-blue-200 hover:bg-blue-700"
            }`}
          >
            <FiShoppingCart />

            {added
              ? "Added to Cart ✓"
              : "Add to Cart"}
          </button>

        </div>

      </div>

      {added && (
        <div className="fixed bottom-6 right-6 z-50 rounded-xl bg-green-600 px-6 py-4 font-semibold text-white shadow-2xl">
          Product added to cart successfully! 🛒
        </div>
      )}
    </>
  );
}

export default ProductCard;