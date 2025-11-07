import { useEffect, useState } from "react";
import MNavbar from "../components/Navbar";
import Aurora from "../components/Aurora";
import logo from "../assets/logo1.png";

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState(null); // ✅ Add this
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Bookings
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];
    setBookings(savedBookings);

    // User
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 2000);
    }
  }, []);

  const handleCancel = (id) => {
    const updated = bookings.filter((b) => b.id !== id);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

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

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* ✨ Aurora Background */}
      <Aurora
        colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
        blend={0.5}
        amplitude={1.0}
        speed={0.5}
      />

      {/* Navbar */}
      <MNavbar
        logo={logo}
        logoAlt="Flying Saucer Logo"
        items={navbarItems}
        activeHref="/mybooking"
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />

      {/* Page Content */}
      <div className="relative z-10 pt-32 px-6 md:px-12 lg:px-24 pb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-white drop-shadow-lg">
          My Bookings
        </h1>

        {bookings.length === 0 ? (
          <p className="text-center text-gray-300 text-lg">No bookings yet.</p>
        ) : (
          <div className="flex flex-col gap-6 max-w-3xl mx-auto">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-5 bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-lg"
              >
                <div className="space-y-1">
                  <p><strong>Name:</strong> {b.name}</p>
                  <p><strong>Date:</strong> {b.date}</p>
                  <p><strong>Time:</strong> {b.time}</p>
                  <p><strong>Guests:</strong> {b.guests}</p>
                  <p className="text-sm text-gray-400">{b.timestamp}</p>
                </div>
                <button
                  onClick={() => handleCancel(b.id)}
                  className="mt-3 md:mt-0 px-4 py-2 bg-red-500 hover:bg-red-400 rounded-xl text-white transition-all"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;
