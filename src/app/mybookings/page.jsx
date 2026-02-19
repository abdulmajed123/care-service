"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getMyBookings } from "@/app/action/server/bookings";

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      const fetchBookings = async () => {
        const data = await getMyBookings(session.user.email);
        setBookings(data || []);
        setLoading(false);
      };
      fetchBookings();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status, session]);

  const handleCancelBooking = (id) => {
    alert(`Booking ${id} cancelled`);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-600";
      case "confirmed":
        return "bg-indigo-50 text-indigo-600";
      case "completed":
        return "bg-emerald-50 text-emerald-600";
      case "cancelled":
        return "bg-rose-50 text-rose-600";
      default:
        return "bg-slate-50 text-slate-600";
    }
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center text-slate-400 animate-pulse">
        Loading bookings...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#FDFDFF] py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Booking History
          </h1>
          <p className="text-slate-500 text-sm">
            Check the status of your recent service requests.
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white border border-slate-100 rounded-3xl p-5 flex flex-col md:flex-row items-center gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 group"
            >
              {/* --- IMAGE BLOCK --- */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-[2rem] overflow-hidden">
                  <img
                    src={b.serviceImage || "/placeholder.jpg"}
                    alt={b.serviceName}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
              </div>

              {/* --- INFO BLOCK --- */}
              <div className="flex-1 min-w-0 flex flex-col gap-1 text-center md:text-left">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <h2 className="text-lg font-bold text-slate-800 tracking-tight">
                    {b.serviceName}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${getStatusStyle(b.status)}`}
                  >
                    {b.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-1 text-sm text-slate-400">
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>
                      Duration:{" "}
                      <strong className="text-slate-600 font-medium">
                        {b.duration}
                      </strong>
                    </span>
                  </div>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="truncate max-w-[200px]">
                      {b.location?.area}, {b.location?.city}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-center md:justify-start gap-4">
                  <p className="text-xl font-bold text-slate-900 leading-none">
                    ৳{b.totalCost}
                  </p>
                  <span className="text-[10px] text-slate-300 font-medium uppercase tracking-tighter">
                    {new Date(b.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                    })}
                  </span>
                </div>
              </div>

              {/* --- ACTION BLOCK --- */}
              <div className="flex md:flex-col gap-2 w-full md:w-auto shrink-0 border-t md:border-t-0 md:border-l border-slate-50 pt-4 md:pt-0 md:pl-6">
                <button
                  onClick={() => alert(JSON.stringify(b, null, 2))}
                  className="flex-1 px-6 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold hover:bg-indigo-600 transition-all active:scale-95 shadow-lg shadow-slate-200"
                >
                  View Details
                </button>
                {b.status === "pending" && (
                  <button
                    onClick={() => handleCancelBooking(b._id)}
                    className="flex-1 px-6 py-2.5 rounded-2xl bg-white text-rose-500 border border-rose-50 text-xs font-semibold hover:bg-rose-50 transition-all active:scale-95"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
