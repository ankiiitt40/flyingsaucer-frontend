import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScrollVelocity from "../components/ScrollVelocity";
import Masonry from "../components/Masonry";
import Aurora from "../components/Aurora";
import Navbar from "../components/Navbar"; // Menu-style Navbar
import logo from "../assets/logo1.png";
import b1 from "../assets/b1.jpg";
import b2 from "../assets/b2.jpg";
import b3 from "../assets/b3.jpg";
import b4 from "../assets/b4.jpg";
import b5 from "../assets/b5.jpg";
import b6 from "../assets/b6.jpg";
import b7 from "../assets/b7.jpg";
import b8 from "../assets/b8.jpg";
import b9 from "../assets/b9.jpg";
import b10 from "../assets/b10.jpg";
import b11 from "../assets/b11.jpg";
import b12 from "../assets/b12.jpg";
import b13 from "../assets/b13.jpg";
import b14 from "../assets/b14.jpg";
import b15 from "../assets/b15.jpg";
import b16 from "../assets/b16.jpg";
import b17 from "../assets/b17.jpg";
import b18 from "../assets/b18.jpg";
import b19 from "../assets/b19.jpg";
import b20 from "../assets/b20.jpg";
import b21 from "../assets/b21.jpg";
import b22 from "../assets/b22.jpg";
import b23 from "../assets/b23.jpg";
import b24 from "../assets/b24.jpg";
import b25 from "../assets/b25.jpg";
import b26 from "../assets/b26.jpg";
import b27 from "../assets/b27.jpg";
import b28 from "../assets/b28.jpg";
import b29 from "../assets/b29.jpg";
import b30 from "../assets/b30.jpg";

const items = [
  { id: "1", img: b1, url: "#", height: 400 },
  { id: "2", img: b2, url: "#", height: 350 },
  { id: "3", img: b3, url: "#", height: 450 },
  { id: "4", img: b4, url: "#", height: 300 },
  { id: "5", img: b5, url: "#", height: 400 },
  { id: "6", img: b6, url: "#", height: 350 },
  { id: "7", img: b7, url: "#", height: 450 },
  { id: "8", img: b8, url: "#", height: 300 },
  { id: "9", img: b9, url: "#", height: 400 },
  { id: "10", img: b10, url: "#", height: 350 },
  { id: "11", img: b11, url: "#", height: 450 },
  { id: "12", img: b12, url: "#", height: 300 },
  { id: "13", img: b13, url: "#", height: 400 },
  { id: "14", img: b14, url: "#", height: 350 },
  { id: "15", img: b15, url: "#", height: 450 },
  { id: "16", img: b16, url: "#", height: 300 },
  { id: "17", img: b17, url: "#", height: 400 },
  { id: "18", img: b18, url: "#", height: 350 },
  { id: "19", img: b19, url: "#", height: 450 },
  { id: "20", img: b20, url: "#", height: 300 },
  { id: "21", img: b21, url: "#", height: 400 },
  { id: "22", img: b22, url: "#", height: 350 },
  { id: "23", img: b23, url: "#", height: 450 },
  { id: "24", img: b24, url: "#", height: 300 },
  { id: "25", img: b25, url: "#", height: 400 },
  { id: "26", img: b26, url: "#", height: 350 },
  { id: "27", img: b27, url: "#", height: 450 },
  { id: "28", img: b28, url: "#", height: 300 },
  { id: "29", img: b29, url: "#", height: 400 },
  { id: "30", img: b30, url: "#", height: 350 },
];

function WhatsNew() {
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

  const velocity = 80;

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-x-hidden">
      {/* 🌌 Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* 🛸 Navbar (Menu style) */}
      <Navbar
        logo={logo}
        logoAlt="Flying Saucer Logo"
        items={navbarItems}
        activeHref="/whatsnew"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* 🚀 Hero Section */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-20 pt-24 pb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-2 sm:gap-4 flex-wrap max-w-full px-4">
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            What’s New at
          </span>
          <img
            src={logo}
            alt="Flying Saucer Logo"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain"
          />
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Café & Bar
          </span>
        </div>

        <ScrollVelocity
          texts={["New Food", "New Vibes"]}
          velocity={velocity}
          className="custom-scroll-text text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-pink-400 mb-4"
        />
        <p className="text-white/80 max-w-3xl text-center text-base sm:text-lg md:text-xl leading-relaxed">
          Discover the latest menu specials, upcoming events, and experiences that
          make every visit extraordinary. Stay in the loop and don’t miss the excitement!
        </p>
      </motion.div>

      {/* 🖼 Masonry Grid Section */}
      <motion.div
        className="relative z-20 w-full max-w-[1200px] px-4 sm:px-6 md:px-10 lg:px-16 mt-12 mb-24 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <Masonry
          items={items}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
          columns={{ base: 1, sm: 2, md: 3, lg: 4 }}
        />
      </motion.div>
    </div>
  );
}

export default WhatsNew;
