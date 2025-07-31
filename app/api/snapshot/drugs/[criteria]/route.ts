import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ criteria: string }> }
) {
	const criteria = (await params).criteria;
	const splitted = criteria.split("n");
	const year = parseInt(splitted[0]);
	const month = String(splitted[1]);
	try {
		const found = await prisma.snapshot.findFirst({
			where: {
				month: month,
				year: year,
				type: "drugs",
			},
		});
		if (!found) {
			return new Response(JSON.stringify({ error: "Snapshot not found" }), {
				status: 404,
				headers: { "Content-Type": "application/json" },
			});
		}
		return new Response(JSON.stringify(found), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
	// e.g. Query a database for user with ID `id`
}
