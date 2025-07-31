import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	try {
		const found = await prisma.anc.findUnique({
			where: {
				id: body.anc_id ? body.anc_id : "",
			},
		});
		if (found) {
			const updated = await prisma.anc.update({
				where: {
					id: body.anc_id,
				},
				data: {
					...body.anc,
				},
			});
			if (updated) {
				await prisma.encounters.update({
					where: {
						id: updated.encounter_id!,
					},
					data: {
						updatedAt: new Date(),
					},
				});
			}
		} else {
			const updated = await prisma.anc.create({
				data: {
					encounter_id: id,
					...body.anc,
				},
			});
			if (updated) {
				await prisma.encounters.update({
					where: {
						id: updated.encounter_id!,
					},
					data: {
						updatedAt: new Date(),
					},
				});
			}
		}
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
