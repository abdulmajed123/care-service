// "use client";

// import { useState } from "react";
// import { createBooking } from "@/app/action/server/bookings";

// export default function BookingForm({ service }) {
//   const [duration, setDuration] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [msg, setMsg] = useState("");

//   const [location, setLocation] = useState({
//     division: "",
//     district: "",
//     city: "",
//     area: "",
//   });

//   const calculateCost = () => {
//     if (!duration || !service) return 0;

//     const multipliers = {
//       "1 hour": 1,
//       "2 hours": 2,
//       "Half Day": 4,
//       "Full Day": 8,
//     };

//     return (multipliers[duration] || 0) * (service.serviceCharge || 0);
//   };

//   const totalCost = calculateCost();

//   // 🔥 Booking Submit
//   const handleBooking = async () => {
//     if (!duration) return;

//     setLoading(true);
//     setMsg("");

//     const bookingData = {
//       userId: "USER_ID_HERE", // login থাকলে session থেকে নাও
//       serviceId: service._id,
//       serviceName: service.name,
//       duration,
//       totalCost,
//       location,
//     };

//     const res = await createBooking(bookingData);

//     if (res?.success) {
//       setMsg("✅ Booking Successful");
//       setDuration("");
//       setLocation({
//         division: "",
//         district: "",
//         city: "",
//         area: "",
//       });
//     } else {
//       setMsg("❌ Booking Failed");
//     }

//     setLoading(false);
//   };

//   if (!service) {
//     return (
//       <div className="h-screen flex items-center justify-center">
//         <p className="text-gray-500 text-lg">Service data not available.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start sm:items-center p-4">
//       <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full flex flex-col space-y-6 border border-gray-100 my-8">
//         {/* Service Info */}
//         <div className="flex flex-col items-center gap-3 text-center">
//           <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-50">
//             <img
//               src={service.image || "/placeholder.jpg"}
//               alt={service.name}
//               className="object-cover w-full h-full"
//             />
//           </div>

//           <h2 className="text-2xl font-bold text-gray-800">{service.name}</h2>

//           <p className="text-blue-600 font-bold">
//             ৳ {service.serviceCharge}
//             <span className="text-xs text-gray-400 font-normal"> / hr</span>
//           </p>
//         </div>

//         {/* Duration */}
//         <div className="flex flex-col gap-2">
//           <h3 className="text-sm font-bold text-gray-700 uppercase">
//             Select Duration
//           </h3>

//           <div className="flex flex-wrap gap-2">
//             {service.durationOptions?.map((d) => (
//               <button
//                 key={d}
//                 onClick={() => setDuration(d)}
//                 className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition
//                 ${
//                   duration === d
//                     ? "bg-blue-600 text-white border-blue-600 shadow-lg"
//                     : "bg-white text-gray-600 border-gray-100 hover:border-blue-200"
//                 }`}
//               >
//                 {d}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Location */}
//         <div className="flex flex-col gap-3">
//           <h3 className="text-sm font-bold text-gray-700 uppercase">
//             Booking Location
//           </h3>

//           <input
//             placeholder="Division"
//             value={location.division}
//             onChange={(e) =>
//               setLocation({ ...location, division: e.target.value })
//             }
//             className="input"
//           />

//           <input
//             placeholder="District"
//             value={location.district}
//             onChange={(e) =>
//               setLocation({ ...location, district: e.target.value })
//             }
//             className="input"
//           />

//           <input
//             placeholder="City"
//             value={location.city}
//             onChange={(e) => setLocation({ ...location, city: e.target.value })}
//             className="input"
//           />

//           <input
//             placeholder="Full Address"
//             value={location.area}
//             onChange={(e) => setLocation({ ...location, area: e.target.value })}
//             className="input"
//           />
//         </div>

//         {/* Total */}
//         <div className="bg-blue-50 rounded-2xl p-4 flex justify-between items-center">
//           <span className="font-bold text-blue-900">Total Payable</span>
//           <span className="text-2xl font-black text-blue-700">
//             ৳ {totalCost}
//           </span>
//         </div>

