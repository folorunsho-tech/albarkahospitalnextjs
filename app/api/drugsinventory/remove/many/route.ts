import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
import { snapshot } from "@/lib/sumarizer";

export async function POST(request: NextRequest) {
	// Parse the request body
	const { drugs }: { drugs: string[] } = await request.json();
	try {
		const deleted = await prisma.drugsinventory.deleteMany({
			where: {
				id: {
					in: drugs,
				},
			},
		});
		// Snapshot logic
		await snapshot();
		return new Response(JSON.stringify(deleted), {
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
