/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
	Text,
	Table,
	Select,
	Button,
	NumberInput,
	NumberFormatter,
	Pill,
} from "@mantine/core";
import { usePostNormal, useFetch } from "@/queries";
import { useEffect, useState } from "react";
import DataLoader from "@/components/DataLoader";
import { format, isEqual } from "date-fns";
import ReportsTable from "@/components/ReportsTable";
import { DatePickerInput } from "@mantine/dates";

const page = () => {
	const { post, loading } = usePostNormal();
	const { fetch } = useFetch();
	const [queryData, setQueryData] = useState<any[]>([]);
	const [sortedData, setSortedData] = useState<any[]>(queryData);
	const [value, setValue] = useState<string | any | null>("");
	const [criteria, setCriteria] = useState<string | null>("");
	const [diagnosis, setDiagnosis] = useState<any[]>([]);

	const [loaded, setLoaded] = useState<any>("");
	const rows = sortedData?.map(
		(
			row: {
				id: string;
				admitted_for: number;
				nok_phone: string;
				ward_matron: string;
				adm_date: Date;
				discharged_on: Date;
				encounter: { enc_date: Date; patient: any; diagnosis: any[] };
			},
			i
		) => (
			<Table.Tr key={row?.id}>
				<Table.Td>
					{format(new Date(row?.encounter?.enc_date), "dd/MM/yyyy")}
				</Table.Td>
				<Table.Td>{format(new Date(row?.adm_date), "dd/MM/yyyy")}</Table.Td>
				<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
				<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
				<Table.Td>
					{row?.encounter?.diagnosis.length > 0 ? (
						<Pill>
							{row?.encounter?.diagnosis?.length > 1
								? `${row?.encounter?.diagnosis[0]?.name} + ${
										row?.encounter?.diagnosis?.length - 1
								  }`
								: row?.encounter?.diagnosis[0]?.name}
						</Pill>
					) : (
						"--"
					)}
				</Table.Td>
				<Table.Td>{row?.admitted_for} Day(s)</Table.Td>
				<Table.Td>
					{format(new Date(row?.discharged_on), "dd/MM/yyyy")}
				</Table.Td>
				<Table.Td>{row?.nok_phone}</Table.Td>
				<Table.Td>{row?.ward_matron}</Table.Td>
			</Table.Tr>
		)
	);
	const printRows = sortedData?.map((row, i) => (
		<Table.Tr key={row?.id}>
			<Table.Td>
				{format(new Date(row?.encounter?.enc_date), "dd/MM/yyyy, p")}
			</Table.Td>
			<Table.Td> {format(new Date(row?.adm_date), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.hosp_no}</Table.Td>
			<Table.Td>{row?.encounter?.patient?.name}</Table.Td>
			<Table.Td>
				{row?.encounter?.diagnosis.length > 0 ? (
					<Pill>
						{row?.encounter?.diagnosis?.length > 1
							? `${row?.encounter?.diagnosis[0]?.name} + ${
									row?.encounter?.diagnosis?.length - 1
							  }`
							: row?.encounter?.diagnosis[0]?.name}
					</Pill>
				) : (
					"--"
				)}
			</Table.Td>
			<Table.Td>{row?.admitted_for} Day(s)</Table.Td>
			<Table.Td>{format(new Date(row?.discharged_on), "dd/MM/yyyy")}</Table.Td>
			<Table.Td>{row?.nok_phone}</Table.Td>
			<Table.Td>{row?.ward_matron}</Table.Td>
		</Table.Tr>
	));

	const getValuesUI = () => {
		if (criteria == "Admitted for") {
			return (
				<NumberInput
					label='Admission Day(s)'
					placeholder='day(s)'
					value={value}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
		if (criteria == "Diagnosis") {
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
		if (criteria == "Discharged Date") {
			return (
				<DatePickerInput
					label='Discharged Date'
					placeholder='date'
					className='w-44'
					value={value}
					defaultDate={new Date()}
					onChange={(value) => {
						setValue(value);
					}}
				/>
			);
		}
	};
	const getFilter = () => {
		if (criteria == "Admitted for") {
			const found = queryData?.filter((d: any) => d?.admitted_for == value);
			setSortedData(found);
		}
		if (criteria == "Diagnosis") {
			const isDiags = queryData.filter(
				(e: any) => e?.encounter?.diagnosis.length > 0
			);
			const found: any[] = [];
			isDiags.forEach((ad: { encounter: { diagnosis: any[] } }) => {
				const filtered = ad?.encounter?.diagnosis.filter(
					(diag: { id: string; name: string }) => diag.id == value
				);
				if (filtered.length > 0) found.push(ad);
			});
			setSortedData(found);
		}
		if (criteria == "Discharged Date") {
			const date = new Date(value).setHours(0, 0, 0, 0);
			const found = queryData?.filter((d: any) => {
				const discharge = new Date(
					new Date(d?.discharged_on).setHours(0, 0, 0, 0)
				);
				return isEqual(discharge, new Date(date));
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
					placeholder='select a criteria'
					data={["Admitted for", "Discharged Date", "Diagnosis"]}
					className='w-[16rem]'
					clearable
					value={criteria}
					onChange={(value) => {
						setCriteria(value);
					}}
				/>
				{getValuesUI()}
				<Button
					onClick={() => {
						getFilter();
					}}
					disabled={!value}
					type='submit'
				>
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
			return `Patients Admission report ${criteria} --> ${value}`;
		}
		return "Patients Admission report";
	};
	const getData = async () => {
		const { data: diags } = await fetch("/settings/diagnosis");
		const sortedD = diags.map((d: { name: string; id: string }) => {
			return {
				label: d.name,
				value: d.id,
			};
		});
		setDiagnosis(sortedD);
	};
	const avg =
		queryData.reduce((prev, curr) => prev + Number(curr?.admitted_for), 0) /
		queryData.length;
	useEffect(() => {
		setSortedData(queryData);
		setCriteria(null);
		setValue(null);
	}, [loaded]);
	useEffect(() => {
		getData();
	}, []);

	return (
		<main className='space-y-6'>
			<div className='flex justify-between items-end'>
				<DataLoader
					link='/reports/admissions'
					post={post}
					setQueryData={setQueryData}
					setLoaded={setLoaded}
				/>

				<Text size='md' fw={600}>
					Patients Admission report
				</Text>
			</div>

			<ReportsTable
				headers={[
					"ENC Date",
					"Adm Date",
					"Hosp No",
					"Patient",
					"Diagnosis",
					"Admitted for",
					"Discharged Date",
					"NOK Phone No",
					"Ward matron",
				]}
				printHeaders={[
					"ENC Date",
					"Adm Date",
					"Hosp No",
					"Patient",
					"Diagnosis",
					"Admitted for",
					"Discharged Date",
					"NOK Phone No",
					"Ward matron",
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
					<div className='text-lg font-semibold my-2 flex justify-between'>
						<h2>Total Count: {sortedData.length}</h2>
						<h2>
							Average Admission days:{" "}
							<NumberFormatter
								value={Number(avg).toFixed(1)}
								thousandSeparator
							/>
						</h2>
					</div>
				}
			/>
		</main>
	);
};

export default page;
