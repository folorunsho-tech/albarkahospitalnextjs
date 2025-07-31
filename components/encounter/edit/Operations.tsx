/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useFetch, useEdit } from "@/queries";
import { Button, LoadingOverlay, Select, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useEffect, useState } from "react";
const Operations = ({ enc_id }: { enc_id: string | null }) => {
	const { fetch } = useFetch();
	const { edit, loading } = useEdit();
	const [proceduresList, setProceduresList] = useState([]);
	const [procedureId, setProcedureId] = useState("");
	const [anaesthesia, setAnaesthesia] = useState("");
	const [outcome, setOutcome] = useState("");
	const [surgeon, setSurgeon] = useState("");
	const [assistant, setAssistant] = useState("");
	const [proc_date, setOpDate] = useState<any>(null);
	const [operation_id, setOpId] = useState<null | string>("");

	const getAll = async () => {
		const { data } = await fetch("/settings/procedures");
		const { data: enc } = await fetch(`/encounters/${enc_id}`);
		const ops = enc?.operations[0];

		const mapped = data?.map((proc: any) => {
			return {
				value: proc?.id,
				label: proc?.name,
			};
		});
		setProceduresList(mapped);
		setOpId(ops?.id);
		setProcedureId(ops?.procedureId);
		setAnaesthesia(ops?.anaesthesia);
		setOutcome(ops?.outcome);
		setSurgeon(ops?.surgeon);
		setAssistant(ops?.assistant);
		if (ops?.proc_date) setOpDate(new Date(ops?.proc_date));
	};
	useEffect(() => {
		getAll();
	}, []);

	return (
		<form
			className='flex gap-4 flex-wrap items-end mt-4'
			onSubmit={async (e) => {
				e.preventDefault();
				await edit("/encounters/edit/operation/" + enc_id, {
					operation: {
						anaesthesia,
						proc_date,
						surgeon,
						assistant,
						procedureId,
						outcome,
					},
					operation_id,
				});
			}}
		>
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
				nothingFoundMessage='Nothing found...'
			/>
			<DatePickerInput
				label='Operation date'
				placeholder='proc. date...'
				className='w-44'
				value={proc_date}
				onChange={setOpDate}
				allowDeselect
				clearable
				closeOnChange={false}
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
			<Button color='teal' w={200} type='submit'>
				Update Operation
			</Button>
			<LoadingOverlay visible={loading} />
		</form>
	);
};

export default Operations;
