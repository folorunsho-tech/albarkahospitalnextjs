import prisma from "@/config/prisma";
import { snapshot } from "@/lib/sumarizer";

export async function GET(request: Request) {
	try {
		const found = await prisma.drugsinventory.findMany({
			orderBy: {
				updatedAt: "desc",
			},
			include: {
				drug: true,
			},
		});
		return new Response(JSON.stringify(found), {
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

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { drugs, createdById, updatedById } = body;
	const toAdd = drugs.map((drug: any) => {
		return {
			createdById,
			updatedById,
			drugId: drug,
		};
	});
	try {
		const created = await prisma.drugsinventory.createMany({
			data: [...toAdd],
		});
		// Snapshot logic
		await snapshot();
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
