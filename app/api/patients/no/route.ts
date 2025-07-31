import prisma from "@/config/prisma";
import { curYear } from "@/config/ynm.js";
export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const { year } = body;
	try {
		const found = await prisma.patients.findMany({
			where: {
				year: Number(year),
			},
			select: {
				hosp_no: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
		const gotten = found[0];
		if (!gotten) {
			const card = `${curYear}/1`;
			return new Response(JSON.stringify(card), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const splited = gotten.hosp_no?.split("/");
			const no = Number(splited[1]) + 1;
			const card = `${splited[0]}/${no}`;
			return new Response(JSON.stringify(card), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
