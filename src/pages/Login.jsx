
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Save login information
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Go to Home
      navigate("/");
    } catch (error) {
      setError("Server is not running. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-12">
      <div className="w-full max-w-md">

        {/* Login Card */}
        <div className="rounded-2xl bg-white p-8 shadow-xl">

          {/* Heading */}
          <div className="mb-8 text-center">
            <p className="font-semibold text-blue-600">
              Welcome Back
            </p>

            <h1 className="mt-2 text-3xl font-extrabold text-slate-900">
              Login to ShopNest
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Enter your details to access your account
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition duration-300 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/Register"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Create Account
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
