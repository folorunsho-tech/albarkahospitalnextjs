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
			<Table.Td>{new Date(row?.date).toLocaleDateString()}</Table.Td>
			<Table.Td>{new Date(row?.edd).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.ega}</Table.Td>
			<Table.Td>{row?.fe_diagnosis}</Table.Td>
			<Table.Td>{row?.fe_no}</Table.Td>
			<Table.Td>{row?.fe_live}</Table.Td>
			<Table.Td>{row?.fe_abnormallity}</Table.Td>
			<Table.Td>{row?.fe_liq_vol}</Table.Td>
			<Table.Td>{row?.placenta_pos}</Table.Td>
		</Table.Tr>
	));
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{new Date(row?.encounter?.enc_date).toLocaleDateString()}
			</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>{new Date(row?.date).toLocaleDateString()}</Table.Td>
			<Table.Td>{new Date(row?.edd).toLocaleDateString()}</Table.Td>
			<Table.Td>{row?.ega}</Table.Td>
			<Table.Td>{row?.fe_no}</Table.Td>
			<Table.Td>{row?.fe_diagnosis}</Table.Td>
			<Table.Td>{row?.fe_live}</Table.Td>
			<Table.Td>{row?.fe_abnormallity}</Table.Td>
			<Table.Td>{row?.fe_liq_vol}</Table.Td>
			<Table.Td>{row?.placenta_pos}</Table.Td>
		</Table.Tr>
	));
	const getValuesUI = () => {
		if (criteria == "EGA") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={[
						"1W",
						"2W",
						"3W",
						"4W",
						"5W",
						"6W",
						"7W",
						"8W",
						"9W",
						"10W",
						"11W",
						"12W",
						"13W",
						"14W",
						"15W",
						"16W",
						"17W",
						"18W",
						"19W",
						"20W",
						"21W",
						"22W",
						"23W",
						"24W",
						"25W",
						"26W",
						"27W",
						"28W",
						"29W",
						"30W",
						"31W",
						"32W",
						"33W",
						"34W",
						"35W",
						"36W",
						"37W",
						"38W",
						"39W",
						"40W",
						"Postdate",
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
		if (criteria == "EDD") {
			return (
				<DatePickerInput
					label='EDD'
					placeholder='date'
					className='w-44'
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Foetal Presentation") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Breech", "Cephalic", "Multiple", "Transverse"]}
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
		if (criteria == "Foetal No") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Singleton", "Twins", "Triplet"]}
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
		if (criteria == "Foetal Live") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Alive", "IUFD"]}
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
		if (criteria == "Foetal Abnormallity") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Present", "Absent"]}
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
		if (criteria == "Foetal Liquid Vol.") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Adequate", "Reduced"]}
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
		if (criteria == "Placenta Position") {
			return (
				<Select
					label='Value'
					placeholder='search for or select a value'
					data={["Anterior", "Posterior", "Praevia"]}
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
		if (criteria == "EGA") {
			const found = queryData?.filter((d: any) => d?.ega == value);
			setSortedData(found);
		}
		if (criteria == "EDD") {
			const date = new Date(value).setHours(0, 0, 0, 0);
			const found = queryData?.filter((d: any) => {
				const edd = new Date(new Date(d?.edd).setHours(0, 0, 0, 0));
				return isEqual(edd, new Date(date));
			});
			setSortedData(found);
		}
		if (criteria == "Foetal Presentation") {
			const found = queryData?.filter((d: any) => d?.fe_diagnosis == value);
			setSortedData(found);
		}
		if (criteria == "Foetal No") {
			const found = queryData?.filter((d: any) => d?.fe_no == value);
			setSortedData(found);
		}
		if (criteria == "Foetal Live") {
			const found = queryData?.filter((d: any) => d?.fe_live == value);
			setSortedData(found);
		}
		if (criteria == "Foetal Abnormallity") {
			const found = queryData?.filter((d: any) => d?.fe_abnormallity == value);
			setSortedData(found);
		}
		if (criteria == "Foetal Liquid Vol.") {
			const found = queryData?.filter((d: any) => d?.fe_liq_vol == value);
			setSortedData(found);
		}
		if (criteria == "Placenta Position") {
			const found = queryData?.filter((d: any) => d?.placenta_pos == value);
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
						"EGA",
						"EDD",
						"Foetal Presentation",
						"Foetal No",
						"Foetal Live",
						"Foetal Abnormallity",
						"Foetal Liquid Vol.",
						"Placenta Position",
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
			return `ANC report for ${criteria} --> ${value}`;
		}
		return "ANC report for";
	};
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
	}, [loaded]);
	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/anc'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					ANC report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Hosp No",
					"Patient",
					"ANC Date",
					"EDD",
					"EGA",
					"FE Presentation",
					"FE No",
					"FE Live",
					"FE Abnormal",
					"FE Liquid Vol.",
					"Placenta Pos",
				]}
				printHeaders={[
					"ENC Date",
					"Hosp No",
					"Patient",
					"ANC Date",
					"EDD",
					"EGA",
					"FE Presentation",
					"FE No",
					"FE Live",
					"FE Abnormal",
					"FE Liquid Vol.",
					"Placenta Pos",
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
