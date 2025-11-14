import prisma from "@/config/prisma";

export async function GET(request: Request) {
	try {
		const found = await prisma.drugsinventory.findMany({
			orderBy: {
				updatedAt: "desc",
			},
			include: {
				drug: {
					select: {
						name: true,
					},
				},
				updatedBy: {
					select: {
						username: true,
					},
				},
				_count: {
					select: {
						givenHistory: true,
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
