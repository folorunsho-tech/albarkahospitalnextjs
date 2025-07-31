import prisma from "@/config/prisma";
import bcrypt from "bcrypt";
export const runtime = "nodejs";
export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { username, password, menu, role } = body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const created = await prisma.accounts.create({
			data: {
				passHash: hashedPassword,
				username,
				role,
				menu,
			},
		});
		return new Response(JSON.stringify(created), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
