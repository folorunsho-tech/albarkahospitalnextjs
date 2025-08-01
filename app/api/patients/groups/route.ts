import prisma from "@/config/prisma";

export async function GET(request: Request) {
	try {
		const found = await prisma.groups.findMany();
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
