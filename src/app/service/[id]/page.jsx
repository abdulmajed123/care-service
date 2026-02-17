import BookingButton from "@/Component/Button/BookingButton";
import services from "@/data/data.json";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ServiceDetails({ params }) {
  const { id } = await params;
  const serviceId = parseInt(id);

  const service = services.find((s) => s.id === serviceId);
  if (!service) return notFound();

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-96">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">{service.name}</h1>
            <span className="bg-green-500 text-white px-3 py-1 rounded-full font-semibold text-sm">
              ৳ {service.serviceCharge}/hour
            </span>
          </div>

          {/* Ratings */}
          <p className="text-yellow-500 font-semibold text-lg">
            ⭐ {service.ratings}
          </p>

          {/* Description */}
          <p className="text-gray-700">{service.description}</p>

          {/* Sub Services */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Sub Services</h3>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              {service.subServices.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </div>

          {/* Duration */}
          <div>
            <h3 className="text-xl font-semibold mb-1">Duration Options</h3>
            <p className="text-gray-600">
              {service.durationOptions.join(", ")}
            </p>
          </div>

          {/* Booking Button */}
          <div className="mt-6">
            <BookingButton id={service.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
