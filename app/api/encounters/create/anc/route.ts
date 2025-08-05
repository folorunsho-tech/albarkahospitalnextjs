/* eslint-disable @typescript-eslint/no-explicit-any */

import prisma from "@/config/prisma";
import { curMonth, curYear } from "@/config/ynm.js";

export async function POST(request: Request) {
	// Parse the request body
	const body = await request.json();
	const {
		careId,
		diagnosis,
		drugsGiven,
		labTest,
		createdById,
		time,
		stock_updates,
		anc,
		follow_up_to,
		admitted,
		admission,
		enc_date,
		outcome,
		patient_id,
	} = body;
	try {
		const diags = diagnosis?.map((diag: any) => {
			return {
				id: diag,
			};
		});
		const labs = labTest?.map((test: any) => {
			return {
				id: test?.lab_id,
				date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
				year: curYear,
				month: curMonth,
				info: test?.info,
				result: test?.result,
				test_id: test?.id,
				rate: test?.rate,
			};
		});
		const drugsG = drugsGiven?.map((drug: any) => {
			return {
				drug_id: drug?.id,
				rate: drug?.rate,
				name: drug?.name,
				quantity: drug?.quantity,
				price: drug?.price,
				date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
				year: curYear,
				month: curMonth,
			};
		});
		if (follow_up_to) {
			await prisma.followups.create({
				data: {
					encounter_id: follow_up_to,
					year: curYear,
					month: curMonth,
				},
			});
		}
		const created = await prisma.encounters.create({
			data: {
				patient_id,
				year: curYear,
				month: curMonth,
				care_id: careId,
				createdById,
				diagnosis: {
					connect: diags,
				},
				labTest: {
					createMany: {
						data: labs,
					},
				},
				drugsGiven: {
					createMany: {
						data: drugsG,
					},
				},
				time,
				enc_date: new Date(enc_date),
				admitted,
				outcome,
				anc: {
					create: {
						ega: anc?.ega,
						fe_no: anc?.fe_no,
						fe_liq_vol: anc?.fe_liq_vol,
						fe_abnormality: anc?.fe_abnormality,
						fe_diagnosis: anc?.fe_diagnosis,
						fe_live: anc?.fe_live,
						placenta_pos: anc?.placenta_pos,
						edd: anc?.edd,
						date: new Date(anc?.date),
					},
				},
			},
			include: {
				patient: true,
				care: true,
				drugsGiven: true,
			},
		});
		stock_updates.forEach(async (update: any) => {
			await prisma.drugsInventory.update({
				where: {
					id: update?.id,
				},
				data: {
					stock_qty: update?.stock_qty,
				},
			});
		});
		await prisma.prescriptionHist.createMany({
			data: drugsGiven?.map(
				(d: {
					name: string;
					quantity: string | number;
					rate: string | number;
					price: string | number;
					curr_stock: string | number;
					id: string | null;
				}) => {
					return {
						drug: d?.name,
						hosp_no: created.patient?.hosp_no,
						quantity: d?.quantity,
						rate: d?.rate,
						price: d?.price,
						stock_remain: d?.curr_stock,
						year: curYear,
						month: curMonth,
						date: new Date(new Date().setUTCHours(0, 0, 0, 0)),
						time,

						given_id: created?.drugsGiven?.find((g) => g?.drug_id == d?.id)?.id,
						enc_id: created.id,
					};
				}
			),
		});
		if (admitted) {
			await prisma.admission.create({
				data: {
					encounter_id: created.id,
					admitted_for: admission?.admitted_for,
					discharged_on: admission?.discharged_on,

					nok_phone: admission?.nok_phone,
					ward_matron: admission?.ward_matron,
					adm_date: new Date(admission?.adm_date),
				},
			});
		}

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
