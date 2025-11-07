import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Aurora from "../components/Aurora";
import logo from "../assets/logo1.png";
import emailjs from "@emailjs/browser";

function Contact() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const navbarItems = user
    ? [
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: "About", href: "/about" },
        { label: "What's New?", href: "/whatsnew" },
        { label: "Contact", href: "/contact" },
        {
          label: (
            <button
              onClick={handleLogout}
              className="text-red-500 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          ),
          href: "#",
        },
      ]
    : [
        { label: "Login", href: "/login" },
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: "About", href: "/about" },
        { label: "What's New?", href: "/whatsnew" },
        { label: "Contact", href: "/contact" },
      ];

  const handleSubmit = (e) => {
    e.preventDefault();

    const templateParams = {
      title: "Contact Us",
      name,
      email,
      message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(
        "service_6sq4pjo", // your service ID
        "template_0kd24fw", // your template ID
        templateParams,
        "OOg7gXDdtGDKb17qS" // replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("Message sent successfully!");
          setName("");
          setEmail("");
          setMessage("");
        },
        (err) => {
          console.error("FAILED...", err);
          setStatus("Failed to send message. Try again.");
        }
      );
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden bg-black text-white">
      {/* Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Navbar */}
      <Navbar
        logo={logo}
        logoAlt="Flying Saucer Logo"
        items={navbarItems}
        activeHref="/contact"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* Contact Form */}
      <div className="relative z-10 w-full max-w-xl px-6 py-16 mt-24 bg-black/70 rounded-xl backdrop-blur-md border border-white/20">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Contact Us
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="p-3 rounded-md bg-black/50 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded-md bg-black/50 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            rows={5}
            className="p-3 rounded-md bg-black/50 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-yellow-400 resize-none"
          />
          <button
            type="submit"
            className="py-3 bg-yellow-400 text-black font-semibold rounded-md hover:bg-yellow-500 transition-all"
          >
            Send Message
          </button>
        </form>
        {status && <p className="mt-4 text-center text-pink-400">{status}</p>}
      </div>
    </div>
  );
}

export default Contact;
