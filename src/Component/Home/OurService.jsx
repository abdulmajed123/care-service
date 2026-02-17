import services from "../../data/data.json";
import ServiceCard from "@/Component/Card/ServiceCard";
export default function OurService() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service}></ServiceCard>
          ))}
        </div>
      </div>
    </section>
  );
}
