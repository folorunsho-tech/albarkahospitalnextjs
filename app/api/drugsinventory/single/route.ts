import prisma from "@/config/prisma";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { name, createdById, updatedById } = body;

	try {
		const setDrug = await prisma.drugs.create({
			data: { name },
		});
		const created = await prisma.drugsinventory.create({
			data: {
				drugId: setDrug.id,
				createdById,
				updatedById,
			},
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
