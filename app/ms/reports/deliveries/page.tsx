/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Text, Table, Select, Button } from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";

import ReportsTable from "@/components/ReportsTable";

const page = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [diagnosis, setDiagnosis] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [value, setValue] = useState<string | undefined | null>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.delivery_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.delivery_type}</Table.Td>
			<Table.Td>{row?.mother_diag}</Table.Td>
			<Table.Td>{row?.mother_outcome}</Table.Td>
			<Table.Td>{row?.baby_outcome}</Table.Td>
			<Table.Td>{row?.baby_sex}</Table.Td>
			<Table.Td>{row?.baby_weight} KG</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{new Date(row?.delivery_date).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{row?.delivery_type}</Table.Td>
			<Table.Td>{row?.mother_diag}</Table.Td>
			<Table.Td>{row?.mother_outcome}</Table.Td>
			<Table.Td>{row?.baby_outcome}</Table.Td>
			<Table.Td>{row?.baby_sex}</Table.Td>
			<Table.Td>{row?.baby_weight} KG</Table.Td>
		</Table.Tr>
	));
	const getValuesUI = () => {
		if (criteria == "Delivery Type") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={[
						"Delivery breech",
						"Delivery multiple",
						"Delivery SVD",
						"Delivery Vacuum",
					]}
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
		if (criteria == "Baby Outcome") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Live Birth", "Still Birth"]}
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
		if (criteria == "Mother Outcome") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Alive", "Mat Death"]}
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
		if (criteria == "Mother Diagnosis") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={diagnosis}
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
		if (criteria == "Delivery Type") {
			const found = queryData?.filter((d: any) => d?.delivery_type == value);
			setSortedData(found);
		}
		if (criteria == "Baby Outcome") {
			const found = queryData?.filter((d: any) => d?.baby_outcome == value);
			setSortedData(found);
		}
		if (criteria == "Mother Outcome") {
			const found = queryData?.filter((d: any) => d?.mother_outcome == value);
			setSortedData(found);
		}
		if (criteria == "Mother Diagnosis") {
			const found = queryData?.filter((d: any) => d?.mother_diag == value);
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
						"Delivery Type",
						"Baby Outcome",
						"Mother Outcome",
						"Mother Diagnosis",
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
			return `Deliveries report for ${criteria} --> ${value}`;
		}
		return "Deliveries report for";
	};
	useEffect(() => {
		const getD = async () => {
			const { data } = await fetch("/settings/diagnosis");
			const sorted = data.map((d: { name: string; id: string }) => {
				return d.name;
			});
			setDiagnosis(sorted);
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
					link='/reports/deliveries'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Deliveries report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Type",
					"Mother Diag",
					"Mother Outcome",
					"Baby Outcome",
					"Baby Sex",
					"Baby Weight",
				]}
				printHeaders={[
					"ENC Date",
					"Date",
					"Hosp No",
					"Patient",
					"Type",
					"Mother Diag",
					"Mother Outcome",
					"Baby Outcome",
					"Baby Sex",
					"Baby Weight",
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
