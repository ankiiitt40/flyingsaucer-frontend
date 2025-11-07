import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // ya MNavbar agar pill indicator chahiye
import Aurora from "../components/Aurora";
import CircularGallery from "../components/Circular";
import CircularGallery1 from "../components/Circular2";

import logo from "../assets/logo1.png";

function Menu() {
  const [activeTab, setActiveTab] = useState("food");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  const barMenu = [
    { name: "Flying Mocktail", img: "/images/bar1.jpg" },
    { name: "Galaxy Martini", img: "/images/bar2.jpg" },
    { name: "Nebula Shot", img: "/images/bar3.jpg" },
    { name: "Starlight Wine", img: "/images/bar4.jpg" },
  ];

  // Navbar items with login/logout logic
  const navbarItems = user
    ? [
        { label: "Home", href: "/" },
        { label: "Menu", href: "/menu" },
        { label: "What's New?", href: "/whatsnew" },
        { label: "About", href: "/about" },
        
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
        { label: "What's New?", href: "/whatsnew" },
        { label: "About", href: "/about" },
        
        { label: "Contact", href: "/contact" },
      ];

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden bg-black text-white">
      {/* 🌌 Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* 🛸 Navbar */}
      <Navbar
        logo={logo}
        logoAlt="Flying Saucer Logo"
        items={navbarItems}
        activeHref="/menu"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* 🔘 Toggle */}
      <div className="mt-24 flex justify-center z-10">
        <div className="bg-white/10 rounded-full p-1 flex w-56 backdrop-blur-md border border-white/20">
          <button
            onClick={() => setActiveTab("food")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === "food"
                ? "bg-yellow-400 text-black shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🍔 Food
          </button>
          <button
            onClick={() => setActiveTab("bar")}
            className={`w-1/2 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeTab === "bar"
                ? "bg-pink-500 text-white shadow-lg"
                : "text-gray-400 hover:text-white"
            }`}
          >
            🍸 Dr!nks
          </button>
        </div>
      </div>

      {/* 🍔 Food Section */}
      {activeTab === "food" && (
        <div className="relative z-10 w-full flex justify-center items-center py-16">
          <div style={{ height: "600px", width: "100%", position: "relative" }}>
            <CircularGallery
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          </div>
        </div>
      )}
      {activeTab === "bar" && (
        <div className="relative z-10 w-full flex justify-center items-center py-16">
          <div style={{ height: "600px", width: "100%", position: "relative" }}>
            <CircularGallery1
              bend={3}
              textColor="#ffffff"
              borderRadius={0.05}
              scrollEase={0.02}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
