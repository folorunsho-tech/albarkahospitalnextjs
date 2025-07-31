/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, Table, Select, Button } from "@mantine/core";
import { usePostNormal } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";
import { isEqual } from "date-fns";
import ReportsTable from "@/components/ReportsTable";
import { DatePickerInput } from "@mantine/dates";

const page = () => {
	const { post, loading } = usePostNormal();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [value, setValue] = useState<string | any | null>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>
				{row?.date !== null ? new Date(row?.date).toLocaleDateString() : ""}
			</Table.Td>
			<Table.Td>
				{row?.next_date !== null
					? new Date(row?.next_date).toLocaleDateString()
					: ""}
			</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.type}</Table.Td>
			<Table.Td>
				{row?.date !== null ? new Date(row?.date).toLocaleDateString() : ""}
			</Table.Td>
			<Table.Td>
				{row?.next_date !== null
					? new Date(row?.next_date).toLocaleDateString()
					: ""}
			</Table.Td>
		</Table.Tr>
	));
	const getValuesUI = () => {
		if (criteria == "Next Appt Date") {
			return (
				<DatePickerInput
					label='Next Appt Date'
					placeholder='date'
					className='w-44'
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Type") {
			return (
				<Select
					label='Type'
					placeholder=' select a value'
					data={["TT", "EPI"]}
					className='w-[16rem]'
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
	};
	const getFilter = () => {
		if (criteria == "Type") {
			const found = queryData?.filter((d: any) => d?.type == value);
			setSortedData(found);
		}
		if (criteria == "Next Appt Date") {
			const date = new Date(value).setHours(0, 0, 0, 0);
			const found = queryData?.filter((d: any) => {
				const appt = new Date(new Date(d?.next_date).setHours(0, 0, 0, 0));
				return isEqual(appt, new Date(date));
			});
			setSortedData(found);
		}
	};
	const filters = (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				getFilter();
			}}
			className='w-full'
		>
			<label htmlFor='filters'>Filters</label>
			<div id='filters' className='flex gap-3 items-end flex-wrap'>
				<Select
					label='Criteria'
					placeholder='select a type'
					data={["Type", "Next Appt Date"]}
					className='w-[16rem]'
					clearable
					value={criteria}
					onChange={(value) => {
						setCriteria(value);
						setValue(null);
					}}
				/>
				{getValuesUI()}
				<Button disabled={!value} type='submit'>
					Filter
				</Button>
				<Button
					color='red'
					onClick={() => {
						setSortedData(queryData);
						setCriteria(null);
						setValue(null);
					}}
				>
					Clear Filter
				</Button>
			</div>
		</form>
	);
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
	}, [loaded]);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/immunization'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Immunizations report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Hosp No",
					"Patient",
					"Type",
					"Imm Date",
					"Next Appt. Date",
				]}
				printHeaders={[
					"ENC Date",
					"Hosp No",
					"Patient",
					"Type",
					"Imm Date",
					"Next Appt. Date",
				]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={queryData}
				tableLoading={loading}
				rows={rows}
				printRows={printRows}
				filters={filters}
				loaded={loaded}
				tableReport={`Immunizations report for Type --> ${value || ""}`}
				metadata={
					<div className='text-lg font-semibold my-2'>
						<h2>Total Count: {sortedData.length}</h2>
					</div>
				}
			/>
		</main>
	);
};

export default page;
