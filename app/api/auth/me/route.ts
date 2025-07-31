import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
export async function GET(request: Request) {
	const cookieStore = await cookies();
	const token = cookieStore.get("token");
	if (!token)
		return new Response(JSON.stringify({ error: "Unauthorized" }), {
			status: 401,
			headers: { "Content-Type": "application/json" },
		});
	try {
		const user = jwt.verify(token.value, JWT_SECRET);
		return new Response(JSON.stringify(user), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: "Invalid Token" }), {
			status: 403,
			headers: { "Content-Type": "application/json" },
		});
	}
}
