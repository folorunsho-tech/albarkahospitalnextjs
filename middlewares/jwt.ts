import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { headers } from "next/headers";

export async function verifyToken(req: NextRequest) {
	const token = (await headers()).get("Authorization");
	if (!token)
		return new NextResponse(JSON.stringify({ error: "Access denied" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "");
		if (decoded)
			// req.body = decoded.userId;
			return NextResponse.next();
	} catch (error) {
		return new Response(JSON.stringify({ error: "Invalid token" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	}
}
