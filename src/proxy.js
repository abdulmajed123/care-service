import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const privateRoutes = ["/mybookings", "/bookingpage"];
export async function proxy(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAthenticated = Boolean(token);
  const isPrivateReq = privateRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route),
  );
  if (!isAthenticated && isPrivateReq) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  console.log("Token:", token);

  return NextResponse.next();
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/mybookings/:path*", "/bookingpage/:path*"],
};
