import { useEffect, useRef } from "react";
import gsap from "gsap";
import logo from "../assets/logo1.png"; // apne logo ka correct path likhna

function SplashScreen({ onFinish }) {
  const logoRef = useRef(null);

  useEffect(() => {
    // Left to right + fade in animation
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1.2, ease: "power3.out" }
    );

    // Fade out + transition to homepage after delay
    const timer = setTimeout(() => {
      gsap.to(logoRef.current, {
        opacity: 0,
        x: 100,
        duration: 0.8,
        ease: "power2.inOut",
        onComplete: onFinish,
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <img
        ref={logoRef}
        src={logo}
        alt="FlyingSaucer Logo"
        className="w-52 sm:w-72 md:w-96 select-none"
      />
    </div>
  );
}

export default SplashScreen;
