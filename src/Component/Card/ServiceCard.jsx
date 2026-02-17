import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-base-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col">
      {/* Service Image */}
      <div className="relative w-full h-64">
        <Image
          src={service.image}
          alt={service.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Service Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
          <p className="text-sm text-base-content/80 mb-2">
            {service.description}
          </p>
          <p className="font-semibold mb-2">৳ {service.serviceCharge}/hour</p>

          <ul className="text-sm text-base-content/60 list-disc list-inside mb-2">
            {service.subServices.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>

          <p className="text-sm text-base-content/70">
            Duration Options: {service.durationOptions.join(", ")}
          </p>

          <p className="text-sm text-yellow-500 font-semibold mt-2">
            Ratings: {service.ratings} ⭐
          </p>
        </div>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            href={`/service/${service.id}`}
            className="btn btn-primary w-full"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
