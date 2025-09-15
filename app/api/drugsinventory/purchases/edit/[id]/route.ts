import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();

	const id = (await params).id;
	try {
		const updated = await prisma.drugpurchases.update({
			where: {
				id,
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
