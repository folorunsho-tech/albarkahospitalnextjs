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
			const found = await prisma.operations.findMany({
				where: {
					encounter: {
						year: value,
					},
				},
				include: {
					procedure: true,
					encounter: {
						include: {
							patient: true,
						},
					},
				},
				orderBy: {
					updatedAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "yearnmonth") {
			const found = await prisma.operations.findMany({
				where: {
					encounter: {
						year: value?.year,
						month: value?.month,
					},
				},
				include: {
					procedure: true,
					encounter: {
						include: {
							patient: true,
						},
					},
				},
				orderBy: {
					updatedAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "date") {
			const found = await prisma.operations.findMany({
				where: {
					AND: [
						{
							proc_date: {
								gte: new Date(new Date(value).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							proc_date: {
								lte: new Date(new Date(value).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					procedure: true,
					encounter: {
						include: {
							patient: true,
						},
					},
				},
				orderBy: {
					updatedAt: "desc",
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "range") {
			const found = await prisma.operations.findMany({
				where: {
					AND: [
						{
							proc_date: {
								gte: new Date(new Date(value?.from).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							proc_date: {
								lte: new Date(new Date(value?.to).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					procedure: true,
					encounter: {
						include: {
							patient: true,
						},
					},
				},
				orderBy: {
					updatedAt: "desc",
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
