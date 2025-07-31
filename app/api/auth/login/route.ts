const { createHash } = await import("node:crypto");
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import prisma from "@/config/prisma";
const hashpass = (password: string) => {
	return createHash("sha256").update(password).digest("hex");
};
const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { username, password } = body;
	try {
		const user = await prisma.accounts.findFirst({
			where: {
				username,
				passHash: hashpass(password),
			},
		});
		if (!user) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 404 }
			);
		} else {
			const token = jwt.sign(
				{ userId: user.id, username: user.username },
				JWT_SECRET,
				{
					expiresIn: "10h",
				}
			);

			const res = NextResponse.json({ success: true });
			res.cookies.set("token", token, { httpOnly: true, path: "/" });
			return res;
		}
	} catch (error) {
		console.error("Error during login:", error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
