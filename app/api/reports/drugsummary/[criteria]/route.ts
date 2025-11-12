import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
import { drugsSummaryCompute } from "@/lib/sumarizer";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ criteria: string }> }
) {
	const criteria = (await params).criteria;
	const body = await request.json();
	const { value } = body;
	try {
		if (criteria == "year") {
			const found = await prisma.drugsummary.findMany({
				where: {
					year: value,
				},

				orderBy: {
					name: "asc",
				},
			});
			const data = await drugsSummaryCompute(found, criteria);
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "yearnmonth") {
			const found = await prisma.drugsummary.findMany({
				where: {
					year: value?.year,
					month: value?.month,
				},

				orderBy: {
					name: "asc",
				},
			});
			const data = await drugsSummaryCompute(found, criteria);
			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "date") {
			const found = await prisma.drugsummary.findMany({
				where: {
					AND: [
						{
							updatedAt: {
								gte: new Date(new Date(value).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							updatedAt: {
								lte: new Date(new Date(value).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},

				orderBy: {
					name: "asc",
				},
			});
			const data = await drugsSummaryCompute(found, criteria);

			return new Response(JSON.stringify(data), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else if (criteria == "range") {
			const found = await prisma.drugsummary.findMany({
				where: {
					AND: [
						{
							updatedAt: {
								gte: new Date(new Date(value?.from).setUTCHours(0, 0, 0, 0)),
							},
						},
						{
							updatedAt: {
								lte: new Date(new Date(value?.to).setUTCHours(23, 0, 0, 0)),
							},
						},
					],
				},

				orderBy: {
					name: "asc",
				},
			});
			const data = await drugsSummaryCompute(found, criteria);

			return new Response(JSON.stringify(data), {
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
}
