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
			const drugsgiven = await prisma.drugsgiven.groupBy({
				by: ["name"],
				_sum: {
					quantity: true,
					price: true,
				},
				having: {
					quantity: {
						_sum: {
							gt: 0,
						},
					},
				},
				orderBy: {
					name: "asc",
				},
				where: {
					year: value,
				},
			});
			return new Response(JSON.stringify(drugsgiven), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "yearnmonth") {
			const drugsgiven = await prisma.drugsgiven.groupBy({
				by: ["name"],
				_sum: {
					quantity: true,
					price: true,
				},
				having: {
					quantity: {
						_sum: {
							gt: 0,
						},
					},
				},
				orderBy: {
					name: "asc",
				},
				where: {
					year: value?.year,
					month: value?.month,
				},
			});
			return new Response(JSON.stringify(drugsgiven), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "date") {
			const drugsgiven = await prisma.drugsgiven.groupBy({
				by: ["name"],
				_sum: {
					quantity: true,
					price: true,
				},
				having: {
					quantity: {
						_sum: {
							gt: 0,
						},
					},
				},
				orderBy: {
					name: "asc",
				},
				where: {
					AND: [
						{
							date: {
								gte: new Date(new Date(value).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							date: {
								lte: new Date(new Date(value).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
			});
			return new Response(JSON.stringify(drugsgiven), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "range") {
			const drugsgiven = await prisma.drugsgiven.groupBy({
				by: ["name"],
				_sum: {
					quantity: true,
					price: true,
				},
				having: {
					quantity: {
						_sum: {
							gt: 0,
						},
					},
				},
				orderBy: {
					name: "asc",
				},
				where: {
					AND: [
						{
							date: {
								gte: new Date(new Date(value?.from).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							date: {
								lte: new Date(new Date(value?.to).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
			});
			return new Response(JSON.stringify(drugsgiven), {
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
