export const runtime = "nodejs";

import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export async function GET(request: Request) {
	try {
		const found = await prisma.accounts.findMany();
		return new Response(JSON.stringify(found), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);

		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { username, password, menu, createdById, updatedById, role } = body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const created = await prisma.accounts.create({
			data: {
				passHash: hashedPassword,
				username,
				role,
				menu,
				createdById,
				updatedById,
			},
		});

		return new Response(JSON.stringify(created), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);

		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
