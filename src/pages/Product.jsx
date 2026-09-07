
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

function Products() {
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedCategory = searchParams.get("category") || "All";

  const categories = ["All", "Fashion", "Electronics", "Shoes"];

  const category = categories.includes(requestedCategory)
    ? requestedCategory
    : "All";

  const products = [
    {
      id: 1,
      name: "Noise ColorFit Pro 4",
      category: "Electronics",
      price: "₹2,999",
      oldPrice: "₹4,999",
      discount: "20% OFF",
      icon: "⌚",
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      category: "Shoes",
      price: "₹6,499",
      oldPrice: "₹8,999",
      discount: "28% OFF",
      icon: "👟",
    },
    {
      id: 3,
      name: "Wildcraft Backpack",
      category: "Fashion",
      price: "₹1,299",
      oldPrice: "₹2,199",
      discount: "41% OFF",
      icon: "🎒",
    },
    {
      id: 4,
      name: "boAt Rockerz 450",
      category: "Electronics",
      price: "₹1,999",
      oldPrice: "₹3,490",
      discount: "43% OFF",
      icon: "🎧",
    },
    {
      id: 5,
      name: "Premium T-Shirt",
      category: "Fashion",
      price: "₹899",
      oldPrice: "₹1,499",
      discount: "40% OFF",
      icon: "👕",
    },
    {
      id: 6,
      name: "Smartphone Pro",
      category: "Electronics",
      price: "₹24,999",
      oldPrice: "₹29,999",
      discount: "17% OFF",
      icon: "📱",
    },
    {
      id: 7,
      name: "Running Shoes",
      category: "Shoes",
      price: "₹2,499",
      oldPrice: "₹3,999",
      discount: "38% OFF",
      icon: "👟",
    },
    {
      id: 8,
      name: "Wireless Earbuds",
      category: "Electronics",
      price: "₹1,499",
      oldPrice: "₹2,499",
      discount: "40% OFF",
      icon: "🎧",
    },
  ];

  const filteredProducts =
    category === "All"
      ? products
      : products.filter((product) => product.category === category);

  const handleCategoryChange = (item) => {
    if (item === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: item });
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-10 text-center">
          <p className="font-semibold text-blue-600">
            Explore Our Collection
          </p>

          <h1 className="mt-2 text-4xl font-extrabold text-slate-900 md:text-5xl">
            {category === "All" ? "All Products" : `${category} Products`}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Find the perfect products for your lifestyle from our
            curated collection.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-10 flex flex-wrap justify-center gap-3">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => handleCategoryChange(item)}
              className={`cursor-pointer rounded-full px-6 py-2.5 font-medium transition duration-300 ${
                category === item
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "bg-white text-slate-600 shadow-md hover:-translate-y-1 hover:shadow-lg"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg font-semibold text-slate-600">
              No products found in this category.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Products;
