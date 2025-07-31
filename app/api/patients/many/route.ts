import { NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function POST(request: NextRequest) {
	// Parse the request body
	const body = await request.json();
	try {
		const created = await prisma.patients.createMany({
			data: [...body],
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
