import prisma from "@/config/prisma";

export async function GET(request: Request) {
	try {
		const found = await prisma.drugPurchases.findMany({});
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

	try {
		const created = await prisma.drugPurchases.create({
			data: {
				...body,
				date: new Date(new Date(body.date).setUTCHours(0, 0, 0, 0)),
			},
		});
		return new Response(JSON.stringify(created), {
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
