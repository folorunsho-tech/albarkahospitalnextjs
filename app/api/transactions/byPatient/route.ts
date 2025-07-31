import prisma from "@/config/prisma";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { value } = body;
	try {
		const found = await prisma.transaction.findMany({
			where: {
				patient: {
					OR: [
						{
							name: value,
						},
						{
							hosp_no: value,
						},
					],
				},
				balance: {
					gt: 0,
				},
			},
			include: {
				items: {
					include: {
						fee: true,
					},
				},
				reciepts: true,
				patient: true,
				updatedBy: {
					select: {
						username: true,
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
