"use server";

import { collection, dbConnect } from "@/lib/dbConnect";

export const getServices = async () => {
  const services = await dbConnect(collection.Services).find().toArray();
  return services.map((service) => ({
    ...service,
    _id: service._id.toString(), // ⭐ IMPORTANT
  }));
};

export const getSingleService = async (id) => {
  if (!id || id.length !== 24) return null;

  const query = { _id: new ObjectId(id) };
  const service = await dbConnect(collection.Services).findOne(query);

  if (!service) return null;

  return {
    ...service,
    _id: service._id.toString(),
  };
};
