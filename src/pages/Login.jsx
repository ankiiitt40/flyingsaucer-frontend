// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Aurora from "../components/Aurora";
import { signInWithGoogle } from "../firebase";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpExpiry, setOtpExpiry] = useState(null);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

  const sendOtpEmail = async (email, otpCode, expiryTime) => {
    if (!import.meta.env.VITE_EMAILJS_PUBLIC_KEY) {
      console.error("❌ EmailJS public key missing");
      return;
    }
    return emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        passcode: otpCode,
        time: expiryTime,
      },
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid credentials");

      localStorage.setItem("tempUser", JSON.stringify(data.user));

      const otpCode = generateOtp();
      const expiry = Date.now() + 15 * 60 * 1000;
      const expiryTime = new Date(expiry).toLocaleTimeString();

      setGeneratedOtp(otpCode);
      setOtpExpiry(expiry);

      await sendOtpEmail(form.email, otpCode, expiryTime);
      alert("✅ OTP sent! Check your email.");
      setShowOtpInput(true);
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!generatedOtp) return alert("No OTP generated!");
    if (Date.now() > otpExpiry) {
      alert("⚠️ OTP expired. Request a new one.");
      setShowOtpInput(false);
      setOtp("");
      setGeneratedOtp(null);
      return;
    }

    if (otp.trim() === generatedOtp.toString()) {
      alert("🎉 OTP verified!");
      const userData = JSON.parse(localStorage.getItem("tempUser"));
      if (userData) {
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.removeItem("tempUser");
      } else {
        localStorage.setItem("user", JSON.stringify({ email: form.email }));
      }
      navigate("/");
      window.location.reload();
    } else {
      alert("❌ Incorrect OTP. Try again.");
    }
  };

  const handleResendOtp = async () => {
    if (!form.email) return alert("Enter your email first!");
    const otpCode = generateOtp();
    const expiry = Date.now() + 15 * 60 * 1000;
    const expiryTime = new Date(expiry).toLocaleTimeString();
    setGeneratedOtp(otpCode);
    setOtpExpiry(expiry);
    try {
      await sendOtpEmail(form.email, otpCode, expiryTime);
      alert("🔁 OTP resent successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to resend OTP.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      localStorage.setItem("user", JSON.stringify(user));
      alert(`🎉 Welcome ${user.name}!`);
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Google sign-in error:", err);
      alert("❌ Google login failed. Try again.");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (otpExpiry && Date.now() > otpExpiry) {
        setGeneratedOtp(null);
        setShowOtpInput(false);
        setOtp("");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [otpExpiry]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black p-4">
      <div className="absolute inset-0 z-0">
        <Aurora colorStops={["#3A29FF","#FF94B4","#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
      </div>
      <div className="relative z-10 w-full max-w-md bg-black/80 p-6 rounded-xl shadow-xl text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Login with Email OTP</h2>

        {!showOtpInput ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full p-2 rounded bg-gray-900 text-white" />
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Password" required className="w-full p-2 rounded bg-gray-900 text-white" />
            <button type="submit" disabled={loading} className="w-full p-2 bg-green-500 rounded hover:bg-green-600 transition">{loading ? "Sending OTP..." : "Send OTP"}</button>
            <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-2 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition text-gray-800 font-medium shadow-sm">
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google logo" className="w-5 h-5" /> <span>Sign in with Google</span>
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <input type="text" placeholder="Enter OTP" value={otp} onChange={(e) => setOtp(e.target.value)} className="w-full p-2 rounded bg-gray-900 text-white" />
            <button onClick={handleVerifyOtp} className="w-full p-2 bg-green-500 rounded hover:bg-green-600 transition">Verify OTP</button>
            <button onClick={handleResendOtp} className="w-full p-2 bg-blue-500 rounded hover:bg-blue-600 transition">Resend OTP</button>
          </div>
        )}

        <p className="text-center mt-4">Don’t have an account? <Link to="/register" className="text-green-400 hover:underline">Register</Link></p>
      </div>
    </div>
  );
}
