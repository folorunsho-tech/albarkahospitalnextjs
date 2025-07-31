/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch } from "@/queries";
import { Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
const Operations = ({ setOperation }: { setOperation: any }) => {
	const { fetch } = useFetch();
	const [proceduresList, setProceduresList] = useState([]);
	const [procedureId, setProcedureId] = useState("");
	const [anaesthesia, setAnaesthesia] = useState("");
	const [outcome, setOutcome] = useState("");
	const [surgeon, setSurgeon] = useState("");
	const [assistant, setAssistant] = useState("");
	const [proc_date, setOpDate] = useState<any>(null);
	const getAll = async () => {
		const { data } = await fetch("/settings/procedures");
		const mapped = data?.map((proc: any) => {
			return {
				value: proc?.id,
				label: proc?.name,
			};
		});
		setProceduresList(mapped);
	};
	useEffect(() => {
		getAll();
	}, []);
	useEffect(() => {
		setOperation({
			procedureId,
			proc_date,
			anaesthesia,
			outcome,
			surgeon,
			assistant,
		});
	}, [procedureId, proc_date, anaesthesia, outcome, surgeon, assistant]);
	return (
		<main className='flex gap-4 flex-wrap'>
			<Select
				label='Operation Type'
				placeholder='Select a type'
				data={proceduresList}
				value={procedureId}
				clearable
				onFocus={getAll}
				onChange={(value: any) => {
					setProcedureId(value);
				}}
				searchable
				required
				nothingFoundMessage='Nothing found...'
			/>
			<DatePickerInput
				label='Operation date'
				placeholder='proc. date...'
				className='w-44'
				value={proc_date}
				onChange={setOpDate}
				clearable
				required
			/>
			<Select
				label='Anaesthesia'
				placeholder='Select a type'
				data={["GA", "LA"]}
				value={anaesthesia}
				clearable
				onChange={(value: any) => {
					setAnaesthesia(value);
				}}
				nothingFoundMessage='Nothing found...'
			/>
			<Select
				label='Operation Outcome'
				placeholder='Select an outcome'
				data={["Alive", "Dead"]}
				value={outcome}
				clearable
				onChange={(value: any) => {
					setOutcome(value);
				}}
				nothingFoundMessage='Nothing found...'
			/>
			<TextInput
				label='Surgeon'
				placeholder='surgeon'
				onChange={(e) => {
					setSurgeon(e.currentTarget.value);
				}}
				value={surgeon}
			/>
			<TextInput
				label='Assistant'
				placeholder='assistant'
				onChange={(e) => {
					setAssistant(e.currentTarget.value);
				}}
				value={assistant}
			/>
		</main>
	);
};

export default Operations;
