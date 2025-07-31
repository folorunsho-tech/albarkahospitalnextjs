import prisma from "@/config/prisma";
import { curMonth, curYear } from "@/config/ynm.js";
export async function GET(request: Request) {
	try {
		const drugs = await prisma.drugsInventory.findMany({
			where: {
				OR: [
					{
						drugPurchases: {
							some: {
								month: curMonth,
								year: curYear,
							},
						},
					},
					{
						stockHistory: {
							some: {
								month: curMonth,
								year: curYear,
							},
						},
					},
					{
						givenHistory: {
							some: {
								month: curMonth,
								year: curYear,
							},
						},
					},
				],
			},
			select: {
				drug: true,
				stock_qty: true,
				stockHistory: {
					select: {
						added: true,
						type: true,
					},
				},

				drugPurchases: {
					select: {
						quantity: true,
						price: true,
					},
				},
				givenHistory: {
					select: {
						quantity: true,
					},
				},
			},
			orderBy: {
				drug: {
					name: "asc",
				},
			},
		});
		const final = drugs.map((drug: any) => {
			return {
				name: drug.drug.name,
				curr_stock: drug.stock_qty,
				totalSLoss: drug.stockHistory.reduce(
					(acc: any, stock: { type: string; added: any }) => {
						if (stock.type === "loss") {
							return acc + stock.added;
						}
						return acc;
					},
					0
				),
				totalSGain: drug.stockHistory.reduce(
					(acc: any, stock: { type: string; added: any }) => {
						if (stock.type === "gain") {
							return acc + stock.added;
						}
						return acc;
					},
					0
				),
				prescriptions: drug.givenHistory.reduce(
					(acc: any, given: { quantity: any }) => {
						return acc + given.quantity;
					},
					0
				),
				// totalPurchasePrice: drug.drugPurchases.reduce((acc, purchase) => {
				// 	return acc + purchase.price;
				// }, 0),
				totalPurchaseQty: drug.drugPurchases.reduce(
					(acc: any, purchase: { quantity: any }) => {
						return acc + purchase.quantity;
					},
					0
				),
			};
		});
		//Check if a snapshot for the current month and year already exists
		const existingSnapshot = await prisma.snapshot.findFirst({
			where: {
				month: curMonth,
				year: curYear,
				type: "drugs",
			},
		});
		if (existingSnapshot) {
			// Update the existing snapshot
			const updatedSnapshot = await prisma.snapshot.update({
				where: {
					id: existingSnapshot.id,
				},
				data: {
					data: final,
				},
			});
			return new Response(JSON.stringify(updatedSnapshot), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		} else {
			// Create a new snapshot
			const newSnapshot = await prisma.snapshot.create({
				data: {
					month: curMonth,
					year: curYear,
					type: "drugs",
					data: final,
				},
			});
			return new Response(JSON.stringify(newSnapshot), {
				status: 200,
				headers: { "Content-Type": "application/json" },
			});
		}
	} catch (error) {
		console.log(error);
		return new Response(JSON.stringify({ error: "Internal Server Error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
}
