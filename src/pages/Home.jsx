import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaStar, FaStarHalfAlt, FaInstagram } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import BlurText from "../components/Blurtext";
import logo from "../assets/logo1.png";
import ScrollDown from "../components/ScrollDown";
import Aurora from "../components/Aurora";
import ShinyText from "../components/ShinyText";
import ScrollStack, { ScrollStackItem } from "../components/ScrollStack";
import Menu from "../components/Menu";
import Booking from "../components/Booking";
import { useEffect, useState } from "react";

import imgDish from "../assets/image6.jpg";
import imgMocktail from "../assets/image7.jpg";
import imgInterior from "../assets/image8.jpg";
import img9 from "../assets/image9.jpg";

function Home() {
  const [user, setUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
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
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black text-white overflow-x-hidden">
      {/* 🛸 Navbar */}
      <Navbar
        logo={logo}
        logoAlt="Flying Saucer Logo"
        items={navbarItems}
        activeHref="/"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* 👋 Welcome Popup */}
      {showPopup && user && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-16 right-6 bg-white text-black px-5 py-2 rounded-full shadow-lg z-50"
        >
          Hy! {user.name || "Guest"} 👋
        </motion.div>
      )}

      {/* ✨ Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* 🎠 Carousel */}
      <div className="relative z-10 w-full flex justify-center items-center mt-28 sm:mt-16 md:mt-20">
        <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[50%] xl:w-[40%] h-[380px] sm:h-[480px] md:h-[580px] lg:h-[680px] flex justify-center items-center">
          <Carousel
            baseWidth={400}
            autoplay={true}
            autoplayDelay={3000}
            pauseOnHover={true}
            loop={true}
            round={false}
          />
        </div>
      </div>

      {/* 🌟 Title + Rating */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center space-y-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
      >
        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <div className="flex items-center justify-center gap-3">
            <BlurText
              text="The"
              delay={150}
              animateBy="words"
              direction="top"
              className="text-3xl md:text-4xl font-[cursive] text-white"
            />

            <img
              src={logo}
              alt="Flying Saucer Logo"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.5)]"
            />

            <span className="text-3xl md:text-4xl font-[cursive] text-white">!</span>
          </div>

          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex text-yellow-400 text-xl">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalfAlt />
            </div>
            <span className="text-white text-lg font-medium">4.8/5</span>
          </motion.div>
        </div>

        {/* 📍 Address */}
        <div className="relative z-10 flex flex-row items-center justify-center gap-2 w-full px-6 sm:px-12 text-center">
          <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
            Bansal One Building, Zone-2 Arera Colony, Maharana Pratap Nagar, Bhopal
          </ScrollDown>
          <a
            href="https://www.google.com/maps?q=Bansal+One+Building,+Zone-2+Arera+Colony,+Maharana+Pratap+Nagar,+Bhopal"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center text-green-400 hover:text-green-500 transition-transform hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 md:w-7 md:h-7">
              <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
            </svg>
          </a>
        </div>

        {/* 🕒 Time + Contact */}
        <BlurText
          text={
            <>
              <span className="text-green-400 font-semibold">Open</span> – 12:30 PM to 11:59 PM
              <span className="inline-flex items-center ml-4 text-white/80 hover:text-white transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="w-5 h-5 mr-2 text-green-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a1.5 1.5 0 001.5-1.5v-2.25a1.5 1.5 0 00-1.5-1.5h-3.375a1.5 1.5 0 00-1.5 1.5v.375a11.25 11.25 0 01-11.25-11.25v-.375a1.5 1.5 0 001.5-1.5V4.5A1.5 1.5 0 004.5 3H2.25A1.5 1.5 0 00.75 4.5v2.25a1.5 1.5 0 001.5 1.5z"
                  />
                </svg>
                +91&nbsp;9111777061
              </span>
            </>
          }
          delay={150}
          animateBy="words"
          direction="top"
          className="text-xl md:text-2xl text-white text-center font-medium"
        />
      </motion.div>

      {/* 🛸 Buttons */}
      <div className="mt-10 flex flex-col md:flex-row gap-4 justify-center items-center">
        <Link to="/menu">
          <button className="relative px-6 py-3 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
            <ShinyText text="Menuu !" speed={3} className="text-lg font-semibold" />
          </button>
        </Link>

        <Link to="/book-table">
          <button className="relative px-6 py-3 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
            <ShinyText text="Book a Table !" speed={3} className="text-lg font-semibold" />
          </button>
        </Link>

          <Link to="/mybooking">
    <button className="relative px-6 py-3 rounded-full border border-white/30 bg-white/10 text-white hover:bg-white/20 transition-all duration-300">
      <ShinyText text="My Booking" speed={3} className="text-lg font-semibold" />
    </button>
  </Link>

        

      </div>
      

      {/* 📸 ScrollStack */}
      <div className="mt-6 w-full flex justify-center items-center">
        <ScrollStack useWindowScroll={true}>
          {[imgMocktail, imgDish, imgInterior, img9].map((img, i) => (
            <ScrollStackItem key={i}>
              <div className="flex flex-col items-center text-center">
                <img
                  src={img}
                  alt="Restaurant"
                  className="w-72 h-72 object-cover rounded-2xl shadow-lg mb-4"
                />
                <h2 className="text-2xl font-semibold text-white mb-2">Ambience</h2>
                <p className="text-gray-300 text-sm max-w-sm">
                  Step into a space-themed dining experience like no other in Bhopal!
                </p>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>

      {/* 🔹 Divider */}
      {/* <div className="w-3/4 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent" /> */}

      {/* 🪐 ScrollDown Section — Flying Saucer Content */}
    {/* 🪐 ScrollDown Section — Flying Saucer Content */}
<motion.div
  className="relative z-20 flex flex-col items-center justify-center text-center px-6 sm:px-10 md:px-20 mb-24"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  viewport={{ once: true }}
>
  <div className="relative z-10 flex flex-col items-center justify-center w-full px-6 sm:px-12 text-center space-y-6">

    {/* 🏢 Address */}
    

    {/* 🏠 Title */}
  <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
  <h2 className="text-2xl md:text-3xl lg:text-4xl font-[cursive] font-extrabold text-white tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
    Flying Saucer Café & Bar – Bhopal’s Most Iconic Hangout Destination
  </h2>
</ScrollDown>


    {/* ✨ Subtitle */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
      <h3 className="text-lg italic opacity-90 text-white">
        Where Flavor Meets Atmosphere
      </h3>
    </ScrollDown>

    {/* 🍴 Description */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
      <p className="text-base leading-relaxed opacity-90 text-white max-w-3xl mx-auto">
        Nestled in the heart of Bhopal’s vibrant Arera Colony, <strong>Flying Saucer Café & Bar</strong> 
        redefines dining and nightlife. Step into a space where contemporary design, crafted cocktails, 
        and global cuisine come together to create an experience worth remembering.
      </p>
    </ScrollDown>

    {/* 📞 Contact */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
      <p className="text-base font-medium mt-2 text-white">
        Ready for your next memorable evening? <br />
        📞 <span className="font-semibold">Call +91 91117 77061</span> or visit our Zomato page to reserve your table.
      </p>
    </ScrollDown>

    {/* 📸 Instagram */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
  <div className="flex items-center justify-center gap-2 mt-2">
    <a
      href="https://www.instagram.com/flyingsaucerbhopal/"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-pink-400 hover:text-pink-500 transition-all duration-300 transform hover:scale-105 hover:tracking-wide font-semibold text-lg drop-shadow-[0_0_15px_rgba(255,0,150,0.6)]"
    >
      <FaInstagram size={22} />
      <span className="font-[cursive]">@flyingsaucerbhopal</span>
    </a>
  </div>
</ScrollDown>

    {/* 📌 Highlights */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
      <div className="mt-6 text-left md:text-center space-y-2 text-sm md:text-base text-white max-w-3xl mx-auto">
        <p>📍 <strong>Prime Location:</strong> Situated in Maharana Pratap Nagar — easily accessible from anywhere in Bhopal.</p>
        <p>🍸 <strong>Crafted Experiences:</strong> Signature drinks, themed nights, and live performances that elevate every evening.</p>
        <p>🍽️ <strong>All-Day Dining:</strong> From cozy brunches to after-hours gatherings — we’re here when the city wants to unwind.</p>
        <p>🌆 <strong>Ambience That Speaks:</strong> Modern, moody, and magnetic — a vibe that blends urban chic with Bhopal’s laid-back soul.</p>
      </div>
    </ScrollDown>

    {/* 🗺️ Google Map */}
    <ScrollDown baseOpacity={0} enableBlur={true} baseRotation={10} blurStrength={10}>
      <a
        href="https://www.google.com/maps?q=Bansal+One+Building,+Zone-2+Arera+Colony,+Maharana+Pratap+Nagar,+Bhopal"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center mt-4 text-green-400 hover:text-green-500 transition-transform hover:scale-110"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          className="w-6 h-6 md:w-7 md:h-7"
        >
          <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5S13.4 11.5 12 11.5z" />
        </svg>
      </a>
    </ScrollDown>

  </div>
</motion.div>


    </div>
  );
}

export default Home;
