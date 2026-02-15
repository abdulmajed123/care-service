"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function BookingPage() {
  const params = useParams();
  const service_id = params.service_id;

  const service = {
    id: 2,
    name: "Elderly Care",
    serviceCharge: 600,
    durationOptions: ["1 hour", "2 hours", "Half Day", "Full Day"],
  };

  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
  });

  const calculateCost = () => {
    if (!duration) return 0;
    if (duration === "1 hour") return service.serviceCharge;
    if (duration === "2 hours") return service.serviceCharge * 2;
    if (duration === "Half Day") return service.serviceCharge * 4;
    if (duration === "Full Day") return service.serviceCharge * 8;
    return 0;
  };

  const totalCost = calculateCost();

  const handleBooking = () => {
    const bookingData = {
      serviceId: service_id,
      duration,
      location,
      totalCost,
      status: "Pending",
    };

    console.log("Booking Saved:", bookingData);
    alert("Booking Confirmed!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book {service.name}</h1>

      {/* Duration */}
      <div className="mb-4">
        <p className="font-semibold">Select Duration</p>
        <div className="flex gap-2 mt-2">
          {service.durationOptions.map((d) => (
            <button
              key={d}
              onClick={() => setDuration(d)}
              className={`px-3 py-1 rounded border ${
                duration === d ? "bg-blue-600 text-white" : ""
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <input
          placeholder="Division"
          className="border p-2"
          onChange={(e) =>
            setLocation({ ...location, division: e.target.value })
          }
        />
        <input
          placeholder="District"
          className="border p-2"
          onChange={(e) =>
            setLocation({ ...location, district: e.target.value })
          }
        />
        <input
          placeholder="City"
          className="border p-2"
          onChange={(e) => setLocation({ ...location, city: e.target.value })}
        />
        <input
          placeholder="Area / Address"
          className="border p-2 col-span-2"
          onChange={(e) => setLocation({ ...location, area: e.target.value })}
        />
      </div>

      {/* Cost */}
      <div className="flex justify-between font-semibold mb-4">
        <span>Total Cost</span>
        <span>৳ {totalCost}</span>
      </div>

      <button
        onClick={handleBooking}
        disabled={!duration}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
}
