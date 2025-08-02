// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./middlewares/jwt";

const PUBLIC_PATHS = ["/login", "/register"];
export function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// Allow public routes
	if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
		return NextResponse.next();
	}
	const token = req.cookies.get("token")?.value;
	if (!token) return NextResponse.redirect(new URL("/login", req.url));
	try {
		verifyToken(req);
	} catch (error) {
		console.log(error);
		return NextResponse.redirect(new URL("/login", req.url));
	}
}

export const config = {
	matcher: ["/((?!api|_next|favicon.ico).*)"], // Apply to all pages except static & API
};
