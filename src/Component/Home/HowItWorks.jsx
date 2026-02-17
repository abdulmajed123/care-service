export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      title: "Choose a Service",
      desc: "Select the care service you need such as elderly care, nursing, or baby care.",
      icon: "🩺",
    },
    {
      id: 2,
      title: "Select Duration & Location",
      desc: "Pick your preferred service duration and provide your address details.",
      icon: "📍",
    },
    {
      id: 3,
      title: "Confirm Booking",
      desc: "Review total cost and confirm your booking securely online.",
      icon: "✅",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How Our Care Service Works
        </h2>
        <p className="text-gray-600 mb-12">
          Booking professional home care is simple and takes just a few steps.
        </p>

        <div className="grid md:grid-cols-3 gap-3">
          {steps.map((step) => (
            <div
              key={step.id}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-lg mb-2">
                {step.id}. {step.title}
              </h3>
              <p className="text-gray-600 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
