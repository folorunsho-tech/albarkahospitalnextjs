import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ account_id: string }> }
) {
	const account_id = (await params).account_id;
	try {
		const found = await prisma.accounts.findUnique({
			where: {
				id: account_id,
			},
		});
		return new Response(JSON.stringify(found), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
