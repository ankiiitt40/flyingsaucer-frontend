import React, { useState } from "react";
import Aurora from "../components/Aurora";
import logo from "../assets/logo1.png";

// Generate 15-minute interval time slots
const generateTimeSlots = (startHour = 13, endHour = 17, interval = 15) => {
  const slots = [];
  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += interval) {
      if (h === endHour && m > 45) continue;
      const hour12 = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const minuteStr = m.toString().padStart(2, "0");
      slots.push(`${hour12}:${minuteStr} ${ampm}`);
    }
  }
  return slots;
};

export default function BookTableSinglePage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    guests: 1,
    date: "",
    meal: "Lunch",
    time: "",
    name: "",
    email: "",
    phone: "",
  });

  const timeSlots = generateTimeSlots();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const handleSubmit = () => {
    const { guests, date, meal, time, name, email, phone } = formData;

    if (!date || !time || !name.trim() || !email.trim() || !phone.trim()) {
      alert("Please fill all fields before submitting.");
      return;
    }

    // Get existing bookings
    const savedBookings = JSON.parse(localStorage.getItem("bookings")) || [];

    const newBooking = {
      id: Date.now(),
      guests: Number(guests),
      date,
      meal,
      time,
      name,
      email,
      phone,
      timestamp: new Date().toLocaleString(),
    };

    // Save to localStorage
    localStorage.setItem("bookings", JSON.stringify([...savedBookings, newBooking]));

    alert("Booking confirmed!");

    // Reset form
    setFormData({
      guests: 1,
      date: "",
      meal: "Lunch",
      time: "",
      name: "",
      email: "",
      phone: "",
    });
    setStep(1);
  };

  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen overflow-x-hidden bg-black text-white">
      <Aurora colorStops={["#3A29FF", "#FF94B4", "#FF3232"]} blend={0.5} amplitude={1.0} speed={0.5} />
      <div className="relative z-10 max-w-md w-full p-6 bg-black/80 text-white rounded-xl shadow-lg flex flex-col items-center">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain drop-shadow-lg" />
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white drop-shadow-sm">Book a Table</h2>

        {/* Step 1 */}
        {step === 1 && (
          <div className="flex flex-col gap-4 w-full">
            <label className="font-semibold text-white drop-shadow-sm">Select Number of Guests</label>
            <select name="guests" value={formData.guests} onChange={handleChange} className="p-3 rounded text-black font-medium bg-white shadow-md">
              {[...Array(10)].map((_, i) => (
                <option key={i} value={i + 1}>
                  {i + 1} Guest{i > 0 ? "s" : ""}
                </option>
              ))}
            </select>
            <button onClick={nextStep} className="mt-4 px-4 py-2 rounded-full bg-white text-black font-bold shadow hover:bg-gray-200 transition">
              Next
            </button>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="flex flex-col gap-4 w-full">
            <label className="font-semibold text-white drop-shadow-sm">Select Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 rounded text-black font-medium bg-white shadow-md" />
            <label className="font-semibold text-white drop-shadow-sm">Select Meal</label>
            <div className="flex gap-4">
              {["Lunch", "Dinner"].map((meal) => (
                <label key={meal} className="flex items-center gap-2 text-white">
                  <input type="radio" name="meal" value={meal} checked={formData.meal === meal} onChange={handleChange} className="accent-pink-500" />
                  {meal}
                </label>
              ))}
            </div>
            <div className="flex justify-between mt-4 w-full">
              <button onClick={prevStep} className="px-4 py-2 rounded-full bg-gray-700 text-white font-semibold">Back</button>
              <button onClick={nextStep} className="px-4 py-2 rounded-full bg-white text-black font-bold shadow hover:bg-gray-200 transition">Next</button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="flex flex-col gap-4 w-full">
            <label className="font-semibold text-white drop-shadow-sm">Select Time Slot</label>
            <select name="time" value={formData.time} onChange={handleChange} className="p-3 rounded text-black font-medium bg-white shadow-md">
              <option value="">-- Select Time --</option>
              {timeSlots.map((slot, idx) => (
                <option key={idx} value={slot}>{slot}</option>
              ))}
            </select>
            <div className="flex justify-between mt-4 w-full">
              <button onClick={prevStep} className="px-4 py-2 rounded-full bg-gray-700 text-white font-semibold">Back</button>
              <button onClick={nextStep} disabled={!formData.time} className="px-4 py-2 rounded-full bg-white text-black font-bold shadow hover:bg-gray-200 transition">Next</button>
            </div>
          </div>
        )}

        {/* Step 4 */}
        {step === 4 && (
          <div className="flex flex-col gap-4 w-full">
            <label className="font-semibold text-white drop-shadow-sm">Your Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="p-3 rounded text-black font-medium bg-white shadow-md" />

            <label className="font-semibold text-white drop-shadow-sm">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="p-3 rounded text-black font-medium bg-white shadow-md" />

            <label className="font-semibold text-white drop-shadow-sm">Phone</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="p-3 rounded text-black font-medium bg-white shadow-md" />

            <div className="mt-4 border-t border-white/30 pt-4 flex flex-col gap-2 text-white">
              <h3 className="font-semibold text-lg drop-shadow-sm">Review Your Booking</h3>
              <p><strong>Guests:</strong> {formData.guests}</p>
              <p><strong>Date:</strong> {formData.date}</p>
              <p><strong>Meal:</strong> {formData.meal}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Phone:</strong> {formData.phone}</p>
            </div>

            <div className="flex justify-between mt-4 w-full">
              <button onClick={prevStep} className="px-4 py-2 rounded-full bg-gray-700 text-white font-semibold">Back</button>
              <button onClick={handleSubmit} className="px-4 py-2 rounded-full bg-green-500 text-white font-bold shadow hover:bg-green-600 transition">Pay ₹20 & Confirm</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
