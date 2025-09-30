import prisma from "@/config/prisma";
import { curMonth, curYear } from "@/config/ynm";

export async function GET(request: Request) {
	try {
		const found = await prisma.patients.findMany({
			include: {
				groups: true,
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
	const { hosp_no } = body;
	try {
		const found = await prisma.patients.findFirst({
			where: {
				hosp_no,
			},
		});
		if (found) {
			return new Response(JSON.stringify("Already Exist"), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const created = await prisma.patients.create({
				data: {
					...body,
					reg_date: new Date(new Date(body.reg_date).setUTCHours(0, 0, 0, 0)),
					year: curYear,
					month: curMonth,
				},
				include: {
					groups: true,
				},
			});
			return new Response(JSON.stringify(created), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
