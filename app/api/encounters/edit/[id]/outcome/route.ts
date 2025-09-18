import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const {
		updatedById,
		adm_date,
		discharged_on,
		nok_phone,
		ward_matron,
		outcome,
		admitted_for,
		admitted,
	} = await request.json();
	const id = (await params).id;

	try {
		if (outcome === "Admitted") {
			const found = await prisma.encounters.update({
				where: {
					id,
				},
				data: {
					admission: {
						upsert: {
							create: {
								adm_date: new Date(adm_date) || null,
								admitted_for,
								discharged_on: new Date(discharged_on) || null,
								nok_phone,
								ward_matron,
							},
							update: {
								adm_date: new Date(adm_date) || null,
								admitted_for,
								discharged_on: new Date(discharged_on) || null,
								nok_phone,
								ward_matron,
							},
						},
					},
					updatedById,
					admitted: outcome === "Admitted" ? true : false,
					outcome,
				},
				select: {
					outcome: true,
					admitted: true,
					admission: true,
				},
			});
			return new Response(JSON.stringify(found), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const found = await prisma.encounters.update({
				where: {
					id,
				},
				data: {
					updatedById,
					admitted,
					outcome,
				},
				select: {
					outcome: true,
					admitted: true,
					admission: true,
				},
			});
			return new Response(JSON.stringify(found), {
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
