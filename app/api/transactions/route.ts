import prisma from "@/config/prisma";
import { curMonth, curYear } from "@/config/ynm";
import { nanoid } from "nanoid";
import { generator } from "@/config/tnxIdGen";

export async function GET(request: Request) {
	try {
		const found = await prisma.transaction.findMany({
			include: {
				items: true,
				reciepts: true,
				patient: true,
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

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { total, balance, items, status, patientId, createdById } = body;
	const Items = items.map((item: any) => {
		return {
			id: nanoid(8),
			feeId: item?.feeId,
			price: item?.price,
			paid: item?.paid,
			balance: Number(item?.price) - Number(item?.paid),
			year: curYear,
			month: curMonth,
			name: item?.name,
			method: item?.method,
		};
	});
	const tnxItems = Items.map((item: any) => {
		return {
			id: item?.id,
			feeId: item?.feeId,
			price: item?.price,
			paid: item?.paid,
			balance: item?.balance,
			year: curYear,
			month: curMonth,
		};
	});
	const payments = Items.map((item: any) => {
		return {
			id: nanoid(8),
			itemId: item?.id,
			paid: item?.paid,
			year: curYear,
			month: curMonth,
			name: item?.name,
			method: item?.method,
			createdById,
		};
	});
	const id = await generator(curYear, curMonth);
	try {
		const created = await prisma.transaction.create({
			data: {
				id,
				total,
				status,
				balance,
				patientId,
				items: {
					createMany: {
						data: tnxItems,
					},
				},
				payments: {
					createMany: {
						data: payments,
					},
				},
				year: curYear,
				month: curMonth,
				reciepts: {
					create: {
						id: `${id}${1}`,
						items: JSON.stringify(Items),
						year: curYear,
						month: curMonth,
						status,
						createdById,
					},
				},
				createdById,
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
		return new Response(JSON.stringify(created), {
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
