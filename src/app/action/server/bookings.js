// "use server";

// import { dbConnect, collection } from "@/lib/dbConnect";

// export async function createBooking(data) {
//   try {
//     const bookingCollection = await dbConnect(collection.Bookings);

//     const result = await bookingCollection.insertOne({
//       ...data,
//       status: "pending",
//       createdAt: new Date(),
//     });

//     console.log("Inserted ID:", result.insertedId); // 👈 terminal এ দেখবে

//     return {
//       success: true,
//       insertedId: result.insertedId.toString(),
//     };
//   } catch (error) {
//     console.error("Booking Error:", error);
//     return { success: false, message: error.message };
//   }
// }

"use server";

import { dbConnect, collection } from "@/lib/dbConnect";

/**
 * Booking create function
 * @param {Object} data
 * {
 *   serviceId, serviceName, duration, totalCost, location,
 *   userId?, userName?, userEmail?
 * }
 */
export async function createBooking(data) {
  try {
    const bookingCollection = await dbConnect(collection.Bookings);

    const bookingDoc = {
      ...data,
      userId: data.userId || "guest",
      userName: data.userName || "Guest User",
      userEmail: data.userEmail || "no-email",
      status: "pending",
      createdAt: new Date(),
    };

    const result = await bookingCollection.insertOne(bookingDoc);
    console.log("Inserted Booking ID:", result.insertedId);

    return { success: true, insertedId: result.insertedId.toString() };
  } catch (error) {
    console.error("❌ Booking Error:", error);
    return { success: false, message: error.message };
  }
}
