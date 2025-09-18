/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEdit } from "@/queries";
import {
	Button,
	LoadingOverlay,
	NumberInput,
	Select,
	TextInput,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
const Outcome = ({ enc_id }: { enc_id: string | null }) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [adm_date, setAdmDate] = useState<any>(null);
	const [discharged_on, setDischargedOn] = useState<any>(null);
	const [nok_phone, setNokPhone] = useState<any>("");
	const [ward_matron, setMatron] = useState<any>("");
	const [outcome, setOutcome] = useState<any>("");
	const [admitted_for, setAdmittedFor] = useState<number | string>();
	useEffect(() => {
		async function getData() {
			const { data } = await fetch(`/encounters/e/${enc_id}`);
			setOutcome(data?.outcome);
			setAdmDate(data?.admission?.adm_date || null);
			setDischargedOn(data?.admission?.discharged_on || null);
			setNokPhone(data?.admission?.nok_phone || "");
			setMatron(data?.admission?.ward_matron || "");
			setAdmittedFor(data?.admission?.admitted_for || "");
		}
		getData();
	}, []);
	return (
		<form
			className='flex flex-col gap-2'
			onSubmit={async (e) => {
				e.preventDefault();
				const { data: res } = await edit(`/encounters/edit/${enc_id}/outcome`, {
					adm_date,
					discharged_on,
					nok_phone,
					ward_matron,
					outcome,
					admitted_for: Number(admitted_for),
				});

				setOutcome(res?.outcome);
				setAdmDate(res?.admission?.adm_date);
				setDischargedOn(res?.admission?.discharged_on);
				setNokPhone(res?.admission?.nok_phone);
				setMatron(res?.admission?.ward_matron);
				setAdmittedFor(res?.admission?.admitted_for);
			}}
		>
			<Select
				placeholder='outcome'
				label='Outcome'
				className='w-max'
				data={[
					"Admitted",
					"DAMA",
					"Dead",
					"Discharged",
					"Police Case",
					"ReferGH",
					"ReferFMC",
					"ReferUITH",
					"Treated",
				]}
				value={outcome}
				onChange={(value: any) => {
					setOutcome(value);
				}}
			/>
			<label className='font-bold underline'>Admission</label>
			{outcome == "Admitted" && (
				<div className='flex flex-wrap gap-4'>
					<DatePickerInput
						value={adm_date}
						onChange={setAdmDate}
						label='Admission date'
						placeholder='adm date'
						className='w-44'
						allowDeselect
						clearable
						closeOnChange={false}
						required
					/>
					<TextInput
						label='NOK Phone'
						placeholder='phone number'
						value={nok_phone}
						onChange={(e) => {
							setNokPhone(e.currentTarget.value);
						}}
					/>
					<NumberInput
						label='Days of Admission'
						placeholder='Days of Admission'
						value={admitted_for}
						suffix=' Days'
						onChange={(value) => {
							setAdmittedFor(value);
						}}
					/>
					<DatePickerInput
						value={discharged_on}
						onChange={setDischargedOn}
						label='Date of Discharge'
						placeholder='Discharged date'
						className='w-44'
						allowDeselect
						clearable
						closeOnChange={false}
					/>
					<TextInput
						label='Ward Matron'
						placeholder='Ward Matron'
						value={ward_matron}
						onChange={(e) => {
							setMatron(e.currentTarget.value);
						}}
					/>
				</div>
			)}
			<Button color='teal' w={200} type='submit' disabled={!adm_date} mt={10}>
				Update outcome
			</Button>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Outcome;
