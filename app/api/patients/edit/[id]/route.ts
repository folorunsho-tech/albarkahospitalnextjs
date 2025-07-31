import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	try {
		const edited = await prisma.patients.update({
			where: {
				id,
			},
			data: {
				...body,
				reg_date: new Date(new Date(body.reg_date).setUTCHours(0, 0, 0, 0)),
			},
			include: {
				updatedBy: true,
				groups: true,
			},
		});
		return new Response(JSON.stringify(edited), {
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
