import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
import { nanoid } from "nanoid";
import { curMonth, curYear } from "@/config/ynm.js";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	const { status, toReverse, updatedById } = body;
	const payments = toReverse.map((item: any) => {
		return {
			id: nanoid(8),
			itemId: item?.id,
			paid: item?.paid,
			year: curYear,
			month: curMonth,
			name: item?.name,
			method: "",
			type: "reversal",
			createdById: updatedById,
		};
	});

	try {
		toReverse.forEach(async (i: any) => {
			await prisma.tnxItem.update({
				where: {
					id: i?.id,
				},
				data: {
					active: i?.active,
				},
			});
		});

		const updated = await prisma.transaction.update({
			where: {
				id,
			},
			data: {
				status,

				payments: {
					createMany: {
						data: payments,
					},
				},
				updatedById,
				updatedAt: new Date(),
			},
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
