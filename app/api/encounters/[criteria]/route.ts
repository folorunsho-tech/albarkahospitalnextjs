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
			const found = await prisma.encounters.findMany({
				where: {
					year: value,
				},
				include: {
					care: true,
					patient: true,
					_count: {
						select: {
							diagnosis: true,
							drugsGiven: true,
							labTest: true,
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
			const found = await prisma.encounters.findMany({
				where: {
					year: value?.year,
					month: value?.month,
				},
				include: {
					patient: true,
					care: true,
					_count: {
						select: {
							diagnosis: true,
							drugsGiven: true,
							labTest: true,
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
			const found = await prisma.encounters.findMany({
				where: {
					AND: [
						{
							enc_date: {
								gte: new Date(new Date(value).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							enc_date: {
								lte: new Date(new Date(value).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					patient: true,
					care: true,
					_count: {
						select: {
							diagnosis: true,
							drugsGiven: true,
							labTest: true,
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
			const found = await prisma.encounters.findMany({
				where: {
					AND: [
						{
							enc_date: {
								gte: new Date(new Date(value?.from).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							enc_date: {
								lte: new Date(new Date(value?.to).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},
				include: {
					patient: true,
					care: true,
					_count: {
						select: {
							diagnosis: true,
							drugsGiven: true,
							labTest: true,
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