//         {/* Message */}
//         {msg && (
//           <p className="text-center font-semibold text-sm text-green-600">
//             {msg}
//           </p>
//         )}

//         {/* Button */}
//         <button
//           onClick={handleBooking}
//           disabled={!duration || loading}
//           className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition active:scale-95
//           ${
//             duration
//               ? "bg-primary hover:bg-primary-focus"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           {loading ? "Processing..." : "Confirm Booking"}
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import { createBooking } from "@/app/action/server/bookings";
import { useSession } from "next-auth/react";

export default function BookingForm({ service }) {
  const { data: session } = useSession(); // session থেকে user info
  const currentUser = session?.user;

  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const [location, setLocation] = useState({
    division: "",
    district: "",
    city: "",
    area: "",
  });

  const calculateCost = () => {
    if (!duration || !service) return 0;
    const multipliers = {
      "1 hour": 1,
      "2 hours": 2,
      "Half Day": 4,
      "Full Day": 8,
    };
    return (multipliers[duration] || 0) * (service.serviceCharge || 0);
  };
  const totalCost = calculateCost();

  const handleBooking = async () => {
    if (!duration) return;
    setLoading(true);
    setMsg("");

    const bookingData = {
      serviceId: service.id,
      serviceName: service.name,
      duration,
      totalCost,
      location,
      userId: currentUser?._id,
      userName: currentUser?.name,
      userEmail: currentUser?.email,
    };

    const res = await createBooking(bookingData);
    if (res?.success) {
      setMsg("✅ Booking Successful");
      setDuration("");
      setLocation({ division: "", district: "", city: "", area: "" });
    } else {
      setMsg("❌ Booking Failed: " + (res?.message || ""));
    }
    setLoading(false);
  };

  if (!service) return <p>Service not available</p>;

  return (
    <div className="min-h-screen w-full flex justify-center items-start sm:items-center p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-6 md:p-8 max-w-md w-full flex flex-col space-y-6">
        {/* Service Info */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-28 h-28 rounded-2xl overflow-hidden border-2 border-blue-50">
            <img
              src={service.image || "/placeholder.jpg"}
              alt={service.name}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold">{service.name}</h2>
          <p className="text-blue-600 font-bold">
            ৳ {service.serviceCharge}{" "}
            <span className="text-xs text-gray-400 font-normal">/ hr</span>
          </p>
        </div>

        {/* Duration */}
        <div className="flex flex-col gap-2">
          <h3 className="text-sm font-bold text-gray-700 uppercase">
            Select Duration
          </h3>
          <div className="flex flex-wrap gap-2">
            {service.durationOptions?.map((d) => (
              <button
                key={d}
                onClick={() => setDuration(d)}
                className={`flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition ${
                  duration === d
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white text-gray-600 border-gray-100 hover:border-blue-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-bold text-gray-700 uppercase">
            Booking Location
          </h3>
          {["division", "district", "city", "area"].map((f) => (
            <input
              key={f}
              placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
              value={location[f]}
              onChange={(e) =>
                setLocation({ ...location, [f]: e.target.value })
              }
              className="input"
            />
          ))}
        </div>

        {/* Total */}
        <div className="bg-blue-50 rounded-2xl p-4 flex justify-between items-center">
          <span className="font-bold text-blue-900">Total Payable</span>
          <span className="text-2xl font-black text-blue-700">
            ৳ {totalCost}
          </span>
        </div>

        {/* Message */}
        {msg && (
          <p
            className={`text-center font-semibold text-sm ${msg.includes("✅") ? "text-green-600" : "text-red-600"}`}
          >
            {msg}
          </p>
        )}

        {/* Button */}
        <button
          onClick={handleBooking}
          disabled={!duration || loading}
          className={`w-full py-4 rounded-2xl font-bold text-white shadow-xl transition active:scale-95 ${
            duration
              ? "bg-primary hover:bg-primary-focus"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
}
