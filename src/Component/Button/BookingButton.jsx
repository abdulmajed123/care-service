"use client";

import Link from "next/link";

export default function BookingButton() {
  return (
    <Link href={"/bookingpage"} className="btn btn-primary w-full">
      Book This Service
    </Link>
  );
}
