"use server";

import { dbConnect, collection } from "@/lib/dbConnect";

export async function createBooking(data) {
  try {
    const bookingCollection = await dbConnect(collection.Bookings);

    const result = await bookingCollection.insertOne({
      ...data,
      status: "pending",
      createdAt: new Date(),
    });

    console.log("Inserted ID:", result.insertedId);

    return {
      success: true,
      insertedId: result.insertedId.toString(),
    };
  } catch (error) {
    console.error("Booking Error:", error);
    return { success: false, message: error.message };
  }
}
