import { NextRequest } from "next/server";
import prisma from "@/config/prisma";

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;

	try {
		const outstandingFees = await prisma.tnxItem.findMany({
			where: {
				transaction: {
					patientId: id,
				},
				balance: {
					gt: 0,
				},
				active: true,
			},
			include: {
				fee: true,
			},
		});
		return new Response(JSON.stringify(outstandingFees), {
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
