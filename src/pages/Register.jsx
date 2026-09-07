
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/register",
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
        setMessage(data.message || "Registration failed");
        setLoading(false);
        return;
      }

      setMessage("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/Login");
      }, 1000);
    } catch (error) {
      console.error("Register Error:", error);
      setMessage("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-white to-blue-50 px-6 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
        <h1 className="text-center text-3xl font-bold text-slate-900">
          Create Account
        </h1>

        <p className="mt-2 text-center text-slate-500">
          Join ShopNest today
        </p>

        <form onSubmit={handleRegister} className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
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

          <div>
            <label className="mb-2 block font-semibold text-slate-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              minLength="6"
              required
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {message && (
            <p className="rounded-xl bg-blue-50 px-4 py-3 text-center text-sm font-medium text-blue-600">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded-xl bg-blue-600 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link
            to="/Login"
            className="font-semibold text-blue-600 hover:text-blue-700"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
