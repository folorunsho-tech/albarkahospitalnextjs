/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEdit } from "@/queries";
import { Button, LoadingOverlay, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Immunization = ({ enc_id }: { enc_id: string | null }) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [date, setDate] = useState<Date | null | string>(null);
	const [next_date, setNDate] = useState<Date | null | string>(null);
	const [type, setType] = useState<any>("");
	const [immunization_id, setImmId] = useState<null | string>("");

	useEffect(() => {
		async function getData() {
			const { data } = await fetch(`/encounters/${enc_id}`);

			const imm = data?.immunization[0];
			setImmId(imm?.id);
			setType(imm?.type);
			if (imm?.next_date) setNDate(new Date(imm?.next_date));
			if (imm?.date) setDate(new Date(imm?.date));
		}
		getData();
	}, []);
	return (
		<form
			className='flex gap-4 mt-4 items-end'
			onSubmit={async (e) => {
				e.preventDefault();
				await edit("/encounters/edit/immunization/" + enc_id, {
					immunization: {
						date,
						type,
						next_date,
					},
					immunization_id,
				});
			}}
		>
			<DatePickerInput
				label='Immunization Date'
				value={date}
				placeholder='imm date'
				className='w-44'
				onChange={setDate}
				clearable
			/>
			<Select
				label='Type'
				placeholder='Select a value'
				data={["TT", "EPI"]}
				className='w-[12rem]'
				clearable
				value={type}
				onChange={(value: any) => {
					setType(value);
				}}
				nothingFoundMessage='Nothing found...'
			/>
			<DatePickerInput
				label='Next Appt Date'
				value={next_date}
				placeholder='next date'
				className='w-44'
				onChange={setNDate}
				clearable
			/>
			<Button color='teal' w={200} type='submit'>
				Update Immunization
			</Button>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Immunization;
