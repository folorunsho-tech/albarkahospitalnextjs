import prisma from "@/config/prisma";

export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Parse the request body
	const body = await request.json();
	const id = (await params).id;
	try {
		const updated = await prisma.procedures.update({
			where: {
				id: id,
			},
			data: body,
		});
		return new Response(JSON.stringify(updated), {
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
