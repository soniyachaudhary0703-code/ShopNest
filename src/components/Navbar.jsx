import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiHeart,
  FiUser,
} from "react-icons/fi";
import { useEffect, useState } from "react";

function Navbar() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCounts = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const totalCartItems = cart.reduce(
      (total, item) =>
        total + Number(item.quantity || 1),
      0
    );

    setCartCount(totalCartItems);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCounts();

    window.addEventListener(
      "storage",
      updateCounts
    );

    window.addEventListener(
      "cartUpdated",
      updateCounts
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCounts
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateCounts
      );

      window.removeEventListener(
        "cartUpdated",
        updateCounts
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCounts
      );
    };
  }, []);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          ShopNest
        </Link>

        {/* LINKS */}
        <div className="hidden items-center gap-8 md:flex">

          <Link
            to="/"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/Product"
            className="text-gray-700 transition hover:text-blue-600"
          >
            Products
          </Link>

          <Link
            to="/Wishlist"
            className="text-gray-700 transition hover:text-red-500"
          >
            Wishlist
          </Link>

        </div>

        {/* ICONS */}
        <div className="flex items-center gap-5">

          {/* WISHLIST */}
          <Link
            to="/Wishlist"
            className="relative"
          >
            <FiHeart
              size={22}
              className="cursor-pointer text-gray-700 transition hover:text-red-500"
            />

            {wishlistCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-xs font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/Cart"
            className="relative"
          >
            <FiShoppingCart
              size={22}
              className="cursor-pointer text-gray-700 transition hover:text-blue-600"
            />

            {cartCount > 0 && (
              <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-xs font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {/* LOGIN */}
          <Link to="/Login">
            <FiUser
              size={22}
              className="cursor-pointer text-gray-700 transition hover:text-blue-600"
            />
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;