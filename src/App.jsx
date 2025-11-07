import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import Home from "./pages/Home";
import Menu from "./components/Menu";
import Booking from "./components/Booking"
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useEffect, useState } from "react";
import Aurora from "./components/Aurora";
import About from "./pages/About";
import WhatsNew from "./pages/Whatsnew"; 
import ScrollToTop from "./components/ScrollTop";
import Contact from "./pages/Contact";
import MyBooking from "./pages/MyBooking";
function AppWrapper() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!showSplash && (
        <div className="fixed inset-0 -z-10 overflow-hidden">
          <Aurora
            colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
            blend={0.5}
            amplitude={1.0}
            speed={0.5}
          />
        </div>
      )}

      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Routes>
            <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
           <Route path="/whatsnew" element={<WhatsNew />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/book-table" element={<Booking />} />
         <Route path="/contact" element={<Contact />} />
          <Route path="/mybooking" element={<MyBooking />} />
        </Routes>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
       <ScrollToTop />
    </BrowserRouter>
  );
}

export default App;
