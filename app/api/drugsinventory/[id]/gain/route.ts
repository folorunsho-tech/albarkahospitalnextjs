import prisma from "@/config/prisma";
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];
export async function POST(
	request: Request,
	{ params }: { params: Promise<{ id: string }> }
) {
	// Parse the request body
	const body = await request.json();
	const id = (await params).id;

	const { stock_qty, added, rate, prevStock, updatedById } = body;
	try {
		const updated = await prisma.drugsinventory.update({
			where: {
				id,
			},
			data: {
				stock_qty,
				added,
				rate,
				updatedById,
			},
			include: {
				drug: true,
			},
		});
		const drugHist = await prisma.stockshistory.create({
			data: {
				drug_id: updated.id,
				updatedById: updated.updatedById,
				stock_qty: prevStock,
				added: updated.added,
				month: months[new Date().getMonth()],
				year: new Date().getFullYear(),
				updatedAt: new Date(new Date().setUTCHours(0, 0, 0, 0)),
				name: updated?.drug?.name,
				type: "gain",
			},
		});
		return new Response(JSON.stringify({ updated, drugHist }), {
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
