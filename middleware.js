import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/patients/:path*",
    "/appointments/:path*",
    "/claims/:path*",
    "/payments/:path*",
    "/reports/:path*",
    "/settings/:path*",
    "/portal/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/verify-email",
    "/api/patients/:path*",
    "/api/claims/:path*",
    "/api/payments/:path*",
  ],
};
