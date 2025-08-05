/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const id = (await params).id;
	try {
		const found = await prisma.encounters.findUnique({
			where: {
				id,
			},

			include: {
				drugsGiven: {
					include: {
						drug: true,
					},
				},
				diagnosis: true,
				care: true,
				updatedBy: true,
				labTest: {
					include: {
						testType: true,
					},
				},
				patient: {
					include: {
						town: true,
					},
				},
				operations: {
					include: {
						procedure: true,
					},
				},
				delivery: true,
				follow_ups: true,
				admission: true,
				immunization: true,
				anc: true,
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
