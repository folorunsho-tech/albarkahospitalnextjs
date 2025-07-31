import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	const labs = body.labs.map((test: any) => {
		return {
			id: test?.lab_id,
			test_id: test?.id,
			result: test?.result,
			info: test?.info,
			rate: test?.rate,
		};
	});
	try {
		const found = await prisma.encounters.update({
			where: {
				id,
			},
			data: {
				labTest: {
					deleteMany: {},
					createMany: { data: labs },
				},
				updatedById: body.updatedById,
			},
			select: {
				labTest: true,
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
