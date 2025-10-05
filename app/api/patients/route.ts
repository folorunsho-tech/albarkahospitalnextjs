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
	const {
		hosp_no,
		sex,
		group_id,
		reg_date,
		religion,
		age,
		no,
		address,
		name,
		phone_no,
		occupation,
	} = body;
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
	}
	const townExist = await prisma.town.findFirst({
		where: {
			name: address,
		},
	});

	try {
		if (!townExist && address !== "") {
			const town = await prisma.town.create({
				data: {
					name: address,
				},
			});
			const created = await prisma.patients.create({
				data: {
					hosp_no,
					sex,
					group_id,
					religion,
					age,
					no,
					name,
					phone_no,
					occupation,
					reg_date: new Date(body.reg_date),
					year: curYear,
					month: curMonth,
					townId: town.id,
				},
				include: {
					groups: true,
				},
			});
			return new Response(JSON.stringify(created), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const created = await prisma.patients.create({
				data: {
					hosp_no,
					sex,
					group_id,
					religion,
					age,
					no,
					name,
					phone_no,
					occupation,
					reg_date: new Date(new Date(body.reg_date).setUTCHours(0, 0, 0, 0)),
					year: curYear,
					month: curMonth,
					townId: townExist?.id,
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
