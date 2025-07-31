import prisma from "@/config/prisma";
const { createHash } = await import("node:crypto");
const hashpass = (password: string) => {
	return createHash("sha256").update(password).digest("hex");
};
export async function GET(request: Request) {
	try {
		const found = await prisma.accounts.findMany();
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
	const { username, password, menu, createdById, updatedById, role } = body;
	try {
		const created = await prisma.accounts.create({
			data: {
				passHash: hashpass(password),
				username,
				role,
				menu,
				createdById,
				updatedById,
			},
		});

		return new Response(JSON.stringify(created), {
			status: 201,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		return new Response(JSON.stringify(error), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
