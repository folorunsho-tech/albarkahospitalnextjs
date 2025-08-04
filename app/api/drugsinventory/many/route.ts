import { NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function POST(request: NextRequest) {
	// Parse the request body
	const { drugs, createdById } = await request.json();
	const added = drugs.map((d: { id: string }) => {
		return {
			drugId: d.id,
			createdById,
		};
	});
	try {
		const created = await prisma.drugsInventory.createMany({
			data: [...added],
		});
		return new Response(JSON.stringify(created), {
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
