import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // কুকি থেকে ব্যবহারকারীর সেশন চেক করা
  const sessionCookie = request.cookies.get("studiospace_session")?.value;
  const isAuthenticated = Boolean(sessionCookie);

  // ১. কোনো স্টুডিওর ডিটেইলস পেজ (/studios/[id]) চেক করা
  // পাবলিক থাকবে শুধুমাত্র মূল '/studios' এক্সপ্লোর পেজটি।
  const isStudioDetailsPage = pathname.startsWith("/studios/") && pathname !== "/studios";

  // ২. যদি স্টুডিওর ডিটেইলস পেজ অথবা ড্যাশবোর্ড পেজ হয় এবং ইউজার লগইন না থাকে
  if (isStudioDetailsPage || pathname.startsWith("/dashboard")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      // লগইন করার পর যাতে সেই নির্দিষ্ট পেজেই ফিরে আসতে পারে
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // ৩. ইতিমধ্যে লগইন থাকলে লগইন বা রেজিস্টার পেজে ঢুকতে না দিয়ে ড্যাশবোর্ডে পাঠানো
  if (pathname === "/login" || pathname === "/register") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// যে যে রাউটে সিকিউরিটি মিডলওয়্যার রান করবে
export const config = {
  matcher: [
    "/studios/:path*",
    "/dashboard/:path*",
    "/login",
    "/register",
  ],
};