// src/components/Home/Testimonials.jsx
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Khan",
    role: "Mother of 2",
    comment:
      "Service Care’s babysitters are amazing! My kids love them and I feel completely safe leaving them at home.",
    img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Md. Hasan",
    role: "Elderly Care Receiver",
    comment:
      "The caregivers are compassionate and very professional. I feel cared for and valued.",
    img: "https://images.pexels.com/photos/3845769/pexels-photo-3845769.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
  {
    name: "Rina Akter",
    role: "Patient's Family",
    comment:
      "Our home patient care experience was seamless. The Service Care team is reliable and thoughtful.",
    img: "https://images.pexels.com/photos/614847/pexels-photo-614847.jpeg?auto=compress&cs=tinysrgb&w=80",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-base-200 py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What People Say About Service Care
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                  <Image
                    src={t.img}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{t.name}</h3>
                  <p className="text-sm text-base-content/60">{t.role}</p>
                </div>
              </div>
              <p className="text-base-content/80">"{t.comment}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
