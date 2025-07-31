import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	const diags = body.diagnosis.map((diag: any) => {
		return {
			id: diag,
		};
	});
	try {
		const found = await prisma.encounters.update({
			where: {
				id,
			},
			data: {
				diagnosis: {
					set: [],
					connect: diags,
				},
				updatedById: body.updatedById,
			},
			select: {
				diagnosis: true,
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
