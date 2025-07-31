import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
const { createHash } = await import("node:crypto");
const hashpass = (password: string) => {
	return createHash("sha256").update(password).digest("hex");
};
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Parse the request body
	const id = (await params).id;
	const body = await request.json();
	const { password, menu, updatedById, role, active } = body;
	try {
		if (password) {
			const updated = await prisma.accounts.update({
				where: {
					id,
				},
				data: {
					passHash: hashpass(password),
					menu,
					updatedById,
					role,
					active,
				},
			});
			return new Response(JSON.stringify(updated), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			const updated = await prisma.accounts.update({
				where: {
					id,
				},
				data: {
					menu,
					updatedById,
					role,
					active,
				},
			});
			return new Response(JSON.stringify(updated), {
				status: 201,
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
