import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-base-100 text-base-content mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-primary">Service Care</h2>
          <p className="text-sm">
            Trusted baby sitting, elderly and patient care services at your
            doorstep. Safe, reliable and compassionate caregiving.
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-semibold mb-3">Services</h3>
          <ul className="space-y-2 text-sm">
            <li>Baby Care</li>
            <li>Elderly Care</li>
            <li>Sick Care</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-semibold mb-3">Company</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
            </li>
            <li>
              <Link href="/service" className="hover:text-primary">
                All Services
              </Link>
            </li>
            <li>
              <Link href="/mybookings" className="hover:text-primary">
                My Bookings
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-primary">
                Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-3">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 Bangladesh</li>
            <li>📞 +880 01893505618</li>
            <li>✉️ abdulmajed5618@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm">
          © {new Date().getFullYear()} Service Care — All rights reserved.
        </div>
      </div>
    </footer>
  );
}
