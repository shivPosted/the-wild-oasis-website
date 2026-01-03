import { MiddlewareConfig, NextRequest, NextResponse } from "next/server";

// export function middleware(req: NextRequest) {
//   return NextResponse.redirect(new URL("/about", req.url)); //NOTE: create too many redirects without using matcher , an infinite loop
// }

import { auth } from "@/app/_lib/auth";
export const middleware = auth;

export const config: MiddlewareConfig = {
  matcher: ["/account"],
};
