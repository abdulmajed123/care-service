// src/components/Home/ServicesOverview.jsx
import services from "../../data/data.json";
import Link from "next/link";
import Image from "next/image";

export default function ServicesOverview() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-base-100 rounded-2xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
            >
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
                  <p className="font-semibold mb-2">
                    ৳ {service.serviceCharge}/hour
                  </p>

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
          ))}
        </div>
      </div>
    </section>
  );
}
