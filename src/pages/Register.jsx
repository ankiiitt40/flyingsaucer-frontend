import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Aurora from "../components/Aurora";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(form),
});

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Register failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ name: data.user.name, email: data.user.email })
      );

      navigate("/");
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      {/* Form Section */}
      <div className="relative z-10 w-full max-w-md bg-black/80 p-6 rounded-xl shadow-xl text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Create Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Name"
            className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type="password"
            className="w-full p-2 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="w-full p-2 bg-green-500 hover:bg-green-600 rounded transition-colors"
          >
            Register & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
