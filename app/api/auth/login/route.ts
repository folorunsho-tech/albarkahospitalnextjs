export const runtime = "nodejs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";
import { generateToken } from "@/middlewares/jwt";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { username, password } = body;
	try {
		const user = await prisma.accounts.findFirst({
			where: {
				username,
			},
		});
		const valid = bcrypt.compare(password, user?.passHash!);
		if (!valid) {
			return NextResponse.json(
				{ error: "Invalid credentials" },
				{ status: 401 }
			);
		} else {
			const token = await generateToken({
				id: user?.id,
				username: user?.username,
				menu: user?.menu,
				role: user?.role,
				active: user?.active,
			});
			const res = NextResponse.json(user);
			res.cookies.set("albarkahospitaltoken", token, {
				httpOnly: true,
				path: "/",
			});

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
