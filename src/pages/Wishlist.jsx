import { useEffect, useState } from "react";
import { FiHeart, FiTrash2, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const loadWishlist = () => {
      const savedWishlist =
        JSON.parse(
          localStorage.getItem("wishlist")
        ) || [];

      setWishlist(savedWishlist);
    };

    loadWishlist();

    window.addEventListener(
      "wishlistUpdated",
      loadWishlist
    );

    return () => {
      window.removeEventListener(
        "wishlistUpdated",
        loadWishlist
      );
    };
  }, []);

  const removeFromWishlist = (id) => {
    const currentWishlist =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const updatedWishlist =
      currentWishlist.filter(
        (item) => item.id !== id
      );

    localStorage.setItem(
      "wishlist",
      JSON.stringify(updatedWishlist)
    );

    setWishlist(updatedWishlist);

    // Navbar count decrease
    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  const addToCart = (product) => {
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
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">

      <div className="mx-auto max-w-7xl">

        <div className="mb-10 text-center">

          <FiHeart className="mx-auto text-5xl text-red-500" />

          <h1 className="mt-3 text-4xl font-extrabold text-slate-900">
            My Wishlist
          </h1>

          <p className="mt-2 text-slate-500">
            Your favourite products are saved here.
          </p>

        </div>


        {wishlist.length === 0 ? (

          <div className="rounded-2xl bg-white py-20 text-center shadow-lg">

            <FiHeart className="mx-auto text-6xl text-slate-300" />

            <h2 className="mt-5 text-2xl font-bold text-slate-800">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-slate-500">
              Add some products you love.
            </p>

            <Link
              to="/Product"
              className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Explore Products
            </Link>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {wishlist.map((product) => (

              <div
                key={product.id}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg"
              >

                <Link
                  to={`/Product/${product.id}`}
                  className="flex h-56 items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50"
                >
                  <div className="text-8xl">
                    {product.icon}
                  </div>
                </Link>


                <div className="p-5">

                  <p className="text-sm text-slate-500">
                    {product.category}
                  </p>

                  <Link
                    to={`/Product/${product.id}`}
                    className="mt-1 block text-lg font-bold text-slate-900 hover:text-blue-600"
                  >
                    {product.name}
                  </Link>

                  <p className="mt-3 text-xl font-bold text-slate-900">
                    {product.price}
                  </p>


                  <button
                    onClick={() =>
                      addToCart(product)
                    }
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700"
                  >
                    <FiShoppingCart />
                    Add to Cart
                  </button>


                  <button
                    onClick={() =>
                      removeFromWishlist(
                        product.id
                      )
                    }
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 py-3 font-semibold text-red-500 hover:bg-red-50"
                  >
                    <FiTrash2 />
                    Remove
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default Wishlist;