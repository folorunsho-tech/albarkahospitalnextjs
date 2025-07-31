/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, Table, Select, Button, TextInput } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const page = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [procedures, setProcedures] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [value, setValue] = useState<string | undefined | any | null>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.proc_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.procedure?.name}</Table.Td>
			<Table.Td>{row?.outcome}</Table.Td>
			<Table.Td>{row?.anaesthesia}</Table.Td>
			<Table.Td>{row?.surgeon}</Table.Td>
			<Table.Td>{row?.assistant}</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.proc_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.procedure?.name}</Table.Td>
			<Table.Td>{row?.outcome}</Table.Td>
			<Table.Td>{row?.anaesthesia}</Table.Td>
			<Table.Td>{row?.surgeon}</Table.Td>
			<Table.Td>{row?.assistant}</Table.Td>
		</Table.Tr>
	));
	const getValuesUI = () => {
		if (criteria == "Surgeon") {
			return (
				<TextInput
					label='Surgeon'
					placeholder='surgeon'
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
					}}
				/>
			);
		}
		if (criteria == "Assistant") {
			return (
				<TextInput
					label='Assistant'
					placeholder='assistant'
					value={value}
					onChange={(e) => {
						setValue(e.currentTarget.value);
					}}
				/>
			);
		}
		if (criteria == "Anaesthesia") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["GA", "LA"]}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Outcome") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Alive", "Dead"]}
					className='w-[16rem]'
					searchable
					clearable
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Operation type") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={procedures}
					className='w-[16rem]'
					searchable
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
		if (criteria == "Surgeon") {
			const found = queryData.filter((d: any) =>
				String(d?.surgeon).toLowerCase().includes(value)
			);
			setSortedData(found);
		}
		if (criteria == "Assistant") {
			const found = queryData.filter((d: any) =>
				String(d?.assistant).toLowerCase().includes(value)
			);
			setSortedData(found);
		}
		if (criteria == "Anaesthesia") {
			const found = queryData.filter((d: any) => d?.anaesthesia == value);
			setSortedData(found);
		}
		if (criteria == "Outcome") {
			const found = queryData.filter((d: any) => d?.outcome == value);
			setSortedData(found);
		}
		if (criteria == "Operation type") {
			const found = queryData.filter((d: any) => d?.procedureId == value);
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
					placeholder='select a criteria'
					data={[
						"Operation type",
						"Outcome",
						"Anaesthesia",
						"Assistant",
						"Surgeon",
					]}
					value={criteria}
					className='w-[16rem]'
					searchable
					clearable
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
	const getReport = () => {
		if (criteria && value) {
			return `Operations report for ${criteria} --> ${value}`;
		}
		return "Operations report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/procedures");
			const sorted = data.map((d: { name: string; id: string }) => {
				return { label: d.name, value: d.id };
			});
			setProcedures(sorted);
		};
		getD();
	}, []);
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
	}, [loaded]);

	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/operations'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Operations report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Operation Type",
					"Outcome",
					"Anaesthesia",
					"Surgeon",
					"Assistant",
				]}
				printHeaders={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Operation Type",
					"Outcome",
					"Anaesthesia",
					"Surgeon",
					"Assistant",
				]}
				sortedData={sortedData}
				setSortedData={setSortedData}
				data={queryData}
				tableLoading={loading}
				rows={rows}
				printRows={printRows}
				filters={filters}
				loaded={loaded}
				tableReport={getReport()}
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
