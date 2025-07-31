/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEdit } from "@/queries";
import { Button, LoadingOverlay, Select } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";

const Procedures = ({
	data,
	id,
	getEnc,
}: {
	data: any;
	id: string | null;
	getEnc: any;
}) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [procedure, setProcedure] = useState("");
	const [proc_date, setProcDate] = useState<Date | null | string>(null);
	const [proceduresList, setProceduresList] = useState([]);
	const getAll = async () => {
		const { data: found } = await fetch("/settings/procedures");
		const mapped = found?.map((proc: any) => {
			return {
				value: proc?.id,
				label: proc?.name,
			};
		});
		setProceduresList(mapped);
		setProcedure(data?.procedure);
		setProcDate(new Date(data?.proc_date));
	};
	useEffect(() => {
		getAll();
		getEnc();
	}, []);
	return (
		<form
			className='flex gap-6 items-end mt-4 '
			onSubmit={async (e) => {
				e.preventDefault();
				const { data } = await edit("/encounters/edit/procedure/" + id, {
					procedureId: procedure,
					proc_date,
				});
				console.log(data);
			}}
		>
			<Select
				label='Procedures'
				placeholder='Select procedure'
				data={proceduresList}
				value={procedure}
				className='w-1/4'
				// clearable
				onChange={(value: any) => {
					setProcedure(value);
				}}
				searchable
				nothingFoundMessage='Nothing found...'
			/>
			<DatePickerInput
				label='Procedure date'
				placeholder='proc. date...'
				className='w-44'
				value={proc_date}
				onChange={setProcDate}
			/>
			<Button color='teal' w={200} type='submit'>
				Update procedure
			</Button>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Procedures;
