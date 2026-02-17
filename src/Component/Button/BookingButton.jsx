"use client";

import Link from "next/link";

export default function BookingButton({ id }) {
  return (
    <Link href={`/bookingpage/${id}`} className="btn btn-primary w-full">
      Book This Service
    </Link>
  );
}
