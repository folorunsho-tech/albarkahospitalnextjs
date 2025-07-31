import prisma from "@/config/prisma";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { id } = body;
	try {
		const found = await prisma.encounters.findMany({
			where: {
				patient_id: id,
			},

			include: {
				care: true,
				patient: true,
				_count: {
					select: {
						drugsGiven: true,
						labTest: true,
						diagnosis: true,
					},
				},
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
