import prisma from "@/config/prisma";

export async function GET(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Parse the request body
	const id = (await params).id;

	try {
		const found = await prisma.drugsinventory.findFirst({
			where: {
				id,
			},
			include: {
				givenHistory: true,
				stockHistory: true,
				updatedBy: true,
				_count: {
					select: {
						givenHistory: true,
						stockHistory: true,
					},
				},
				drug: {
					select: {
						name: true,
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
