export const runtime = "nodejs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
const JWT_SECRET = process.env.JWT_SECRET!;
export async function GET(request: NextRequest) {
	const token = request.cookies.get("token");
	if (!token)
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	try {
		const user = jwt.verify(token.value, JWT_SECRET);
		const res = NextResponse.json(user);
		return res;
	} catch (err) {
		return new Response(JSON.stringify({ error: "Invalid Token" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}
}
