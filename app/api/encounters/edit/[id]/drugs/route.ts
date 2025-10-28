/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest } from "next/server";
import prisma from "@/config/prisma";
export async function POST(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const body = await request.json();
	const id = (await params).id;
	const drugs = body.drugs;
	const updates = body.stock_updates;
	try {
		drugs.forEach(async (drug: any) => {
			await prisma.drugsgiven.update({
				where: {
					id: drug.id,
				},
				data: {
					rate: drug.rate,
					quantity: drug.quantity,
					package: drug.package,
					price: drug.price,
					month: body.month,
					year: Number(body.year),
				},
			});
		});

		const created = await prisma.encounters.findUnique({
			where: {
				id,
			},
			include: { drugsGiven: true, patient: true },
		});
		updates.forEach(async (update: any) => {
			await prisma.drugsinventory.update({
				where: {
					id: update?.id,
				},
				data: {
					stock_qty: update?.stock_qty,
				},
			});
		});
		await prisma.prescriptionhist.createMany({
			data: drugs?.map((d: any) => {
				return {
					drug: d?.name,
					hosp_no: created?.patient?.hosp_no,
					quantity: d?.added,
					rate: d?.rate,
					price: d?.price,
					stock_remain: d?.curr_stock,
					month: body.month,
					date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
					time: body.time,
					year: Number(body.year),
					given_id: d?.id,
					enc_id: id,
				};
			}),
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
