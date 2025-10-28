import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ criteria: string }> }
) {
	const criteria = (await params).criteria;
	const body = await request.json();
	const { value } = body;
	try {
		if (criteria == "year") {
			const found = await prisma.payment.findMany({
				where: {
					year: value,
				},
				include: {
					transaction: {
						select: {
							patient: true,
						},
					},
					tnxItem: {
						select: {
							balance: true,
							price: true,
						},
					},
					createdBy: {
						select: {
							username: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "yearnmonth") {
			const found = await prisma.payment.findMany({
				where: {
					year: value?.year,
					month: value?.month,
				},
				include: {
					transaction: {
						select: {
							patient: true,
						},
					},
					tnxItem: {
						select: {
							balance: true,
							price: true,
						},
					},
					createdBy: {
						select: {
							username: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "date") {
			const found = await prisma.payment.findMany({
				where: {
					AND: [
						{
							createdAt: {
								gte: new Date(new Date(value).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							createdAt: {
								lte: new Date(new Date(value).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					transaction: {
						select: {
							patient: true,
						},
					},
					tnxItem: {
						select: {
							balance: true,
							price: true,
						},
					},
					createdBy: {
						select: {
							username: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "range") {
			const found = await prisma.payment.findMany({
				where: {
					AND: [
						{
							createdAt: {
								gte: new Date(new Date(value?.from).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							createdAt: {
								lte: new Date(new Date(value?.to).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					transaction: {
						select: {
							patient: true,
						},
					},
					tnxItem: {
						select: {
							balance: true,
							price: true,
						},
					},
					createdBy: {
						select: {
							username: true,
						},
					},
				},
				orderBy: {
					createdAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
	// e.g. Query a database for user with ID `id`
}
