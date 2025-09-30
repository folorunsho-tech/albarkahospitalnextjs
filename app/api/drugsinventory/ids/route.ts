import prisma from "@/config/prisma";

export async function GET(request: Request) {
	try {
		const found = await prisma.drugsinventory.findMany({
			select: {
				drugId: true,
			},
		});
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
