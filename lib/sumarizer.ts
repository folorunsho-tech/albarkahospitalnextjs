import prisma from "@/config/prisma";
import { curMonth, curYear } from "@/config/ynm";
export async function snapshot() {
	const date = new Date();
	const maxDate = new Date(new Date(date).setUTCHours(23, 59, 59, 999));
	const minDate = new Date(new Date(date).setUTCHours(0, 0, 0, 0));
	try {
		const drugs = await prisma.drugsinventory.findMany({
			// where: {
			// 	OR: [
			// 		{
			// 			stockHistory: {
			// 				some: {
			// 					updatedAt: {
			// 						gte: minDate,
			// 						lte: maxDate,
			// 					},
			// 				},
			// 			},
			// 		},
			// 		{
			// 			givenHistory: {
			// 				some: {
			// 					updatedAt: {
			// 						gte: minDate,
			// 						lte: maxDate,
			// 					},
			// 				},
			// 			},
			// 		},
			// 	],
			// },
			select: {
				drug: {
					select: {
						name: true,
					},
				},
				stock_qty: true,
				id: true,
				_count: {
					select: {
						givenHistory: {
							where: {
								updatedAt: {
									gte: minDate,
									lte: maxDate,
								},
							},
						},
					},
				},
			},
		});
		const prescriptions = await prisma.drugsgiven.findMany({
			where: {
				updatedAt: {
					gte: minDate,
					lte: maxDate,
				},
			},
			select: {
				quantity: true,
				name: true,
				id: true,
			},
		});
		const stocks = await prisma.stockshistory.findMany({
			where: {
				updatedAt: {
					gte: minDate,
					lte: maxDate,
				},
			},
			select: {
				name: true,
				type: true,
				added: true,
				drug_id: true,
			},
		});
		drugs.map(async (drug) => {
			const summ = await prisma.drugsummary.findFirst({
				where: {
					name: drug.drug.name,
					updatedAt: minDate,
				},
				select: {
					id: true,
				},
			});
			const stockHistory = stocks.filter(
				(stock) => stock.name === drug.drug.name
			);
			const losses = stockHistory.filter((s) => s.type === "loss");
			const gains = stockHistory.filter((s) => s.type === "gain");
			const input = drugs?.find(
				(d) => d.drug?.name === drug.drug.name
			)?.stock_qty;

			const dPrescriptions = prescriptions.filter(
				(p) => p.name === drug.drug.name
			);
			const totalSLoss = losses.reduce((acc, loss) => {
				return acc + Number(loss.added);
			}, 0);
			const totalSGain = gains.reduce((acc, gain) => {
				return acc + Number(gain.added);
			}, 0);
			if (!summ) {
				await prisma.drugsummary.create({
					data: {
						month: curMonth,
						year: curYear,
						name: drug.drug.name,
						encounters: drug._count.givenHistory || 0,
						stockStart: input,
						prescriptions: dPrescriptions.reduce(
							(acc: any, given: { quantity: any }) => {
								return acc + given.quantity;
							},
							0
						),
						createdAt: minDate,
						updatedAt: minDate,
					},
				});
			} else {
				await prisma.drugsummary.update({
					where: {
						id: summ?.id,
					},
					data: {
						totalSLoss,
						totalSGain,
						encounters: drug._count.givenHistory || 0,
						prescriptions: dPrescriptions.reduce(
							(acc: any, given: { quantity: any }) => {
								return acc + given.quantity;
							},
							0
						),
						createdAt: minDate,
						updatedAt: minDate,
					},
				});
			}
		});
	} catch (error) {
		console.log(error);
		return { message: "Internal Server Error", error };
	}
}
type DrugSummary = {
	name: string | null;
	stockStart: number | null;
	totalSGain: number | null;
	totalSLoss: number | null;
	prescriptions: number | null;
	encounters: number | null;
	year: number | null;
	month: string | null;
};
export async function drugsSummaryCompute(
	data: DrugSummary[],
	criteria: string
) {
	if (criteria == "date") {
		return data;
	} else {
		const returned: DrugSummary[] = [];
		data.forEach((row) => {
			const isExist = returned.find((i) => i.name == row.name);
			if (isExist) {
				return isExist;
			} else {
				const drug = data?.filter((r) => {
					return r?.name === row?.name;
				});
				returned.push({
					name: row.name,
					stockStart: drug.reduce((acc, r) => acc + Number(r.stockStart), 0),
					totalSGain: drug.reduce((acc, r) => acc + Number(r.totalSGain), 0),
					totalSLoss: drug.reduce((acc, r) => acc + Number(r.totalSLoss), 0),
					prescriptions: drug.reduce(
						(acc, r) => acc + Number(r.prescriptions),
						0
					),
					encounters: drug.reduce((acc, r) => acc + Number(r.encounters), 0),
					year: row.year,
					month: row.month,
				});
			}
		});

		return returned;
	}
}
