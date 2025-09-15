import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
import { nanoid } from "nanoid";
import { curMonth, curYear } from "@/config/ynm.js";
import { Rgenerator } from "@/config/tnxIdGen.js";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	const { balance, items, status, updatedById } = body;
	const Items = items.map((item: any) => {
		return {
			id: nanoid(8),
			paid: item?.paid,
			price: item?.price,
			balance: item?.balance,
			name: item?.name,
			method: item?.method,
		};
	});
	const tnxItems = items.map((item: any) => {
		return {
			id: item?.id,
			paid: item?.mpaid,
			balance: item?.balance,
		};
	});
	const payments = items.map((item: any) => {
		return {
			id: nanoid(8),
			itemId: item?.id,
			paid: item?.paid,
			year: curYear,
			month: curMonth,
			name: item?.name,
			method: item?.method,
			type: "balance",
			createdById: updatedById,
		};
	});
	const recieptId = await Rgenerator(id);
	try {
		tnxItems.forEach(async (i: any) => {
			await prisma.tnxitem.update({
				where: {
					id: i?.id,
				},
				data: {
					paid: i?.paid,
					balance: i?.balance,
				},
			});
		});

		const updated = await prisma.transaction.update({
			where: {
				id: id.substring(0, 7),
			},
			data: {
				status,
				balance,
				payments: {
					createMany: {
						data: payments,
					},
				},
				reciepts: {
					create: {
						id: recieptId,
						items: JSON.stringify(Items),
						year: curYear,
						month: curMonth,
						status,
						createdById: updatedById,
					},
				},
				updatedById,
				updatedAt: new Date(),
			},
			select: {
				reciepts: {
					include: {
						createdBy: {
							select: {
								username: true,
							},
						},
						transaction: {
							select: {
								patient: {
									select: {
										name: true,
										hosp_no: true,
										phone_no: true,
										town: {
											select: {
												name: true,
											},
										},
									},
								},
							},
						},
					},
					orderBy: {
						createdAt: "desc",
					},
				},
				_count: {
					select: {
						items: true,
					},
				},
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
