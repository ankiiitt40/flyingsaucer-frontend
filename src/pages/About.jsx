import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import ScrollDown from "../components/ScrollDown";
import Aurora from "../components/Aurora";
import MNavbar from "../components/Navbar";
import logo from "../assets/logo1.png";

function About() {
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

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-x-hidden scroll-smooth">

      {/* 🌌 Background Aurora */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* 🛸 Navbar */}
     <MNavbar
  logo={logo}
  items={navbarItems}
  activeHref="/about"  // <- Add this
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
  ease="power2.easeOut"
/>


      {/* 🛸 Hero Section */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 pt-24"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <img
          src={logo}
          alt="Flying Saucer Logo"
          className="w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.8)] mb-6 animate-pulse"
        />
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={12}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gradient bg-gradient-to-r from-indigo-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
            About Flying Saucer Café & Bar
          </h1>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <p className="mt-4 max-w-3xl text-white/80 text-center text-lg sm:text-xl leading-relaxed tracking-wide font-sans">
            Nestled in the heart of Bhopal, Flying Saucer Café & Bar is a one-of-a-kind
            experience where flavor meets atmosphere. Step into a world of curated drinks,
            global cuisine, and a vibe that blends contemporary design with cozy comfort.
          </p>
        </ScrollDown>
      </motion.div>

      {/* 📝 Our Story */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 mt-28 space-y-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={12}>
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-400 tracking-wider">
            Our Story
          </h2>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <p className="max-w-4xl text-white/80 text-center text-lg leading-relaxed font-sans tracking-wide">
            Founded with a vision to bring a unique space-themed dining experience to Bhopal,
            Flying Saucer Café & Bar has grown into a destination for locals and travelers
            alike. Our journey is fueled by passion, creativity, and a love for unforgettable
            experiences.
          </p>
        </ScrollDown>
      </motion.div>

      {/* 🌆 Ambience & Experience */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 mt-28 space-y-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={12}>
          <h2 className="text-2xl md:text-3xl font-bold text-pink-400 tracking-wider">
            Ambience & Experience
          </h2>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <p className="max-w-4xl text-white/80 text-center text-lg leading-relaxed font-sans tracking-wide">
            Modern interiors, cozy corners, curated playlists, and thematic nights make every
            visit memorable. Whether it's brunch, cocktails, or late-night hangouts, we
            ensure the vibe is always on point.
          </p>
        </ScrollDown>
      </motion.div>

      {/* 💎 What Makes Us Unique */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 mt-28 space-y-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={12}>
          <h2 className="text-2xl md:text-3xl font-bold text-yellow-400 tracking-wider">
            What Makes Us Unique
          </h2>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <ul className="text-white/80 text-lg sm:text-xl mt-4 space-y-3 list-disc list-inside max-w-3xl tracking-wide font-sans">
            <li>🍸 Signature Craft Cocktails</li>
            <li>🍽️ Global Cuisine & All-Day Dining</li>
            <li>🌆 Modern, Cozy, & Immersive Ambience</li>
            <li>🎶 Live Music, Themed Nights, & Events</li>
          </ul>
        </ScrollDown>
      </motion.div>

      {/* 📍 Visit Us / Contact */}
      <motion.div
        className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 mt-28 mb-24 space-y-8"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={12}>
          <h2 className="text-2xl md:text-3xl font-bold text-green-400 tracking-wider">
            Visit Us
          </h2>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <p className="text-white/80 text-lg max-w-3xl text-center font-sans tracking-wide">
            Bansal One Building, Zone-2 Arera Colony, Maharana Pratap Nagar, Bhopal
          </p>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <a
            href="https://www.google.com/maps?q=Bansal+One+Building,+Zone-2+Arera+Colony,+Maharana+Pratap+Nagar,+Bhopal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-400 hover:text-green-500 transition-transform hover:scale-110 mt-2 inline-flex items-center gap-2 font-semibold tracking-wide"
          >
            View on Google Maps
          </a>
        </ScrollDown>
        <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={5} blurStrength={6}>
          <div className="flex items-center justify-center gap-2 mt-4">
            <a
              href="https://www.instagram.com/flyingsaucerbhopal/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-400 hover:text-pink-500 transition drop-shadow-[0_0_12px_rgba(255,0,150,0.5)] text-lg sm:text-xl font-bold tracking-wide"
            >
              <FaInstagram size={22} />
              <span>@flyingsaucerbhopal</span>
            </a>
          </div>
        </ScrollDown>
      </motion.div>
    </div>
  );
}

export default About;
