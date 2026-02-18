"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getMyBookings } from "@/app/action/server/bookings";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings for logged-in user
  useEffect(() => {
    if (status === "authenticated") {
      const fetchBookings = async () => {
        const data = await getMyBookings(session.user.email);
        setBookings(data);
        setLoading(false);
      };
      fetchBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading your bookings...</p>
      </div>
    );
  }

  // Not logged in
  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Please login to see your bookings.
      </div>
    );
  }

  // No bookings
  if (bookings.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        You have no bookings yet.
      </div>
    );
  }

  // Cancel Booking Handler (UI only for now, you can connect server later)
  const handleCancelBooking = (bookingId) => {
    // TODO: call server action to cancel booking
    alert(`Booking ${bookingId} cancelled!`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">My Bookings</h1>
      <div className="max-w-4xl mx-auto flex flex-col gap-4">
        {bookings.map((b) => (
          <div
            key={b._id}
            className="bg-white p-5 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div className="flex-1">
              <h2 className="font-bold text-xl">{b.serviceName}</h2>
              <p className="text-gray-700">Duration: {b.duration}</p>
              <p className="text-gray-700">
                Location: {b.location.division}, {b.location.district},{" "}
                {b.location.city}, {b.location.area}
              </p>
              <p className="text-gray-700 font-semibold">
                Total: ৳ {b.totalCost}
              </p>
              <p
                className={`inline-block px-3 py-1 mt-1 rounded-full text-sm font-medium ${
                  b.status === "pending"
                    ? "bg-yellow-100 text-yellow-800"
                    : b.status === "confirmed"
                      ? "bg-blue-100 text-blue-800"
                      : b.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                }`}
              >
                {b.status.charAt(0).toUpperCase() + b.status.slice(1)}
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Booked at: {new Date(b.createdAt).toLocaleString()}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-3 sm:mt-0">
              <button
                className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition"
                onClick={() => alert(JSON.stringify(b, null, 2))}
              >
                View Details
              </button>
              {b.status === "pending" && (
                <button
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
                  onClick={() => handleCancelBooking(b._id)}
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
