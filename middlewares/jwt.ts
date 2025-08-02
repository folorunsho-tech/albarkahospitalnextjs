export const runtime = "nodejs";

import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";

export async function verifyToken(req: NextRequest) {
	const token = req.cookies.get("token")?.value;
	if (!token)
		return new NextResponse(JSON.stringify({ error: "Access denied" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	try {
		jwt.verify(token, process.env.JWT_SECRET!);
		return NextResponse.next();
	} catch (error) {
		return new Response(JSON.stringify({ error: "Invalid token" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}
}
