import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <section className="bg-base-200">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Image / Visual */}
        <div className="relative w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg">
          <Image
            src="https://thumbs.dreamstime.com/b/child-care-school-care-club-children-playing-74144653.jpg"
            alt="Baby Care"
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-5">
          <h2 className="text-3xl md:text-4xl font-bold">
            Our Mission at Service Care
          </h2>

          <p className="text-base-content/80">
            Service Care is dedicated to making caregiving simple, safe, and
            accessible for every family. We connect trusted caregivers with
            families who need professional support for babies, elderly members,
            and sick loved ones at home.
          </p>

          <p className="text-base-content/80">
            Our goal is to ensure comfort, dignity, and peace of mind through
            reliable and compassionate care services tailored to your needs and
            location.
          </p>

          <Link href="/service" className="btn btn-primary">
            Explore Services
          </Link>
        </div>
      </div>
    </section>
  );
}
