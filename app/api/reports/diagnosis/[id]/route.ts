import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;
	const body = await request.json();
	const { value, criteria } = body;
	try {
		if (criteria == "year") {
			const found = await prisma.encounters.findMany({
				where: {
					AND: [
						{
							year: value,
						},
						{
							diagnosis: {
								some: {
									id,
								},
							},
						},
					],
				},
				include: {
					care: true,
					follow_ups: {
						include: {
							encounter: {
								select: {
									diagnosis: { select: { name: true } },
									care: true,
								},
							},
						},
					},
					diagnosis: true,
					_count: {
						select: {
							drugsGiven: true,
							labTest: true,
							anc: true,
							immunization: true,
							follow_ups: true,
						},
					},
					patient: true,
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
					AND: [
						{
							year: value?.year,
							month: value?.month,
						},
						{
							diagnosis: {
								some: {
									id,
								},
							},
						},
					],
				},

				include: {
					care: true,
					follow_ups: {
						include: {
							encounter: {
								select: {
									care: true,
									diagnosis: { select: { name: true } },
								},
							},
						},
					},
					diagnosis: true,
					_count: {
						select: {
							drugsGiven: true,
							labTest: true,
							anc: true,
							follow_ups: true,
							immunization: true,
						},
					},
					patient: true,
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
						{
							diagnosis: {
								some: {
									id,
								},
							},
						},
					],
				},
				include: {
					care: true,
					follow_ups: {
						include: {
							encounter: {
								select: {
									diagnosis: { select: { name: true } },
									care: true,
								},
							},
						},
					},
					diagnosis: true,
					_count: {
						select: {
							drugsGiven: true,
							labTest: true,
							anc: true,
							follow_ups: true,
							immunization: true,
						},
					},
					patient: true,
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
						{
							diagnosis: {
								some: {
									id,
								},
							},
						},
					],
				},
				include: {
					care: true,
					follow_ups: {
						include: {
							encounter: {
								select: {
									diagnosis: { select: { name: true } },
									care: true,
								},
							},
						},
					},
					diagnosis: true,
					_count: {
						select: {
							drugsGiven: true,
							labTest: true,
							anc: true,
							follow_ups: true,
							immunization: true,
						},
					},
					patient: true,
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
