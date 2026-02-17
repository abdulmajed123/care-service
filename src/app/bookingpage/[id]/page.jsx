"use client";
import { useParams } from "next/navigation";
import BookingForm from "../../../Component/Auth/BookingForm";
import services from "@/data/data.json";

export default function BookingPage() {
  const params = useParams();
  console.log("params:", params); // client console
  const serviceId = Number(params?.id);
  if (isNaN(serviceId)) return <p>Invalid service ID</p>;

  const service = services.find((s) => s.id === serviceId);
  if (!service) return <p>Service not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book {service.name}</h1>
      <BookingForm service={service} />
    </div>
  );
}
